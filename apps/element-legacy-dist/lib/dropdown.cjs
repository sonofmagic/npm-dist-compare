"use strict";
require("vue");
const clickoutside = require("./clickoutside-BWqUe94D.cjs");
const emitter = require("./emitter-CM7bVwl7.cjs");
const migrating = require("./migrating-BMLifAiB.cjs");
const ElButton = require("element-ui/lib/button");
const ElButtonGroup = require("element-ui/lib/button-group");
const util = require("./util-KJN0EjuU.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const _sfc_main = {
  name: "ElDropdown",
  componentName: "ElDropdown",
  mixins: [emitter.emitter, migrating.Migrating],
  directives: {
    Clickoutside: clickoutside.Clickoutside
  },
  components: {
    ElButton,
    ElButtonGroup
  },
  provide() {
    return {
      dropdown: this
    };
  },
  props: {
    trigger: {
      type: String,
      default: "hover"
    },
    type: String,
    size: {
      type: String,
      default: ""
    },
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: "bottom-end"
    },
    visibleArrow: {
      default: true
    },
    showTimeout: {
      type: Number,
      default: 250
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    tabindex: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeout: null,
      visible: false,
      triggerElm: null,
      menuItems: null,
      menuItemsArray: null,
      dropdownElm: null,
      focusing: false,
      listId: `dropdown-menu-${util.generateId()}`
    };
  },
  computed: {
    dropdownSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },
  mounted() {
    this.$on("menu-item-click", this.handleMenuItemClick);
  },
  watch: {
    visible(val) {
      this.broadcast("ElDropdownMenu", "visible", val);
      this.$emit("visible-change", val);
    },
    focusing(val) {
      const selfDefine = this.$el.querySelector(".el-dropdown-selfdefine");
      if (selfDefine) {
        if (val) {
          selfDefine.className += " focusing";
        } else {
          selfDefine.className = selfDefine.className.replace("focusing", "");
        }
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          "menu-align": "menu-align is renamed to placement."
        }
      };
    },
    show() {
      if (this.disabled) return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = true;
      }, this.trigger === "click" ? 0 : this.showTimeout);
    },
    hide() {
      if (this.disabled) return;
      this.removeTabindex();
      if (this.tabindex >= 0) {
        this.resetTabindex(this.triggerElm);
      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = false;
      }, this.trigger === "click" ? 0 : this.hideTimeout);
    },
    handleClick() {
      if (this.disabled) return;
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
    },
    handleTriggerKeyDown(ev) {
      const keyCode = ev.keyCode;
      if ([38, 40].indexOf(keyCode) > -1) {
        this.removeTabindex();
        this.resetTabindex(this.menuItems[0]);
        this.menuItems[0].focus();
        ev.preventDefault();
        ev.stopPropagation();
      } else if (keyCode === 13) {
        this.handleClick();
      } else if ([9, 27].indexOf(keyCode) > -1) {
        this.hide();
      }
    },
    handleItemKeyDown(ev) {
      const keyCode = ev.keyCode;
      const target = ev.target;
      const currentIndex = this.menuItemsArray.indexOf(target);
      const max = this.menuItemsArray.length - 1;
      let nextIndex;
      if ([38, 40].indexOf(keyCode) > -1) {
        if (keyCode === 38) {
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        } else {
          nextIndex = currentIndex < max ? currentIndex + 1 : max;
        }
        this.removeTabindex();
        this.resetTabindex(this.menuItems[nextIndex]);
        this.menuItems[nextIndex].focus();
        ev.preventDefault();
        ev.stopPropagation();
      } else if (keyCode === 13) {
        this.triggerElmFocus();
        target.click();
        if (this.hideOnClick) {
          this.visible = false;
        }
      } else if ([9, 27].indexOf(keyCode) > -1) {
        this.hide();
        this.triggerElmFocus();
      }
    },
    resetTabindex(ele) {
      this.removeTabindex();
      ele.setAttribute("tabindex", "0");
    },
    removeTabindex() {
      this.triggerElm.setAttribute("tabindex", "-1");
      this.menuItemsArray.forEach((item) => {
        item.setAttribute("tabindex", "-1");
      });
    },
    initAria() {
      this.dropdownElm.setAttribute("id", this.listId);
      this.triggerElm.setAttribute("aria-haspopup", "list");
      this.triggerElm.setAttribute("aria-controls", this.listId);
      if (!this.splitButton) {
        this.triggerElm.setAttribute("role", "button");
        this.triggerElm.setAttribute("tabindex", this.tabindex);
        this.triggerElm.setAttribute("class", (this.triggerElm.getAttribute("class") || "") + " el-dropdown-selfdefine");
      }
    },
    initEvent() {
      let {
        trigger,
        show,
        hide,
        handleClick,
        splitButton,
        handleTriggerKeyDown,
        handleItemKeyDown
      } = this;
      this.triggerElm = splitButton ? this.$refs.trigger.$el : this.$slots.default[0].elm;
      let dropdownElm = this.dropdownElm;
      this.triggerElm.addEventListener("keydown", handleTriggerKeyDown);
      dropdownElm.addEventListener("keydown", handleItemKeyDown, true);
      if (!splitButton) {
        this.triggerElm.addEventListener("focus", () => {
          this.focusing = true;
        });
        this.triggerElm.addEventListener("blur", () => {
          this.focusing = false;
        });
        this.triggerElm.addEventListener("click", () => {
          this.focusing = false;
        });
      }
      if (trigger === "hover") {
        this.triggerElm.addEventListener("mouseenter", show);
        this.triggerElm.addEventListener("mouseleave", hide);
        dropdownElm.addEventListener("mouseenter", show);
        dropdownElm.addEventListener("mouseleave", hide);
      } else if (trigger === "click") {
        this.triggerElm.addEventListener("click", handleClick);
      }
    },
    handleMenuItemClick(command, instance) {
      if (this.hideOnClick) {
        this.visible = false;
      }
      this.$emit("command", command, instance);
    },
    triggerElmFocus() {
      this.triggerElm.focus && this.triggerElm.focus();
    },
    initDomOperation() {
      this.dropdownElm = this.popperElm;
      this.menuItems = this.dropdownElm.querySelectorAll("[tabindex='-1']");
      this.menuItemsArray = [].slice.call(this.menuItems);
      this.initEvent();
      this.initAria();
    }
  },
  render(h) {
    let {
      hide,
      splitButton,
      type,
      dropdownSize,
      disabled
    } = this;
    const handleMainButtonClick = (event) => {
      this.$emit("click", event);
      hide();
    };
    let triggerElm = null;
    if (splitButton) {
      triggerElm = h("el-button-group", [h("el-button", {
        "attrs": {
          "type": type,
          "size": dropdownSize,
          "disabled": disabled
        },
        "nativeOn": {
          "click": handleMainButtonClick
        }
      }, [this.$slots.default]), h("el-button", {
        "ref": "trigger",
        "attrs": {
          "type": type,
          "size": dropdownSize,
          "disabled": disabled
        },
        "class": "el-dropdown__caret-button"
      }, [h("i", {
        "class": "el-dropdown__icon el-icon-arrow-down"
      })])]);
    } else {
      triggerElm = this.$slots.default;
      const vnodeData = triggerElm[0].data || {};
      let {
        attrs = {}
      } = vnodeData;
      if (disabled && !attrs.disabled) {
        attrs.disabled = true;
        vnodeData.attrs = attrs;
      }
    }
    const menuElm = disabled ? null : this.$slots.dropdown;
    return h("div", {
      "class": "el-dropdown",
      "directives": [{
        name: "clickoutside",
        value: hide
      }],
      "attrs": {
        "aria-disabled": disabled
      }
    }, [triggerElm, menuElm]);
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
const ElDropdown = __component__.exports;
const _ElDropdown = ElDropdown;
_ElDropdown.install = function install(Vue) {
  Vue.component(_ElDropdown.name, _ElDropdown);
};
module.exports = _ElDropdown;
