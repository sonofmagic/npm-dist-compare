"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElDivider",
  props: {
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].indexOf(val) !== -1;
      }
    },
    contentPosition: {
      type: String,
      default: "center",
      validator(val) {
        return ["left", "center", "right"].indexOf(val) !== -1;
      }
    }
  }
};
var _sfc_render = function render(_c, _vm) {
  return _c("div", _vm._g(_vm._b({ class: [_vm.data.staticClass, "el-divider", `el-divider--${_vm.props.direction}`] }, "div", _vm.data.attrs, false), _vm.listeners), [_vm.slots().default && _vm.props.direction !== "vertical" ? _c("div", { class: ["el-divider__text", `is-${_vm.props.contentPosition}`] }, [_vm._t("default")], 2) : _vm._e()]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  true
);
const Divider = __component__.exports;
Divider.install = function(Vue) {
  Vue.component(Divider.name, Divider);
};
module.exports = Divider;
