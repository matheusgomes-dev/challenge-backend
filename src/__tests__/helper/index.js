const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

class TestHelper {
  constructor() {
    this.server = new MongoMemoryServer();
    this.connection = null;
  }

  async start() {
    jest.setTimeout(60000);

    const uri = await this.server.getConnectionString();

    const databaseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true
    };

    this.connection = await mongoose.connect(uri, databaseOpts);
  }

  async stop() {
    await this.connection.connection.dropDatabase();
    await this.connection.connection.close();
    await this.server.stop();
  }

  async cleanup() {
    const collections = this.connection.connection.collections;

    for (const col in collections) {
      const collection = collections[col];
      await collection.deleteMany();
    }
  }
}

module.exports = new TestHelper();
