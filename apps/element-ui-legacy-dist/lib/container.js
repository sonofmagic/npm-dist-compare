import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElContainer",
  componentName: "ElContainer",
  props: {
    direction: String
  },
  computed: {
    isVertical() {
      if (this.direction === "vertical") {
        return true;
      } else if (this.direction === "horizontal") {
        return false;
      }
      return this.$slots && this.$slots.default ? this.$slots.default.some((vnode) => {
        const tag = vnode.componentOptions && vnode.componentOptions.tag;
        return tag === "el-header" || tag === "el-footer";
      }) : false;
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("section", { staticClass: "el-container", class: { "is-vertical": _vm.isVertical } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Container = __component__.exports;
Container.install = function(Vue) {
  Vue.component(Container.name, Container);
};
export {
  Container as default
};
