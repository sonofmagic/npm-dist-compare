import Emitter from "element-ui/lib/mixins/emitter";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  mixins: [Emitter],
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    };
  },
  watch: {
    disabled(val) {
      this.broadcast("ElOption", "handleGroupDisabled", val);
    }
  },
  methods: {
    queryChange() {
      this.visible = this.$children && Array.isArray(this.$children) && this.$children.some((option) => option.visible === true);
    }
  },
  created() {
    this.$on("queryChange", this.queryChange);
  },
  mounted() {
    if (this.disabled) {
      this.broadcast("ElOption", "handleGroupDisabled", this.disabled);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("ul", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-select-group__wrap" }, [_c("li", { staticClass: "el-select-group__title" }, [_vm._v(_vm._s(_vm.label))]), _c("li", [_c("ul", { staticClass: "el-select-group" }, [_vm._t("default")], 2)])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElOptionGroup = __component__.exports;
ElOptionGroup.install = function(Vue) {
  Vue.component(ElOptionGroup.name, ElOptionGroup);
};
export {
  ElOptionGroup as default
};
