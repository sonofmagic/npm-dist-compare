"use strict";
const Vue = require("vue");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const vuePopper = require("./vue-popper-CQ9w6kyf.cjs");
const locale = require("./locale-j1fuSDyN.cjs");
const ElInput = require("element-ui/lib/input");
const ElButton = require("element-ui/lib/button");
const clickoutside = require("./clickoutside-BWqUe94D.cjs");
const emitter = require("./emitter-CM7bVwl7.cjs");
const hsv2hsl = function(hue, sat, val) {
  return [
    hue,
    sat * val / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue) || 0,
    hue / 2
  ];
};
const isOnePointZero = function(n) {
  return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
};
const isPercentage = function(n) {
  return typeof n === "string" && n.indexOf("%") !== -1;
};
const bound01 = function(value, max) {
  if (isOnePointZero(value)) value = "100%";
  const processPercent = isPercentage(value);
  value = Math.min(max, Math.max(0, parseFloat(value)));
  if (processPercent) {
    value = parseInt(value * max, 10) / 100;
  }
  if (Math.abs(value - max) < 1e-6) {
    return 1;
  }
  return value % max / parseFloat(max);
};
const INT_HEX_MAP = { 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F" };
const toHex = function({ r, g, b }) {
  const hexOne = function(value) {
    value = Math.min(Math.round(value), 255);
    const high = Math.floor(value / 16);
    const low = value % 16;
    return "" + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low);
  };
  if (isNaN(r) || isNaN(g) || isNaN(b)) return "";
  return "#" + hexOne(r) + hexOne(g) + hexOne(b);
};
const HEX_INT_MAP = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };
const parseHexChannel = function(hex) {
  if (hex.length === 2) {
    return (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]);
  }
  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
};
const hsl2hsv = function(hue, sat, light) {
  sat = sat / 100;
  light = light / 100;
  let smin = sat;
  const lmin = Math.max(light, 0.01);
  let sv;
  let v;
  light *= 2;
  sat *= light <= 1 ? light : 2 - light;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  v = (light + sat) / 2;
  sv = light === 0 ? 2 * smin / (lmin + smin) : 2 * sat / (light + sat);
  return {
    h: hue,
    s: sv * 100,
    v: v * 100
  };
};
const rgb2hsv = function(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  let v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
};
const hsv2rgb = function(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};
class Color {
  constructor(options) {
    this._hue = 0;
    this._saturation = 100;
    this._value = 100;
    this._alpha = 100;
    this.enableAlpha = false;
    this.format = "hex";
    this.value = "";
    options = options || {};
    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    this.doOnChange();
  }
  set(prop, value) {
    if (arguments.length === 1 && typeof prop === "object") {
      for (let p in prop) {
        if (prop.hasOwnProperty(p)) {
          this.set(p, prop[p]);
        }
      }
      return;
    }
    this["_" + prop] = value;
    this.doOnChange();
  }
  get(prop) {
    return this["_" + prop];
  }
  toRgb() {
    return hsv2rgb(this._hue, this._saturation, this._value);
  }
  fromString(value) {
    if (!value) {
      this._hue = 0;
      this._saturation = 100;
      this._value = 100;
      this.doOnChange();
      return;
    }
    const fromHSV = (h, s, v) => {
      this._hue = Math.max(0, Math.min(360, h));
      this._saturation = Math.max(0, Math.min(100, s));
      this._value = Math.max(0, Math.min(100, v));
      this.doOnChange();
    };
    if (value.indexOf("hsl") !== -1) {
      const parts = value.replace(/hsla|hsl|\(|\)/gm, "").split(/\s|,/g).filter((val) => val !== "").map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));
      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(parts[3]) * 100);
      } else if (parts.length === 3) {
        this._alpha = 100;
      }
      if (parts.length >= 3) {
        const { h, s, v } = hsl2hsv(parts[0], parts[1], parts[2]);
        fromHSV(h, s, v);
      }
    } else if (value.indexOf("hsv") !== -1) {
      const parts = value.replace(/hsva|hsv|\(|\)/gm, "").split(/\s|,/g).filter((val) => val !== "").map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));
      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(parts[3]) * 100);
      } else if (parts.length === 3) {
        this._alpha = 100;
      }
      if (parts.length >= 3) {
        fromHSV(parts[0], parts[1], parts[2]);
      }
    } else if (value.indexOf("rgb") !== -1) {
      const parts = value.replace(/rgba|rgb|\(|\)/gm, "").split(/\s|,/g).filter((val) => val !== "").map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));
      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(parts[3]) * 100);
      } else if (parts.length === 3) {
        this._alpha = 100;
      }
      if (parts.length >= 3) {
        const { h, s, v } = rgb2hsv(parts[0], parts[1], parts[2]);
        fromHSV(h, s, v);
      }
    } else if (value.indexOf("#") !== -1) {
      const hex = value.replace("#", "").trim();
      if (!/^(?:[0-9a-fA-F]{3}){1,2}|[0-9a-fA-F]{8}$/.test(hex)) return;
      let r, g, b;
      if (hex.length === 3) {
        r = parseHexChannel(hex[0] + hex[0]);
        g = parseHexChannel(hex[1] + hex[1]);
        b = parseHexChannel(hex[2] + hex[2]);
      } else if (hex.length === 6 || hex.length === 8) {
        r = parseHexChannel(hex.substring(0, 2));
        g = parseHexChannel(hex.substring(2, 4));
        b = parseHexChannel(hex.substring(4, 6));
      }
      if (hex.length === 8) {
        this._alpha = Math.floor(parseHexChannel(hex.substring(6)) / 255 * 100);
      } else if (hex.length === 3 || hex.length === 6) {
        this._alpha = 100;
      }
      const { h, s, v } = rgb2hsv(r, g, b);
      fromHSV(h, s, v);
    }
  }
  compare(color) {
    return Math.abs(color._hue - this._hue) < 2 && Math.abs(color._saturation - this._saturation) < 1 && Math.abs(color._value - this._value) < 1 && Math.abs(color._alpha - this._alpha) < 1;
  }
  doOnChange() {
    const { _hue, _saturation, _value, _alpha, format } = this;
    if (this.enableAlpha) {
      switch (format) {
        case "hsl":
          const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
          this.value = `hsla(${_hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%, ${_alpha / 100})`;
          break;
        case "hsv":
          this.value = `hsva(${_hue}, ${Math.round(_saturation)}%, ${Math.round(_value)}%, ${_alpha / 100})`;
          break;
        default:
          const { r, g, b } = hsv2rgb(_hue, _saturation, _value);
          this.value = `rgba(${r}, ${g}, ${b}, ${_alpha / 100})`;
      }
    } else {
      switch (format) {
        case "hsl":
          const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
          this.value = `hsl(${_hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`;
          break;
        case "hsv":
          this.value = `hsv(${_hue}, ${Math.round(_saturation)}%, ${Math.round(_value)}%)`;
          break;
        case "rgb":
          const { r, g, b } = hsv2rgb(_hue, _saturation, _value);
          this.value = `rgb(${r}, ${g}, ${b})`;
          break;
        default:
          this.value = toHex(hsv2rgb(_hue, _saturation, _value));
      }
    }
  }
}
let isDragging = false;
function draggable(element, options) {
  if (Vue.prototype.$isServer) return;
  const moveFn = function(event) {
    if (options.drag) {
      options.drag(event);
    }
  };
  const upFn = function(event) {
    document.removeEventListener("mousemove", moveFn);
    document.removeEventListener("mouseup", upFn);
    document.onselectstart = null;
    document.ondragstart = null;
    isDragging = false;
    if (options.end) {
      options.end(event);
    }
  };
  element.addEventListener("mousedown", function(event) {
    if (isDragging) return;
    document.onselectstart = function() {
      return false;
    };
    document.ondragstart = function() {
      return false;
    };
    document.addEventListener("mousemove", moveFn);
    document.addEventListener("mouseup", upFn);
    isDragging = true;
    if (options.start) {
      options.start(event);
    }
  });
}
const _sfc_main$5 = {
  name: "el-sl-panel",
  props: {
    color: {
      required: true
    }
  },
  computed: {
    colorValue() {
      const hue = this.color.get("hue");
      const value = this.color.get("value");
      return { hue, value };
    }
  },
  watch: {
    colorValue() {
      this.update();
    }
  },
  methods: {
    update() {
      const saturation = this.color.get("saturation");
      const value = this.color.get("value");
      const el = this.$el;
      let { clientWidth: width, clientHeight: height } = el;
      this.cursorLeft = saturation * width / 100;
      this.cursorTop = (100 - value) * height / 100;
      this.background = "hsl(" + this.color.get("hue") + ", 100%, 50%)";
    },
    handleDrag(event) {
      const el = this.$el;
      const rect = el.getBoundingClientRect();
      let left = event.clientX - rect.left;
      let top = event.clientY - rect.top;
      left = Math.max(0, left);
      left = Math.min(left, rect.width);
      top = Math.max(0, top);
      top = Math.min(top, rect.height);
      this.cursorLeft = left;
      this.cursorTop = top;
      this.color.set({
        saturation: left / rect.width * 100,
        value: 100 - top / rect.height * 100
      });
    }
  },
  mounted() {
    draggable(this.$el, {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      }
    });
    this.update();
  },
  data() {
    return {
      cursorTop: 0,
      cursorLeft: 0,
      background: "hsl(0, 100%, 50%)"
    };
  }
};
var _sfc_render$5 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-color-svpanel", style: {
    backgroundColor: _vm.background
  } }, [_c("div", { staticClass: "el-color-svpanel__white" }), _c("div", { staticClass: "el-color-svpanel__black" }), _c("div", { staticClass: "el-color-svpanel__cursor", style: {
    top: _vm.cursorTop + "px",
    left: _vm.cursorLeft + "px"
  } }, [_c("div")])]);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false
);
const SvPanel = __component__$5.exports;
const _sfc_main$4 = {
  name: "el-color-hue-slider",
  props: {
    color: {
      required: true
    },
    vertical: Boolean
  },
  data() {
    return {
      thumbLeft: 0,
      thumbTop: 0
    };
  },
  computed: {
    hueValue() {
      const hue = this.color.get("hue");
      return hue;
    }
  },
  watch: {
    hueValue() {
      this.update();
    }
  },
  methods: {
    handleClick(event) {
      const thumb = this.$refs.thumb;
      const target = event.target;
      if (target !== thumb) {
        this.handleDrag(event);
      }
    },
    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect();
      const { thumb } = this.$refs;
      let hue;
      if (!this.vertical) {
        let left = event.clientX - rect.left;
        left = Math.min(left, rect.width - thumb.offsetWidth / 2);
        left = Math.max(thumb.offsetWidth / 2, left);
        hue = Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 360);
      } else {
        let top = event.clientY - rect.top;
        top = Math.min(top, rect.height - thumb.offsetHeight / 2);
        top = Math.max(thumb.offsetHeight / 2, top);
        hue = Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 360);
      }
      this.color.set("hue", hue);
    },
    getThumbLeft() {
      if (this.vertical) return 0;
      const el = this.$el;
      const hue = this.color.get("hue");
      if (!el) return 0;
      const thumb = this.$refs.thumb;
      return Math.round(hue * (el.offsetWidth - thumb.offsetWidth / 2) / 360);
    },
    getThumbTop() {
      if (!this.vertical) return 0;
      const el = this.$el;
      const hue = this.color.get("hue");
      if (!el) return 0;
      const thumb = this.$refs.thumb;
      return Math.round(hue * (el.offsetHeight - thumb.offsetHeight / 2) / 360);
    },
    update() {
      this.thumbLeft = this.getThumbLeft();
      this.thumbTop = this.getThumbTop();
    }
  },
  mounted() {
    const { bar, thumb } = this.$refs;
    const dragConfig = {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      }
    };
    draggable(bar, dragConfig);
    draggable(thumb, dragConfig);
    this.update();
  }
};
var _sfc_render$4 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-color-hue-slider", class: { "is-vertical": _vm.vertical } }, [_c("div", { ref: "bar", staticClass: "el-color-hue-slider__bar", on: { "click": _vm.handleClick } }), _c("div", { ref: "thumb", staticClass: "el-color-hue-slider__thumb", style: {
    left: _vm.thumbLeft + "px",
    top: _vm.thumbTop + "px"
  } })]);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false
);
const HueSlider = __component__$4.exports;
const _sfc_main$3 = {
  name: "el-color-alpha-slider",
  props: {
    color: {
      required: true
    },
    vertical: Boolean
  },
  watch: {
    "color._alpha"() {
      this.update();
    },
    "color.value"() {
      this.update();
    }
  },
  methods: {
    handleClick(event) {
      const thumb = this.$refs.thumb;
      const target = event.target;
      if (target !== thumb) {
        this.handleDrag(event);
      }
    },
    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect();
      const { thumb } = this.$refs;
      if (!this.vertical) {
        let left = event.clientX - rect.left;
        left = Math.max(thumb.offsetWidth / 2, left);
        left = Math.min(left, rect.width - thumb.offsetWidth / 2);
        this.color.set("alpha", Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 100));
      } else {
        let top = event.clientY - rect.top;
        top = Math.max(thumb.offsetHeight / 2, top);
        top = Math.min(top, rect.height - thumb.offsetHeight / 2);
        this.color.set("alpha", Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 100));
      }
    },
    getThumbLeft() {
      if (this.vertical) return 0;
      const el = this.$el;
      const alpha = this.color._alpha;
      if (!el) return 0;
      const thumb = this.$refs.thumb;
      return Math.round(alpha * (el.offsetWidth - thumb.offsetWidth / 2) / 100);
    },
    getThumbTop() {
      if (!this.vertical) return 0;
      const el = this.$el;
      const alpha = this.color._alpha;
      if (!el) return 0;
      const thumb = this.$refs.thumb;
      return Math.round(alpha * (el.offsetHeight - thumb.offsetHeight / 2) / 100);
    },
    getBackground() {
      if (this.color && this.color.value) {
        const { r, g, b } = this.color.toRgb();
        return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
      }
      return null;
    },
    update() {
      this.thumbLeft = this.getThumbLeft();
      this.thumbTop = this.getThumbTop();
      this.background = this.getBackground();
    }
  },
  data() {
    return {
      thumbLeft: 0,
      thumbTop: 0,
      background: null
    };
  },
  mounted() {
    const { bar, thumb } = this.$refs;
    const dragConfig = {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      }
    };
    draggable(bar, dragConfig);
    draggable(thumb, dragConfig);
    this.update();
  }
};
var _sfc_render$3 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-color-alpha-slider", class: { "is-vertical": _vm.vertical } }, [_c("div", { ref: "bar", staticClass: "el-color-alpha-slider__bar", style: {
    background: _vm.background
  }, on: { "click": _vm.handleClick } }), _c("div", { ref: "thumb", staticClass: "el-color-alpha-slider__thumb", style: {
    left: _vm.thumbLeft + "px",
    top: _vm.thumbTop + "px"
  } })]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false
);
const AlphaSlider = __component__$3.exports;
const _sfc_main$2 = {
  props: {
    colors: { type: Array, required: true },
    color: { required: true }
  },
  data() {
    return {
      rgbaColors: this.parseColors(this.colors, this.color)
    };
  },
  methods: {
    handleSelect(index) {
      this.color.fromString(this.colors[index]);
    },
    parseColors(colors, color) {
      return colors.map((value) => {
        const c = new Color();
        c.enableAlpha = true;
        c.format = "rgba";
        c.fromString(value);
        c.selected = c.value === color.value;
        return c;
      });
    }
  },
  watch: {
    "$parent.currentColor"(val) {
      const color = new Color();
      color.fromString(val);
      this.rgbaColors.forEach((item) => {
        item.selected = color.compare(item);
      });
    },
    colors(newVal) {
      this.rgbaColors = this.parseColors(newVal, this.color);
    },
    color(newVal) {
      this.rgbaColors = this.parseColors(this.colors, newVal);
    }
  }
};
var _sfc_render$2 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-color-predefine" }, [_c("div", { staticClass: "el-color-predefine__colors" }, _vm._l(_vm.rgbaColors, function(item, index) {
    return _c("div", { key: _vm.colors[index], staticClass: "el-color-predefine__color-selector", class: { selected: item.selected, "is-alpha": item._alpha < 100 }, on: { "click": function($event) {
      return _vm.handleSelect(index);
    } } }, [_c("div", { style: { "background-color": item.value } })]);
  }), 0)]);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false
);
const Predefine = __component__$2.exports;
const _sfc_main$1 = {
  name: "el-color-picker-dropdown",
  mixins: [vuePopper.Popper, locale.Locale],
  components: {
    SvPanel,
    HueSlider,
    AlphaSlider,
    ElInput,
    ElButton,
    Predefine
  },
  props: {
    color: {
      required: true
    },
    showAlpha: Boolean,
    predefine: Array
  },
  data() {
    return {
      customInput: ""
    };
  },
  computed: {
    currentColor() {
      const parent = this.$parent;
      return !parent.value && !parent.showPanelColor ? "" : parent.color.value;
    }
  },
  methods: {
    confirmValue() {
      this.$emit("pick");
    },
    handleConfirm() {
      this.color.fromString(this.customInput);
    }
  },
  mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.$parent.$el;
  },
  watch: {
    showPopper(val) {
      if (val === true) {
        this.$nextTick(() => {
          const { sl, hue, alpha } = this.$refs;
          sl && sl.update();
          hue && hue.update();
          alpha && alpha.update();
        });
      }
    },
    currentColor: {
      immediate: true,
      handler(val) {
        this.customInput = val;
      }
    }
  }
};
var _sfc_render$1 = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" }, on: { "after-leave": _vm.doDestroy } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.showPopper, expression: "showPopper" }], staticClass: "el-color-dropdown" }, [_c("div", { staticClass: "el-color-dropdown__main-wrapper" }, [_c("hue-slider", { ref: "hue", staticStyle: { "float": "right" }, attrs: { "color": _vm.color, "vertical": "" } }), _c("sv-panel", { ref: "sl", attrs: { "color": _vm.color } })], 1), _vm.showAlpha ? _c("alpha-slider", { ref: "alpha", attrs: { "color": _vm.color } }) : _vm._e(), _vm.predefine ? _c("predefine", { attrs: { "color": _vm.color, "colors": _vm.predefine } }) : _vm._e(), _c("div", { staticClass: "el-color-dropdown__btns" }, [_c("span", { staticClass: "el-color-dropdown__value" }, [_c("el-input", { attrs: { "validate-event": false, "size": "mini" }, on: { "blur": _vm.handleConfirm }, nativeOn: { "keyup": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleConfirm.apply(null, arguments);
  } }, model: { value: _vm.customInput, callback: function($$v) {
    _vm.customInput = $$v;
  }, expression: "customInput" } })], 1), _c("el-button", { staticClass: "el-color-dropdown__link-btn", attrs: { "size": "mini", "type": "text" }, on: { "click": function($event) {
    return _vm.$emit("clear");
  } } }, [_vm._v(" " + _vm._s(_vm.t("el.colorpicker.clear")) + " ")]), _c("el-button", { staticClass: "el-color-dropdown__btn", attrs: { "plain": "", "size": "mini" }, on: { "click": _vm.confirmValue } }, [_vm._v(" " + _vm._s(_vm.t("el.colorpicker.confirm")) + " ")])], 1)], 1)]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const PickerDropdown = __component__$1.exports;
