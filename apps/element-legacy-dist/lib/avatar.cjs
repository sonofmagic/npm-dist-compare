"use strict";
const Vue = require("vue");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElAvatar",
  props: {
    size: {
      type: [Number, String],
      validator(val) {
        if (typeof val === "string") {
          return ["large", "medium", "small"].includes(val);
        }
        return typeof val === "number";
      }
    },
    shape: {
      type: String,
      default: "circle",
      validator(val) {
        return ["circle", "square"].includes(val);
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: "cover"
    }
  },
  data() {
    return {
      isImageExist: true
    };
  },
  computed: {
    avatarClass() {
      const {
        size,
        icon,
        shape
      } = this;
      let classList = ["el-avatar"];
      if (size && typeof size === "string") {
        classList.push(`el-avatar--${size}`);
      }
      if (icon) {
        classList.push("el-avatar--icon");
      }
      if (shape) {
        classList.push(`el-avatar--${shape}`);
      }
      return classList.join(" ");
    }
  },
  methods: {
    handleError() {
      const {
        error
      } = this;
      const errorFlag = error ? error() : void 0;
      if (errorFlag !== false) {
        this.isImageExist = false;
      }
    },
    renderAvatar() {
      const {
        icon,
        src,
        alt,
        isImageExist,
        srcSet,
        fit
      } = this;
      if (isImageExist && src) {
        return Vue.h("img", {
          "attrs": {
            "src": src,
            "alt": alt,
            "srcSet": srcSet
          },
          "on": {
            "error": this.handleError
          },
          "style": {
            "object-fit": fit
          }
        });
      }
      if (icon) {
        return Vue.h("i", {
          "class": icon
        });
      }
      return this.$slots.default;
    }
  },
  render() {
    const {
      avatarClass,
      size
    } = this;
    const sizeStyle = typeof size === "number" ? {
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`
    } : {};
    return Vue.h("span", {
      "class": avatarClass,
      "style": sizeStyle
    }, [this.renderAvatar()]);
  }
};
const _sfc_render = null;
const _sfc_staticRenderFns = null;
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Avatar = __component__.exports;
const _Avatar = Avatar;
_Avatar.install = function install(Vue2) {
  Vue2.component(_Avatar.name, _Avatar);
};
module.exports = _Avatar;
