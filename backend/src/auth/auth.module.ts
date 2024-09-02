import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./controller/Auth.contoller";
import { RefreshTokenEntityService } from "./service/RefreshToken.entity.service";
import { RefreshTokenModel } from "./model/RefreshToken.model";
import { UserModule } from "src/user/user.module";
import { ConfigModule } from "libs/config/config.module";
import { RefreshTokenEntity } from "./entity/RefreshToken.entity";
import { NaverStrategy } from "./strategies/naver.strategy";
import { AuthService } from "./service/Auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    UserModule,
    ConfigModule,
  ],
  providers: [AuthService, RefreshTokenEntityService, RefreshTokenModel, NaverStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
