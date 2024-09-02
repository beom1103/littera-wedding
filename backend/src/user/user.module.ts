import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntityService } from "./service/User.entity.service";
import { UserService } from "./service/User.service";
import { UserModel } from "./model/User.model";
import { LoginHistoryEntity } from "./entity/LoginHistory.entity";
import { UserEntity } from "./entity/User.entity";
import { LoginHistoryEntityService } from "./service/LoginHistory.entity.service";
import { LoginHistoryModel } from "./model/LoginHistory.model";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, LoginHistoryEntity])],
  providers: [UserService, UserEntityService, UserModel, LoginHistoryEntityService, LoginHistoryModel],
  exports: [UserService, UserEntityService, LoginHistoryEntityService],
})
export class UserModule {}
