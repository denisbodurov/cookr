import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1720687397428 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                -- bio TEXT DEFAULT '',
                image TEXT DEFAULT '',
                password VARCHAR(255) NOT NULL,
                UNIQUE (username, email)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
