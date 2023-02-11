import "reflect-metadata";
import { DataSource } from "typeorm";
import { appConfig } from "../config";

const connectionString = appConfig.postgresConnectionString;

const AppDataSource = new DataSource({
  type: "postgres",
  url: connectionString,
  synchronize: false,
  logging: false,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
  subscribers: [],
});

export { AppDataSource };
