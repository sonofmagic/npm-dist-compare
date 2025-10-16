import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElIcon",
  props: {
    name: String
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("i", { class: "el-icon-" + _vm.name });
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElIcon = __component__.exports;
const _ElIcon = ElIcon;
_ElIcon.install = function install(Vue) {
  Vue.component(_ElIcon.name, _ElIcon);
};
export {
  _ElIcon as default
};
