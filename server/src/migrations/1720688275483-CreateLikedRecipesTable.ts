import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikedRecipesTable1720688275483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS liked_recipes (
                like_id SERIAL PRIMARY KEY,
                recipe_id INT,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
