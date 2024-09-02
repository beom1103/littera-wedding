import { Injectable } from "@nestjs/common";
import { RefreshTokenModel } from "../model/RefreshToken.model";
import { RefreshTokenEntity } from "../entity/RefreshToken.entity";
import { EntityManager } from "typeorm";
import { ErrorResponder } from "libs/exception/custom.exception";

@Injectable()
export class RefreshTokenEntityService {
  constructor(public readonly model: RefreshTokenModel) {}

  async create(req: Pick<RefreshTokenEntity, "userId" | "refreshToken">, trx?: EntityManager, trxOpenedAt?: Date) {
    const ctxOpenedAt = trxOpenedAt || new Date();

    const entity = await this.model.create(
      {
        ...req,
        createdAt: ctxOpenedAt,
      },
      trx,
    );

    if (!entity) {
      throw new ErrorResponder("Failed to create refresh token", 500);
    }

    return entity;
  }

  async updateByUserId(userId: string, update: Pick<RefreshTokenEntity, "refreshToken">, trx?: EntityManager) {
    const entity = await this.model.findOne({ where: { userId } }, trx);

    if (!entity) {
      throw new ErrorResponder("Refresh token not found", 404);
    }

    await this.model.update({ id: entity.id }, update, trx);

    return entity;
  }
}
