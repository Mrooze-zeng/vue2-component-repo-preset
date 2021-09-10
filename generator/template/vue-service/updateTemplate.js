// @ts-ignore
// prettier-ignore
const tpls = <%- JSON.stringify(tpls) %>;

module.exports = {
  name: "updateTpl",
  options: {
    description: "更新当前模版",
    usage: "vue-cli-service updateTpl",
  },
  action: function () {
    console.log(tpls)
  },
};
