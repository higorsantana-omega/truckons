import { app } from "@shared/infra/http/app";
import request from "supertest";
import { v4 as uuid } from "uuid";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";

let connection: Connection;

const jestTimeoutInMS = 50 * 1000;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXX')
    `
    );
  }, jestTimeoutInMS);

  afterAll(async () => {
    // await connection.dropDatabase()
    await connection.close();
  });

  it(
    "should be able to create a new category",
    async () => {
      const responseToken = await request(app).post("/sessions").send({
        email: "admin@email.com",
        password: "admin",
      });

      const { token } = responseToken.body;
      console.log(token)

      const response = await request(app)
        .post("/categories")
        .send({
          name: "Category Supertest",
          description: "Category Supertest",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });

      expect(response.status).toBe(201);
    },
    jestTimeoutInMS
  );
});
