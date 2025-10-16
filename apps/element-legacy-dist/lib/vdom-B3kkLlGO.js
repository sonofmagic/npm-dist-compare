import { l as hasOwn } from "./util-_v-3H2Ts.js";
function isVNode(node) {
  return node !== null && typeof node === "object" && hasOwn(node, "componentOptions");
}
export {
  isVNode as i
};
