"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main$1 = {
  name: "ImgPlaceholder"
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("svg", { attrs: { "viewBox": "0 0 1024 1024", "xmlns": "http://www.w3.org/2000/svg" } }, [_c("path", { attrs: { "d": "M64 896V128h896v768H64z m64-128l192-192 116.352 116.352L640 448l256 307.2V192H128v576z m224-480a96 96 0 1 1-0.064 192.064A96 96 0 0 1 352 288z" } })]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const ImgPlaceholder = __component__$1.exports;
const _sfc_main = {
  name: "ElSkeletonItem",
  props: {
    variant: {
      type: String,
      default: "text"
    }
  },
  components: {
    [ImgPlaceholder.name]: ImgPlaceholder
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { class: ["el-skeleton__item", `el-skeleton__${_vm.variant}`] }, [_vm.variant === "image" ? _c("img-placeholder") : _vm._e()], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const SkeletonItem = __component__.exports;
const _SkeletonItem = SkeletonItem;
_SkeletonItem.install = function install(Vue) {
  Vue.component(_SkeletonItem.name, _SkeletonItem);
};
module.exports = _SkeletonItem;
