// @ts-ignore
// prettier-ignore
const tpls = <%- JSON.stringify(tpls)%>;


const presetDir = "vue-cli-presets/vue2-component-repo-preset.git/generator";

const path = require("path");
const os = require("os")
const fs = require("fs");
const ejs = require("ejs");
const { warn } = require("@vue/cli-shared-utils/lib/logger");

const tplDir = path.resolve(os.tmpdir(),presetDir)


const remotePreset =
  "direct:https://github.com/Mrooze-zeng/vue2-component-repo-preset.git";

const loadRemotePreset = require("@vue/cli/lib/util/loadRemotePreset");

const replaceFile = function (tpls = {}, currentFile = "", target = "") {
  for (const file in tpls) {
    const buf = fs.readFileSync(path.resolve(target, tpls[file]));
    if (file != currentFile) {
      fs.writeFileSync(path.resolve(__dirname, "../", file), buf);
    } else {
      fs.writeFileSync(
        path.resolve(__dirname, "../", file),
        ejs.render(buf.toString(), { tpls }),
      );
    }
    warn(`替换${file}`)
  }
};

module.exports = {
  name: "updateTpl",
  options: {
    description: "更新当前模版",
    usage: "vue-cli-service updateTpl",
  },
  action: async function () {
    const isExist = fs.lstatSync(tplDir);
    const currentFile = path.join(
      path.basename(__dirname),
      path.basename(__filename),
    );
    if (isExist) {
      replaceFile(tpls, currentFile, tplDir);
    } else {
      let presetDir;
      const { plugins } = await loadRemotePreset(remotePreset);
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
