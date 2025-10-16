"use strict";
const locale = require("./locale-j1fuSDyN.cjs");
const dateUtil = require("./date-util-1Vppicof.cjs");
const ElButton = require("element-ui/lib/button");
const ElButtonGroup = require("element-ui/lib/button-group");
const Vue = require("vue");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main$1 = {
  props: {
    selectedDay: String,
    // formated date yyyy-MM-dd
    range: {
      type: Array,
      validator(val) {
        if (!(val && val.length)) return true;
        const [start, end] = val;
        return dateUtil.validateRangeInOneMonth(start, end);
      }
    },
    date: Date,
    hideHeader: Boolean,
    firstDayOfWeek: Number
  },
  inject: ["elCalendar"],
  methods: {
    toNestedArr(days) {
      return dateUtil.range(days.length / 7).map((_, index) => {
        const start = index * 7;
        return days.slice(start, start + 7);
      });
    },
    getFormateDate(day, type) {
      if (!day || ["prev", "current", "next"].indexOf(type) === -1) {
        throw new Error("invalid day or type");
      }
      let prefix = this.curMonthDatePrefix;
      if (type === "prev") {
        prefix = this.prevMonthDatePrefix;
      } else if (type === "next") {
        prefix = this.nextMonthDatePrefix;
      }
      day = `00${day}`.slice(-2);
      return `${prefix}-${day}`;
    },
    getCellClass({
      text,
      type
    }) {
      const classes = [type];
      if (type === "current") {
        const date = this.getFormateDate(text, type);
        if (date === this.selectedDay) {
          classes.push("is-selected");
        }
        if (date === this.formatedToday) {
          classes.push("is-today");
        }
      }
      return classes;
    },
    pickDay({
      text,
      type
    }) {
      const date = this.getFormateDate(text, type);
      this.$emit("pick", date);
    },
    cellRenderProxy({
      text,
      type
    }) {
      let render2 = this.elCalendar.$scopedSlots.dateCell;
      if (!render2) return Vue.h("span", [text]);
      const day = this.getFormateDate(text, type);
      const date = new Date(day);
      const data = {
        isSelected: this.selectedDay === day,
        type: `${type}-month`,
        day
      };
      return render2({
        date,
        data
      });
    }
  },
  computed: {
    WEEK_DAYS() {
      return dateUtil.getI18nSettings().dayNames;
    },
    prevMonthDatePrefix() {
      const temp = new Date(this.date.getTime());
      temp.setDate(0);
      return dateUtil.fecha.format(temp, "yyyy-MM");
    },
    curMonthDatePrefix() {
      return dateUtil.fecha.format(this.date, "yyyy-MM");
    },
    nextMonthDatePrefix() {
      const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
      return dateUtil.fecha.format(temp, "yyyy-MM");
    },
    formatedToday() {
      return this.elCalendar.formatedToday;
    },
    isInRange() {
      return this.range && this.range.length;
    },
    rows() {
      let days = [];
      if (this.isInRange) {
        const [start, end] = this.range;
        const currentMonthRange = dateUtil.range(end.getDate() - start.getDate() + 1).map((_, index) => ({
          text: start.getDate() + index,
          type: "current"
        }));
        let remaining = currentMonthRange.length % 7;
        remaining = remaining === 0 ? 0 : 7 - remaining;
        const nextMonthRange = dateUtil.range(remaining).map((_, index) => ({
          text: index + 1,
          type: "next"
        }));
        days = currentMonthRange.concat(nextMonthRange);
      } else {
        const date = this.date;
        let firstDay = dateUtil.getFirstDayOfMonth(date);
        firstDay = firstDay === 0 ? 7 : firstDay;
        const firstDayOfWeek = typeof this.firstDayOfWeek === "number" ? this.firstDayOfWeek : 1;
        const offset = (7 + firstDay - firstDayOfWeek) % 7;
        const prevMonthDays = dateUtil.getPrevMonthLastDays(date, offset).map((day) => ({
          text: day,
          type: "prev"
        }));
        const currentMonthDays = dateUtil.getMonthDays(date).map((day) => ({
          text: day,
          type: "current"
        }));
        days = [...prevMonthDays, ...currentMonthDays];
        const nextMonthDays = dateUtil.range(42 - days.length).map((_, index) => ({
          text: index + 1,
          type: "next"
        }));
        days = days.concat(nextMonthDays);
      }
      return this.toNestedArr(days);
    },
    weekDays() {
      const start = this.firstDayOfWeek;
      const {
        WEEK_DAYS
      } = this;
      if (typeof start !== "number" || start === 0) {
        return WEEK_DAYS.slice();
      } else {
        return WEEK_DAYS.slice(start).concat(WEEK_DAYS.slice(0, start));
      }
    }
  },
  render() {
    const thead = this.hideHeader ? null : Vue.h("thead", [this.weekDays.map((day) => Vue.h("th", {
      "key": day
    }, [day]))]);
    return Vue.h("table", {
      "class": {
        "el-calendar-table": true,
        "is-range": this.isInRange
      },
      "attrs": {
        "cellspacing": "0",
        "cellpadding": "0"
      }
    }, [thead, Vue.h("tbody", [this.rows.map((row, index) => Vue.h("tr", {
      "class": {
        "el-calendar-table__row": true,
        "el-calendar-table__row--hide-border": index === 0 && this.hideHeader
      },
      "key": index
    }, [row.map((cell, key) => Vue.h("td", {
      "key": key,
      "class": this.getCellClass(cell),
      "on": {
        "click": this.pickDay.bind(this, cell)
      }
    }, [Vue.h("div", {
      "class": "el-calendar-day"
    }, [this.cellRenderProxy(cell)])]))]))])]);
  }
};
const _sfc_render$1 = null;
const _sfc_staticRenderFns$1 = null;
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const DateTable = __component__$1.exports;
const validTypes = ["prev-month", "today", "next-month"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const oneDay = 864e5;
const _sfc_main = {
  name: "ElCalendar",
  mixins: [locale.Locale],
  components: {
    DateTable,
    ElButton,
    ElButtonGroup
  },
  props: {
    value: [Date, String, Number],
    range: {
      type: Array,
      validator(range) {
        if (Array.isArray(range)) {
          return range.length === 2 && range.every(
            (item) => typeof item === "string" || typeof item === "number" || item instanceof Date
          );
        } else {
          return true;
        }
      }
    },
    firstDayOfWeek: {
      type: Number,
      default: 1
    }
  },
  provide() {
    return {
      elCalendar: this
    };
  },
  methods: {
    pickDay(day) {
      this.realSelectedDay = day;
    },
    selectDate(type) {
      if (validTypes.indexOf(type) === -1) {
        throw new Error(`invalid type ${type}`);
      }
      let day = "";
      if (type === "prev-month") {
        day = `${this.prevMonthDatePrefix}-01`;
      } else if (type === "next-month") {
        day = `${this.nextMonthDatePrefix}-01`;
      } else {
        day = this.formatedToday;
      }
      if (day === this.formatedDate) return;
      this.pickDay(day);
    },
    toDate(val) {
      if (!val) {
        throw new Error("invalid val");
      }
      return val instanceof Date ? val : new Date(val);
    },
    rangeValidator(date, isStart) {
      const firstDayOfWeek = this.realFirstDayOfWeek;
      const expected = isStart ? firstDayOfWeek : firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
      const message = `${isStart ? "start" : "end"} of range should be ${weekDays[expected]}.`;
      if (date.getDay() !== expected) {
        console.warn("[ElementCalendar]", message, "Invalid range will be ignored.");
        return false;
      }
      return true;
    }
  },
  computed: {
    prevMonthDatePrefix() {
      const temp = new Date(this.date.getTime());
      temp.setDate(0);
      return dateUtil.fecha.format(temp, "yyyy-MM");
    },
    curMonthDatePrefix() {
      return dateUtil.fecha.format(this.date, "yyyy-MM");
    },
    nextMonthDatePrefix() {
      const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
      return dateUtil.fecha.format(temp, "yyyy-MM");
    },
    formatedDate() {
      return dateUtil.fecha.format(this.date, "yyyy-MM-dd");
    },
    i18nDate() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      return `${year} ${this.t("el.datepicker.year")} ${this.t("el.datepicker.month" + month)}`;
    },
    formatedToday() {
      return dateUtil.fecha.format(this.now, "yyyy-MM-dd");
    },
    realSelectedDay: {
      get() {
        if (!this.value) return this.selectedDay;
        return this.formatedDate;
      },
      set(val) {
        this.selectedDay = val;
        const date = new Date(val);
        this.$emit("input", date);
      }
    },
    date() {
      if (!this.value) {
        if (this.realSelectedDay) {
          const d = this.selectedDay.split("-");
          return new Date(d[0], d[1] - 1, d[2]);
        } else if (this.validatedRange.length) {
          return this.validatedRange[0][0];
        }
        return this.now;
      } else {
        return this.toDate(this.value);
      }
    },
    // if range is valid, we get a two-digit array
    validatedRange() {
      let range = this.range;
      if (!range) return [];
      range = range.reduce((prev, val, index) => {
        const date = this.toDate(val);
        if (this.rangeValidator(date, index === 0)) {
          prev = prev.concat(date);
        }
        return prev;
      }, []);
      if (range.length === 2) {
        const [start, end] = range;
        if (start > end) {
          console.warn("[ElementCalendar]end time should be greater than start time");
          return [];
        }
        if (dateUtil.validateRangeInOneMonth(start, end)) {
          return [
            [start, end]
          ];
        }
        const data = [];
        let startDay = new Date(start.getFullYear(), start.getMonth() + 1, 1);
        const lastDay = this.toDate(startDay.getTime() - oneDay);
        if (!dateUtil.validateRangeInOneMonth(startDay, end)) {
          console.warn("[ElementCalendar]start time and end time interval must not exceed two months");
          return [];
        }
        data.push([
          start,
          lastDay
        ]);
        const firstDayOfWeek = this.realFirstDayOfWeek;
        const nextMontFirstDay = startDay.getDay();
        let interval = 0;
        if (nextMontFirstDay !== firstDayOfWeek) {
          if (firstDayOfWeek === 0) {
            interval = 7 - nextMontFirstDay;
          } else {
            interval = firstDayOfWeek - nextMontFirstDay;
            interval = interval > 0 ? interval : 7 + interval;
          }
        }
        startDay = this.toDate(startDay.getTime() + interval * oneDay);
        if (startDay.getDate() < end.getDate()) {
          data.push([
            startDay,
            end
          ]);
        }
        return data;
      }
      return [];
    },
    realFirstDayOfWeek() {
      if (this.firstDayOfWeek < 1 || this.firstDayOfWeek > 6) {
        return 0;
      }
      return Math.floor(this.firstDayOfWeek);
    }
  },
  data() {
    return {
      selectedDay: "",
      now: /* @__PURE__ */ new Date()
    };
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-calendar" }, [_c("div", { staticClass: "el-calendar__header" }, [_c("div", { staticClass: "el-calendar__title" }, [_vm._v(" " + _vm._s(_vm.i18nDate) + " ")]), _vm.validatedRange.length === 0 ? _c("div", { staticClass: "el-calendar__button-group" }, [_c("el-button-group", [_c("el-button", { attrs: { "type": "plain", "size": "mini" }, on: { "click": function($event) {
    return _vm.selectDate("prev-month");
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.prevMonth")) + " ")]), _c("el-button", { attrs: { "type": "plain", "size": "mini" }, on: { "click": function($event) {
    return _vm.selectDate("today");
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.today")) + " ")]), _c("el-button", { attrs: { "type": "plain", "size": "mini" }, on: { "click": function($event) {
    return _vm.selectDate("next-month");
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.nextMonth")) + " ")])], 1)], 1) : _vm._e()]), _vm.validatedRange.length === 0 ? _c("div", { key: "no-range", staticClass: "el-calendar__body" }, [_c("date-table", { attrs: { "date": _vm.date, "selected-day": _vm.realSelectedDay, "first-day-of-week": _vm.realFirstDayOfWeek }, on: { "pick": _vm.pickDay } })], 1) : _c("div", { key: "has-range", staticClass: "el-calendar__body" }, _vm._l(_vm.validatedRange, function(range, index) {
    return _c("date-table", { key: index, attrs: { "date": range[0], "selected-day": _vm.realSelectedDay, "range": range, "hide-header": index !== 0, "first-day-of-week": _vm.realFirstDayOfWeek }, on: { "pick": _vm.pickDay } });
  }), 1)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Calendar = __component__.exports;
const _Calendar = Calendar;
_Calendar.install = function install(Vue2) {
  Vue2.component(_Calendar.name, _Calendar);
};
module.exports = _Calendar;
