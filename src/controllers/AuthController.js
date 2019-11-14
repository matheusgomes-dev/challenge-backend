const User = require("../models/User");

const HttpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async authenticate(req, res) {
    const { email, pass } = req.body;

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: "User not found" });

    const correctPassword = await bcrypt.compare(pass, user.password);

    if (!correctPassword)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: "Incorrect password" });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.APP_SECRET,
      {
        expiresIn: 86400 // one day duration
      }
    );

    res.status(HttpStatus.OK).send({ auth: true, token: token });
  }
  catch(e) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
  }
}

module.exports = new AuthController();
