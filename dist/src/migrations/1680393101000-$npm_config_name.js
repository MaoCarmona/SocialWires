"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$npmConfigName1680393101000 = void 0;
class $npmConfigName1680393101000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0368a7a0d3b69a716cfff905e23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_2a84cda34e78f2b8d3653f91d87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_2a84cda34e78f2b8d3653f91d87"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }
}
exports.$npmConfigName1680393101000 = $npmConfigName1680393101000;
//# sourceMappingURL=1680393101000-$npm_config_name.js.map