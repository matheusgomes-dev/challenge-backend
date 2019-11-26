const User = require("../models/User");

const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");

class UserController {
  async addUser(req, res) {
    try {
      const { name, email, password } = req.body;

      let hash = await bcrypt.hash(password, 8);

      const user = await User.create({
        name: name,
        email: email,
        password: hash
      });

      res.status(HttpStatus.OK).send(user);
    } catch (e) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Server error occurred" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find({}).sort("name");

      res.status(HttpStatus.OK).send(users);
    } catch (e) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Server error occurred" });
    }
  }
}

module.exports = new UserController();
