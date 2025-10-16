import { autoprefixer } from "element-ui/lib/utils/util";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const CARD_SCALE = 0.83;
const _sfc_main = {
  name: "ElCarouselItem",
  props: {
    name: String,
    label: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
  },
  methods: {
    processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },
    calcCardTranslate(index, activeIndex) {
      const parentWidth = this.$parent.$el.offsetWidth;
      if (this.inStage) {
        return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
      } else if (index < activeIndex) {
        return -1.83 * parentWidth / 4;
      } else {
        return (3 + CARD_SCALE) * parentWidth / 4;
      }
    },
    calcTranslate(index, activeIndex, isVertical) {
      const distance = this.$parent.$el[isVertical ? "offsetHeight" : "offsetWidth"];
      return distance * (index - activeIndex);
    },
    translateItem(index, activeIndex, oldIndex) {
      const parentType = this.$parent.type;
      const parentDirection = this.parentDirection;
      const length = this.$parent.items.length;
      if (parentType !== "card" && oldIndex !== void 0) {
        this.animating = index === activeIndex || index === oldIndex;
      }
      if (index !== activeIndex && length > 2 && this.$parent.loop) {
        index = this.processIndex(index, activeIndex, length);
      }
      if (parentType === "card") {
        if (parentDirection === "vertical") {
          console.warn("[Element Warn][Carousel]vertical direction is not supported in card mode");
        }
        this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        this.active = index === activeIndex;
        this.translate = this.calcCardTranslate(index, activeIndex);
        this.scale = this.active ? 1 : CARD_SCALE;
      } else {
        this.active = index === activeIndex;
        const isVertical = parentDirection === "vertical";
        this.translate = this.calcTranslate(index, activeIndex, isVertical);
        this.scale = 1;
      }
      this.ready = true;
    },
    handleItemClick() {
      const parent = this.$parent;
      if (parent && parent.type === "card") {
        const index = parent.items.indexOf(this);
        parent.setActiveItem(index);
      }
    }
  },
  computed: {
    parentDirection() {
      return this.$parent.direction;
    },
    itemStyle() {
      const translateType = this.parentDirection === "vertical" ? "translateY" : "translateX";
      const value = `${translateType}(${this.translate}px) scale(${this.scale})`;
      const style = {
        transform: value
      };
      return autoprefixer(style);
    }
  },
  created() {
    this.$parent && this.$parent.updateItems();
  },
  destroyed() {
    this.$parent && this.$parent.updateItems();
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.ready, expression: "ready" }], staticClass: "el-carousel__item", class: {
    "is-active": _vm.active,
    "el-carousel__item--card": _vm.$parent.type === "card",
    "is-in-stage": _vm.inStage,
    "is-hover": _vm.hover,
    "is-animating": _vm.animating
  }, style: _vm.itemStyle, on: { "click": _vm.handleItemClick } }, [_vm.$parent.type === "card" ? _c("div", { directives: [{ name: "show", rawName: "v-show", value: !_vm.active, expression: "!active" }], staticClass: "el-carousel__mask" }) : _vm._e(), _vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElCarouselItem = __component__.exports;
ElCarouselItem.install = function(Vue) {
  Vue.component(ElCarouselItem.name, ElCarouselItem);
};
export {
  ElCarouselItem as default
};
