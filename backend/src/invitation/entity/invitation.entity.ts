import { BaseEntityWithId } from "@database/BaseEntityWithId";
import { InvitationType } from "@rest/invitation/invitation";
import { UserEntity } from "src/user/entity/User.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SectionEntity } from "./section.entity";

@Entity("invitations")
export class InvitationEntity extends BaseEntityWithId {
  @Column({
    type: "enum",
    enum: InvitationType,
    default: InvitationType.Wedding,
  })
  type: InvitationType;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: "CASCADE", eager: false })
  @JoinColumn({ name: "user_id" })
  user?: UserEntity;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => SectionEntity, (section) => section.invitationId, { onDelete: "CASCADE", eager: false })
  sections: SectionEntity[];
}
