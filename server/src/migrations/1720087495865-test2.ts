import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21720087495865 implements MigrationInterface {
    name = 'Test21720087495865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_56d67920b772ea1c9f9cb145675"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_72dcd2b16099b079a11d7631400"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_408d3a472aee7d78a38939d97e3"`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" DROP CONSTRAINT "liked_recipes_recipe_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "steps_recipe_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_d12d94366859be82e43a8f52645"`);
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "steps_recipe_id_step_number_key"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "users_username_email_key"`);
        await queryRunner.query(`ALTER TABLE "steps" RENAME COLUMN "recipe_id" TO "recipeRecipeId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "PK_0267080809b99525888265ef64d"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "PK_1ba02007f1315301d9553a6839a" PRIMARY KEY ("rating_id")`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "like_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "UQ_56d67920b772ea1c9f9cb145675"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "recipeIdRecipeId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rater_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rated_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "UQ_72dcd2b16099b079a11d7631400"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "raterIdUserId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "UQ_408d3a472aee7d78a38939d97e3"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "ratedIdRecipeId"`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" DROP COLUMN "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "REL_d12d94366859be82e43a8f5264"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "authorIdUserId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "raterUserId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "recipeRecipeId" integer`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" ADD "recipeRecipeId" integer`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."recipe_recipe_type_enum" AS ENUM('breakfast', 'lunch', 'dinner', 'dessert', 'snack')`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "recipe_type" "public"."recipe_recipe_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "authorUserId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."product_product_type_enum" AS ENUM('fruits', 'vegetables', 'meat', 'dairy', 'grains', 'seafood')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_type" "public"."product_product_type_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."product_product_category_enum" AS ENUM('protein', 'carbs', 'fats')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_category" "public"."product_product_category_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "steps" ALTER COLUMN "recipeRecipeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "steps"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "steps" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "image" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_name" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("username", "email")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_67c8f7d4ce20dfc710f165eac4f" FOREIGN KEY ("raterUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_295b736757eb03d26ec73d89173" FOREIGN KEY ("recipeRecipeId") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" ADD CONSTRAINT "FK_e622823f204a88b18163ffd6eaf" FOREIGN KEY ("recipeRecipeId") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" ADD CONSTRAINT "FK_70f8e40b593d41e2562eb751cd0" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_5c23b25c15a5742fdf17ea54945" FOREIGN KEY ("recipeRecipeId") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_b4abb58757ddcee4fdbe066207b" FOREIGN KEY ("authorUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_b4abb58757ddcee4fdbe066207b"`);
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_5c23b25c15a5742fdf17ea54945"`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" DROP CONSTRAINT "FK_70f8e40b593d41e2562eb751cd0"`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" DROP CONSTRAINT "FK_e622823f204a88b18163ffd6eaf"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_295b736757eb03d26ec73d89173"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_67c8f7d4ce20dfc710f165eac4f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_name" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "image" text DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" text DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "image" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "steps"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "steps" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "steps" ALTER COLUMN "recipeRecipeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_category"`);
        await queryRunner.query(`DROP TYPE "public"."product_product_category_enum"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_type"`);
        await queryRunner.query(`DROP TYPE "public"."product_product_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "authorUserId"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "recipe_type"`);
        await queryRunner.query(`DROP TYPE "public"."recipe_recipe_type_enum"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" DROP COLUMN "recipeRecipeId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "recipeRecipeId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "raterUserId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "authorIdUserId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "REL_d12d94366859be82e43a8f5264" UNIQUE ("authorIdUserId")`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "author_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" ADD "recipe_id" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "ratedIdRecipeId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "UQ_408d3a472aee7d78a38939d97e3" UNIQUE ("ratedIdRecipeId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "raterIdUserId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "UQ_72dcd2b16099b079a11d7631400" UNIQUE ("raterIdUserId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rated_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rater_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "recipeIdRecipeId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "UQ_56d67920b772ea1c9f9cb145675" UNIQUE ("recipeIdRecipeId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "recipe_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "like_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "PK_1ba02007f1315301d9553a6839a"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "PK_0267080809b99525888265ef64d" PRIMARY KEY ("like_id", "rating_id")`);
        await queryRunner.query(`ALTER TABLE "steps" RENAME COLUMN "recipeRecipeId" TO "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "users_username_email_key" UNIQUE ("username", "email")`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_step_number_key" UNIQUE ("recipe_id", "step_number")`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_d12d94366859be82e43a8f52645" FOREIGN KEY ("authorIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "liked_recipes" ADD CONSTRAINT "liked_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_408d3a472aee7d78a38939d97e3" FOREIGN KEY ("ratedIdRecipeId") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_72dcd2b16099b079a11d7631400" FOREIGN KEY ("raterIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_56d67920b772ea1c9f9cb145675" FOREIGN KEY ("recipeIdRecipeId") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
