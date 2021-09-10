// @ts-ignore
// prettier-ignore
const tpls = <%- JSON.stringify(tpls) %>;
const tplDir = "<%= tplDir %>";

const path = require("path");
const fs = require("fs");
const loadRemotePreset = require("@vue/cli/lib/util/loadRemotePreset");

const remotePreset =
  "direct:https://github.com/Mrooze-zeng/vue2-component-repo-preset.git";

const replaceFile = function (tpls = {}, currentFile = "", target = "") {
  for (const file in tpls) {
    if (file != currentFile) {
      const buf = fs.readFileSync(path.resolve(target, tpls[file]));
      fs.writeFileSync(path.resolve(__dirname, "../", file), buf);
    }
  }
};

module.exports = {
  name: "updateTpl",
  options: {
    description: "更新当前模版",
    usage: "vue-cli-service updateTpl",
  },
  action: async function () {
    const currentFile = path.join(
      path.basename(__dirname),
      path.basename(__filename),
    );
    const isExist = fs.lstatSync(tplDir);
    if (isExist) {
      replaceFile(tpls, currentFile, tplDir);
    } else {
      const { plugins } = await loadRemotePreset(remotePreset);
      let presetDir;
      for (const plugin in plugins) {
        if (
          plugin.includes("vue-cli-presets/vue2-component-repo-preset.git") &&
          plugins[plugin]._isPreset
        ) {
          presetDir = path.resolve(plugin, "generator");
        }
      }
      replaceFile(tpls, currentFile, presetDir);
    }
  },
};
