"use strict";
const Vue = require("vue");
const ElScrollbar = require("element-ui/lib/scrollbar");
const scrollIntoView = require("./scroll-into-view-OKjZ3Vzu.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const picker = require("./picker-BexJaURa.cjs");
function parseTime(time) {
  const values = (time || "").split(":");
  if (values.length >= 2) {
    const hours = Number.parseInt(values[0], 10);
    const minutes = Number.parseInt(values[1], 10);
    return {
      hours,
      minutes
    };
  }
  return null;
}
function compareTime(time1, time2) {
  const value1 = parseTime(time1);
  const value2 = parseTime(time2);
  const minutes1 = value1.minutes + value1.hours * 60;
  const minutes2 = value2.minutes + value2.hours * 60;
  if (minutes1 === minutes2) {
    return 0;
  }
  return minutes1 > minutes2 ? 1 : -1;
}
function formatTime(time) {
  return `${time.hours < 10 ? `0${time.hours}` : time.hours}:${time.minutes < 10 ? `0${time.minutes}` : time.minutes}`;
}
function nextTime(time, step) {
  const timeValue = parseTime(time);
  const stepValue = parseTime(step);
  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };
  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;
  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;
  return formatTime(next);
}
const _sfc_main = {
  components: { ElScrollbar },
  data() {
    return {
      popperClass: "",
      start: "09:00",
      end: "18:00",
      step: "00:30",
      value: "",
      defaultValue: "",
      visible: false,
      minTime: "",
      maxTime: "",
      width: 0
    };
  },
  computed: {
    items() {
      const start = this.start;
      const end = this.end;
      const step = this.step;
      const result = [];
      if (start && end && step) {
        let current = start;
        while (compareTime(current, end) <= 0) {
          result.push({
            value: current,
            disabled: compareTime(current, this.minTime || "-1:-1") <= 0 || compareTime(current, this.maxTime || "100:100") >= 0
          });
          current = nextTime(current, step);
        }
      }
      return result;
    }
  },
  watch: {
    value(val) {
      if (!val) {
        return;
      }
      this.$nextTick(() => this.scrollToOption());
    }
  },
  methods: {
    handleClick(item) {
      if (!item.disabled) {
        this.$emit("pick", item.value);
      }
    },
    handleClear() {
      this.$emit("pick", null);
    },
    scrollToOption(selector = ".selected") {
      const menu = this.$refs.popper.querySelector(".el-picker-panel__content");
      scrollIntoView.scrollIntoView(menu, menu.querySelector(selector));
    },
    handleMenuEnter() {
      const selected = this.items.map((item) => item.value).includes(this.value);
      const hasDefault = this.items.map((item) => item.value).includes(this.defaultValue);
      const option = selected && ".selected" || hasDefault && ".default" || ".time-select-item:not(.disabled)";
      this.$nextTick(() => this.scrollToOption(option));
    },
    scrollDown(step) {
      const items = this.items;
      const length = items.length;
      let total = items.length;
      let index = items.map((item) => item.value).indexOf(this.value);
      while (total--) {
        index = (index + step + length) % length;
        if (!items[index].disabled) {
          this.$emit("pick", items[index].value, true);
          return;
        }
      }
    },
    isValidValue(date) {
      return this.items.filter((item) => !item.disabled).map((item) => item.value).includes(date);
    },
    handleKeydown(event) {
      const keyCode = event.keyCode;
      if (keyCode === 38 || keyCode === 40) {
        const mapping = { 40: 1, 38: -1 };
        const offset = mapping[keyCode.toString()];
        this.scrollDown(offset);
        event.stopPropagation();
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "before-enter": _vm.handleMenuEnter, "after-leave": function($event) {
    return _vm.$emit("dodestroy");
  } } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], ref: "popper", staticClass: "el-picker-panel time-select el-popper", class: _vm.popperClass, style: { width: `${_vm.width}px` } }, [_c("ElScrollbar", { attrs: { "noresize": "", "wrap-class": "el-picker-panel__content" } }, _vm._l(_vm.items, function(item) {
    return _c("div", { key: item.value, staticClass: "time-select-item", class: { selected: _vm.value === item.value, disabled: item.disabled, default: item.value === _vm.defaultValue }, attrs: { "disabled": item.disabled }, on: { "click": function($event) {
      return _vm.handleClick(item);
    } } }, [_vm._v(" " + _vm._s(item.value) + " ")]);
  }), 0)], 1)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Panel = __component__.exports;
const TimeSelect = Vue.defineComponent({
  name: "ElTimeSelect",
  mixins: [picker.Picker],
  componentName: "ElTimeSelect",
  props: {
    type: {
      type: String,
      default: "time-select"
    }
  },
  beforeCreate() {
    this.panel = Panel;
  }
});
const _TimeSelect = TimeSelect;
_TimeSelect.install = function install(Vue2) {
  Vue2.component(_TimeSelect.name, _TimeSelect);
};
module.exports = _TimeSelect;
