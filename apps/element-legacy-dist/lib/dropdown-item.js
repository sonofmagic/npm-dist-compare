import { e as emitter } from "./emitter-4-51d8br.js";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElDropdownItem",
  mixins: [emitter],
  props: {
    command: {},
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },
  methods: {
    handleClick(e) {
      this.dispatch("ElDropdown", "menu-item-click", [this.command, this]);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { staticClass: "el-dropdown-menu__item", class: {
    "is-disabled": _vm.disabled,
    "el-dropdown-menu__item--divided": _vm.divided
  }, attrs: { "aria-disabled": _vm.disabled, "tabindex": _vm.disabled ? null : -1 }, on: { "click": _vm.handleClick } }, [_vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(), _vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElDropdownItem = __component__.exports;
const _ElDropdownItem = ElDropdownItem;
_ElDropdownItem.install = function install(Vue) {
  Vue.component(_ElDropdownItem.name, _ElDropdownItem);
};
export {
  _ElDropdownItem as default
};
