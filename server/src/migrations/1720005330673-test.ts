import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1720005330673 implements MigrationInterface {
  name = 'Test1720005330673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS recipe_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                image TEXT DEFAULT ''
            );
            
            -- Insert initial data into recipe_type
            INSERT INTO recipe_types (name, image) VALUES
            ('breakfast', 'breakfast.jpg'),
            ('lunch', 'lunch.jpg'),
            ('dinner', 'dinner.jpg'),
            ('dessert', 'dessert.jpg'),
            ('snack', 'snack.jpg');
            
            -- Create table for product_type
            CREATE TABLE IF NOT EXISTS product_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                image TEXT DEFAULT ''
            );
            
            -- Insert initial data into product_type
            INSERT INTO product_types (name, image) VALUES
            ('fruits', 'fruits.jpg'),
            ('vegetables', 'vegetables.jpg'),
            ('meat', 'meat.jpg'),
            ('dairy', 'dairy.jpg'),
            ('grains', 'grains.jpg'),
            ('seafood', 'seafood.jpg');
            
            -- Create table for units
            CREATE TABLE IF NOT EXISTS units (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                image TEXT DEFAULT ''
            );
            
            -- Insert initial data into units
            INSERT INTO units (name, image) VALUES
            ('piece', 'piece.jpg'),
            ('slice', 'slice.jpg'),
            ('fruit', 'fruit.jpg'),
            ('g', 'g.jpg'),
            ('oz', 'oz.jpg'),
            ('cup', 'cup.jpg'),
            ('serving', 'serving.jpg');

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

            CREATE TABLE IF NOT EXISTS products (
                product_id SERIAL PRIMARY KEY,
                product_name TEXT DEFAULT '',
                image TEXT DEFAULT '',
                unit_id INT,
                -- Can add price for estimated cost of recipe
                -- Every amount is for 100 grams
                percent_carbs INT, -- In grams
                percent_fats INT,
                percent_protein INT,
                calories INT, -- kcal
                product_type_id INT,
                FOREIGN KEY (product_type_id) REFERENCES product_types(id) ON DELETE CASCADE,
                FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS liked_recipes (
                like_id SERIAL PRIMARY KEY,
                recipe_id INT,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS steps (
                step_id SERIAL PRIMARY KEY,
                recipe_id INT NOT NULL,
                step_number INT NOT NULL,
                description TEXT NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
                UNIQUE (recipe_id, step_number)
            );

            CREATE TABLE IF NOT EXISTS ingredients (
                ingredient_id SERIAL PRIMARY KEY,
                recipe_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity DECIMAL NOT NULL,
                FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
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
            DROP TABLE IF EXISTS recipe_types;
            DROP TABLE IF EXISTS product_types;
            DROP TABLE IF EXISTS units;
        `);
  }
}
