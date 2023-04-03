import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddEmployeForeignKeyToPositionb1675862057786 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.addColumn('employees_api_b', new TableColumn(
      {
      name: 'position_id',
      type: 'uuid',
      isNullable: true
      }
    ))

    await queryRunner.createForeignKey(
      'employees_api_b',
      new TableForeignKey({
        name: 'EmployeePosition',
        columnNames: ['position_id'],
        referencedTableName: 'positions_api_b',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('employees_api_b', 'EmployeePosition');

    await queryRunner.dropColumn('employees_api_b', 'position_id');

  }

}