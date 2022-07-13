import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { EStatusFinders } from 'utils/enums';

export class CreateFinders1657658146572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'finders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'requester_user_id',
            type: 'uuid',
          },
          {
            name: 'requested_user_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(EStatusFinders),
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('finders');
  }
}
