"use strict";
const Vue = require("vue");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
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
    return Vue.h("ul", {
      "class": classes
    }, [slots]);
  }
};
const _sfc_render = null;
const _sfc_staticRenderFns = null;
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Timeline = __component__.exports;
Timeline.install = function(Vue2) {
  Vue2.component(Timeline.name, Timeline);
};
module.exports = Timeline;
