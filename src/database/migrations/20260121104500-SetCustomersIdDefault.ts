import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SetCustomersIdDefault20260121104500 implements MigrationInterface {
  name = 'SetCustomersIdDefault20260121104500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Best-effort: try pgcrypto/gen_random_uuid() first, then uuid-ossp/uuid_generate_v4().
    try {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
    } catch {
      // ignore: extension creation may be restricted
    }

    try {
      await queryRunner.query(
        'ALTER TABLE "public"."customers" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()',
      );
      return;
    } catch {
      // ignore: function may not exist
    }

    try {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    } catch {
      // ignore: extension creation may be restricted
    }

    await queryRunner.query(
      'ALTER TABLE "public"."customers" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."customers" ALTER COLUMN "id" DROP DEFAULT',
    );
  }
}
