const request = require("supertest");
const app = require("../../app");
const bcrypt = require("bcrypt");
const factory = require("../factories");
const helper = require("../helper");

describe("Authentication", () => {
  beforeAll(async () => {
    await helper.start();
  });

  afterEach(async () => {
    await helper.cleanup();
  });

  afterAll(async () => {
    await helper.stop();
  });

  it("should authenticate with valid credentials", async () => {
    const hash = await bcrypt.hash("123456", 8);

    user = await factory.create("User", {
      password: hash
    });

    const response = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const hash = await bcrypt.hash("123456", 8);

    user = await factory.create("User", {
      password: hash
    });

    const response = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123123" });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const hash = await bcrypt.hash("123456", 8);

    user = await factory.create("User", {
      password: hash
    });

    const response = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    expect(response.body).toHaveProperty("token");
  });
});
