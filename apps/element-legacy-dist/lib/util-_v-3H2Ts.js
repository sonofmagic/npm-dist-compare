import Vue from "vue";
import { i as isObject, a as isString } from "./types-C2yGIQX_.js";
const hasOwnProperty = Object.prototype.hasOwnProperty;
function noop() {
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
}
function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
const getValueByPath = function(object, prop) {
  prop = prop || "";
  const paths = prop.split(".");
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;
    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};
function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  let keyArr = path.split(".");
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error("please transfer a valid prop path to form item!");
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
}
const generateId = function() {
  return Math.floor(Math.random() * 1e4);
};
const valueEquals = (a, b) => {
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
const escapeRegexpString = (value = "") => String(value).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};
const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : void 0;
};
const coerceTruthyValueToArray = function(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};
const isIE = function() {
  return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode));
};
const isEdge = function() {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf("Edge") > -1;
};
const isFirefox = function() {
  return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i);
};
const autoprefixer = function(style) {
  if (typeof style !== "object") return style;
  const rules = ["transform", "transition", "animation"];
  const prefixes = ["ms-", "webkit-"];
  rules.forEach((rule) => {
    const value = style[rule];
    if (rule && value) {
      prefixes.forEach((prefix) => {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};
const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str.replace(hyphenateRE, "$1-$2").replace(hyphenateRE, "$1-$2").toLowerCase();
};
const capitalize = function(str) {
  if (!isString(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const looseEqual = function(a, b) {
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};
const arrayEquals = function(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];
  if (arrayA.length !== arrayB.length) {
    return false;
  }
  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }
  return true;
};
const isEqual = function(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }
  return looseEqual(value1, value2);
};
const isEmpty = function(val) {
  if (val == null) return true;
  if (typeof val === "boolean") return false;
  if (typeof val === "number") return !val;
  if (val instanceof Error) return val.message === "";
  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case "[object String]":
    case "[object Array]":
      return !val.length;
    // Map or Set or File
    case "[object File]":
    case "[object Map]":
    case "[object Set]": {
      return !val.size;
    }
    // Plain Object
    case "[object Object]": {
      return !Object.keys(val).length;
    }
  }
  return false;
};
function rafThrottle(fn) {
  let locked = false;
  return function(...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame((_) => {
      fn.apply(this, args);
      locked = false;
    });
  };
}
const isMac = function() {
  return !Vue.prototype.$isServer && /macintosh|mac os x/i.test(navigator.userAgent);
};
export {
  getValueByPath as a,
  isIE as b,
  isEdge as c,
  arrayFind as d,
  escapeRegexpString as e,
  arrayFindIndex as f,
  generateId as g,
  getPropByPath as h,
  isMac as i,
  coerceTruthyValueToArray as j,
  kebabCase as k,
  hasOwn as l,
  autoprefixer as m,
  noop as n,
  isEqual as o,
  isEmpty as p,
  isFirefox as q,
  rafThrottle as r,
  capitalize as s,
  toObject as t,
  valueEquals as v
};
