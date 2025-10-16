"use strict";
const emitter = require("./emitter-CM7bVwl7.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElRadio",
  mixins: [emitter.emitter],
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  componentName: "ElRadio",
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String
  },
  data() {
    return {
      focus: false
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ElRadioGroup") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("ElRadioGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
      }
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    radioSize() {
      const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._radioGroup.radioGroupSize || temRadioSize : temRadioSize;
    },
    isDisabled() {
      return this.isGroup ? this._radioGroup.disabled || this.disabled || (this.elForm || {}).disabled : this.disabled || (this.elForm || {}).disabled;
    },
    tabIndex() {
      return this.isDisabled || this.isGroup && this.model !== this.label ? -1 : 0;
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        this.isGroup && this.dispatch("ElRadioGroup", "handleChange", this.model);
      });
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("label", { staticClass: "el-radio", class: [
    _vm.border && _vm.radioSize ? "el-radio--" + _vm.radioSize : "",
    { "is-disabled": _vm.isDisabled },
    { "is-focus": _vm.focus },
    { "is-bordered": _vm.border },
    { "is-checked": _vm.model === _vm.label }
  ], attrs: { "role": "radio", "aria-checked": _vm.model === _vm.label, "aria-disabled": _vm.isDisabled, "tabindex": _vm.tabIndex }, on: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"])) return null;
    $event.stopPropagation();
    $event.preventDefault();
    _vm.model = _vm.isDisabled ? _vm.model : _vm.label;
  } } }, [_c("span", { staticClass: "el-radio__input", class: {
    "is-disabled": _vm.isDisabled,
    "is-checked": _vm.model === _vm.label
  } }, [_c("span", { staticClass: "el-radio__inner" }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.model, expression: "model" }], ref: "radio", staticClass: "el-radio__original", attrs: { "type": "radio", "aria-hidden": "true", "name": _vm.name, "disabled": _vm.isDisabled, "tabindex": "-1", "autocomplete": "off" }, domProps: { "value": _vm.label, "checked": _vm._q(_vm.model, _vm.label) }, on: { "focus": function($event) {
    _vm.focus = true;
  }, "blur": function($event) {
    _vm.focus = false;
  }, "change": [function($event) {
    _vm.model = _vm.label;
  }, _vm.handleChange] } })]), _c("span", { staticClass: "el-radio__label", on: { "keydown": function($event) {
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
const Radio = __component__.exports;
const _Radio = Radio;
_Radio.install = function install(Vue) {
  Vue.component(_Radio.name, _Radio);
};
module.exports = _Radio;
