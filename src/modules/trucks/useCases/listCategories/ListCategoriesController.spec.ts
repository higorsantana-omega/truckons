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
    "should be able to list all categories",
    async () => {
      const responseToken = await request(app).post("/sessions").send({
        email: "admin@email.com",
        password: "admin",
      });

      const { token } = responseToken.body;
      console.log(token);

      await request(app)
        .post("/categories")
        .send({
          name: "Category Supertest",
          description: "Category Supertest",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      const response = await request(app).get("/categories");

      expect(response.status).toBe(201);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0].name).toEqual("Category Supertest");
    },
    jestTimeoutInMS
  );
});
