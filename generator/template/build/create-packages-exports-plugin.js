const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const prettierOptions = require("./prettier-default-options.json");

module.exports = class CreatePackagesExportsPlugin {
  constructor(
    options = {
      targetFolder: path.join(__dirname, "../packages/"),
      reg: /index\.js$/,
      prettierOptions: {},
    },
  ) {
    this.options = options;
    this.tpl = `
import Component from "./src/index.vue";
Component.install = function(Vue) {
  Vue.component(Component.name, Component);
};
export default Component;
    `;
    this.folderCollection = new Map();
  }
  createImportCode(name = "", dir = "") {
    return `import ${name} from "./${dir}";`;
  }
  createExportCodeBody(components = "") {
    return `
const components = [${components}];
const install = function(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {install,${components}};`;
  }
  parserComponentName(name = "") {
    let output = "";
    name.split("-").forEach((i) => {
      let s = i.split("");
      s[0] = s[0].toLocaleUpperCase();
      s = s.join("");
      output += s;
    });
    return output;
  }
  formatCode(code = "", config = {}) {
    return prettier.format(code, {
      ...prettierOptions,
      ...this.options.prettierOptions,
      ...config,
    });
  }
  async readDir() {
    const folders = fs.readdirSync(this.options.targetFolder);
    folders.forEach((file) => {
      const folder = path.join(this.options.targetFolder, file);
      const fsStat = fs.lstatSync(folder);
      if (fsStat.isDirectory()) {
        const subFolder = fs.readdirSync(folder);
        if (subFolder.length && subFolder.includes("src")) {
          this.folderCollection.set(path.basename(file), folder);
        }
        return;
      }
      if (fsStat.isFile() && this.options.reg.test(file)) {
        fs.unlinkSync(folder);
      }
    });
  }
  async createFiles(folderCollection = this.folderCollection) {
    let importCodeString = "";
    let list = [];

    for (const [name, folder] of folderCollection) {
      const target = path.join(folder, "index.js");
      const isExist = fs.existsSync(target);
      if (isExist) {
        fs.unlinkSync(target);
      }
      fs.writeFileSync(target, this.formatCode(this.tpl));
      const componentName = this.parserComponentName(name);
      importCodeString += this.createImportCode(componentName, name);
      list.push(componentName);
    }

    fs.writeFileSync(
      path.join(this.options.targetFolder, "index.js"),
      this.formatCode(
        importCodeString + this.createExportCodeBody(list.join(",")),
      ),
    );
  }
  apply(compiler) {
    compiler.hooks.environment.tap(this.constructor.name, this.run.bind(this));
  }
  async run() {
    await this.readDir();
    await this.createFiles();
  }
};
