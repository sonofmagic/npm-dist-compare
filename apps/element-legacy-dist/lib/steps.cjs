"use strict";
const migrating = require("./migrating-BMLifAiB.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElSteps",
  mixins: [migrating.Migrating],
  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: "horizontal"
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: "finish"
    },
    processStatus: {
      type: String,
      default: "process"
    }
  },
  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          "center": "center is removed."
        }
      };
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.$emit("change", newVal, oldVal);
    },
    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-steps", class: [
    !_vm.simple && "el-steps--" + _vm.direction,
    _vm.simple && "el-steps--simple"
  ] }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Steps = __component__.exports;
const _Steps = Steps;
_Steps.install = function install(Vue) {
  Vue.component(_Steps.name, _Steps);
};
module.exports = _Steps;
