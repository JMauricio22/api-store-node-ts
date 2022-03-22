import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTokenColumnToUser1647922176063 implements MigrationInterface {
  name = 'addTokenColumnToUser1647922176063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
  }
}
