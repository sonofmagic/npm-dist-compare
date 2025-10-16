import { reduce, chain, multiply, padStart, isNumber } from "element-ui/lib/utils/lodash";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElStatistic",
  data() {
    return {
      disposeValue: "",
      timeTask: null,
      REFRESH_INTERVAL: 1e3 / 30
    };
  },
  props: {
    decimalSeparator: {
      type: String,
      default: "."
    },
    groupSeparator: {
      type: String,
      default: ""
    },
    precision: {
      type: Number,
      default: null
    },
    value: {
      type: [String, Number, Date],
      default: ""
    },
    prefix: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    title: {
      type: [String, Number],
      default: ""
    },
    timeIndices: {
      type: Boolean,
      default: false
    },
    valueStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    format: {
      type: String,
      default: "HH:mm:ss:SSS"
    },
    rate: {
      type: Number,
      default: 1e3
    }
  },
  created() {
    this.branch();
  },
  watch: {
    value: function() {
      this.branch();
    },
    groupSeparator() {
      this.dispose();
    },
    mulriple() {
      this.dispose();
    }
  },
  methods: {
    branch() {
      let { timeIndices, countDown, dispose } = this;
      if (timeIndices) {
        countDown(this.value.valueOf() || this.value);
      } else {
        dispose();
      }
    },
    magnification(num, mulriple = 1e3, groupSeparator = ",") {
      const level = String(mulriple).length;
      return num.replace(new RegExp(`(\\d)(?=(\\d{${level - 1}})+$)`, "g"), `$1${groupSeparator}`);
    },
    dispose() {
      let { value, rate, groupSeparator } = this;
      if (!isNumber(value)) return false;
      if (this.precision) {
        value = value.toFixed(this.precision);
      }
      let [integer, decimal] = String(value).split(".");
      if (groupSeparator) {
        integer = this.magnification(integer, rate, groupSeparator);
      }
      let result = `${integer}${decimal ? this.decimalSeparator + decimal : ""}`;
      this.disposeValue = result;
      return result;
    },
    diffDate(minuend, subtrahend) {
      return Math.max(minuend - subtrahend, 0);
    },
    suspend(isStop) {
      if (isStop) {
        if (this.timeTask) {
          clearInterval(this.timeTask);
          this.timeTask = null;
        }
      } else {
        this.branch();
      }
      return this.disposeValue;
    },
    formatTimeStr: function(time) {
      let { format } = this;
      const escapeRegex = /\[[^\]]*]/g;
      const keepList = (format.match(escapeRegex) || []).map((str) => str.slice(1, -1));
      const timeUnits = [
        ["Y", 1e3 * 60 * 60 * 24 * 365],
        // years
        ["M", 1e3 * 60 * 60 * 24 * 30],
        // months
        ["D", 1e3 * 60 * 60 * 24],
        // days
        ["H", 1e3 * 60 * 60],
        // hours
        ["m", 1e3 * 60],
        // minutes
        ["s", 1e3],
        // seconds
        ["S", 1]
        // million seconds
      ];
      let formatText = reduce(
        timeUnits,
        (con, item) => {
          const name = item[0];
          return con.replace(new RegExp(`${name}+`, "g"), (match) => {
            let sum = chain(time).divide(item[1]).floor(0).value();
            time -= multiply(sum, item[1]);
            return padStart(String(sum), String(match).length, 0);
          });
        },
        format
      );
      let index = 0;
      return formatText.replace(escapeRegex, () => {
        const match = keepList[index];
        index += 1;
        return match;
      });
    },
    stopTime(time) {
      let result = true;
      if (time) {
        this.$emit("change", time);
        result = false;
      } else {
        result = true;
        this.suspend(true);
        this.$emit("finish", true);
      }
      return result;
    },
    countDown(timeVlaue) {
      let { REFRESH_INTERVAL, timeTask, diffDate, formatTimeStr, stopTime, suspend } = this;
      if (timeTask) return;
      let than = this;
      this.timeTask = setInterval(() => {
        let diffTiem = diffDate(timeVlaue, Date.now());
        than.disposeValue = formatTimeStr(diffTiem);
        stopTime(diffTiem);
      }, REFRESH_INTERVAL);
      this.$once("hook:beforeDestroy", () => {
        suspend(true);
      });
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-statistic" }, [_vm.title || _vm.$slots.title ? _c("div", { staticClass: "head" }, [_vm._t("title", function() {
    return [_c("span", { staticClass: "title" }, [_vm._v(" " + _vm._s(_vm.title) + " ")])];
  })], 2) : _vm._e(), _c("div", { staticClass: "con" }, [_vm.prefix || _vm.$slots.prefix ? _c("span", { staticClass: "prefix" }, [_vm._t("prefix", function() {
    return [_vm._v(" " + _vm._s(_vm.prefix) + " ")];
  })], 2) : _vm._e(), _c("span", { staticClass: "number", style: _vm.valueStyle }, [_vm._t("formatter", function() {
    return [_vm._v(" " + _vm._s(_vm.disposeValue))];
  })], 2), _vm.suffix || _vm.$slots.suffix ? _c("span", { staticClass: "suffix" }, [_vm._t("suffix", function() {
    return [_vm._v(" " + _vm._s(_vm.suffix) + " ")];
  })], 2) : _vm._e()])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Statistic = __component__.exports;
Statistic.install = function(Vue) {
  Vue.component(Statistic.name, Statistic);
};
export {
  Statistic as default
};
