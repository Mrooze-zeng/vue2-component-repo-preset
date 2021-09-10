const createPackage = require("./createPackage");
const updateTemplate = require("./updateTemplate");
const fetchPackage = require("./fetchPackage");

const commands = [createPackage, updateTemplate, fetchPackage];

module.exports = function (api, options) {
  commands.forEach((c) => {
    api.registerCommand(c.name, c.options, c.action);
  });
};
