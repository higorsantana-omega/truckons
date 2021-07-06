import { createConnection } from "typeorm"
import { Category } from "../modules/trucks/entities/Category"
import { Specification } from "../modules/trucks/entities/Specification"

console.log("Arquivo database")
createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "red12mov",
    "database": "truckons",
    entities: [
        Category,
        Specification
    ],
    synchronize: true,
    logging: false
}).then(connection => {

}).catch(error => console.log('Information of error: ', error))