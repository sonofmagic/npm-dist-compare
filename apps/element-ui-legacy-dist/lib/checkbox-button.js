import Emitter from "element-ui/lib/mixins/emitter";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElCheckboxButton",
  mixins: [Emitter],
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number]
  },
  computed: {
    model: {
      get() {
        return this._checkboxGroup ? this.store : this.value !== void 0 ? this.value : this.selfModel;
      },
      set(val) {
        if (this._checkboxGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== void 0 && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true);
          this._checkboxGroup.max !== void 0 && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true);
          this.isLimitExceeded === false && this.dispatch("ElCheckboxGroup", "input", [val]);
        } else if (this.value !== void 0) {
          this.$emit("input", val);
        } else {
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
    _checkboxGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "ElCheckboxGroup") {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    activeStyle() {
      return {
        backgroundColor: this._checkboxGroup.fill || "",
        borderColor: this._checkboxGroup.fill || "",
        color: this._checkboxGroup.textColor || "",
        "box-shadow": "-1px 0 0 0 " + this._checkboxGroup.fill
      };
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    size() {
      return this._checkboxGroup.checkboxGroupSize || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return !!(max || min) && (this.model.length >= max && !this.isChecked) || this.model.length <= min && this.isChecked;
    },
    isDisabled() {
      return this._checkboxGroup ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled || this.isLimitDisabled : this.disabled || (this.elForm || {}).disabled;
    }
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
        if (this._checkboxGroup) {
          this.dispatch("ElCheckboxGroup", "change", [this._checkboxGroup.value]);
        }
      });
    }
  },
  created() {
    this.checked && this.addToStore();
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("label", { staticClass: "el-checkbox-button", class: [
    _vm.size ? "el-checkbox-button--" + _vm.size : "",
    { "is-disabled": _vm.isDisabled },
    { "is-checked": _vm.isChecked },
    { "is-focus": _vm.focus }
  ], attrs: { "role": "checkbox", "aria-checked": _vm.isChecked, "aria-disabled": _vm.isDisabled } }, [_vm.trueLabel || _vm.falseLabel ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.model, expression: "model" }], staticClass: "el-checkbox-button__original", attrs: { "type": "checkbox", "name": _vm.name, "disabled": _vm.isDisabled, "true-value": _vm.trueLabel, "false-value": _vm.falseLabel }, domProps: { "checked": Array.isArray(_vm.model) ? _vm._i(_vm.model, null) > -1 : _vm._q(_vm.model, _vm.trueLabel) }, on: { "change": [function($event) {
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
  } } }) : _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.model, expression: "model" }], staticClass: "el-checkbox-button__original", attrs: { "type": "checkbox", "name": _vm.name, "disabled": _vm.isDisabled }, domProps: { "value": _vm.label, "checked": Array.isArray(_vm.model) ? _vm._i(_vm.model, _vm.label) > -1 : _vm.model }, on: { "change": [function($event) {
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
  } } }), _vm.$slots.default || _vm.label ? _c("span", { staticClass: "el-checkbox-button__inner", style: _vm.isChecked ? _vm.activeStyle : null }, [_vm._t("default", function() {
    return [_vm._v(_vm._s(_vm.label))];
  })], 2) : _vm._e()]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElCheckboxButton = __component__.exports;
ElCheckboxButton.install = function(Vue) {
  Vue.component(ElCheckboxButton.name, ElCheckboxButton);
};
export {
  ElCheckboxButton as default
};
