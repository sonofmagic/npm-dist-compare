"use strict";
const dom = require("./dom-D54PnS1K.cjs");
const util = require("./util-KJN0EjuU.cjs");
const RepeatClick = {
  bind(el, binding, vnode) {
    let interval = null;
    let startTime;
    const maxIntervals = util.isMac() ? 100 : 200;
    const handler = () => vnode.context[binding.expression].apply();
    const clear = () => {
      if (Date.now() - startTime < maxIntervals) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };
    dom.on(el, "mousedown", (e) => {
      if (e.button !== 0) return;
      startTime = Date.now();
      dom.once(document, "mouseup", clear);
      clearInterval(interval);
      interval = setInterval(handler, maxIntervals);
    });
  }
};
exports.RepeatClick = RepeatClick;
