import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-naver-v2";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../service/Auth.service";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, "naver") {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
    const { id, name, email, provider } = profile;

    const user = {
      snsId: id,
      email: email,
      name: name,
      provider,
    };

    const payload = {
      user,
      accessToken,
      refreshToken,
    };

    done(null, payload);
  }
}
