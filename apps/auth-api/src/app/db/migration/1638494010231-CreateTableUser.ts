import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableUser1638494010231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'INT',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'VARCHAR(100)',
                        isNullable: false
                    },
                    {
                        name: 'username',
                        type: 'VARCHAR(100)',
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'VARCHAR(255)',
                        isNullable: false
                    },
                    {
                        name: 'roles',
                        type: 'VARCHAR(255)',
                        isNullable: false
                    },
                ]
            }),
            false
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user', true);
    }

}
