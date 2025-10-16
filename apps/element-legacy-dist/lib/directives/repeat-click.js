// @ts-nocheck
import { once, on } from 'element-ui/src/utils/dom';
import { isMac } from 'element-ui/src/utils/util';
export default {
  bind(el, binding, vnode) {
    var interval = null;
    var startTime;
    var maxIntervals = isMac() ? 100 : 200;
    var handler = () => vnode.context[binding.expression].apply();
    var clear = () => {
      if (Date.now() - startTime < maxIntervals) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };
    on(el, 'mousedown', e => {
      if (e.button !== 0) return;
      startTime = Date.now();
      once(document, 'mouseup', clear);
      clearInterval(interval);
      interval = setInterval(handler, maxIntervals);
    });
  }
};