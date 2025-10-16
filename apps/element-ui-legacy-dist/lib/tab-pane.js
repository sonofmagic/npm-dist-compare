import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElTabPane",
  componentName: "ElTabPane",
  props: {
    label: String,
    labelContent: Function,
    name: String,
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean
  },
  data() {
    return {
      index: null,
      loaded: false
    };
  },
  computed: {
    isClosable() {
      return this.closable || this.$parent.closable;
    },
    active() {
      const active = this.$parent.currentName === (this.name || this.index);
      if (active) {
        this.loaded = true;
      }
      return active;
    },
    paneName() {
      return this.name || this.index;
    }
  },
  updated() {
    this.$parent.$emit("tab-nav-update");
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return !_vm.lazy || _vm.loaded || _vm.active ? _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.active, expression: "active" }], staticClass: "el-tab-pane", attrs: { "role": "tabpanel", "aria-hidden": !_vm.active, "id": `pane-${_vm.paneName}`, "aria-labelledby": `tab-${_vm.paneName}` } }, [_vm._t("default")], 2) : _vm._e();
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const TabPane = __component__.exports;
TabPane.install = function(Vue) {
  Vue.component(TabPane.name, TabPane);
};
export {
  TabPane as default
};
