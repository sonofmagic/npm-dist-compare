import { t as throttle } from "./index-Bo3IDZj6.js";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const cubic = (value) => Math.pow(value, 3);
const easeInOutCubic = (value) => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
const _sfc_main = {
  name: "ElBacktop",
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: [String],
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      el: null,
      container: null,
      visible: false
    };
  },
  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    }
  },
  mounted() {
    this.init();
    this.throttledScrollHandler = throttle(300, this.onScroll);
    this.container.addEventListener("scroll", this.throttledScrollHandler);
  },
  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight;
    },
    handleClick(e) {
      this.scrollToTop();
      this.$emit("click", e);
    },
    scrollToTop() {
      const el = this.el;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    }
  },
  beforeDestroy() {
    this.container.removeEventListener("scroll", this.throttledScrollHandler);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-fade-in" } }, [_vm.visible ? _c("div", { staticClass: "el-backtop", style: {
    "right": _vm.styleRight,
    "bottom": _vm.styleBottom
  }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.handleClick.apply(null, arguments);
  } } }, [_vm._t("default", function() {
    return [_c("el-icon", { attrs: { "name": "caret-top" } })];
  })], 2) : _vm._e()]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Backtop = __component__.exports;
const _Backtop = Backtop;
_Backtop.install = function install(Vue) {
  Vue.component(_Backtop.name, _Backtop);
};
export {
  _Backtop as default
};
