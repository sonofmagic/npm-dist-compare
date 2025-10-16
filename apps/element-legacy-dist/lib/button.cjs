"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElButton",
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: String,
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    buttonDisabled() {
      return this.$options.propsData.hasOwnProperty("disabled") ? this.disabled : (this.elForm || {}).disabled;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("button", { staticClass: "el-button", class: [
    _vm.type ? "el-button--" + _vm.type : "",
    _vm.buttonSize ? "el-button--" + _vm.buttonSize : "",
    {
      "is-disabled": _vm.buttonDisabled,
      "is-loading": _vm.loading,
      "is-plain": _vm.plain,
      "is-round": _vm.round,
      "is-circle": _vm.circle
    }
  ], attrs: { "disabled": _vm.buttonDisabled || _vm.loading, "autofocus": _vm.autofocus, "type": _vm.nativeType }, on: { "click": _vm.handleClick } }, [_vm.loading ? _c("i", { staticClass: "el-icon-loading" }) : _vm._e(), _vm.icon && !_vm.loading ? _c("i", { class: _vm.icon }) : _vm._e(), _vm.$slots.default ? _c("span", [_vm._t("default")], 2) : _vm._e()]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElButton = __component__.exports;
const _Button = ElButton;
_Button.install = function install(Vue) {
  Vue.component(_Button.name, _Button);
};
module.exports = _Button;
