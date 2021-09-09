const { warn, done } = require("@vue/cli-shared-utils/lib/logger");
const path = require("path");
const fs = require("fs");
const CreatePackagesExports = require("../build/create-packages-exports-plugin.js");

const tpl = (name = "", componentName = "") => `
<template>
  <div class="${name}"></div>
</template>

<script>
export default {
  name: "${componentName}",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.${name} {
}
</style>
`;
module.exports = function (api, options) {
  api.registerCommand(
    "createPackage",
    {
      description: "新生成一个package",
      usage: "vue-cli-service create:package --name [name]",
    },
    async ({ name }) => {
      if (typeof name === "string" && name) {
        const target = path.resolve(__dirname, `../packages/${name}/src`);
        let isExist = fs.existsSync(target);
        console.log(target);
        if (isExist) {
          return warn(`${name} 这个package已经存在!`);
        }
        await fs.mkdirSync(target, { recursive: true });
        const createPackagesExports = new CreatePackagesExports();
        await fs.writeFileSync(
          `${target}/index.vue`,
          createPackagesExports.formatCode(
            tpl(name, createPackagesExports.parserComponentName(name)),
            { parser: "vue" },
          ),
        );
        createPackagesExports.run();
        done(`新建${name} package`);
        return;
      }
      warn("error");
    },
  );
};
