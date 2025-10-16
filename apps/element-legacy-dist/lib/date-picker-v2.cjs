"use strict";
const Vue = require("vue");
const ElButton = require("element-ui/lib/button");
const ElInput = require("element-ui/lib/input");
const locale = require("./locale-j1fuSDyN.cjs");
const clickoutside = require("./clickoutside-BWqUe94D.cjs");
const dateUtil = require("./date-util-1Vppicof.cjs");
const util = require("./util-KJN0EjuU.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const ElScrollbar = require("element-ui/lib/scrollbar");
const repeatClick = require("./repeat-click-BzHWu16j.cjs");
const ElOption = require("element-ui/lib/option");
const ElSelect = require("element-ui/lib/select");
const dom = require("./dom-D54PnS1K.cjs");
const emitter = require("./emitter-CM7bVwl7.cjs");
const merge = require("./merge-3R-Osds6.cjs");
const vuePopper = require("./vue-popper-CQ9w6kyf.cjs");
const WEEKS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function getDateTimestamp(time) {
  if (typeof time === "number" || typeof time === "string") {
    return dateUtil.clearTime(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return dateUtil.clearTime(time).getTime();
  } else {
    return Number.NaN;
  }
}
function removeFromArray$1(arr, pred) {
  const idx = typeof pred === "function" ? util.arrayFindIndex(arr, pred) : arr.indexOf(pred);
  return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr;
}
const _sfc_main$8 = {
  mixins: [locale.Locale],
  props: {
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: (val) => val >= 1 && val <= 7
    },
    value: {},
    defaultValue: {
      validator(val) {
        return val === null || dateUtil.isDate(val) || Array.isArray(val) && val.every(dateUtil.isDate);
      }
    },
    date: {},
    selectionMode: {
      default: "day"
    },
    showWeekNumber: {
      type: Boolean,
      default: false
    },
    disabledDate: {},
    cellClassName: {},
    minDate: {},
    maxDate: {},
    rangeState: {
      default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },
  data() {
    return {
      lastRow: null,
      lastColumn: null
    };
  },
  computed: {
    offsetDay() {
      const week = this.firstDayOfWeek;
      return week > 3 ? 7 - week : -week;
    },
    WEEKS() {
      const week = this.firstDayOfWeek;
      return WEEKS.concat(WEEKS).slice(week, week + 7);
    },
    year() {
      return this.date.getFullYear();
    },
    month() {
      return this.date.getMonth();
    },
    startDate() {
      return dateUtil.getStartDateOfMonth(this.year, this.month);
    },
    rows() {
      const date = new Date(this.year, this.month, 1);
      let day = dateUtil.getFirstDayOfMonth(date);
      const dateCountOfMonth = dateUtil.getDayCountOfMonth(date.getFullYear(), date.getMonth());
      const dateCountOfLastMonth = dateUtil.getDayCountOfMonth(date.getFullYear(), date.getMonth() === 0 ? 11 : date.getMonth() - 1);
      day = day === 0 ? 7 : day;
      const offset = this.offsetDay;
      const rows = Array.from({ length: 6 }, () => {
        const row = [];
        if (this.showWeekNumber) {
          row.push({
            column: -1,
            end: false,
            inRange: false,
            row: -1,
            start: false,
            text: "",
            type: "week"
          });
        }
        return row;
      });
      let count = 1;
      const startDate = this.startDate;
      const disabledDate = this.disabledDate;
      const cellClassName = this.cellClassName;
      const selectedDate = this.selectionMode === "dates" ? util.coerceTruthyValueToArray(this.value) : [];
      const now = getDateTimestamp(/* @__PURE__ */ new Date());
      const minDateTimestamp = getDateTimestamp(this.minDate);
      const maxDateTimestamp = getDateTimestamp(this.maxDate);
      const hasMin = !Number.isNaN(minDateTimestamp);
      const hasMax = !Number.isNaN(maxDateTimestamp);
      for (let i = 0; i < 6; i++) {
        const row = rows[i];
        if (this.showWeekNumber) {
          row[0] = {
            column: -1,
            end: false,
            inRange: false,
            row: i,
            start: false,
            text: dateUtil.getWeekNumber(dateUtil.nextDate(startDate, i * 7 + 1)),
            type: "week"
          };
        }
        for (let j = 0; j < 7; j++) {
          const cellIndex = this.showWeekNumber ? j + 1 : j;
          const cell = {
            column: j,
            customClass: "",
            disabled: false,
            end: false,
            inRange: false,
            row: i,
            selected: false,
            start: false,
            text: 0,
            type: "normal"
          };
          const index = i * 7 + j;
          const time = dateUtil.nextDate(startDate, index - offset).getTime();
          cell.inRange = hasMin && hasMax && time >= minDateTimestamp && time <= maxDateTimestamp;
          cell.start = Boolean(this.minDate) && time === minDateTimestamp;
          cell.end = Boolean(this.maxDate) && time === maxDateTimestamp;
          const isToday = time === now;
          if (isToday) {
            cell.type = "today";
          }
          if (i >= 0 && i <= 1) {
            const numberOfDaysFromPreviousMonth = day + offset < 0 ? 7 + day + offset : day + offset;
            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count++;
            } else {
              cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - j % 7) + 1 + i * 7;
              cell.type = "prev-month";
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++;
            } else {
              cell.text = count++ - dateCountOfMonth;
              cell.type = "next-month";
            }
          }
          const cellDate = new Date(time);
          cell.disabled = typeof disabledDate === "function" && disabledDate(cellDate);
          cell.selected = util.arrayFind(selectedDate, (date2) => date2.getTime() === cellDate.getTime());
          cell.customClass = typeof cellClassName === "function" && cellClassName(cellDate);
          row[cellIndex] = cell;
        }
        if (this.selectionMode === "week") {
          const start = this.showWeekNumber ? 1 : 0;
          const end = this.showWeekNumber ? 7 : 6;
          const isWeekActive = this.isWeekActive(row[start + 1]);
          row[start].inRange = isWeekActive;
          row[start].start = isWeekActive;
          row[end].inRange = isWeekActive;
          row[end].end = isWeekActive;
        }
      }
      return rows;
    }
  },
  watch: {
    "rangeState.endDate": function(newVal) {
      this.markRange(this.minDate, newVal);
    },
    minDate(newVal, oldVal) {
      if (getDateTimestamp(newVal) !== getDateTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },
    maxDate(newVal, oldVal) {
      if (getDateTimestamp(newVal) !== getDateTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    }
  },
  methods: {
    cellMatchesDate(cell, date) {
      const value = new Date(date);
      return this.year === value.getFullYear() && this.month === value.getMonth() && Number(cell.text) === value.getDate();
    },
    getCellClasses(cell) {
      const selectionMode = this.selectionMode;
      const defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];
      const classes = [];
      if ((cell.type === "normal" || cell.type === "today") && !cell.disabled) {
        classes.push("available");
        if (cell.type === "today") {
          classes.push("today");
        }
      } else {
        classes.push(cell.type);
      }
      if (cell.type === "normal" && defaultValue.some((date) => this.cellMatchesDate(cell, date))) {
        classes.push("default");
      }
      if (selectionMode === "day" && (cell.type === "normal" || cell.type === "today") && this.cellMatchesDate(cell, this.value)) {
        classes.push("current");
      }
      if (cell.inRange && (cell.type === "normal" || cell.type === "today" || this.selectionMode === "week")) {
        classes.push("in-range");
        if (cell.start) {
          classes.push("start-date");
        }
        if (cell.end) {
          classes.push("end-date");
        }
      }
      if (cell.disabled) {
        classes.push("disabled");
      }
      if (cell.selected) {
        classes.push("selected");
      }
      if (cell.customClass) {
        classes.push(cell.customClass);
      }
      return classes.join(" ");
    },
    getDateOfCell(row, column) {
      const offsetFromStart = row * 7 + (column - (this.showWeekNumber ? 1 : 0)) - this.offsetDay;
      return dateUtil.nextDate(this.startDate, offsetFromStart);
    },
    isWeekActive(cell) {
      if (this.selectionMode !== "week") {
        return false;
      }
      const newDate = new Date(this.year, this.month, 1);
      const year = newDate.getFullYear();
      const month = newDate.getMonth();
      if (cell.type === "prev-month") {
        newDate.setMonth(month === 0 ? 11 : month - 1);
        newDate.setFullYear(month === 0 ? year - 1 : year);
      }
      if (cell.type === "next-month") {
        newDate.setMonth(month === 11 ? 0 : month + 1);
        newDate.setFullYear(month === 11 ? year + 1 : year);
      }
      newDate.setDate(Number.parseInt(cell.text, 10));
      if (dateUtil.isDate(this.value)) {
        const dayOffset = (this.value.getDay() - this.firstDayOfWeek + 7) % 7 - 1;
        const weekDate = dateUtil.prevDate(this.value, dayOffset);
        return weekDate.getTime() === newDate.getTime();
      }
      return false;
    },
    markRange(minDate, maxDate) {
      minDate = getDateTimestamp(minDate);
      maxDate = getDateTimestamp(maxDate) || minDate;
      [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
      const startDate = this.startDate;
      const rows = this.rows;
      for (let i = 0, k = rows.length; i < k; i++) {
        const row = rows[i];
        for (let j = 0, l = row.length; j < l; j++) {
          if (this.showWeekNumber && j === 0) {
            continue;
          }
          const cell = row[j];
          const index = i * 7 + j + (this.showWeekNumber ? -1 : 0);
          const time = dateUtil.nextDate(startDate, index - this.offsetDay).getTime();
          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
        }
      }
    },
    handleMouseMove(event) {
      let target = event.target;
      if (target.tagName === "SPAN") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD") {
        this.$emit("cell-hover", null);
        return;
      }
      const row = target.parentNode.rowIndex - 1;
      const column = target.cellIndex;
      const cell = this.rows[row] && this.rows[row][column];
      if (!cell || cell.type === "week") {
        this.$emit("cell-hover", null);
        return;
      }
      if (!cell.disabled) {
        this.$emit("cell-hover", this.getDateOfCell(row, column));
      } else {
        this.$emit("cell-hover", null);
      }
      if (!this.rangeState.selecting) {
        return;
      }
      if (cell.disabled) {
        return;
      }
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit("changerange", {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.getDateOfCell(row, column)
          }
        });
      }
    },
    handleMouseLeave() {
      this.$emit("cell-hover", null);
    },
    handleClick(event) {
      let target = event.target;
      if (target.tagName === "SPAN") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD") {
        return;
      }
      const row = target.parentNode.rowIndex - 1;
      const column = this.selectionMode === "week" ? 1 : target.cellIndex;
      const cell = this.rows[row][column];
      if (cell.disabled || cell.type === "week") {
        return;
      }
      const newDate = this.getDateOfCell(row, column);
      if (this.selectionMode === "range") {
        if (!this.rangeState.selecting) {
          this.$emit("pick", { minDate: newDate, maxDate: null });
          this.rangeState.selecting = true;
        } else {
          if (newDate >= this.minDate) {
            this.$emit("pick", { minDate: this.minDate, maxDate: newDate });
          } else {
            this.$emit("pick", { minDate: newDate, maxDate: this.minDate });
          }
          this.rangeState.selecting = false;
        }
      } else if (this.selectionMode === "day") {
        this.$emit("pick", newDate);
      } else if (this.selectionMode === "week") {
        const weekNumber = dateUtil.getWeekNumber(newDate);
        const value = `${newDate.getFullYear()}w${weekNumber}`;
        this.$emit("pick", {
          year: newDate.getFullYear(),
          week: weekNumber,
          value,
          date: newDate
        });
      } else if (this.selectionMode === "dates") {
        const value = this.value || [];
        const newValue = cell.selected ? removeFromArray$1(value, (date) => date.getTime() === newDate.getTime()) : [...value, newDate];
        this.$emit("pick", newValue);
      }
    }
  }
};
var _sfc_render$8 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("table", { staticClass: "el-date-table-v2", class: { "is-week-mode": _vm.selectionMode === "week" }, attrs: { "cellspacing": "0", "cellpadding": "0" }, on: { "click": _vm.handleClick, "mousemove": _vm.handleMouseMove, "mouseleave": _vm.handleMouseLeave } }, [_c("tbody", [_c("tr", [_vm.showWeekNumber ? _c("th", [_vm._v(" " + _vm._s(_vm.t("el.datepicker.week")) + " ")]) : _vm._e(), _vm._l(_vm.WEEKS, function(week, key) {
    return _c("th", { key }, [_vm._v(" " + _vm._s(_vm.t(`el.datepicker.weeks.${week}`)) + " ")]);
  })], 2), _vm._l(_vm.rows, function(row, key) {
    return _c("tr", { key, staticClass: "el-date-table-v2__row", class: { current: _vm.isWeekActive(row[1]) } }, _vm._l(row, function(cell, key2) {
      return _c("td", { key: key2, class: _vm.getCellClasses(cell) }, [_c("div", [_c("span", [_vm._v(" " + _vm._s(cell.text) + " ")])])]);
    }), 0);
  })], 2)]);
};
var _sfc_staticRenderFns$8 = [];
var __component__$8 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$8,
  _sfc_render$8,
  _sfc_staticRenderFns$8,
  false
);
const DateTable = __component__$8.exports;
const HOURS = Array.from({ length: 24 }, (_, index) => index);
const MINUTES = Array.from({ length: 60 }, (_, index) => index);
const SECONDS = Array.from({ length: 60 }, (_, index) => index);
const _sfc_main$7 = {
  components: { ElScrollbar },
  directives: {
    repeatClick: repeatClick.RepeatClick
  },
  props: {
    date: {},
    defaultValue: {},
    // reserved for future use
    showSeconds: {
      type: Boolean,
      default: true
    },
    arrowControl: Boolean,
    amPmMode: {
      type: String,
      default: ""
      // 'a': am/pm; 'A': AM/PM
    }
  },
  data() {
    return {
      selectableRange: [],
      currentScrollbar: "hours"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.adjustSpinners(true);
    });
  },
  computed: {
    hours() {
      return this.date.getHours();
    },
    minutes() {
      return this.date.getMinutes();
    },
    seconds() {
      return this.date.getSeconds();
    },
    hoursList() {
      return dateUtil.getRangeHours(this.selectableRange);
    },
    minutesList() {
      return dateUtil.getRangeMinutes(this.selectableRange, this.hours);
    },
    arrowHourList() {
      const hours = this.hours;
      return [
        hours > 0 ? hours - 1 : void 0,
        hours,
        hours < 23 ? hours + 1 : void 0
      ];
    },
    arrowMinuteList() {
      const minutes = this.minutes;
      return [
        minutes > 0 ? minutes - 1 : void 0,
        minutes,
        minutes < 59 ? minutes + 1 : void 0
      ];
    },
    arrowSecondList() {
      const seconds = this.seconds;
      return [
        seconds > 0 ? seconds - 1 : void 0,
        seconds,
        seconds < 59 ? seconds + 1 : void 0
      ];
    },
    availableHourValues() {
      return HOURS.filter((hour) => !this.hoursList[hour]);
    },
    availableMinuteValues() {
      return MINUTES.filter((minute) => !!this.minutesList[minute]);
    },
    hourOptions() {
      return HOURS;
    },
    minuteOptions() {
      return MINUTES;
    },
    secondOptions() {
      return SECONDS;
    }
  },
  methods: {
    increase() {
      this.scrollDown(1);
    },
    decrease() {
      this.scrollDown(-1);
    },
    modifyDateField(type, value, emitSource) {
      let nextDate = this.date;
      switch (type) {
        case "hours":
          nextDate = dateUtil.modifyTime(this.date, value, this.minutes, this.seconds);
          break;
        case "minutes":
          nextDate = dateUtil.modifyTime(this.date, this.hours, value, this.seconds);
          break;
        case "seconds":
          nextDate = dateUtil.modifyTime(this.date, this.hours, this.minutes, value);
          break;
      }
      this.$emit("change", nextDate, emitSource);
    },
    handleClick(type, value, disabled = false) {
      if (disabled) {
        return;
      }
      this.modifyDateField(type, value, "click");
      this.emitSelectRange(type);
      this.emitHoverPreview(type, value);
      this.$nextTick(() => {
        this.scrollToValue(type, value);
      });
    },
    emitSelectRange(type) {
      if (type === "hours") {
        this.$emit("select-range", 0, 2);
      } else if (type === "minutes") {
        this.$emit("select-range", 3, 5);
      } else if (type === "seconds") {
        this.$emit("select-range", 6, 8);
      }
      this.currentScrollbar = type;
    },
    scrollDown(step) {
      if (!step) {
        return;
      }
      if (!this.currentScrollbar) {
        this.emitSelectRange("hours");
      }
      const type = this.currentScrollbar || "hours";
      const values = this.getAvailableValues(type);
      if (!values.length) {
        return;
      }
      const current = this.getCurrentValue(type);
      const currentIndex = values.indexOf(current);
      const direction = step > 0 ? 1 : -1;
      const len = values.length;
      if (currentIndex === -1) {
        const fallbackIndex = direction > 0 ? 0 : len - 1;
        this.modifyDateField(type, values[fallbackIndex], "scroll");
        this.$nextTick(() => {
          this.emitSelectRange(type);
          this.scrollToValue(type, values[fallbackIndex]);
          this.emitHoverPreview(type, values[fallbackIndex]);
        });
        return;
      }
      let nextIndex = currentIndex;
      let remaining = Math.abs(step);
      while (remaining > 0) {
        nextIndex = (nextIndex + direction + len) % len;
        remaining--;
      }
      this.modifyDateField(type, values[nextIndex], "scroll");
      this.$nextTick(() => {
        this.emitSelectRange(type);
        this.scrollToValue(type, values[nextIndex]);
        this.emitHoverPreview(type, values[nextIndex]);
      });
    },
    getAvailableValues(type) {
      if (type === "hours") {
        return this.availableHourValues;
      }
      if (type === "minutes") {
        return this.availableMinuteValues;
      }
      return SECONDS;
    },
    getCurrentValue(type) {
      if (type === "hours") {
        return this.hours;
      }
      if (type === "minutes") {
        return this.minutes;
      }
      return this.seconds;
    },
    amPm(hour) {
      const shouldShowAmPm = this.amPmMode.toLowerCase() === "a";
      if (!shouldShowAmPm) {
        return "";
      }
      const isCapital = this.amPmMode === "A";
      let content = hour < 12 ? " am" : " pm";
      if (isCapital) {
        content = content.toUpperCase();
      }
      return content;
    },
    isHourDisabled(hour) {
      return !!this.hoursList[hour];
    },
    isMinuteDisabled(minute) {
      return !this.minutesList[minute];
    },
    formatHour(hour) {
      return `0${this.amPmMode ? hour % 12 || 12 : hour}`.slice(-2);
    },
    formatUnit(value) {
      return `0${value}`.slice(-2);
    },
    adjustSpinners(instant = false) {
      this.scrollToValue("hours", this.hours, instant);
      this.scrollToValue("minutes", this.minutes, instant);
      if (this.showSeconds) {
        this.scrollToValue("seconds", this.seconds, instant);
      }
    },
    scrollToValue(type, value, instant = false) {
      const scrollbar = this.$refs[type];
      if (!scrollbar || !scrollbar.wrap) {
        return;
      }
      const wrap = scrollbar.wrap;
      const selector = `.el-time-spinner-v2__item[data-value="${value}"]`;
      const target = wrap.querySelector(selector);
      if (!target) {
        return;
      }
      const top = target.offsetTop;
      if (instant) {
        if (typeof wrap.scrollTo === "function") {
          try {
            wrap.scrollTo({ top });
          } catch (_error) {
            wrap.scrollTo(0, top);
          }
        }
        wrap.scrollTop = top;
        return;
      }
      if (typeof wrap.scrollTo === "function") {
        try {
          wrap.scrollTo({ top, behavior: "smooth" });
        } catch (_error) {
          wrap.scrollTo(0, top);
        }
      } else {
        wrap.scrollTop = top;
      }
    },
    handleHover(type, value, disabled = false) {
      if (disabled || value === void 0) {
        return;
      }
      this.emitHover(this.computePreviewDate(type, value));
    },
    emitHover(date) {
      this.$emit("hover", date);
    },
    emitHoverPreview(type, value) {
      this.emitHover(this.computePreviewDate(type, value));
    },
    computePreviewDate(type, value) {
      const hours = type === "hours" ? value : this.hours;
      const minutes = type === "minutes" ? value : this.minutes;
      const seconds = type === "seconds" ? value : this.seconds;
      return dateUtil.modifyTime(this.date, hours, minutes, seconds);
    }
  }
};
var _sfc_render$7 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-time-spinner-v2", class: { "has-seconds": _vm.showSeconds } }, [!_vm.arrowControl ? [_c("ElScrollbar", { ref: "hours", staticClass: "el-time-spinner-v2__wrapper", attrs: { "view-class": "el-time-spinner-v2__list", "noresize": "", "tag": "ul" }, nativeOn: { "mouseenter": function($event) {
    return _vm.emitSelectRange("hours");
  }, "mouseleave": function($event) {
    return _vm.emitHover(null);
  } } }, _vm._l(_vm.hourOptions, function(hour) {
    return _c("li", { key: hour, staticClass: "el-time-spinner-v2__item", class: { active: hour === _vm.hours, disabled: _vm.isHourDisabled(hour) }, attrs: { "data-value": hour }, on: { "click": function($event) {
      _vm.handleClick("hours", hour, _vm.isHourDisabled(hour));
    }, "mouseenter": function($event) {
      _vm.handleHover("hours", hour, _vm.isHourDisabled(hour));
    } } }, [_vm._v(" " + _vm._s(_vm.formatHour(hour)) + _vm._s(_vm.amPm(hour)) + " ")]);
  }), 0), _c("ElScrollbar", { ref: "minutes", staticClass: "el-time-spinner-v2__wrapper", attrs: { "view-class": "el-time-spinner-v2__list", "noresize": "", "tag": "ul" }, nativeOn: { "mouseenter": function($event) {
    return _vm.emitSelectRange("minutes");
  }, "mouseleave": function($event) {
    return _vm.emitHover(null);
  } } }, _vm._l(_vm.minuteOptions, function(minute) {
    return _c("li", { key: minute, staticClass: "el-time-spinner-v2__item", class: { active: minute === _vm.minutes, disabled: _vm.isMinuteDisabled(minute) }, attrs: { "data-value": minute }, on: { "click": function($event) {
      _vm.handleClick("minutes", minute, _vm.isMinuteDisabled(minute));
    }, "mouseenter": function($event) {
      _vm.handleHover("minutes", minute, _vm.isMinuteDisabled(minute));
    } } }, [_vm._v(" " + _vm._s(_vm.formatUnit(minute)) + " ")]);
  }), 0), _vm.showSeconds ? _c("ElScrollbar", { ref: "seconds", staticClass: "el-time-spinner-v2__wrapper", attrs: { "view-class": "el-time-spinner-v2__list", "noresize": "", "tag": "ul" }, nativeOn: { "mouseenter": function($event) {
    return _vm.emitSelectRange("seconds");
  }, "mouseleave": function($event) {
    return _vm.emitHover(null);
  } } }, _vm._l(_vm.secondOptions, function(second) {
    return _c("li", { key: second, staticClass: "el-time-spinner-v2__item", class: { active: second === _vm.seconds }, attrs: { "data-value": second }, on: { "click": function($event) {
      return _vm.handleClick("seconds", second);
    }, "mouseenter": function($event) {
      return _vm.handleHover("seconds", second, false);
    } } }, [_vm._v(" " + _vm._s(_vm.formatUnit(second)) + " ")]);
  }), 0) : _vm._e()] : _vm._e(), _vm.arrowControl ? [_c("div", { staticClass: "el-time-spinner-v2__wrapper is-arrow", on: { "mouseenter": function($event) {
    return _vm.emitSelectRange("hours");
  }, "mouseleave": function($event) {
    return _vm.emitHover(null);
  } } }, [_c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.decrease, expression: "decrease" }], staticClass: "el-time-spinner-v2__arrow el-icon-arrow-up" }), _c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.increase, expression: "increase" }], staticClass: "el-time-spinner-v2__arrow el-icon-arrow-down" }), _c("ul", { staticClass: "el-time-spinner-v2__list" }, _vm._l(_vm.arrowHourList, function(hour, key) {
    return _c("li", { key, staticClass: "el-time-spinner-v2__item", class: { active: hour === _vm.hours, disabled: hour === void 0 || _vm.isHourDisabled(hour) }, on: { "click": function($event) {
      hour === void 0 || _vm.isHourDisabled(hour) ? void 0 : _vm.handleClick("hours", hour);
    }, "mouseenter": function($event) {
      _vm.handleHover("hours", hour, hour === void 0 || _vm.isHourDisabled(hour));
    } } }, [_vm._v(" " + _vm._s(hour === void 0 ? "" : `${_vm.formatHour(hour)}${_vm.amPm(hour)}`) + " ")]);
  }), 0)]), _c("div", { staticClass: "el-time-spinner-v2__wrapper is-arrow", on: { "mouseenter": function($event) {
    return _vm.emitSelectRange("minutes");
  }, "mouseleave": function($event) {
    return _vm.emitHover(null);
  } } }, [_c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.decrease, expression: "decrease" }], staticClass: "el-time-spinner-v2__arrow el-icon-arrow-up" }), _c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.increase, expression: "increase" }], staticClass: "el-time-spinner-v2__arrow el-icon-arrow-down" }), _c("ul", { staticClass: "el-time-spinner-v2__list" }, _vm._l(_vm.arrowMinuteList, function(minute, key) {
    return _c("li", { key, staticClass: "el-time-spinner-v2__item", class: { active: minute === _vm.minutes, disabled: minute === void 0 || _vm.isMinuteDisabled(minute) }, on: { "click": function($event) {
      minute === void 0 || _vm.isMinuteDisabled(minute) ? void 0 : _vm.handleClick("minutes", minute);
    }, "mouseenter": function($event) {
      _vm.handleHover("minutes", minute, minute === void 0 || _vm.isMinuteDisabled(minute));
    } } }, [_vm._v(" " + _vm._s(minute === void 0 ? "" : _vm.formatUnit(minute)) + " ")]);
  }), 0)]), _vm.showSeconds ? _c("div", { staticClass: "el-time-spinner-v2__wrapper is-arrow", on: { "mouseenter": function($event) {
    return _vm.emitSelectRange("seconds");
  }, "mouseleave": function($event) {
    return _vm.emitHover(null);
  } } }, [_c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.decrease, expression: "decrease" }], staticClass: "el-time-spinner-v2__arrow el-icon-arrow-up" }), _c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.increase, expression: "increase" }], staticClass: "el-time-spinner-v2__arrow el-icon-arrow-down" }), _c("ul", { staticClass: "el-time-spinner-v2__list" }, _vm._l(_vm.arrowSecondList, function(second, key) {
    return _c("li", { key, staticClass: "el-time-spinner-v2__item", class: { active: second === _vm.seconds, disabled: second === void 0 }, on: { "click": function($event) {
      second === void 0 ? void 0 : _vm.handleClick("seconds", second);
    }, "mouseenter": function($event) {
      return _vm.handleHover("seconds", second, second === void 0);
    } } }, [_vm._v(" " + _vm._s(second === void 0 ? "" : _vm.formatUnit(second)) + " ")]);
  }), 0)]) : _vm._e()] : _vm._e()], 2);
};
var _sfc_staticRenderFns$7 = [];
var __component__$7 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$7,
  _sfc_render$7,
  _sfc_staticRenderFns$7,
  false
);
const TimeSpinner = __component__$7.exports;
const _sfc_main$6 = {
  components: {
    TimeSpinner
  },
  mixins: [locale.Locale],
  props: {
    visible: Boolean,
    timeArrowControl: Boolean
  },
  data() {
    return {
      popperClass: "",
      format: "HH:mm:ss",
      value: "",
      defaultValue: null,
      date: /* @__PURE__ */ new Date(),
      oldValue: /* @__PURE__ */ new Date(),
      selectableRange: [],
      selectionRange: [0, 2],
      disabled: false,
      arrowControl: false,
      needInitAdjust: true
    };
  },
  computed: {
    showSeconds() {
      return (this.format || "").includes("ss");
    },
    useArrow() {
      return this.arrowControl || this.timeArrowControl || false;
    },
    amPmMode() {
      if ((this.format || "").includes("A")) {
        return "A";
      }
      if ((this.format || "").includes("a")) {
        return "a";
      }
      return "";
    },
    displayedTime() {
      return dateUtil.isDate(this.date) ? dateUtil.formatDate(this.date, this.format || "HH:mm:ss") : "";
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.oldValue = this.value;
        this.$nextTick(() => {
          const spinner = this.$refs.spinner;
          if (!spinner) {
            return;
          }
          this.adjustSpinners(true);
          spinner.emitSelectRange("hours");
          this.needInitAdjust = false;
        });
      } else {
        this.needInitAdjust = true;
        this.$emit("dodestroy");
      }
    },
    value(newVal) {
      let date;
      if (newVal instanceof Date) {
        date = dateUtil.limitTimeRange(newVal, this.selectableRange, this.format);
      } else if (!newVal) {
        date = this.defaultValue ? new Date(this.defaultValue) : dateUtil.clearTime(/* @__PURE__ */ new Date());
      }
      this.date = date;
      if (this.visible && this.needInitAdjust) {
        this.$nextTick((_) => this.adjustSpinners(true));
        this.needInitAdjust = false;
      }
    },
    selectableRange(val) {
      this.$refs.spinner.selectableRange = val;
    },
    defaultValue(val) {
      if (!dateUtil.isDate(this.value)) {
        this.date = val ? new Date(val) : /* @__PURE__ */ new Date();
      }
    }
  },
  mounted() {
    this.$nextTick(() => this.handleConfirm(true, true));
    this.$emit("mounted");
  },
  methods: {
    handleCancel() {
      this.$emit("pick", this.oldValue, false);
    },
    handleChange(date, source) {
      if (this.visible) {
        this.date = dateUtil.clearMilliseconds(date);
        if (this.isValidValue(this.date)) {
          const payload = source === "click" ? [this.date, true, "click"] : [this.date, true, "preview"];
          this.$emit("pick", ...payload);
        }
      }
    },
    setSelectionRange(start, end) {
      this.$emit("select-range", start, end);
      this.selectionRange = [start, end];
    },
    handleConfirm(visible = false, first) {
      if (first) {
        return;
      }
      const date = dateUtil.clearMilliseconds(dateUtil.limitTimeRange(this.date, this.selectableRange, this.format));
      this.$emit("pick", date, visible, first);
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
        this.$refs.spinner.scrollDown(step);
        event.preventDefault();
      }
    },
    isValidValue(date) {
      return dateUtil.timeWithinRange(date, this.selectableRange, this.format);
    },
    adjustSpinners(instant = false) {
      return this.$refs.spinner.adjustSpinners(instant);
    },
    changeSelectionRange(step) {
      const list = [0, 3].concat(this.showSeconds ? [6] : []);
      const mapping = ["hours", "minutes"].concat(this.showSeconds ? ["seconds"] : []);
      const index = list.indexOf(this.selectionRange[0]);
      const next = (index + step + list.length) % list.length;
      this.$refs.spinner.emitSelectRange(mapping[next]);
    },
    handleHover(date) {
      if (!this.visible) {
        this.$emit("hover-date", null);
        return;
      }
      if (!date) {
        this.$emit("hover-date", null);
        return;
      }
      const normalized = dateUtil.clearMilliseconds(dateUtil.limitTimeRange(date, this.selectableRange, this.format));
      if (!this.isValidValue(normalized)) {
        return;
      }
      this.$emit("hover-date", normalized);
    }
  }
};
var _sfc_render$6 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-time-panel-v2", class: _vm.popperClass }, [_c("div", { staticClass: "el-time-panel-v2__current" }, [_vm._v(" " + _vm._s(_vm.displayedTime) + " ")]), _c("div", { staticClass: "el-time-panel-v2__content", class: { "has-seconds": _vm.showSeconds } }, [_c("TimeSpinner", { ref: "spinner", attrs: { "arrow-control": _vm.useArrow, "show-seconds": _vm.showSeconds, "am-pm-mode": _vm.amPmMode, "date": _vm.date }, on: { "change": _vm.handleChange, "select-range": _vm.setSelectionRange, "hover": _vm.handleHover } })], 1)]);
};
var _sfc_staticRenderFns$6 = [];
var __component__$6 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false
);
const TimePicker = __component__$6.exports;
function calcDefaultValue$1(defaultValue) {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), dateUtil.nextDate(new Date(defaultValue), 1)];
  } else {
    return [/* @__PURE__ */ new Date(), dateUtil.nextDate(/* @__PURE__ */ new Date(), 1)];
  }
}
const _sfc_main$5 = {
  directives: { Clickoutside: clickoutside.Clickoutside },
  components: { TimePicker, DateTable, ElInput, ElButton },
  mixins: [locale.Locale],
  data() {
    return {
      popperClass: "",
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: "",
      maxDate: "",
      leftDate: /* @__PURE__ */ new Date(),
      rightDate: dateUtil.nextMonth(/* @__PURE__ */ new Date()),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      showTime: false,
      shortcuts: "",
      visible: "",
      disabledDate: "",
      cellClassName: "",
      firstDayOfWeek: 7,
      minTimePickerVisible: false,
      maxTimePickerVisible: false,
      format: "",
      arrowControl: false,
      unlinkPanels: false,
      dateUserInput: {
        min: null,
        max: null
      },
      timeUserInput: {
        min: null,
        max: null
      }
    };
  },
  computed: {
    btnDisabled() {
      return !(this.minDate && this.maxDate && !this.selecting && this.isValidValue([this.minDate, this.maxDate]));
    },
    leftLabel() {
      return `${this.leftDate.getFullYear()} ${this.t("el.datepicker.year")} ${this.t(`el.datepicker.month${this.leftDate.getMonth() + 1}`)}`;
    },
    rightLabel() {
      return `${this.rightDate.getFullYear()} ${this.t("el.datepicker.year")} ${this.t(`el.datepicker.month${this.rightDate.getMonth() + 1}`)}`;
    },
    leftYear() {
      return this.leftDate.getFullYear();
    },
    leftMonth() {
      return this.leftDate.getMonth();
    },
    leftMonthDate() {
      return this.leftDate.getDate();
    },
    rightYear() {
      return this.rightDate.getFullYear();
    },
    rightMonth() {
      return this.rightDate.getMonth();
    },
    rightMonthDate() {
      return this.rightDate.getDate();
    },
    minVisibleDate() {
      if (this.dateUserInput.min !== null) {
        return this.dateUserInput.min;
      }
      if (this.minDate) {
        return dateUtil.formatDate(this.minDate, this.dateFormat);
      }
      return "";
    },
    maxVisibleDate() {
      if (this.dateUserInput.max !== null) {
        return this.dateUserInput.max;
      }
      if (this.maxDate || this.minDate) {
        return dateUtil.formatDate(this.maxDate || this.minDate, this.dateFormat);
      }
      return "";
    },
    minVisibleTime() {
      if (this.timeUserInput.min !== null) {
        return this.timeUserInput.min;
      }
      if (this.minDate) {
        return dateUtil.formatDate(this.minDate, this.timeFormat);
      }
      return "";
    },
    maxVisibleTime() {
      if (this.timeUserInput.max !== null) {
        return this.timeUserInput.max;
      }
      if (this.maxDate || this.minDate) {
        return dateUtil.formatDate(this.maxDate || this.minDate, this.timeFormat);
      }
      return "";
    },
    timeFormat() {
      if (this.format) {
        return dateUtil.extractTimeFormat(this.format);
      } else {
        return "HH:mm:ss";
      }
    },
    dateFormat() {
      if (this.format) {
        return dateUtil.extractDateFormat(this.format);
      } else {
        return "yyyy-MM-dd";
      }
    },
    enableMonthArrow() {
      const nextMonth2 = (this.leftMonth + 1) % 12;
      const yearOffset = this.leftMonth + 1 >= 12 ? 1 : 0;
      return this.unlinkPanels && new Date(this.leftYear + yearOffset, nextMonth2) < new Date(this.rightYear, this.rightMonth);
    },
    enableYearArrow() {
      return this.unlinkPanels && this.rightYear * 12 + this.rightMonth - (this.leftYear * 12 + this.leftMonth + 1) >= 12;
    }
  },
  watch: {
    minDate(val) {
      this.dateUserInput.min = null;
      this.timeUserInput.min = null;
      this.$nextTick(() => {
        if (this.$refs.maxTimePicker && this.maxDate && this.maxDate < this.minDate) {
          const format = "HH:mm:ss";
          this.$refs.maxTimePicker.selectableRange = [
            [
              dateUtil.parseDate(dateUtil.formatDate(this.minDate, format), format),
              dateUtil.parseDate("23:59:59", format)
            ]
          ];
        }
      });
      if (val && this.$refs.minTimePicker) {
        this.$refs.minTimePicker.date = val;
        this.$refs.minTimePicker.value = val;
      }
    },
    maxDate(val) {
      this.dateUserInput.max = null;
      this.timeUserInput.max = null;
      if (val && this.$refs.maxTimePicker) {
        this.$refs.maxTimePicker.date = val;
        this.$refs.maxTimePicker.value = val;
      }
    },
    minTimePickerVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.minTimePicker.date = this.minDate;
          this.$refs.minTimePicker.value = this.minDate;
          this.$refs.minTimePicker.adjustSpinners(true);
        });
      }
    },
    maxTimePickerVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.maxTimePicker.date = this.maxDate;
          this.$refs.maxTimePicker.value = this.maxDate;
          this.$refs.maxTimePicker.adjustSpinners(true);
        });
      }
    },
    value(newVal) {
      if (!newVal) {
        this.minDate = null;
        this.maxDate = null;
      } else if (Array.isArray(newVal)) {
        this.minDate = dateUtil.isDate(newVal[0]) ? new Date(newVal[0]) : null;
        this.maxDate = dateUtil.isDate(newVal[1]) ? new Date(newVal[1]) : null;
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            const minDateYear = this.minDate.getFullYear();
            const minDateMonth = this.minDate.getMonth();
            const maxDateYear = this.maxDate.getFullYear();
            const maxDateMonth = this.maxDate.getMonth();
            this.rightDate = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? dateUtil.nextMonth(this.maxDate) : this.maxDate;
          } else {
            this.rightDate = dateUtil.nextMonth(this.leftDate);
          }
        } else {
          this.leftDate = calcDefaultValue$1(this.defaultValue)[0];
          this.rightDate = dateUtil.nextMonth(this.leftDate);
        }
      }
    },
    defaultValue(val) {
      if (!Array.isArray(this.value)) {
        const [left, right] = calcDefaultValue$1(val);
        this.leftDate = left;
        this.rightDate = val && val[1] && this.unlinkPanels ? right : dateUtil.nextMonth(this.leftDate);
      }
    }
  },
  methods: {
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = calcDefaultValue$1(this.defaultValue)[0];
      this.rightDate = dateUtil.nextMonth(this.leftDate);
      this.$emit("pick", null);
    },
    handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },
    handleDateInput(value, type) {
      this.dateUserInput[type] = value;
      if (value.length !== this.dateFormat.length) {
        return;
      }
      const parsedValue = dateUtil.parseDate(value, this.dateFormat);
      if (parsedValue) {
        if (typeof this.disabledDate === "function" && this.disabledDate(new Date(parsedValue))) {
          return;
        }
        if (type === "min") {
          this.minDate = dateUtil.modifyDate(this.minDate || /* @__PURE__ */ new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          this.leftDate = new Date(parsedValue);
          if (!this.unlinkPanels) {
            this.rightDate = dateUtil.nextMonth(this.leftDate);
          }
        } else {
          this.maxDate = dateUtil.modifyDate(this.maxDate || /* @__PURE__ */ new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          this.rightDate = new Date(parsedValue);
          if (!this.unlinkPanels) {
            this.leftDate = dateUtil.prevMonth(parsedValue);
          }
        }
      }
    },
    handleDateChange(value, type) {
      const parsedValue = dateUtil.parseDate(value, this.dateFormat);
      if (parsedValue) {
        if (type === "min") {
          this.minDate = dateUtil.modifyDate(this.minDate, parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          if (this.minDate > this.maxDate) {
            this.maxDate = this.minDate;
          }
        } else {
          this.maxDate = dateUtil.modifyDate(this.maxDate, parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
          if (this.maxDate < this.minDate) {
            this.minDate = this.maxDate;
          }
        }
      }
    },
    handleTimeInput(value, type) {
      this.timeUserInput[type] = value;
      if (value.length !== this.timeFormat.length) {
        return;
      }
      const parsedValue = dateUtil.parseDate(value, this.timeFormat);
      if (parsedValue) {
        if (type === "min") {
          this.minDate = dateUtil.modifyTime(this.minDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          this.$nextTick((_) => this.$refs.minTimePicker.adjustSpinners(true));
        } else {
          this.maxDate = dateUtil.modifyTime(this.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          this.$nextTick((_) => this.$refs.maxTimePicker.adjustSpinners(true));
        }
      }
    },
    handleTimeChange(value, type) {
      const parsedValue = dateUtil.parseDate(value, this.timeFormat);
      if (parsedValue) {
        if (type === "min") {
          this.minDate = dateUtil.modifyTime(this.minDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          if (this.minDate > this.maxDate) {
            this.maxDate = this.minDate;
          }
          this.$refs.minTimePicker.value = this.minDate;
          this.minTimePickerVisible = false;
        } else {
          this.maxDate = dateUtil.modifyTime(this.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          if (this.maxDate < this.minDate) {
            this.minDate = this.maxDate;
          }
          this.$refs.maxTimePicker.value = this.minDate;
          this.maxTimePickerVisible = false;
        }
      }
    },
    handleRangePick(val, close = true) {
      const defaultTime = this.defaultTime || [];
      const minDate = dateUtil.modifyWithTimeString(val.minDate, defaultTime[0]);
      const maxDate = dateUtil.modifyWithTimeString(val.maxDate, defaultTime[1]);
      if (this.maxDate === maxDate && this.minDate === minDate) {
        return;
      }
      this.onPick && this.onPick(val);
      this.maxDate = maxDate;
      this.minDate = minDate;
      setTimeout(() => {
        this.maxDate = maxDate;
        this.minDate = minDate;
      }, 10);
      if (!close || this.showTime) {
        return;
      }
      this.handleConfirm();
    },
    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },
    handleMinTimePick(value, visible, first) {
      this.minDate = this.minDate || /* @__PURE__ */ new Date();
      if (value) {
        this.minDate = dateUtil.modifyTime(this.minDate, value.getHours(), value.getMinutes(), value.getSeconds());
      }
      if (!first) {
        this.minTimePickerVisible = visible;
      }
      const maxDateLessThanMin = this.maxDate ? this.maxDate.getTime() < this.minDate.getTime() : false;
      if (!this.maxDate || maxDateLessThanMin) {
        this.maxDate = new Date(this.minDate);
      }
    },
    handleMinTimeClose() {
      this.minTimePickerVisible = false;
    },
    handleMaxTimePick(value, visible, first) {
      if (this.maxDate && value) {
        this.maxDate = dateUtil.modifyTime(this.maxDate, value.getHours(), value.getMinutes(), value.getSeconds());
      }
      if (!first) {
        this.maxTimePickerVisible = visible;
      }
      if (this.maxDate && this.minDate && this.minDate.getTime() > this.maxDate.getTime()) {
        this.minDate = new Date(this.maxDate);
      }
    },
    handleMaxTimeClose() {
      this.maxTimePickerVisible = false;
    },
    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear() {
      this.leftDate = dateUtil.prevYear(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = dateUtil.nextMonth(this.leftDate);
      }
    },
    leftPrevMonth() {
      this.leftDate = dateUtil.prevMonth(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = dateUtil.nextMonth(this.leftDate);
      }
    },
    rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = dateUtil.nextYear(this.leftDate);
        this.rightDate = dateUtil.nextMonth(this.leftDate);
      } else {
        this.rightDate = dateUtil.nextYear(this.rightDate);
      }
    },
    rightNextMonth() {
      if (!this.unlinkPanels) {
        this.leftDate = dateUtil.nextMonth(this.leftDate);
        this.rightDate = dateUtil.nextMonth(this.leftDate);
      } else {
        this.rightDate = dateUtil.nextMonth(this.rightDate);
      }
    },
    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear() {
      this.leftDate = dateUtil.nextYear(this.leftDate);
    },
    leftNextMonth() {
      this.leftDate = dateUtil.nextMonth(this.leftDate);
    },
    rightPrevYear() {
      this.rightDate = dateUtil.prevYear(this.rightDate);
    },
    rightPrevMonth() {
      this.rightDate = dateUtil.prevMonth(this.rightDate);
    },
    handleConfirm(visible = false) {
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit("pick", [this.minDate, this.maxDate], visible);
      }
    },
    isValidValue(value) {
      return Array.isArray(value) && value && value[0] && value[1] && dateUtil.isDate(value[0]) && dateUtil.isDate(value[1]) && value[0].getTime() <= value[1].getTime() && (typeof this.disabledDate === "function" ? !this.disabledDate(value[0]) && !this.disabledDate(value[1]) : true);
    },
    resetView() {
      if (this.minDate && this.maxDate == null) {
        this.rangeState.selecting = false;
      }
      this.minDate = this.value && dateUtil.isDate(this.value[0]) ? new Date(this.value[0]) : null;
      this.maxDate = this.value && dateUtil.isDate(this.value[0]) ? new Date(this.value[1]) : null;
    }
  }
};
var _sfc_render$5 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": function($event) {
    return _vm.$emit("dodestroy");
  } } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-picker-panel el-date-range-picker-v2 el-popper", class: [{
    "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts,
    "has-time": _vm.showTime
  }, _vm.popperClass] }, [_c("div", { staticClass: "el-picker-panel__body-wrapper" }, [_vm._t("sidebar"), _vm.shortcuts ? _c("div", { staticClass: "el-picker-panel__sidebar" }, _vm._l(_vm.shortcuts, function(shortcut, key) {
    return _c("button", { key, staticClass: "el-picker-panel__shortcut", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.handleShortcutClick(shortcut);
    } } }, [_vm._v(" " + _vm._s(shortcut.text) + " ")]);
  }), 0) : _vm._e(), _c("div", { staticClass: "el-picker-panel__body" }, [_vm.showTime ? _c("div", { staticClass: "el-date-range-picker-v2__time-header" }, [_c("span", { staticClass: "el-date-range-picker-v2__editors-wrap" }, [_c("span", { staticClass: "el-date-range-picker-v2__time-picker-wrap" }, [_c("ElInput", { staticClass: "el-date-range-picker-v2__editor", attrs: { "size": "small", "disabled": _vm.rangeState.selecting, "placeholder": _vm.t("el.datepicker.startDate"), "value": _vm.minVisibleDate }, on: { "input": (val) => _vm.handleDateInput(val, "min"), "change": (val) => _vm.handleDateChange(val, "min") } })], 1), _c("span", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleMinTimeClose, expression: "handleMinTimeClose" }], staticClass: "el-date-range-picker-v2__time-picker-wrap" }, [_c("ElInput", { staticClass: "el-date-range-picker-v2__editor", attrs: { "size": "small", "disabled": _vm.rangeState.selecting, "placeholder": _vm.t("el.datepicker.startTime"), "value": _vm.minVisibleTime }, on: { "focus": function($event) {
    _vm.minTimePickerVisible = true;
  }, "input": (val) => _vm.handleTimeInput(val, "min"), "change": (val) => _vm.handleTimeChange(val, "min") } }), _c("TimePicker", { ref: "minTimePicker", attrs: { "time-arrow-control": _vm.arrowControl, "visible": _vm.minTimePickerVisible }, on: { "pick": _vm.handleMinTimePick, "mounted": function($event) {
    _vm.$refs.minTimePicker.format = _vm.timeFormat;
  } } })], 1)]), _c("span", { staticClass: "el-icon-arrow-right" }), _c("span", { staticClass: "el-date-range-picker-v2__editors-wrap is-right" }, [_c("span", { staticClass: "el-date-range-picker-v2__time-picker-wrap" }, [_c("ElInput", { staticClass: "el-date-range-picker-v2__editor", attrs: { "size": "small", "disabled": _vm.rangeState.selecting, "placeholder": _vm.t("el.datepicker.endDate"), "value": _vm.maxVisibleDate, "readonly": !_vm.minDate }, on: { "input": (val) => _vm.handleDateInput(val, "max"), "change": (val) => _vm.handleDateChange(val, "max") } })], 1), _c("span", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleMaxTimeClose, expression: "handleMaxTimeClose" }], staticClass: "el-date-range-picker-v2__time-picker-wrap" }, [_c("ElInput", { staticClass: "el-date-range-picker-v2__editor", attrs: { "size": "small", "disabled": _vm.rangeState.selecting, "placeholder": _vm.t("el.datepicker.endTime"), "value": _vm.maxVisibleTime, "readonly": !_vm.minDate }, on: { "focus": function($event) {
    _vm.minDate && (_vm.maxTimePickerVisible = true);
  }, "input": (val) => _vm.handleTimeInput(val, "max"), "change": (val) => _vm.handleTimeChange(val, "max") } }), _c("TimePicker", { ref: "maxTimePicker", attrs: { "time-arrow-control": _vm.arrowControl, "visible": _vm.maxTimePickerVisible }, on: { "pick": _vm.handleMaxTimePick, "mounted": function($event) {
    _vm.$refs.maxTimePicker.format = _vm.timeFormat;
  } } })], 1)])]) : _vm._e(), _c("div", { staticClass: "el-picker-panel__content el-date-range-picker-v2__content is-left" }, [_c("div", { staticClass: "el-date-range-picker-v2__header" }, [_c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-left", attrs: { "type": "button" }, on: { "click": _vm.leftPrevYear } }), _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-arrow-left", attrs: { "type": "button" }, on: { "click": _vm.leftPrevMonth } }), _vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-right", class: { "is-disabled": !_vm.enableYearArrow }, attrs: { "type": "button", "disabled": !_vm.enableYearArrow }, on: { "click": _vm.leftNextYear } }) : _vm._e(), _vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-arrow-right", class: { "is-disabled": !_vm.enableMonthArrow }, attrs: { "type": "button", "disabled": !_vm.enableMonthArrow }, on: { "click": _vm.leftNextMonth } }) : _vm._e(), _c("div", [_vm._v(_vm._s(_vm.leftLabel))])]), _c("DateTable", { attrs: { "selection-mode": "range", "date": _vm.leftDate, "default-value": _vm.defaultValue, "min-date": _vm.minDate, "max-date": _vm.maxDate, "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate, "cell-class-name": _vm.cellClassName, "first-day-of-week": _vm.firstDayOfWeek }, on: { "changerange": _vm.handleChangeRange, "pick": _vm.handleRangePick } })], 1), _c("div", { staticClass: "el-picker-panel__content el-date-range-picker-v2__content is-right" }, [_c("div", { staticClass: "el-date-range-picker-v2__header" }, [_vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-left", class: { "is-disabled": !_vm.enableYearArrow }, attrs: { "type": "button", "disabled": !_vm.enableYearArrow }, on: { "click": _vm.rightPrevYear } }) : _vm._e(), _vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-arrow-left", class: { "is-disabled": !_vm.enableMonthArrow }, attrs: { "type": "button", "disabled": !_vm.enableMonthArrow }, on: { "click": _vm.rightPrevMonth } }) : _vm._e(), _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-right", attrs: { "type": "button" }, on: { "click": _vm.rightNextYear } }), _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-arrow-right", attrs: { "type": "button" }, on: { "click": _vm.rightNextMonth } }), _c("div", [_vm._v(_vm._s(_vm.rightLabel))])]), _c("DateTable", { attrs: { "selection-mode": "range", "date": _vm.rightDate, "default-value": _vm.defaultValue, "min-date": _vm.minDate, "max-date": _vm.maxDate, "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate, "cell-class-name": _vm.cellClassName, "first-day-of-week": _vm.firstDayOfWeek }, on: { "changerange": _vm.handleChangeRange, "pick": _vm.handleRangePick } })], 1)])], 2), _vm.showTime ? _c("div", { staticClass: "el-picker-panel__footer" }, [_c("ElButton", { staticClass: "el-picker-panel__link-btn", attrs: { "size": "mini", "type": "text" }, on: { "click": _vm.handleClear } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.clear")) + " ")]), _c("ElButton", { staticClass: "el-picker-panel__link-btn", attrs: { "plain": "", "size": "mini", "disabled": _vm.btnDisabled }, on: { "click": function($event) {
    return _vm.handleConfirm(false);
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.confirm")) + " ")])], 1) : _vm._e()])]);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false
);
const DateRangePanel = __component__$5.exports;
function datesInMonth(year, month) {
  const numOfDays = dateUtil.getDayCountOfMonth(year, month);
  const firstDay = new Date(year, month, 1);
  return dateUtil.range(numOfDays).map((n) => dateUtil.nextDate(firstDay, n));
}
function clearDate(date) {
  return new Date(date.getFullYear(), date.getMonth());
}
function getMonthTimestamp(time) {
  if (typeof time === "number" || typeof time === "string") {
    return clearDate(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return Number.NaN;
  }
}
function removeFromArray(arr, pred) {
  const idx = typeof pred === "function" ? util.arrayFindIndex(arr, pred) : arr.indexOf(pred);
  return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr;
}
const _sfc_main$4 = {
  mixins: [locale.Locale],
  props: {
    disabledDate: {},
    value: {},
    selectionMode: {
      default: "month"
    },
    minDate: {},
    maxDate: {},
    defaultValue: {
      validator(val) {
        return val === null || dateUtil.isDate(val) || Array.isArray(val) && val.every(dateUtil.isDate);
      }
    },
    date: {},
    rangeState: {
      default() {
        return {
          endDate: null,
          selecting: false
        };
      }
    }
  },
  data() {
    return {
      months: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
      lastRow: null,
      lastColumn: null
    };
  },
  computed: {
    rows() {
      const rows = Array.from({ length: 3 }, () => []);
      const disabledDate = this.disabledDate;
      const selectedDate = [];
      const now = getMonthTimestamp(/* @__PURE__ */ new Date());
      const minDateTimestamp = getMonthTimestamp(this.minDate);
      const maxDateTimestamp = getMonthTimestamp(this.maxDate);
      const hasMin = !Number.isNaN(minDateTimestamp);
      const hasMax = !Number.isNaN(maxDateTimestamp);
      for (let i = 0; i < 3; i++) {
        const row = rows[i];
        for (let j = 0; j < 4; j++) {
          const cell = {
            column: j,
            disabled: false,
            end: false,
            inRange: false,
            row: i,
            selected: false,
            start: false,
            text: 0,
            type: "normal"
          };
          const index = i * 4 + j;
          const time = new Date(this.date.getFullYear(), index).getTime();
          cell.inRange = hasMin && hasMax && time >= minDateTimestamp && time <= maxDateTimestamp;
          cell.start = Boolean(this.minDate) && time === minDateTimestamp;
          cell.end = Boolean(this.maxDate) && time === maxDateTimestamp;
          const isToday = time === now;
          if (isToday) {
            cell.type = "today";
          }
          cell.text = index;
          const cellDate = new Date(time);
          cell.disabled = typeof disabledDate === "function" && disabledDate(cellDate);
          cell.selected = util.arrayFind(selectedDate, (date) => date.getTime() === cellDate.getTime());
          row[j] = cell;
        }
      }
      return rows;
    }
  },
  watch: {
    "rangeState.endDate": function(newVal) {
      this.markRange(this.minDate, newVal);
    },
    minDate(newVal, oldVal) {
      if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    },
    maxDate(newVal, oldVal) {
      if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
        this.markRange(this.minDate, this.maxDate);
      }
    }
  },
  methods: {
    cellMatchesDate(cell, date) {
      const value = new Date(date);
      return this.date.getFullYear() === value.getFullYear() && Number(cell.text) === value.getMonth();
    },
    getCellStyle(cell) {
      const style = {};
      const year = this.date.getFullYear();
      const today = /* @__PURE__ */ new Date();
      const month = cell.text;
      const defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];
      style.disabled = typeof this.disabledDate === "function" ? datesInMonth(year, month).every(this.disabledDate) : false;
      style.current = util.arrayFindIndex(util.coerceTruthyValueToArray(this.value), (date) => date.getFullYear() === year && date.getMonth() === month) >= 0;
      style.today = today.getFullYear() === year && today.getMonth() === month;
      style.default = defaultValue.some((date) => this.cellMatchesDate(cell, date));
      if (cell.inRange) {
        style["in-range"] = true;
        if (cell.start) {
          style["start-date"] = true;
        }
        if (cell.end) {
          style["end-date"] = true;
        }
      }
      return style;
    },
    getMonthOfCell(month) {
      const year = this.date.getFullYear();
      return new Date(year, month, 1);
    },
    markRange(minDate, maxDate) {
      minDate = getMonthTimestamp(minDate);
      maxDate = getMonthTimestamp(maxDate) || minDate;
      [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
      const rows = this.rows;
      for (let i = 0, k = rows.length; i < k; i++) {
        const row = rows[i];
        for (let j = 0, l = row.length; j < l; j++) {
          const cell = row[j];
          const index = i * 4 + j;
          const time = new Date(this.date.getFullYear(), index).getTime();
          cell.inRange = minDate && time >= minDate && time <= maxDate;
          cell.start = minDate && time === minDate;
          cell.end = maxDate && time === maxDate;
        }
      }
    },
    handleMouseMove(event) {
      if (!this.rangeState.selecting) {
        return;
      }
      let target = event.target;
      if (target.tagName === "A") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD") {
        return;
      }
      const row = target.parentNode.rowIndex;
      const column = target.cellIndex;
      if (this.rows[row][column].disabled) {
        return;
      }
      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row;
        this.lastColumn = column;
        this.$emit("changerange", {
          minDate: this.minDate,
          maxDate: this.maxDate,
          rangeState: {
            selecting: true,
            endDate: this.getMonthOfCell(row * 4 + column)
          }
        });
      }
    },
    handleMonthTableClick(event) {
      let target = event.target;
      if (target.tagName === "A") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD") {
        return;
      }
      if (dom.hasClass(target, "disabled")) {
        return;
      }
      const column = target.cellIndex;
      const row = target.parentNode.rowIndex;
      const month = row * 4 + column;
      const newDate = this.getMonthOfCell(month);
      if (this.selectionMode === "range") {
        if (!this.rangeState.selecting) {
          this.$emit("pick", { minDate: newDate, maxDate: null });
          this.rangeState.selecting = true;
        } else {
          if (newDate >= this.minDate) {
            this.$emit("pick", { minDate: this.minDate, maxDate: newDate });
          } else {
            this.$emit("pick", { minDate: newDate, maxDate: this.minDate });
          }
          this.rangeState.selecting = false;
        }
      } else if (this.selectionMode === "months") {
        const value = this.value || [];
        const year = this.date.getFullYear();
        const newValue = util.arrayFindIndex(value, (date) => date.getFullYear() === year && date.getMonth() === month) >= 0 ? removeFromArray(value, (date) => date.getTime() === newDate.getTime()) : [...value, newDate];
        this.$emit("pick", newValue);
      } else {
        this.$emit("pick", month);
      }
    }
  }
};
var _sfc_render$4 = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("table", { staticClass: "el-month-table-v2", on: { "click": _vm.handleMonthTableClick, "mousemove": _vm.handleMouseMove } }, [_c("tbody", _vm._l(_vm.rows, function(row, key) {
    return _c("tr", { key }, _vm._l(row, function(cell, key2) {
      return _c("td", { key: key2, class: _vm.getCellStyle(cell) }, [_c("div", [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.t(`el.datepicker.months.${_vm.months[cell.text]}`)))])])]);
    }), 0);
  }), 0)]);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false
);
const MonthTable = __component__$4.exports;
function datesInYear(year) {
  const numOfDays = dateUtil.getDayCountOfYear(year);
  const firstDay = new Date(year, 0, 1);
  return dateUtil.range(numOfDays).map((n) => dateUtil.nextDate(firstDay, n));
}
const _sfc_main$3 = {
  props: {
    disabledDate: {},
    value: {},
    defaultValue: {
      validator(val) {
        return val === null || val instanceof Date && dateUtil.isDate(val);
      }
    },
    date: {},
    selectionMode: {}
  },
  computed: {
    startYear() {
      return Math.floor(this.date.getFullYear() / 10) * 10;
    }
  },
  methods: {
    getCellStyle(year) {
      const style = {};
      const today = /* @__PURE__ */ new Date();
      style.disabled = typeof this.disabledDate === "function" ? datesInYear(year).every(this.disabledDate) : false;
      style.current = util.arrayFindIndex(util.coerceTruthyValueToArray(this.value), (date) => date.getFullYear() === year) >= 0;
      style.today = today.getFullYear() === year;
      style.default = this.defaultValue && this.defaultValue.getFullYear() === year;
      return style;
    },
    handleYearTableClick(event) {
      const target = event.target;
      if (target.tagName === "A") {
        if (dom.hasClass(target.parentNode, "disabled")) {
          return;
        }
        const yearText = (target.textContent ?? "").trim();
        const year = Number.parseInt(yearText, 10);
        const createYearDate = (y) => new Date(y, 0, 1);
        if (Number.isNaN(year)) {
          return;
        }
        if (this.selectionMode === "years") {
          const value = this.value || [];
          const idx = util.arrayFindIndex(value, (date) => date.getFullYear() === year);
          const newValue = idx > -1 ? [...value.slice(0, idx), ...value.slice(idx + 1)] : [...value, createYearDate(year)];
          this.$emit("pick", newValue);
        } else {
          this.$emit("pick", year);
        }
      }
    }
  }
};
var _sfc_render$3 = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("table", { staticClass: "el-year-table-v2", on: { "click": _vm.handleYearTableClick } }, [_c("tbody", [_c("tr", [_c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 0) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 1) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 1))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 2) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 2))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 3) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 3))])])]), _c("tr", [_c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 4) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 4))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 5) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 5))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 6) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 6))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 7) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 7))])])]), _c("tr", [_c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 8) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 8))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 9) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 9))])]), _c("td"), _c("td")])])]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false
);
const YearTable = __component__$3.exports;
const ENGLISH_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ENGLISH_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const _sfc_main$2 = {
  components: {
    TimePicker,
    YearTable,
    MonthTable,
    DateTable,
    ElButton,
    ElSelect,
    ElOption
  },
  mixins: [locale.Locale],
  data() {
    return {
      popperClass: "",
      date: dateUtil.clearTime(/* @__PURE__ */ new Date()),
      value: "",
      defaultValue: null,
      // use getDefaultValue() for time computation
      defaultTime: null,
      showTime: false,
      selectionMode: "day",
      shortcuts: "",
      visible: false,
      currentView: "date",
      disabledDate: "",
      cellClassName: "",
      selectableRange: [],
      firstDayOfWeek: 7,
      showWeekNumber: false,
      format: "",
      arrowControl: false
    };
  },
  computed: {
    year() {
      return this.date.getFullYear();
    },
    month() {
      return this.date.getMonth();
    },
    week() {
      return dateUtil.getWeekNumber(this.date);
    },
    monthDate() {
      return this.date.getDate();
    },
    footerVisible() {
      return this.showTime || this.selectionMode === "dates" || this.selectionMode === "months" || this.selectionMode === "years";
    },
    yearLabel() {
      const yearTranslation = this.t("el.datepicker.year");
      if (this.currentView === "year") {
        const startYear = Math.floor(this.year / 10) * 10;
        if (yearTranslation) {
          return `${startYear} ${yearTranslation} - ${startYear + 9} ${yearTranslation}`;
        }
        return `${startYear} - ${startYear + 9}`;
      }
      return `${this.year} ${yearTranslation}`;
    },
    timeFormat() {
      if (this.format) {
        return dateUtil.extractTimeFormat(this.format);
      } else {
        return "HH:mm:ss";
      }
    },
    isSingleDateView() {
      return this.selectionMode === "day" && this.currentView === "date";
    },
    monthOptions() {
      return Array.from({ length: 12 }, (_, index) => {
        const full = this.t(`el.datepicker.month${index + 1}`);
        const englishIndex = ENGLISH_MONTHS.indexOf(full);
        const label = englishIndex !== -1 ? ENGLISH_MONTHS_SHORT[englishIndex] : full;
        return {
          value: index,
          label
        };
      });
    },
    yearOptions() {
      const currentYear = this.year;
      const startYear = currentYear - 100;
      const endYear = currentYear + 100;
      const options = [];
      for (let year = startYear; year <= endYear; year++) {
        options.push({
          value: year,
          label: `${year}`
        });
      }
      return options;
    },
    todayLabel() {
      return this.t("el.datepicker.today") || "Today";
    }
  },
  watch: {
    value(val) {
      if (this.selectionMode === "dates" && this.value) {
        return;
      }
      if (this.selectionMode === "months" && this.value) {
        return;
      }
      if (this.selectionMode === "years" && this.value) {
        return;
      }
      if (dateUtil.isDate(val)) {
        this.date = new Date(val);
      } else {
        this.date = this.getDefaultValue();
      }
    },
    defaultValue(val) {
      if (!dateUtil.isDate(this.value)) {
        this.date = val ? new Date(val) : dateUtil.clearTime(/* @__PURE__ */ new Date());
      }
    },
    selectionMode(newVal) {
      if (newVal === "month") {
        if (this.currentView !== "year" || this.currentView !== "month") {
          this.currentView = "month";
        }
      } else if (newVal === "dates") {
        this.currentView = "date";
      } else if (newVal === "years") {
        this.currentView = "year";
      } else if (newVal === "months") {
        this.currentView = "month";
      }
    }
  },
  methods: {
    proxyTimePickerDataProperties() {
      const format = (timeFormat) => {
        this.$refs.timepicker.format = timeFormat;
      };
      const value = (value2) => {
        this.$refs.timepicker.value = value2;
      };
      const date = (date2) => {
        this.$refs.timepicker.date = date2;
      };
      const selectableRange = (selectableRange2) => {
        this.$refs.timepicker.selectableRange = selectableRange2;
      };
      this.$watch("value", value);
      this.$watch("date", date);
      this.$watch("selectableRange", selectableRange);
      format(this.timeFormat);
      value(this.value);
      date(this.date);
      selectableRange(this.selectableRange);
    },
    handleClear() {
      this.date = this.getDefaultValue();
      this.$emit("pick", null);
    },
    emit(value, ...args) {
      if (!value) {
        this.$emit("pick", value, ...args);
      } else if (Array.isArray(value)) {
        const dates = value.map((date) => this.showTime ? dateUtil.clearMilliseconds(date) : dateUtil.clearTime(date));
        this.$emit("pick", dates, ...args);
      } else {
        this.$emit("pick", this.showTime ? dateUtil.clearMilliseconds(value) : dateUtil.clearTime(value), ...args);
      }
    },
    // resetDate() {
    //   this.date = new Date(this.date);
    // },
    showMonthPicker() {
      this.currentView = "month";
      this.$emit("hover-date", null);
    },
    showYearPicker() {
      this.currentView = "year";
      this.$emit("hover-date", null);
    },
    // XXX: 没用到
    // handleLabelClick() {
    //   if (this.currentView === 'date') {
    //     this.showMonthPicker();
    //   } else if (this.currentView === 'month') {
    //     this.showYearPicker();
    //   }
    // },
    prevMonth() {
      this.date = dateUtil.prevMonth(this.date);
    },
    nextMonth() {
      this.date = dateUtil.nextMonth(this.date);
    },
    prevYear() {
      if (this.currentView === "year") {
        this.date = dateUtil.prevYear(this.date, 10);
      } else {
        this.date = dateUtil.prevYear(this.date);
      }
    },
    nextYear() {
      if (this.currentView === "year") {
        this.date = dateUtil.nextYear(this.date, 10);
      } else {
        this.date = dateUtil.nextYear(this.date);
      }
    },
    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },
    handleTimePick(value, visible, source) {
      if (dateUtil.isDate(value)) {
        const base = this.value ? this.value : this.getDefaultValue();
        const defaulted = !this.value && this.defaultTime ? dateUtil.modifyWithTimeString(base, this.defaultTime) : base;
        const newDate = dateUtil.modifyTime(defaulted, value.getHours(), value.getMinutes(), value.getSeconds());
        this.date = newDate;
        const emitVisible = typeof visible === "boolean" ? visible : true;
        const args = [];
        if (source === "preview") {
          args.push("preview");
        }
        this.emit(this.date, emitVisible, ...args);
      } else {
        this.emit(value, true);
      }
    },
    handleCellHover(date) {
      this.$emit("hover-date", date);
    },
    handleMonthDropdownVisible(visible) {
      if (!visible) {
        return;
      }
      this.$nextTick(() => {
        this.centerSelectOption("monthSelect", this.month);
      });
    },
    handleYearDropdownVisible(visible) {
      if (!visible) {
        return;
      }
      this.$nextTick(() => {
        this.centerSelectOption("yearSelect", this.year);
      });
    },
    centerSelectOption(refName, value) {
      const select = this.$refs[refName];
      if (!select || !select.$refs || !select.$refs.popper) {
        return;
      }
      const option = select.getOption(value);
      if (!option || !option.$el) {
        return;
      }
      const wrap = select.$refs.popper.$el.querySelector(".el-select-dropdown__wrap");
      if (!wrap) {
        return;
      }
      const optionEl = option.$el;
      const target = optionEl.offsetTop - Math.max((wrap.clientHeight - optionEl.offsetHeight) / 2, 0);
      wrap.scrollTop = target;
    },
    handleMonthPick(month) {
      if (this.selectionMode === "month") {
        this.date = dateUtil.modifyDate(this.date, this.year, month, 1);
        this.emit(this.date);
      } else if (this.selectionMode === "months") {
        this.emit(month, true);
      } else {
        this.date = dateUtil.changeYearMonthAndClampDate(this.date, this.year, month);
        this.currentView = "date";
      }
    },
    handleDatePick(value) {
      if (this.selectionMode === "day") {
        let newDate = this.value ? dateUtil.modifyDate(this.value, value.getFullYear(), value.getMonth(), value.getDate()) : dateUtil.modifyWithTimeString(value, this.defaultTime);
        if (!this.checkDateWithinRange(newDate)) {
          newDate = dateUtil.modifyDate(this.selectableRange[0][0], value.getFullYear(), value.getMonth(), value.getDate());
        }
        this.date = newDate;
        this.emit(this.date, this.showTime);
      } else if (this.selectionMode === "week") {
        this.emit(value.date);
      } else if (this.selectionMode === "dates") {
        this.emit(value, true);
      }
    },
    handleYearPick(year) {
      if (this.selectionMode === "year") {
        this.date = dateUtil.modifyDate(this.date, year, 0, 1);
        this.emit(this.date);
      } else if (this.selectionMode === "years") {
        this.emit(year, true);
      } else {
        this.date = dateUtil.changeYearMonthAndClampDate(this.date, year, this.month);
        this.currentView = "month";
      }
    },
    handleMonthChange(month) {
      const targetMonth = typeof month === "number" ? month : Number(month);
      if (Number.isNaN(targetMonth)) {
        return;
      }
      this.date = dateUtil.changeYearMonthAndClampDate(this.date, this.year, targetMonth);
    },
    handleYearChange(year) {
      const targetYear = typeof year === "number" ? year : Number(year);
      if (Number.isNaN(targetYear)) {
        return;
      }
      this.date = dateUtil.changeYearMonthAndClampDate(this.date, targetYear, this.month);
    },
    selectToday() {
      this.changeToNow();
    },
    changeToNow() {
      if ((!this.disabledDate || !this.disabledDate(/* @__PURE__ */ new Date())) && this.checkDateWithinRange(/* @__PURE__ */ new Date())) {
        this.date = /* @__PURE__ */ new Date();
        this.emit(this.date);
      }
    },
    confirm() {
      if (this.selectionMode === "dates" || this.selectionMode === "months" || this.selectionMode === "years") {
        this.emit(this.value);
      } else {
        const value = this.value ? this.value : dateUtil.modifyWithTimeString(this.getDefaultValue(), this.defaultTime);
        this.date = new Date(value);
        this.emit(value);
      }
    },
    resetView() {
      if (this.selectionMode === "month" || this.selectionMode === "months") {
        this.currentView = "month";
      } else if (this.selectionMode === "year" || this.selectionMode === "years") {
        this.currentView = "year";
      } else {
        this.currentView = "date";
      }
    },
    handleBeforeEnter() {
      if (!this.showTime) {
        return;
      }
      const syncSpinners = () => {
        const timepicker = this.$refs.timepicker;
        if (!timepicker || typeof timepicker.adjustSpinners !== "function") {
          return;
        }
        if ("needInitAdjust" in timepicker) {
          timepicker.needInitAdjust = true;
        }
        timepicker.adjustSpinners(true);
      };
      this.$nextTick(() => {
        if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
          window.requestAnimationFrame(syncSpinners);
        } else {
          syncSpinners();
        }
      });
    },
    handleEnter() {
      document.body.addEventListener("keydown", this.handleKeydown);
    },
    handleLeave() {
      this.$emit("dodestroy");
      document.body.removeEventListener("keydown", this.handleKeydown);
      if (!this.showTime) {
        return;
      }
      const timepicker = this.$refs.timepicker;
      if (timepicker && "needInitAdjust" in timepicker) {
        timepicker.needInitAdjust = true;
      }
    },
    handleKeydown(event) {
      const keyCode = event.keyCode;
      const list = [38, 40, 37, 39];
      const timepickerEl = this.$refs.timepicker && this.$refs.timepicker.$el;
      const isInTimePanel = timepickerEl ? timepickerEl.contains(event.target) : false;
      if (this.visible && !isInTimePanel) {
        if (list.includes(keyCode)) {
          this.handleKeyControl(keyCode);
          event.stopPropagation();
          event.preventDefault();
        }
        if (keyCode === 13) {
          this.emit(this.date, false);
        }
      }
    },
    handleKeyControl(keyCode) {
      const mapping = {
        year: {
          38: -4,
          40: 4,
          37: -1,
          39: 1,
          offset: (date, step) => date.setFullYear(date.getFullYear() + step)
        },
        month: {
          38: -4,
          40: 4,
          37: -1,
          39: 1,
          offset: (date, step) => date.setMonth(date.getMonth() + step)
        },
        week: {
          38: -1,
          40: 1,
          37: -1,
          39: 1,
          offset: (date, step) => date.setDate(date.getDate() + step * 7)
        },
        day: {
          38: -7,
          40: 7,
          37: -1,
          39: 1,
          offset: (date, step) => date.setDate(date.getDate() + step)
        }
      };
      const mode = this.selectionMode;
      const year = 31536e6;
      const now = this.date.getTime();
      const newDate = new Date(this.date.getTime());
      while (Math.abs(now - newDate.getTime()) <= year) {
        const map = mapping[mode];
        map.offset(newDate, map[keyCode]);
        if (typeof this.disabledDate === "function" && this.disabledDate(newDate)) {
          continue;
        }
        this.date = newDate;
        this.$emit("pick", newDate, true);
        break;
      }
    },
    isValidValue(value) {
      return value && !Number.isNaN(Number(value)) && (typeof this.disabledDate === "function" ? !this.disabledDate(value) : true) && this.checkDateWithinRange(value);
    },
    getDefaultValue() {
      return this.defaultValue ? new Date(this.defaultValue) : dateUtil.clearTime(/* @__PURE__ */ new Date());
    },
    checkDateWithinRange(date) {
      return this.selectableRange.length > 0 ? dateUtil.timeWithinRange(date, this.selectableRange, this.format || "HH:mm:ss") : true;
    }
  }
};
var _sfc_render$2 = function render7() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "before-enter": _vm.handleBeforeEnter, "after-enter": _vm.handleEnter, "after-leave": _vm.handleLeave } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-picker-panel el-date-picker-v2 el-popper", class: [{
    "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts,
    "has-time": _vm.showTime
  }, _vm.popperClass] }, [_c("div", { staticClass: "el-picker-panel__body-wrapper" }, [_vm._t("sidebar"), _vm.shortcuts ? _c("div", { staticClass: "el-picker-panel__sidebar" }, _vm._l(_vm.shortcuts, function(shortcut, key) {
    return _c("button", { key, staticClass: "el-picker-panel__shortcut", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.handleShortcutClick(shortcut);
    } } }, [_vm._v(" " + _vm._s(shortcut.text) + " ")]);
  }), 0) : _vm._e(), _c("div", { staticClass: "el-picker-panel__body" }, [_c("div", { staticClass: "el-date-picker-v2__main" }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView !== "time", expression: "currentView !== 'time'" }], staticClass: "el-date-picker-v2__header", class: {
    "el-date-picker-v2__header--bordered": _vm.currentView === "year" || _vm.currentView === "month",
    "el-date-picker-v2__header--simple": _vm.isSingleDateView
  } }, [_vm.isSingleDateView ? [_c("div", { staticClass: "el-date-picker-v2__header-controls" }, [_c("ElSelect", { ref: "monthSelect", staticClass: "el-date-picker-v2__month-select", attrs: { "value": _vm.month, "size": "small", "popper-append-to-body": false, "popper-class": "el-date-picker-v2__select-dropdown" }, on: { "change": _vm.handleMonthChange, "visible-change": _vm.handleMonthDropdownVisible } }, _vm._l(_vm.monthOptions, function(item) {
    return _c("ElOption", { key: item.value, attrs: { "label": item.label, "value": item.value } });
  }), 1), _c("ElSelect", { ref: "yearSelect", staticClass: "el-date-picker-v2__year-select", attrs: { "value": _vm.year, "size": "small", "popper-append-to-body": false, "popper-class": "el-date-picker-v2__select-dropdown" }, on: { "change": _vm.handleYearChange, "visible-change": _vm.handleYearDropdownVisible } }, _vm._l(_vm.yearOptions, function(item) {
    return _c("ElOption", { key: item.value, attrs: { "label": item.label, "value": item.value } });
  }), 1)], 1), !_vm.showTime ? _c("button", { staticClass: "el-date-picker-v2__today-btn", attrs: { "type": "button" }, on: { "click": _vm.selectToday } }, [_vm._v(" " + _vm._s(_vm.todayLabel) + " ")]) : _vm._e()] : [_c("button", { staticClass: "el-picker-panel__icon-btn el-date-picker-v2__prev-btn el-icon-d-arrow-left", attrs: { "type": "button", "aria-label": _vm.t(`el.datepicker.prevYear`) }, on: { "click": _vm.prevYear } }), _c("button", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "date", expression: "currentView === 'date'" }], staticClass: "el-picker-panel__icon-btn el-date-picker-v2__prev-btn el-icon-arrow-left", attrs: { "type": "button", "aria-label": _vm.t(`el.datepicker.prevMonth`) }, on: { "click": _vm.prevMonth } }), _c("span", { staticClass: "el-date-picker-v2__header-label", attrs: { "role": "button" }, on: { "click": _vm.showYearPicker } }, [_vm._v(_vm._s(_vm.yearLabel))]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "date", expression: "currentView === 'date'" }], staticClass: "el-date-picker-v2__header-label", class: { active: _vm.currentView === "month" }, attrs: { "role": "button" }, on: { "click": _vm.showMonthPicker } }, [_vm._v(_vm._s(_vm.t(`el.datepicker.month${_vm.month + 1}`)))]), _c("button", { staticClass: "el-picker-panel__icon-btn el-date-picker-v2__next-btn el-icon-d-arrow-right", attrs: { "type": "button", "aria-label": _vm.t(`el.datepicker.nextYear`) }, on: { "click": _vm.nextYear } }), _c("button", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "date", expression: "currentView === 'date'" }], staticClass: "el-picker-panel__icon-btn el-date-picker-v2__next-btn el-icon-arrow-right", attrs: { "type": "button", "aria-label": _vm.t(`el.datepicker.nextMonth`) }, on: { "click": _vm.nextMonth } })]], 2), _c("div", { staticClass: "el-picker-panel__content" }, [_c("DateTable", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "date", expression: "currentView === 'date'" }], attrs: { "selection-mode": _vm.selectionMode, "first-day-of-week": _vm.firstDayOfWeek, "value": _vm.value, "default-value": _vm.defaultValue ? new Date(_vm.defaultValue) : null, "date": _vm.date, "cell-class-name": _vm.cellClassName, "disabled-date": _vm.disabledDate }, on: { "cell-hover": _vm.handleCellHover, "pick": _vm.handleDatePick } }), _c("YearTable", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "year", expression: "currentView === 'year'" }], attrs: { "selection-mode": _vm.selectionMode, "value": _vm.value, "default-value": _vm.defaultValue ? new Date(_vm.defaultValue) : null, "date": _vm.date, "disabled-date": _vm.disabledDate }, on: { "pick": _vm.handleYearPick } }), _c("MonthTable", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "month", expression: "currentView === 'month'" }], attrs: { "selection-mode": _vm.selectionMode, "value": _vm.value, "default-value": _vm.defaultValue ? new Date(_vm.defaultValue) : null, "date": _vm.date, "disabled-date": _vm.disabledDate }, on: { "pick": _vm.handleMonthPick } })], 1)]), _vm.showTime ? _c("div", { staticClass: "el-date-picker-v2__time-wrapper" }, [_c("TimePicker", { ref: "timepicker", attrs: { "time-arrow-control": _vm.arrowControl, "visible": true }, on: { "pick": _vm.handleTimePick, "mounted": _vm.proxyTimePickerDataProperties } })], 1) : _vm._e()])], 2), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.footerVisible && (_vm.currentView === "date" || _vm.currentView === "month" || _vm.currentView === "year"), expression: "footerVisible && (currentView === 'date' || currentView === 'month' || currentView === 'year')" }], staticClass: "el-picker-panel__footer" }, [_c("div", { staticClass: "el-date-picker-v2__footer-actions" }, [_c("ElButton", { directives: [{ name: "show", rawName: "v-show", value: _vm.selectionMode !== "dates" && _vm.selectionMode !== "months" && _vm.selectionMode !== "years", expression: "selectionMode !== 'dates' && selectionMode !== 'months' && selectionMode !== 'years'" }], staticClass: "el-picker-panel__link-btn el-date-picker-v2__footer-now", attrs: { "size": "mini", "type": "text" }, on: { "click": _vm.changeToNow } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.now")) + " ")]), _c("ElButton", { staticClass: "el-date-picker-v2__footer-confirm", attrs: { "type": "primary", "size": "mini" }, on: { "click": _vm.confirm } }, [_vm._v(" Confirm ")])], 1)])])]);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false
);
const DatePanel = __component__$2.exports;
function calcDefaultValue(defaultValue) {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), dateUtil.nextMonth(new Date(defaultValue))];
  } else {
    return [/* @__PURE__ */ new Date(), dateUtil.nextMonth(/* @__PURE__ */ new Date())];
  }
}
const _sfc_main$1 = {
  directives: { Clickoutside: clickoutside.Clickoutside },
  components: { MonthTable },
  mixins: [locale.Locale],
  data() {
    return {
      popperClass: "",
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: "",
      maxDate: "",
      leftDate: /* @__PURE__ */ new Date(),
      rightDate: dateUtil.nextYear(/* @__PURE__ */ new Date()),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      shortcuts: "",
      visible: "",
      disabledDate: "",
      format: "",
      arrowControl: false,
      unlinkPanels: false
    };
  },
  computed: {
    btnDisabled() {
      return !(this.minDate && this.maxDate && !this.selecting && this.isValidValue([this.minDate, this.maxDate]));
    },
    leftLabel() {
      return `${this.leftDate.getFullYear()} ${this.t("el.datepicker.year")}`;
    },
    rightLabel() {
      return `${this.rightDate.getFullYear()} ${this.t("el.datepicker.year")}`;
    },
    leftYear() {
      return this.leftDate.getFullYear();
    },
    rightYear() {
      return this.rightDate.getFullYear() === this.leftDate.getFullYear() ? this.leftDate.getFullYear() + 1 : this.rightDate.getFullYear();
    },
    enableYearArrow() {
      return this.unlinkPanels && this.rightYear > this.leftYear + 1;
    }
  },
  watch: {
    value(newVal) {
      if (!newVal) {
        this.minDate = null;
        this.maxDate = null;
      } else if (Array.isArray(newVal)) {
        this.minDate = dateUtil.isDate(newVal[0]) ? new Date(newVal[0]) : null;
        this.maxDate = dateUtil.isDate(newVal[1]) ? new Date(newVal[1]) : null;
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            const minDateYear = this.minDate.getFullYear();
            const maxDateYear = this.maxDate.getFullYear();
            this.rightDate = minDateYear === maxDateYear ? dateUtil.nextYear(this.maxDate) : this.maxDate;
          } else {
            this.rightDate = dateUtil.nextYear(this.leftDate);
          }
        } else {
          this.leftDate = calcDefaultValue(this.defaultValue)[0];
          this.rightDate = dateUtil.nextYear(this.leftDate);
        }
      }
    },
    defaultValue(val) {
      if (!Array.isArray(this.value)) {
        const [left, right] = calcDefaultValue(val);
        this.leftDate = left;
        this.rightDate = val && val[1] && left.getFullYear() !== right.getFullYear() && this.unlinkPanels ? right : dateUtil.nextYear(this.leftDate);
      }
    }
  },
  methods: {
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = calcDefaultValue(this.defaultValue)[0];
      this.rightDate = dateUtil.nextYear(this.leftDate);
      this.$emit("pick", null);
    },
    handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },
    handleRangePick(val, close = true) {
      const defaultTime = this.defaultTime || [];
      const minDate = dateUtil.modifyWithTimeString(val.minDate, defaultTime[0]);
      const maxDate = dateUtil.modifyWithTimeString(val.maxDate, defaultTime[1]);
      if (this.maxDate === maxDate && this.minDate === minDate) {
        return;
      }
      this.onPick && this.onPick(val);
      this.maxDate = maxDate;
      this.minDate = minDate;
      setTimeout(() => {
        this.maxDate = maxDate;
        this.minDate = minDate;
      }, 10);
      if (!close) {
        return;
      }
      this.handleConfirm();
    },
    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },
    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear() {
      this.leftDate = dateUtil.prevYear(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = dateUtil.prevYear(this.rightDate);
      }
    },
    rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = dateUtil.nextYear(this.leftDate);
      }
      this.rightDate = dateUtil.nextYear(this.rightDate);
    },
    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear() {
      this.leftDate = dateUtil.nextYear(this.leftDate);
    },
    rightPrevYear() {
      this.rightDate = dateUtil.prevYear(this.rightDate);
    },
    handleConfirm(visible = false) {
      if (this.isValidValue([this.minDate, this.maxDate])) {
        this.$emit("pick", [this.minDate, this.maxDate], visible);
      }
    },
    isValidValue(value) {
      return Array.isArray(value) && value && value[0] && value[1] && dateUtil.isDate(value[0]) && dateUtil.isDate(value[1]) && value[0].getTime() <= value[1].getTime() && (typeof this.disabledDate === "function" ? !this.disabledDate(value[0]) && !this.disabledDate(value[1]) : true);
    },
    resetView() {
      this.minDate = this.value && dateUtil.isDate(this.value[0]) ? new Date(this.value[0]) : null;
      this.maxDate = this.value && dateUtil.isDate(this.value[0]) ? new Date(this.value[1]) : null;
    }
  }
};
var _sfc_render$1 = function render8() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": function($event) {
    return _vm.$emit("dodestroy");
  } } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-picker-panel el-date-range-picker-v2 el-popper", class: [{
    "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts
  }, _vm.popperClass] }, [_c("div", { staticClass: "el-picker-panel__body-wrapper" }, [_vm._t("sidebar"), _vm.shortcuts ? _c("div", { staticClass: "el-picker-panel__sidebar" }, _vm._l(_vm.shortcuts, function(shortcut, key) {
    return _c("button", { key, staticClass: "el-picker-panel__shortcut", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.handleShortcutClick(shortcut);
    } } }, [_vm._v(" " + _vm._s(shortcut.text) + " ")]);
  }), 0) : _vm._e(), _c("div", { staticClass: "el-picker-panel__body" }, [_c("div", { staticClass: "el-picker-panel__content el-date-range-picker-v2__content is-left" }, [_c("div", { staticClass: "el-date-range-picker-v2__header" }, [_c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-left", attrs: { "type": "button" }, on: { "click": _vm.leftPrevYear } }), _vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-right", class: { "is-disabled": !_vm.enableYearArrow }, attrs: { "type": "button", "disabled": !_vm.enableYearArrow }, on: { "click": _vm.leftNextYear } }) : _vm._e(), _c("div", [_vm._v(_vm._s(_vm.leftLabel))])]), _c("MonthTable", { attrs: { "selection-mode": "range", "date": _vm.leftDate, "default-value": _vm.defaultValue, "min-date": _vm.minDate, "max-date": _vm.maxDate, "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate }, on: { "changerange": _vm.handleChangeRange, "pick": _vm.handleRangePick } })], 1), _c("div", { staticClass: "el-picker-panel__content el-date-range-picker-v2__content is-right" }, [_c("div", { staticClass: "el-date-range-picker-v2__header" }, [_vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-left", class: { "is-disabled": !_vm.enableYearArrow }, attrs: { "type": "button", "disabled": !_vm.enableYearArrow }, on: { "click": _vm.rightPrevYear } }) : _vm._e(), _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-right", attrs: { "type": "button" }, on: { "click": _vm.rightNextYear } }), _c("div", [_vm._v(_vm._s(_vm.rightLabel))])]), _c("MonthTable", { attrs: { "selection-mode": "range", "date": _vm.rightDate, "default-value": _vm.defaultValue, "min-date": _vm.minDate, "max-date": _vm.maxDate, "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate }, on: { "changerange": _vm.handleChangeRange, "pick": _vm.handleRangePick } })], 1)])], 2)])]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const MonthRangePanel = __component__$1.exports;
