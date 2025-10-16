import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElFooter",
  componentName: "ElFooter",
  props: {
    height: {
      type: String,
      default: "60px"
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("footer", { staticClass: "el-footer", style: { height: _vm.height } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Footer = __component__.exports;
const _Footer = Footer;
_Footer.install = function install(Vue) {
  Vue.component(_Footer.name, _Footer);
};
export {
  _Footer as default
};
