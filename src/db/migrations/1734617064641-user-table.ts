import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1734617064641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` create table "users" (
 	id uuid not null default uuid_generate_v4(),
 	username varchar(255) not null,
 	password_hash varchar(255) not null,
 	constraint user_pk_id PRIMARY KEY (id),
 	CONSTRAINT user_username_unique UNIQUE (username)
 );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
