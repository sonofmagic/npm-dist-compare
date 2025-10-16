"use strict";
const Vue = require("vue");
const ElButton = require("element-ui/lib/button");
const ElInput = require("element-ui/lib/input");
const locale = require("./locale-j1fuSDyN.cjs");
const clickoutside = require("./clickoutside-BWqUe94D.cjs");
const dateUtil = require("./date-util-1Vppicof.cjs");
const util = require("./util-KJN0EjuU.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const time = require("./time-CmjyEblg.cjs");
const dom = require("./dom-D54PnS1K.cjs");
const picker = require("./picker-BexJaURa.cjs");
const WEEKS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function getDateTimestamp(time2) {
  if (typeof time2 === "number" || typeof time2 === "string") {
    return dateUtil.clearTime(new Date(time2)).getTime();
  } else if (time2 instanceof Date) {
    return dateUtil.clearTime(time2).getTime();
  } else {
    return Number.NaN;
  }
}
function removeFromArray$1(arr, pred) {
  const idx = typeof pred === "function" ? util.arrayFindIndex(arr, pred) : arr.indexOf(pred);
  return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr;
}
const _sfc_main$5 = {
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
          const time2 = dateUtil.nextDate(startDate, index - offset).getTime();
          cell.inRange = hasMin && hasMax && time2 >= minDateTimestamp && time2 <= maxDateTimestamp;
          cell.start = Boolean(this.minDate) && time2 === minDateTimestamp;
          cell.end = Boolean(this.maxDate) && time2 === maxDateTimestamp;
          const isToday = time2 === now;
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
          const cellDate = new Date(time2);
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
          const time2 = dateUtil.nextDate(startDate, index - this.offsetDay).getTime();
          cell.inRange = minDate && time2 >= minDate && time2 <= maxDate;
          cell.start = minDate && time2 === minDate;
          cell.end = maxDate && time2 === maxDate;
        }
      }
    },
    handleMouseMove(event) {
      if (!this.rangeState.selecting) {
        return;
      }
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
            endDate: this.getDateOfCell(row, column)
          }
        });
      }
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
var _sfc_render$5 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("table", { staticClass: "el-date-table", class: { "is-week-mode": _vm.selectionMode === "week" }, attrs: { "cellspacing": "0", "cellpadding": "0" }, on: { "click": _vm.handleClick, "mousemove": _vm.handleMouseMove } }, [_c("tbody", [_c("tr", [_vm.showWeekNumber ? _c("th", [_vm._v(" " + _vm._s(_vm.t("el.datepicker.week")) + " ")]) : _vm._e(), _vm._l(_vm.WEEKS, function(week, key) {
    return _c("th", { key }, [_vm._v(" " + _vm._s(_vm.t(`el.datepicker.weeks.${week}`)) + " ")]);
  })], 2), _vm._l(_vm.rows, function(row, key) {
    return _c("tr", { key, staticClass: "el-date-table__row", class: { current: _vm.isWeekActive(row[1]) } }, _vm._l(row, function(cell, key2) {
      return _c("td", { key: key2, class: _vm.getCellClasses(cell) }, [_c("div", [_c("span", [_vm._v(" " + _vm._s(cell.text) + " ")])])]);
    }), 0);
  })], 2)]);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false
);
const DateTable = __component__$5.exports;
function calcDefaultValue$1(defaultValue) {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), dateUtil.nextDate(new Date(defaultValue), 1)];
  } else {
    return [/* @__PURE__ */ new Date(), dateUtil.nextDate(/* @__PURE__ */ new Date(), 1)];
  }
}
const _sfc_main$4 = {
  directives: { Clickoutside: clickoutside.Clickoutside },
  components: { TimePicker: time.TimePanel, DateTable, ElInput, ElButton },
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
          this.$refs.minTimePicker.adjustSpinners();
        });
      }
    },
    maxTimePickerVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.maxTimePicker.date = this.maxDate;
          this.$refs.maxTimePicker.value = this.maxDate;
          this.$refs.maxTimePicker.adjustSpinners();
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
          this.$nextTick((_) => this.$refs.minTimePicker.adjustSpinners());
        } else {
          this.maxDate = dateUtil.modifyTime(this.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
          this.$nextTick((_) => this.$refs.maxTimePicker.adjustSpinners());
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
var _sfc_render$4 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": function($event) {
    return _vm.$emit("dodestroy");
  } } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-picker-panel el-date-range-picker el-popper", class: [{
    "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts,
    "has-time": _vm.showTime
  }, _vm.popperClass] }, [_c("div", { staticClass: "el-picker-panel__body-wrapper" }, [_vm._t("sidebar"), _vm.shortcuts ? _c("div", { staticClass: "el-picker-panel__sidebar" }, _vm._l(_vm.shortcuts, function(shortcut, key) {
    return _c("button", { key, staticClass: "el-picker-panel__shortcut", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.handleShortcutClick(shortcut);
    } } }, [_vm._v(" " + _vm._s(shortcut.text) + " ")]);
  }), 0) : _vm._e(), _c("div", { staticClass: "el-picker-panel__body" }, [_vm.showTime ? _c("div", { staticClass: "el-date-range-picker__time-header" }, [_c("span", { staticClass: "el-date-range-picker__editors-wrap" }, [_c("span", { staticClass: "el-date-range-picker__time-picker-wrap" }, [_c("ElInput", { staticClass: "el-date-range-picker__editor", attrs: { "size": "small", "disabled": _vm.rangeState.selecting, "placeholder": _vm.t("el.datepicker.startDate"), "value": _vm.minVisibleDate }, on: { "input": (val) => _vm.handleDateInput(val, "min"), "change": (val) => _vm.handleDateChange(val, "min") } })], 1), _c("span", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleMinTimeClose, expression: "handleMinTimeClose" }], staticClass: "el-date-range-picker__time-picker-wrap" }, [_c("ElInput", { staticClass: "el-date-range-picker__editor", attrs: { "size": "small", "disabled": _vm.rangeState.selecting, "placeholder": _vm.t("el.datepicker.startTime"), "value": _vm.minVisibleTime }, on: { "focus": function($event) {
    _vm.minTimePickerVisible = true;
  }, "input": (val) => _vm.handleTimeInput(val, "min"), "change": (val) => _vm.handleTimeChange(val, "min") } }), _c("TimePicker", { ref: "minTimePicker", attrs: { "time-arrow-control": _vm.arrowControl, "visible": _vm.minTimePickerVisible }, on: { "pick": _vm.handleMinTimePick, "mounted": function($event) {
    _vm.$refs.minTimePicker.format = _vm.timeFormat;
  } } })], 1)]), _c("span", { staticClass: "el-icon-arrow-right" }), _c("span", { staticClass: "el-date-range-picker__editors-wrap is-right" }, [_c("span", { staticClass: "el-date-range-picker__time-picker-wrap" }, [_c("ElInput", { staticClass: "el-date-range-picker__editor", attrs: { "size": "small", "disabled": _vm.rangeState.selecting, "placeholder": _vm.t("el.datepicker.endDate"), "value": _vm.maxVisibleDate, "readonly": !_vm.minDate }, on: { "input": (val) => _vm.handleDateInput(val, "max"), "change": (val) => _vm.handleDateChange(val, "max") } })], 1), _c("span", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleMaxTimeClose, expression: "handleMaxTimeClose" }], staticClass: "el-date-range-picker__time-picker-wrap" }, [_c("ElInput", { staticClass: "el-date-range-picker__editor", attrs: { "size": "small", "disabled": _vm.rangeState.selecting, "placeholder": _vm.t("el.datepicker.endTime"), "value": _vm.maxVisibleTime, "readonly": !_vm.minDate }, on: { "focus": function($event) {
    _vm.minDate && (_vm.maxTimePickerVisible = true);
  }, "input": (val) => _vm.handleTimeInput(val, "max"), "change": (val) => _vm.handleTimeChange(val, "max") } }), _c("TimePicker", { ref: "maxTimePicker", attrs: { "time-arrow-control": _vm.arrowControl, "visible": _vm.maxTimePickerVisible }, on: { "pick": _vm.handleMaxTimePick, "mounted": function($event) {
    _vm.$refs.maxTimePicker.format = _vm.timeFormat;
  } } })], 1)])]) : _vm._e(), _c("div", { staticClass: "el-picker-panel__content el-date-range-picker__content is-left" }, [_c("div", { staticClass: "el-date-range-picker__header" }, [_c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-left", attrs: { "type": "button" }, on: { "click": _vm.leftPrevYear } }), _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-arrow-left", attrs: { "type": "button" }, on: { "click": _vm.leftPrevMonth } }), _vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-right", class: { "is-disabled": !_vm.enableYearArrow }, attrs: { "type": "button", "disabled": !_vm.enableYearArrow }, on: { "click": _vm.leftNextYear } }) : _vm._e(), _vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-arrow-right", class: { "is-disabled": !_vm.enableMonthArrow }, attrs: { "type": "button", "disabled": !_vm.enableMonthArrow }, on: { "click": _vm.leftNextMonth } }) : _vm._e(), _c("div", [_vm._v(_vm._s(_vm.leftLabel))])]), _c("DateTable", { attrs: { "selection-mode": "range", "date": _vm.leftDate, "default-value": _vm.defaultValue, "min-date": _vm.minDate, "max-date": _vm.maxDate, "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate, "cell-class-name": _vm.cellClassName, "first-day-of-week": _vm.firstDayOfWeek }, on: { "changerange": _vm.handleChangeRange, "pick": _vm.handleRangePick } })], 1), _c("div", { staticClass: "el-picker-panel__content el-date-range-picker__content is-right" }, [_c("div", { staticClass: "el-date-range-picker__header" }, [_vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-left", class: { "is-disabled": !_vm.enableYearArrow }, attrs: { "type": "button", "disabled": !_vm.enableYearArrow }, on: { "click": _vm.rightPrevYear } }) : _vm._e(), _vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-arrow-left", class: { "is-disabled": !_vm.enableMonthArrow }, attrs: { "type": "button", "disabled": !_vm.enableMonthArrow }, on: { "click": _vm.rightPrevMonth } }) : _vm._e(), _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-right", attrs: { "type": "button" }, on: { "click": _vm.rightNextYear } }), _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-arrow-right", attrs: { "type": "button" }, on: { "click": _vm.rightNextMonth } }), _c("div", [_vm._v(_vm._s(_vm.rightLabel))])]), _c("DateTable", { attrs: { "selection-mode": "range", "date": _vm.rightDate, "default-value": _vm.defaultValue, "min-date": _vm.minDate, "max-date": _vm.maxDate, "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate, "cell-class-name": _vm.cellClassName, "first-day-of-week": _vm.firstDayOfWeek }, on: { "changerange": _vm.handleChangeRange, "pick": _vm.handleRangePick } })], 1)])], 2), _vm.showTime ? _c("div", { staticClass: "el-picker-panel__footer" }, [_c("ElButton", { staticClass: "el-picker-panel__link-btn", attrs: { "size": "mini", "type": "text" }, on: { "click": _vm.handleClear } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.clear")) + " ")]), _c("ElButton", { staticClass: "el-picker-panel__link-btn", attrs: { "plain": "", "size": "mini", "disabled": _vm.btnDisabled }, on: { "click": function($event) {
    return _vm.handleConfirm(false);
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.confirm")) + " ")])], 1) : _vm._e()])]);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false
);
const DateRangePanel = __component__$4.exports;
function datesInMonth(year, month) {
  const numOfDays = dateUtil.getDayCountOfMonth(year, month);
  const firstDay = new Date(year, month, 1);
  return dateUtil.range(numOfDays).map((n) => dateUtil.nextDate(firstDay, n));
}
function clearDate(date) {
  return new Date(date.getFullYear(), date.getMonth());
}
function getMonthTimestamp(time2) {
  if (typeof time2 === "number" || typeof time2 === "string") {
    return clearDate(new Date(time2)).getTime();
  } else if (time2 instanceof Date) {
    return clearDate(time2).getTime();
  } else {
    return Number.NaN;
  }
}
function removeFromArray(arr, pred) {
  const idx = typeof pred === "function" ? util.arrayFindIndex(arr, pred) : arr.indexOf(pred);
  return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr;
}
const _sfc_main$3 = {
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
          const time2 = new Date(this.date.getFullYear(), index).getTime();
          cell.inRange = hasMin && hasMax && time2 >= minDateTimestamp && time2 <= maxDateTimestamp;
          cell.start = Boolean(this.minDate) && time2 === minDateTimestamp;
          cell.end = Boolean(this.maxDate) && time2 === maxDateTimestamp;
          const isToday = time2 === now;
          if (isToday) {
            cell.type = "today";
          }
          cell.text = index;
          const cellDate = new Date(time2);
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
          const time2 = new Date(this.date.getFullYear(), index).getTime();
          cell.inRange = minDate && time2 >= minDate && time2 <= maxDate;
          cell.start = minDate && time2 === minDate;
          cell.end = maxDate && time2 === maxDate;
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
var _sfc_render$3 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("table", { staticClass: "el-month-table", on: { "click": _vm.handleMonthTableClick, "mousemove": _vm.handleMouseMove } }, [_c("tbody", _vm._l(_vm.rows, function(row, key) {
    return _c("tr", { key }, _vm._l(row, function(cell, key2) {
      return _c("td", { key: key2, class: _vm.getCellStyle(cell) }, [_c("div", [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.t(`el.datepicker.months.${_vm.months[cell.text]}`)))])])]);
    }), 0);
  }), 0)]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false
);
const MonthTable = __component__$3.exports;
function datesInYear(year) {
  const numOfDays = dateUtil.getDayCountOfYear(year);
  const firstDay = new Date(year, 0, 1);
  return dateUtil.range(numOfDays).map((n) => dateUtil.nextDate(firstDay, n));
}
const _sfc_main$2 = {
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
var _sfc_render$2 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("table", { staticClass: "el-year-table", on: { "click": _vm.handleYearTableClick } }, [_c("tbody", [_c("tr", [_c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 0) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 1) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 1))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 2) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 2))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 3) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 3))])])]), _c("tr", [_c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 4) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 4))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 5) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 5))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 6) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 6))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 7) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 7))])])]), _c("tr", [_c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 8) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 8))])]), _c("td", { staticClass: "available", class: _vm.getCellStyle(_vm.startYear + 9) }, [_c("a", { staticClass: "cell" }, [_vm._v(_vm._s(_vm.startYear + 9))])]), _c("td"), _c("td")])])]);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false
);
const YearTable = __component__$2.exports;
const _sfc_main$1 = {
  directives: { Clickoutside: clickoutside.Clickoutside },
  components: {
    TimePicker: time.TimePanel,
    YearTable,
    MonthTable,
    DateTable,
    ElInput,
    ElButton
  },
  mixins: [locale.Locale],
  data() {
    return {
      popperClass: "",
      date: /* @__PURE__ */ new Date(),
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
      timePickerVisible: false,
      format: "",
      arrowControl: false,
      userInputDate: null,
      userInputTime: null
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
    visibleTime() {
      if (this.userInputTime !== null) {
        return this.userInputTime;
      } else {
        return dateUtil.formatDate(this.value || this.defaultValue, this.timeFormat);
      }
    },
    visibleDate() {
      if (this.userInputDate !== null) {
        return this.userInputDate;
      } else {
        return dateUtil.formatDate(this.value || this.defaultValue, this.dateFormat);
      }
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
    dateFormat() {
      if (this.format) {
        return dateUtil.extractDateFormat(this.format);
      } else {
        return "yyyy-MM-dd";
      }
    }
  },
  watch: {
    showTime(val) {
      if (!val) {
        return;
      }
      this.$nextTick((_) => {
        const inputElm = this.$refs.input.$el;
        if (inputElm) {
          this.pickerWidth = inputElm.getBoundingClientRect().width + 10;
        }
      });
    },
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
        this.date = val ? new Date(val) : /* @__PURE__ */ new Date();
      }
    },
    timePickerVisible(val) {
      if (val) {
        this.$nextTick(() => this.$refs.timepicker.adjustSpinners());
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
      this.userInputDate = null;
      this.userInputTime = null;
    },
    // resetDate() {
    //   this.date = new Date(this.date);
    // },
    showMonthPicker() {
      this.currentView = "month";
    },
    showYearPicker() {
      this.currentView = "year";
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
    handleTimePick(value, visible, first) {
      if (dateUtil.isDate(value)) {
        const newDate = this.value ? dateUtil.modifyTime(this.value, value.getHours(), value.getMinutes(), value.getSeconds()) : dateUtil.modifyWithTimeString(this.getDefaultValue(), this.defaultTime);
        this.date = newDate;
        this.emit(this.date, true);
      } else {
        this.emit(value, true);
      }
      if (!first) {
        this.timePickerVisible = visible;
      }
    },
    handleTimePickClose() {
      this.timePickerVisible = false;
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
    handleEnter() {
      document.body.addEventListener("keydown", this.handleKeydown);
    },
    handleLeave() {
      this.$emit("dodestroy");
      document.body.removeEventListener("keydown", this.handleKeydown);
    },
    handleKeydown(event) {
      const keyCode = event.keyCode;
      const list = [38, 40, 37, 39];
      if (this.visible && !this.timePickerVisible) {
        if (list.includes(keyCode)) {
          this.handleKeyControl(keyCode);
          event.stopPropagation();
          event.preventDefault();
        }
        if (keyCode === 13 && this.userInputDate === null && this.userInputTime === null) {
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
    handleVisibleTimeChange(value) {
      const time2 = dateUtil.parseDate(value, this.timeFormat);
      if (time2 && this.checkDateWithinRange(time2)) {
        this.date = dateUtil.modifyDate(time2, this.year, this.month, this.monthDate);
        this.userInputTime = null;
        this.$refs.timepicker.value = this.date;
        this.timePickerVisible = false;
        this.emit(this.date, true);
      }
    },
    handleVisibleDateChange(value) {
      const date = dateUtil.parseDate(value, this.dateFormat);
      if (date) {
        if (typeof this.disabledDate === "function" && this.disabledDate(date)) {
          return;
        }
        this.date = dateUtil.modifyTime(date, this.date.getHours(), this.date.getMinutes(), this.date.getSeconds());
        this.userInputDate = null;
        this.resetView();
        this.emit(this.date, true);
      }
    },
    isValidValue(value) {
      return value && !Number.isNaN(Number(value)) && (typeof this.disabledDate === "function" ? !this.disabledDate(value) : true) && this.checkDateWithinRange(value);
    },
    getDefaultValue() {
      return this.defaultValue ? new Date(this.defaultValue) : /* @__PURE__ */ new Date();
    },
    checkDateWithinRange(date) {
      return this.selectableRange.length > 0 ? dateUtil.timeWithinRange(date, this.selectableRange, this.format || "HH:mm:ss") : true;
    }
  }
};
var _sfc_render$1 = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-enter": _vm.handleEnter, "after-leave": _vm.handleLeave } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-picker-panel el-date-picker el-popper", class: [{
    "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts,
    "has-time": _vm.showTime
  }, _vm.popperClass] }, [_c("div", { staticClass: "el-picker-panel__body-wrapper" }, [_vm._t("sidebar"), _vm.shortcuts ? _c("div", { staticClass: "el-picker-panel__sidebar" }, _vm._l(_vm.shortcuts, function(shortcut, key) {
    return _c("button", { key, staticClass: "el-picker-panel__shortcut", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.handleShortcutClick(shortcut);
    } } }, [_vm._v(" " + _vm._s(shortcut.text) + " ")]);
  }), 0) : _vm._e(), _c("div", { staticClass: "el-picker-panel__body" }, [_vm.showTime ? _c("div", { staticClass: "el-date-picker__time-header" }, [_c("span", { staticClass: "el-date-picker__editor-wrap" }, [_c("ElInput", { attrs: { "placeholder": _vm.t("el.datepicker.selectDate"), "value": _vm.visibleDate, "size": "small" }, on: { "input": (val) => _vm.userInputDate = val, "change": _vm.handleVisibleDateChange } })], 1), _c("span", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleTimePickClose, expression: "handleTimePickClose" }], staticClass: "el-date-picker__editor-wrap" }, [_c("ElInput", { ref: "input", attrs: { "placeholder": _vm.t("el.datepicker.selectTime"), "value": _vm.visibleTime, "size": "small" }, on: { "focus": function($event) {
    _vm.timePickerVisible = true;
  }, "input": (val) => _vm.userInputTime = val, "change": _vm.handleVisibleTimeChange } }), _c("TimePicker", { ref: "timepicker", attrs: { "time-arrow-control": _vm.arrowControl, "visible": _vm.timePickerVisible }, on: { "pick": _vm.handleTimePick, "mounted": _vm.proxyTimePickerDataProperties } })], 1)]) : _vm._e(), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView !== "time", expression: "currentView !== 'time'" }], staticClass: "el-date-picker__header", class: { "el-date-picker__header--bordered": _vm.currentView === "year" || _vm.currentView === "month" } }, [_c("button", { staticClass: "el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left", attrs: { "type": "button", "aria-label": _vm.t(`el.datepicker.prevYear`) }, on: { "click": _vm.prevYear } }), _c("button", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "date", expression: "currentView === 'date'" }], staticClass: "el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left", attrs: { "type": "button", "aria-label": _vm.t(`el.datepicker.prevMonth`) }, on: { "click": _vm.prevMonth } }), _c("span", { staticClass: "el-date-picker__header-label", attrs: { "role": "button" }, on: { "click": _vm.showYearPicker } }, [_vm._v(_vm._s(_vm.yearLabel))]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "date", expression: "currentView === 'date'" }], staticClass: "el-date-picker__header-label", class: { active: _vm.currentView === "month" }, attrs: { "role": "button" }, on: { "click": _vm.showMonthPicker } }, [_vm._v(_vm._s(_vm.t(`el.datepicker.month${_vm.month + 1}`)))]), _c("button", { staticClass: "el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right", attrs: { "type": "button", "aria-label": _vm.t(`el.datepicker.nextYear`) }, on: { "click": _vm.nextYear } }), _c("button", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "date", expression: "currentView === 'date'" }], staticClass: "el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right", attrs: { "type": "button", "aria-label": _vm.t(`el.datepicker.nextMonth`) }, on: { "click": _vm.nextMonth } })]), _c("div", { staticClass: "el-picker-panel__content" }, [_c("DateTable", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "date", expression: "currentView === 'date'" }], attrs: { "selection-mode": _vm.selectionMode, "first-day-of-week": _vm.firstDayOfWeek, "value": _vm.value, "default-value": _vm.defaultValue ? new Date(_vm.defaultValue) : null, "date": _vm.date, "cell-class-name": _vm.cellClassName, "disabled-date": _vm.disabledDate }, on: { "pick": _vm.handleDatePick } }), _c("YearTable", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "year", expression: "currentView === 'year'" }], attrs: { "selection-mode": _vm.selectionMode, "value": _vm.value, "default-value": _vm.defaultValue ? new Date(_vm.defaultValue) : null, "date": _vm.date, "disabled-date": _vm.disabledDate }, on: { "pick": _vm.handleYearPick } }), _c("MonthTable", { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === "month", expression: "currentView === 'month'" }], attrs: { "selection-mode": _vm.selectionMode, "value": _vm.value, "default-value": _vm.defaultValue ? new Date(_vm.defaultValue) : null, "date": _vm.date, "disabled-date": _vm.disabledDate }, on: { "pick": _vm.handleMonthPick } })], 1)])], 2), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.footerVisible && (_vm.currentView === "date" || _vm.currentView === "month" || _vm.currentView === "year"), expression: "footerVisible && (currentView === 'date' || currentView === 'month' || currentView === 'year')" }], staticClass: "el-picker-panel__footer" }, [_c("ElButton", { directives: [{ name: "show", rawName: "v-show", value: _vm.selectionMode !== "dates" && _vm.selectionMode !== "months" && _vm.selectionMode !== "years", expression: "selectionMode !== 'dates' && selectionMode !== 'months' && selectionMode !== 'years'" }], staticClass: "el-picker-panel__link-btn", attrs: { "size": "mini", "type": "text" }, on: { "click": _vm.changeToNow } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.now")) + " ")]), _c("ElButton", { staticClass: "el-picker-panel__link-btn", attrs: { "plain": "", "size": "mini" }, on: { "click": _vm.confirm } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.confirm")) + " ")])], 1)])]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const DatePanel = __component__$1.exports;
