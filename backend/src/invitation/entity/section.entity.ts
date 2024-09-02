import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntityWithId } from "@database/BaseEntityWithId";
import { InvitationEntity } from "./invitation.entity";

@Entity("sections")
export class SectionEntity extends BaseEntityWithId {
  @Column()
  type: string;

  @Column({ type: "smallint" })
  order: number;

  @Column({ type: "longtext" })
  content: string;

  @Column()
  invitationId: string;

  @ManyToOne(() => InvitationEntity, (invitation) => invitation.sections, { onDelete: "CASCADE", eager: false })
  @JoinColumn({ name: "invitation_id" })
  invitation?: InvitationEntity;

  @Column({ type: "boolean" })
  isAvailable: boolean;
}
