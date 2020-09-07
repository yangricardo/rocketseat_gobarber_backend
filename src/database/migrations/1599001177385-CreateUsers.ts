import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1599001177385 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		/**
		 * Alterações no banco de dados
		 */
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: false,
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		/**
		 * Rollback de alterações
		 */
		await queryRunner.dropTable('users');
	}
}
