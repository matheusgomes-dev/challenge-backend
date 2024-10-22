const request = require("supertest");
const app = require("../../app");
const bcrypt = require("bcrypt");
const helper = require("../helper");
const factory = require("../factories");

describe("User", () => {
  beforeAll(async () => {
    await helper.start();
  });

  afterEach(async () => {
    await helper.cleanup();
  });

  afterAll(async () => {
    await helper.stop();
  });

  it("should create a user via an http request", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Matheus Gomes",
        email: "matheusgdeveloper@gmail.com",
        password: "123456"
      });

    expect(response.statusCode).toBe(201);
  });

  it("should get all users when authenticated", async () => {
    const hash = await bcrypt.hash("123456", 8);

    user = await factory.create("User", {
      password: hash
    });

    const authentication = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${authentication.body.token}`);

    expect(response.statusCode).toBe(200);
  });

  it("should not get all users when not authenticated", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer testee`);

    expect(response.statusCode).toBe(401);
  });
});
