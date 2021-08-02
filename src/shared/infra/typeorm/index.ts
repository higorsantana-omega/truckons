import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Category } from "@modules/trucks/infra/typeorm/entities/Category";
import { Specification } from "@modules/trucks/infra/typeorm/entities/Specification";

console.log("Arquivo database");
// createConnection({
//     "type": "postgres",
//     "host": "localhost",
//     "port": 5432,
//     "username": "postgres",
//     "password": "red12mov",
//     "database": "truckons",
//     synchronize: false,
//     logging: false,
//     "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
//     "entities": ["./src/modules/**/entities/*.ts"],

// }).then(connection => {

// }).catch(error => console.log('Information of error: ', error))

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : "localhost",
      database:
        process.env.NODE_ENV === "test"
          ? "truckon_test"
          : defaultOptions.database,
    })
  );
};
