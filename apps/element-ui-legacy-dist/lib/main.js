import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElMain",
  componentName: "ElMain"
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("main", { staticClass: "el-main" }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Main = __component__.exports;
Main.install = function(Vue) {
  Vue.component(Main.name, Main);
};
export {
  Main as default
};
