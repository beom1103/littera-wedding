import { BaseEntityWithId } from "libs/database/BaseEntityWithId";
import { UserEntity } from "src/user/entity/User.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("refresh_tokens")
export class RefreshTokenEntity extends BaseEntityWithId {
  @Column({ name: "user_id" })
  userId: string;

  @Column({ type: "varchar", length: 255 })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
