import { createConnection } from "typeorm"
import { User } from "@modules/accounts/infra/typeorm/entities/User"
import { Category } from "@modules/trucks/infra/typeorm/entities/Category" 
import { Specification } from "@modules/trucks/infra/typeorm/entities/Specification"

console.log("Arquivo database")
createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "red12mov",
    "database": "truckons",
    synchronize: false,
    logging: false
}).then(connection => {

}).catch(error => console.log('Information of error: ', error))