"use strict";
const Popper = require("element-ui/lib/utils/vue-popper");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElDropdownMenu",
  componentName: "ElDropdownMenu",
  mixins: [Popper],
  props: {
    visibleArrow: {
      type: Boolean,
      default: true
    },
    arrowOffset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      size: this.dropdown.dropdownSize
    };
  },
  inject: ["dropdown"],
  created() {
    this.$on("updatePopper", () => {
      if (this.showPopper) this.updatePopper();
    });
    this.$on("visible", (val) => {
      this.showPopper = val;
    });
  },
  mounted() {
    this.dropdown.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.dropdown.$el;
    this.dropdown.initDomOperation();
  },
  watch: {
    "dropdown.placement": {
      immediate: true,
      handler(val) {
        this.currentPlacement = val;
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": _vm.doDestroy } }, [_c("ul", { directives: [{ name: "show", rawName: "v-show", value: _vm.showPopper, expression: "showPopper" }], staticClass: "el-dropdown-menu el-popper", class: [_vm.size && `el-dropdown-menu--${_vm.size}`] }, [_vm._t("default")], 2)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElDropdownMenu = __component__.exports;
ElDropdownMenu.install = function(Vue) {
  Vue.component(ElDropdownMenu.name, ElDropdownMenu);
};
module.exports = ElDropdownMenu;
