import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRatingdTable1720688184224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS ratings (
                rating_id SERIAL PRIMARY KEY,
                rater_id INT,
                rated_id INT,
                rating INT,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (rater_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (rated_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
