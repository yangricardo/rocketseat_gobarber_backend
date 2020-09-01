import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1598997317687
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		/**
		 * Alterações no banco de dados
		 */
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'provider',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		/**
		 * Rollback de alterações
		 */
		await queryRunner.dropTable('appointments');
	}
}
