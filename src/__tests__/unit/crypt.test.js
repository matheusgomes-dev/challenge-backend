const bcrypt = require("bcrypt");

const app = require("../../app");
const User = require("../../models/User");
const truncate = require("../utils/truncate");

describe("Crypt", () => {
  beforeAll(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "Matheus",
      email: "matheusgdeveloper@gmail.com",
      password: "123456"
    });

    const userHash = await user.password_hash;

    const compareHash = await bcrypt.compare("123456", userHash);

    expect(compareHash).toBe(true);
  });
});
