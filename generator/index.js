const path = require("path");

const getTpls = async function (optons) {
  const globby = await import("globby");
  const baseDir = path.resolve(__dirname, "./template");

  let _files = await globby.globby(["**/*"], {
    cwd: baseDir,
    dot: true,
  });
  let source = {};

  _files.forEach((f) => {
    if (
      !(!optons.addGithubActions && f.includes(".github/workflows/deploy.yml"))
    ) {
      source[f] = `template/${f}`;
    }
  });
  return source;
};

module.exports = async function (api, optons, rootOptions) {
  api.extendPackage({
    scripts: {
      serve:
        "npm run build:package && cross-env RUN_TYPE=dev vue-cli-service serve",
      "serve:prod":
        "npm run build:package && cross-env RUN_TYPE=prod  vue-cli-service serve",
      build:
        "npm run build:package && cross-env RUN_TYPE=prod vue-cli-service build",
      lint: "vue-cli-service lint",
      "build:package": "webpack --config build/webpack.config.build.js",
      "create:package": "vue-cli-service createPackage",
      "update:tpl": "vue-cli-service updateTpl",
    },
    devDependencies: {
      "@babel/core": "^7.15.5",
      "@babel/types": "^7.15.4",
      "cross-env": "^7.0.3",
      "loader-utils": "^2.0.0",
      prettier: "^2.3.2",
      "schema-utils": "^3.1.1",
      "webpack-cli": "^4.8.0",
      "clean-webpack-plugin": "^4.0.0",
      "babel-loader": "^8.2.2",
      "@vue/cli": "^4.5.13",
      ejs: "^3.1.6",
      globby: "^12.0.2",
    },
    vuePlugins: {
      service: ["./vue-service/index"],
    },
  });
  const source = await getTpls(optons);
  api.render(source, {
    ...rootOptions,
    // tpls: source,
    // tplDir: path.resolve(api.id, "generator"),
  });
};
