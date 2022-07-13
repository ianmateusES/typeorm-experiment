import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInterest1657682238823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'interests',
        type: 'int',
        isArray: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'interests');
  }
}
