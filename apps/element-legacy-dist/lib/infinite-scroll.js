import { d as debounce } from "./index-Bo3IDZj6.js";
import { d as isHtmlElement, c as isUndefined, e as isDefined, b as isFunction } from "./types-C2yGIQX_.js";
import { d as getScrollContainer } from "./dom-5kqU03Ls.js";
const getStyleComputedProperty = (element, property) => {
  if (element === window) {
    element = document.documentElement;
  }
  if (element.nodeType !== 1) {
    return [];
  }
  const css = window.getComputedStyle(element, null);
  return css[property];
};
const entries = (obj) => {
  return Object.keys(obj || {}).map((key) => [key, obj[key]]);
};
const getPositionSize = (el, prop) => {
  return el === window || el === document ? document.documentElement[prop] : el[prop];
};
const getOffsetHeight = (el) => {
  return getPositionSize(el, "offsetHeight");
};
const getClientHeight = (el) => {
  return getPositionSize(el, "clientHeight");
};
const scope = "ElInfiniteScroll";
const attributes = {
  delay: {
    type: Number,
    default: 200
  },
  distance: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  }
};
const getScrollOptions = (el, vm) => {
  if (!isHtmlElement(el)) return {};
  return entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option;
    let value = el.getAttribute(`infinite-scroll-${key}`);
    value = isUndefined(vm[value]) ? value : vm[value];
    switch (type) {
      case Number:
        value = Number(value);
        value = Number.isNaN(value) ? defaultValue : value;
        break;
      case Boolean:
        value = isDefined(value) ? value === "false" ? false : Boolean(value) : defaultValue;
        break;
      default:
        value = type(value);
    }
    map[key] = value;
    return map;
  }, {});
};
const getElementTop = (el) => el.getBoundingClientRect().top;
const handleScroll = function(cb) {
  const { el, vm, container, observer } = this[scope];
  const { distance, disabled } = getScrollOptions(el, vm);
  if (disabled) return;
  const containerInfo = container.getBoundingClientRect();
  if (!containerInfo.width && !containerInfo.height) return;
  let shouldTrigger = false;
  if (container === el) {
    const scrollBottom = container.scrollTop + getClientHeight(container);
    shouldTrigger = container.scrollHeight - scrollBottom <= distance;
  } else {
    const heightBelowTop = getOffsetHeight(el) + getElementTop(el) - getElementTop(container);
    const offsetHeight = getOffsetHeight(container);
    const borderBottom = Number.parseFloat(getStyleComputedProperty(container, "borderBottomWidth"));
    shouldTrigger = heightBelowTop - offsetHeight + borderBottom <= distance;
  }
  if (shouldTrigger && isFunction(cb)) {
    cb.call(vm);
  } else if (observer) {
    observer.disconnect();
    this[scope].observer = null;
  }
};
const InfiniteScroll = {
  name: "InfiniteScroll",
  inserted(el, binding, vnode) {
    const cb = binding.value;
    const vm = vnode.context;
    const container = getScrollContainer(el, true);
    const { delay, immediate } = getScrollOptions(el, vm);
    const onScroll = debounce(delay, handleScroll.bind(el, cb));
    el[scope] = { el, vm, container, onScroll };
    if (container) {
      container.addEventListener("scroll", onScroll);
      if (immediate) {
        const observer = el[scope].observer = new MutationObserver(onScroll);
        observer.observe(container, { childList: true, subtree: true });
        onScroll();
      }
    }
  },
  unbind(el) {
    const { container, onScroll } = el[scope];
    if (container) {
      container.removeEventListener("scroll", onScroll);
    }
  }
};
const _InfiniteScroll = InfiniteScroll;
_InfiniteScroll.install = function install(Vue) {
  Vue.directive(_InfiniteScroll.name, _InfiniteScroll);
};
export {
  _InfiniteScroll as default
};
