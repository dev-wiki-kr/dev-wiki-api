import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1717081007092 implements MigrationInterface {
    name = 'CreateUserTable1717081007092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avartarUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avartarUrl"`);
    }

}
