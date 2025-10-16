import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElSpinner",
  props: {
    type: String,
    radius: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    strokeColor: {
      type: String,
      default: "#efefef"
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", { staticClass: "el-spinner" }, [_c("svg", { staticClass: "el-spinner-inner", style: { width: _vm.radius / 2 + "px", height: _vm.radius / 2 + "px" }, attrs: { "viewBox": "0 0 50 50" } }, [_c("circle", { staticClass: "path", attrs: { "cx": "25", "cy": "25", "r": "20", "fill": "none", "stroke": _vm.strokeColor, "stroke-width": _vm.strokeWidth } })])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Spinner = __component__.exports;
Spinner.install = function(Vue) {
  Vue.component(Spinner.name, Spinner);
};
export {
  Spinner as default
};
