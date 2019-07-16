const User = require("../models/User");
const jwt = require("jsonwebtoken");
const hashMD5 = require("md5");
const HttpStatus = require("http-status-codes");

const ERROR_MESSAGE = HttpStatus.getStatusText(
  HttpStatus.INTERNAL_SERVER_ERROR
);

module.exports = {
  post: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      let senhaHash = hashMD5(password);

      const user = await User.create({
        name: name,
        email: email,
        password: senhaHash
      });

      return res.send(user);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE);
    }
  },

  get: async (req, res) => {
    try {
      const users = await User.find({}).sort("name");

      return res.send(users);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGE);
    }
  }
};