const NewPopper = {
  props: {
    appendToBody: vuePopper.Popper.props.appendToBody,
    offset: vuePopper.Popper.props.offset,
    boundariesPadding: vuePopper.Popper.props.boundariesPadding,
    arrowOffset: vuePopper.Popper.props.arrowOffset,
    transformOrigin: vuePopper.Popper.props.transformOrigin
  },
  methods: vuePopper.Popper.methods,
  data() {
    return merge.merge({ visibleArrow: true }, vuePopper.Popper.data);
  },
  beforeDestroy: vuePopper.Popper.beforeDestroy
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
function DATE_FORMATTER(value, format) {
  if (format === "timestamp") {
    return value.getTime();
  }
  return dateUtil.formatDate(value, format);
}
function DATE_PARSER(text, format) {
  if (format === "timestamp") {
    return new Date(Number(text));
  }
  return dateUtil.parseDate(text, format);
}
function RANGE_FORMATTER(value, format) {
  if (Array.isArray(value) && value.length === 2) {
    const start = value[0];
    const end = value[1];
    if (start && end) {
      return [DATE_FORMATTER(start, format), DATE_FORMATTER(end, format)];
    }
  }
  return "";
}
function RANGE_PARSER(array, format, separator) {
  if (!Array.isArray(array)) {
    array = array.split(separator);
  }
  if (array.length === 2) {
    const range1 = array[0];
    const range2 = array[1];
    return [DATE_PARSER(range1, format), DATE_PARSER(range2, format)];
  }
  return [];
}
const TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter(value) {
      if (!value) {
        return "";
      }
      return `${value}`;
    },
    parser(text) {
      if (text === void 0 || text === "") {
        return null;
      }
      return text;
    }
  },
  week: {
    formatter(value, format) {
      const week = dateUtil.getWeekNumber(value);
      const month = value.getMonth();
      const trueDate = new Date(value);
      if (week === 1 && month === 11) {
        trueDate.setHours(0, 0, 0, 0);
        trueDate.setDate(trueDate.getDate() + 3 - (trueDate.getDay() + 6) % 7);
      }
      let date = dateUtil.formatDate(trueDate, format);
      date = /WW/.test(date) ? date.replace(/WW/, week < 10 ? `0${week}` : week) : date.replace(/W/, week);
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
      if (!value) {
        return "";
      }
      return `${value}`;
    },
    parser(text) {
      const result = Number(text);
      if (!Number.isNaN(result)) {
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
      return (typeof value === "string" ? value.split(", ") : value).map((date) => dateUtil.isDateObject(date) ? date : DATE_PARSER(date, format));
    }
  },
  months: {
    formatter(value, format) {
      return value.map((date) => DATE_FORMATTER(date, format));
    },
    parser(value, format) {
      return (typeof value === "string" ? value.split(", ") : value).map((date) => dateUtil.isDateObject(date) ? date : DATE_PARSER(date, format));
    }
  },
  years: {
    formatter(value, format) {
      return value.map((date) => DATE_FORMATTER(date, format));
    },
    parser(value, format) {
      return (typeof value === "string" ? value.split(", ") : value).map((date) => dateUtil.isDateObject(date) ? date : DATE_PARSER(date, format));
    }
  }
};
const PLACEMENT_MAP = {
  left: "bottom-start",
  center: "bottom",
  right: "bottom-end"
};
function parseAsFormatAndType(value, customFormat, type, rangeSeparator = "-") {
  if (!value) {
    return null;
  }
  const parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP.default).parser;
  const format = customFormat || DEFAULT_FORMATS[type];
  return parser(value, format, rangeSeparator);
}
function formatAsFormatAndType(value, customFormat, type) {
  if (!value) {
    return null;
  }
  const formatter = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP.default).formatter;
  const format = customFormat || DEFAULT_FORMATS[type];
  return formatter(value, format);
}
function valueEquals(a, b) {
  const dateEquals = function(a2, b2) {
    const aIsDate = dateUtil.isDateObject(a2);
    const bIsDate = dateUtil.isDateObject(b2);
    if (aIsDate && bIsDate) {
      return a2.getTime() === b2.getTime();
    }
    if (!aIsDate && !bIsDate) {
      return a2 === b2;
    }
    return false;
  };
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
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
}
function isString(val) {
  return typeof val === "string" || Object.prototype.toString.call(val) === "[object String]";
}
function validator(val) {
  return val === null || val === void 0 || isString(val) || Array.isArray(val) && val.length === 2 && val.every(isString);
}
const _sfc_main = {
  components: { ElInput },
  directives: { Clickoutside: clickoutside.Clickoutside },
  mixins: [emitter.emitter, NewPopper],
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
  data() {
    return {
      pickerVisible: false,
      showClose: false,
      userInput: null,
      valueOnOpen: null,
      // value when picker opens, used to determine whether to emit change
      unwatchPickerOptions: null,
      hoverPlaceholder: ""
    };
  },
  computed: {
    ranged() {
      return this.type.includes("range");
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
    displayedPlaceholder() {
      if (this.ranged) {
        return this.placeholder;
      }
      if (this.hoverPlaceholder && this.valueIsEmpty) {
        return this.hoverPlaceholder;
      }
      return this.placeholder;
    },
    triggerClass() {
      return this.prefixIcon || (this.type.includes("time") ? "el-icon-time" : "el-icon-date");
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
      return HAVE_TRIGGER_TYPES.includes(this.type);
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
      if (!this.value) {
        return this.value;
      }
      if (this.type === "time-select") {
        return this.value;
      }
      const valueIsDateObject = dateUtil.isDateObject(this.value) || Array.isArray(this.value) && this.value.every(dateUtil.isDateObject);
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
      if (id) {
        obj.id = id;
      }
      return obj;
    },
    secondInputId() {
      const obj = {};
      let id;
      if (this.ranged) {
        id = this.id && this.id[1];
      }
      if (id) {
        obj.id = id;
      }
      return obj;
    }
  },
  watch: {
    pickerVisible(val) {
      if (this.readonly || this.pickerDisabled) {
        return;
      }
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
      const isParsed = dateUtil.isDateObject(value) || Array.isArray(value) && value.every(dateUtil.isDateObject);
      if (this.valueFormat && !isParsed) {
        return parseAsFormatAndType(value, this.valueFormat, this.type, this.rangeSeparator) || value;
      } else {
        return value;
      }
    },
    formatToValue(date) {
      const isFormattable = dateUtil.isDateObject(date) || Array.isArray(date) && date.every(dateUtil.isDateObject);
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
      if (this.readonly || this.pickerDisabled) {
        return;
      }
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
    handleStartChange() {
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
    handleEndChange() {
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
      if (this.readonly || this.pickerDisabled) {
        return;
      }
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
      if (!this.pickerVisible) {
        return;
      }
      this.pickerVisible = false;
      this.hoverPlaceholder = "";
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
      if (HAVE_TRIGGER_TYPES.includes(type) && !this.pickerVisible) {
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
            if (!this.refInput.includes(document.activeElement)) {
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
      if (HAVE_TRIGGER_TYPES.includes(type) && !this.pickerVisible) {
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
      this.hoverPlaceholder = "";
    },
    handlePanelHover(date) {
      const supportsPreview = !this.ranged && ["date", "datetime", "time"].includes(this.type);
      if (!supportsPreview) {
        this.hoverPlaceholder = "";
        return;
      }
      if (!this.pickerVisible) {
        this.hoverPlaceholder = "";
        return;
      }
      if (!date) {
        if (["datetime", "time"].includes(this.type)) {
          return;
        }
        this.hoverPlaceholder = "";
        return;
      }
      if (this.userInput !== null) {
        return;
      }
      this.hoverPlaceholder = this.formatToString(date);
    },
    showPicker() {
      if (this.$isServer) {
        return;
      }
      if (!this.picker) {
        this.mountPicker();
      }
      this.hoverPlaceholder = "";
      this.picker.value = this.parsedValue;
      this.picker.resetView && this.picker.resetView();
      this.pickerVisible = this.picker.visible = true;
      this.updatePopper();
      this.$nextTick(() => {
        this.picker.adjustSpinners && this.picker.adjustSpinners(true);
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
          if (Object.prototype.hasOwnProperty.call(options, option) && option !== "selectableRange") {
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
      this.picker.$on("pick", (date = "", visible = false, ...args) => {
        const [extra] = args;
        const isPreview = extra === "preview";
        if (isPreview) {
          if (!this.ranged && ["datetime", "time"].includes(this.type)) {
            this.hoverPlaceholder = date ? this.formatToString(date) : "";
          }
          this.pickerVisible = this.picker.visible = true;
          return;
        }
        this.userInput = null;
        this.hoverPlaceholder = "";
        this.pickerVisible = this.picker.visible = visible;
        this.emitInput(date);
        this.picker.resetView && this.picker.resetView();
      });
      this.picker.$on("hover-date", this.handlePanelHover);
      this.picker.$on("select-range", (start, end, pos) => {
        if (this.refInput.length === 0) {
          return;
        }
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
      this.hoverPlaceholder = "";
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
var _sfc_render = function render9() {
  var _vm = this, _c = _vm._self._c;
  return !_vm.ranged ? _c("ElInput", _vm._b({ directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleClose, expression: "handleClose" }], ref: "reference", staticClass: "el-date-editor-v2", class: `el-date-editor-v2--${_vm.type}`, attrs: { "readonly": !_vm.editable || _vm.readonly || _vm.type === "dates" || _vm.type === "week" || _vm.type === "years" || _vm.type === "months", "disabled": _vm.pickerDisabled, "size": _vm.pickerSize, "name": _vm.name, "placeholder": _vm.displayedPlaceholder, "value": _vm.displayValue, "validateEvent": false }, on: { "focus": _vm.handleFocus, "input": (value) => _vm.userInput = value, "change": _vm.handleChange }, nativeOn: { "keydown": function($event) {
    return _vm.handleKeydown.apply(null, arguments);
  }, "mouseenter": function($event) {
    return _vm.handleMouseEnter.apply(null, arguments);
  }, "mouseleave": function($event) {
    _vm.showClose = false;
  } } }, "ElInput", _vm.firstInputId, false), [_vm.haveTrigger ? _c("i", { staticClass: "el-input__icon", class: [_vm.showClose ? `${_vm.clearIcon}` : ""], attrs: { "slot": "suffix" }, on: { "click": _vm.handleClickIcon }, slot: "suffix" }) : _vm._e()]) : _c("div", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleClose, expression: "handleClose" }], ref: "reference", staticClass: "el-date-editor-v2 el-range-editor-v2 el-input__inner", class: [
    `el-date-editor-v2--${_vm.type}`,
    _vm.pickerSize ? `el-range-editor-v2--${_vm.pickerSize}` : "",
    _vm.pickerDisabled ? "is-disabled" : "",
    _vm.pickerVisible ? "is-active" : ""
  ], on: { "click": _vm.handleRangeClick, "mouseenter": _vm.handleMouseEnter, "mouseleave": function($event) {
    _vm.showClose = false;
  }, "keydown": _vm.handleKeydown } }, [_c("input", _vm._b({ staticClass: "el-range-input-v2", attrs: { "autocomplete": "off", "placeholder": _vm.startPlaceholder, "disabled": _vm.pickerDisabled, "readonly": !_vm.editable || _vm.readonly, "name": _vm.name && _vm.name[0] }, domProps: { "value": _vm.displayValue && _vm.displayValue[0] }, on: { "input": _vm.handleStartInput, "change": _vm.handleStartChange, "focus": _vm.handleFocus } }, "input", _vm.firstInputId, false)), _vm._t("range-separator", function() {
    return [_c("span", { staticClass: "el-range-separator-v2" }, [_vm._v(_vm._s(_vm.rangeSeparator))])];
  }), _c("input", _vm._b({ staticClass: "el-range-input-v2", attrs: { "autocomplete": "off", "placeholder": _vm.endPlaceholder, "disabled": _vm.pickerDisabled, "readonly": !_vm.editable || _vm.readonly, "name": _vm.name && _vm.name[1] }, domProps: { "value": _vm.displayValue && _vm.displayValue[1] }, on: { "input": _vm.handleEndInput, "change": _vm.handleEndChange, "focus": _vm.handleFocus } }, "input", _vm.secondInputId, false)), _vm.haveTrigger ? _c("i", { staticClass: "el-input__icon el-range-v2__close-icon", class: [_vm.showClose ? `${_vm.clearIcon}` : ""], on: { "click": _vm.handleClickIcon } }) : _vm._e()], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Picker = __component__.exports;
function getPanel(type) {
  if (type === "daterange" || type === "datetimerange") {
    return DateRangePanel;
  } else if (type === "monthrange") {
    return MonthRangePanel;
  }
  return DatePanel;
}
const DatePickerV2 = Vue.defineComponent({
  name: "ElDatePickerV2",
  mixins: [Picker],
  props: {
    type: {
      type: String,
      default: "date"
    },
    timeArrowControl: Boolean
  },
  watch: {
    type(type) {
      if (this.picker) {
        this.unmountPicker();
        this.panel = getPanel(type);
        this.mountPicker();
      } else {
        this.panel = getPanel(type);
      }
    }
  },
  created() {
    this.panel = getPanel(this.type);
  }
});
const _DatePickerV2 = DatePickerV2;
_DatePickerV2.install = function install(Vue2) {
  Vue2.component(_DatePickerV2.name, _DatePickerV2);
};
module.exports = _DatePickerV2;
