import { BaseModel } from "libs/database/base.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginHistoryEntity } from "../entity/LoginHistory.entity";

@Injectable()
export class LoginHistoryModel extends BaseModel<LoginHistoryEntity> {
  constructor(
    @InjectRepository(LoginHistoryEntity)
    private readonly loginHistoryRepository: Repository<LoginHistoryEntity>,
  ) {
    super(loginHistoryRepository);
  }
}
