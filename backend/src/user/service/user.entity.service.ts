import { Injectable } from "@nestjs/common";
import { UserModel } from "../model/User.model";
import { EntityManager } from "typeorm";
import { ErrorResponder } from "libs/exception/custom.exception";
import { UserEntity } from "../entity/User.entity";
import { HttpStatusCode } from "axios";

@Injectable()
export class UserEntityService {
  constructor(public readonly model: UserModel) {}

  async create(req: Pick<UserEntity, "email" | "name" | "phone" | "provider">, trx?: EntityManager, trxOpenedAt?: Date) {
    return this.model.transaction(async (ctx) => {
      const ctxOpenedAt = trxOpenedAt || new Date();

      await this.model.create(
        {
          ...req,
          createdAt: ctxOpenedAt,
          agreedToCollectInfo: false,
          isDestroyed: false,
        },
        ctx,
      );

      const entity = await this.model.findOne({ where: { email: req.email } }, ctx);

      if (!entity) throw new ErrorResponder("Failed to create refresh token", 500);

      return entity;
    }, trx);
  }

  async getEntityByEmail(
    email: string,
    opts?: { forUpdate?: boolean; throwIfNotFound?: HttpStatusCode },
    trx?: EntityManager,
  ): Promise<UserEntity> {
    const { forUpdate, throwIfNotFound } = opts || {};

    const entity = await this.model.findOne({ where: { email } }, trx, forUpdate);

    if (throwIfNotFound && !entity) {
      switch (throwIfNotFound) {
        case 404:
          throw new ErrorResponder("User not found", 404);
        default:
          throw new ErrorResponder("Failed to get user", 500);
      }
    }

    return entity;
  }

  async getEntityById(id: string, trx?: EntityManager): Promise<UserEntity> {
    const entity = await this.model.findOne({ where: { id } }, trx);

    if (!entity) throw new ErrorResponder("User not found", 404);

    return entity;
  }

  // async validateUser(email: string, provider: string, providerId: string, accessToken: string): Promise<any> {
  //   let user = await this.userEntityService.findByEmail(email);
  //   if (!user) {
  //     user = await this.userEntityService.create({
  //       email,
  //       provider,
  //       providerId,
  //       accessToken,
  //       snsType: provider,
  //       agreedToCollectInfo: true,
  //       isDestroyed: false,
  //     });
  //   }
  //   const payload = { email: user.email, sub: user.id };
  //   const refreshToken = await this.generateRefreshToken(user.id);
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     refresh_token: refreshToken,
  //   };
  // }
}
