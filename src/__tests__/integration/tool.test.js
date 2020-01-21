const request = require("supertest");

const app = require("../../app");
const truncate = require("../utils/truncate");
const factory = require("../factories");
const factoryTool = require("../utils/factoryTool");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

describe("Tool", () => {
  beforeAll(async () => {
    await truncate(true);
  });

  it("should create a new tool when authenticated", async () => {
    const hash = await bcrypt.hash("123456", 8);

    const user = await User.create({
      name: "Khloe Baird",
      email: "vohaw68560@top-email.org",
      password: hash
    });

    const authentication = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    const response = await request(app)
      .post("/tools")
      .send({
        title: "React Native",
        link:
          "https://facebook.github.io/react-native/docs/0.59/getting-started",
        description:
          "React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.",
        tags: ["react", "app", "mobile", "js"]
      })
      .set("Authorization", `Bearer ${authentication.body.token}`);

    expect(response.statusCode).toBe(200);
  });

  it("should not create a new tool when not authenticated", async () => {
    const response = await request(app)
      .post("/tools")
      .send({
        title: "React Native",
        link:
          "https://facebook.github.io/react-native/docs/0.59/getting-started",
        description:
          "React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.",
        tags: ["react", "app", "mobile", "js"]
      })
      .set("Authorization", `123456`);

    expect(response.statusCode).toBe(401);
  });

  it("should get all tools when authenticated", async () => {
    const hash = await bcrypt.hash("123456", 8);

    const user = await User.create({
      name: "Aedan Haley",
      email: "licagi4454@it-smart.org",
      password: hash
    });

    const authentication = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    const response = await request(app)
      .get("/tools")
      .set("Authorization", `Bearer ${authentication.body.token}`);

    expect(response.statusCode).toBe(200);
  });

  it("should not get all tools when not authenticated", async () => {
    const response = await request(app)
      .get("/tools")
      .set("Authorization", `123456`);

    expect(response.statusCode).toBe(401);
  });

  it("should remove a tool when authenticated", async () => {
    const hash = await bcrypt.hash("123456", 8);

    const user = await User.create({
      name: "Amber Love",
      email: "negabo5389@topmail1.net",
      password: hash
    });

    const authentication = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    const tool = await factoryTool.create();

    const response = await request(app)
      .delete(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${authentication.body.token}`);

    expect(response.statusCode).toBe(200);
  });

  it("should not remove a tool when not authenticated", async () => {
    const tool = await factoryTool.create();

    const response = await request(app)
      .delete(`/tools/${tool._id}`)
      .set("Authorization", "123456");

    expect(response.statusCode).toBe(401);
  });

  it("should get tools filtered by tag when authenticated", async () => {
    const hash = await bcrypt.hash("123456", 8);

    const user = await User.create({
      name: "Yahir Gaines",
      email: "ciyef40613@winmails.net",
      password: hash
    });

    const authentication = await request(app)
      .post("/token")
      .send({ email: user.email, pass: "123456" });

    await factoryTool.create(["react", "mobile"]);

    const response = await request(app)
      .get(`/tools/mobile`)
      .set("Authorization", `Bearer ${authentication.body.token}`);

    expect(response.statusCode).toBe(200);
  });
});
