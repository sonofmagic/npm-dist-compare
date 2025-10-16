"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElMenuItemGroup",
  componentName: "ElMenuItemGroup",
  inject: ["rootMenu"],
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      paddingLeft: 20
    };
  },
  computed: {
    levelPadding() {
      let padding = 20;
      let parent = this.$parent;
      if (this.rootMenu.collapse) return 20;
      while (parent && parent.$options.componentName !== "ElMenu") {
        if (parent.$options.componentName === "ElSubmenu") {
          padding += 20;
        }
        parent = parent.$parent;
      }
      return padding;
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { staticClass: "el-menu-item-group" }, [_c("div", { staticClass: "el-menu-item-group__title", style: { paddingLeft: _vm.levelPadding + "px" } }, [!_vm.$slots.title ? [_vm._v(_vm._s(_vm.title))] : _vm._t("title")], 2), _c("ul", [_vm._t("default")], 2)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElMenuItemGroup = __component__.exports;
const _ElMenuItemGroup = ElMenuItemGroup;
_ElMenuItemGroup.install = function install(Vue) {
  Vue.component(_ElMenuItemGroup.name, _ElMenuItemGroup);
};
module.exports = _ElMenuItemGroup;
