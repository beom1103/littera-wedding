import { BaseModel } from "@database/base.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InvitationEntity } from "../entity/invitation.entity";

@Injectable()
export class InvitationModel extends BaseModel<InvitationEntity> {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
  ) {
    super(invitationRepository);
  }
}
