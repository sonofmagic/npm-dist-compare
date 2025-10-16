"use strict";
const Popper = require("element-ui/lib/utils/vue-popper");
const Clickoutside = require("element-ui/lib/utils/clickoutside");
const Emitter = require("element-ui/lib/mixins/emitter");
const Locale = require("element-ui/lib/mixins/locale");
const Migrating = require("element-ui/lib/mixins/migrating");
const ElInput = require("element-ui/lib/input");
const ElTag = require("element-ui/lib/tag");
const ElScrollbar = require("element-ui/lib/scrollbar");
const ElCascaderPanel = require("element-ui/lib/cascader-panel");
const AriaUtils = require("element-ui/lib/utils/aria-utils");
const locale = require("element-ui/lib/locale");
const util = require("element-ui/lib/utils/util");
const types = require("element-ui/lib/utils/types");
const shared = require("element-ui/lib/utils/shared");
const resizeEvent = require("element-ui/lib/utils/resize-event");
const index = require("./index-Cf0anSwe.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const { keys: KeyCode } = AriaUtils;
const MigratingProps = {
  expandTrigger: {
    newProp: "expandTrigger",
    type: String
  },
  changeOnSelect: {
    newProp: "checkStrictly",
    type: Boolean
  },
  hoverThreshold: {
    newProp: "hoverThreshold",
    type: Number
  }
};
const PopperMixin = {
  props: {
    placement: {
      type: String,
      default: "bottom-start"
    },
    appendToBody: Popper.props.appendToBody,
    visibleArrow: {
      type: Boolean,
      default: true
    },
    arrowOffset: Popper.props.arrowOffset,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions,
    transformOrigin: Popper.props.transformOrigin
  },
  methods: Popper.methods,
  data: Popper.data,
  beforeDestroy: Popper.beforeDestroy
};
const InputSizeMap = {
  medium: 36,
  small: 32,
  mini: 28
};
const _sfc_main = {
  name: "ElCascader",
  directives: { Clickoutside },
  mixins: [PopperMixin, Emitter, Locale, Migrating],
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  components: {
    ElInput,
    ElTag,
    ElScrollbar,
    ElCascaderPanel
  },
  props: {
    value: {},
    options: Array,
    props: Object,
    size: String,
    placeholder: {
      type: String,
      default: () => locale.t("el.cascader.placeholder")
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: Function,
    separator: {
      type: String,
      default: " / "
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: () => (() => {
      })
    },
    popperClass: String
  },
  data() {
    return {
      dropDownVisible: false,
      checkedValue: this.value,
      inputHover: false,
      inputValue: null,
      presentText: null,
      presentTags: [],
      checkedNodes: [],
      filtering: false,
      suggestions: [],
      inputInitialHeight: 0,
      pressDeleteCount: 0
    };
  },
  computed: {
    realSize() {
      const _elFormItemSize = (this.elFormItem || {}).elFormItemSize;
      return this.size || _elFormItemSize || (this.$ELEMENT || {}).size;
    },
    tagSize() {
      return ["small", "mini"].indexOf(this.realSize) > -1 ? "mini" : "small";
    },
    isDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    config() {
      const config = this.props || {};
      const { $attrs } = this;
      Object.keys(MigratingProps).forEach((oldProp) => {
        const { newProp, type } = MigratingProps[oldProp];
        let oldValue = $attrs[oldProp] || $attrs[util.kebabCase(oldProp)];
        if (shared.isDef(oldProp) && !shared.isDef(config[newProp])) {
          if (type === Boolean && oldValue === "") {
            oldValue = true;
          }
          config[newProp] = oldValue;
        }
      });
      return config;
    },
    multiple() {
      return this.config.multiple;
    },
    leafOnly() {
      return !this.config.checkStrictly;
    },
    readonly() {
      return !this.filterable || this.multiple;
    },
    clearBtnVisible() {
      if (!this.clearable || this.isDisabled || this.filtering || !this.inputHover) {
        return false;
      }
      return this.multiple ? !!this.checkedNodes.filter((node) => !node.isDisabled).length : !!this.presentText;
    },
    panel() {
      return this.$refs.panel;
    }
  },
  watch: {
    disabled() {
      this.computePresentContent();
    },
    value(val) {
      if (!util.isEqual(val, this.checkedValue)) {
        this.checkedValue = val;
        this.computePresentContent();
      }
    },
    checkedValue(val) {
      const { value, dropDownVisible } = this;
      const { checkStrictly, multiple } = this.config;
      if (!util.isEqual(val, value) || types.isUndefined(value)) {
        this.computePresentContent();
        if (!multiple && !checkStrictly && dropDownVisible) {
          this.toggleDropDownVisible(false);
        }
        this.$emit("input", val);
        this.$emit("change", val);
        this.dispatch("ElFormItem", "el.form.change", [val]);
      }
    },
    options: {
      handler: function() {
        this.$nextTick(this.computePresentContent);
      },
      deep: true
    },
    presentText(val) {
      this.inputValue = val;
    },
    presentTags(val, oldVal) {
      if (this.multiple && (val.length || oldVal.length)) {
        this.$nextTick(this.updateStyle);
      }
    },
    filtering(val) {
      this.$nextTick(this.updatePopper);
    }
  },
  mounted() {
    const { input } = this.$refs;
    if (input && input.$el) {
      this.inputInitialHeight = input.$el.offsetHeight || InputSizeMap[this.realSize] || 40;
    }
    if (!this.isEmptyValue(this.value)) {
      this.computePresentContent();
    }
    this.filterHandler = index.debounce(this.debounce, () => {
      const { inputValue } = this;
      if (!inputValue) {
        this.filtering = false;
        return;
      }
      const before = this.beforeFilter(inputValue);
      if (before && before.then) {
        before.then(this.getSuggestions);
      } else if (before !== false) {
        this.getSuggestions();
      } else {
        this.filtering = false;
      }
    });
    resizeEvent.addResizeListener(this.$el, this.updateStyle);
  },
  beforeDestroy() {
    resizeEvent.removeResizeListener(this.$el, this.updateStyle);
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          "expand-trigger": "expand-trigger is removed, use `props.expandTrigger` instead.",
          "change-on-select": "change-on-select is removed, use `props.checkStrictly` instead.",
          "hover-threshold": "hover-threshold is removed, use `props.hoverThreshold` instead"
        },
        events: {
          "active-item-change": "active-item-change is renamed to expand-change"
        }
      };
    },
    toggleDropDownVisible(visible) {
      if (this.isDisabled) return;
      const { dropDownVisible } = this;
      const { input } = this.$refs;
      visible = shared.isDef(visible) ? visible : !dropDownVisible;
      if (visible !== dropDownVisible) {
        this.dropDownVisible = visible;
        if (visible) {
          this.$nextTick(() => {
            this.updatePopper();
            this.panel.scrollIntoView();
          });
        }
        input.$refs.input.setAttribute("aria-expanded", visible);
        this.$emit("visible-change", visible);
      }
    },
    handleDropdownLeave() {
      this.filtering = false;
      this.inputValue = this.presentText;
      this.doDestroy();
    },
    handleKeyDown(event) {
      switch (event.keyCode) {
        case KeyCode.enter:
          this.toggleDropDownVisible();
          break;
        case KeyCode.down:
          this.toggleDropDownVisible(true);
          this.focusFirstNode();
          event.preventDefault();
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.toggleDropDownVisible(false);
          break;
      }
    },
    handleFocus(e) {
      this.$emit("focus", e);
    },
    handleBlur(e) {
      this.$emit("blur", e);
    },
    handleInput(val, event) {
      !this.dropDownVisible && this.toggleDropDownVisible(true);
      if (event && event.isComposing) return;
      if (val) {
        this.filterHandler();
      } else {
        this.filtering = false;
      }
    },
    handleClear() {
      this.presentText = "";
      this.panel.clearCheckedNodes();
    },
    handleExpandChange(value) {
      this.$nextTick(this.updatePopper.bind(this));
      this.$emit("expand-change", value);
      this.$emit("active-item-change", value);
    },
    focusFirstNode() {
      this.$nextTick(() => {
        const { filtering } = this;
        const { popper, suggestionPanel } = this.$refs;
        let firstNode = null;
        if (filtering && suggestionPanel) {
          firstNode = suggestionPanel.$el.querySelector(".el-cascader__suggestion-item");
        } else {
          const firstMenu = popper.querySelector(".el-cascader-menu");
          firstNode = firstMenu.querySelector('.el-cascader-node[tabindex="-1"]');
        }
        if (firstNode) {
          firstNode.focus();
          !filtering && firstNode.click();
        }
      });
    },
    computePresentContent() {
      this.$nextTick(() => {
        if (this.config.multiple) {
          this.computePresentTags();
          this.presentText = this.presentTags.length ? " " : null;
        } else {
          this.computePresentText();
        }
      });
    },
    isEmptyValue(val) {
      const { multiple } = this;
      const { emitPath } = this.panel.config;
      if (multiple || emitPath) {
        return util.isEmpty(val);
      }
      return false;
    },
    computePresentText() {
      const { checkedValue, config } = this;
      if (!this.isEmptyValue(checkedValue)) {
        const node = this.panel.getNodeByValue(checkedValue);
        if (node && (config.checkStrictly || node.isLeaf)) {
          this.presentText = node.getText(this.showAllLevels, this.separator);
          return;
        }
      }
      this.presentText = null;
    },
    computePresentTags() {
      const { isDisabled, leafOnly, showAllLevels, separator, collapseTags } = this;
      const checkedNodes = this.getCheckedNodes(leafOnly);
      const tags = [];
      const genTag = (node) => ({
        node,
        key: node.uid,
        text: node.getText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled && !node.isDisabled
      });
      if (checkedNodes.length) {
        const [first, ...rest] = checkedNodes;
        const restCount = rest.length;
        tags.push(genTag(first));
        if (restCount) {
          if (collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false
            });
          } else {
            rest.forEach((node) => tags.push(genTag(node)));
          }
        }
      }
      this.checkedNodes = checkedNodes;
      this.presentTags = tags;
    },
    getSuggestions() {
      let { filterMethod } = this;
      if (!types.isFunction(filterMethod)) {
        filterMethod = (node, keyword) => node.text.includes(keyword);
      }
      const suggestions = this.panel.getFlattedNodes(this.leafOnly).filter((node) => {
        if (node.isDisabled) return false;
        node.text = node.getText(this.showAllLevels, this.separator) || "";
        return filterMethod(node, this.inputValue);
      });
      if (this.multiple) {
        this.presentTags.forEach((tag) => {
          tag.hitState = false;
        });
      } else {
        suggestions.forEach((node) => {
          node.checked = util.isEqual(this.checkedValue, node.getValueByOption());
        });
      }
      this.filtering = true;
      this.suggestions = suggestions;
      this.$nextTick(this.updatePopper);
    },
    handleSuggestionKeyDown(event) {
      const { keyCode, target } = event;
      switch (keyCode) {
        case KeyCode.enter:
          target.click();
          break;
        case KeyCode.up:
          const prev = target.previousElementSibling;
          prev && prev.focus();
          break;
        case KeyCode.down:
          const next = target.nextElementSibling;
          next && next.focus();
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.toggleDropDownVisible(false);
          break;
      }
    },
    handleDelete() {
      const { inputValue, pressDeleteCount, presentTags } = this;
      const lastIndex = presentTags.length - 1;
      const lastTag = presentTags[lastIndex];
      this.pressDeleteCount = inputValue ? 0 : pressDeleteCount + 1;
      if (!lastTag) return;
      if (this.pressDeleteCount) {
        if (lastTag.hitState) {
          this.deleteTag(lastTag);
        } else {
          lastTag.hitState = true;
        }
      }
    },
    handleSuggestionClick(index2) {
      const { multiple } = this;
      const targetNode = this.suggestions[index2];
      if (multiple) {
        const { checked } = targetNode;
        targetNode.doCheck(!checked);
        this.panel.calculateMultiCheckedValue();
      } else {
        this.checkedValue = targetNode.getValueByOption();
        this.toggleDropDownVisible(false);
      }
    },
    deleteTag(tag) {
      const { checkedValue } = this;
      const current = tag.node.getValueByOption();
      const val = checkedValue.find((n) => util.isEqual(n, current));
      this.checkedValue = checkedValue.filter((n) => !util.isEqual(n, current));
      this.$emit("remove-tag", val);
    },
    updateStyle() {
      const { $el, inputInitialHeight } = this;
      if (this.$isServer || !$el) return;
      const { suggestionPanel } = this.$refs;
      const inputInner = $el.querySelector(".el-input__inner");
      if (!inputInner) return;
      const tags = $el.querySelector(".el-cascader__tags");
      let suggestionPanelEl = null;
      if (suggestionPanel && (suggestionPanelEl = suggestionPanel.$el)) {
        const suggestionList = suggestionPanelEl.querySelector(".el-cascader__suggestion-list");
        suggestionList.style.minWidth = inputInner.offsetWidth + "px";
      }
      if (tags) {
        const offsetHeight = Math.round(tags.getBoundingClientRect().height);
        const height = Math.max(offsetHeight + 6, inputInitialHeight) + "px";
        inputInner.style.height = height;
        if (this.dropDownVisible) {
          this.updatePopper();
        }
      }
    },
    /**
     * public methods
    */
    getCheckedNodes(leafOnly) {
      return this.panel.getCheckedNodes(leafOnly);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: (() => _vm.toggleDropDownVisible(false)), expression: "() => toggleDropDownVisible(false)" }], ref: "reference", class: [
    "el-cascader",
    _vm.realSize && `el-cascader--${_vm.realSize}`,
    { "is-disabled": _vm.isDisabled }
  ], on: { "mouseenter": function($event) {
    _vm.inputHover = true;
  }, "mouseleave": function($event) {
    _vm.inputHover = false;
  }, "click": () => _vm.toggleDropDownVisible(_vm.readonly ? void 0 : true), "keydown": _vm.handleKeyDown } }, [_c("el-input", { ref: "input", class: { "is-focus": _vm.dropDownVisible }, attrs: { "size": _vm.realSize, "placeholder": _vm.placeholder, "readonly": _vm.readonly, "disabled": _vm.isDisabled, "validate-event": false }, on: { "focus": _vm.handleFocus, "blur": _vm.handleBlur, "input": _vm.handleInput }, model: { value: _vm.multiple ? _vm.presentText : _vm.inputValue, callback: function($$v) {
    _vm.multiple ? _vm.presentText : _vm.inputValue = $$v;
  }, expression: "multiple ? presentText : inputValue" } }, [_c("template", { slot: "suffix" }, [_vm.clearBtnVisible ? _c("i", { key: "clear", staticClass: "el-input__icon el-icon-circle-close", on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.handleClear.apply(null, arguments);
  } } }) : _c("i", { key: "arrow-down", class: [
    "el-input__icon",
    "el-icon-arrow-down",
    _vm.dropDownVisible && "is-reverse"
  ], on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.toggleDropDownVisible();
  } } })])], 2), _vm.multiple ? _c("div", { staticClass: "el-cascader__tags" }, [_vm._l(_vm.presentTags, function(tag) {
    return _c("el-tag", { key: tag.key, attrs: { "type": "info", "size": _vm.tagSize, "hit": tag.hitState, "closable": tag.closable, "disable-transitions": "" }, on: { "close": function($event) {
      return _vm.deleteTag(tag);
    } } }, [_c("span", [_vm._v(_vm._s(tag.text))])]);
  }), _vm.filterable && !_vm.isDisabled ? _c("input", { directives: [{ name: "model", rawName: "v-model.trim", value: _vm.inputValue, expression: "inputValue", modifiers: { "trim": true } }], staticClass: "el-cascader__search-input", attrs: { "type": "text", "placeholder": _vm.presentTags.length ? "" : _vm.placeholder }, domProps: { "value": _vm.inputValue }, on: { "input": [function($event) {
    if ($event.target.composing) return;
    _vm.inputValue = $event.target.value.trim();
  }, (e) => _vm.handleInput(_vm.inputValue, e)], "click": function($event) {
    $event.stopPropagation();
    return _vm.toggleDropDownVisible(true);
  }, "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete", "Del"])) return null;
    return _vm.handleDelete.apply(null, arguments);
  }, "blur": function($event) {
    return _vm.$forceUpdate();
  } } }) : _vm._e()], 2) : _vm._e(), _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": _vm.handleDropdownLeave } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.dropDownVisible, expression: "dropDownVisible" }], ref: "popper", class: ["el-popper", "el-cascader__dropdown", _vm.popperClass] }, [_c("el-cascader-panel", { directives: [{ name: "show", rawName: "v-show", value: !_vm.filtering, expression: "!filtering" }], ref: "panel", attrs: { "options": _vm.options, "props": _vm.config, "border": false, "render-label": _vm.$scopedSlots.default }, on: { "expand-change": _vm.handleExpandChange, "close": function($event) {
    return _vm.toggleDropDownVisible(false);
  } }, model: { value: _vm.checkedValue, callback: function($$v) {
    _vm.checkedValue = $$v;
  }, expression: "checkedValue" } }), _vm.filterable ? _c("el-scrollbar", { directives: [{ name: "show", rawName: "v-show", value: _vm.filtering, expression: "filtering" }], ref: "suggestionPanel", staticClass: "el-cascader__suggestion-panel", attrs: { "tag": "ul", "view-class": "el-cascader__suggestion-list" }, nativeOn: { "keydown": function($event) {
    return _vm.handleSuggestionKeyDown.apply(null, arguments);
  } } }, [_vm.suggestions.length ? _vm._l(_vm.suggestions, function(item, index2) {
    return _c("li", { key: item.uid, class: [
      "el-cascader__suggestion-item",
      item.checked && "is-checked"
    ], attrs: { "tabindex": -1 }, on: { "click": function($event) {
      return _vm.handleSuggestionClick(index2);
    } } }, [_c("span", [_vm._v(_vm._s(item.text))]), item.checked ? _c("i", { staticClass: "el-icon-check" }) : _vm._e()]);
  }) : _vm._t("empty", function() {
    return [_c("li", { staticClass: "el-cascader__empty-text" }, [_vm._v(_vm._s(_vm.t("el.cascader.noMatch")))])];
  })], 2) : _vm._e()], 1)])], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Cascader = __component__.exports;
Cascader.install = function(Vue) {
  Vue.component(Cascader.name, Cascader);
};
module.exports = Cascader;
