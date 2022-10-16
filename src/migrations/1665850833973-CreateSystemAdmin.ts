import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSystemAdmin1665850833973 implements MigrationInterface {
  name = 'CreateSystemAdmin1665850833973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "company_admin" DROP CONSTRAINT "FK_a50386174b5d9b1a258f2332cce"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP CONSTRAINT "FK_3f916f97edcba428ad50d8d54ef"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "salary"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "name"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "address"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "phone"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP CONSTRAINT "UQ_a50386174b5d9b1a258f2332cce"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "company_id"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP CONSTRAINT "UQ_3f916f97edcba428ad50d8d54ef"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "company"');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "company" uuid');
    await queryRunner.query('ALTER TABLE "company_admin" ADD CONSTRAINT "UQ_3f916f97edcba428ad50d8d54ef" UNIQUE ("company")');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "salary" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "name" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "address" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "phone" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "company_id" uuid');
    await queryRunner.query('ALTER TABLE "company_admin" ADD CONSTRAINT "UQ_a50386174b5d9b1a258f2332cce" UNIQUE ("company_id")');
    await queryRunner.query(
      'ALTER TABLE "company_admin" ADD CONSTRAINT "FK_3f916f97edcba428ad50d8d54ef" FOREIGN KEY ("company") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "company_admin" ADD CONSTRAINT "FK_a50386174b5d9b1a258f2332cce" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "company_admin" DROP CONSTRAINT "FK_a50386174b5d9b1a258f2332cce"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP CONSTRAINT "FK_3f916f97edcba428ad50d8d54ef"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP CONSTRAINT "UQ_a50386174b5d9b1a258f2332cce"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "company_id"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "phone"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "address"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "name"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "salary"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP CONSTRAINT "UQ_3f916f97edcba428ad50d8d54ef"');
    await queryRunner.query('ALTER TABLE "company_admin" DROP COLUMN "company"');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "company" uuid');
    await queryRunner.query('ALTER TABLE "company_admin" ADD CONSTRAINT "UQ_3f916f97edcba428ad50d8d54ef" UNIQUE ("company")');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "company_id" uuid');
    await queryRunner.query('ALTER TABLE "company_admin" ADD CONSTRAINT "UQ_a50386174b5d9b1a258f2332cce" UNIQUE ("company_id")');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "phone" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "address" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "name" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "company_admin" ADD "salary" integer NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "company_admin" ADD CONSTRAINT "FK_3f916f97edcba428ad50d8d54ef" FOREIGN KEY ("company") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "company_admin" ADD CONSTRAINT "FK_a50386174b5d9b1a258f2332cce" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
