"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElStep",
  props: {
    title: String,
    icon: String,
    description: String,
    status: String
  },
  data() {
    return {
      index: -1,
      lineStyle: {},
      internalStatus: ""
    };
  },
  beforeCreate() {
    this.$parent.steps.push(this);
  },
  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },
  computed: {
    currentStatus() {
      return this.status || this.internalStatus;
    },
    prevStatus() {
      const prevStep = this.$parent.steps[this.index - 1];
      return prevStep ? prevStep.currentStatus : "wait";
    },
    isCenter() {
      return this.$parent.alignCenter;
    },
    isVertical() {
      return this.$parent.direction === "vertical";
    },
    isSimple() {
      return this.$parent.simple;
    },
    isLast() {
      const parent = this.$parent;
      return parent.steps[parent.steps.length - 1] === this;
    },
    stepsCount() {
      return this.$parent.steps.length;
    },
    space() {
      const { isSimple, $parent: { space } } = this;
      return isSimple ? "" : space;
    },
    style: function() {
      const style = {};
      const parent = this.$parent;
      const len = parent.steps.length;
      const space = typeof this.space === "number" ? this.space + "px" : this.space ? this.space : 100 / (len - (this.isCenter ? 0 : 1)) + "%";
      style.flexBasis = space;
      if (this.isVertical) return style;
      if (this.isLast) {
        style.maxWidth = 100 / this.stepsCount + "%";
      } else {
        style.marginRight = -this.$parent.stepOffset + "px";
      }
      return style;
    }
  },
  methods: {
    updateStatus(val) {
      const prevChild = this.$parent.$children[this.index - 1];
      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index && this.prevStatus !== "error") {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = "wait";
      }
      if (prevChild) prevChild.calcProgress(this.internalStatus);
    },
    calcProgress(status) {
      let step = 100;
      const style = {};
      style.transitionDelay = 150 * this.index + "ms";
      if (status === this.$parent.processStatus) {
        step = this.currentStatus !== "error" ? 0 : 0;
      } else if (status === "wait") {
        step = 0;
        style.transitionDelay = -150 * this.index + "ms";
      }
      style.borderWidth = step && !this.isSimple ? "1px" : 0;
      this.$parent.direction === "vertical" ? style.height = step + "%" : style.width = step + "%";
      this.lineStyle = style;
    }
  },
  mounted() {
    const unwatch = this.$watch("index", (val) => {
      this.$watch("$parent.active", this.updateStatus, { immediate: true });
      this.$watch("$parent.processStatus", () => {
        const activeIndex = this.$parent.active;
        this.updateStatus(activeIndex);
      }, { immediate: true });
      unwatch();
    });
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-step", class: [
    !_vm.isSimple && `is-${_vm.$parent.direction}`,
    _vm.isSimple && "is-simple",
    _vm.isLast && !_vm.space && !_vm.isCenter && "is-flex",
    _vm.isCenter && !_vm.isVertical && !_vm.isSimple && "is-center"
  ], style: _vm.style }, [_c("div", { staticClass: "el-step__head", class: `is-${_vm.currentStatus}` }, [_c("div", { staticClass: "el-step__line", style: _vm.isLast ? "" : { marginRight: _vm.$parent.stepOffset + "px" } }, [_c("i", { staticClass: "el-step__line-inner", style: _vm.lineStyle })]), _c("div", { staticClass: "el-step__icon", class: `is-${_vm.icon ? "icon" : "text"}` }, [_vm.currentStatus !== "success" && _vm.currentStatus !== "error" ? _vm._t("icon", function() {
    return [_vm.icon ? _c("i", { staticClass: "el-step__icon-inner", class: [_vm.icon] }) : _vm._e(), !_vm.icon && !_vm.isSimple ? _c("div", { staticClass: "el-step__icon-inner" }, [_vm._v(_vm._s(_vm.index + 1))]) : _vm._e()];
  }) : _c("i", { staticClass: "el-step__icon-inner is-status", class: ["el-icon-" + (_vm.currentStatus === "success" ? "check" : "close")] })], 2)]), _c("div", { staticClass: "el-step__main" }, [_c("div", { ref: "title", staticClass: "el-step__title", class: ["is-" + _vm.currentStatus] }, [_vm._t("title", function() {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2), _vm.isSimple ? _c("div", { staticClass: "el-step__arrow" }) : _c("div", { staticClass: "el-step__description", class: ["is-" + _vm.currentStatus] }, [_vm._t("description", function() {
    return [_vm._v(_vm._s(_vm.description))];
  })], 2)])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Step = __component__.exports;
Step.install = function(Vue) {
  Vue.component(Step.name, Step);
};
module.exports = Step;
