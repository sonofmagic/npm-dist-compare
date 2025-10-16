"use strict";
const emitter = require("./emitter-CM7bVwl7.cjs");
const migrating = require("./migrating-BMLifAiB.cjs");
const merge = require("./merge-3R-Osds6.cjs");
const shared = require("./shared-DaGk7jPq.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
let hiddenTextarea;
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;
const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
  const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
  return { contextStyle, paddingSize, borderSize, boxSizing };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    document.body.appendChild(hiddenTextarea);
  }
  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetElement);
  hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === "border-box") {
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
}
const _sfc_main = {
  name: "ElInput",
  componentName: "ElInput",
  mixins: [emitter.emitter, migrating.Migrating],
  inheritAttrs: false,
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
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    };
  },
  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: "text"
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== "production" && console.warn("[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead.");
        return true;
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : "";
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon() {
      return {
        validating: "el-icon-loading",
        success: "el-icon-circle-check",
        error: "el-icon-circle-close"
      }[this.validateState];
    },
    textareaStyle() {
      return merge.merge({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === void 0 ? "" : String(this.value);
    },
    showClear() {
      return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && (this.focused || this.hovering);
    },
    showPwdVisible() {
      return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused);
    },
    isWordLimitVisible() {
      return this.showWordLimit && this.$attrs.maxlength && (this.type === "text" || this.type === "textarea") && !this.inputDisabled && !this.readonly && !this.showPassword;
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength() {
      if (typeof this.value === "number") {
        return String(this.value).length;
      }
      return (this.value || "").length;
    },
    inputExceed() {
      return this.isWordLimitVisible && this.textLength > this.upperLimit;
    }
  },
  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea);
      if (this.validateEvent) {
        this.dispatch("ElFormItem", "el.form.change", [val]);
      }
    },
    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue() {
      this.setNativeInputValue();
    },
    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
        this.resizeTextarea();
        this.updateIconOffset();
      });
    }
  },
  methods: {
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    getMigratingConfig() {
      return {
        props: {
          "icon": "icon is removed, use suffix-icon / prefix-icon instead.",
          "on-icon-click": "on-icon-click is removed."
        },
        events: {
          "click": "click is removed."
        }
      };
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
      if (this.validateEvent) {
        this.dispatch("ElFormItem", "el.form.blur", [this.value]);
      }
    },
    select() {
      this.getInput().select();
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const { autosize, type } = this;
      if (type !== "textarea") return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;
      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    handleCompositionStart(event) {
      this.$emit("compositionstart", event);
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      this.$emit("compositionupdate", event);
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || "";
      this.isComposing = !shared.isKorean(lastCharacter);
    },
    handleCompositionEnd(event) {
      this.$emit("compositionend", event);
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      if (this.isComposing) return;
      if (event.target.value === this.nativeInputValue) return;
      this.$emit("input", event.target.value);
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    calcIconOffset(place) {
      let elList = [].slice.call(this.$el.querySelectorAll(`.el-input__${place}`) || []);
      if (!elList.length) return;
      let el = null;
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      const pendantMap = {
        suffix: "append",
        prefix: "prepend"
      };
      const pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === "suffix" ? "-" : ""}${this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`;
      } else {
        el.removeAttribute("style");
      }
    },
    updateIconOffset() {
      this.calcIconOffset("prefix");
      this.calcIconOffset("suffix");
    },
    clear() {
      this.$emit("input", "");
      this.$emit("change", "");
      this.$emit("clear");
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(() => {
        this.focus();
      });
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    getSuffixVisible() {
      return this.$slots.suffix || this.suffixIcon || this.showClear || this.showPassword || this.isWordLimitVisible || this.validateState && this.needStatusIcon;
    }
  },
  created() {
    this.$on("inputSelect", this.select);
  },
  mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
    this.updateIconOffset();
  },
  updated() {
    this.$nextTick(this.updateIconOffset);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { class: [
    _vm.type === "textarea" ? "el-textarea" : "el-input",
    _vm.inputSize ? "el-input--" + _vm.inputSize : "",
    {
      "is-disabled": _vm.inputDisabled,
      "is-exceed": _vm.inputExceed,
      "el-input-group": _vm.$slots.prepend || _vm.$slots.append,
      "el-input-group--append": _vm.$slots.append,
      "el-input-group--prepend": _vm.$slots.prepend,
      "el-input--prefix": _vm.$slots.prefix || _vm.prefixIcon,
      "el-input--suffix": _vm.$slots.suffix || _vm.suffixIcon || _vm.clearable || _vm.showPassword
    }
  ], on: { "mouseenter": function($event) {
    _vm.hovering = true;
  }, "mouseleave": function($event) {
    _vm.hovering = false;
  } } }, [_vm.type !== "textarea" ? [_vm.$slots.prepend ? _c("div", { staticClass: "el-input-group__prepend" }, [_vm._t("prepend")], 2) : _vm._e(), _vm.type !== "textarea" ? _c("input", _vm._b({ ref: "input", staticClass: "el-input__inner", attrs: { "tabindex": _vm.tabindex, "type": _vm.showPassword ? _vm.passwordVisible ? "text" : "password" : _vm.type, "disabled": _vm.inputDisabled, "readonly": _vm.readonly, "autocomplete": _vm.autoComplete || _vm.autocomplete, "aria-label": _vm.label }, on: { "compositionstart": _vm.handleCompositionStart, "compositionupdate": _vm.handleCompositionUpdate, "compositionend": _vm.handleCompositionEnd, "input": _vm.handleInput, "focus": _vm.handleFocus, "blur": _vm.handleBlur, "change": _vm.handleChange } }, "input", _vm.$attrs, false)) : _vm._e(), _vm.$slots.prefix || _vm.prefixIcon ? _c("span", { staticClass: "el-input__prefix" }, [_vm._t("prefix"), _vm.prefixIcon ? _c("i", { staticClass: "el-input__icon", class: _vm.prefixIcon }) : _vm._e()], 2) : _vm._e(), _vm.getSuffixVisible() ? _c("span", { staticClass: "el-input__suffix" }, [_c("span", { staticClass: "el-input__suffix-inner" }, [!_vm.showClear || !_vm.showPwdVisible || !_vm.isWordLimitVisible ? [_vm._t("suffix"), _vm.suffixIcon ? _c("i", { staticClass: "el-input__icon", class: _vm.suffixIcon }) : _vm._e()] : _vm._e(), _vm.showClear ? _c("i", { staticClass: "el-input__icon el-icon-circle-close el-input__clear", on: { "mousedown": function($event) {
    $event.preventDefault();
  }, "click": _vm.clear } }) : _vm._e(), _vm.showPwdVisible ? _c("i", { staticClass: "el-input__icon el-icon-view el-input__clear", on: { "click": _vm.handlePasswordVisible } }) : _vm._e(), _vm.isWordLimitVisible ? _c("span", { staticClass: "el-input__count" }, [_c("span", { staticClass: "el-input__count-inner" }, [_vm._v(" " + _vm._s(_vm.textLength) + "/" + _vm._s(_vm.upperLimit) + " ")])]) : _vm._e()], 2), _vm.validateState ? _c("i", { staticClass: "el-input__icon", class: ["el-input__validateIcon", _vm.validateIcon] }) : _vm._e()]) : _vm._e(), _vm.$slots.append ? _c("div", { staticClass: "el-input-group__append" }, [_vm._t("append")], 2) : _vm._e()] : _c("textarea", _vm._b({ ref: "textarea", staticClass: "el-textarea__inner", style: _vm.textareaStyle, attrs: { "tabindex": _vm.tabindex, "disabled": _vm.inputDisabled, "readonly": _vm.readonly, "autocomplete": _vm.autoComplete || _vm.autocomplete, "aria-label": _vm.label }, on: { "compositionstart": _vm.handleCompositionStart, "compositionupdate": _vm.handleCompositionUpdate, "compositionend": _vm.handleCompositionEnd, "input": _vm.handleInput, "focus": _vm.handleFocus, "blur": _vm.handleBlur, "change": _vm.handleChange } }, "textarea", _vm.$attrs, false)), _vm.isWordLimitVisible && _vm.type === "textarea" ? _c("span", { staticClass: "el-input__count" }, [_vm._v(_vm._s(_vm.textLength) + "/" + _vm._s(_vm.upperLimit))]) : _vm._e()], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElInput = __component__.exports;
const _ElInput = ElInput;
_ElInput.install = function install(Vue) {
  Vue.component(_ElInput.name, _ElInput);
};
module.exports = _ElInput;
