"use strict";
const vuePopper = require("./vue-popper-CQ9w6kyf.cjs");
const index = require("./index-Cf0anSwe.cjs");
const dom = require("./dom-D54PnS1K.cjs");
const util = require("./util-KJN0EjuU.cjs");
const Vue = require("vue");
const Tooltip = {
  name: "ElTooltip",
  mixins: [vuePopper.Popper],
  props: {
    openDelay: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    manual: Boolean,
    effect: {
      type: String,
      default: "dark"
    },
    arrowOffset: {
      type: Number,
      default: 0
    },
    popperClass: String,
    content: String,
    visibleArrow: {
      default: true
    },
    transition: {
      type: String,
      default: "el-fade-in-linear"
    },
    popperOptions: {
      default() {
        return {
          boundariesPadding: 10,
          gpuAcceleration: false
        };
      }
    },
    enterable: {
      type: Boolean,
      default: true
    },
    hideAfter: {
      type: Number,
      default: 0
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tooltipId: `el-tooltip-${util.generateId()}`,
      timeoutPending: null,
      focusing: false
    };
  },
  beforeCreate() {
    if (this.$isServer) return;
    this.popperVM = new Vue({
      data: {
        node: ""
      },
      render(h) {
        return this.node;
      }
    }).$mount();
    this.debounceClose = index.debounce(200, () => this.handleClosePopper());
  },
  render(h) {
    if (this.popperVM) {
      this.popperVM.node = h("transition", {
        "attrs": {
          "name": this.transition
        },
        "on": {
          "afterLeave": this.doDestroy
        }
      }, [h("div", {
        "on": {
          "mouseleave": () => {
            this.setExpectedState(false);
            this.debounceClose();
          },
          "mouseenter": () => {
            this.setExpectedState(true);
          }
        },
        "ref": "popper",
        "attrs": {
          "role": "tooltip",
          "id": this.tooltipId,
          "aria-hidden": this.disabled || !this.showPopper ? "true" : "false"
        },
        "directives": [{
          name: "show",
          value: !this.disabled && this.showPopper
        }],
        "class": ["el-tooltip__popper", "is-" + this.effect, this.popperClass]
      }, [this.$slots.content || this.content])]);
    }
    const firstElement = this.getFirstElement();
    if (!firstElement) return null;
    const data = firstElement.data = firstElement.data || {};
    data.staticClass = this.addTooltipClass(data.staticClass);
    return firstElement;
  },
  mounted() {
    this.referenceElm = this.$el;
    if (this.$el.nodeType === 1) {
      this.$el.setAttribute("aria-describedby", this.tooltipId);
      this.$el.setAttribute("tabindex", this.tabindex);
      dom.on(this.referenceElm, "mouseenter", this.show);
      dom.on(this.referenceElm, "mouseleave", this.hide);
      dom.on(this.referenceElm, "focus", () => {
        if (!this.$slots.default || !this.$slots.default.length) {
          this.handleFocus();
          return;
        }
        const instance = this.$slots.default[0].componentInstance;
        if (instance && instance.focus) {
          instance.focus();
        } else {
          this.handleFocus();
        }
      });
      dom.on(this.referenceElm, "blur", this.handleBlur);
      dom.on(this.referenceElm, "click", this.removeFocusing);
    }
    if (this.value && this.popperVM) {
      this.popperVM.$nextTick(() => {
        if (this.value) {
          this.updatePopper();
        }
      });
    }
  },
  watch: {
    focusing(val) {
      if (val) {
        dom.addClass(this.referenceElm, "focusing");
      } else {
        dom.removeClass(this.referenceElm, "focusing");
      }
    }
  },
  methods: {
    show() {
      this.setExpectedState(true);
      this.handleShowPopper();
    },
    hide() {
      this.setExpectedState(false);
      this.debounceClose();
    },
    handleFocus() {
      this.focusing = true;
      this.show();
    },
    handleBlur() {
      this.focusing = false;
      this.hide();
    },
    removeFocusing() {
      this.focusing = false;
    },
    addTooltipClass(prev) {
      if (!prev) {
        return "el-tooltip";
      } else {
        return "el-tooltip " + prev.replace("el-tooltip", "");
      }
    },
    handleShowPopper() {
      if (!this.expectedState || this.manual) return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showPopper = true;
      }, this.openDelay);
      if (this.hideAfter > 0) {
        this.timeoutPending = setTimeout(() => {
          this.showPopper = false;
        }, this.hideAfter);
      }
    },
    handleClosePopper() {
      if (this.enterable && this.expectedState || this.manual) return;
      clearTimeout(this.timeout);
      if (this.timeoutPending) {
        clearTimeout(this.timeoutPending);
      }
      this.showPopper = false;
      if (this.disabled) {
        this.doDestroy();
      }
    },
    setExpectedState(expectedState) {
      if (expectedState === false) {
        clearTimeout(this.timeoutPending);
      }
      this.expectedState = expectedState;
    },
    getFirstElement() {
      const slots = this.$slots.default;
      if (!Array.isArray(slots)) return null;
      let element = null;
      for (let index2 = 0; index2 < slots.length; index2++) {
        if (slots[index2] && slots[index2].tag) {
          element = slots[index2];
          break;
        }
      }
      return element;
    }
  },
  beforeDestroy() {
    this.popperVM && this.popperVM.$destroy();
  },
  destroyed() {
    const reference = this.referenceElm;
    if (reference.nodeType === 1) {
      dom.off(reference, "mouseenter", this.show);
      dom.off(reference, "mouseleave", this.hide);
      dom.off(reference, "focus", this.handleFocus);
      dom.off(reference, "blur", this.handleBlur);
      dom.off(reference, "click", this.removeFocusing);
    }
  }
};
const _Tooltip = Tooltip;
_Tooltip.install = function install(Vue2) {
  Vue2.component(_Tooltip.name, _Tooltip);
};
module.exports = _Tooltip;
