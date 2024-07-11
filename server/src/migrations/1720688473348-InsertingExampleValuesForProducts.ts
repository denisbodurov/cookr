import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertingExampleValuesForProducts1720688473348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            -- Example of inserting 50 rows into the products table
            INSERT INTO products (product_name, image, unit_id, percent_carbs, percent_fats, percent_protein, calories, product_type_id)
            VALUES
                ('Apple', 'apple.jpg', 3, 15, 0, 0, 52, 1),
                ('Banana', 'banana.jpg', 3, 23, 0, 1, 89, 1),
                ('Carrot', 'carrot.jpg', 4, 10, 0, 1, 41, 2),
                ('Broccoli', 'broccoli.jpg', 4, 7, 0, 3, 34, 2),
                ('Chicken Breast', 'chicken_breast.jpg', 2, 0, 3, 31, 165, 3),
                ('Salmon Fillet', 'salmon_fillet.jpg', 2, 0, 10, 20, 208, 6),
                ('Milk', 'milk.jpg', 1, 5, 3, 3, 42, 4),
                ('Yogurt', 'yogurt.jpg', 1, 8, 3, 5, 59, 4),
                ('Oats', 'oats.jpg', 5, 66, 7, 17, 389, 5),
                ('Rice', 'rice.jpg', 5, 78, 2, 7, 130, 5),
                ('Apple Pie', 'apple_pie.jpg', 6, 44, 21, 3, 237, 4),
                ('Pasta', 'pasta.jpg', 5, 71, 1, 12, 131, 5),
                ('Egg', 'egg.jpg', 1, 1, 7, 13, 155, 3),
                ('Cheese', 'cheese.jpg', 1, 1, 31, 25, 402, 4),
                ('Lettuce', 'lettuce.jpg', 4, 2, 0, 1, 15, 2),
                ('Almonds', 'almonds.jpg', 3, 22, 55, 21, 576, 6),
                ('Pineapple', 'pineapple.jpg', 3, 13, 1, 0, 50, 1),
                ('Beef', 'beef.jpg', 2, 0, 20, 31, 250, 3),
                ('Orange', 'orange.jpg', 3, 12, 0, 1, 47, 1),
                ('Potato', 'potato.jpg', 4, 18, 0, 2, 77, 2),
                ('Spinach', 'spinach.jpg', 4, 3, 0, 3, 23, 2),
                ('Quinoa', 'quinoa.jpg', 5, 71, 6, 14, 368, 5),
                ('Bread', 'bread.jpg', 5, 53, 6, 11, 265, 5),
                ('Walnuts', 'walnuts.jpg', 3, 14, 65, 15, 654, 6),
                ('Grapes', 'grapes.jpg', 3, 18, 0, 1, 69, 1),
                ('Turkey Breast', 'turkey_breast.jpg', 2, 0, 1, 30, 149, 3),
                ('Shrimp', 'shrimp.jpg', 2, 0, 1, 20, 99, 6),
                ('Cheeseburger', 'cheeseburger.jpg', 1, 17, 25, 13, 303, 4),
                ('Pizza', 'pizza.jpg', 1, 27, 14, 12, 266, 4),
                ('Avocado', 'avocado.jpg', 3, 9, 15, 2, 160, 1),
                ('Cucumber', 'cucumber.jpg', 4, 4, 0, 1, 16, 2),
                ('Hazelnuts', 'hazelnuts.jpg', 3, 17, 61, 15, 629, 6),
                ('Kiwi', 'kiwi.jpg', 3, 15, 1, 1, 61, 1),
                ('Pork Chop', 'pork_chop.jpg', 2, 0, 23, 29, 242, 3),
                ('Tuna', 'tuna.jpg', 2, 0, 6, 30, 184, 6),
                ('Chocolate', 'chocolate.jpg', 1, 57, 33, 7, 546, 4),
                ('Ice Cream', 'ice_cream.jpg', 1, 23, 12, 4, 207, 4),
                ('Honey', 'honey.jpg', 5, 82, 0, 0, 304, 5),
                ('Maple Syrup', 'maple_syrup.jpg', 5, 67, 0, 0, 260, 5),
                ('Blueberries', 'blueberries.jpg', 3, 14, 1, 1, 57, 1),
                ('Peanut Butter', 'peanut_butter.jpg', 5, 20, 50, 25, 589, 5),
                ('Cabbage', 'cabbage.jpg', 4, 6, 0, 1, 25, 2),
                ('Cashews', 'cashews.jpg', 3, 22, 55, 18, 574, 6),
                ('Dates', 'dates.jpg', 3, 75, 0, 2, 282, 1),
                ('Mango', 'mango.jpg', 3, 15, 1, 0, 60, 1),
                ('Steak', 'steak.jpg', 2, 0, 14, 30, 271, 3),
                ('Scallops', 'scallops.jpg', 2, 0, 3, 20, 111, 6),
                ('Pecans', 'pecans.jpg', 3, 14, 71, 9, 691, 6),
                ('Watermelon', 'watermelon.jpg', 3, 8, 1, 1, 30, 1),
                ('Olive Oil', 'olive_oil.jpg', 5, 0, 100, 0, 884, 5);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
