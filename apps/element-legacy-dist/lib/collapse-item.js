import { C as CollapseTransition } from "./collapse-transition-Bb8-smf9.js";
import { e as emitter } from "./emitter-4-51d8br.js";
import { g as generateId } from "./util-_v-3H2Ts.js";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElCollapseItem",
  componentName: "ElCollapseItem",
  mixins: [emitter],
  components: { ElCollapseTransition: CollapseTransition },
  data() {
    return {
      contentWrapStyle: {
        height: "auto",
        display: "block"
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
      id: generateId()
    };
  },
  inject: ["collapse"],
  props: {
    title: String,
    name: {
      type: [String, Number],
      default() {
        return this._uid;
      }
    },
    disabled: Boolean
  },
  computed: {
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) > -1;
    }
  },
  methods: {
    handleFocus() {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true;
        } else {
          this.isClick = false;
        }
      }, 50);
    },
    handleHeaderClick() {
      if (this.disabled) return;
      this.dispatch("ElCollapse", "item-click", this);
      this.focusing = false;
      this.isClick = true;
    },
    handleEnterClick() {
      this.dispatch("ElCollapse", "item-click", this);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-collapse-item", class: { "is-active": _vm.isActive, "is-disabled": _vm.disabled } }, [_c("div", { attrs: { "role": "tab", "aria-expanded": _vm.isActive, "aria-controls": `el-collapse-content-${_vm.id}`, "aria-describedby": `el-collapse-content-${_vm.id}` } }, [_c("div", { staticClass: "el-collapse-item__header", class: {
    "focusing": _vm.focusing,
    "is-active": _vm.isActive
  }, attrs: { "role": "button", "id": `el-collapse-head-${_vm.id}`, "tabindex": _vm.disabled ? void 0 : 0 }, on: { "click": _vm.handleHeaderClick, "keyup": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"]) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    $event.stopPropagation();
    return _vm.handleEnterClick.apply(null, arguments);
  }, "focus": _vm.handleFocus, "blur": function($event) {
    _vm.focusing = false;
  } } }, [_vm._t("title", function() {
    return [_vm._v(_vm._s(_vm.title))];
  }), _c("i", { staticClass: "el-collapse-item__arrow el-icon-arrow-right", class: { "is-active": _vm.isActive } })], 2)]), _c("el-collapse-transition", [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.isActive, expression: "isActive" }], staticClass: "el-collapse-item__wrap", attrs: { "role": "tabpanel", "aria-hidden": !_vm.isActive, "aria-labelledby": `el-collapse-head-${_vm.id}`, "id": `el-collapse-content-${_vm.id}` } }, [_c("div", { staticClass: "el-collapse-item__content" }, [_vm._t("default")], 2)])])], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElCollapseItem = __component__.exports;
const _CollapseItem = ElCollapseItem;
_CollapseItem.install = function install(Vue) {
  Vue.component(_CollapseItem.name, _CollapseItem);
};
export {
  _CollapseItem as default
};
