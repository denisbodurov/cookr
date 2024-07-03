import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration implements MigrationInterface{
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
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
                password VARCHAR(255) NOT NULL,
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
                product_type product_type
            );
            
            CREATE TABLE IF NOT EXISTS liked_recipes (
                like_id SERIAL PRIMARY KEY,
                recipe_id INT,
                FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
            );
        
        `)

        throw new Error("Method not implemented.");
    }

    down(queryRunner: QueryRunner): Promise<any> {
        throw new Error("Method not implemented.");
    }

    name = 'BaseMigration'
}