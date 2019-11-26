const faker = require("faker");
const { factory } = require("factory-girl");
const User = require("../models/User");
const Tool = require("../models/Tool");

factory.define("User", User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

module.exports = factory;
