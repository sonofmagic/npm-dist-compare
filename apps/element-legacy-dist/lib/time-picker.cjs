"use strict";
const Vue = require("vue");
const locale = require("./locale-j1fuSDyN.cjs");
const dateUtil = require("./date-util-1Vppicof.cjs");
const time = require("./time-CmjyEblg.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const picker = require("./picker-BexJaURa.cjs");
const MIN_TIME = dateUtil.parseDate("00:00:00", "HH:mm:ss");
const MAX_TIME = dateUtil.parseDate("23:59:59", "HH:mm:ss");
function minTimeOfDay(date) {
  return dateUtil.modifyDate(MIN_TIME, date.getFullYear(), date.getMonth(), date.getDate());
}
function maxTimeOfDay(date) {
  return dateUtil.modifyDate(MAX_TIME, date.getFullYear(), date.getMonth(), date.getDate());
}
function advanceTime(date, amount) {
  return new Date(Math.min(date.getTime() + amount, maxTimeOfDay(date).getTime()));
}
const _sfc_main = {
  components: { TimeSpinner: time.TimeSpinner },
  mixins: [locale.Locale],
  data() {
    return {
      popperClass: "",
      minDate: /* @__PURE__ */ new Date(),
      maxDate: /* @__PURE__ */ new Date(),
      value: [],
      oldValue: [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()],
      defaultValue: null,
      format: "HH:mm:ss",
      visible: false,
      selectionRange: [0, 2],
      arrowControl: false
    };
  },
  computed: {
    showSeconds() {
      return (this.format || "").includes("ss");
    },
    offset() {
      return this.showSeconds ? 11 : 8;
    },
    spinner() {
      return this.selectionRange[0] < this.offset ? this.$refs.minSpinner : this.$refs.maxSpinner;
    },
    btnDisabled() {
      return this.minDate.getTime() > this.maxDate.getTime();
    },
    amPmMode() {
      if ((this.format || "").includes("A")) {
        return "A";
      }
      if ((this.format || "").includes("a")) {
        return "a";
      }
      return "";
    }
  },
  watch: {
    value(value) {
      if (Array.isArray(value)) {
        this.minDate = new Date(value[0]);
        this.maxDate = new Date(value[1]);
      } else {
        if (Array.isArray(this.defaultValue)) {
          this.minDate = new Date(this.defaultValue[0]);
          this.maxDate = new Date(this.defaultValue[1]);
        } else if (this.defaultValue) {
          this.minDate = new Date(this.defaultValue);
          this.maxDate = advanceTime(new Date(this.defaultValue), 60 * 60 * 1e3);
        } else {
          this.minDate = /* @__PURE__ */ new Date();
          this.maxDate = advanceTime(/* @__PURE__ */ new Date(), 60 * 60 * 1e3);
        }
      }
    },
    visible(val) {
      if (val) {
        this.oldValue = this.value;
        this.$nextTick(() => this.$refs.minSpinner.emitSelectRange("hours"));
      }
    }
  },
  methods: {
    handleClear() {
      this.$emit("pick", null);
    },
    handleCancel() {
      this.$emit("pick", this.oldValue);
    },
    handleMinChange(date) {
      this.minDate = dateUtil.clearMilliseconds(date);
      this.handleChange();
    },
    handleMaxChange(date) {
      this.maxDate = dateUtil.clearMilliseconds(date);
      this.handleChange();
    },
    handleChange() {
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$refs.minSpinner.selectableRange = [[minTimeOfDay(this.minDate), this.maxDate]];
        this.$refs.maxSpinner.selectableRange = [[this.minDate, maxTimeOfDay(this.maxDate)]];
        this.$emit("pick", [this.minDate, this.maxDate], true);
      }
    },
    setMinSelectionRange(start, end) {
      this.$emit("select-range", start, end, "min");
      this.selectionRange = [start, end];
    },
    setMaxSelectionRange(start, end) {
      this.$emit("select-range", start, end, "max");
      this.selectionRange = [start + this.offset, end + this.offset];
    },
    handleConfirm(visible = false) {
      const minSelectableRange = this.$refs.minSpinner.selectableRange;
      const maxSelectableRange = this.$refs.maxSpinner.selectableRange;
      this.minDate = dateUtil.limitTimeRange(this.minDate, minSelectableRange, this.format);
      this.maxDate = dateUtil.limitTimeRange(this.maxDate, maxSelectableRange, this.format);
      this.$emit("pick", [this.minDate, this.maxDate], visible);
    },
    adjustSpinners() {
      this.$refs.minSpinner.adjustSpinners();
      this.$refs.maxSpinner.adjustSpinners();
    },
    changeSelectionRange(step) {
      const list = this.showSeconds ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11];
      const mapping = ["hours", "minutes"].concat(this.showSeconds ? ["seconds"] : []);
      const index = list.indexOf(this.selectionRange[0]);
      const next = (index + step + list.length) % list.length;
      const half = list.length / 2;
      if (next < half) {
        this.$refs.minSpinner.emitSelectRange(mapping[next]);
      } else {
        this.$refs.maxSpinner.emitSelectRange(mapping[next - half]);
      }
    },
    isValidValue(date) {
      return Array.isArray(date) && dateUtil.timeWithinRange(this.minDate, this.$refs.minSpinner.selectableRange) && dateUtil.timeWithinRange(this.maxDate, this.$refs.maxSpinner.selectableRange);
    },
    handleKeydown(event) {
      const keyCode = event.keyCode;
      const mapping = { 38: -1, 40: 1, 37: -1, 39: 1 };
      if (keyCode === 37 || keyCode === 39) {
        const step = mapping[keyCode];
        this.changeSelectionRange(step);
        event.preventDefault();
        return;
      }
      if (keyCode === 38 || keyCode === 40) {
        const step = mapping[keyCode];
        this.spinner.scrollDown(step);
        event.preventDefault();
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": function($event) {
    return _vm.$emit("dodestroy");
  } } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-time-range-picker el-picker-panel el-popper", class: _vm.popperClass }, [_c("div", { staticClass: "el-time-range-picker__content" }, [_c("div", { staticClass: "el-time-range-picker__cell" }, [_c("div", { staticClass: "el-time-range-picker__header" }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.startTime")) + " ")]), _c("div", { staticClass: "el-time-range-picker__body el-time-panel__content", class: { "has-seconds": _vm.showSeconds, "is-arrow": _vm.arrowControl } }, [_c("TimeSpinner", { ref: "minSpinner", attrs: { "show-seconds": _vm.showSeconds, "am-pm-mode": _vm.amPmMode, "arrow-control": _vm.arrowControl, "date": _vm.minDate }, on: { "change": _vm.handleMinChange, "select-range": _vm.setMinSelectionRange } })], 1)]), _c("div", { staticClass: "el-time-range-picker__cell" }, [_c("div", { staticClass: "el-time-range-picker__header" }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.endTime")) + " ")]), _c("div", { staticClass: "el-time-range-picker__body el-time-panel__content", class: { "has-seconds": _vm.showSeconds, "is-arrow": _vm.arrowControl } }, [_c("TimeSpinner", { ref: "maxSpinner", attrs: { "show-seconds": _vm.showSeconds, "am-pm-mode": _vm.amPmMode, "arrow-control": _vm.arrowControl, "date": _vm.maxDate }, on: { "change": _vm.handleMaxChange, "select-range": _vm.setMaxSelectionRange } })], 1)])]), _c("div", { staticClass: "el-time-panel__footer" }, [_c("button", { staticClass: "el-time-panel__btn cancel", attrs: { "type": "button" }, on: { "click": function($event) {
    return _vm.handleCancel();
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.cancel")) + " ")]), _c("button", { staticClass: "el-time-panel__btn confirm", attrs: { "type": "button", "disabled": _vm.btnDisabled }, on: { "click": function($event) {
    return _vm.handleConfirm();
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.confirm")) + " ")])])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const TimeRangePanel = __component__.exports;
const TimePicker = Vue.defineComponent({
  name: "ElTimePicker",
  mixins: [picker.Picker],
  props: {
    isRange: Boolean,
    arrowControl: Boolean
  },
  data() {
    return {
      type: ""
    };
  },
  watch: {
    isRange(isRange) {
      if (this.picker) {
        this.unmountPicker();
        this.type = isRange ? "timerange" : "time";
        this.panel = isRange ? TimeRangePanel : time.TimePanel;
        this.mountPicker();
      } else {
        this.type = isRange ? "timerange" : "time";
        this.panel = isRange ? TimeRangePanel : time.TimePanel;
      }
    }
  },
  created() {
    this.type = this.isRange ? "timerange" : "time";
    this.panel = this.isRange ? TimeRangePanel : time.TimePanel;
  }
});
const _TimePicker = TimePicker;
_TimePicker.install = function install(Vue2) {
  Vue2.component(_TimePicker.name, _TimePicker);
};
module.exports = _TimePicker;
