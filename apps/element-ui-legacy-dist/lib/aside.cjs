"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElAside",
  componentName: "ElAside",
  props: {
    width: {
      type: String,
      default: "300px"
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("aside", { staticClass: "el-aside", style: { width: _vm.width } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Aside = __component__.exports;
Aside.install = function(Vue) {
  Vue.component(Aside.name, Aside);
};
module.exports = Aside;
