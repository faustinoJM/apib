import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddEmployeForeignKeyToDepartmentb1675862070498 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.addColumn('employees_api_b', new TableColumn(
      {
      name: 'department_id',
      type: 'uuid',
      isNullable: true
      }
    ))

    await queryRunner.createForeignKey(
      'employees_api_b',
      new TableForeignKey({
        name: 'EmployeeDepartment',
        columnNames: ['department_id'],
        referencedTableName: 'departments_api_b',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('employees_api_b', 'EmployeeDepartment');

    await queryRunner.dropColumn('employees_api_b', 'department_id');

  }

}