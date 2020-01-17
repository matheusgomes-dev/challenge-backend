const User = require("../../models/User");
const Tool = require("../../models/Tool");

module.exports = async (clearToolsCollection = false) => {
  if (clearToolsCollection) {
    await Tool.deleteMany();
  } else {
    await User.deleteMany();
  }
};
