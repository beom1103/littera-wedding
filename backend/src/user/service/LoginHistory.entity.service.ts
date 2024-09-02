import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { ErrorResponder } from "libs/exception/custom.exception";
import { LoginHistoryEntity } from "../entity/LoginHistory.entity";
import { LoginHistoryModel } from "../model/LoginHistory.model";

@Injectable()
export class LoginHistoryEntityService {
  constructor(public readonly model: LoginHistoryModel) {}

  async create(
    req: Pick<LoginHistoryEntity, "ipAddress" | "lastLoginAt" | "userAgent" | "userId">,
    trx?: EntityManager,
    trxOpenedAt?: Date,
  ) {
    return this.model.transaction(async (ctx) => {
      const entity = await this.model.create({ ...req }, ctx);

      if (!entity) throw new ErrorResponder("Failed to create refresh token", 500);

      return entity;
    }, trx);
  }

  async updateByUserId(userId: string, update: Pick<LoginHistoryEntity, "ipAddress" | "userAgent" | "lastLoginAt">, trx?: EntityManager) {
    const entity = await this.model.findOne({ where: { userId } }, trx);

    if (!entity) {
      throw new ErrorResponder("Refresh token not found", 404);
    }

    await this.model.update({ id: entity.id }, update, trx);

    return entity;
  }
}
