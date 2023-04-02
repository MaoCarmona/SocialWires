import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1680457347725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "author" character varying NOT NULL, "messageId" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "reaction" character varying NOT NULL, "author" character varying NOT NULL, "messageId" integer NOT NULL, CONSTRAINT "PK_d0e12fe15a2e2c3997bded4b743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_0ef9687c1b3f8b7df539f5b9987" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_4e7da594b0f85c2dc8daa152045" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_4e7da594b0f85c2dc8daa152045"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_0ef9687c1b3f8b7df539f5b9987"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }
}
