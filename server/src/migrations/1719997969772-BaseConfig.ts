import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseConfig1719997969772 implements MigrationInterface {
    name = 'BaseConfig1719997969772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "recipe_author_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "rating_rater_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "rating_rated_id_fkey"`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80" UNIQUE ("username", "email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_type"`);
        await queryRunner.query(`DROP TYPE "public"."product_type"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "rating_pkey"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rating_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rater_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rated_id"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "authorIdUserId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_d12d94366859be82e43a8f52645" UNIQUE ("authorIdUserId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rating_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "PK_1ba02007f1315301d9553a6839a" PRIMARY KEY ("rating_id")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rater_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rated_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "raterIdUserId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "UQ_72dcd2b16099b079a11d7631400" UNIQUE ("raterIdUserId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "ratedIdRecipeId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "UQ_408d3a472aee7d78a38939d97e3" UNIQUE ("ratedIdRecipeId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "like_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "PK_1ba02007f1315301d9553a6839a"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "PK_0267080809b99525888265ef64d" PRIMARY KEY ("rating_id", "like_id")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "recipe_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "recipeIdRecipeId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "UQ_56d67920b772ea1c9f9cb145675" UNIQUE ("recipeIdRecipeId")`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "author_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "steps"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "steps" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "image" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_name" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_d12d94366859be82e43a8f52645" FOREIGN KEY ("authorIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_72dcd2b16099b079a11d7631400" FOREIGN KEY ("raterIdUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_408d3a472aee7d78a38939d97e3" FOREIGN KEY ("ratedIdRecipeId") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_56d67920b772ea1c9f9cb145675" FOREIGN KEY ("recipeIdRecipeId") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_56d67920b772ea1c9f9cb145675"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_408d3a472aee7d78a38939d97e3"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_72dcd2b16099b079a11d7631400"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_d12d94366859be82e43a8f52645"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" text DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_name" text DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "image" text DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "steps"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "steps" text DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "author_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "UQ_56d67920b772ea1c9f9cb145675"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "recipeIdRecipeId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "PK_0267080809b99525888265ef64d"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "PK_1ba02007f1315301d9553a6839a" PRIMARY KEY ("rating_id")`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "like_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "UQ_408d3a472aee7d78a38939d97e3"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "ratedIdRecipeId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "UQ_72dcd2b16099b079a11d7631400"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "raterIdUserId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rated_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rater_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "PK_1ba02007f1315301d9553a6839a"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rating_id"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_d12d94366859be82e43a8f52645"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "authorIdUserId"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rated_id" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rater_id" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rating_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "rating_pkey" PRIMARY KEY ("rating_id")`);
        await queryRunner.query(`CREATE TYPE "public"."product_type" AS ENUM('fruits', 'vegetables', 'meat', 'dairy', 'grains', 'seafood')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_type" "public"."product_type"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "rating_rated_id_fkey" FOREIGN KEY ("rated_id") REFERENCES "recipe"("recipe_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "rating_rater_id_fkey" FOREIGN KEY ("rater_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "recipe_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
