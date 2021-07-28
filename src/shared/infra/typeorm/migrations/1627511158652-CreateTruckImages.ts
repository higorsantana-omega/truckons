import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTruckImages1627511158652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "trucks_image",
        columns: [
          {
            name: "id",
            type: "uuid",
          },
          {
            name: "truck_id",
            type: "uuid",
          },
          {
            name: "image_name",
            type: "varchar",
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
      "trucks_image",
      new TableForeignKey({
        name: "FKTruckImage",
        referencedTableName: "trucks",
        referencedColumnNames: ["id"],
        columnNames: ["truck_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("trucks_image", "FKTruckImage");

    await queryRunner.dropTable("trucks_image");
  }
}
