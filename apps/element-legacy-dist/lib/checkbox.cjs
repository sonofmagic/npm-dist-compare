"use strict";
const emitter = require("./emitter-CM7bVwl7.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElCheckbox",
  mixins: [emitter.emitter],
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  componentName: "ElCheckbox",
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this.store : this.value !== void 0 ? this.value : this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== void 0 && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true);
          this._checkboxGroup.max !== void 0 && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true);
          this.isLimitExceeded === false && this.dispatch("ElCheckboxGroup", "input", [val]);
        } else {
          this.$emit("input", val);
          this.selfModel = val;
        }
      }
    },
    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== void 0) {
        return this.model === this.trueLabel;
      }
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ElCheckboxGroup") {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return !!(max || min) && (this.model.length >= max && !this.isChecked) || this.model.length <= min && this.isChecked;
    },
    isDisabled() {
      return this.isGroup ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled || this.isLimitDisabled : this.disabled || (this.elForm || {}).disabled;
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    checkboxSize() {
      const temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize;
    }
  },
  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String,
    /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String,
    /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean,
    size: String
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === void 0 ? true : this.trueLabel;
      } else {
        value = this.falseLabel === void 0 ? false : this.falseLabel;
      }
      this.$emit("change", value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch("ElCheckboxGroup", "change", [this._checkboxGroup.value]);
        }
      });
    }
  },
  created() {
    this.checked && this.addToStore();
  },
  mounted() {
    if (this.indeterminate) {
      this.$el.setAttribute("aria-controls", this.controls);
    }
  },
  watch: {
    value(value) {
      this.dispatch("ElFormItem", "el.form.change", value);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("label", { staticClass: "el-checkbox", class: [
    _vm.border && _vm.checkboxSize ? "el-checkbox--" + _vm.checkboxSize : "",
    { "is-disabled": _vm.isDisabled },
    { "is-bordered": _vm.border },
    { "is-checked": _vm.isChecked }
  ], attrs: { "id": _vm.id } }, [_c("span", { staticClass: "el-checkbox__input", class: {
    "is-disabled": _vm.isDisabled,
    "is-checked": _vm.isChecked,
    "is-indeterminate": _vm.indeterminate,
    "is-focus": _vm.focus
  }, attrs: { "tabindex": _vm.indeterminate ? 0 : false, "role": _vm.indeterminate ? "checkbox" : false, "aria-checked": _vm.indeterminate ? "mixed" : false } }, [_c("span", { staticClass: "el-checkbox__inner" }), _vm.trueLabel || _vm.falseLabel ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.model, expression: "model" }], staticClass: "el-checkbox__original", attrs: { "type": "checkbox", "aria-hidden": _vm.indeterminate ? "true" : "false", "name": _vm.name, "disabled": _vm.isDisabled, "true-value": _vm.trueLabel, "false-value": _vm.falseLabel }, domProps: { "checked": Array.isArray(_vm.model) ? _vm._i(_vm.model, null) > -1 : _vm._q(_vm.model, _vm.trueLabel) }, on: { "change": [function($event) {
    var $$a = _vm.model, $$el = $event.target, $$c = $$el.checked ? _vm.trueLabel : _vm.falseLabel;
    if (Array.isArray($$a)) {
      var $$v = null, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.model = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.model = $$c;
    }
  }, _vm.handleChange], "focus": function($event) {
    _vm.focus = true;
  }, "blur": function($event) {
    _vm.focus = false;
  } } }) : _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.model, expression: "model" }], staticClass: "el-checkbox__original", attrs: { "type": "checkbox", "aria-hidden": _vm.indeterminate ? "true" : "false", "disabled": _vm.isDisabled, "name": _vm.name }, domProps: { "value": _vm.label, "checked": Array.isArray(_vm.model) ? _vm._i(_vm.model, _vm.label) > -1 : _vm.model }, on: { "change": [function($event) {
    var $$a = _vm.model, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = _vm.label, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.model = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.model = $$c;
    }
  }, _vm.handleChange], "focus": function($event) {
    _vm.focus = true;
  }, "blur": function($event) {
    _vm.focus = false;
  } } })]), _vm.$slots.default || _vm.label ? _c("span", { staticClass: "el-checkbox__label" }, [_vm._t("default"), !_vm.$slots.default ? [_vm._v(_vm._s(_vm.label))] : _vm._e()], 2) : _vm._e()]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElCheckbox = __component__.exports;
const _Checkbox = ElCheckbox;
_Checkbox.install = function install(Vue) {
  Vue.component(_Checkbox.name, _Checkbox);
};
module.exports = _Checkbox;
