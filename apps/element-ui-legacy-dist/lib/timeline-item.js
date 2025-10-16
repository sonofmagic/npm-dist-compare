import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElTimelineItem",
  inject: ["timeline"],
  props: {
    timestamp: String,
    hideTimestamp: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: "bottom"
    },
    type: String,
    color: String,
    size: {
      type: String,
      default: "normal"
    },
    icon: String
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { staticClass: "el-timeline-item" }, [_c("div", { staticClass: "el-timeline-item__tail" }), !_vm.$slots.dot ? _c("div", { staticClass: "el-timeline-item__node", class: [
    `el-timeline-item__node--${_vm.size || ""}`,
    `el-timeline-item__node--${_vm.type || ""}`
  ], style: {
    backgroundColor: _vm.color
  } }, [_vm.icon ? _c("i", { staticClass: "el-timeline-item__icon", class: _vm.icon }) : _vm._e()]) : _vm._e(), _vm.$slots.dot ? _c("div", { staticClass: "el-timeline-item__dot" }, [_vm._t("dot")], 2) : _vm._e(), _c("div", { staticClass: "el-timeline-item__wrapper" }, [!_vm.hideTimestamp && _vm.placement === "top" ? _c("div", { staticClass: "el-timeline-item__timestamp is-top" }, [_vm._v(" " + _vm._s(_vm.timestamp) + " ")]) : _vm._e(), _c("div", { staticClass: "el-timeline-item__content" }, [_vm._t("default")], 2), !_vm.hideTimestamp && _vm.placement === "bottom" ? _c("div", { staticClass: "el-timeline-item__timestamp is-bottom" }, [_vm._v(" " + _vm._s(_vm.timestamp) + " ")]) : _vm._e()])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElTimelineItem = __component__.exports;
ElTimelineItem.install = function(Vue) {
  Vue.component(ElTimelineItem.name, ElTimelineItem);
};
export {
  ElTimelineItem as default
};
