const { getOptions } = require("loader-utils");

const tpl = {
  dev: `
import ZUI from "../packages";
console.log("dev")
Vue.use(ZUI);
    `,
  prod: `
import ZUI from "../z-ui";
import "../z-ui/index.css";
console.log("prod")  
Vue.use(ZUI);
    `,
};

module.exports = function(source) {
  const { placeholder = "" } = getOptions(this);
  const mode = process.env["RUN_TYPE"] || "dev";
  source = source.replace(placeholder, tpl[mode]);
  return source;
};
