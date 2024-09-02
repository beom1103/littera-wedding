import { BaseEntityWithId } from "@database/BaseEntityWithId";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { InvitationEntity } from "./invitation.entity";

@Entity("assets")
export class AssetEntity extends BaseEntityWithId {
  @Column()
  cardId: number; // 카드(초대장) ID

  @Column()
  category: string; // 자산 카테고리 (갤러리, 커버 이미지 등)

  @Column()
  fileId: string; // 파일 고유 ID

  @Column()
  originFile: string; // 원본 파일 URL

  @Column()
  thumbFile: string; // 썸네일 파일 URL

  @Column()
  sequence: number; // 자산 순서

  @Column()
  selected: boolean; // 선택 상태

  @ManyToOne(() => InvitationEntity, (invitation) => invitation.id, { onDelete: "CASCADE", eager: false })
  @JoinColumn({ name: "invitation_id" })
  invitation: InvitationEntity; // 해당 자산이 속한 초대장
}