const _sfc_main = {
  name: "ElColorPicker",
  mixins: [emitter.emitter],
  props: {
    value: String,
    showAlpha: Boolean,
    colorFormat: String,
    disabled: Boolean,
    size: String,
    popperClass: String,
    predefine: Array
  },
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  directives: { Clickoutside: clickoutside.Clickoutside },
  computed: {
    displayedColor() {
      if (!this.value && !this.showPanelColor) {
        return "transparent";
      }
      return this.displayedRgb(this.color, this.showAlpha);
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    colorSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    colorDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  watch: {
    value(val) {
      if (!val) {
        this.showPanelColor = false;
      } else if (val && val !== this.color.value) {
        this.color.fromString(val);
      }
    },
    color: {
      deep: true,
      handler() {
        this.showPanelColor = true;
      }
    },
    displayedColor(val) {
      if (!this.showPicker) return;
      const currentValueColor = new Color({
        enableAlpha: this.showAlpha,
        format: this.colorFormat
      });
      currentValueColor.fromString(this.value);
      const currentValueColorRgb = this.displayedRgb(currentValueColor, this.showAlpha);
      if (val !== currentValueColorRgb) {
        this.$emit("active-change", val);
      }
    }
  },
  methods: {
    handleTrigger() {
      if (this.colorDisabled) return;
      this.showPicker = !this.showPicker;
    },
    confirmValue() {
      const value = this.color.value;
      this.$emit("input", value);
      this.$emit("change", value);
      this.dispatch("ElFormItem", "el.form.change", value);
      this.showPicker = false;
    },
    clearValue() {
      this.$emit("input", null);
      this.$emit("change", null);
      if (this.value !== null) {
        this.dispatch("ElFormItem", "el.form.change", null);
      }
      this.showPanelColor = false;
      this.showPicker = false;
      this.resetColor();
    },
    hide() {
      this.showPicker = false;
      this.resetColor();
    },
    resetColor() {
      this.$nextTick((_) => {
        if (this.value) {
          this.color.fromString(this.value);
        } else {
          this.showPanelColor = false;
        }
      });
    },
    displayedRgb(color, showAlpha) {
      if (!(color instanceof Color)) {
        throw Error("color should be instance of Color Class");
      }
      const { r, g, b } = color.toRgb();
      return showAlpha ? `rgba(${r}, ${g}, ${b}, ${color.get("alpha") / 100})` : `rgb(${r}, ${g}, ${b})`;
    }
  },
  mounted() {
    const value = this.value;
    if (value) {
      this.color.fromString(value);
    }
    this.popperElm = this.$refs.dropdown.$el;
  },
  data() {
    const color = new Color({
      enableAlpha: this.showAlpha,
      format: this.colorFormat
    });
    return {
      color,
      showPicker: false,
      showPanelColor: false
    };
  },
  components: {
    PickerDropdown
  }
};
var _sfc_render = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.hide, expression: "hide" }], class: [
    "el-color-picker",
    _vm.colorDisabled ? "is-disabled" : "",
    _vm.colorSize ? `el-color-picker--${_vm.colorSize}` : ""
  ] }, [_vm.colorDisabled ? _c("div", { staticClass: "el-color-picker__mask" }) : _vm._e(), _c("div", { staticClass: "el-color-picker__trigger", on: { "click": _vm.handleTrigger } }, [_c("span", { staticClass: "el-color-picker__color", class: { "is-alpha": _vm.showAlpha } }, [_c("span", { staticClass: "el-color-picker__color-inner", style: {
    backgroundColor: _vm.displayedColor
  } }), !_vm.value && !_vm.showPanelColor ? _c("span", { staticClass: "el-color-picker__empty el-icon-close" }) : _vm._e()]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.value || _vm.showPanelColor, expression: "value || showPanelColor" }], staticClass: "el-color-picker__icon el-icon-arrow-down" })]), _c("picker-dropdown", { ref: "dropdown", class: ["el-color-picker__panel", _vm.popperClass || ""], attrs: { "color": _vm.color, "show-alpha": _vm.showAlpha, "predefine": _vm.predefine }, on: { "pick": _vm.confirmValue, "clear": _vm.clearValue }, model: { value: _vm.showPicker, callback: function($$v) {
    _vm.showPicker = $$v;
  }, expression: "showPicker" } })], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ColorPicker = __component__.exports;
const _ColorPicker = ColorPicker;
_ColorPicker.install = function install(Vue2) {
  Vue2.component(_ColorPicker.name, _ColorPicker);
};
module.exports = _ColorPicker;
