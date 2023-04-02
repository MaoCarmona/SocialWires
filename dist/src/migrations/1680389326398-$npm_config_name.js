"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$npmConfigName1680389326398 = void 0;
class $npmConfigName1680389326398 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE user (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE user');
    }
}
exports.$npmConfigName1680389326398 = $npmConfigName1680389326398;
//# sourceMappingURL=1680389326398-$npm_config_name.js.map