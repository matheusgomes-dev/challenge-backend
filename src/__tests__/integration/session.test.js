const request = require("supertest");

const app = require("../../app");
const truncate = require("../utils/truncate");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const hash = await bcrypt.hash("123456", 8);

    const user = await User.create({
      name: "Matheus Gomes",
      email: "matheusgdeveloper@gmail.com",
      password: hash
    });

    const response = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    expect(response.status).toBe(200);
  });
});
