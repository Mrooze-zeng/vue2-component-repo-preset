// @ts-ignore
// prettier-ignore
const projectName = "<%= projectName %>";

const path = require("path");

const remotePreset =
  "direct:https://github.com/Mrooze-zeng/vue2-component-repo-preset.git";

const Creator = require("@vue/cli/lib/Creator");

module.exports = {
  name: "updateTpl",
  options: {
    description: "更新当前模版",
    usage: "vue-cli-service updateTpl",
  },
  action: async function () {
    const cwd = path.resolve(__dirname, "../../");
    const targetDir = path.resolve(cwd, projectName);
    const creator = Creator(projectName, targetDir, []);
    await creator.create({
      cwd: cwd,
      preset: remotePreset,
      clone: true,
    });
  },
};
