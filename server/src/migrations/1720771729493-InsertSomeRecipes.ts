import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertSomeRecipes1720771729493 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO recipes (name, author_id, image, recipe_type_id) VALUES
            ('Classic Caesar Salad', 1, 'caesar_salad.jpg', (SELECT id FROM recipe_types WHERE name = 'salads')),
            ('Spaghetti Bolognese', 1, 'spaghetti_bolognese.jpg', (SELECT id FROM recipe_types WHERE name = 'main meal')),
            ('Chocolate Cake', 1, 'chocolate_cake.jpg', (SELECT id FROM recipe_types WHERE name = 'dessert')),
            ('Lemonade', 1, 'lemonade.jpg', (SELECT id FROM recipe_types WHERE name = 'beverages')),
            ('Grilled Cheese Sandwich', 1, 'grilled_cheese.jpg', (SELECT id FROM recipe_types WHERE name = 'snacks')),
            ('Bruschetta', 1, 'bruschetta.jpg', (SELECT id FROM recipe_types WHERE name = 'appetizer'));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
