const User = require("../../models/User");
const Tool = require("../../models/Tool");

module.exports = async () => {
  await User.deleteMany();
  await Tool.deleteMany();
};
