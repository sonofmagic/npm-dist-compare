"use strict";
const Vue = require("vue");
const Popup = require("element-ui/lib/utils/popup");
const locale = require("./locale-j1fuSDyN.cjs");
const ElInput = require("element-ui/lib/input");
const ElButton = require("element-ui/lib/button");
const dom = require("./dom-D54PnS1K.cjs");
const locale$1 = require("element-ui/lib/locale");
const ariaUtils = require("./aria-utils-DvEd7Frj.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const merge = require("./merge-3R-Osds6.cjs");
const vdom = require("./vdom-dVtmLhna.cjs");
var aria = aria || {};
var tabEvent;
aria.Dialog = function(dialog, focusAfterClosed, focusFirst) {
  this.dialogNode = dialog;
  if (this.dialogNode === null || this.dialogNode.getAttribute("role") !== "dialog") {
    throw new Error("Dialog() requires a DOM element with ARIA role of dialog.");
  }
  if (typeof focusAfterClosed === "string") {
    this.focusAfterClosed = document.getElementById(focusAfterClosed);
  } else if (typeof focusAfterClosed === "object") {
    this.focusAfterClosed = focusAfterClosed;
  } else {
    this.focusAfterClosed = null;
  }
  if (typeof focusFirst === "string") {
    this.focusFirst = document.getElementById(focusFirst);
  } else if (typeof focusFirst === "object") {
    this.focusFirst = focusFirst;
  } else {
    this.focusFirst = null;
  }
  if (this.focusFirst) {
    this.focusFirst.focus();
  } else {
    ariaUtils.AriaUtils.focusFirstDescendant(this.dialogNode);
  }
  this.lastFocus = document.activeElement;
  tabEvent = (e) => {
    this.trapFocus(e);
  };
  this.addListeners();
};
aria.Dialog.prototype.addListeners = function() {
  document.addEventListener("focus", tabEvent, true);
};
aria.Dialog.prototype.removeListeners = function() {
  document.removeEventListener("focus", tabEvent, true);
};
aria.Dialog.prototype.closeDialog = function() {
  this.removeListeners();
  if (this.focusAfterClosed) {
    setTimeout(() => {
      this.focusAfterClosed.focus();
    });
  }
};
aria.Dialog.prototype.trapFocus = function(event) {
  if (ariaUtils.AriaUtils.IgnoreUtilFocusChanges) {
    return;
  }
  if (this.dialogNode.contains(event.target)) {
    this.lastFocus = event.target;
  } else {
    ariaUtils.AriaUtils.focusFirstDescendant(this.dialogNode);
    if (this.lastFocus === document.activeElement) {
      ariaUtils.AriaUtils.focusLastDescendant(this.dialogNode);
    }
    this.lastFocus = document.activeElement;
  }
};
const Dialog = aria.Dialog;
let messageBox;
let typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};
const _sfc_main = {
  mixins: [Popup, locale.Locale],
  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    closeOnHashChange: {
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      default: false,
      type: Boolean
    }
  },
  components: {
    ElInput,
    ElButton
  },
  computed: {
    icon() {
      const { type, iconClass } = this;
      return iconClass || (type && typeMap[type] ? `el-icon-${typeMap[type]}` : "");
    },
    confirmButtonClasses() {
      return `el-button--primary ${this.confirmButtonClass}`;
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`;
    }
  },
  methods: {
    getSafeClose() {
      const currentId = this.uid;
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose();
        });
      };
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;
      this.onClose && this.onClose();
      messageBox.closeDialog();
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }
      this.opened = false;
      this.doAfterClose();
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },
    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? "close" : "cancel");
      }
    },
    handleInputEnter() {
      if (this.inputType !== "textarea") {
        return this.handleAction("confirm");
      }
    },
    handleAction(action) {
      if (this.$type === "prompt" && action === "confirm" && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === "function") {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    },
    validate() {
      if (this.$type === "prompt") {
        const inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || "")) {
          this.editorErrorMessage = this.inputErrorMessage || locale$1.t("el.messagebox.error");
          dom.addClass(this.getInputElement(), "invalid");
          return false;
        }
        const inputValidator = this.inputValidator;
        if (typeof inputValidator === "function") {
          const validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || locale$1.t("el.messagebox.error");
            dom.addClass(this.getInputElement(), "invalid");
            return false;
          }
          if (typeof validateResult === "string") {
            this.editorErrorMessage = validateResult;
            dom.addClass(this.getInputElement(), "invalid");
            return false;
          }
        }
      }
      this.editorErrorMessage = "";
      dom.removeClass(this.getInputElement(), "invalid");
      return true;
    },
    getFirstFocus() {
      const btn = this.$el.querySelector(".el-message-box__btns .el-button");
      const title = this.$el.querySelector(".el-message-box__btns .el-message-box__title");
      return btn || title;
    },
    getInputElement() {
      const inputRefs = this.$refs.input.$refs;
      return inputRefs.input || inputRefs.textarea;
    },
    handleClose() {
      this.handleAction("close");
    }
  },
  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick((_) => {
          if (this.$type === "prompt" && val !== null) {
            this.validate();
          }
        });
      }
    },
    visible(val) {
      if (val) {
        this.uid++;
        if (this.$type === "alert" || this.$type === "confirm") {
          this.$nextTick(() => {
            this.$refs.confirm.$el.focus();
          });
        }
        this.focusAfterClosed = document.activeElement;
        messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
      }
      if (this.$type !== "prompt") return;
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.getInputElement().focus();
          }
        }, 500);
      } else {
        this.editorErrorMessage = "";
        dom.removeClass(this.getInputElement(), "invalid");
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener("hashchange", this.close);
      }
    });
  },
  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener("hashchange", this.close);
    }
    setTimeout(() => {
      messageBox.closeDialog();
    });
  },
  data() {
    return {
      uid: 1,
      title: void 0,
      message: "",
      type: "",
      iconClass: "",
      customClass: "",
      showInput: false,
      inputValue: null,
      inputPlaceholder: "",
      inputType: "text",
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: "",
      showConfirmButton: true,
      showCancelButton: false,
      action: "",
      confirmButtonText: "",
      cancelButtonText: "",
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: "",
      confirmButtonDisabled: false,
      cancelButtonClass: "",
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false,
      distinguishCancelAndClose: false
    };
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "msgbox-fade" } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-message-box__wrapper", attrs: { "tabindex": "-1", "role": "dialog", "aria-modal": "true", "aria-label": _vm.title || "dialog" }, on: { "click": function($event) {
    if ($event.target !== $event.currentTarget) return null;
    return _vm.handleWrapperClick.apply(null, arguments);
  } } }, [_c("div", { staticClass: "el-message-box", class: [_vm.customClass, _vm.center && "el-message-box--center"] }, [_vm.title !== null ? _c("div", { staticClass: "el-message-box__header" }, [_c("div", { staticClass: "el-message-box__title" }, [_vm.icon && _vm.center ? _c("div", { class: ["el-message-box__status", _vm.icon] }) : _vm._e(), _c("span", [_vm._v(_vm._s(_vm.title))])]), _vm.showClose ? _c("button", { staticClass: "el-message-box__headerbtn", attrs: { "type": "button", "aria-label": "Close" }, on: { "click": function($event) {
    return _vm.handleAction(_vm.distinguishCancelAndClose ? "close" : "cancel");
  }, "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleAction(_vm.distinguishCancelAndClose ? "close" : "cancel");
  } } }, [_c("i", { staticClass: "el-message-box__close el-icon-close" })]) : _vm._e()]) : _vm._e(), _c("div", { staticClass: "el-message-box__content" }, [_c("div", { staticClass: "el-message-box__container" }, [_vm.icon && !_vm.center && _vm.message !== "" ? _c("div", { class: ["el-message-box__status", _vm.icon] }) : _vm._e(), _vm.message !== "" ? _c("div", { staticClass: "el-message-box__message" }, [_vm._t("default", function() {
    return [!_vm.dangerouslyUseHTMLString ? _c("p", [_vm._v(_vm._s(_vm.message))]) : _c("p", { domProps: { "innerHTML": _vm._s(_vm.message) } })];
  })], 2) : _vm._e()]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.showInput, expression: "showInput" }], staticClass: "el-message-box__input" }, [_c("el-input", { ref: "input", attrs: { "type": _vm.inputType, "placeholder": _vm.inputPlaceholder }, nativeOn: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleInputEnter.apply(null, arguments);
  } }, model: { value: _vm.inputValue, callback: function($$v) {
    _vm.inputValue = $$v;
  }, expression: "inputValue" } }), _c("div", { staticClass: "el-message-box__errormsg", style: { visibility: !!_vm.editorErrorMessage ? "visible" : "hidden" } }, [_vm._v(_vm._s(_vm.editorErrorMessage))])], 1)]), _c("div", { staticClass: "el-message-box__btns" }, [_vm.showCancelButton ? _c("el-button", { class: [_vm.cancelButtonClasses], attrs: { "loading": _vm.cancelButtonLoading, "round": _vm.roundButton, "size": "small" }, on: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleAction("cancel");
  } }, nativeOn: { "click": function($event) {
    return _vm.handleAction("cancel");
  } } }, [_vm._v(" " + _vm._s(_vm.cancelButtonText || _vm.t("el.messagebox.cancel")) + " ")]) : _vm._e(), _c("el-button", { directives: [{ name: "show", rawName: "v-show", value: _vm.showConfirmButton, expression: "showConfirmButton" }], ref: "confirm", class: [_vm.confirmButtonClasses], attrs: { "loading": _vm.confirmButtonLoading, "round": _vm.roundButton, "size": "small" }, on: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    return _vm.handleAction("confirm");
  } }, nativeOn: { "click": function($event) {
    return _vm.handleAction("confirm");
  } } }, [_vm._v(" " + _vm._s(_vm.confirmButtonText || _vm.t("el.messagebox.confirm")) + " ")])], 1)])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const msgboxVue = __component__.exports;
const defaults = {
  title: null,
  message: "",
  type: "",
  iconClass: "",
  showInput: false,
  showClose: true,
  modalFade: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  closeOnHashChange: true,
  inputValue: null,
  inputPlaceholder: "",
  inputType: "text",
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: "",
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: "right",
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: "",
  cancelButtonText: "",
  confirmButtonClass: "",
  cancelButtonClass: "",
  customClass: "",
  beforeClose: null,
  dangerouslyUseHTMLString: false,
  center: false,
  roundButton: false,
  distinguishCancelAndClose: false
};
const MessageBoxConstructor = Vue.extend(msgboxVue);
let currentMsg, instance;
let msgQueue = [];
const defaultCallback = (action) => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === "function") {
      if (instance.showInput) {
        callback(instance.inputValue, action);
      } else {
        callback(action);
      }
    }
    if (currentMsg.resolve) {
      if (action === "confirm") {
        if (instance.showInput) {
          currentMsg.resolve({ value: instance.inputValue, action });
        } else {
          currentMsg.resolve(action);
        }
      } else if (currentMsg.reject && (action === "cancel" || action === "close")) {
        currentMsg.reject(action);
      }
    }
  }
};
const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement("div")
  });
  instance.callback = defaultCallback;
};
const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = "";
  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
      let options = currentMsg.options;
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === void 0) {
        instance.callback = defaultCallback;
      }
      let oldCb = instance.callback;
      instance.callback = (action, instance2) => {
        oldCb(action, instance2);
        showNextMsg();
      };
      if (vdom.isVNode(instance.message)) {
        instance.$slots.default = [instance.message];
        instance.message = null;
      } else {
        delete instance.$slots.default;
      }
      ["modal", "showClose", "closeOnClickModal", "closeOnPressEscape", "closeOnHashChange"].forEach((prop) => {
        if (instance[prop] === void 0) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el);
      Vue.nextTick(() => {
        instance.visible = true;
      });
    }
  }
};
const MessageBox = function(options, callback) {
  if (Vue.prototype.$isServer) return;
  if (typeof options === "string" || vdom.isVNode(options)) {
    options = {
      message: options
    };
    if (typeof arguments[1] === "string") {
      options.title = arguments[1];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }
  if (typeof Promise !== "undefined") {
    return new Promise((resolve, reject) => {
      msgQueue.push({
        options: merge.merge({}, defaults, MessageBox.defaults, options),
        callback,
        resolve,
        reject
      });
      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge.merge({}, defaults, MessageBox.defaults, options),
      callback
    });
    showNextMsg();
  }
};
MessageBox.setDefaults = (defaults2) => {
  MessageBox.defaults = defaults2;
};
MessageBox.alert = (message, title, options) => {
  if (typeof title === "object") {
    options = title;
    title = "";
  } else if (title === void 0) {
    title = "";
  }
  return MessageBox(merge.merge({
    title,
    message,
    $type: "alert",
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};
MessageBox.confirm = (message, title, options) => {
  if (typeof title === "object") {
    options = title;
    title = "";
  } else if (title === void 0) {
    title = "";
  }
  return MessageBox(merge.merge({
    title,
    message,
    $type: "confirm",
    showCancelButton: true
  }, options));
};
MessageBox.prompt = (message, title, options) => {
  if (typeof title === "object") {
    options = title;
    title = "";
  } else if (title === void 0) {
    title = "";
  }
  return MessageBox(merge.merge({
    title,
    message,
    showCancelButton: true,
    showInput: true,
    $type: "prompt"
  }, options));
};
MessageBox.close = () => {
  instance.doClose();
  instance.visible = false;
  msgQueue = [];
  currentMsg = null;
};
exports.MessageBox = MessageBox;
