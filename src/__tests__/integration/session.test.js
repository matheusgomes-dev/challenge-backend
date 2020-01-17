const request = require("supertest");

const app = require("../../app");
const truncate = require("../utils/truncate");
const bcrypt = require("bcrypt");
const factory = require("../factories");
const User = require("../../models/User");

describe("Authentication", () => {
  beforeAll(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const hash = await bcrypt.hash("123456", 8);

    const user = await User.create({
      name: "Duncan Gonzales",
      email: "rexim21920@winmails.net",
      password: hash
    });

    const response = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const hash = await bcrypt.hash("123123", 8);

    const user = await User.create({
      name: "Robert Lane",
      email: "golim50066@topmail1.net",
      password: hash
    });

    const response = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const hash = await bcrypt.hash("123123", 8);

    const user = await User.create({
      name: "Zaiden Peck",
      email: "vexobad964@topmail1.net",
      password: hash
    });

    const response = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123123" });

    expect(response.body).toHaveProperty("token");
  });
});
