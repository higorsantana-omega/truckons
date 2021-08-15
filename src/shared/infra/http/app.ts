import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";

import createConnection from "@shared/infra/typeorm";
import "@shared/container";
import { router } from "./routes";
import { AppError } from "../../errors/AppError";

// const env = (() => {
//   if (process.env.NODE_ENV === 'test') {
//     '.env'
//   }
// })

// require('dotenv').config({
//   // process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
//   path: env
// })

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app }
