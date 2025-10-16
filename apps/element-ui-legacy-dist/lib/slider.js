import ElInputNumber from "element-ui/lib/input-number";
import ElTooltip from "element-ui/lib/tooltip";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
import { h } from "vue";
import Emitter from "element-ui/lib/mixins/emitter";
const _sfc_main$1 = {
  name: "ElSliderButton",
  components: {
    ElTooltip
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    vertical: {
      type: Boolean,
      default: false
    },
    tooltipClass: String
  },
  data() {
    return {
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: null,
      oldValue: this.value
    };
  },
  computed: {
    disabled() {
      return this.$parent.sliderDisabled;
    },
    max() {
      return this.$parent.max;
    },
    min() {
      return this.$parent.min;
    },
    step() {
      return this.$parent.step;
    },
    showTooltip() {
      return this.$parent.showTooltip;
    },
    precision() {
      return this.$parent.precision;
    },
    currentPosition() {
      return `${(this.value - this.min) / (this.max - this.min) * 100}%`;
    },
    enableFormat() {
      return this.$parent.formatTooltip instanceof Function;
    },
    formatValue() {
      return this.enableFormat && this.$parent.formatTooltip(this.value) || this.value;
    },
    wrapperStyle() {
      return this.vertical ? { bottom: this.currentPosition } : { left: this.currentPosition };
    }
  },
  watch: {
    dragging(val) {
      this.$parent.dragging = val;
    }
  },
  methods: {
    displayTooltip() {
      this.$refs.tooltip && (this.$refs.tooltip.showPopper = true);
    },
    hideTooltip() {
      this.$refs.tooltip && (this.$refs.tooltip.showPopper = false);
    },
    handleMouseEnter() {
      this.hovering = true;
      this.displayTooltip();
    },
    handleMouseLeave() {
      this.hovering = false;
      this.hideTooltip();
    },
    onButtonDown(event) {
      if (this.disabled) return;
      event.preventDefault();
      this.onDragStart(event);
      window.addEventListener("mousemove", this.onDragging);
      window.addEventListener("touchmove", this.onDragging);
      window.addEventListener("mouseup", this.onDragEnd);
      window.addEventListener("touchend", this.onDragEnd);
      window.addEventListener("contextmenu", this.onDragEnd);
    },
    onLeftKeyDown() {
      if (this.disabled) return;
      this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.$parent.emitChange();
    },
    onRightKeyDown() {
      if (this.disabled) return;
      this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100;
      this.setPosition(this.newPosition);
      this.$parent.emitChange();
    },
    onDragStart(event) {
      this.dragging = true;
      this.isClick = true;
      if (event.type === "touchstart") {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }
      if (this.vertical) {
        this.startY = event.clientY;
      } else {
        this.startX = event.clientX;
      }
      this.startPosition = parseFloat(this.currentPosition);
      this.newPosition = this.startPosition;
    },
    onDragging(event) {
      if (this.dragging) {
        this.isClick = false;
        this.displayTooltip();
        this.$parent.resetSize();
        let diff = 0;
        if (event.type === "touchmove") {
          event.clientY = event.touches[0].clientY;
          event.clientX = event.touches[0].clientX;
        }
        if (this.vertical) {
          this.currentY = event.clientY;
          diff = (this.startY - this.currentY) / this.$parent.sliderSize * 100;
        } else {
          this.currentX = event.clientX;
          diff = (this.currentX - this.startX) / this.$parent.sliderSize * 100;
        }
        this.newPosition = this.startPosition + diff;
        this.setPosition(this.newPosition);
      }
    },
    onDragEnd() {
      if (this.dragging) {
        setTimeout(() => {
          this.dragging = false;
          this.hideTooltip();
          if (!this.isClick) {
            this.setPosition(this.newPosition);
            this.$parent.emitChange();
          }
        }, 0);
        window.removeEventListener("mousemove", this.onDragging);
        window.removeEventListener("touchmove", this.onDragging);
        window.removeEventListener("mouseup", this.onDragEnd);
        window.removeEventListener("touchend", this.onDragEnd);
        window.removeEventListener("contextmenu", this.onDragEnd);
      }
    },
    setPosition(newPosition) {
      if (newPosition === null || isNaN(newPosition)) return;
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > 100) {
        newPosition = 100;
      }
      const lengthPerStep = 100 / ((this.max - this.min) / this.step);
      const steps = Math.round(newPosition / lengthPerStep);
      let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
      value = parseFloat(value.toFixed(this.precision));
      this.$emit("input", value);
      this.$nextTick(() => {
        this.displayTooltip();
        this.$refs.tooltip && this.$refs.tooltip.updatePopper();
      });
      if (!this.dragging && this.value !== this.oldValue) {
        this.oldValue = this.value;
      }
    }
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { ref: "button", staticClass: "el-slider__button-wrapper", class: { "hover": _vm.hovering, "dragging": _vm.dragging }, style: _vm.wrapperStyle, attrs: { "tabindex": "0" }, on: { "mouseenter": _vm.handleMouseEnter, "mouseleave": _vm.handleMouseLeave, "mousedown": _vm.onButtonDown, "touchstart": _vm.onButtonDown, "focus": _vm.handleMouseEnter, "blur": _vm.handleMouseLeave, "keydown": [function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) return null;
    if ("button" in $event && $event.button !== 0) return null;
    return _vm.onLeftKeyDown.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) return null;
    if ("button" in $event && $event.button !== 2) return null;
    return _vm.onRightKeyDown.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) return null;
    $event.preventDefault();
    return _vm.onLeftKeyDown.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) return null;
    $event.preventDefault();
    return _vm.onRightKeyDown.apply(null, arguments);
  }] } }, [_c("el-tooltip", { ref: "tooltip", attrs: { "placement": "top", "popper-class": _vm.tooltipClass, "disabled": !_vm.showTooltip } }, [_c("span", { attrs: { "slot": "content" }, slot: "content" }, [_vm._v(_vm._s(_vm.formatValue))]), _c("div", { staticClass: "el-slider__button", class: { "hover": _vm.hovering, "dragging": _vm.dragging } })])], 1);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const SliderButton = __component__$1.exports;
