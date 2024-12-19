import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTable1734617056372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.query(
      `create table tasks (
        id uuid not null default uuid_generate_v4(),
        title varchar(255) not null,
        description varchar(1000) not null,
        status varchar(50) not null,
        updated_date timestamptz not null,
        expiration_date timestamptz not null,
        constraint task_pk primary key (id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "tasks";');
  }
}
