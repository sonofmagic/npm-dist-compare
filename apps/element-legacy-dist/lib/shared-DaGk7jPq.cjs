"use strict";
function isDef(val) {
  return val !== void 0 && val !== null;
}
function isKorean(text) {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
  return reg.test(text);
}
exports.isDef = isDef;
exports.isKorean = isKorean;
