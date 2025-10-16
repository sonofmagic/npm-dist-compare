"use strict";
const index = require("./index-Cf0anSwe.cjs");
const ElInput = require("element-ui/lib/input");
const clickoutside = require("./clickoutside-BWqUe94D.cjs");
const vuePopper = require("./vue-popper-CQ9w6kyf.cjs");
const emitter = require("./emitter-CM7bVwl7.cjs");
const ElScrollbar = require("element-ui/lib/scrollbar");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const migrating = require("./migrating-BMLifAiB.cjs");
const util = require("./util-KJN0EjuU.cjs");
const focus = require("./focus-DSjBV76O.cjs");
const _sfc_main$1 = {
  components: { ElScrollbar },
  mixins: [vuePopper.Popper, emitter.emitter],
  componentName: "ElAutocompleteSuggestions",
  data() {
    return {
      parent: this.$parent,
      dropdownWidth: ""
    };
  },
  props: {
    options: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    id: String
  },
  methods: {
    select(item) {
      this.dispatch("ElAutocomplete", "item-click", item);
    }
  },
  updated() {
    this.$nextTick((_) => {
      this.popperJS && this.updatePopper();
    });
  },
  mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
    this.referenceList = this.$el.querySelector(".el-autocomplete-suggestion__list");
    this.referenceList.setAttribute("role", "listbox");
    this.referenceList.setAttribute("id", this.id);
  },
  created() {
    this.$on("visible", (val, inputWidth) => {
      this.dropdownWidth = inputWidth + "px";
      this.showPopper = val;
    });
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": _vm.doDestroy } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.showPopper, expression: "showPopper" }], staticClass: "el-autocomplete-suggestion el-popper", class: { "is-loading": !_vm.parent.hideLoading && _vm.parent.loading }, style: { width: _vm.dropdownWidth }, attrs: { "role": "region" } }, [_c("el-scrollbar", { attrs: { "tag": "ul", "wrap-class": "el-autocomplete-suggestion__wrap", "view-class": "el-autocomplete-suggestion__list" } }, [!_vm.parent.hideLoading && _vm.parent.loading ? _c("li", [_c("i", { staticClass: "el-icon-loading" })]) : _vm._t("default")], 2)], 1)]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const ElAutocompleteSuggestions = __component__$1.exports;
const _sfc_main = {
  name: "ElAutocomplete",
  mixins: [emitter.emitter, focus.Focus("input"), migrating.Migrating],
  inheritAttrs: false,
  componentName: "ElAutocomplete",
  components: {
    ElInput,
    ElAutocompleteSuggestions
  },
  directives: { Clickoutside: clickoutside.Clickoutside },
  props: {
    valueKey: {
      type: String,
      default: "value"
    },
    popperClass: String,
    popperOptions: Object,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    name: String,
    size: String,
    value: String,
    maxlength: Number,
    minlength: Number,
    autofocus: Boolean,
    fetchSuggestions: Function,
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    customItem: String,
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String,
    label: String,
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      default: "bottom-start"
    },
    hideLoading: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlightFirstItem: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activated: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1,
      suggestionDisabled: false
    };
  },
  computed: {
    suggestionVisible() {
      const suggestions = this.suggestions;
      let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
      return (isValidData || this.loading) && this.activated;
    },
    id() {
      return `el-autocomplete-${util.generateId()}`;
    }
  },
  watch: {
    suggestionVisible(val) {
      let $input = this.getInput();
      if ($input) {
        this.broadcast("ElAutocompleteSuggestions", "visible", [val, $input.offsetWidth]);
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          "custom-item": "custom-item is removed, use scoped slot instead.",
          "props": "props is removed, use value-key instead."
        }
      };
    },
    getData(queryString) {
      if (this.suggestionDisabled) {
        return;
      }
      this.loading = true;
      this.fetchSuggestions(queryString, (suggestions) => {
        this.loading = false;
        if (this.suggestionDisabled) {
          return;
        }
        if (Array.isArray(suggestions)) {
          this.suggestions = suggestions;
          this.highlightedIndex = this.highlightFirstItem ? 0 : -1;
        } else {
          console.error("[Element Error][Autocomplete]autocomplete suggestions must be an array");
        }
      });
    },
    handleInput(value) {
      this.$emit("input", value);
      this.suggestionDisabled = false;
      if (!this.triggerOnFocus && !value) {
        this.suggestionDisabled = true;
        this.suggestions = [];
        return;
      }
      this.debouncedGetData(value);
    },
    handleChange(value) {
      this.$emit("change", value);
    },
    handleFocus(event) {
      this.activated = true;
      this.$emit("focus", event);
      if (this.triggerOnFocus) {
        this.debouncedGetData(this.value);
      }
    },
    handleBlur(event) {
      this.$emit("blur", event);
    },
    handleClear() {
      this.activated = false;
      this.$emit("clear");
    },
    close(e) {
      this.activated = false;
    },
    handleKeyEnter(e) {
      if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
        e.preventDefault();
        this.select(this.suggestions[this.highlightedIndex]);
      } else if (this.selectWhenUnmatched) {
        this.$emit("select", { value: this.value });
        this.$nextTick((_) => {
          this.suggestions = [];
          this.highlightedIndex = -1;
        });
      }
    },
    select(item) {
      this.$emit("input", item[this.valueKey]);
      this.$emit("select", item);
      this.$nextTick((_) => {
        this.suggestions = [];
        this.highlightedIndex = -1;
      });
    },
    highlight(index2) {
      if (!this.suggestionVisible || this.loading) {
        return;
      }
      if (index2 < 0) {
        this.highlightedIndex = -1;
        return;
      }
      if (index2 >= this.suggestions.length) {
        index2 = this.suggestions.length - 1;
      }
      const suggestion = this.$refs.suggestions.$el.querySelector(".el-autocomplete-suggestion__wrap");
      const suggestionList = suggestion.querySelectorAll(".el-autocomplete-suggestion__list li");
      let highlightItem = suggestionList[index2];
      let scrollTop = suggestion.scrollTop;
      let offsetTop = highlightItem.offsetTop;
      if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += highlightItem.scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= highlightItem.scrollHeight;
      }
      this.highlightedIndex = index2;
      let $input = this.getInput();
      $input.setAttribute("aria-activedescendant", `${this.id}-item-${this.highlightedIndex}`);
    },
    getInput() {
      return this.$refs.input.getInput();
    }
  },
  mounted() {
    this.debouncedGetData = index.debounce(this.debounce, this.getData);
    this.$on("item-click", (item) => {
      this.select(item);
    });
    let $input = this.getInput();
    $input.setAttribute("role", "textbox");
    $input.setAttribute("aria-autocomplete", "list");
    $input.setAttribute("aria-controls", "id");
    $input.setAttribute("aria-activedescendant", `${this.id}-item-${this.highlightedIndex}`);
  },
  beforeDestroy() {
    this.$refs.suggestions.$destroy();
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.close, expression: "close" }], staticClass: "el-autocomplete", attrs: { "aria-haspopup": "listbox", "role": "combobox", "aria-expanded": _vm.suggestionVisible, "aria-owns": _vm.id } }, [_c("el-input", _vm._b({ ref: "input", on: { "input": _vm.handleInput, "change": _vm.handleChange, "focus": _vm.handleFocus, "blur": _vm.handleBlur, "clear": _vm.handleClear }, nativeOn: { "keydown": [function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) return null;
    $event.preventDefault();
    return _vm.highlight(_vm.highlightedIndex - 1);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) return null;
    $event.preventDefault();
    return _vm.highlight(_vm.highlightedIndex + 1);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleKeyEnter.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) return null;
    return _vm.close.apply(null, arguments);
  }] } }, "el-input", [_vm.$props, _vm.$attrs], false), [_vm.$slots.prepend ? _c("template", { slot: "prepend" }, [_vm._t("prepend")], 2) : _vm._e(), _vm.$slots.append ? _c("template", { slot: "append" }, [_vm._t("append")], 2) : _vm._e(), _vm.$slots.prefix ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2) : _vm._e(), _vm.$slots.suffix ? _c("template", { slot: "suffix" }, [_vm._t("suffix")], 2) : _vm._e()], 2), _c("el-autocomplete-suggestions", { ref: "suggestions", class: [_vm.popperClass ? _vm.popperClass : ""], attrs: { "visible-arrow": "", "popper-options": _vm.popperOptions, "append-to-body": _vm.popperAppendToBody, "placement": _vm.placement, "id": _vm.id } }, _vm._l(_vm.suggestions, function(item, index2) {
    return _c("li", { key: index2, class: { "highlighted": _vm.highlightedIndex === index2 }, attrs: { "id": `${_vm.id}-item-${index2}`, "role": "option", "aria-selected": _vm.highlightedIndex === index2 }, on: { "click": function($event) {
      return _vm.select(item);
    } } }, [_vm._t("default", function() {
      return [_vm._v(" " + _vm._s(item[_vm.valueKey]) + " ")];
    }, { "item": item })], 2);
  }), 0)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElAutocomplete = __component__.exports;
const _Autocomplete = ElAutocomplete;
_Autocomplete.install = function install(Vue) {
  Vue.component(_Autocomplete.name, _Autocomplete);
};
module.exports = _Autocomplete;
