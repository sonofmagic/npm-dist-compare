"use strict";
const Emitter = require("element-ui/lib/mixins/emitter");
const Focus = require("element-ui/lib/mixins/focus");
const Locale = require("element-ui/lib/mixins/locale");
const ElInput = require("element-ui/lib/input");
const Popper = require("element-ui/lib/utils/vue-popper");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const option = require("./option-BF4jhUO9.cjs");
const ElTag = require("element-ui/lib/tag");
const ElScrollbar = require("element-ui/lib/scrollbar");
const index = require("./index-Cf0anSwe.cjs");
const Clickoutside = require("element-ui/lib/utils/clickoutside");
const resizeEvent = require("element-ui/lib/utils/resize-event");
const scrollIntoView = require("element-ui/lib/utils/scroll-into-view");
const util = require("element-ui/lib/utils/util");
const shared = require("element-ui/lib/utils/shared");
const _sfc_main$1 = {
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  mixins: [Popper],
  props: {
    placement: {
      default: "bottom-start"
    },
    boundariesPadding: {
      default: 0
    },
    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    visibleArrow: {
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      minWidth: ""
    };
  },
  computed: {
    popperClass() {
      return this.$parent.popperClass;
    }
  },
  watch: {
    "$parent.inputWidth"() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + "px";
    }
  },
  mounted() {
    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on("updatePopper", () => {
      if (this.$parent.visible) this.updatePopper();
    });
    this.$on("destroyPopper", this.destroyPopper);
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-select-dropdown el-popper", class: [{ "is-multiple": _vm.$parent.multiple }, _vm.popperClass], style: { minWidth: _vm.minWidth } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const ElSelectMenu = __component__$1.exports;
const NavigationMixin = {
  data() {
    return {
      hoverOption: -1
    };
  },
  computed: {
    optionsAllDisabled() {
      return this.options.filter((option2) => option2.visible).every((option2) => option2.disabled);
    }
  },
  watch: {
    hoverIndex(val) {
      if (typeof val === "number" && val > -1) {
        this.hoverOption = this.options[val] || {};
      }
      this.options.forEach((option2) => {
        option2.hover = this.hoverOption === option2;
      });
    }
  },
  methods: {
    navigateOptions(direction) {
      if (!this.visible) {
        this.visible = true;
        return;
      }
      if (this.options.length === 0 || this.filteredOptionsCount === 0) return;
      if (!this.optionsAllDisabled) {
        if (direction === "next") {
          this.hoverIndex++;
          if (this.hoverIndex === this.options.length) {
            this.hoverIndex = 0;
          }
        } else if (direction === "prev") {
          this.hoverIndex--;
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.options.length - 1;
          }
        }
        const option2 = this.options[this.hoverIndex];
        if (option2.disabled === true || option2.groupDisabled === true || !option2.visible) {
          this.navigateOptions(direction);
        }
        this.$nextTick(() => this.scrollToOption(this.hoverOption));
      }
    }
  }
};
const _sfc_main = {
  mixins: [Emitter, Locale, Focus("reference"), NavigationMixin],
  name: "ElSelect",
  componentName: "ElSelect",
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  provide() {
    return {
      "select": this
    };
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    readonly() {
      return !this.filterable || this.multiple || !util.isIE() && !util.isEdge() && !this.visible;
    },
    showClose() {
      let hasValue = this.multiple ? Array.isArray(this.value) && this.value.length > 0 : this.value !== void 0 && this.value !== null && this.value !== "";
      let criteria = this.clearable && !this.selectDisabled && this.inputHovering && hasValue;
      return criteria;
    },
    iconClass() {
      return this.remote && this.filterable ? "" : this.visible ? "arrow-up is-reverse" : "arrow-up";
    },
    debounce() {
      return this.remote ? 300 : 0;
    },
    emptyText() {
      if (this.loading) {
        return this.loadingText || this.t("el.select.loading");
      } else {
        if (this.remote && this.query === "" && this.options.length === 0) return false;
        if (this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || this.t("el.select.noMatch");
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t("el.select.noData");
        }
      }
      return null;
    },
    showNewOption() {
      let hasExistingOption = this.options.filter((option2) => !option2.created).some((option2) => option2.currentLabel === this.query);
      return this.filterable && this.allowCreate && this.query !== "" && !hasExistingOption;
    },
    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    collapseTagSize() {
      return ["small", "mini"].indexOf(this.selectSize) > -1 ? "mini" : "small";
    },
    propPlaceholder() {
      return typeof this.placeholder !== "undefined" ? this.placeholder : this.t("el.select.placeholder");
    }
  },
  components: {
    ElInput,
    ElSelectMenu,
    ElOption: option.ElOption,
    ElTag,
    ElScrollbar
  },
  directives: { Clickoutside },
  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== "production" && console.warn("[Element Warn][Select]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead.");
        return true;
      }
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      required: false
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: "value"
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: "",
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: "",
      hoverIndex: -1,
      query: "",
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: "",
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },
  watch: {
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    propPlaceholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
    value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if (val && val.length > 0 || this.$refs.input && this.query !== "") {
          this.currentPlaceholder = "";
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = "";
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!util.valueEquals(val, oldVal)) {
        this.dispatch("ElFormItem", "el.form.change", val);
      }
    },
    visible(val) {
      if (!val) {
        this.broadcast("ElSelectDropdown", "destroyPopper");
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.query = "";
        this.previousQuery = null;
        this.selectedLabel = "";
        this.inputLength = 20;
        this.menuVisibleOnFocus = false;
        this.resetHoverIndex();
        this.$nextTick(() => {
          if (this.$refs.input && this.$refs.input.value === "" && this.selected.length === 0) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (this.filterable && this.allowCreate && this.createdSelected && this.createdLabel) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }
          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      } else {
        this.broadcast("ElSelectDropdown", "updatePopper");
        if (this.filterable) {
          this.query = this.remote ? "" : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.broadcast("ElOption", "queryChange", "");
              this.broadcast("ElOptionGroup", "queryChange");
            }
            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = "";
            }
          }
        }
      }
      this.$emit("visible-change", val);
    },
    options() {
      if (this.$isServer) return;
      this.$nextTick(() => {
        this.broadcast("ElSelectDropdown", "updatePopper");
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      let inputs = this.$el.querySelectorAll("input");
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    }
  },
  methods: {
    handleNavigate(direction) {
      if (this.isOnComposition) return;
      this.navigateOptions(direction);
    },
    handleComposition(event) {
      const text = event.target.value;
      if (event.type === "compositionend") {
        this.isOnComposition = false;
        this.$nextTick((_) => this.handleQueryChange(text));
      } else {
        const lastCharacter = text[text.length - 1] || "";
        this.isOnComposition = !shared.isKorean(lastCharacter);
      }
    },
    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) return;
      if (this.previousQuery === null && (typeof this.filterMethod === "function" || typeof this.remoteMethod === "function")) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(() => {
        if (this.visible) this.broadcast("ElSelectDropdown", "updatePopper");
      });
      this.hoverIndex = -1;
      if (this.multiple && this.filterable) {
        this.$nextTick(() => {
          const length = this.$refs.input.value.length * 15 + 20;
          this.inputLength = this.collapseTags ? Math.min(50, length) : length;
          this.managePlaceholder();
          this.resetInputHeight();
        });
      }
      if (this.remote && typeof this.remoteMethod === "function") {
        this.hoverIndex = -1;
        this.remoteMethod(val);
      } else if (typeof this.filterMethod === "function") {
        this.filterMethod(val);
        this.broadcast("ElOptionGroup", "queryChange");
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast("ElOption", "queryChange", val);
        this.broadcast("ElOptionGroup", "queryChange");
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    },
    scrollToOption(option2) {
      const target = Array.isArray(option2) && option2[0] ? option2[0].$el : option2.$el;
      if (this.$refs.popper && target) {
        const menu = this.$refs.popper.$el.querySelector(".el-select-dropdown__wrap");
        scrollIntoView(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },
    handleMenuEnter() {
      this.$nextTick(() => this.scrollToOption(this.selected));
    },
    emitChange(val) {
      if (!util.valueEquals(this.value, val)) {
        this.$emit("change", val);
      }
    },
    getOption(value) {
      let option2;
      const isObject = Object.prototype.toString.call(value).toLowerCase() === "[object object]";
      const isNull = Object.prototype.toString.call(value).toLowerCase() === "[object null]";
      const isUndefined = Object.prototype.toString.call(value).toLowerCase() === "[object undefined]";
      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i];
        const isEqual = isObject ? util.getValueByPath(cachedOption.value, this.valueKey) === util.getValueByPath(value, this.valueKey) : cachedOption.value === value;
        if (isEqual) {
          option2 = cachedOption;
          break;
        }
      }
      if (option2) return option2;
      const label = !isObject && !isNull && !isUndefined ? String(value) : "";
      let newOption = {
        value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },
    setSelected() {
      if (!this.multiple) {
        let option2 = this.getOption(this.value);
        if (option2.created) {
          this.createdLabel = option2.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option2.currentLabel;
        this.selected = option2;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      let result = [];
      if (Array.isArray(this.value)) {
        this.value.forEach((value) => {
          result.push(this.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    handleFocus(event) {
      if (!this.softFocus) {
        if (this.automaticDropdown || this.filterable) {
          if (this.filterable && !this.visible) {
            this.menuVisibleOnFocus = true;
          }
          this.visible = true;
        }
        this.$emit("focus", event);
      } else {
        this.softFocus = false;
      }
    },
    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false;
        } else {
          this.$emit("blur", event);
        }
      }, 50);
      this.softFocus = false;
    },
    handleClearClick(event) {
      this.deleteSelected(event);
    },
    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    handleClose() {
      this.visible = false;
    },
    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      const option2 = this.selected[this.selected.length - 1];
      if (!option2) return;
      if (hit === true || hit === false) {
        option2.hitState = hit;
        return hit;
      }
      option2.hitState = !option2.hitState;
      return option2.hitState;
    },
    deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        const value = this.value.slice();
        value.pop();
        this.$emit("input", value);
        this.emitChange(value);
      }
    },
    managePlaceholder() {
      if (this.currentPlaceholder !== "") {
        this.currentPlaceholder = this.$refs.input.value ? "" : this.cachedPlaceHolder;
      }
    },
    resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
      this.inputLength = this.$refs.input.value.length * 15 + 20;
      this.resetInputHeight();
    },
    resetInputHeight() {
      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(inputChildNodes, (item) => item.tagName === "INPUT")[0];
        const tags = this.$refs.tags;
        const tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
        const sizeInMap = this.initialInputHeight || 40;
        input.style.height = this.selected.length === 0 ? sizeInMap + "px" : Math.max(
          tags ? tagsHeight + (tagsHeight > sizeInMap ? 6 : 0) : 0,
          sizeInMap
        ) + "px";
        if (this.visible && this.emptyText !== false) {
          this.broadcast("ElSelectDropdown", "updatePopper");
        }
      });
    },
    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.options.indexOf(this.selected);
        } else {
          if (this.selected.length > 0) {
            this.hoverIndex = Math.min.apply(null, this.selected.map((item) => this.options.indexOf(item)));
          } else {
            this.hoverIndex = -1;
          }
        }
      }, 300);
    },
    handleOptionSelect(option2, byClick) {
      if (this.multiple) {
        const value = (this.value || []).slice();
        const optionIndex = this.getValueIndex(value, option2.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
          value.push(option2.value);
        }
        this.$emit("input", value);
        this.emitChange(value);
        if (option2.created) {
          this.query = "";
          this.handleQueryChange("");
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      } else {
        this.$emit("input", option2.value);
        this.emitChange(option2.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      this.setSoftFocus();
      if (this.visible) return;
      this.$nextTick(() => {
        this.scrollToOption(option2);
      });
    },
    setSoftFocus() {
      this.softFocus = true;
      const input = this.$refs.input || this.$refs.reference;
      if (input) {
        input.focus();
      }
    },
    getValueIndex(arr = [], value) {
      const isObject = Object.prototype.toString.call(value).toLowerCase() === "[object object]";
      if (!isObject) {
        return arr.indexOf(value);
      } else {
        const valueKey = this.valueKey;
        let index2 = -1;
        arr.some((item, i) => {
          if (util.getValueByPath(item, valueKey) === util.getValueByPath(value, valueKey)) {
            index2 = i;
            return true;
          }
          return false;
        });
        return index2;
      }
    },
    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },
    selectOption() {
      if (!this.visible) {
        this.toggleMenu();
      } else {
        if (this.options[this.hoverIndex]) {
          this.handleOptionSelect(this.options[this.hoverIndex]);
        }
      }
    },
    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : "";
      this.$emit("input", value);
      this.emitChange(value);
      this.visible = false;
      this.$emit("clear");
    },
    deleteTag(event, tag) {
      let index2 = this.selected.indexOf(tag);
      if (index2 > -1 && !this.selectDisabled) {
        const value = this.value.slice();
        value.splice(index2, 1);
        this.$emit("input", value);
        this.emitChange(value);
        this.$emit("remove-tag", tag.value);
      }
      event.stopPropagation();
    },
    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },
    onOptionDestroy(index2) {
      if (index2 > -1) {
        this.optionsCount--;
        this.filteredOptionsCount--;
        this.options.splice(index2, 1);
      }
    },
    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },
    handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },
    checkDefaultFirstOption() {
      this.hoverIndex = -1;
      let hasCreated = false;
      for (let i = this.options.length - 1; i >= 0; i--) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      for (let i = 0; i !== this.options.length; ++i) {
        const option2 = this.options[i];
        if (this.query) {
          if (!option2.disabled && !option2.groupDisabled && option2.visible) {
            this.hoverIndex = i;
            break;
          }
        } else {
          if (option2.itemSelected) {
            this.hoverIndex = i;
            break;
          }
        }
      }
    },
    getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== "[object object]") {
        return item.value;
      } else {
        return util.getValueByPath(item.value, this.valueKey);
      }
    }
  },
  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.propPlaceholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit("input", []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit("input", "");
    }
    this.debouncedOnInputChange = index.debounce(this.debounce, () => {
      this.onInputChange();
    });
    this.debouncedQueryChange = index.debounce(this.debounce, (e) => {
      this.handleQueryChange(e.target.value);
    });
    this.$on("handleOptionClick", this.handleOptionSelect);
    this.$on("setSelected", this.setSelected);
  },
  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = "";
    }
    resizeEvent.addResizeListener(this.$el, this.handleResize);
    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      const input = reference.$el.querySelector("input");
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) resizeEvent.removeResizeListener(this.$el, this.handleResize);
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleClose, expression: "handleClose" }], staticClass: "el-select", class: [_vm.selectSize ? "el-select--" + _vm.selectSize : ""], on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.toggleMenu.apply(null, arguments);
  } } }, [_vm.multiple ? _c("div", { ref: "tags", staticClass: "el-select__tags", style: { "max-width": _vm.inputWidth - 32 + "px", width: "100%" } }, [_vm.collapseTags && _vm.selected.length ? _c("span", [_c("el-tag", { attrs: { "closable": !_vm.selectDisabled, "size": _vm.collapseTagSize, "hit": _vm.selected[0].hitState, "type": "info", "disable-transitions": "" }, on: { "close": function($event) {
    return _vm.deleteTag($event, _vm.selected[0]);
  } } }, [_c("span", { staticClass: "el-select__tags-text" }, [_vm._v(_vm._s(_vm.selected[0].currentLabel))])]), _vm.selected.length > 1 ? _c("el-tag", { attrs: { "closable": false, "size": _vm.collapseTagSize, "type": "info", "disable-transitions": "" } }, [_c("span", { staticClass: "el-select__tags-text" }, [_vm._v("+ " + _vm._s(_vm.selected.length - 1))])]) : _vm._e()], 1) : _vm._e(), !_vm.collapseTags ? _c("transition-group", { on: { "after-leave": _vm.resetInputHeight } }, _vm._l(_vm.selected, function(item) {
    return _c("el-tag", { key: _vm.getValueKey(item), attrs: { "closable": !_vm.selectDisabled, "size": _vm.collapseTagSize, "hit": item.hitState, "type": "info", "disable-transitions": "" }, on: { "close": function($event) {
      return _vm.deleteTag($event, item);
    } } }, [_c("span", { staticClass: "el-select__tags-text" }, [_vm._v(_vm._s(item.currentLabel))])]);
  }), 1) : _vm._e(), _vm.filterable ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.query, expression: "query" }], ref: "input", staticClass: "el-select__input", class: [_vm.selectSize ? `is-${_vm.selectSize}` : ""], style: { "flex-grow": "1", width: _vm.inputLength / (_vm.inputWidth - 32) + "%", "max-width": _vm.inputWidth - 42 + "px" }, attrs: { "type": "text", "disabled": _vm.selectDisabled, "autocomplete": _vm.autoComplete || _vm.autocomplete }, domProps: { "value": _vm.query }, on: { "focus": _vm.handleFocus, "blur": function($event) {
    _vm.softFocus = false;
  }, "keyup": _vm.managePlaceholder, "keydown": [_vm.resetInputState, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) return null;
    $event.preventDefault();
    return _vm.handleNavigate("next");
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) return null;
    $event.preventDefault();
    return _vm.handleNavigate("prev");
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    $event.preventDefault();
    return _vm.selectOption.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) return null;
    $event.stopPropagation();
    $event.preventDefault();
    _vm.visible = false;
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete", "Del"])) return null;
    return _vm.deletePrevTag.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) return null;
    _vm.visible = false;
  }], "compositionstart": _vm.handleComposition, "compositionupdate": _vm.handleComposition, "compositionend": _vm.handleComposition, "input": [function($event) {
    if ($event.target.composing) return;
    _vm.query = $event.target.value;
  }, _vm.debouncedQueryChange] } }) : _vm._e()], 1) : _vm._e(), _c("el-input", { ref: "reference", class: { "is-focus": _vm.visible }, attrs: { "type": "text", "placeholder": _vm.currentPlaceholder, "name": _vm.name, "id": _vm.id, "autocomplete": _vm.autoComplete || _vm.autocomplete, "size": _vm.selectSize, "disabled": _vm.selectDisabled, "readonly": _vm.readonly, "validate-event": false, "tabindex": _vm.multiple && _vm.filterable ? "-1" : null }, on: { "focus": _vm.handleFocus, "blur": _vm.handleBlur, "input": _vm.debouncedOnInputChange, "compositionstart": _vm.handleComposition, "compositionupdate": _vm.handleComposition, "compositionend": _vm.handleComposition }, nativeOn: { "keydown": [function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) return null;
    $event.stopPropagation();
    $event.preventDefault();
    return _vm.handleNavigate("next");
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) return null;
    $event.stopPropagation();
    $event.preventDefault();
    return _vm.handleNavigate("prev");
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    $event.preventDefault();
    return _vm.selectOption.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) return null;
    $event.stopPropagation();
    $event.preventDefault();
    _vm.visible = false;
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) return null;
    _vm.visible = false;
  }], "mouseenter": function($event) {
    _vm.inputHovering = true;
  }, "mouseleave": function($event) {
    _vm.inputHovering = false;
  } }, model: { value: _vm.selectedLabel, callback: function($$v) {
    _vm.selectedLabel = $$v;
  }, expression: "selectedLabel" } }, [_vm.$slots.prefix ? _c("template", { slot: "prefix" }, [_vm._t("prefix")], 2) : _vm._e(), _c("template", { slot: "suffix" }, [_c("i", { directives: [{ name: "show", rawName: "v-show", value: !_vm.showClose, expression: "!showClose" }], class: ["el-select__caret", "el-input__icon", "el-icon-" + _vm.iconClass] }), _vm.showClose ? _c("i", { staticClass: "el-select__caret el-input__icon el-icon-circle-close", on: { "click": _vm.handleClearClick } }) : _vm._e()])], 2), _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "before-enter": _vm.handleMenuEnter, "after-leave": _vm.doDestroy } }, [_c("el-select-menu", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible && _vm.emptyText !== false, expression: "visible && emptyText !== false" }], ref: "popper", attrs: { "append-to-body": _vm.popperAppendToBody } }, [_c("el-scrollbar", { directives: [{ name: "show", rawName: "v-show", value: _vm.options.length > 0 && !_vm.loading, expression: "options.length > 0 && !loading" }], ref: "scrollbar", class: { "is-empty": !_vm.allowCreate && _vm.query && _vm.filteredOptionsCount === 0 }, attrs: { "tag": "ul", "wrap-class": "el-select-dropdown__wrap", "view-class": "el-select-dropdown__list" } }, [_vm.showNewOption ? _c("el-option", { attrs: { "value": _vm.query, "created": "" } }) : _vm._e(), _vm._t("default")], 2), _vm.emptyText && (!_vm.allowCreate || _vm.loading || _vm.allowCreate && _vm.options.length === 0) ? [_vm.$slots.empty ? _vm._t("empty") : _c("p", { staticClass: "el-select-dropdown__empty" }, [_vm._v(" " + _vm._s(_vm.emptyText) + " ")])] : _vm._e()], 2)], 1)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Select = __component__.exports;
Select.install = function(Vue) {
  Vue.component(Select.name, Select);
};
module.exports = Select;
