const { getOptions } = require("loader-utils");

const tpl = {
  dev: `
import Comp from "../packages";
console.log("dev")
Vue.use(Comp);
    `,
  prod: `
import Comp from "../<%= projectName %>";
console.log("prod")  
Vue.use(Comp);
    `,
};

module.exports = function (source) {
  const { placeholder = "" } = getOptions(this);
  const mode = process.env["RUN_TYPE"] || "dev";
  source = source.replace(placeholder, tpl[mode]);
  return source;
};
