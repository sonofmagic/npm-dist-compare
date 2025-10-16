import { h } from "vue";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElTimeline",
  props: {
    reverse: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      timeline: this
    };
  },
  render() {
    const reverse = this.reverse;
    const classes = {
      "el-timeline": true,
      "is-reverse": reverse
    };
    let slots = this.$slots.default || [];
    if (reverse) {
      slots = slots.reverse();
    }
    return h("ul", {
      "class": classes
    }, [slots]);
  }
};
const _sfc_render = null;
const _sfc_staticRenderFns = null;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Timeline = __component__.exports;
const _Timeline = Timeline;
_Timeline.install = function install(Vue) {
  Vue.component(_Timeline.name, _Timeline);
};
export {
  _Timeline as default
};
