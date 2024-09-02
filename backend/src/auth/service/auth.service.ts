import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthProvider, AuthTokenPayload, BaseActant } from "@rest/auth/auth.dto";
import { UserService } from "src/user/service/User.service";
import { ConfigService } from "libs/config/config.service";
import { RefreshTokenEntityService } from "./RefreshToken.entity.service";
import { LoginHistoryEntityService } from "src/user/service/LoginHistory.entity.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly loginHistoryEntityService: LoginHistoryEntityService,
    private readonly refreshTokenEntityService: RefreshTokenEntityService,
  ) {}

  // Improved login method with better readability and error handling

  async login(
    req: { email: string; name: string; provider: AuthProvider },
    actant: BaseActant,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, name, provider } = req;

    const { ipAddress, userAgent } = actant;

    let user = await this.userService.entity.getEntityByEmail(email);

    return this.userService.entity.model.transaction(async (ctx) => {
      try {
        const ctxOpenedAt = new Date();

        if (user) {
          const tokens = this.createTokens({ sub: user.id, email: user.email, name: user.name });

          await this.refreshTokenEntityService.updateByUserId(user.id, { refreshToken: tokens.refreshToken }, ctx);
          await this.loginHistoryEntityService.updateByUserId(user.id, { ipAddress, userAgent, lastLoginAt: ctxOpenedAt }, ctx);

          return tokens;
        }

        user = await this.userService.createUser({ email, name, provider, ...actant }, ctx);
        const tokens = this.createTokens({ sub: user.id, email: user.email, name: user.name });

        await this.refreshTokenEntityService.create({ userId: user.id, refreshToken: tokens.refreshToken }, ctx);
        await this.loginHistoryEntityService.create({ userId: user.id, ipAddress, userAgent, lastLoginAt: ctxOpenedAt }, ctx);

        return tokens;
      } catch (error) {
        throw new Error(`Login failed. Please try again later. ${JSON.stringify(error)}`);
      }
    });
  }

  async refreshTokens(refreshToken: string): Promise<{ accessToken: string; newRefreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get("JWT_SECRET"),
      });

      const user = await this.userService.entity.getEntityByEmail(payload.sub);

      if (!user) {
        throw new Error("User not found");
      }

      const newPayload = { sub: user.id, email: user.email };

      const newAccessToken = this.jwtService.sign(newPayload, {
        secret: this.configService.get("JWT_SECRET"),
        expiresIn: this.configService.get("JWT_EXPIRES_IN"),
      });

      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: this.configService.get("JWT_SECRET"),
        expiresIn: this.configService.get("JWT_SECRET_EXPIRES_IN"),
      });

      await this.refreshTokenEntityService.updateByUserId(user.id, { refreshToken: newRefreshToken });

      return { accessToken: newAccessToken, newRefreshToken };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  createTokens = (payload: AuthTokenPayload) => {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_EXPIRES_IN"),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("JWT_SECRET_EXPIRES_IN"),
    });

    return { accessToken, refreshToken };
  };
}
