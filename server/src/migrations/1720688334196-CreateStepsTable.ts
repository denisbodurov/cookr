import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStepsTable1720688334196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS steps (
                step_id SERIAL PRIMARY KEY,
                recipe_id INT NOT NULL,
                step_number INT NOT NULL,
                description TEXT NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
                UNIQUE (recipe_id, step_number)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
