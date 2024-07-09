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
                recipe_type recipe_type,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
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
            ('Strawberries', 'strawberries.jpg', 'cup', 91, 4, 5, 49, 'fruits'),
            ('Asparagus', 'asparagus.jpg', 'cup', 54, 4, 42, 27, 'vegetables'),
            ('Butter', 'butter.jpg', 'oz', 0, 99, 1, 102, 'dairy'),
            ('Pasta (cooked)', 'pasta-cooked.jpg', 'cup', 72, 4, 24, 131, 'grains'),
            ('Cod', 'cod.jpg', 'oz', 0, 2, 98, 82, 'seafood'),
            ('Blueberries', 'blueberries.jpg', 'cup', 96, 2, 2, 84, 'fruits'),
            ('Bell Pepper', 'bell-pepper.jpg', 'piece', 74, 10, 16, 31, 'vegetables'),
            ('Lamb', 'lamb.jpg', 'oz', 0, 60, 40, 281, 'meat'),
            ('Eggs', 'eggs.jpg', 'piece', 1, 63, 36, 68, 'dairy'),
            ('Brown Bread', 'brown-bread.jpg', 'slice', 49, 8, 43, 79, 'grains'),
            ('Sardines', 'sardines.jpg', 'oz', 0, 55, 45, 208, 'seafood'),
            ('Raspberries', 'raspberries.jpg', 'cup', 89, 5, 6, 64, 'fruits'),
            ('Cucumber', 'cucumber.jpg', 'piece', 4, 1, 95, 16, 'vegetables'),
            ('Veal', 'veal.jpg', 'oz', 0, 29, 71, 145, 'meat'),
            ('Mozzarella', 'mozzarella.jpg', 'oz', 3, 51, 46, 85, 'dairy'),
            ('White Rice', 'white-rice.jpg', 'cup', 87, 3, 10, 206, 'grains'),
            ('Clams', 'clams.jpg', 'oz', 4, 24, 72, 126, 'seafood'),
            ('Pineapple', 'pineapple.jpg', 'cup', 94, 2, 4, 82, 'fruits'),
            ('Zucchini', 'zucchini.jpg', 'piece', 3, 1, 96, 20, 'vegetables'),
            ('Duck', 'duck.jpg', 'oz', 0, 57, 43, 337, 'meat'),
            ('Greek Yogurt', 'greek-yogurt.jpg', 'cup', 10, 24, 66, 59, 'dairy'),
            ('Whole Wheat Bread', 'whole-wheat-bread.jpg', 'slice', 45, 9, 46, 77, 'grains'),
            ('Anchovies', 'anchovies.jpg', 'oz', 0, 32, 68, 210, 'seafood'),
            ('Blackberries', 'blackberries.jpg', 'cup', 88, 5, 7, 62, 'fruits'),
            ('Celery', 'celery.jpg', 'piece', 5, 1, 94, 6, 'vegetables'),
            ('Buffalo', 'buffalo.jpg', 'oz', 0, 21, 79, 143, 'meat'),
            ('Cottage Cheese', 'cottage-cheese.jpg', 'cup', 3, 20, 77, 206, 'dairy'),
            ('Quinoa (cooked)', 'quinoa-cooked.jpg', 'cup', 21, 9, 70, 222, 'grains'),
            ('Scallops', 'scallops.jpg', 'oz', 3, 17, 80, 89, 'seafood'),
            ('Pears', 'pears.jpg', 'piece', 96, 1, 3, 57, 'fruits'),
            ('Sweet Potato', 'sweet-potato.jpg', 'piece', 90, 1, 9, 86, 'vegetables'),
            ('Salami', 'salami.jpg', 'oz', 3, 77, 20, 378, 'meat'),
            ('Cream Cheese', 'cream-cheese.jpg', 'oz', 4, 88, 8, 99, 'dairy'),
            ('Wild Rice', 'wild-rice.jpg', 'cup', 76, 1, 23, 166, 'grains'),
            ('Catfish', 'catfish.jpg', 'oz', 0, 18, 82, 105, 'seafood'),
            ('Papaya', 'papaya.jpg', 'cup', 88, 2, 10, 55, 'fruits'),
            ('Cabbage', 'cabbage.jpg', 'cup', 92, 1, 7, 22, 'vegetables'),
            ('Ham', 'ham.jpg', 'oz', 0, 37, 63, 145, 'meat'),
            ('Gouda Cheese', 'gouda-cheese.jpg', 'oz', 2, 66, 32, 101, 'dairy'),
            ('Bulgur', 'bulgur.jpg', 'cup', 75, 4, 21, 151, 'grains'),
            ('Trout', 'trout.jpg', 'oz', 0, 27, 73, 168, 'seafood'),
            ('Kiwi', 'kiwi.jpg', 'piece', 89, 5, 6, 42, 'fruits'),
            ('Cauliflower', 'cauliflower.jpg', 'cup', 92, 1, 7, 27, 'vegetables'),
            ('Venison', 'venison.jpg', 'oz', 0, 8, 92, 158, 'meat'),
            ('Swiss Cheese', 'swiss-cheese.jpg', 'oz', 3, 64, 33, 106, 'dairy'),
            ('Millet', 'millet.jpg', 'cup', 73, 4, 23, 207, 'grains'),
            ('Halibut', 'halibut.jpg', 'oz', 0, 5, 95, 115, 'seafood');
            INSERT INTO products (product_name, image, unit, percent_carbs, percent_fats, percent_protein, calories, product_type) VALUES
            ('Watermelon', 'watermelon.jpg', 'cup', 91, 1, 8, 46, 'fruits'),
            ('Onion', 'onion.jpg', 'piece', 89, 1, 10, 44, 'vegetables'),
            ('Turkey', 'turkey.jpg', 'oz', 0, 18, 82, 135, 'meat'),
            ('Cheddar Cheese', 'cheddar-cheese.jpg', 'oz', 1, 73, 26, 113, 'dairy'),
            ('Rye', 'rye.jpg', 'slice', 70, 5, 25, 83, 'grains'),
            ('Crayfish', 'crayfish.jpg', 'oz', 0, 15, 85, 82, 'seafood'),
            ('Green Beans', 'green-beans.jpg', 'cup', 78, 4, 18, 31, 'vegetables'),
            ('Elk', 'elk.jpg', 'oz', 0, 7, 93, 146, 'meat'),
            ('Coconut Milk', 'coconut-milk.jpg', 'cup', 6, 86, 8, 552, 'dairy'),
            ('Spelt', 'spelt.jpg', 'cup', 72, 4, 24, 246, 'grains'),
            ('Shrimp', 'shrimp.jpg', 'oz', 1, 15, 84, 99, 'seafood'),
            ('Persimmon', 'persimmon.jpg', 'piece', 95, 4, 1, 118, 'fruits'),
            ('Celeriac', 'celeriac.jpg', 'cup', 8, 2, 90, 66, 'vegetables'),
            ('Venison', 'venison.jpg', 'oz', 0, 8, 92, 158, 'meat'),
            ('Feta Cheese', 'feta-cheese.jpg', 'oz', 4, 60, 36, 74, 'dairy'),
            ('Amaranth', 'amaranth.jpg', 'cup', 73, 8, 19, 251, 'grains'),
            ('Lobster', 'lobster.jpg', 'oz', 0, 5, 95, 83, 'seafood'),
            ('Starfruit', 'starfruit.jpg', 'piece', 91, 0, 9, 28, 'fruits'),
            ('Kohlrabi', 'kohlrabi.jpg', 'piece', 27, 1, 72, 36, 'vegetables'),
            ('Pheasant', 'pheasant.jpg', 'oz', 0, 4, 96, 165, 'meat'),
            ('Mascarpone', 'mascarpone.jpg', 'oz', 4, 75, 21, 120, 'dairy'),
            ('Sorghum', 'sorghum.jpg', 'cup', 75, 3, 22, 651, 'grains'),
            ('Mackerel', 'mackerel.jpg', 'oz', 0, 60, 40, 305, 'seafood'),
            ('Dragonfruit', 'dragonfruit.jpg', 'piece', 90, 4, 6, 60, 'fruits'),
            ('Jicama', 'jicama.jpg', 'piece', 90, 1, 9, 46, 'vegetables'),
            ('Quail', 'quail.jpg', 'oz', 0, 16, 84, 140, 'meat'),
            ('Cream', 'cream.jpg', 'cup', 7, 82, 11, 821, 'dairy'),
            ('Freekeh', 'freekeh.jpg', 'cup', 71, 4, 25, 346, 'grains'),
            ('Oysters', 'oysters.jpg', 'oz', 8, 28, 64, 67, 'seafood'),
            ('Fig', 'fig.jpg', 'piece', 82, 7, 11, 47, 'fruits'),
            ('Bok Choy', 'bok-choy.jpg', 'cup', 95, 1, 4, 9, 'vegetables'),
            ('Pigeon', 'pigeon.jpg', 'oz', 0, 8, 92, 176, 'meat'),
            ('Cream Cheese', 'cream-cheese.jpg', 'oz', 3, 80, 17, 342, 'dairy'),
            ('Amaranth', 'amaranth.jpg', 'cup', 75, 9, 16, 251, 'grains'),
            ('Sardines', 'sardines.jpg', 'oz', 0, 52, 48, 208, 'seafood'),
            ('Lychee', 'lychee.jpg', 'piece', 92, 4, 4, 6, 'fruits'),
            ('Radish', 'radish.jpg', 'piece', 4, 1, 95, 6, 'vegetables'),
            ('Duck', 'duck.jpg', 'oz', 0, 57, 43, 337, 'meat'),
            ('Goat Cheese', 'goat-cheese.jpg', 'oz', 4, 71, 25, 103, 'dairy'),
            ('Amaranth', 'amaranth.jpg', 'cup', 72, 8, 20, 251, 'grains'),
            ('Tilapia', 'tilapia.jpg', 'oz', 0, 7, 93, 128, 'seafood');


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
            DROP VIEW IF EXISTS one_recipe_view;

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
