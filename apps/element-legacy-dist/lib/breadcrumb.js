import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElBreadcrumb",
  props: {
    separator: {
      type: String,
      default: "/"
    },
    separatorClass: {
      type: String,
      default: ""
    }
  },
  provide() {
    return {
      elBreadcrumb: this
    };
  },
  mounted() {
    const items = this.$el.querySelectorAll(".el-breadcrumb__item");
    if (items.length) {
      items[items.length - 1].setAttribute("aria-current", "page");
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-breadcrumb", attrs: { "aria-label": "Breadcrumb", "role": "navigation" } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElBreadcrumb = __component__.exports;
const _Breadcrumb = ElBreadcrumb;
_Breadcrumb.install = function install(Vue) {
  Vue.component(_Breadcrumb.name, _Breadcrumb);
};
export {
  _Breadcrumb as default
};
