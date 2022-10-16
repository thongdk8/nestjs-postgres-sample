import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

export class CreateSystemAdmin1665850833973 implements MigrationInterface {
  name = 'CreateSystemAdmin1665850833973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const systemAdminEmailName = 'system@email.com';
    const systemAdminPassword = bcryptjs.hashSync('password', 10);
    const query =
      `INSERT INTO public."user" (id, name, email, password, role, created_at, updated_at) VALUES ('2b510726-e10c-4efc-a2c9-6df536382ecb', 'string', '` +
      systemAdminEmailName +
      `', '` +
      systemAdminPassword +
      `', 'system_admin', '2022-10-15 17:05:23.725461', '2022-10-15 17:05:23.725461');`;
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `DELETE from public."user" WHERE id='2b510726-e10c-4efc-a2c9-6df536382ecb'`;
    await queryRunner.query(query);
  }
}
