"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElContainer",
  componentName: "ElContainer",
  props: {
    direction: String
  },
  computed: {
    isVertical() {
      if (this.direction === "vertical") {
        return true;
      } else if (this.direction === "horizontal") {
        return false;
      }
      return this.$slots && this.$slots.default ? this.$slots.default.some((vnode) => {
        const tag = vnode.componentOptions && vnode.componentOptions.tag;
        return tag === "el-header" || tag === "el-footer";
      }) : false;
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("section", { staticClass: "el-container", class: { "is-vertical": _vm.isVertical } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Container = __component__.exports;
const _Container = Container;
_Container.install = function install(Vue) {
  Vue.component(_Container.name, _Container);
};
module.exports = _Container;
