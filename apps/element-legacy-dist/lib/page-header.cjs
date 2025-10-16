"use strict";
const locale = require("element-ui/lib/locale");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElPageHeader",
  props: {
    title: {
      type: String,
      default() {
        return locale.t("el.pageHeader.title");
      }
    },
    content: String
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-page-header" }, [_c("div", { staticClass: "el-page-header__left", on: { "click": function($event) {
    return _vm.$emit("back");
  } } }, [_c("i", { staticClass: "el-icon-back" }), _c("div", { staticClass: "el-page-header__title" }, [_vm._t("title", function() {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2)]), _c("div", { staticClass: "el-page-header__content" }, [_vm._t("content", function() {
    return [_vm._v(_vm._s(_vm.content))];
  })], 2)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const PageHeader = __component__.exports;
const _PageHeader = PageHeader;
_PageHeader.install = function install(Vue) {
  Vue.component(_PageHeader.name, _PageHeader);
};
module.exports = _PageHeader;
