import { L as Locale } from "./locale-Bemr9FQw.js";
import { m as modifyTime, z as getRangeMinutes, A as getRangeHours, v as timeWithinRange, x as clearMilliseconds, B as limitTimeRange, i as isDate } from "./date-util-CGIytBht.js";
import ElScrollbar from "element-ui/lib/scrollbar";
import { R as RepeatClick } from "./repeat-click-B9Tdq_BJ.js";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main$1 = {
  components: { ElScrollbar },
  directives: {
    repeatClick: RepeatClick
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
      currentScrollbar: null
    };
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
      return getRangeHours(this.selectableRange);
    },
    minutesList() {
      return getRangeMinutes(this.selectableRange, this.hours);
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      !this.arrowControl && this.bindScrollEvent();
    });
  },
  methods: {
    increase() {
      this.scrollDown(1);
    },
    decrease() {
      this.scrollDown(-1);
    },
    modifyDateField(type, value) {
      switch (type) {
        case "hours":
          this.$emit("change", modifyTime(this.date, value, this.minutes, this.seconds));
          break;
        case "minutes":
          this.$emit("change", modifyTime(this.date, this.hours, value, this.seconds));
          break;
        case "seconds":
          this.$emit("change", modifyTime(this.date, this.hours, this.minutes, value));
          break;
      }
    },
    handleClick(type, { value, disabled }) {
      if (!disabled) {
        this.modifyDateField(type, value);
        this.emitSelectRange(type);
        this.adjustSpinner(type, value);
      }
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
    bindScrollEvent() {
      const bindFunction = (type) => {
        this.$refs[type].wrap.onscroll = (e) => {
          this.handleScroll(type, e);
        };
      };
      bindFunction("hours");
      bindFunction("minutes");
      bindFunction("seconds");
    },
    handleScroll(type) {
      const value = Math.min(Math.round((this.$refs[type].wrap.scrollTop - (this.scrollBarHeight(type) * 0.5 - 10) / this.typeItemHeight(type) + 3) / this.typeItemHeight(type)), type === "hours" ? 23 : 59);
      this.modifyDateField(type, value);
    },
    // NOTE: used by datetime / date-range panel
    //       renamed from adjustScrollTop
    //       should try to refactory it
    adjustSpinners() {
      this.adjustSpinner("hours", this.hours);
      this.adjustSpinner("minutes", this.minutes);
      this.adjustSpinner("seconds", this.seconds);
    },
    adjustCurrentSpinner(type) {
      this.adjustSpinner(type, this[type]);
    },
    adjustSpinner(type, value) {
      if (this.arrowControl) {
        return;
      }
      const el = this.$refs[type].wrap;
      if (el) {
        el.scrollTop = Math.max(0, value * this.typeItemHeight(type));
      }
    },
    scrollDown(step) {
      if (!this.currentScrollbar) {
        this.emitSelectRange("hours");
      }
      const label = this.currentScrollbar;
      const hoursList = this.hoursList;
      let now = this[label];
      if (this.currentScrollbar === "hours") {
        let total = Math.abs(step);
        step = step > 0 ? 1 : -1;
        let length = hoursList.length;
        while (length-- && total) {
          now = (now + step + hoursList.length) % hoursList.length;
          if (hoursList[now]) {
            continue;
          }
          total--;
        }
        if (hoursList[now]) {
          return;
        }
      } else {
        now = (now + step + 60) % 60;
      }
      this.modifyDateField(label, now);
      this.adjustSpinner(label, now);
      this.$nextTick(() => this.emitSelectRange(this.currentScrollbar));
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
    typeItemHeight(type) {
      return this.$refs[type].$el.querySelector("li").offsetHeight;
    },
    scrollBarHeight(type) {
      return this.$refs[type].$el.offsetHeight;
    }
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-time-spinner", class: { "has-seconds": _vm.showSeconds } }, [!_vm.arrowControl ? [_c("ElScrollbar", { ref: "hours", staticClass: "el-time-spinner__wrapper", attrs: { "wrap-style": "max-height: inherit;", "view-class": "el-time-spinner__list", "noresize": "", "tag": "ul" }, nativeOn: { "mouseenter": function($event) {
    return _vm.emitSelectRange("hours");
  }, "mousemove": function($event) {
    return _vm.adjustCurrentSpinner("hours");
  } } }, _vm._l(_vm.hoursList, function(disabled, hour) {
    return _c("li", { key: hour, staticClass: "el-time-spinner__item", class: { active: hour === _vm.hours, disabled }, on: { "click": function($event) {
      return _vm.handleClick("hours", { value: hour, disabled });
    } } }, [_vm._v(" " + _vm._s(`0${_vm.amPmMode ? hour % 12 || 12 : hour}`.slice(-2)) + _vm._s(_vm.amPm(hour)) + " ")]);
  }), 0), _c("ElScrollbar", { ref: "minutes", staticClass: "el-time-spinner__wrapper", attrs: { "wrap-style": "max-height: inherit;", "view-class": "el-time-spinner__list", "noresize": "", "tag": "ul" }, nativeOn: { "mouseenter": function($event) {
    return _vm.emitSelectRange("minutes");
  }, "mousemove": function($event) {
    return _vm.adjustCurrentSpinner("minutes");
  } } }, _vm._l(_vm.minutesList, function(enabled, key) {
    return _c("li", { key, staticClass: "el-time-spinner__item", class: { active: key === _vm.minutes, disabled: !enabled }, on: { "click": function($event) {
      return _vm.handleClick("minutes", { value: key, disabled: false });
    } } }, [_vm._v(" " + _vm._s(`0${key}`.slice(-2)) + " ")]);
  }), 0), _c("ElScrollbar", { directives: [{ name: "show", rawName: "v-show", value: _vm.showSeconds, expression: "showSeconds" }], ref: "seconds", staticClass: "el-time-spinner__wrapper", attrs: { "wrap-style": "max-height: inherit;", "view-class": "el-time-spinner__list", "noresize": "", "tag": "ul" }, nativeOn: { "mouseenter": function($event) {
    return _vm.emitSelectRange("seconds");
  }, "mousemove": function($event) {
    return _vm.adjustCurrentSpinner("seconds");
  } } }, _vm._l(60, function(second, key) {
    return _c("li", { key, staticClass: "el-time-spinner__item", class: { active: key === _vm.seconds }, on: { "click": function($event) {
      return _vm.handleClick("seconds", { value: key, disabled: false });
    } } }, [_vm._v(" " + _vm._s(`0${key}`.slice(-2)) + " ")]);
  }), 0)] : _vm._e(), _vm.arrowControl ? [_c("div", { staticClass: "el-time-spinner__wrapper is-arrow", on: { "mouseenter": function($event) {
    return _vm.emitSelectRange("hours");
  } } }, [_c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.decrease, expression: "decrease" }], staticClass: "el-time-spinner__arrow el-icon-arrow-up" }), _c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.increase, expression: "increase" }], staticClass: "el-time-spinner__arrow el-icon-arrow-down" }), _c("ul", { ref: "hours", staticClass: "el-time-spinner__list" }, _vm._l(_vm.arrowHourList, function(hour, key) {
    return _c("li", { key, staticClass: "el-time-spinner__item", class: { active: hour === _vm.hours, disabled: _vm.hoursList[hour] } }, [_vm._v(" " + _vm._s(hour === void 0 ? "" : `0${_vm.amPmMode ? hour % 12 || 12 : hour}`.slice(-2) + _vm.amPm(hour)) + " ")]);
  }), 0)]), _c("div", { staticClass: "el-time-spinner__wrapper is-arrow", on: { "mouseenter": function($event) {
    return _vm.emitSelectRange("minutes");
  } } }, [_c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.decrease, expression: "decrease" }], staticClass: "el-time-spinner__arrow el-icon-arrow-up" }), _c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.increase, expression: "increase" }], staticClass: "el-time-spinner__arrow el-icon-arrow-down" }), _c("ul", { ref: "minutes", staticClass: "el-time-spinner__list" }, _vm._l(_vm.arrowMinuteList, function(minute, key) {
    return _c("li", { key, staticClass: "el-time-spinner__item", class: { active: minute === _vm.minutes } }, [_vm._v(" " + _vm._s(minute === void 0 ? "" : `0${minute}`.slice(-2)) + " ")]);
  }), 0)]), _vm.showSeconds ? _c("div", { staticClass: "el-time-spinner__wrapper is-arrow", on: { "mouseenter": function($event) {
    return _vm.emitSelectRange("seconds");
  } } }, [_c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.decrease, expression: "decrease" }], staticClass: "el-time-spinner__arrow el-icon-arrow-up" }), _c("i", { directives: [{ name: "repeat-click", rawName: "v-repeat-click", value: _vm.increase, expression: "increase" }], staticClass: "el-time-spinner__arrow el-icon-arrow-down" }), _c("ul", { ref: "seconds", staticClass: "el-time-spinner__list" }, _vm._l(_vm.arrowSecondList, function(second, key) {
    return _c("li", { key, staticClass: "el-time-spinner__item", class: { active: second === _vm.seconds } }, [_vm._v(" " + _vm._s(second === void 0 ? "" : `0${second}`.slice(-2)) + " ")]);
  }), 0)]) : _vm._e()] : _vm._e()], 2);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const TimeSpinner = __component__$1.exports;
