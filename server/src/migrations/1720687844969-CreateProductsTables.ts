import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTables1720687844969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product_types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                image TEXT DEFAULT ''
            );
            
            --add images in base64
            INSERT INTO product_types (name, image) VALUES
            ('fruits', 'fruits.jpg'),
            ('vegetables', 'vegetables.jpg'),
            ('meat', 'meat.jpg'),
            ('dairy', 'dairy.jpg'),
            ('grains', 'grains.jpg'),
            ('seafood', 'seafood.jpg');
            
            CREATE TABLE IF NOT EXISTS units (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );
            
            INSERT INTO units (name) VALUES
            ('piece'),
            ('slice'),
            ('fruit'),
            ('grams'),
            ('oz'),
            ('cup'),
            ('serving');

            CREATE TABLE IF NOT EXISTS products (
                product_id SERIAL PRIMARY KEY,
                product_name TEXT DEFAULT '',
                image TEXT DEFAULT '',
                unit_id INT,
                percent_carbs INT,
                percent_fats INT,
                percent_protein INT,
                calories INT,
                product_type_id INT,
                FOREIGN KEY (product_type_id) REFERENCES product_types(id) ON DELETE CASCADE,
                FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
