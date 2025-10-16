import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElLink",
  props: {
    type: {
      type: String,
      default: "default"
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    href: String,
    icon: String
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        if (!this.href) {
          this.$emit("click", event);
        }
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("a", _vm._b({ class: [
    "el-link",
    _vm.type ? `el-link--${_vm.type}` : "",
    _vm.disabled && "is-disabled",
    _vm.underline && !_vm.disabled && "is-underline"
  ], attrs: { "href": _vm.disabled ? null : _vm.href }, on: { "click": _vm.handleClick } }, "a", _vm.$attrs, false), [_vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(), _vm.$slots.default ? _c("span", { staticClass: "el-link--inner" }, [_vm._t("default")], 2) : _vm._e(), _vm.$slots.icon ? [_vm.$slots.icon ? _vm._t("icon") : _vm._e()] : _vm._e()], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Link = __component__.exports;
const _Link = Link;
_Link.install = function install(Vue) {
  Vue.component(_Link.name, _Link);
};
export {
  _Link as default
};
