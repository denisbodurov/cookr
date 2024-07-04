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
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            bio TEXT DEFAULT '',
            image TEXT DEFAULT '',
            password VARCHAR(255) NOT NULL,
            UNIQUE (username, email)
        );
        
        CREATE TABLE IF NOT EXISTS recipe (
            recipe_id SERIAL PRIMARY KEY,
            author_id INT,
            steps TEXT DEFAULT '',
            image TEXT DEFAULT '',
            recipe_type recipe_type,
            FOREIGN KEY (author_id) REFERENCES users(user_id)
        );
        
        CREATE TABLE IF NOT EXISTS rating (
            rating_id SERIAL PRIMARY KEY,
            rater_id INT,
            rated_id INT,
            FOREIGN KEY (rater_id) REFERENCES users(user_id),
            FOREIGN KEY (rated_id) REFERENCES recipe(recipe_id)
        );
        
        CREATE TYPE product_type AS ENUM('fruits', 'vegetables', 'meat', 'dairy', 'grains', 'seafood');
        CREATE TABLE IF NOT EXISTS product (
            product_id SERIAL PRIMARY KEY,
            product_name TEXT DEFAULT '',
            image TEXT DEFAULT '',
            product_type product_type,
            product_category product_category
        );
        
        CREATE TABLE IF NOT EXISTS liked_recipes (
            like_id SERIAL PRIMARY KEY,
            recipe_id INT,
            FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
        );
        
        CREATE TABLE IF NOT EXISTS steps (
            step_id SERIAL PRIMARY KEY,
            recipe_id INT NOT NULL,
            step_number INT NOT NULL,
            description TEXT NOT NULL,
            FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
            UNIQUE (recipe_id, step_number)
        );
        
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS liked_recipes;
            DROP TABLE IF EXISTS rating;
            DROP TABLE IF EXISTS product;
            DROP TABLE IF EXISTS recipe;
            DROP TABLE IF EXISTS users;

            DROP TYPE IF EXISTS recipe_type;
            DROP TYPE IF EXISTS product_type;
        `);
    }

}
