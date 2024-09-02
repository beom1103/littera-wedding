import { Injectable } from "@nestjs/common";
import { UserEntityService } from "./User.entity.service";
import { UserEntity } from "../entity/User.entity";
import { ErrorResponder } from "libs/exception/custom.exception";
import { EntityManager } from "typeorm";

@Injectable()
export class UserService {
  constructor(public readonly entity: UserEntityService) {}

  async createUser(req: Pick<UserEntity, "email" | "name" | "phone" | "provider">, trx: EntityManager): Promise<UserEntity> {
    const userEntity = await this.entity.getEntityByEmail(req.email, { forUpdate: true }, trx);

    if (userEntity) throw new ErrorResponder("이미 가입된 사용자입니다.", 409);

    return this.entity.create({ ...req }, trx);
  }

  async validateById(id: string): Promise<UserEntity> {
    return this.entity.getEntityById(id);
  }
}
