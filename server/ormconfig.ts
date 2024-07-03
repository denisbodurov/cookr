import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 6432,
  username: "postgres",
  password: "1234",
  database: "cookr",
  logging: true,
  synchronize: false,
  name: "default",
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migrations/*.ts"],
});
