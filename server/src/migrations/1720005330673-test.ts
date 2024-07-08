import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1720005330673 implements MigrationInterface {
  name = 'Test1720005330673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE recipe_type AS ENUM('breakfast', 'lunch', 'dinner', 'dessert', 'snack');
            -- CREATE TYPE product_category AS ENUM('protein', 'carbs', 'fats');
            CREATE TYPE product_type AS ENUM('fruits', 'vegetables', 'meat', 'dairy', 'grains', 'seafood');
            CREATE TYPE units AS ENUM('piece', 'slice', 'fruit', 'g', 'oz', 'cup', 'serving');

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

            CREATE TABLE IF NOT EXISTS products (
                product_id SERIAL PRIMARY KEY,
                product_name TEXT DEFAULT '',
                image TEXT DEFAULT '',
                unit units,
                -- Can add price for estimated cost of recipe
                -- Every amount is for 100 grams
                percent_carbs INT, -- In grams
                percent_fats INT,
                percent_protein INT,
                calories INT, -- kcal
                product_type product_type
            );

            INSERT INTO products (product_name, image, unit, percent_carbs, percent_fats, percent_protein, calories, product_type) VALUES
            ('Product 1', 'image1.jpg', 'g', 50, 30, 20, 100, 'fruits'),
            ('Product 2', 'image2.jpg', 'g', 40, 30, 30, 150, 'vegetables'),
            ('Product 3', 'image3.jpg', 'g', 60, 20, 20, 120, 'meat'),
            ('Product 4', 'image4.jpg', 'g', 30, 50, 20, 110, 'dairy'),
            ('Product 5', 'image5.jpg', 'g', 45, 35, 20, 200, 'grains'),
            ('Product 6', 'image6.jpg', 'g', 50, 25, 25, 180, 'seafood'),
            ('Product 7', 'image7.jpg', 'g', 55, 25, 20, 130, 'fruits'),
            ('Product 8', 'image8.jpg', 'g', 35, 40, 25, 160, 'vegetables'),
            ('Product 9', 'image9.jpg', 'g', 50, 30, 20, 110, 'meat'),
            ('Product 10', 'image10.jpg', 'g', 33, 33, 34, 140, 'dairy');


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
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
                FOREIGN KEY (product_id) REFERENCES products(product_id)
            );

            CREATE VIEW recipe_view AS
            SELECT
            r.recipe_id,
            r.name AS recipe_name,
            r.image AS recipe_image,
            r.recipe_type,
            r.created_at,
            r.updated_at,
            u.user_id AS author_id,
            u.username AS author_username,
            u.first_name AS author_first_name,
            u.last_name AS author_last_name,
            CAST(COUNT(DISTINCT lr.like_id) AS INTEGER) AS like_count,
            AVG(rt.rating) AS average_rating
            FROM recipes r
            JOIN users u ON r.author_id = u.user_id
            LEFT JOIN ratings rt ON r.recipe_id = rt.rated_id
            LEFT JOIN liked_recipes lr ON r.recipe_id = lr.recipe_id
            GROUP BY
            r.recipe_id,
            r.name,
            r.image,
            r.recipe_type,
            r.created_at,
            r.updated_at,
            u.user_id,
            u.username,
            u.first_name,
            u.last_name;

            CREATE VIEW one_recipe_view AS
            SELECT
                r.recipe_id,
                r.name AS recipe_name,
                r.image AS recipe_image,
                r.recipe_type,
                r.created_at,
                r.updated_at,
                u.user_id AS author_id,
                u.username AS author_username,
                u.first_name AS author_first_name,
                u.last_name AS author_last_name,
                CAST(COUNT(DISTINCT lr.like_id) AS INTEGER) AS like_count,
                AVG(rt.rating) AS average_rating,
                json_agg(json_build_object(
                    'step_id', s.step_id,
                    'step_number', s.step_number,
                    'description', s.description
                ) ORDER BY s.step_number) AS steps,
                json_agg(json_build_object(
                    'rating_id', rt.rating_id,
                    'rater_id', rt.rater_id,
                    'rating', rt.rating,
                    'description', rt.description,
                    'created_at', rt.created_at
                ) ORDER BY rt.created_at) AS ratings
            FROM recipes r
            JOIN users u ON r.author_id = u.user_id
            LEFT JOIN ratings rt ON r.recipe_id = rt.rated_id
            LEFT JOIN liked_recipes lr ON r.recipe_id = lr.recipe_id
            LEFT JOIN steps s ON r.recipe_id = s.recipe_id
            GROUP BY
                r.recipe_id,
                r.name,
                r.image,
                r.recipe_type,
                r.created_at,
                r.updated_at,
                u.user_id,
                u.username,
                u.first_name,
                u.last_name;


        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP VIEW IF EXISTS recipe_view;
            DROP TABLE IF EXISTS ingredients;
            DROP TABLE IF EXISTS steps;
            DROP TABLE IF EXISTS liked_recipes;
            DROP TABLE IF EXISTS ratings;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS recipes;
            DROP TABLE IF EXISTS users;

            DROP TYPE IF EXISTS recipe_type;
            DROP TYPE IF EXISTS product_type;
            DROP TYPE IF EXISTS units;
        `);
  }
}
