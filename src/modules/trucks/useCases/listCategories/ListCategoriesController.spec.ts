import { app } from "@shared/infra/http/app";
import request from "supertest";
import { v4 as uuid } from "uuid";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { getConnectionManager, getConnectionOptions } from "typeorm";

let connection: Connection;

const jestTimeoutInMS = 50 * 1000;
const id = uuid();

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    // await connection.runMigrations();

    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXX')
    `
    );
  }, jestTimeoutInMS);

  afterAll(async () => {
    // await connection.dropDatabase()
    await connection.query(`SELECT * FROM users WHERE id = ${id}`)
    await connection.query('SELECT * FROM categories WHERE name like "Category Supertest"')
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

      expect(response.status).toBe(200);
      expect(response.body[-1]).toHaveProperty("id");
      expect(response.body[-1].name).toEqual("Category Supertest");
    },
    jestTimeoutInMS
  );
});
