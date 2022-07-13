import { MigrationInterface, QueryRunner } from 'typeorm';

export class UseExtensionUuid1657658128952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
