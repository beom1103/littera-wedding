import { BaseModel } from "libs/database/base.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RefreshTokenEntity } from "../entity/RefreshToken.entity";

@Injectable()
export class RefreshTokenModel extends BaseModel<RefreshTokenEntity> {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {
    super(refreshTokenRepository);
  }
}
