"use strict";
const merge = require("element-ui/lib/utils/merge");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElForm",
  componentName: "ElForm",
  provide() {
    return {
      elForm: this
    };
  },
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ""
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String,
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    rules() {
      this.fields.forEach((field) => {
        field.removeValidateEvents();
        field.addValidateEvents();
      });
      if (this.validateOnRuleChange) {
        this.validate(() => {
        });
      }
    }
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0;
      const max = Math.max(...this.potentialLabelWidthArr);
      return max ? `${max}px` : "";
    }
  },
  data() {
    return {
      fields: [],
      potentialLabelWidthArr: []
      // use this array to calculate auto width
    };
  },
  created() {
    this.$on("el.form.addField", (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on("el.form.removeField", (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  methods: {
    resetFields() {
      if (!this.model) {
        console.warn("[Element Warn][Form]model is required for resetFields to work.");
        return;
      }
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    clearValidate(props = []) {
      const fields = props.length ? typeof props === "string" ? this.fields.filter((field) => props === field.prop) : this.fields.filter((field) => props.indexOf(field.prop) > -1) : this.fields;
      fields.forEach((field) => {
        field.clearValidate();
      });
    },
    validate(callback) {
      if (!this.model) {
        console.warn("[Element Warn][Form]model is required for validate to work!");
        return;
      }
      let promise;
      if (typeof callback !== "function" && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function(valid2, invalidFields2) {
            valid2 ? resolve(valid2) : reject(invalidFields2);
          };
        });
      }
      let valid = true;
      let count = 0;
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      let invalidFields = {};
      this.fields.forEach((field) => {
        field.validate("", (message, field2) => {
          if (message) {
            valid = false;
          }
          invalidFields = merge({}, invalidFields, field2);
          if (typeof callback === "function" && ++count === this.fields.length) {
            callback(valid, invalidFields);
          }
        });
      });
      if (promise) {
        return promise;
      }
    },
    validateField(props, cb) {
      props = [].concat(props);
      const fields = this.fields.filter((field) => props.indexOf(field.prop) !== -1);
      if (!fields.length) {
        console.warn("[Element Warn]please pass correct props!");
        return;
      }
      fields.forEach((field) => {
        field.validate("", cb);
      });
    },
    getLabelWidthIndex(width) {
      const index = this.potentialLabelWidthArr.indexOf(width);
      if (index === -1) {
        throw new Error("[ElementForm]unpected width ", width);
      }
      return index;
    },
    registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index = this.getLabelWidthIndex(oldVal);
        this.potentialLabelWidthArr.splice(index, 1, val);
      } else if (val) {
        this.potentialLabelWidthArr.push(val);
      }
    },
    deregisterLabelWidth(val) {
      const index = this.getLabelWidthIndex(val);
      this.potentialLabelWidthArr.splice(index, 1);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("form", { staticClass: "el-form", class: [
    _vm.labelPosition ? "el-form--label-" + _vm.labelPosition : "",
    { "el-form--inline": _vm.inline }
  ] }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElForm = __component__.exports;
ElForm.install = function(Vue) {
  Vue.component(ElForm.name, ElForm);
};
module.exports = ElForm;
