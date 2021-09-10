const path = require("path");
const fs = require("fs");
const download = require("download-git-repo");
const { warn } = require("@vue/cli-shared-utils/lib/logger");

const checkIfPackageExist = function (packageDir = "") {
  return fs.existsSync(packageDir);
};

const downloadPackage = function (repo) {
  return new Promise(function (resolve, reject) {
    const packageName = repo
      .replace(/((?:.git)?#.*)/, "")
      .split("/")
      .slice(-1)[0]
      .replace(/[:#]/g, "");
    const name = packageName.replace(".git", "");
    const packageDir = path.resolve(__dirname, `../packages/${name}`);
    if (fs.existsSync(packageDir)) {
      fs.rmdirSync(packageDir, { recursive: true });
    }
    if (checkIfPackageExist(packageDir)) {
      return reject(`package ${packageDir}存在了！`);
    }
    download(`direct:${repo}`, packageDir, { clone: true }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve([packageDir, name]);
    });
  });
};

module.exports = {
  name: "fetchPackage",
  options: {
    description: "从仓库中拉取package",
    usage: "vue-cli-service fetchPackage --repo [name]",
  },
  action: async function ({ repo = "" }) {
    try {
      if (typeof repo === "string" && repo.startsWith("https://github.com/")) {
        const [packageDir, packageName] = await downloadPackage(repo);
        return;
      }
    } catch (error) {
      warn(error);
    }
  },
};
