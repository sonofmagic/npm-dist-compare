"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const TYPE_CLASSES_MAP = {
  "success": "el-icon-success",
  "warning": "el-icon-warning",
  "error": "el-icon-error"
};
const _sfc_main = {
  name: "ElAlert",
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ""
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: "light",
      validator: function(value) {
        return ["light", "dark"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    }
  },
  computed: {
    typeClass() {
      return `el-alert--${this.type}`;
    },
    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || "el-icon-info";
    },
    isBigIcon() {
      return this.description || this.$slots.default ? "is-big" : "";
    },
    isBoldTitle() {
      return this.description || this.$slots.default ? "is-bold" : "";
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-alert-fade" } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-alert", class: [_vm.typeClass, _vm.center ? "is-center" : "", "is-" + _vm.effect], attrs: { "role": "alert" } }, [_vm.showIcon ? _c("i", { staticClass: "el-alert__icon", class: [_vm.iconClass, _vm.isBigIcon] }) : _vm._e(), _c("div", { staticClass: "el-alert__content" }, [_vm.title || _vm.$slots.title ? _c("span", { staticClass: "el-alert__title", class: [_vm.isBoldTitle] }, [_vm._t("title", function() {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2) : _vm._e(), _vm.$slots.default && !_vm.description ? _c("p", { staticClass: "el-alert__description" }, [_vm._t("default")], 2) : _vm._e(), _vm.description && !_vm.$slots.default ? _c("p", { staticClass: "el-alert__description" }, [_vm._v(_vm._s(_vm.description))]) : _vm._e(), _c("i", { directives: [{ name: "show", rawName: "v-show", value: _vm.closable, expression: "closable" }], staticClass: "el-alert__closebtn", class: { "is-customed": _vm.closeText !== "", "el-icon-close": _vm.closeText === "" }, on: { "click": function($event) {
    return _vm.close();
  } } }, [_vm._v(_vm._s(_vm.closeText))])])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Alert = __component__.exports;
const _Alert = Alert;
_Alert.install = function install(Vue) {
  Vue.component(_Alert.name, _Alert);
};
module.exports = _Alert;
