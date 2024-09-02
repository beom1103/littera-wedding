import { DataSource } from "typeorm";
import * as path from "path";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "src/user/entity/User.entity";
import { LoginHistoryEntity } from "src/user/entity/LoginHistory.entity";
import { RefreshTokenEntity } from "src/auth/entity/RefreshToken.entity";
import { AssetEntity } from "src/invitation/entity/asset.entity";
import { InvitationEntity } from "src/invitation/entity/invitation.entity";
import { SectionEntity } from "src/invitation/entity/section.entity";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities: [path.join(__dirname, "../../src/**/*.entity.{js,ts}")],
  entities: [UserEntity, LoginHistoryEntity, RefreshTokenEntity, AssetEntity, InvitationEntity, SectionEntity],
  migrations: [path.join(__dirname, "../../src/migrations/*.{js,ts}")],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: process.env.NODE_ENV !== "production",
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
