const Tool = require("../../models/Tool");

class factoryTool {
  async create(tags) {
    const tool = await Tool.create({
      title: "React Native",
      link: "https://facebook.github.io/react-native/docs/0.59/getting-started",
      description:
        "React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.",
      tags: tags ? tags : ["react", "app", "mobile", "js"]
    });

    return tool;
  }
}

module.exports = new factoryTool();
