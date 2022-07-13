import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateViewRelations1657658158501 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE VIEW relations AS (

      SELECT
        MD5(CONCAT('FRIEND_', id)) AS id,
        'FRIEND' AS type,
        id AS relation_id,
        requester_user_id,
        requested_user_id,
        status::VARCHAR
      FROM friends

      UNION ALL

      SELECT
        MD5(CONCAT('FINDER_', id)) AS id,
        'FINDER' AS type,
        id AS relation_id,
        requester_user_id,
        requested_user_id,
        status::VARCHAR
      FROM finders

    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP VIEW relations');
  }
}
