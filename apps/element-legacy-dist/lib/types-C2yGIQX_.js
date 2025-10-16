import Vue from "vue";
function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
let isFunction = (functionToCheck) => {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
};
if (typeof /./ !== "function" && typeof Int8Array !== "object" && (Vue.prototype.$isServer || typeof document.childNodes !== "function")) {
  isFunction = function(obj) {
    return typeof obj === "function" || false;
  };
}
function isUndefined(val) {
  return val === void 0;
}
function isDefined(val) {
  return val !== void 0 && val !== null;
}
export {
  isString as a,
  isFunction as b,
  isUndefined as c,
  isHtmlElement as d,
  isDefined as e,
  isObject as i
};
