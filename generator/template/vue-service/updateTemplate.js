// @ts-ignore
// prettier-ignore
const projectName ="<%= projectName %>";

const presetDir = "vue-cli-presets/vue2-component-repo-preset.git/generator";

const path = require("path");
const os = require("os");
const fs = require("fs");
const ejs = require("ejs");
const { warn } = require("@vue/cli-shared-utils/lib/logger");

const tplDir = path.resolve(os.tmpdir(), presetDir);

const remotePreset =
  "direct:https://github.com/Mrooze-zeng/vue2-component-repo-preset.git";

const loadRemotePreset = require("@vue/cli/lib/util/loadRemotePreset");

const replaceFile = function (tpls = {}, target = "") {
  for (const file in tpls) {
    if (file.startsWith(".")) {
      continue;
    }
    const buf = fs.readFileSync(path.resolve(target, tpls[file]));
    fs.writeFileSync(
      path.resolve(__dirname, "../", file),
      ejs.render(buf.toString(), { tpls, projectName }),
    );

    warn(`替换 ${file}`);
  }
};

const getTpls = async function (optons) {
  const globby = await import("globby");
  const baseDir = path.resolve(tplDir, "./template");

  let _files = await globby.globby(["**/*"], {
    cwd: baseDir,
    dot: true,
  });
  let source = {};

  let isExist = fs.lstatSync(path.resolve("../.github/workflows/deploy.yml"));

  if (!isExist) {
    _files = _files.filter((f) => f != ".github/workflows/deploy.yml");
  }

  _files.forEach((f) => {
    source[f] = `template/${f}`;
  });
  return source;
};

module.exports = {
  name: "updateTpl",
  options: {
    description: "更新当前模版",
    usage: "vue-cli-service updateTpl",
  },
  action: async function () {
    const tpls = await getTpls();
    if (fs.lstatSync(tplDir)) {
      replaceFile(tpls, tplDir);
    } else {
      let presetDir;
      const { plugins } = await loadRemotePreset(remotePreset, true);
      for (const plugin in plugins) {
        if (
          plugin.includes("vue-cli-presets/vue2-component-repo-preset.git") &&
          plugins[plugin]._isPreset
        ) {
          presetDir = path.resolve(plugin, "generator");
        }
      }
      replaceFile(tpls, presetDir);
    }
  },
};
