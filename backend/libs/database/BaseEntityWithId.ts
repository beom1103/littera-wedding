import { v4 as uuidv4 } from "uuid";
import { BeforeInsert, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntityWithId {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @BeforeInsert()
  private generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
