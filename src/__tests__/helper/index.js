const mongoose = require("mongoose");
const truncate = require("../utils/truncate");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

class TestHelper {
  constructor() {
    this.connection = null;
  }

  async start() {
    jest.setTimeout(60000);

    const databaseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true
    };

    this.connection = await mongoose.connect(
      process.env.DATABASE_URL,
      databaseOpts
    );
  }

  async stop() {
    await this.connection.disconnect();
  }

  async cleanup() {
    await truncate();
  }
}

module.exports = new TestHelper();
