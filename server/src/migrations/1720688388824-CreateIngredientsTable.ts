import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIngredientsTable1720688388824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
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
    }

}
