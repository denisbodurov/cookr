import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config(); // This line is necessary if you're not using a package that automatically loads environment variables.

export const connectionSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  synchronize: false, // It's recommended to not use synchronize: true in production.
  name: "default",
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migrations/*.ts"],
});