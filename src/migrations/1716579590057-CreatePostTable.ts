import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1716579590057 implements MigrationInterface {
    name = 'CreatePostTable1716579590057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("shortTitle" character varying NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_900ea498bca394ca208b4c243b8" PRIMARY KEY ("shortTitle"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
