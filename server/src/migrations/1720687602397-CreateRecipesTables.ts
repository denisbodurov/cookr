import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipesTables1720687602397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS recipe_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                image TEXT DEFAULT ''
            );

            -- add images base64
            INSERT INTO recipe_types (name, image) VALUES
            ('appetizer', 'breakfast.jpg'),
            ('salads', 'lunch.jpg'),
            ('main meal', 'dinner.jpg'),
            ('dessert', 'dessert.jpg'),
            ('beverages', 'dessert.jpg'),
            ('snacks', 'snack.jpg');

            CREATE TABLE IF NOT EXISTS recipes (
                recipe_id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                author_id INT,
                image TEXT DEFAULT '',
                recipe_type_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (recipe_type_id) REFERENCES recipe_types(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
