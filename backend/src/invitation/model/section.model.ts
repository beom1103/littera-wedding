import { BaseModel } from "@database/base.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SectionEntity } from "../entity/section.entity";

@Injectable()
export class SectionModel extends BaseModel<SectionEntity> {
  constructor(
    @InjectRepository(SectionEntity)
    private readonly sectionRepository: Repository<SectionEntity>,
  ) {
    super(sectionRepository);
  }
}
