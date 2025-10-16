"use strict";
const emitter = require("./emitter-CM7bVwl7.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElCheckboxGroup",
  componentName: "ElCheckboxGroup",
  mixins: [emitter.emitter],
  inject: {
    elFormItem: {
      default: ""
    }
  },
  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  watch: {
    value(value) {
      this.dispatch("ElFormItem", "el.form.change", [value]);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-checkbox-group", attrs: { "role": "group", "aria-label": "checkbox-group" } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElCheckboxGroup = __component__.exports;
const _CheckboxGroup = ElCheckboxGroup;
_CheckboxGroup.install = function install(Vue) {
  Vue.component(_CheckboxGroup.name, _CheckboxGroup);
};
module.exports = _CheckboxGroup;
