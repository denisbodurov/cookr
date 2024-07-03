import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1720004445772 implements MigrationInterface {
    name = 'Test1720004445772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("recipe_id" SERIAL NOT NULL, "author_id" integer NOT NULL, "steps" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "authorIdUserId" integer, CONSTRAINT "REL_d12d94366859be82e43a8f5264" UNIQUE ("authorIdUserId"), CONSTRAINT "PK_fac4e98d1c750e42f38a09ca327" PRIMARY KEY ("recipe_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80" UNIQUE ("username", "email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("rating_id" SERIAL NOT NULL, "rater_id" integer NOT NULL, "rated_id" integer NOT NULL, "raterIdUserId" integer, "ratedIdRecipeId" integer, CONSTRAINT "REL_72dcd2b16099b079a11d763140" UNIQUE ("raterIdUserId"), CONSTRAINT "REL_408d3a472aee7d78a38939d97e" UNIQUE ("ratedIdRecipeId"), CONSTRAINT "PK_1ba02007f1315301d9553a6839a" PRIMARY KEY ("rating_id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("product_id" SERIAL NOT NULL, "product_name" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "PK_1ba02007f1315301d9553a6839a"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rating_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rater_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "rated_id"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "REL_72dcd2b16099b079a11d763140"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "raterIdUserId"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "REL_408d3a472aee7d78a38939d97e"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "ratedIdRecipeId"`);
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
        await queryRunner.query(`ALTER TABLE "rating" ADD "ratedIdRecipeId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "REL_408d3a472aee7d78a38939d97e" UNIQUE ("ratedIdRecipeId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "raterIdUserId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "REL_72dcd2b16099b079a11d763140" UNIQUE ("raterIdUserId")`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rated_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rater_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "rating_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "PK_1ba02007f1315301d9553a6839a" PRIMARY KEY ("rating_id")`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
