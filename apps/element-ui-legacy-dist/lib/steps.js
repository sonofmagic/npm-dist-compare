import Migrating from "element-ui/lib/mixins/migrating";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElSteps",
  mixins: [Migrating],
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
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Steps = __component__.exports;
Steps.install = function(Vue) {
  Vue.component(Steps.name, Steps);
};
export {
  Steps as default
};
