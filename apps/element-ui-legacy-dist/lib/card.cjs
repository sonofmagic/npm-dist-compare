"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElCard",
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: String
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-card", class: _vm.shadow ? "is-" + _vm.shadow + "-shadow" : "is-always-shadow" }, [_vm.$slots.header || _vm.header ? _c("div", { staticClass: "el-card__header" }, [_vm._t("header", function() {
    return [_vm._v(_vm._s(_vm.header))];
  })], 2) : _vm._e(), _c("div", { staticClass: "el-card__body", style: _vm.bodyStyle }, [_vm._t("default")], 2)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Card = __component__.exports;
Card.install = function(Vue) {
  Vue.component(Card.name, Card);
};
module.exports = Card;
