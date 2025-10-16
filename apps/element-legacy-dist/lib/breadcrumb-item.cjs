"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElBreadcrumbItem",
  props: {
    to: {},
    replace: Boolean
  },
  data() {
    return {
      separator: "",
      separatorClass: ""
    };
  },
  inject: ["elBreadcrumb"],
  mounted() {
    this.separator = this.elBreadcrumb.separator;
    this.separatorClass = this.elBreadcrumb.separatorClass;
    const link = this.$refs.link;
    link.setAttribute("role", "link");
    link.addEventListener("click", (_) => {
      const { to, $router } = this;
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", { staticClass: "el-breadcrumb__item" }, [_c("span", { ref: "link", class: ["el-breadcrumb__inner", _vm.to ? "is-link" : ""], attrs: { "role": "link" } }, [_vm._t("default")], 2), _vm.separatorClass ? _c("i", { staticClass: "el-breadcrumb__separator", class: _vm.separatorClass }) : _c("span", { staticClass: "el-breadcrumb__separator", attrs: { "role": "presentation" } }, [_vm._v(_vm._s(_vm.separator))])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElBreadcrumbItem = __component__.exports;
const _BreadcrumbItem = ElBreadcrumbItem;
_BreadcrumbItem.install = function install(Vue) {
  Vue.component(_BreadcrumbItem.name, _BreadcrumbItem);
};
module.exports = _BreadcrumbItem;
