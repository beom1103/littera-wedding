import { BaseModel } from "@database/base.model";
import { Injectable } from "@nestjs/common";
import { AssetEntity } from "../entity/asset.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AssetModel extends BaseModel<AssetEntity> {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
  ) {
    super(assetRepository);
  }
}
