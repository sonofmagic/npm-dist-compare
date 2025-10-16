"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElCollapse",
  componentName: "ElCollapse",
  props: {
    accordion: Boolean,
    value: {
      type: [Array, String, Number],
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      activeNames: [].concat(this.value)
    };
  },
  provide() {
    return {
      collapse: this
    };
  },
  watch: {
    value(value) {
      this.activeNames = [].concat(value);
    }
  },
  methods: {
    setActiveNames(activeNames) {
      activeNames = [].concat(activeNames);
      let value = this.accordion ? activeNames[0] : activeNames;
      this.activeNames = activeNames;
      this.$emit("input", value);
      this.$emit("change", value);
    },
    handleItemClick(item) {
      if (this.accordion) {
        this.setActiveNames(
          (this.activeNames[0] || this.activeNames[0] === 0) && this.activeNames[0] === item.name ? "" : item.name
        );
      } else {
        let activeNames = this.activeNames.slice(0);
        let index = activeNames.indexOf(item.name);
        if (index > -1) {
          activeNames.splice(index, 1);
        } else {
          activeNames.push(item.name);
        }
        this.setActiveNames(activeNames);
      }
    }
  },
  created() {
    this.$on("item-click", this.handleItemClick);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-collapse", attrs: { "role": "tablist", "aria-multiselectable": "true" } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElCollapse = __component__.exports;
const _Collapse = ElCollapse;
_Collapse.install = function install(Vue) {
  Vue.component(_Collapse.name, _Collapse);
};
module.exports = _Collapse;
