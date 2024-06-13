import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDisplayName1718294247565 implements MigrationInterface {
    name = 'UserDisplayName1718294247565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "displayName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "displayName" SET NOT NULL`);
    }

}
