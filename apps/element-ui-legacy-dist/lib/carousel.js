import { t as throttle } from "./index-Bo3IDZj6.js";
import { removeResizeListener, addResizeListener } from "element-ui/lib/utils/resize-event";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElCarousel",
  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: "hover"
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3e3
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: "hover"
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].indexOf(val) !== -1;
      }
    }
  },
  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };
  },
  computed: {
    arrowDisplay() {
      return this.arrow !== "never" && this.direction !== "vertical";
    },
    hasLabel() {
      return this.items.some((item) => item.label.toString().length > 0);
    },
    carouselClasses() {
      const classes = ["el-carousel", "el-carousel--" + this.direction];
      if (this.type === "card") {
        classes.push("el-carousel--card");
      }
      return classes;
    },
    indicatorsClasses() {
      const classes = ["el-carousel__indicators", "el-carousel__indicators--" + this.direction];
      if (this.hasLabel) {
        classes.push("el-carousel__indicators--labels");
      }
      if (this.indicatorPosition === "outside" || this.type === "card") {
        classes.push("el-carousel__indicators--outside");
      }
      return classes;
    }
  },
  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },
    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit("change", val, oldVal);
      }
    },
    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },
    loop() {
      this.setActiveItem(this.activeIndex);
    },
    interval() {
      this.pauseTimer();
      this.startTimer();
    }
  },
  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },
    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },
    itemInStage(item, index) {
      const length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active || item.inStage && this.items[index + 1] && this.items[index + 1].active) {
        return "left";
      } else if (index === 0 && item.inStage && this.items[length - 1].active || item.inStage && this.items[index - 1] && this.items[index - 1].active) {
        return "right";
      }
      return false;
    },
    handleButtonEnter(arrow) {
      if (this.direction === "vertical") return;
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },
    handleButtonLeave() {
      if (this.direction === "vertical") return;
      this.items.forEach((item) => {
        item.hover = false;
      });
    },
    updateItems() {
      this.items = this.$children.filter((child) => child.$options.name === "ElCarouselItem");
    },
    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },
    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },
    resetTimer() {
      this.pauseTimer();
      this.startTimer();
    },
    setActiveItem(index) {
      if (typeof index === "string") {
        const filteredItems = this.items.filter((item) => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn("[Element Warn][Carousel]index must be an integer.");
        return;
      }
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
      this.resetTimer();
    },
    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },
    next() {
      this.setActiveItem(this.activeIndex + 1);
    },
    handleIndicatorClick(index) {
      this.activeIndex = index;
    },
    handleIndicatorHover(index) {
      if (this.trigger === "hover" && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    }
  },
  created() {
    this.throttledArrowClick = throttle(300, (index) => {
      this.setActiveItem(index);
    }, {
      // TODO
    });
    this.throttledIndicatorHover = throttle(300, (index) => {
      this.handleIndicatorHover(index);
    });
  },
  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemPosition);
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },
  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
    this.pauseTimer();
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { class: _vm.carouselClasses, on: { "mouseenter": function($event) {
    $event.stopPropagation();
    return _vm.handleMouseEnter.apply(null, arguments);
  }, "mouseleave": function($event) {
    $event.stopPropagation();
    return _vm.handleMouseLeave.apply(null, arguments);
  } } }, [_c("div", { staticClass: "el-carousel__container", style: { height: _vm.height } }, [_vm.arrowDisplay ? _c("transition", { attrs: { "name": "carousel-arrow-left" } }, [_c("button", { directives: [{ name: "show", rawName: "v-show", value: (_vm.arrow === "always" || _vm.hover) && (_vm.loop || _vm.activeIndex > 0), expression: "(arrow === 'always' || hover) && (loop || activeIndex > 0)" }], staticClass: "el-carousel__arrow el-carousel__arrow--left", attrs: { "type": "button" }, on: { "mouseenter": function($event) {
    return _vm.handleButtonEnter("left");
  }, "mouseleave": _vm.handleButtonLeave, "click": function($event) {
    $event.stopPropagation();
    return _vm.throttledArrowClick(_vm.activeIndex - 1);
  } } }, [_c("i", { staticClass: "el-icon-arrow-left" })])]) : _vm._e(), _vm.arrowDisplay ? _c("transition", { attrs: { "name": "carousel-arrow-right" } }, [_c("button", { directives: [{ name: "show", rawName: "v-show", value: (_vm.arrow === "always" || _vm.hover) && (_vm.loop || _vm.activeIndex < _vm.items.length - 1), expression: "(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)" }], staticClass: "el-carousel__arrow el-carousel__arrow--right", attrs: { "type": "button" }, on: { "mouseenter": function($event) {
    return _vm.handleButtonEnter("right");
  }, "mouseleave": _vm.handleButtonLeave, "click": function($event) {
    $event.stopPropagation();
    return _vm.throttledArrowClick(_vm.activeIndex + 1);
  } } }, [_c("i", { staticClass: "el-icon-arrow-right" })])]) : _vm._e(), _vm._t("default")], 2), _vm.indicatorPosition !== "none" ? _c("ul", { class: _vm.indicatorsClasses }, _vm._l(_vm.items, function(item, index) {
    return _c("li", { key: index, class: [
      "el-carousel__indicator",
      "el-carousel__indicator--" + _vm.direction,
      { "is-active": index === _vm.activeIndex }
    ], on: { "mouseenter": function($event) {
      return _vm.throttledIndicatorHover(index);
    }, "click": function($event) {
      $event.stopPropagation();
      return _vm.handleIndicatorClick(index);
    } } }, [_c("button", { staticClass: "el-carousel__button" }, [_vm.hasLabel ? _c("span", [_vm._v(_vm._s(item.label))]) : _vm._e()])]);
  }), 0) : _vm._e()]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Carousel = __component__.exports;
Carousel.install = function(Vue) {
  Vue.component(Carousel.name, Carousel);
};
export {
  Carousel as default
};
