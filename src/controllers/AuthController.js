const User = require("../models/User");
const HttpStatus = require("http-status-codes");
const hashMD5 = require("md5");
const jwt = require("jsonwebtoken");

const errorMessage = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);

module.exports = {
  authenticate: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const hashSenha = hashMD5(senha);

      const user = await User.find({ Email: email, Senha: hashSenha });

      console.log(user);

      if (user === null || user === undefined)
        return res
          .status(HttpStatus.NOT_FOUND)
          .send("Usuário ou senha incorretos");

      const token = jwt.sign(
        {
          id: user.id,
          email: user.Email
        },
        process.env.SECRET,
        {
          expiresIn: 86400
        }
      );

      res.status(HttpStatus.OK).send({ auth: true, token: token });
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorMessage);
    }
  },

  verifyJWT: (req, res, next) => {
    try {
      const { token } = req.headers;

      if (token == undefined)
        return res.status(HttpStatus.UNAUTHORIZED).send({
          auth: false,
          message: "Nenhum token informado."
        });

      jwt.verify(token, process.env.SECRET, (err, decoded) => {

        if (err) {
          return res.status(HttpStatus.UNAUTHORIZED).send({
            auth: false,
            message: "Token inválido."
          });
        }
        
        req.email = decoded.email;

        next();
      });
    } catch (e) {
      res.status(HttpStatus.InternalServerError).send(errorMessage);
    }
  }
};
