import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1720005330673 implements MigrationInterface {
    name = 'Test1720005330673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE recipe_type AS ENUM('breakfast', 'lunch', 'dinner', 'dessert', 'snack');
            CREATE TYPE product_category AS ENUM('protein', 'carbs', 'fats');

            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                bio TEXT DEFAULT '',
                image TEXT DEFAULT '',
                password VARCHAR(255) NOT NULL,
                UNIQUE (username, email)
            );

            CREATE TABLE IF NOT EXISTS recipes (
                recipe_id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                author_id INT,
                image TEXT DEFAULT '',
                recipe_type recipe_type,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES users(user_id)
            );

            CREATE TABLE IF NOT EXISTS ratings (
                rating_id SERIAL PRIMARY KEY,
                rater_id INT,
                rated_id INT,
                rating INT,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (rater_id) REFERENCES users(user_id),
                FOREIGN KEY (rated_id) REFERENCES recipes(recipe_id)
            );

            CREATE TYPE product_type AS ENUM('fruits', 'vegetables', 'meat', 'dairy', 'grains', 'seafood');

            CREATE TABLE IF NOT EXISTS products (
                product_id SERIAL PRIMARY KEY,
                product_name TEXT DEFAULT '',
                image TEXT DEFAULT '',
                product_type product_type,
                product_category product_category
            );

            CREATE TABLE IF NOT EXISTS liked_recipes (
                like_id SERIAL PRIMARY KEY,
                recipe_id INT,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(user_id),
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
            );

            CREATE TABLE IF NOT EXISTS steps (
                step_id SERIAL PRIMARY KEY,
                recipe_id INT NOT NULL,
                step_number INT NOT NULL,
                description TEXT NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
                UNIQUE (recipe_id, step_number)
            );

            CREATE TABLE IF NOT EXISTS ingredients (
                ingredient_id SERIAL PRIMARY KEY,
                recipe_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity DECIMAL NOT NULL,
                unit VARCHAR(50) NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
                FOREIGN KEY (product_id) REFERENCES products(product_id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS ingredients;
            DROP TABLE IF EXISTS steps;
            DROP TABLE IF EXISTS liked_recipes;
            DROP TABLE IF EXISTS ratings;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS recipes;
            DROP TABLE IF EXISTS users;

            DROP TYPE IF EXISTS recipe_type;
            DROP TYPE IF EXISTS product_type;
            DROP TYPE IF EXISTS product_category;
        `);
    }
}
