import Vue from "vue";
import Clickoutside from "element-ui/lib/utils/clickoutside";
import { isDateObject, getWeekNumber, formatDate, parseDate } from "element-ui/lib/utils/date-util";
import Popper from "element-ui/lib/utils/vue-popper";
import Emitter from "element-ui/lib/mixins/emitter";
import ElInput from "element-ui/lib/input";
import merge from "element-ui/lib/utils/merge";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const NewPopper = {
  props: {
    appendToBody: Popper.props.appendToBody,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    arrowOffset: Popper.props.arrowOffset,
    transformOrigin: Popper.props.transformOrigin
  },
  methods: Popper.methods,
  data() {
    return merge({ visibleArrow: true }, Popper.data);
  },
  beforeDestroy: Popper.beforeDestroy
};
const DEFAULT_FORMATS = {
  date: "yyyy-MM-dd",
  month: "yyyy-MM",
  months: "yyyy-MM",
  datetime: "yyyy-MM-dd HH:mm:ss",
  time: "HH:mm:ss",
  week: "yyyywWW",
  timerange: "HH:mm:ss",
  daterange: "yyyy-MM-dd",
  monthrange: "yyyy-MM",
  datetimerange: "yyyy-MM-dd HH:mm:ss",
  year: "yyyy",
  years: "yyyy"
};
const HAVE_TRIGGER_TYPES = [
  "date",
  "datetime",
  "time",
  "time-select",
  "week",
  "month",
  "year",
  "daterange",
  "monthrange",
  "timerange",
  "datetimerange",
  "dates",
  "months",
  "years"
];
const DATE_FORMATTER = function(value, format) {
  if (format === "timestamp") return value.getTime();
  return formatDate(value, format);
};
const DATE_PARSER = function(text, format) {
  if (format === "timestamp") return new Date(Number(text));
  return parseDate(text, format);
};
const RANGE_FORMATTER = function(value, format) {
  if (Array.isArray(value) && value.length === 2) {
    const start = value[0];
    const end = value[1];
    if (start && end) {
      return [DATE_FORMATTER(start, format), DATE_FORMATTER(end, format)];
    }
  }
  return "";
};
const RANGE_PARSER = function(array, format, separator) {
  if (!Array.isArray(array)) {
    array = array.split(separator);
  }
  if (array.length === 2) {
    const range1 = array[0];
    const range2 = array[1];
    return [DATE_PARSER(range1, format), DATE_PARSER(range2, format)];
  }
  return [];
};
const TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter(value) {
      if (!value) return "";
      return "" + value;
    },
    parser(text) {
      if (text === void 0 || text === "") return null;
      return text;
    }
  },
  week: {
    formatter(value, format) {
      let week = getWeekNumber(value);
      let month = value.getMonth();
      const trueDate = new Date(value);
      if (week === 1 && month === 11) {
        trueDate.setHours(0, 0, 0, 0);
        trueDate.setDate(trueDate.getDate() + 3 - (trueDate.getDay() + 6) % 7);
      }
      let date = formatDate(trueDate, format);
      date = /WW/.test(date) ? date.replace(/WW/, week < 10 ? "0" + week : week) : date.replace(/W/, week);
      return date;
    },
    parser(text, format) {
      return TYPE_VALUE_RESOLVER_MAP.date.parser(text, format);
    }
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  monthrange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  number: {
    formatter(value) {
      if (!value) return "";
      return "" + value;
    },
    parser(text) {
      let result = Number(text);
      if (!isNaN(text)) {
        return result;
      } else {
        return null;
      }
    }
  },
  dates: {
    formatter(value, format) {
      return value.map((date) => DATE_FORMATTER(date, format));
    },
    parser(value, format) {
      return (typeof value === "string" ? value.split(", ") : value).map((date) => date instanceof Date ? date : DATE_PARSER(date, format));
    }
  },
  months: {
    formatter(value, format) {
      return value.map((date) => DATE_FORMATTER(date, format));
    },
    parser(value, format) {
      return (typeof value === "string" ? value.split(", ") : value).map((date) => date instanceof Date ? date : DATE_PARSER(date, format));
    }
  },
  years: {
    formatter(value, format) {
      return value.map((date) => DATE_FORMATTER(date, format));
    },
    parser(value, format) {
      return (typeof value === "string" ? value.split(", ") : value).map((date) => date instanceof Date ? date : DATE_PARSER(date, format));
    }
  }
};
const PLACEMENT_MAP = {
  left: "bottom-start",
  center: "bottom",
  right: "bottom-end"
};
const parseAsFormatAndType = (value, customFormat, type, rangeSeparator = "-") => {
  if (!value) return null;
  const parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP["default"]).parser;
  const format = customFormat || DEFAULT_FORMATS[type];
  return parser(value, format, rangeSeparator);
};
const formatAsFormatAndType = (value, customFormat, type) => {
  if (!value) return null;
  const formatter = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP["default"]).formatter;
  const format = customFormat || DEFAULT_FORMATS[type];
  return formatter(value, format);
};
const valueEquals = function(a, b) {
  const dateEquals = function(a2, b2) {
    const aIsDate = a2 instanceof Date;
    const bIsDate = b2 instanceof Date;
    if (aIsDate && bIsDate) {
      return a2.getTime() === b2.getTime();
    }
    if (!aIsDate && !bIsDate) {
      return a2 === b2;
    }
    return false;
  };
  const aIsArray = a instanceof Array;
  const bIsArray = b instanceof Array;
  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((item, index) => dateEquals(item, b[index]));
  }
  if (!aIsArray && !bIsArray) {
    return dateEquals(a, b);
  }
  return false;
};
const isString = function(val) {
  return typeof val === "string" || val instanceof String;
};
const validator = function(val) {
  return val === null || val === void 0 || isString(val) || Array.isArray(val) && val.length === 2 && val.every(isString);
};
const _sfc_main = {
  mixins: [Emitter, NewPopper],
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  props: {
    size: String,
    format: String,
    valueFormat: String,
    readonly: Boolean,
    placeholder: String,
    startPlaceholder: String,
    endPlaceholder: String,
    prefixIcon: String,
    clearIcon: {
      type: String,
      default: "el-icon-circle-close"
    },
    name: {
      default: "",
      validator
    },
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    id: {
      default: "",
      validator
    },
    popperClass: String,
    editable: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: "left"
    },
    value: {},
    defaultValue: {},
    defaultTime: {},
    rangeSeparator: {
      default: "-"
    },
    pickerOptions: {},
    unlinkPanels: Boolean,
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  components: { ElInput },
  directives: { Clickoutside },
  data() {
    return {
      pickerVisible: false,
      showClose: false,
      userInput: null,
      valueOnOpen: null,
      // value when picker opens, used to determine whether to emit change
      unwatchPickerOptions: null
    };
  },
  watch: {
    pickerVisible(val) {
      if (this.readonly || this.pickerDisabled) return;
      if (val) {
        this.showPicker();
        this.valueOnOpen = Array.isArray(this.value) ? [...this.value] : this.value;
      } else {
        this.hidePicker();
        this.emitChange(this.value);
        this.userInput = null;
        if (this.validateEvent) {
          this.dispatch("ElFormItem", "el.form.blur");
        }
        this.$emit("blur", this);
        this.blur();
      }
    },
    parsedValue: {
      immediate: true,
      handler(val) {
        if (this.picker) {
          this.picker.value = val;
        }
      }
    },
    defaultValue(val) {
      if (this.picker) {
        this.picker.defaultValue = val;
      }
    },
    value(val, oldVal) {
      if (!valueEquals(val, oldVal) && !this.pickerVisible && this.validateEvent) {
        this.dispatch("ElFormItem", "el.form.change", val);
      }
    }
  },
  computed: {
    ranged() {
      return this.type.indexOf("range") > -1;
    },
    reference() {
      const reference = this.$refs.reference;
      return reference.$el || reference;
    },
    refInput() {
      if (this.reference) {
        return [].slice.call(this.reference.querySelectorAll("input"));
      }
      return [];
    },
    valueIsEmpty() {
      const val = this.value;
      if (Array.isArray(val)) {
        for (let i = 0, len = val.length; i < len; i++) {
          if (val[i]) {
            return false;
          }
        }
      } else {
        if (val) {
          return false;
        }
      }
      return true;
    },
    triggerClass() {
      return this.prefixIcon || (this.type.indexOf("time") !== -1 ? "el-icon-time" : "el-icon-date");
    },
    selectionMode() {
      if (this.type === "week") {
        return "week";
      } else if (this.type === "month") {
        return "month";
      } else if (this.type === "year") {
        return "year";
      } else if (this.type === "dates") {
        return "dates";
      } else if (this.type === "months") {
        return "months";
      } else if (this.type === "years") {
        return "years";
      }
      return "day";
    },
    haveTrigger() {
      if (typeof this.showTrigger !== "undefined") {
        return this.showTrigger;
      }
      return HAVE_TRIGGER_TYPES.indexOf(this.type) !== -1;
    },
    displayValue() {
      const formattedValue = formatAsFormatAndType(this.parsedValue, this.format, this.type, this.rangeSeparator);
      if (Array.isArray(this.userInput)) {
        return [
          this.userInput[0] || formattedValue && formattedValue[0] || "",
          this.userInput[1] || formattedValue && formattedValue[1] || ""
        ];
      } else if (this.userInput !== null) {
        return this.userInput;
      } else if (formattedValue) {
        return this.type === "dates" || this.type === "years" || this.type === "months" ? formattedValue.join(", ") : formattedValue;
      } else {
        return "";
      }
    },
    parsedValue() {
      if (!this.value) return this.value;
      if (this.type === "time-select") return this.value;
      const valueIsDateObject = isDateObject(this.value) || Array.isArray(this.value) && this.value.every(isDateObject);
      if (valueIsDateObject) {
        return this.value;
      }
      if (this.valueFormat) {
        return parseAsFormatAndType(this.value, this.valueFormat, this.type, this.rangeSeparator) || this.value;
      }
      return Array.isArray(this.value) ? this.value.map((val) => new Date(val)) : new Date(this.value);
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    pickerSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    pickerDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    firstInputId() {
      const obj = {};
      let id;
      if (this.ranged) {
        id = this.id && this.id[0];
      } else {
        id = this.id;
      }
      if (id) obj.id = id;
      return obj;
    },
    secondInputId() {
      const obj = {};
      let id;
      if (this.ranged) {
        id = this.id && this.id[1];
      }
      if (id) obj.id = id;
      return obj;
    }
  },
  created() {
    this.popperOptions = {
      boundariesPadding: 0,
      gpuAcceleration: false
    };
    this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left;
    this.$on("fieldReset", this.handleFieldReset);
  },
  methods: {
    focus() {
      if (!this.ranged) {
        this.$refs.reference.focus();
      } else {
        this.handleFocus();
      }
    },
    blur() {
      this.refInput.forEach((input) => input.blur());
    },
    // {parse, formatTo} Value deals maps component value with internal Date
    parseValue(value) {
      const isParsed = isDateObject(value) || Array.isArray(value) && value.every(isDateObject);
      if (this.valueFormat && !isParsed) {
        return parseAsFormatAndType(value, this.valueFormat, this.type, this.rangeSeparator) || value;
      } else {
        return value;
      }
    },
    formatToValue(date) {
      const isFormattable = isDateObject(date) || Array.isArray(date) && date.every(isDateObject);
      if (this.valueFormat && isFormattable) {
        return formatAsFormatAndType(date, this.valueFormat, this.type, this.rangeSeparator);
      } else {
        return date;
      }
    },
    // {parse, formatTo} String deals with user input
    parseString(value) {
      const type = Array.isArray(value) ? this.type : this.type.replace("range", "");
      return parseAsFormatAndType(value, this.format, type);
    },
    formatToString(value) {
      const type = Array.isArray(value) ? this.type : this.type.replace("range", "");
      return formatAsFormatAndType(value, this.format, type);
    },
    handleMouseEnter() {
      if (this.readonly || this.pickerDisabled) return;
      if (!this.valueIsEmpty && this.clearable) {
        this.showClose = true;
      }
    },
    handleChange() {
      if (this.userInput) {
        const value = this.parseString(this.displayValue);
        if (value) {
          this.picker.value = value;
          if (this.isValidValue(value)) {
            this.emitInput(value);
            this.userInput = null;
          }
        }
      }
      if (this.userInput === "") {
        this.emitInput(null);
        this.emitChange(null);
        this.userInput = null;
      }
    },
    handleStartInput(event) {
      if (this.userInput) {
        this.userInput = [event.target.value, this.userInput[1]];
      } else {
        this.userInput = [event.target.value, null];
      }
    },
    handleEndInput(event) {
      if (this.userInput) {
        this.userInput = [this.userInput[0], event.target.value];
      } else {
        this.userInput = [null, event.target.value];
      }
    },
    handleStartChange(event) {
      const value = this.parseString(this.userInput && this.userInput[0]);
      if (value) {
        this.userInput = [this.formatToString(value), this.displayValue[1]];
        const newValue = [value, this.picker.value && this.picker.value[1]];
        this.picker.value = newValue;
        if (this.isValidValue(newValue)) {
          this.emitInput(newValue);
          this.userInput = null;
        }
      }
    },
    handleEndChange(event) {
      const value = this.parseString(this.userInput && this.userInput[1]);
      if (value) {
        this.userInput = [this.displayValue[0], this.formatToString(value)];
        const newValue = [this.picker.value && this.picker.value[0], value];
        this.picker.value = newValue;
        if (this.isValidValue(newValue)) {
          this.emitInput(newValue);
          this.userInput = null;
        }
      }
    },
    handleClickIcon(event) {
      if (this.readonly || this.pickerDisabled) return;
      if (this.showClose) {
        this.valueOnOpen = this.value;
        event.stopPropagation();
        this.emitInput(null);
        this.emitChange(null);
        this.showClose = false;
        if (this.picker && typeof this.picker.handleClear === "function") {
          this.picker.handleClear();
        }
      } else {
        this.pickerVisible = !this.pickerVisible;
      }
    },
    handleClose() {
      if (!this.pickerVisible) return;
      this.pickerVisible = false;
      if (this.type === "dates" || this.type === "years" || this.type === "months") {
        const oldValue = parseAsFormatAndType(this.valueOnOpen, this.valueFormat, this.type, this.rangeSeparator) || this.valueOnOpen;
        this.emitInput(oldValue);
      }
    },
    handleFieldReset(initialValue) {
      this.userInput = initialValue === "" ? null : initialValue;
    },
    handleFocus() {
      const type = this.type;
      if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
        this.pickerVisible = true;
      }
      this.$emit("focus", this);
    },
    handleKeydown(event) {
      const keyCode = event.keyCode;
      if (keyCode === 27) {
        this.pickerVisible = false;
        event.stopPropagation();
        return;
      }
      if (keyCode === 9) {
        if (!this.ranged) {
          this.handleChange();
          this.pickerVisible = this.picker.visible = false;
          this.blur();
          event.stopPropagation();
        } else {
          setTimeout(() => {
            if (this.refInput.indexOf(document.activeElement) === -1) {
              this.pickerVisible = false;
              this.blur();
              event.stopPropagation();
            }
          }, 0);
        }
        return;
      }
      if (keyCode === 13) {
        if (this.userInput === "" || this.isValidValue(this.parseString(this.displayValue))) {
          this.handleChange();
          this.pickerVisible = this.picker.visible = false;
          this.blur();
        }
        event.stopPropagation();
        return;
      }
      if (this.userInput) {
        event.stopPropagation();
        return;
      }
      if (this.picker && this.picker.handleKeydown) {
        this.picker.handleKeydown(event);
      }
    },
    handleRangeClick() {
      const type = this.type;
      if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
        this.pickerVisible = true;
      }
      this.$emit("focus", this);
    },
    hidePicker() {
      if (this.picker) {
        this.picker.resetView && this.picker.resetView();
        this.pickerVisible = this.picker.visible = false;
        this.destroyPopper();
      }
    },
    showPicker() {
      if (this.$isServer) return;
      if (!this.picker) {
        this.mountPicker();
      }
      this.pickerVisible = this.picker.visible = true;
      this.updatePopper();
      this.picker.value = this.parsedValue;
      this.picker.resetView && this.picker.resetView();
      this.$nextTick(() => {
        this.picker.adjustSpinners && this.picker.adjustSpinners();
      });
    },
    mountPicker() {
      this.picker = new Vue(this.panel).$mount();
      this.picker.defaultValue = this.defaultValue;
      this.picker.defaultTime = this.defaultTime;
      this.picker.popperClass = this.popperClass;
      this.popperElm = this.picker.$el;
      this.picker.width = this.reference.getBoundingClientRect().width;
      this.picker.showTime = this.type === "datetime" || this.type === "datetimerange";
      this.picker.selectionMode = this.selectionMode;
      this.picker.unlinkPanels = this.unlinkPanels;
      this.picker.arrowControl = this.arrowControl || this.timeArrowControl || false;
      this.$watch("format", (format) => {
        this.picker.format = format;
      });
      const updateOptions = () => {
        const options = this.pickerOptions;
        if (options && options.selectableRange) {
          let ranges = options.selectableRange;
          const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
          const format = DEFAULT_FORMATS.timerange;
          ranges = Array.isArray(ranges) ? ranges : [ranges];
          this.picker.selectableRange = ranges.map((range) => parser(range, format, this.rangeSeparator));
        }
        for (const option in options) {
          if (options.hasOwnProperty(option) && // 忽略 time-picker 的该配置项
          option !== "selectableRange") {
            this.picker[option] = options[option];
          }
        }
        if (this.format) {
          this.picker.format = this.format;
        }
      };
      updateOptions();
      this.unwatchPickerOptions = this.$watch("pickerOptions", () => updateOptions(), { deep: true });
      this.$el.appendChild(this.picker.$el);
      this.picker.resetView && this.picker.resetView();
      this.picker.$on("dodestroy", this.doDestroy);
      this.picker.$on("pick", (date = "", visible = false) => {
        this.userInput = null;
        this.pickerVisible = this.picker.visible = visible;
        this.emitInput(date);
        this.picker.resetView && this.picker.resetView();
      });
      this.picker.$on("select-range", (start, end, pos) => {
        if (this.refInput.length === 0) return;
        if (!pos || pos === "min") {
          this.refInput[0].setSelectionRange(start, end);
          this.refInput[0].focus();
        } else if (pos === "max") {
          this.refInput[1].setSelectionRange(start, end);
          this.refInput[1].focus();
        }
      });
    },
    unmountPicker() {
      if (this.picker) {
        this.picker.$destroy();
        this.picker.$off();
        if (typeof this.unwatchPickerOptions === "function") {
          this.unwatchPickerOptions();
        }
        this.picker.$el.parentNode.removeChild(this.picker.$el);
      }
    },
    emitChange(val) {
      if (!valueEquals(val, this.valueOnOpen)) {
        this.$emit("change", val);
        this.valueOnOpen = val;
        if (this.validateEvent) {
          this.dispatch("ElFormItem", "el.form.change", val);
        }
      }
    },
    emitInput(val) {
      const formatted = this.formatToValue(val);
      if (!valueEquals(this.value, formatted)) {
        this.$emit("input", formatted);
      }
    },
    isValidValue(value) {
      if (!this.picker) {
        this.mountPicker();
      }
      if (this.picker.isValidValue) {
        return value && this.picker.isValidValue(value);
      } else {
        return true;
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return !_vm.ranged ? _c("el-input", _vm._b({ directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleClose, expression: "handleClose" }], ref: "reference", staticClass: "el-date-editor", class: "el-date-editor--" + _vm.type, attrs: { "readonly": !_vm.editable || _vm.readonly || _vm.type === "dates" || _vm.type === "week" || _vm.type === "years" || _vm.type === "months", "disabled": _vm.pickerDisabled, "size": _vm.pickerSize, "name": _vm.name, "placeholder": _vm.placeholder, "value": _vm.displayValue, "validateEvent": false }, on: { "focus": _vm.handleFocus, "input": (value) => _vm.userInput = value, "change": _vm.handleChange }, nativeOn: { "keydown": function($event) {
    return _vm.handleKeydown.apply(null, arguments);
  }, "mouseenter": function($event) {
    return _vm.handleMouseEnter.apply(null, arguments);
  }, "mouseleave": function($event) {
    _vm.showClose = false;
  } } }, "el-input", _vm.firstInputId, false), [_c("i", { staticClass: "el-input__icon", class: _vm.triggerClass, attrs: { "slot": "prefix" }, on: { "click": _vm.handleFocus }, slot: "prefix" }), _vm.haveTrigger ? _c("i", { staticClass: "el-input__icon", class: [_vm.showClose ? "" + _vm.clearIcon : ""], attrs: { "slot": "suffix" }, on: { "click": _vm.handleClickIcon }, slot: "suffix" }) : _vm._e()]) : _c("div", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleClose, expression: "handleClose" }], ref: "reference", staticClass: "el-date-editor el-range-editor el-input__inner", class: [
    "el-date-editor--" + _vm.type,
    _vm.pickerSize ? `el-range-editor--${_vm.pickerSize}` : "",
    _vm.pickerDisabled ? "is-disabled" : "",
    _vm.pickerVisible ? "is-active" : ""
  ], on: { "click": _vm.handleRangeClick, "mouseenter": _vm.handleMouseEnter, "mouseleave": function($event) {
    _vm.showClose = false;
  }, "keydown": _vm.handleKeydown } }, [_c("i", { class: ["el-input__icon", "el-range__icon", _vm.triggerClass] }), _c("input", _vm._b({ staticClass: "el-range-input", attrs: { "autocomplete": "off", "placeholder": _vm.startPlaceholder, "disabled": _vm.pickerDisabled, "readonly": !_vm.editable || _vm.readonly, "name": _vm.name && _vm.name[0] }, domProps: { "value": _vm.displayValue && _vm.displayValue[0] }, on: { "input": _vm.handleStartInput, "change": _vm.handleStartChange, "focus": _vm.handleFocus } }, "input", _vm.firstInputId, false)), _vm._t("range-separator", function() {
    return [_c("span", { staticClass: "el-range-separator" }, [_vm._v(_vm._s(_vm.rangeSeparator))])];
  }), _c("input", _vm._b({ staticClass: "el-range-input", attrs: { "autocomplete": "off", "placeholder": _vm.endPlaceholder, "disabled": _vm.pickerDisabled, "readonly": !_vm.editable || _vm.readonly, "name": _vm.name && _vm.name[1] }, domProps: { "value": _vm.displayValue && _vm.displayValue[1] }, on: { "input": _vm.handleEndInput, "change": _vm.handleEndChange, "focus": _vm.handleFocus } }, "input", _vm.secondInputId, false)), _vm.haveTrigger ? _c("i", { staticClass: "el-input__icon el-range__close-icon", class: [_vm.showClose ? "" + _vm.clearIcon : ""], on: { "click": _vm.handleClickIcon } }) : _vm._e()], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Picker = __component__.exports;
export {
  Picker as P
};
