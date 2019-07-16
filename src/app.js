const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const mongoose = require("mongoose");
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT ||  3000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
