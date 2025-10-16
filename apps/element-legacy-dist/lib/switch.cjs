"use strict";
const emitter = require("./emitter-CM7bVwl7.cjs");
const focus = require("./focus-DSjBV76O.cjs");
const migrating = require("./migrating-BMLifAiB.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElSwitch",
  mixins: [focus.Focus("input"), migrating.Migrating, emitter.emitter],
  inject: {
    elForm: {
      default: ""
    }
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeIconClass: {
      type: String,
      default: ""
    },
    inactiveIconClass: {
      type: String,
      default: ""
    },
    activeText: String,
    inactiveText: String,
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String
  },
  data() {
    return {
      coreWidth: this.width
    };
  },
  created() {
    if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
      this.$emit("input", this.inactiveValue);
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    },
    switchDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      if (this.validateEvent) {
        this.dispatch("ElFormItem", "el.form.change", [this.value]);
      }
    }
  },
  methods: {
    handleChange(event) {
      const val = this.checked ? this.inactiveValue : this.activeValue;
      this.$emit("input", val);
      this.$emit("change", val);
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.checked = this.checked;
        }
      });
    },
    setBackgroundColor() {
      let newColor = this.checked ? this.activeColor : this.inactiveColor;
      this.$refs.core.style.borderColor = newColor;
      this.$refs.core.style.backgroundColor = newColor;
    },
    switchValue() {
      !this.switchDisabled && this.handleChange();
    },
    getMigratingConfig() {
      return {
        props: {
          "on-color": "on-color is renamed to active-color.",
          "off-color": "off-color is renamed to inactive-color.",
          "on-text": "on-text is renamed to active-text.",
          "off-text": "off-text is renamed to inactive-text.",
          "on-value": "on-value is renamed to active-value.",
          "off-value": "off-value is renamed to inactive-value.",
          "on-icon-class": "on-icon-class is renamed to active-icon-class.",
          "off-icon-class": "off-icon-class is renamed to inactive-icon-class."
        }
      };
    }
  },
  mounted() {
    this.coreWidth = this.width || 40;
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor();
    }
    this.$refs.input.checked = this.checked;
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-switch", class: { "is-disabled": _vm.switchDisabled, "is-checked": _vm.checked }, attrs: { "role": "switch", "aria-checked": _vm.checked, "aria-disabled": _vm.switchDisabled }, on: { "click": function($event) {
    $event.preventDefault();
    return _vm.switchValue.apply(null, arguments);
  } } }, [_c("input", { ref: "input", staticClass: "el-switch__input", attrs: { "type": "checkbox", "id": _vm.id, "name": _vm.name, "true-value": _vm.activeValue, "false-value": _vm.inactiveValue, "disabled": _vm.switchDisabled }, on: { "change": _vm.handleChange, "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.switchValue.apply(null, arguments);
  } } }), _vm.inactiveIconClass || _vm.inactiveText ? _c("span", { class: ["el-switch__label", "el-switch__label--left", !_vm.checked ? "is-active" : ""] }, [_vm.inactiveIconClass ? _c("i", { class: [_vm.inactiveIconClass] }) : _vm._e(), !_vm.inactiveIconClass && _vm.inactiveText ? _c("span", { attrs: { "aria-hidden": _vm.checked } }, [_vm._v(_vm._s(_vm.inactiveText))]) : _vm._e()]) : _vm._e(), _c("span", { ref: "core", staticClass: "el-switch__core", style: { "width": _vm.coreWidth + "px" } }), _vm.activeIconClass || _vm.activeText ? _c("span", { class: ["el-switch__label", "el-switch__label--right", _vm.checked ? "is-active" : ""] }, [_vm.activeIconClass ? _c("i", { class: [_vm.activeIconClass] }) : _vm._e(), !_vm.activeIconClass && _vm.activeText ? _c("span", { attrs: { "aria-hidden": !_vm.checked } }, [_vm._v(_vm._s(_vm.activeText))]) : _vm._e()]) : _vm._e()]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Switch = __component__.exports;
const _Switch = Switch;
_Switch.install = function install(Vue) {
  Vue.component(_Switch.name, _Switch);
};
module.exports = _Switch;
