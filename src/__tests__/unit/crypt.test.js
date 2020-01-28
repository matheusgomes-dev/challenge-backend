const bcrypt = require("bcrypt");
const factory = require("../factories");
const helper = require("../helper");

describe("Crypt", () => {
  beforeAll(async () => {
    await helper.start();
  });

  afterAll(async () => {
    await helper.stop();
  });

  it("should encrypt user password", async () => {
    const user = await factory.create("User", {
      password: "123456"
    });

    const userHash = await user.password_hash;

    const compareHash = await bcrypt.compare("123456", userHash);

    expect(compareHash).toBe(true);
  });
});
