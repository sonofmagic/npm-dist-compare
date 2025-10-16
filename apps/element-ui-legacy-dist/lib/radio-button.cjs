"use strict";
const Emitter = require("element-ui/lib/mixins/emitter");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElRadioButton",
  mixins: [Emitter],
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  props: {
    label: {},
    disabled: Boolean,
    name: String
  },
  data() {
    return {
      focus: false
    };
  },
  computed: {
    value: {
      get() {
        return this._radioGroup.value;
      },
      set(value) {
        this._radioGroup.$emit("input", value);
      }
    },
    _radioGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ElRadioGroup") {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    activeStyle() {
      return {
        backgroundColor: this._radioGroup.fill || "",
        borderColor: this._radioGroup.fill || "",
        boxShadow: this._radioGroup.fill ? `-1px 0 0 0 ${this._radioGroup.fill}` : "",
        color: this._radioGroup.textColor || ""
      };
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    size() {
      return this._radioGroup.radioGroupSize || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    isDisabled() {
      return this.disabled || this._radioGroup.disabled || (this.elForm || {}).disabled;
    },
    tabIndex() {
      return this.isDisabled || this._radioGroup && this.value !== this.label ? -1 : 0;
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.dispatch("ElRadioGroup", "handleChange", this.value);
      });
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("label", { staticClass: "el-radio-button", class: [
    _vm.size ? "el-radio-button--" + _vm.size : "",
    { "is-active": _vm.value === _vm.label },
    { "is-disabled": _vm.isDisabled },
    { "is-focus": _vm.focus }
  ], attrs: { "role": "radio", "aria-checked": _vm.value === _vm.label, "aria-disabled": _vm.isDisabled, "tabindex": _vm.tabIndex }, on: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"])) return null;
    $event.stopPropagation();
    $event.preventDefault();
    _vm.value = _vm.isDisabled ? _vm.value : _vm.label;
  } } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.value, expression: "value" }], staticClass: "el-radio-button__orig-radio", attrs: { "type": "radio", "name": _vm.name, "disabled": _vm.isDisabled, "tabindex": "-1", "autocomplete": "off" }, domProps: { "value": _vm.label, "checked": _vm._q(_vm.value, _vm.label) }, on: { "change": [function($event) {
    _vm.value = _vm.label;
  }, _vm.handleChange], "focus": function($event) {
    _vm.focus = true;
  }, "blur": function($event) {
    _vm.focus = false;
  } } }), _c("span", { staticClass: "el-radio-button__inner", style: _vm.value === _vm.label ? _vm.activeStyle : null, on: { "keydown": function($event) {
    $event.stopPropagation();
  } } }, [_vm._t("default"), !_vm.$slots.default ? [_vm._v(_vm._s(_vm.label))] : _vm._e()], 2)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const RadioButton = __component__.exports;
RadioButton.install = function(Vue) {
  Vue.component(RadioButton.name, RadioButton);
};
module.exports = RadioButton;
