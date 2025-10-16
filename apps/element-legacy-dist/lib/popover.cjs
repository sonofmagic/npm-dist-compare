"use strict";
const Vue = require("vue");
const vuePopper = require("./vue-popper-CQ9w6kyf.cjs");
const dom = require("./dom-D54PnS1K.cjs");
const util = require("./util-KJN0EjuU.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElPopover",
  mixins: [vuePopper.Popper],
  props: {
    trigger: {
      type: String,
      default: "click",
      validator: (value) => ["click", "focus", "hover", "manual"].indexOf(value) > -1
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 200
    },
    title: String,
    disabled: Boolean,
    content: String,
    reference: {},
    popperClass: String,
    width: {},
    visibleArrow: {
      default: true
    },
    arrowOffset: {
      type: Number,
      default: 0
    },
    transition: {
      type: String,
      default: "fade-in-linear"
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tooltipId() {
      return `el-popover-${util.generateId()}`;
    }
  },
  watch: {
    showPopper(val) {
      if (this.disabled) {
        return;
      }
      val ? this.$emit("show") : this.$emit("hide");
    }
  },
  mounted() {
    let reference = this.referenceElm = this.reference || this.$refs.reference;
    const popper = this.popper || this.$refs.popper;
    if (!reference && this.$refs.wrapper.children) {
      reference = this.referenceElm = this.$refs.wrapper.children[0];
    }
    if (reference) {
      dom.addClass(reference, "el-popover__reference");
      reference.setAttribute("aria-describedby", this.tooltipId);
      reference.setAttribute("tabindex", this.tabindex);
      popper.setAttribute("tabindex", 0);
      if (this.trigger !== "click") {
        dom.on(reference, "focusin", () => {
          this.handleFocus();
          const instance = reference.__vue__;
          if (instance && typeof instance.focus === "function") {
            instance.focus();
          }
        });
        dom.on(popper, "focusin", this.handleFocus);
        dom.on(reference, "focusout", this.handleBlur);
        dom.on(popper, "focusout", this.handleBlur);
      }
      dom.on(reference, "keydown", this.handleKeydown);
      dom.on(reference, "click", this.handleClick);
    }
    if (this.trigger === "click") {
      dom.on(reference, "click", this.doToggle);
      dom.on(document, "click", this.handleDocumentClick);
    } else if (this.trigger === "hover") {
      dom.on(reference, "mouseenter", this.handleMouseEnter);
      dom.on(popper, "mouseenter", this.handleMouseEnter);
      dom.on(reference, "mouseleave", this.handleMouseLeave);
      dom.on(popper, "mouseleave", this.handleMouseLeave);
    } else if (this.trigger === "focus") {
      if (this.tabindex < 0) {
        console.warn("[Element Warn][Popover]a negative taindex means that the element cannot be focused by tab key");
      }
      if (reference.querySelector("input, textarea")) {
        dom.on(reference, "focusin", this.doShow);
        dom.on(reference, "focusout", this.doClose);
      } else {
        dom.on(reference, "mousedown", this.doShow);
        dom.on(reference, "mouseup", this.doClose);
      }
    }
  },
  beforeDestroy() {
    this.cleanup();
  },
  deactivated() {
    this.cleanup();
  },
  methods: {
    doToggle() {
      this.showPopper = !this.showPopper;
    },
    doShow() {
      this.showPopper = true;
    },
    doClose() {
      this.showPopper = false;
    },
    handleFocus() {
      dom.addClass(this.referenceElm, "focusing");
      if (this.trigger === "click" || this.trigger === "focus") this.showPopper = true;
    },
    handleClick() {
      dom.removeClass(this.referenceElm, "focusing");
    },
    handleBlur() {
      dom.removeClass(this.referenceElm, "focusing");
      if (this.trigger === "click" || this.trigger === "focus") this.showPopper = false;
    },
    handleMouseEnter() {
      clearTimeout(this._timer);
      if (this.openDelay) {
        this._timer = setTimeout(() => {
          this.showPopper = true;
        }, this.openDelay);
      } else {
        this.showPopper = true;
      }
    },
    handleKeydown(ev) {
      if (ev.keyCode === 27 && this.trigger !== "manual") {
        this.doClose();
      }
    },
    handleMouseLeave() {
      clearTimeout(this._timer);
      if (this.closeDelay) {
        this._timer = setTimeout(() => {
          this.showPopper = false;
        }, this.closeDelay);
      } else {
        this.showPopper = false;
      }
    },
    handleDocumentClick(e) {
      let reference = this.reference || this.$refs.reference;
      const popper = this.popper || this.$refs.popper;
      if (!reference && this.$refs.wrapper.children) {
        reference = this.referenceElm = this.$refs.wrapper.children[0];
      }
      if (!this.$el || !reference || this.$el.contains(e.target) || reference.contains(e.target) || !popper || popper.contains(e.target)) return;
      this.showPopper = false;
    },
    handleAfterEnter() {
      this.$emit("after-enter");
    },
    handleAfterLeave() {
      this.$emit("after-leave");
      this.doDestroy();
    },
    cleanup() {
      if (this.openDelay || this.closeDelay) {
        clearTimeout(this._timer);
      }
    }
  },
  destroyed() {
    const reference = this.reference;
    dom.off(reference, "click", this.doToggle);
    dom.off(reference, "mouseup", this.doClose);
    dom.off(reference, "mousedown", this.doShow);
    dom.off(reference, "focusin", this.doShow);
    dom.off(reference, "focusout", this.doClose);
    dom.off(reference, "mousedown", this.doShow);
    dom.off(reference, "mouseup", this.doClose);
    dom.off(reference, "mouseleave", this.handleMouseLeave);
    dom.off(reference, "mouseenter", this.handleMouseEnter);
    dom.off(document, "click", this.handleDocumentClick);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", [_c("transition", { attrs: { "name": _vm.transition }, on: { "after-enter": _vm.handleAfterEnter, "after-leave": _vm.handleAfterLeave } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: !_vm.disabled && _vm.showPopper, expression: "!disabled && showPopper" }], ref: "popper", staticClass: "el-popover el-popper", class: [_vm.popperClass, _vm.content && "el-popover--plain"], style: { width: _vm.width + "px" }, attrs: { "role": "tooltip", "id": _vm.tooltipId, "aria-hidden": _vm.disabled || !_vm.showPopper ? "true" : "false" } }, [_vm.title ? _c("div", { staticClass: "el-popover__title", domProps: { "textContent": _vm._s(_vm.title) } }) : _vm._e(), _vm._t("default", function() {
    return [_vm._v(_vm._s(_vm.content))];
  })], 2)]), _c("span", { ref: "wrapper", staticClass: "el-popover__reference-wrapper" }, [_vm._t("reference")], 2)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Popover = __component__.exports;
const getReference = (el, binding, vnode) => {
  const _ref = binding.expression ? binding.value : binding.arg;
  const popper = vnode.context.$refs[_ref];
  if (popper) {
    if (Array.isArray(popper)) {
      popper[0].$refs.reference = el;
    } else {
      popper.$refs.reference = el;
    }
  }
};
const directive = {
  bind(el, binding, vnode) {
    getReference(el, binding, vnode);
  },
  inserted(el, binding, vnode) {
    getReference(el, binding, vnode);
  }
};
const _Popover = Popover;
Vue.directive("popover", directive);
_Popover.install = function install(VueInstance) {
  VueInstance.directive("popover", directive);
  VueInstance.component(_Popover.name, _Popover);
};
_Popover.directive = directive;
module.exports = _Popover;
