"use strict";
const DescriptionsItem = {
  name: "ElDescriptionsItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    span: {
      type: Number,
      default: 1
    },
    contentClassName: {
      type: String,
      default: ""
    },
    contentStyle: {
      type: Object
    },
    labelClassName: {
      type: String,
      default: ""
    },
    labelStyle: {
      type: Object
    }
  },
  render() {
    return null;
  }
};
const _DescriptionsItem = DescriptionsItem;
_DescriptionsItem.install = function install(Vue) {
  Vue.component(_DescriptionsItem.name, _DescriptionsItem);
};
module.exports = _DescriptionsItem;
