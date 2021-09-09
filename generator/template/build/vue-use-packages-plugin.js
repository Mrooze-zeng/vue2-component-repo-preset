const babel = require("@babel/core");
const t = require("@babel/types");
const fs = require("fs");
const prettier = require("prettier");

const prettierOptions = require("./prettier-default-options.json");

module.exports = class VueUsePackagesPlugin {
  constructor(
    options = {
      target: "",
      placeholder: "/* use-package-loader-inject */",
      prettierOptions: {},
    },
  ) {
    this.options = options;
  }
  removeComment(path, placeholder) {
    path.traverse({
      enter(p) {
        let comments =
          p.node.trailingComments ||
          p.node.leadingComments ||
          p.node.innerComments ||
          [];
        if (
          comments.findIndex((c) => {
            return c.value === placeholder;
          }) >= 0
        ) {
          t.removeComments(p.node);
        }
      },
    });
  }
  addComment(path, placeholder) {
    const lastImport = path
      .get("body")
      .filter((p) => p.isImportDeclaration())
      .pop();
    if (lastImport) {
      t.addComment(lastImport.node, "trailing", placeholder);
    }
  }
  addPlaceholder() {
    const placeholder = this.options.placeholder.replace(/[\/\/\*]/gi, "");
    const self = this;
    if (fs.existsSync(this.options.target)) {
      const { code } = babel.transformFileSync(this.options.target, {
        configFile: false,
        plugins: [
          function () {
            return {
              visitor: {
                Program(path, state) {
                  self.removeComment(path, placeholder);
                  self.addComment(path, placeholder);
                },
              },
            };
          },
        ],
      });
      fs.writeFileSync(
        this.options.target,
        prettier.format(code, {
          ...prettierOptions,
          ...this.options.prettierOptions,
        }),
      );
    }
  }
  apply(compiler) {
    compiler.hooks.environment.tap(this.constructor.name, (...params) => {
      this.addPlaceholder();
    });
  }
};
