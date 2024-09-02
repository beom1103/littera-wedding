import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { BaseEntityWithId } from "@database/BaseEntityWithId";

@Entity("login_histories")
export class LoginHistoryEntity extends BaseEntityWithId {
  @Column({ type: "varchar", length: 45 })
  ipAddress: string;

  @Column("text")
  userAgent: string;

  @CreateDateColumn()
  lastLoginAt: Date;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: "CASCADE", eager: false })
  @JoinColumn({ name: "user_id" })
  user?: UserEntity;
}
