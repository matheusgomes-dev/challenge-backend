const app = require("./app");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
