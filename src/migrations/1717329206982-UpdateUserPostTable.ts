import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserPostTable1717329206982 implements MigrationInterface {
    name = 'UpdateUserPostTable1717329206982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_post_role_enum" AS ENUM('author', 'editor')`);
        await queryRunner.query(`CREATE TABLE "user_post" ("userId" integer NOT NULL, "postId" integer NOT NULL, "role" "public"."user_post_role_enum" NOT NULL, CONSTRAINT "PK_45cdc90ca0fd4cf0f8e8026e395" PRIMARY KEY ("userId", "postId"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_900ea498bca394ca208b4c243b8"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_016c10c41e2eb74236ea705e11a" PRIMARY KEY ("shortTitle", "id")`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_016c10c41e2eb74236ea705e11a"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_61c64496bf096b321869175021a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_3eb8e2db42e1474c4e900b96688" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_3eb8e2db42e1474c4e900b96688"`);
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_61c64496bf096b321869175021a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_016c10c41e2eb74236ea705e11a" PRIMARY KEY ("shortTitle", "id")`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_016c10c41e2eb74236ea705e11a"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_900ea498bca394ca208b4c243b8" PRIMARY KEY ("shortTitle")`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
        await queryRunner.query(`DROP TABLE "user_post"`);
        await queryRunner.query(`DROP TYPE "public"."user_post_role_enum"`);
    }

}
