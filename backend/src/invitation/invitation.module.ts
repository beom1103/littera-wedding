import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SectionEntity } from "./entity/section.entity";
import { InvitationEntity } from "./entity/invitation.entity";
import { AssetEntity } from "./entity/asset.entity";

@Module({
  imports: [TypeOrmModule.forFeature([InvitationEntity, SectionEntity, AssetEntity])],
  controllers: [],
  exports: [],
})
export class InvitationModule {}
