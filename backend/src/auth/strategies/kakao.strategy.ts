// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport-kakao";
// import { AuthService } from "../services/auth.service";

// @Injectable()
// export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
//   constructor(private readonly authService: AuthService) {
//     super({
//       clientID: process.env.KAKAO_CLIENT_ID,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET,
//       callbackURL: process.env.KAKAO_CALLBACK_URL,
//     });
//   }

//   async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
//     const { id, username, emails } = profile;
//     const user = await this.authService.validateUser({
//       snsId: id,
//       email: emails[0].value,
//       name: username,
//       snsType: "kakao",
//     });
//     done(null, user);
//   }
// }
