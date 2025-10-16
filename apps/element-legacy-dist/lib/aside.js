import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElAside",
  componentName: "ElAside",
  props: {
    width: {
      type: String,
      default: "300px"
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("aside", { staticClass: "el-aside", style: { width: _vm.width } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Aside = __component__.exports;
const _Aside = Aside;
_Aside.install = function install(Vue) {
  Vue.component(_Aside.name, _Aside);
};
export {
  _Aside as default
};
