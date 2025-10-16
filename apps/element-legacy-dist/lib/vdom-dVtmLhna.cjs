"use strict";
const util = require("./util-KJN0EjuU.cjs");
function isVNode(node) {
  return node !== null && typeof node === "object" && util.hasOwn(node, "componentOptions");
}
exports.isVNode = isVNode;
