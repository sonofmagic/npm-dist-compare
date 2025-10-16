import { P as Picker } from "./picker-ClgIO_SP.js";
import ElScrollbar from "element-ui/lib/scrollbar";
import scrollIntoView from "element-ui/lib/utils/scroll-into-view";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const parseTime = function(time) {
  const values = (time || "").split(":");
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10);
    const minutes = parseInt(values[1], 10);
    return {
      hours,
      minutes
    };
  }
  return null;
};
const compareTime = function(time1, time2) {
  const value1 = parseTime(time1);
  const value2 = parseTime(time2);
  const minutes1 = value1.minutes + value1.hours * 60;
  const minutes2 = value2.minutes + value2.hours * 60;
  if (minutes1 === minutes2) {
    return 0;
  }
  return minutes1 > minutes2 ? 1 : -1;
};
const formatTime = function(time) {
  return (time.hours < 10 ? "0" + time.hours : time.hours) + ":" + (time.minutes < 10 ? "0" + time.minutes : time.minutes);
};
const nextTime = function(time, step) {
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
};
const _sfc_main = {
  components: { ElScrollbar },
  watch: {
    value(val) {
      if (!val) return;
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
      scrollIntoView(menu, menu.querySelector(selector));
    },
    handleMenuEnter() {
      const selected = this.items.map((item) => item.value).indexOf(this.value) !== -1;
      const hasDefault = this.items.map((item) => item.value).indexOf(this.defaultValue) !== -1;
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
      return this.items.filter((item) => !item.disabled).map((item) => item.value).indexOf(date) !== -1;
    },
    handleKeydown(event) {
      const keyCode = event.keyCode;
      if (keyCode === 38 || keyCode === 40) {
        const mapping = { 40: 1, 38: -1 };
        const offset = mapping[keyCode.toString()];
        this.scrollDown(offset);
        event.stopPropagation();
        return;
      }
    }
  },
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
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "before-enter": _vm.handleMenuEnter, "after-leave": function($event) {
    return _vm.$emit("dodestroy");
  } } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], ref: "popper", staticClass: "el-picker-panel time-select el-popper", class: _vm.popperClass, style: { width: _vm.width + "px" } }, [_c("el-scrollbar", { attrs: { "noresize": "", "wrap-class": "el-picker-panel__content" } }, _vm._l(_vm.items, function(item) {
    return _c("div", { key: item.value, staticClass: "time-select-item", class: { selected: _vm.value === item.value, disabled: item.disabled, default: item.value === _vm.defaultValue }, attrs: { "disabled": item.disabled }, on: { "click": function($event) {
      return _vm.handleClick(item);
    } } }, [_vm._v(_vm._s(item.value))]);
  }), 0)], 1)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Panel = __component__.exports;
const TimeSelect = {
  mixins: [Picker],
  name: "ElTimeSelect",
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
};
TimeSelect.install = function(Vue) {
  Vue.component(TimeSelect.name, TimeSelect);
};
export {
  TimeSelect as default
};
