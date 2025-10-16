"use strict";
const Vue = require("vue");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const merge = require("element-ui/lib/utils/merge");
const Popup = require("element-ui/lib/utils/popup");
const vdom = require("element-ui/lib/utils/vdom");
let typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};
const _sfc_main = {
  data() {
    return {
      visible: false,
      title: "",
      message: "",
      duration: 4500,
      type: "",
      showClose: true,
      customClass: "",
      iconClass: "",
      onClose: null,
      onClick: null,
      closed: false,
      verticalOffset: 0,
      timer: null,
      dangerouslyUseHTMLString: false,
      position: "top-right"
    };
  },
  computed: {
    typeClass() {
      return this.type && typeMap[this.type] ? `el-icon-${typeMap[this.type]}` : "";
    },
    horizontalClass() {
      return this.position.indexOf("right") > -1 ? "right" : "left";
    },
    verticalProperty() {
      return /^top-/.test(this.position) ? "top" : "bottom";
    },
    positionStyle() {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`
      };
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener("transitionend", this.destroyElement);
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener("transitionend", this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    click() {
      if (typeof this.onClick === "function") {
        this.onClick();
      }
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose();
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
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer();
      } else if (e.keyCode === 27) {
        if (!this.closed) {
          this.close();
        }
      } else {
        this.startTimer();
      }
    }
  },
  mounted() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close();
        }
      }, this.duration);
    }
    document.addEventListener("keydown", this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-notification-fade" } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: ["el-notification", _vm.customClass, _vm.horizontalClass], style: _vm.positionStyle, attrs: { "role": "alert" }, on: { "mouseenter": function($event) {
    return _vm.clearTimer();
  }, "mouseleave": function($event) {
    return _vm.startTimer();
  }, "click": _vm.click } }, [_vm.type || _vm.iconClass ? _c("i", { staticClass: "el-notification__icon", class: [_vm.typeClass, _vm.iconClass] }) : _vm._e(), _c("div", { staticClass: "el-notification__group", class: { "is-with-icon": _vm.typeClass || _vm.iconClass } }, [_c("h2", { staticClass: "el-notification__title", domProps: { "textContent": _vm._s(_vm.title) } }), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.message, expression: "message" }], staticClass: "el-notification__content" }, [_vm._t("default", function() {
    return [!_vm.dangerouslyUseHTMLString ? _c("p", [_vm._v(_vm._s(_vm.message))]) : _c("p", { domProps: { "innerHTML": _vm._s(_vm.message) } })];
  })], 2), _vm.showClose ? _c("div", { staticClass: "el-notification__closeBtn el-icon-close", on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.close.apply(null, arguments);
  } } }) : _vm._e()])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Main = __component__.exports;
const NotificationConstructor = Vue.extend(Main);
let instance;
let instances = [];
let seed = 1;
const Notification = function(options) {
  if (Vue.prototype.$isServer) return;
  options = merge({}, options);
  const userOnClose = options.onClose;
  const id = "notification_" + seed++;
  const position = options.position || "top-right";
  options.onClose = function() {
    Notification.close(id, userOnClose);
  };
  instance = new NotificationConstructor({
    data: options
  });
  if (vdom.isVNode(options.message)) {
    instance.$slots.default = [options.message];
    options.message = "REPLACED_BY_VNODE";
  }
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  instance.dom = instance.$el;
  instance.dom.style.zIndex = Popup.PopupManager.nextZIndex();
  let verticalOffset = options.offset || 0;
  instances.filter((item) => item.position === position).forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
};
["success", "warning", "info", "error"].forEach((type) => {
  Notification[type] = (options) => {
    if (typeof options === "string" || vdom.isVNode(options)) {
      options = {
        message: options
      };
    }
    options.type = type;
    return Notification(options);
  };
});
Notification.close = function(id, userOnClose) {
  let index = -1;
  const len = instances.length;
  const instance2 = instances.filter((instance3, i) => {
    if (instance3.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0];
  if (!instance2) return;
  if (typeof userOnClose === "function") {
    userOnClose(instance2);
  }
  instances.splice(index, 1);
  if (len <= 1) return;
  const position = instance2.position;
  const removedHeight = instance2.dom.offsetHeight;
  for (let i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[instance2.verticalProperty] = parseInt(instances[i].dom.style[instance2.verticalProperty], 10) - removedHeight - 16 + "px";
    }
  }
};
Notification.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};
exports.Notification = Notification;
