import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "libs/config/config.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/service/User.service";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.validateById(payload.sub);

    return user;
  }
}