const _sfc_main = {
  components: {
    TimeSpinner
  },
  mixins: [Locale],
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
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.oldValue = this.value;
        this.$nextTick(() => this.$refs.spinner.emitSelectRange("hours"));
      } else {
        this.needInitAdjust = true;
      }
    },
    value(newVal) {
      let date;
      if (newVal instanceof Date) {
        date = limitTimeRange(newVal, this.selectableRange, this.format);
      } else if (!newVal) {
        date = this.defaultValue ? new Date(this.defaultValue) : /* @__PURE__ */ new Date();
      }
      this.date = date;
      if (this.visible && this.needInitAdjust) {
        this.$nextTick((_) => this.adjustSpinners());
        this.needInitAdjust = false;
      }
    },
    selectableRange(val) {
      this.$refs.spinner.selectableRange = val;
    },
    defaultValue(val) {
      if (!isDate(this.value)) {
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
    handleChange(date) {
      if (this.visible) {
        this.date = clearMilliseconds(date);
        if (this.isValidValue(this.date)) {
          this.$emit("pick", this.date, true);
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
      const date = clearMilliseconds(limitTimeRange(this.date, this.selectableRange, this.format));
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
      return timeWithinRange(date, this.selectableRange, this.format);
    },
    adjustSpinners() {
      return this.$refs.spinner.adjustSpinners();
    },
    changeSelectionRange(step) {
      const list = [0, 3].concat(this.showSeconds ? [6] : []);
      const mapping = ["hours", "minutes"].concat(this.showSeconds ? ["seconds"] : []);
      const index = list.indexOf(this.selectionRange[0]);
      const next = (index + step + list.length) % list.length;
      this.$refs.spinner.emitSelectRange(mapping[next]);
    }
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": function($event) {
    return _vm.$emit("dodestroy");
  } } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-time-panel el-popper", class: _vm.popperClass }, [_c("div", { staticClass: "el-time-panel__content", class: { "has-seconds": _vm.showSeconds } }, [_c("TimeSpinner", { ref: "spinner", attrs: { "arrow-control": _vm.useArrow, "show-seconds": _vm.showSeconds, "am-pm-mode": _vm.amPmMode, "date": _vm.date }, on: { "change": _vm.handleChange, "select-range": _vm.setSelectionRange } })], 1), _c("div", { staticClass: "el-time-panel__footer" }, [_c("button", { staticClass: "el-time-panel__btn cancel", attrs: { "type": "button" }, on: { "click": _vm.handleCancel } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.cancel")) + " ")]), _c("button", { staticClass: "el-time-panel__btn", class: { confirm: !_vm.disabled }, attrs: { "type": "button" }, on: { "click": function($event) {
    return _vm.handleConfirm();
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.datepicker.confirm")) + " ")])])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const TimePanel = __component__.exports;
export {
  TimePanel as T,
  TimeSpinner as a
};
