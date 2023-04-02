import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1680389326398 implements MigrationInterface {

    public async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE user (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
      )
    `);
    }
    public async down(queryRunner) {
        await queryRunner.query('DROP TABLE user');
    }

}
