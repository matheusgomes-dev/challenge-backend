require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require("express");
const mongoose = require("mongoose");

class AppServer {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.connect();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }

  connect() {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true
    });
  }
}

module.exports = new AppServer().express;
