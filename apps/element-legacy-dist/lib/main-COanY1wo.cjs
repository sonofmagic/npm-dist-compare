"use strict";
const Vue = require("vue");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const Popup = require("element-ui/lib/utils/popup");
const vdom = require("./vdom-dVtmLhna.cjs");
const types = require("./types-Bk5IjeY6.cjs");
const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};
const _sfc_main = {
  data() {
    return {
      visible: false,
      message: "",
      duration: 3e3,
      type: "info",
      iconClass: "",
      customClass: "",
      onClose: null,
      showClose: false,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    };
  },
  computed: {
    typeClass() {
      return this.type && !this.iconClass ? `el-message__icon el-icon-${typeMap[this.type]}` : "";
    },
    positionStyle() {
      return {
        "top": `${this.verticalOffset}px`
      };
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 27) {
        if (!this.closed) {
          this.close();
        }
      }
    }
  },
  mounted() {
    this.startTimer();
    document.addEventListener("keydown", this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-message-fade" }, on: { "after-leave": _vm.handleAfterLeave } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: [
    "el-message",
    _vm.type && !_vm.iconClass ? `el-message--${_vm.type}` : "",
    _vm.center ? "is-center" : "",
    _vm.showClose ? "is-closable" : "",
    _vm.customClass
  ], style: _vm.positionStyle, attrs: { "role": "alert" }, on: { "mouseenter": _vm.clearTimer, "mouseleave": _vm.startTimer } }, [_vm.iconClass ? _c("i", { class: _vm.iconClass }) : _c("i", { class: _vm.typeClass }), _vm._t("default", function() {
    return [!_vm.dangerouslyUseHTMLString ? _c("p", { staticClass: "el-message__content" }, [_vm._v(_vm._s(_vm.message))]) : _c("p", { staticClass: "el-message__content", domProps: { "innerHTML": _vm._s(_vm.message) } })];
  }), _vm.showClose ? _c("i", { staticClass: "el-message__closeBtn el-icon-close", on: { "click": _vm.close } }) : _vm._e()], 2)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Main = __component__.exports;
let MessageConstructor = Vue.extend(Main);
let instance;
let instances = [];
let seed = 1;
const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === "string") {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  let id = "message_" + seed++;
  options.onClose = function() {
    Message.close(id, userOnClose);
  };
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  if (vdom.isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.$mount();
  document.body.appendChild(instance.$el);
  let verticalOffset = options.offset || 20;
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instance.$el.style.zIndex = Popup.PopupManager.nextZIndex();
  instances.push(instance);
  return instance;
};
["success", "warning", "info", "error"].forEach((type) => {
  Message[type] = (options) => {
    if (types.isObject(options) && !vdom.isVNode(options)) {
      return Message({
        ...options,
        type
      });
    }
    return Message({
      type,
      message: options
    });
  };
});
Message.close = function(id, userOnClose) {
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight;
      index = i;
      if (typeof userOnClose === "function") {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    dom.style["top"] = parseInt(dom.style["top"], 10) - removedHeight - 16 + "px";
  }
};
Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};
exports.Message = Message;
