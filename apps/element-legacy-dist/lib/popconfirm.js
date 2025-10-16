import ElPopover from "element-ui/lib/popover";
import ElButton from "element-ui/lib/button";
import { t } from "element-ui/lib/locale";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElPopconfirm",
  props: {
    title: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    },
    confirmButtonType: {
      type: String,
      default: "primary"
    },
    cancelButtonType: {
      type: String,
      default: "text"
    },
    icon: {
      type: String,
      default: "el-icon-question"
    },
    iconColor: {
      type: String,
      default: "#f90"
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElPopover,
    ElButton
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    displayConfirmButtonText() {
      return this.confirmButtonText || t("el.popconfirm.confirmButtonText");
    },
    displayCancelButtonText() {
      return this.cancelButtonText || t("el.popconfirm.cancelButtonText");
    }
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit("confirm");
    },
    cancel() {
      this.visible = false;
      this.$emit("cancel");
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("el-popover", _vm._b({ attrs: { "trigger": "click" }, model: { value: _vm.visible, callback: function($$v) {
    _vm.visible = $$v;
  }, expression: "visible" } }, "el-popover", _vm.$attrs, false), [_c("div", { staticClass: "el-popconfirm" }, [_c("p", { staticClass: "el-popconfirm__main" }, [!_vm.hideIcon ? _c("i", { staticClass: "el-popconfirm__icon", class: _vm.icon, style: { color: _vm.iconColor } }) : _vm._e(), _vm._v(" " + _vm._s(_vm.title) + " ")]), _c("div", { staticClass: "el-popconfirm__action" }, [_c("el-button", { attrs: { "size": "mini", "type": _vm.cancelButtonType }, on: { "click": _vm.cancel } }, [_vm._v(" " + _vm._s(_vm.displayCancelButtonText) + " ")]), _c("el-button", { attrs: { "size": "mini", "type": _vm.confirmButtonType }, on: { "click": _vm.confirm } }, [_vm._v(" " + _vm._s(_vm.displayConfirmButtonText) + " ")])], 1)]), _vm._t("reference", null, { "slot": "reference" })], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Popconfirm = __component__.exports;
const _Popconfirm = Popconfirm;
_Popconfirm.install = function install(Vue) {
  Vue.component(_Popconfirm.name, _Popconfirm);
};
export {
  _Popconfirm as default
};