function calcDefaultValue(defaultValue) {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), dateUtil.nextMonth(new Date(defaultValue))];
  } else {
    return [/* @__PURE__ */ new Date(), dateUtil.nextMonth(/* @__PURE__ */ new Date())];
  }
}
const _sfc_main = {
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
var _sfc_render = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": function($event) {
    return _vm.$emit("dodestroy");
  } } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-picker-panel el-date-range-picker el-popper", class: [{
    "has-sidebar": _vm.$slots.sidebar || _vm.shortcuts
  }, _vm.popperClass] }, [_c("div", { staticClass: "el-picker-panel__body-wrapper" }, [_vm._t("sidebar"), _vm.shortcuts ? _c("div", { staticClass: "el-picker-panel__sidebar" }, _vm._l(_vm.shortcuts, function(shortcut, key) {
    return _c("button", { key, staticClass: "el-picker-panel__shortcut", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.handleShortcutClick(shortcut);
    } } }, [_vm._v(" " + _vm._s(shortcut.text) + " ")]);
  }), 0) : _vm._e(), _c("div", { staticClass: "el-picker-panel__body" }, [_c("div", { staticClass: "el-picker-panel__content el-date-range-picker__content is-left" }, [_c("div", { staticClass: "el-date-range-picker__header" }, [_c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-left", attrs: { "type": "button" }, on: { "click": _vm.leftPrevYear } }), _vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-right", class: { "is-disabled": !_vm.enableYearArrow }, attrs: { "type": "button", "disabled": !_vm.enableYearArrow }, on: { "click": _vm.leftNextYear } }) : _vm._e(), _c("div", [_vm._v(_vm._s(_vm.leftLabel))])]), _c("MonthTable", { attrs: { "selection-mode": "range", "date": _vm.leftDate, "default-value": _vm.defaultValue, "min-date": _vm.minDate, "max-date": _vm.maxDate, "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate }, on: { "changerange": _vm.handleChangeRange, "pick": _vm.handleRangePick } })], 1), _c("div", { staticClass: "el-picker-panel__content el-date-range-picker__content is-right" }, [_c("div", { staticClass: "el-date-range-picker__header" }, [_vm.unlinkPanels ? _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-left", class: { "is-disabled": !_vm.enableYearArrow }, attrs: { "type": "button", "disabled": !_vm.enableYearArrow }, on: { "click": _vm.rightPrevYear } }) : _vm._e(), _c("button", { staticClass: "el-picker-panel__icon-btn el-icon-d-arrow-right", attrs: { "type": "button" }, on: { "click": _vm.rightNextYear } }), _c("div", [_vm._v(_vm._s(_vm.rightLabel))])]), _c("MonthTable", { attrs: { "selection-mode": "range", "date": _vm.rightDate, "default-value": _vm.defaultValue, "min-date": _vm.minDate, "max-date": _vm.maxDate, "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate }, on: { "changerange": _vm.handleChangeRange, "pick": _vm.handleRangePick } })], 1)])], 2)])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const MonthRangePanel = __component__.exports;
function getPanel(type) {
  if (type === "daterange" || type === "datetimerange") {
    return DateRangePanel;
  } else if (type === "monthrange") {
    return MonthRangePanel;
  }
  return DatePanel;
}
const DatePicker = Vue.defineComponent({
  name: "ElDatePicker",
  mixins: [picker.Picker],
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
const _DatePicker = DatePicker;
_DatePicker.install = function install(Vue2) {
  Vue2.component(_DatePicker.name, _DatePicker);
};
module.exports = _DatePicker;
