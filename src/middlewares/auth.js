const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ message: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    req.userId = decoded.id;
    req.email = decoded.email;

    return next();
  } catch (e) {
    res.status(401).send({ message: "Invalid token" });
  }
};
