"use strict";
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElSkeleton",
  props: {
    animated: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 4
    },
    loading: {
      type: Boolean,
      default: true
    },
    throttle: {
      type: Number,
      default: 0
    }
  },
  watch: {
    loading: {
      handler(loading) {
        if (this.throttle <= 0) {
          this.uiLoading = loading;
          return;
        }
        if (loading) {
          clearTimeout(this.timeoutHandle);
          this.timeoutHandle = setTimeout(() => {
            this.uiLoading = this.loading;
          }, this.throttle);
        } else {
          this.uiLoading = loading;
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      uiLoading: this.throttle <= 0 ? this.loading : false
    };
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_vm.uiLoading ? [_c("div", _vm._b({ class: ["el-skeleton", _vm.animated ? "is-animated" : ""] }, "div", _vm.$attrs, false), [_vm._l(_vm.count, function(i) {
    return [_vm.loading ? _vm._t("template", function() {
      return _vm._l(_vm.rows, function(item) {
        return _c("el-skeleton-item", { key: `${i}-${item}`, class: {
          "el-skeleton__paragraph": item !== 1,
          "is-first": item === 1,
          "is-last": item === _vm.rows && _vm.rows > 1
        }, attrs: { "variant": "p" } });
      });
    }) : _vm._e()];
  })], 2)] : [_vm._t("default", null, null, _vm.$attrs)]], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Skeleton = __component__.exports;
const _Skeleton = Skeleton;
_Skeleton.install = function install(Vue) {
  Vue.component(_Skeleton.name, _Skeleton);
};
module.exports = _Skeleton;
