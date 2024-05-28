import { MigrationInterface, QueryRunner } from "typeorm";

export class User1716918453089 implements MigrationInterface {
    name = 'User1716918453089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "githubId" character varying NOT NULL, "username" character varying NOT NULL, "displayName" character varying NOT NULL, "profileUrl" character varying NOT NULL, CONSTRAINT "UQ_0d84cc6a830f0e4ebbfcd6381dd" UNIQUE ("githubId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
