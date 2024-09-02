import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "libs/database/database.module";
import { LoggerModule } from "libs/logger/logger.module";
import { AuthModule } from "./auth/auth.module";
import { InvitationModule } from "./invitation/invitation.module";

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule, LoggerModule, InvitationModule],
})
export class AppModule {}