const SliderMarker = {
  name: "ElMarker",
  props: {
    mark: {
      type: [String, Object]
    }
  },
  render() {
    let label = typeof this.mark === "string" ? this.mark : this.mark.label;
    return h("div", {
      "class": "el-slider__marks-text",
      "style": this.mark.style || {}
    }, [label]);
  }
};
const _sfc_main = {
  name: "ElSlider",
  mixins: [Emitter],
  inject: {
    elForm: {
      default: ""
    }
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: [Number, Array],
      default: 0
    },
    showInput: {
      type: Boolean,
      default: false
    },
    showInputControls: {
      type: Boolean,
      default: true
    },
    inputSize: {
      type: String,
      default: "small"
    },
    showStops: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    formatTooltip: Function,
    disabled: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    height: {
      type: String
    },
    debounce: {
      type: Number,
      default: 300
    },
    label: {
      type: String
    },
    tooltipClass: String,
    marks: Object
  },
  components: {
    ElInputNumber,
    SliderButton,
    SliderMarker
  },
  data() {
    return {
      firstValue: null,
      secondValue: null,
      oldValue: null,
      dragging: false,
      sliderSize: 1
    };
  },
  watch: {
    value(val, oldVal) {
      if (this.dragging || Array.isArray(val) && Array.isArray(oldVal) && val.every((item, index) => item === oldVal[index])) {
        return;
      }
      this.setValues();
    },
    dragging(val) {
      if (!val) {
        this.setValues();
      }
    },
    firstValue(val) {
      if (this.range) {
        this.$emit("input", [this.minValue, this.maxValue]);
      } else {
        this.$emit("input", val);
      }
    },
    secondValue() {
      if (this.range) {
        this.$emit("input", [this.minValue, this.maxValue]);
      }
    },
    min() {
      this.setValues();
    },
    max() {
      this.setValues();
    }
  },
  methods: {
    valueChanged() {
      if (this.range) {
        return ![this.minValue, this.maxValue].every((item, index) => item === this.oldValue[index]);
      } else {
        return this.value !== this.oldValue;
      }
    },
    setValues() {
      if (this.min > this.max) {
        console.error("[Element Error][Slider]min should not be greater than max.");
        return;
      }
      const val = this.value;
      if (this.range && Array.isArray(val)) {
        if (val[1] < this.min) {
          this.$emit("input", [this.min, this.min]);
        } else if (val[0] > this.max) {
          this.$emit("input", [this.max, this.max]);
        } else if (val[0] < this.min) {
          this.$emit("input", [this.min, val[1]]);
        } else if (val[1] > this.max) {
          this.$emit("input", [val[0], this.max]);
        } else {
          this.firstValue = val[0];
          this.secondValue = val[1];
          if (this.valueChanged()) {
            this.dispatch("ElFormItem", "el.form.change", [this.minValue, this.maxValue]);
            this.oldValue = val.slice();
          }
        }
      } else if (!this.range && typeof val === "number" && !isNaN(val)) {
        if (val < this.min) {
          this.$emit("input", this.min);
        } else if (val > this.max) {
          this.$emit("input", this.max);
        } else {
          this.firstValue = val;
          if (this.valueChanged()) {
            this.dispatch("ElFormItem", "el.form.change", val);
            this.oldValue = val;
          }
        }
      }
    },
    setPosition(percent) {
      const targetValue = this.min + percent * (this.max - this.min) / 100;
      if (!this.range) {
        this.$refs.button1.setPosition(percent);
        return;
      }
      let button;
      if (Math.abs(this.minValue - targetValue) < Math.abs(this.maxValue - targetValue)) {
        button = this.firstValue < this.secondValue ? "button1" : "button2";
      } else {
        button = this.firstValue > this.secondValue ? "button1" : "button2";
      }
      this.$refs[button].setPosition(percent);
    },
    onSliderClick(event) {
      if (this.sliderDisabled || this.dragging) return;
      this.resetSize();
      if (this.vertical) {
        const sliderOffsetBottom = this.$refs.slider.getBoundingClientRect().bottom;
        this.setPosition((sliderOffsetBottom - event.clientY) / this.sliderSize * 100);
      } else {
        const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
        this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize * 100);
      }
      this.emitChange();
    },
    resetSize() {
      if (this.$refs.slider) {
        this.sliderSize = this.$refs.slider[`client${this.vertical ? "Height" : "Width"}`];
      }
    },
    emitChange() {
      this.$nextTick(() => {
        this.$emit("change", this.range ? [this.minValue, this.maxValue] : this.value);
      });
    },
    getStopStyle(position) {
      return this.vertical ? { "bottom": position + "%" } : { "left": position + "%" };
    }
  },
  computed: {
    stops() {
      if (!this.showStops || this.min > this.max) return [];
      if (this.step === 0) {
        process.env.NODE_ENV !== "production" && console.warn("[Element Warn][Slider]step should not be 0.");
        return [];
      }
      const stopCount = (this.max - this.min) / this.step;
      const stepWidth = 100 * this.step / (this.max - this.min);
      const result = [];
      for (let i = 1; i < stopCount; i++) {
        result.push(i * stepWidth);
      }
      if (this.range) {
        return result.filter((step) => {
          return step < 100 * (this.minValue - this.min) / (this.max - this.min) || step > 100 * (this.maxValue - this.min) / (this.max - this.min);
        });
      } else {
        return result.filter((step) => step > 100 * (this.firstValue - this.min) / (this.max - this.min));
      }
    },
    markList() {
      if (!this.marks) {
        return [];
      }
      const marksKeys = Object.keys(this.marks);
      return marksKeys.map(parseFloat).sort((a, b) => a - b).filter((point) => point <= this.max && point >= this.min).map((point) => ({
        point,
        position: (point - this.min) * 100 / (this.max - this.min),
        mark: this.marks[point]
      }));
    },
    minValue() {
      return Math.min(this.firstValue, this.secondValue);
    },
    maxValue() {
      return Math.max(this.firstValue, this.secondValue);
    },
    barSize() {
      return this.range ? `${100 * (this.maxValue - this.minValue) / (this.max - this.min)}%` : `${100 * (this.firstValue - this.min) / (this.max - this.min)}%`;
    },
    barStart() {
      return this.range ? `${100 * (this.minValue - this.min) / (this.max - this.min)}%` : "0%";
    },
    precision() {
      let precisions = [this.min, this.max, this.step].map((item) => {
        let decimal = ("" + item).split(".")[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max.apply(null, precisions);
    },
    runwayStyle() {
      return this.vertical ? { height: this.height } : {};
    },
    barStyle() {
      return this.vertical ? {
        height: this.barSize,
        bottom: this.barStart
      } : {
        width: this.barSize,
        left: this.barStart
      };
    },
    sliderDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  mounted() {
    let valuetext;
    if (this.range) {
      if (Array.isArray(this.value)) {
        this.firstValue = Math.max(this.min, this.value[0]);
        this.secondValue = Math.min(this.max, this.value[1]);
      } else {
        this.firstValue = this.min;
        this.secondValue = this.max;
      }
      this.oldValue = [this.firstValue, this.secondValue];
      valuetext = `${this.firstValue}-${this.secondValue}`;
    } else {
      if (typeof this.value !== "number" || isNaN(this.value)) {
        this.firstValue = this.min;
      } else {
        this.firstValue = Math.min(this.max, Math.max(this.min, this.value));
      }
      this.oldValue = this.firstValue;
      valuetext = this.firstValue;
    }
    this.$el.setAttribute("aria-valuetext", valuetext);
    this.$el.setAttribute("aria-label", this.label ? this.label : `slider between ${this.min} and ${this.max}`);
    this.resetSize();
    window.addEventListener("resize", this.resetSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resetSize);
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-slider", class: { "is-vertical": _vm.vertical, "el-slider--with-input": _vm.showInput }, attrs: { "role": "slider", "aria-valuemin": _vm.min, "aria-valuemax": _vm.max, "aria-orientation": _vm.vertical ? "vertical" : "horizontal", "aria-disabled": _vm.sliderDisabled } }, [_vm.showInput && !_vm.range ? _c("el-input-number", { ref: "input", staticClass: "el-slider__input", attrs: { "step": _vm.step, "disabled": _vm.sliderDisabled, "controls": _vm.showInputControls, "min": _vm.min, "max": _vm.max, "debounce": _vm.debounce, "size": _vm.inputSize }, on: { "change": _vm.emitChange }, model: { value: _vm.firstValue, callback: function($$v) {
    _vm.firstValue = $$v;
  }, expression: "firstValue" } }) : _vm._e(), _c("div", { ref: "slider", staticClass: "el-slider__runway", class: { "show-input": _vm.showInput, "disabled": _vm.sliderDisabled }, style: _vm.runwayStyle, on: { "click": _vm.onSliderClick } }, [_c("div", { staticClass: "el-slider__bar", style: _vm.barStyle }), _c("slider-button", { ref: "button1", attrs: { "vertical": _vm.vertical, "tooltip-class": _vm.tooltipClass }, model: { value: _vm.firstValue, callback: function($$v) {
    _vm.firstValue = $$v;
  }, expression: "firstValue" } }), _vm.range ? _c("slider-button", { ref: "button2", attrs: { "vertical": _vm.vertical, "tooltip-class": _vm.tooltipClass }, model: { value: _vm.secondValue, callback: function($$v) {
    _vm.secondValue = $$v;
  }, expression: "secondValue" } }) : _vm._e(), _vm._l(_vm.stops, function(item, key) {
    return _vm.showStops ? _c("div", { key, staticClass: "el-slider__stop", style: _vm.getStopStyle(item) }) : _vm._e();
  }), _vm.markList.length > 0 ? [_c("div", _vm._l(_vm.markList, function(item, key) {
    return _c("div", { key, staticClass: "el-slider__stop el-slider__marks-stop", style: _vm.getStopStyle(item.position) });
  }), 0), _c("div", { staticClass: "el-slider__marks" }, _vm._l(_vm.markList, function(item, key) {
    return _c("slider-marker", { key, style: _vm.getStopStyle(item.position), attrs: { "mark": item.mark } });
  }), 1)] : _vm._e()], 2)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Slider = __component__.exports;
Slider.install = function(Vue) {
  Vue.component(Slider.name, Slider);
};
export {
  Slider as default
};
