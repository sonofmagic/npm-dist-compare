"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElMain",
  componentName: "ElMain"
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("main", { staticClass: "el-main" }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Main = __component__.exports;
const _Main = Main;
_Main.install = function install(Vue) {
  Vue.component(_Main.name, _Main);
};
module.exports = _Main;
