"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElBadge",
  props: {
    value: [String, Number],
    max: Number,
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      validator(val) {
        return ["primary", "success", "warning", "info", "danger"].indexOf(val) > -1;
      }
    }
  },
  computed: {
    content() {
      if (this.isDot) return;
      const value = this.value;
      const max = this.max;
      if (typeof value === "number" && typeof max === "number") {
        return max < value ? `${max}+` : value;
      }
      return value;
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-badge" }, [_vm._t("default"), _c("transition", { attrs: { "name": "el-zoom-in-center" } }, [_c("sup", { directives: [{ name: "show", rawName: "v-show", value: !_vm.hidden && (_vm.content || _vm.content === 0 || _vm.isDot), expression: "!hidden && (content || content === 0 || isDot)" }], staticClass: "el-badge__content", class: [
    _vm.type ? "el-badge__content--" + _vm.type : null,
    {
      "is-fixed": _vm.$slots.default,
      "is-dot": _vm.isDot
    }
  ], domProps: { "textContent": _vm._s(_vm.content) } })])], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Badge = __component__.exports;
const _Badge = Badge;
_Badge.install = function install(Vue) {
  Vue.component(_Badge.name, _Badge);
};
module.exports = _Badge;
