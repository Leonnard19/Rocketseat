import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSpecificationsCars1622316689030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKSpecificationCar',
        referencedTableName: 'specifications', // origin table
        referencedColumnNames: ['id'], // references id on table specifications
        columnNames: ['specification_id'], // name from referenced column
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKCarSpecification',
        referencedTableName: 'cars', // origin table
        referencedColumnNames: ['id'], // references id on table specifications
        columnNames: ['car_id'], // name from referenced column
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('specifications_cars', 'FKCarSpecification');

    await queryRunner.dropForeignKey('specifications_cars', 'FKSpecificationCar');

    await queryRunner.dropTable('specifications_cars');
  }
}
