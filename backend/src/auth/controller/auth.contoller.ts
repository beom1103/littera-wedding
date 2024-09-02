import { Controller, Get, Req, Res, UseGuards, Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../service/Auth.service";
import { Response } from "express";
import { ConfigService } from "libs/config/config.service";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload } from "@rest/auth/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Get("naver")
  @UseGuards(AuthGuard("naver"))
  async naverAuth(@Req() req) {}

  @Get("naver/callback")
  @UseGuards(AuthGuard("naver"))
  async naverAuthRedirect(@Req() req, @Res() res: Response) {
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"] || "";

    const { accessToken, refreshToken } = await this.authService.login(req.user.user, { ipAddress, userAgent });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(this.configService.get("LITTERA_API_URL_FE"));
  }

  @Get("kakao")
  @UseGuards(AuthGuard("kakao"))
  async kakaoAuth(@Req() req) {}

  @Get("kakao/callback")
  @UseGuards(AuthGuard("kakao"))
  async kakaoAuthRedirect(@Req() req, @Res() res: Response) {
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"] || "";

    const { accessToken, refreshToken } = await this.authService.login(req.user.user, { ipAddress, userAgent });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(this.configService.get("LITTERA_API_URL_FE"));
  }

  @Post("check-auth")
  async checkAuth(@Req() req, @Res() res: Response) {
    const accessToken = req.cookies["accessToken"];
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const payload = this.jwtService.verify<AuthTokenPayload>(accessToken, { secret: this.configService.get("JWT_SECRET") });
      return res.status(200).json({ user: payload });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  @Post("logout")
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logout success" });
  }

  @Get("refresh")
  async refreshTokens(@Req() req, @Res() res: Response) {
    const { refresh_token } = req.cookies;
  }
}
