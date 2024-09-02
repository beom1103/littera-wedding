import { BaseEntityWithId } from "libs/database/BaseEntityWithId";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Index("idx_name", ["name"])
@Entity("users")
export class UserEntity extends BaseEntityWithId {
  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true, length: 30 })
  phone?: string;

  @Column({ length: 30 })
  provider: string;

  @Column({ type: "boolean", name: "agree_to_collect_info" })
  agreedToCollectInfo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastLogin: Date;

  @Column({ default: false })
  isDestroyed: boolean;
}
