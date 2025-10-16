"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElButtonGroup"
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-button-group" }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElButtonGroup = __component__.exports;
const _ButtonGroup = ElButtonGroup;
_ButtonGroup.install = function install(Vue) {
  Vue.component(_ButtonGroup.name, _ButtonGroup);
};
module.exports = _ButtonGroup;
