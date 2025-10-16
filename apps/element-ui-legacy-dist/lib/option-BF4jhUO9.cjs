"use strict";
const Emitter = require("element-ui/lib/mixins/emitter");
const util = require("element-ui/lib/utils/util");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  mixins: [Emitter],
  name: "ElOption",
  componentName: "ElOption",
  inject: ["select"],
  props: {
    value: {
      required: true
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    };
  },
  computed: {
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === "[object object]";
    },
    currentLabel() {
      return this.label || (this.isObject ? "" : this.value);
    },
    currentValue() {
      return this.value || this.label || "";
    },
    itemSelected() {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value);
      } else {
        return this.contains(this.select.value, this.value);
      }
    },
    limitReached() {
      if (this.select.multiple) {
        return !this.itemSelected && (this.select.value || []).length >= this.select.multipleLimit && this.select.multipleLimit > 0;
      } else {
        return false;
      }
    }
  },
  watch: {
    currentLabel() {
      if (!this.created && !this.select.remote) this.dispatch("ElSelect", "setSelected");
    },
    value(val, oldVal) {
      const { remote, valueKey } = this.select;
      if (!this.created && !remote) {
        if (valueKey && typeof val === "object" && typeof oldVal === "object" && val[valueKey] === oldVal[valueKey]) {
          return;
        }
        this.dispatch("ElSelect", "setSelected");
      }
    }
  },
  methods: {
    isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        const valueKey = this.select.valueKey;
        return util.getValueByPath(a, valueKey) === util.getValueByPath(b, valueKey);
      }
    },
    contains(arr = [], target) {
      if (!this.isObject) {
        return arr && arr.indexOf(target) > -1;
      } else {
        const valueKey = this.select.valueKey;
        return arr && arr.some((item) => {
          return util.getValueByPath(item, valueKey) === util.getValueByPath(target, valueKey);
        });
      }
    },
    handleGroupDisabled(val) {
      this.groupDisabled = val;
    },
    hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },
    selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch("ElSelect", "handleOptionClick", [this, true]);
      }
    },
    queryChange(query) {
      this.visible = new RegExp(util.escapeRegexpString(query), "i").test(this.currentLabel) || this.created;
      if (!this.visible) {
        this.select.filteredOptionsCount--;
      }
    }
  },
  created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount++;
    this.select.filteredOptionsCount++;
    this.$on("queryChange", this.queryChange);
    this.$on("handleGroupDisabled", this.handleGroupDisabled);
  },
  beforeDestroy() {
    const { selected, multiple } = this.select;
    let selectedOptions = multiple ? selected : [selected];
    let index = this.select.cachedOptions.indexOf(this);
    let selectedIndex = selectedOptions.indexOf(this);
    if (index > -1 && selectedIndex < 0) {
      this.select.cachedOptions.splice(index, 1);
    }
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-select-dropdown__item", class: {
    "selected": _vm.itemSelected,
    "is-disabled": _vm.disabled || _vm.groupDisabled || _vm.limitReached,
    "hover": _vm.hover
  }, on: { "mouseenter": _vm.hoverItem, "click": function($event) {
    $event.stopPropagation();
    return _vm.selectOptionClick.apply(null, arguments);
  } } }, [_vm._t("default", function() {
    return [_c("span", [_vm._v(_vm._s(_vm.currentLabel))])];
  })], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElOption = __component__.exports;
exports.ElOption = ElOption;
