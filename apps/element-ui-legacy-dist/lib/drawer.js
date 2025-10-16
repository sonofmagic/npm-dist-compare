import Popup from "element-ui/lib/utils/popup";
import Emitter from "element-ui/lib/mixins/emitter";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElDrawer",
  mixins: [Popup, Emitter],
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    customClass: {
      type: String,
      default: ""
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: "rtl",
      validator(val) {
        return ["ltr", "rtl", "ttb", "btt"].indexOf(val) !== -1;
      }
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: [Number, String],
      default: "30%"
    },
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    withHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isHorizontal() {
      return this.direction === "rtl" || this.direction === "ltr";
    },
    drawerSize() {
      return typeof this.size === "number" ? `${this.size}px` : this.size;
    }
  },
  data() {
    return {
      closed: false,
      prevActiveElement: null
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit("open");
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.prevActiveElement = document.activeElement;
      } else {
        if (!this.closed) {
          this.$emit("close");
          if (this.destroyOnClose === true) {
            this.rendered = false;
          }
        }
        this.$nextTick(() => {
          if (this.prevActiveElement) {
            this.prevActiveElement.focus();
          }
        });
      }
    }
  },
  methods: {
    afterEnter() {
      this.$emit("opened");
    },
    afterLeave() {
      this.$emit("closed");
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("close");
        if (this.destroyOnClose === true) {
          this.rendered = false;
        }
        this.closed = true;
      }
    },
    handleWrapperClick() {
      if (this.wrapperClosable) {
        this.closeDrawer();
      }
    },
    closeDrawer() {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    handleClose() {
      this.closeDrawer();
    }
  },
  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-drawer-fade" }, on: { "after-enter": _vm.afterEnter, "after-leave": _vm.afterLeave } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], staticClass: "el-drawer__wrapper", attrs: { "tabindex": "-1" } }, [_c("div", { staticClass: "el-drawer__container", class: _vm.visible && "el-drawer__open", attrs: { "role": "document", "tabindex": "-1" }, on: { "click": function($event) {
    if ($event.target !== $event.currentTarget) return null;
    return _vm.handleWrapperClick.apply(null, arguments);
  } } }, [_c("div", { ref: "drawer", staticClass: "el-drawer", class: [_vm.direction, _vm.customClass], style: _vm.isHorizontal ? `width: ${_vm.drawerSize}` : `height: ${_vm.drawerSize}`, attrs: { "aria-modal": "true", "aria-labelledby": "el-drawer__title", "aria-label": _vm.title, "role": "dialog", "tabindex": "-1" } }, [_vm.withHeader ? _c("header", { staticClass: "el-drawer__header", attrs: { "id": "el-drawer__title" } }, [_vm._t("title", function() {
    return [_c("span", { attrs: { "role": "heading", "title": _vm.title } }, [_vm._v(_vm._s(_vm.title))])];
  }), _vm.showClose ? _c("button", { staticClass: "el-drawer__close-btn", attrs: { "aria-label": `close ${_vm.title || "drawer"}`, "type": "button" }, on: { "click": _vm.closeDrawer } }, [_c("i", { staticClass: "el-dialog__close el-icon el-icon-close" })]) : _vm._e()], 2) : _vm._e(), _vm.rendered ? _c("section", { staticClass: "el-drawer__body" }, [_vm._t("default")], 2) : _vm._e()])])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Drawer = __component__.exports;
Drawer.install = function(Vue) {
  Vue.component(Drawer.name, Drawer);
};
export {
  Drawer as default
};
