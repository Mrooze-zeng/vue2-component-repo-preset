const createPackage = require("./createPackage");
const updateTemplate = require("./updateTemplate");

const commands = [createPackage, updateTemplate];

module.exports = function (api, options) {
  commands.forEach((c) => {
    api.registerCommand(c.name, c.options, c.action);
  });
};
