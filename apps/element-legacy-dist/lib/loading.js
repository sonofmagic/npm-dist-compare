import Vue from "vue";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
import { g as getStyle, a as addClass, r as removeClass } from "./dom-5kqU03Ls.js";
import { PopupManager } from "element-ui/lib/utils/popup";
import { m as merge } from "./merge-B0EzIJjn.js";
const _sfc_main = {
  data() {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: ""
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    },
    setText(text) {
      this.text = text;
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-loading-fade" }, on: { "after-leave": _vm.handleAfterLeave } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-loading-mask", class: [_vm.customClass, { "is-fullscreen": _vm.fullscreen }], style: { backgroundColor: _vm.background || "" } }, [_c("div", { staticClass: "el-loading-spinner" }, [!_vm.spinner ? _c("svg", { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c("circle", { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })]) : _c("i", { class: _vm.spinner }), _vm.text ? _c("p", { staticClass: "el-loading-text" }, [_vm._v(_vm._s(_vm.text))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const loadingVue = __component__.exports;
function afterLeave(instance, callback, speed = 300, once = false) {
  if (!instance || !callback) throw new Error("instance & callback is required");
  let called = false;
  const afterLeaveCallback = function() {
    if (called) return;
    called = true;
    if (callback) {
      callback.apply(null, arguments);
    }
  };
  if (once) {
    instance.$once("after-leave", afterLeaveCallback);
  } else {
    instance.$on("after-leave", afterLeaveCallback);
  }
  setTimeout(() => {
    afterLeaveCallback();
  }, speed + 100);
}
const Mask = Vue.extend(loadingVue);
const loadingDirective = {};
loadingDirective.install = (Vue2) => {
  if (Vue2.prototype.$isServer) return;
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue2.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = getStyle(document.body, "position");
          el.originalOverflow = getStyle(document.body, "overflow");
          el.maskStyle.zIndex = PopupManager.nextZIndex();
          addClass(el.mask, "is-fullscreen");
          insertDom(document.body, el, binding);
        } else {
          removeClass(el.mask, "is-fullscreen");
          if (binding.modifiers.body) {
            el.originalPosition = getStyle(document.body, "position");
            ["top", "left"].forEach((property) => {
              const scroll = property === "top" ? "scrollTop" : "scrollLeft";
              el.maskStyle[property] = el.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] - parseInt(getStyle(document.body, `margin-${property}`), 10) + "px";
            });
            ["height", "width"].forEach((property) => {
              el.maskStyle[property] = el.getBoundingClientRect()[property] + "px";
            });
            insertDom(document.body, el, binding);
          } else {
            el.originalPosition = getStyle(el, "position");
            insertDom(el, el, binding);
          }
        }
      });
    } else {
      afterLeave(el.instance, (_) => {
        if (!el.instance.hiding) return;
        el.domVisible = false;
        const target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el;
        removeClass(target, "el-loading-parent--relative");
        removeClass(target, "el-loading-parent--hidden");
        el.instance.hiding = false;
      }, 300, true);
      el.instance.visible = false;
      el.instance.hiding = true;
    }
  };
  const insertDom = (parent, el, binding) => {
    if (!el.domVisible && getStyle(el, "display") !== "none" && getStyle(el, "visibility") !== "hidden") {
      Object.keys(el.maskStyle).forEach((property) => {
        el.mask.style[property] = el.maskStyle[property];
      });
      if (el.originalPosition !== "absolute" && el.originalPosition !== "fixed" && el.originalPosition !== "sticky") {
        addClass(parent, "el-loading-parent--relative");
      }
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        addClass(parent, "el-loading-parent--hidden");
      }
      el.domVisible = true;
      parent.appendChild(el.mask);
      Vue2.nextTick(() => {
        if (el.instance.hiding) {
          el.instance.$emit("after-leave");
        } else {
          el.instance.visible = true;
        }
      });
      el.domInserted = true;
    } else if (el.domVisible && el.instance.hiding === true) {
      el.instance.visible = true;
      el.instance.hiding = false;
    }
  };
  Vue2.directive("loading", {
    bind: function(el, binding, vnode) {
      const textExr = el.getAttribute("element-loading-text");
      const spinnerExr = el.getAttribute("element-loading-spinner");
      const backgroundExr = el.getAttribute("element-loading-background");
      const customClassExr = el.getAttribute("element-loading-custom-class");
      const vm = vnode.context;
      const mask = new Mask({
        el: document.createElement("div"),
        data: {
          text: vm && vm[textExr] || textExr,
          spinner: vm && vm[spinnerExr] || spinnerExr,
          background: vm && vm[backgroundExr] || backgroundExr,
          customClass: vm && vm[customClassExr] || customClassExr,
          fullscreen: !!binding.modifiers.fullscreen
        }
      });
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {};
      binding.value && toggleLoading(el, binding);
    },
    update: function(el, binding) {
      el.instance.setText(el.getAttribute("element-loading-text"));
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },
    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask);
        toggleLoading(el, { value: false, modifiers: binding.modifiers });
      }
      el.instance && el.instance.$destroy();
    }
  });
};
const LoadingConstructor = Vue.extend(loadingVue);
const defaults = {
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: ""
};
let fullscreenLoading;
LoadingConstructor.prototype.originalPosition = "";
LoadingConstructor.prototype.originalOverflow = "";
LoadingConstructor.prototype.close = function() {
  if (this.fullscreen) {
    fullscreenLoading = void 0;
  }
  afterLeave(this, (_) => {
    const target = this.fullscreen || this.body ? document.body : this.target;
    removeClass(target, "el-loading-parent--relative");
    removeClass(target, "el-loading-parent--hidden");
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    this.$destroy();
  }, 300);
  this.visible = false;
};
const addStyle = (options, parent, instance) => {
  let maskStyle = {};
  if (options.fullscreen) {
    instance.originalPosition = getStyle(document.body, "position");
    instance.originalOverflow = getStyle(document.body, "overflow");
    maskStyle.zIndex = PopupManager.nextZIndex();
  } else if (options.body) {
    instance.originalPosition = getStyle(document.body, "position");
    ["top", "left"].forEach((property) => {
      let scroll = property === "top" ? "scrollTop" : "scrollLeft";
      maskStyle[property] = options.target.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] + "px";
    });
    ["height", "width"].forEach((property) => {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + "px";
    });
  } else {
    instance.originalPosition = getStyle(parent, "position");
  }
  Object.keys(maskStyle).forEach((property) => {
    instance.$el.style[property] = maskStyle[property];
  });
};
const Loading$1 = (options = {}) => {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options);
  if (typeof options.target === "string") {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }
  let parent = options.body ? document.body : options.target;
  let instance = new LoadingConstructor({
    el: document.createElement("div"),
    data: options
  });
  addStyle(options, parent, instance);
  if (instance.originalPosition !== "absolute" && instance.originalPosition !== "fixed" && instance.originalPosition !== "sticky") {
    addClass(parent, "el-loading-parent--relative");
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, "el-loading-parent--hidden");
  }
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};
const Loading = {
  install(Vue2) {
    Vue2.use(loadingDirective);
    const proto = Vue2.prototype;
    proto.$loading = Loading$1;
  },
  directive: loadingDirective,
  service: Loading$1
};
export {
  Loading as default
};
