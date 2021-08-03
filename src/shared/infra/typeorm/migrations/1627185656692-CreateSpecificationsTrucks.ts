import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSpecificationsTrucks1627185656692
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_trucks",
        columns: [
          {
            name: "truck_id",
            type: "uuid",
          },
          {
            name: "specification_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "specifications_trucks",
      new TableForeignKey({
        name: "FKSpecificationsTruck",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specification_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "specifications_trucks",
      new TableForeignKey({
        name: "FKTruckSpecifications",
        referencedTableName: "trucks",
        referencedColumnNames: ["id"],
        columnNames: ["truck_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specifications_trucks",
      "FKTruckSpecifications"
    );

    await queryRunner.dropForeignKey(
      "specifications_trucks",
      "FKSpecificationsTruck"
    );

    await queryRunner.dropTable("specifications_trucks");
  }
}
