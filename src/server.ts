import express from 'express'
import "reflect-metadata"
import swaggerUi from 'swagger-ui-express'
import { router } from './routes/index'
import swaggerFile from "./swagger.json"

import "./database"
import "./shared/container"

const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.listen(3098, () => console.log("Rodando servidor!"))
