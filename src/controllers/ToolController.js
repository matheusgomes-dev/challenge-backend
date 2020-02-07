const Tool = require("./../models/Tool");
var HttpStatus = require("http-status-codes");

module.exports = {
  async get(req, res) {
    try {
      const { tag } = req.params;

      let tools = [];

      if (tag != undefined) {
        tools = await Tool.find({ tags: tag }).sort("title");
      } else {
        tools = await Tool.find({}).sort("title");
      }

      return res.send(tools);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  },

  async post(req, res) {
    try {
      const tool = await Tool.create(req.body);

      return res.status(201).send(tool);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  },

  async remove(req, res) {
    try {
      await Tool.findByIdAndRemove(req.params.id);

      return res.status(204).send();
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
};
