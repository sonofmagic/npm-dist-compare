import { M as Menu } from "./menu-mixin-byMELnsR.js";
import ElTooltip from "element-ui/lib/tooltip";
import { e as emitter } from "./emitter-4-51d8br.js";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElMenuItem",
  componentName: "ElMenuItem",
  mixins: [Menu, emitter],
  components: { ElTooltip },
  props: {
    index: {
      default: null,
      validator: (val) => typeof val === "string" || val === null
    },
    route: [String, Object],
    disabled: Boolean
  },
  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex;
    },
    hoverBackground() {
      return this.rootMenu.hoverBackground;
    },
    backgroundColor() {
      return this.rootMenu.backgroundColor || "";
    },
    activeTextColor() {
      return this.rootMenu.activeTextColor || "";
    },
    textColor() {
      return this.rootMenu.textColor || "";
    },
    mode() {
      return this.rootMenu.mode;
    },
    itemStyle() {
      const style = {
        color: this.active ? this.activeTextColor : this.textColor
      };
      if (this.mode === "horizontal" && !this.isNested) {
        style.borderBottomColor = this.active ? this.rootMenu.activeTextColor ? this.activeTextColor : "" : "transparent";
      }
      return style;
    },
    isNested() {
      return this.parentMenu !== this.rootMenu;
    }
  },
  methods: {
    onMouseEnter() {
      if (this.mode === "horizontal" && !this.rootMenu.backgroundColor) return;
      this.$el.style.backgroundColor = this.hoverBackground;
    },
    onMouseLeave() {
      if (this.mode === "horizontal" && !this.rootMenu.backgroundColor) return;
      this.$el.style.backgroundColor = this.backgroundColor;
    },
    handleClick() {
      if (!this.disabled) {
        this.dispatch("ElMenu", "item-click", this);
        this.$emit("click", this);
      }
    }
  },
  mounted() {
    this.parentMenu.addItem(this);
    this.rootMenu.addItem(this);
  },
  beforeDestroy() {
    this.parentMenu.removeItem(this);
    this.rootMenu.removeItem(this);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { staticClass: "el-menu-item", class: {
    "is-active": _vm.active,
    "is-disabled": _vm.disabled
  }, style: [_vm.paddingStyle, _vm.itemStyle, { backgroundColor: _vm.backgroundColor }], attrs: { "role": "menuitem", "tabindex": "-1" }, on: { "click": _vm.handleClick, "mouseenter": _vm.onMouseEnter, "focus": _vm.onMouseEnter, "blur": _vm.onMouseLeave, "mouseleave": _vm.onMouseLeave } }, [_vm.parentMenu.$options.componentName === "ElMenu" && _vm.rootMenu.collapse && _vm.$slots.title ? _c("el-tooltip", { attrs: { "effect": "dark", "placement": "right" } }, [_c("div", { attrs: { "slot": "content" }, slot: "content" }, [_vm._t("title")], 2), _c("div", { staticStyle: { "position": "absolute", "left": "0", "top": "0", "height": "100%", "width": "100%", "display": "inline-block", "box-sizing": "border-box", "padding": "0 20px" } }, [_vm._t("default")], 2)]) : [_vm._t("default"), _vm._t("title")]], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElMenuItem = __component__.exports;
const _ElMenuItem = ElMenuItem;
_ElMenuItem.install = function install(Vue) {
  Vue.component(_ElMenuItem.name, _ElMenuItem);
};
export {
  _ElMenuItem as default
};
