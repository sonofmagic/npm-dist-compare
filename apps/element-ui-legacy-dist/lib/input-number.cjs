"use strict";
const ElInput = require("element-ui/lib/input");
const Focus = require("element-ui/lib/mixins/focus");
const repeatClick = require("./repeat-click-BldeFe9E.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElInputNumber",
  mixins: [Focus("input")],
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  directives: {
    repeatClick: repeatClick.RepeatClick
  },
  components: {
    ElInput
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {},
    disabled: Boolean,
    size: String,
    controls: {
      type: Boolean,
      default: true
    },
    controlsPosition: {
      type: String,
      default: ""
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10);
      }
    }
  },
  data() {
    return {
      currentValue: 0,
      userInput: null
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        let newVal = value === void 0 ? value : Number(value);
        if (newVal !== void 0) {
          if (isNaN(newVal)) {
            return;
          }
          if (this.stepStrictly) {
            const stepPrecision = this.getPrecision(this.step);
            const precisionFactor = Math.pow(10, stepPrecision);
            newVal = Math.round(newVal / this.step) * precisionFactor * this.step / precisionFactor;
          }
          if (this.precision !== void 0) {
            newVal = this.toPrecision(newVal, this.precision);
          }
        }
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        this.currentValue = newVal;
        this.userInput = null;
        this.$emit("input", newVal);
      }
    }
  },
  computed: {
    minDisabled() {
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled() {
      return this._increase(this.value, this.step) > this.max;
    },
    numPrecision() {
      const { value, step, getPrecision, precision } = this;
      const stepPrecision = getPrecision(step);
      if (precision !== void 0) {
        if (stepPrecision > precision) {
          console.warn("[Element Warn][InputNumber]precision should not be less than the decimal places of step");
        }
        return precision;
      } else {
        return Math.max(getPrecision(value), stepPrecision);
      }
    },
    controlsAtRight() {
      return this.controls && this.controlsPosition === "right";
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    inputNumberSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputNumberDisabled() {
      return this.disabled || !!(this.elForm || {}).disabled;
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput;
      }
      let currentValue = this.currentValue;
      if (typeof currentValue === "number") {
        if (this.stepStrictly) {
          const stepPrecision = this.getPrecision(this.step);
          const precisionFactor = Math.pow(10, stepPrecision);
          currentValue = Math.round(currentValue / this.step) * precisionFactor * this.step / precisionFactor;
        }
        if (this.precision !== void 0) {
          currentValue = currentValue.toFixed(this.precision);
        }
      }
      return currentValue;
    }
  },
  methods: {
    toPrecision(num, precision) {
      if (precision === void 0) precision = this.numPrecision;
      return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
    },
    getPrecision(value) {
      if (value === void 0) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf(".");
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    _increase(val, step) {
      if (typeof val !== "number" && val !== void 0) return this.currentValue;
      const precisionFactor = Math.pow(10, this.numPrecision);
      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
    },
    _decrease(val, step) {
      if (typeof val !== "number" && val !== void 0) return this.currentValue;
      const precisionFactor = Math.pow(10, this.numPrecision);
      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
    },
    increase() {
      if (this.inputNumberDisabled || this.maxDisabled) return;
      const value = this.value || 0;
      const newVal = this._increase(value, this.step);
      this.setCurrentValue(newVal);
    },
    decrease() {
      if (this.inputNumberDisabled || this.minDisabled) return;
      const value = this.value || 0;
      const newVal = this._decrease(value, this.step);
      this.setCurrentValue(newVal);
    },
    handleBlur(event) {
      this.$emit("blur", event);
    },
    handleFocus(event) {
      this.$emit("focus", event);
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue;
      if (typeof newVal === "number" && this.precision !== void 0) {
        newVal = this.toPrecision(newVal, this.precision);
      }
      if (newVal >= this.max) newVal = this.max;
      if (newVal <= this.min) newVal = this.min;
      if (oldVal === newVal) return;
      this.userInput = null;
      this.$emit("input", newVal);
      this.$emit("change", newVal, oldVal);
      this.currentValue = newVal;
    },
    handleInput(value) {
      this.userInput = value;
    },
    handleInputChange(value) {
      const newVal = value === "" ? void 0 : Number(value);
      if (!isNaN(newVal) || value === "") {
        this.setCurrentValue(newVal);
      }
      this.userInput = null;
    },
    select() {
      this.$refs.input.select();
    }
  },
  mounted() {
    let innerInput = this.$refs.input.$refs.input;
    innerInput.setAttribute("role", "spinbutton");
    innerInput.setAttribute("aria-valuemax", this.max);
    innerInput.setAttribute("aria-valuemin", this.min);
    innerInput.setAttribute("aria-valuenow", this.currentValue);
    innerInput.setAttribute("aria-disabled", this.inputNumberDisabled);
  },
  updated() {
    if (!this.$refs || !this.$refs.input) return;
    const innerInput = this.$refs.input.$refs.input;
    innerInput.setAttribute("aria-valuenow", this.currentValue);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { class: [
    "el-input-number",
    _vm.inputNumberSize ? "el-input-number--" + _vm.inputNumberSize : "",
    { "is-disabled": _vm.inputNumberDisabled },
    { "is-without-controls": !_vm.controls },
    { "is-controls-right": _vm.controlsAtRight }
  ], on: { "dragstart": function($event) {
    $event.preventDefault();
  } } }, [_vm.controls ? _c("span", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.decrease, expression: "decrease" }], staticClass: "el-input-number__decrease", class: { "is-disabled": _vm.minDisabled }, attrs: { "role": "button" }, on: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.decrease.apply(null, arguments);
  } } }, [_c("i", { class: `el-icon-${_vm.controlsAtRight ? "arrow-down" : "minus"}` })]) : _vm._e(), _vm.controls ? _c("span", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.increase, expression: "increase" }], staticClass: "el-input-number__increase", class: { "is-disabled": _vm.maxDisabled }, attrs: { "role": "button" }, on: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.increase.apply(null, arguments);
  } } }, [_c("i", { class: `el-icon-${_vm.controlsAtRight ? "arrow-up" : "plus"}` })]) : _vm._e(), _c("el-input", { ref: "input", attrs: { "value": _vm.displayValue, "placeholder": _vm.placeholder, "disabled": _vm.inputNumberDisabled, "size": _vm.inputNumberSize, "max": _vm.max, "min": _vm.min, "name": _vm.name, "label": _vm.label }, on: { "blur": _vm.handleBlur, "focus": _vm.handleFocus, "input": _vm.handleInput, "change": _vm.handleInputChange }, nativeOn: { "keydown": [function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) return null;
    $event.preventDefault();
    return _vm.increase.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) return null;
    $event.preventDefault();
    return _vm.decrease.apply(null, arguments);
  }] } })], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElInputNumber = __component__.exports;
ElInputNumber.install = function(Vue) {
  Vue.component(ElInputNumber.name, ElInputNumber);
};
module.exports = ElInputNumber;
