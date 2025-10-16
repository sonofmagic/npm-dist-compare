"use strict";
require("vue");
const ElCollapseTransition = require("element-ui/lib/transitions/collapse-transition");
const menuMixin = require("./menu-mixin-DHC-SFBm.cjs");
const Emitter = require("element-ui/lib/mixins/emitter");
const Popper = require("element-ui/lib/utils/vue-popper");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const poperMixins = {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: false
    },
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions
  },
  data: Popper.data,
  methods: Popper.methods,
  beforeDestroy: Popper.beforeDestroy,
  deactivated: Popper.deactivated
};
const _sfc_main = {
  name: "ElSubmenu",
  componentName: "ElSubmenu",
  mixins: [menuMixin.Menu, Emitter, poperMixins],
  components: {
    ElCollapseTransition
  },
  props: {
    index: {
      type: String,
      required: true
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    popperClass: String,
    disabled: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: void 0
    }
  },
  data() {
    return {
      popperJS: null,
      timeout: null,
      items: {},
      submenus: {},
      mouseInChild: false
    };
  },
  watch: {
    opened(val) {
      if (this.isMenuPopup) {
        this.$nextTick((_) => {
          this.updatePopper();
        });
      }
    }
  },
  computed: {
    // popper option
    appendToBody() {
      return this.popperAppendToBody === void 0 ? this.isFirstLevel : this.popperAppendToBody;
    },
    menuTransitionName() {
      return this.rootMenu.collapse ? "el-zoom-in-left" : "el-zoom-in-top";
    },
    opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1;
    },
    active() {
      let isActive = false;
      const submenus = this.submenus;
      const items = this.items;
      Object.keys(items).forEach((index) => {
        if (items[index].active) {
          isActive = true;
        }
      });
      Object.keys(submenus).forEach((index) => {
        if (submenus[index].active) {
          isActive = true;
        }
      });
      return isActive;
    },
    hoverBackground() {
      return this.rootMenu.hoverBackground;
    },
    backgroundColor() {
      return this.rootMenu.backgroundColor || "";
    },
    activeTextColor() {
      return this.rootMenu.activeTextColor || "";
    },
    textColor() {
      return this.rootMenu.textColor || "";
    },
    mode() {
      return this.rootMenu.mode;
    },
    isMenuPopup() {
      return this.rootMenu.isMenuPopup;
    },
    titleStyle() {
      if (this.mode !== "horizontal") {
        return {
          color: this.textColor
        };
      }
      return {
        borderBottomColor: this.active ? this.rootMenu.activeTextColor ? this.activeTextColor : "" : "transparent",
        color: this.active ? this.activeTextColor : this.textColor
      };
    },
    isFirstLevel() {
      let isFirstLevel = true;
      let parent = this.$parent;
      while (parent && parent !== this.rootMenu) {
        if (["ElSubmenu", "ElMenuItemGroup"].indexOf(parent.$options.componentName) > -1) {
          isFirstLevel = false;
          break;
        } else {
          parent = parent.$parent;
        }
      }
      return isFirstLevel;
    }
  },
  methods: {
    handleCollapseToggle(value) {
      if (value) {
        this.initPopper();
      } else {
        this.doDestroy();
      }
    },
    addItem(item) {
      this.$set(this.items, item.index, item);
    },
    removeItem(item) {
      delete this.items[item.index];
    },
    addSubmenu(item) {
      this.$set(this.submenus, item.index, item);
    },
    removeSubmenu(item) {
      delete this.submenus[item.index];
    },
    handleClick() {
      const {
        rootMenu,
        disabled
      } = this;
      if (rootMenu.menuTrigger === "hover" && rootMenu.mode === "horizontal" || rootMenu.collapse && rootMenu.mode === "vertical" || disabled) {
        return;
      }
      this.dispatch("ElMenu", "submenu-click", this);
    },
    handleMouseenter(event, showTimeout = this.showTimeout) {
      if (!("ActiveXObject" in window) && event.type === "focus" && !event.relatedTarget) {
        return;
      }
      const {
        rootMenu,
        disabled
      } = this;
      if (rootMenu.menuTrigger === "click" && rootMenu.mode === "horizontal" || !rootMenu.collapse && rootMenu.mode === "vertical" || disabled) {
        return;
      }
      this.dispatch("ElSubmenu", "mouse-enter-child");
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.rootMenu.openMenu(this.index, this.indexPath);
      }, showTimeout);
      if (this.appendToBody) {
        this.$parent.$el.dispatchEvent(new MouseEvent("mouseenter"));
      }
    },
    handleMouseleave(deepDispatch = false) {
      const {
        rootMenu
      } = this;
      if (rootMenu.menuTrigger === "click" && rootMenu.mode === "horizontal" || !rootMenu.collapse && rootMenu.mode === "vertical") {
        return;
      }
      this.dispatch("ElSubmenu", "mouse-leave-child");
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        !this.mouseInChild && this.rootMenu.closeMenu(this.index);
      }, this.hideTimeout);
      if (this.appendToBody && deepDispatch) {
        if (this.$parent.$options.name === "ElSubmenu") {
          this.$parent.handleMouseleave(true);
        }
      }
    },
    handleTitleMouseenter() {
      if (this.mode === "horizontal" && !this.rootMenu.backgroundColor) return;
      const title = this.$refs["submenu-title"];
      title && (title.style.backgroundColor = this.rootMenu.hoverBackground);
    },
    handleTitleMouseleave() {
      if (this.mode === "horizontal" && !this.rootMenu.backgroundColor) return;
      const title = this.$refs["submenu-title"];
      title && (title.style.backgroundColor = this.rootMenu.backgroundColor || "");
    },
    updatePlacement() {
      this.currentPlacement = this.mode === "horizontal" && this.isFirstLevel ? "bottom-start" : "right-start";
    },
    initPopper() {
      this.referenceElm = this.$el;
      this.popperElm = this.$refs.menu;
      this.updatePlacement();
    }
  },
  created() {
    this.$on("toggle-collapse", this.handleCollapseToggle);
    this.$on("mouse-enter-child", () => {
      this.mouseInChild = true;
      clearTimeout(this.timeout);
    });
    this.$on("mouse-leave-child", () => {
      this.mouseInChild = false;
      clearTimeout(this.timeout);
    });
  },
  mounted() {
    this.parentMenu.addSubmenu(this);
    this.rootMenu.addSubmenu(this);
    this.initPopper();
  },
  beforeDestroy() {
    this.parentMenu.removeSubmenu(this);
    this.rootMenu.removeSubmenu(this);
  },
  render(h) {
    const {
      active,
      opened,
      paddingStyle,
      titleStyle,
      backgroundColor,
      rootMenu,
      currentPlacement,
      menuTransitionName,
      mode,
      disabled,
      popperClass,
      $slots,
      isFirstLevel
    } = this;
    const popupMenu = h("transition", {
      "attrs": {
        "name": menuTransitionName
      }
    }, [h("div", {
      "ref": "menu",
      "directives": [{
        name: "show",
        value: opened
      }],
      "class": [`el-menu--${mode}`, popperClass],
      "on": {
        "mouseenter": ($event) => this.handleMouseenter($event, 100),
        "mouseleave": () => this.handleMouseleave(true),
        "focus": ($event) => this.handleMouseenter($event, 100)
      }
    }, [h("ul", {
      "attrs": {
        "role": "menu"
      },
      "class": ["el-menu el-menu--popup", `el-menu--popup-${currentPlacement}`],
      "style": {
        backgroundColor: rootMenu.backgroundColor || ""
      }
    }, [$slots.default])])]);
    const inlineMenu = h("el-collapse-transition", [h("ul", {
      "attrs": {
        "role": "menu"
      },
      "class": "el-menu el-menu--inline",
      "directives": [{
        name: "show",
        value: opened
      }],
      "style": {
        backgroundColor: rootMenu.backgroundColor || ""
      }
    }, [$slots.default])]);
    const submenuTitleIcon = rootMenu.mode === "horizontal" && isFirstLevel || rootMenu.mode === "vertical" && !rootMenu.collapse ? "el-icon-arrow-down" : "el-icon-arrow-right";
    return h("li", {
      "class": {
        "el-submenu": true,
        "is-active": active,
        "is-opened": opened,
        "is-disabled": disabled
      },
      "attrs": {
        "role": "menuitem",
        "aria-haspopup": "true",
        "aria-expanded": opened
      },
      "on": {
        "mouseenter": this.handleMouseenter,
        "mouseleave": () => this.handleMouseleave(false),
        "focus": this.handleMouseenter
      }
    }, [h("div", {
      "class": "el-submenu__title",
      "ref": "submenu-title",
      "on": {
        "click": this.handleClick,
        "mouseenter": this.handleTitleMouseenter,
        "mouseleave": this.handleTitleMouseleave
      },
      "style": [paddingStyle, titleStyle, {
        backgroundColor
      }]
    }, [$slots.title, h("i", {
      "class": ["el-submenu__icon-arrow", submenuTitleIcon]
    })]), this.isMenuPopup ? popupMenu : inlineMenu]);
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
const ElSubmenu = __component__.exports;
ElSubmenu.install = function(Vue) {
  Vue.component(ElSubmenu.name, ElSubmenu);
};
module.exports = ElSubmenu;
