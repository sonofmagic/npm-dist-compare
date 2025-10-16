import "vue";
import { e as emitter } from "./emitter-4-51d8br.js";
import { M as Migrating } from "./migrating-Can3Zxzl.js";
import { A as AriaUtils } from "./aria-utils-C3HsvWKJ.js";
import { a as addClass, h as hasClass, r as removeClass } from "./dom-5kqU03Ls.js";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const SubMenu = function(parent, domNode) {
  this.domNode = domNode;
  this.parent = parent;
  this.subMenuItems = [];
  this.subIndex = 0;
  this.init();
};
SubMenu.prototype.init = function() {
  this.subMenuItems = this.domNode.querySelectorAll("li");
  this.addListeners();
};
SubMenu.prototype.gotoSubIndex = function(idx) {
  if (idx === this.subMenuItems.length) {
    idx = 0;
  } else if (idx < 0) {
    idx = this.subMenuItems.length - 1;
  }
  this.subMenuItems[idx].focus();
  this.subIndex = idx;
};
SubMenu.prototype.addListeners = function() {
  const keys = AriaUtils.keys;
  const parentNode = this.parent.domNode;
  Array.prototype.forEach.call(this.subMenuItems, (el) => {
    el.addEventListener("keydown", (event) => {
      let prevDef = false;
      switch (event.keyCode) {
        case keys.down:
          this.gotoSubIndex(this.subIndex + 1);
          prevDef = true;
          break;
        case keys.up:
          this.gotoSubIndex(this.subIndex - 1);
          prevDef = true;
          break;
        case keys.tab:
          AriaUtils.triggerEvent(parentNode, "mouseleave");
          break;
        case keys.enter:
        case keys.space:
          prevDef = true;
          event.currentTarget.click();
          break;
      }
      if (prevDef) {
        event.preventDefault();
        event.stopPropagation();
      }
      return false;
    });
  });
};
const MenuItem = function(domNode) {
  this.domNode = domNode;
  this.submenu = null;
  this.init();
};
MenuItem.prototype.init = function() {
  this.domNode.setAttribute("tabindex", "0");
  let menuChild = this.domNode.querySelector(".el-menu");
  if (menuChild) {
    this.submenu = new SubMenu(this, menuChild);
  }
  this.addListeners();
};
MenuItem.prototype.addListeners = function() {
  const keys = AriaUtils.keys;
  this.domNode.addEventListener("keydown", (event) => {
    let prevDef = false;
    switch (event.keyCode) {
      case keys.down:
        AriaUtils.triggerEvent(event.currentTarget, "mouseenter");
        this.submenu && this.submenu.gotoSubIndex(0);
        prevDef = true;
        break;
      case keys.up:
        AriaUtils.triggerEvent(event.currentTarget, "mouseenter");
        this.submenu && this.submenu.gotoSubIndex(this.submenu.subMenuItems.length - 1);
        prevDef = true;
        break;
      case keys.tab:
        AriaUtils.triggerEvent(event.currentTarget, "mouseleave");
        break;
      case keys.enter:
      case keys.space:
        prevDef = true;
        event.currentTarget.click();
        break;
    }
    if (prevDef) {
      event.preventDefault();
    }
  });
};
const Menu = function(domNode) {
  this.domNode = domNode;
  this.init();
};
Menu.prototype.init = function() {
  let menuChildren = this.domNode.childNodes;
  [].filter.call(menuChildren, (child) => child.nodeType === 1).forEach((child) => {
    new MenuItem(child);
  });
};
const _sfc_main = {
  name: "ElMenu",
  render(h) {
    const component = h("ul", {
      "attrs": {
        "role": "menubar"
      },
      "key": +this.collapse,
      "style": {
        backgroundColor: this.backgroundColor || ""
      },
      "class": {
        "el-menu--horizontal": this.mode === "horizontal",
        "el-menu--collapse": this.collapse,
        "el-menu": true
      }
    }, [this.$slots.default]);
    if (this.collapseTransition) {
      return h("el-menu-collapse-transition", [component]);
    } else {
      return component;
    }
  },
  componentName: "ElMenu",
  mixins: [emitter, Migrating],
  provide() {
    return {
      rootMenu: this
    };
  },
  components: {
    "el-menu-collapse-transition": {
      functional: true,
      render(createElement, context) {
        const data = {
          props: {
            mode: "out-in"
          },
          on: {
            beforeEnter(el) {
              el.style.opacity = 0.2;
            },
            enter(el) {
              addClass(el, "el-opacity-transition");
              el.style.opacity = 1;
            },
            afterEnter(el) {
              removeClass(el, "el-opacity-transition");
              el.style.opacity = "";
            },
            beforeLeave(el) {
              if (!el.dataset) el.dataset = {};
              if (hasClass(el, "el-menu--collapse")) {
                removeClass(el, "el-menu--collapse");
                el.dataset.oldOverflow = el.style.overflow;
                el.dataset.scrollWidth = el.clientWidth;
                addClass(el, "el-menu--collapse");
              } else {
                addClass(el, "el-menu--collapse");
                el.dataset.oldOverflow = el.style.overflow;
                el.dataset.scrollWidth = el.clientWidth;
                removeClass(el, "el-menu--collapse");
              }
              el.style.width = el.scrollWidth + "px";
              el.style.overflow = "hidden";
            },
            leave(el) {
              addClass(el, "horizontal-collapse-transition");
              el.style.width = el.dataset.scrollWidth + "px";
            }
          }
        };
        return createElement("transition", data, context.children);
      }
    }
  },
  props: {
    mode: {
      type: String,
      default: "vertical"
    },
    defaultActive: {
      type: String,
      default: ""
    },
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    router: Boolean,
    menuTrigger: {
      type: String,
      default: "hover"
    },
    collapse: Boolean,
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    collapseTransition: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeIndex: this.defaultActive,
      openedMenus: this.defaultOpeneds && !this.collapse ? this.defaultOpeneds.slice(0) : [],
      items: {},
      submenus: {}
    };
  },
  computed: {
    hoverBackground() {
      return this.backgroundColor ? this.mixColor(this.backgroundColor, 0.2) : "";
    },
    isMenuPopup() {
      return this.mode === "horizontal" || this.mode === "vertical" && this.collapse;
    }
  },
  watch: {
    defaultActive(value) {
      if (!this.items[value]) {
        this.activeIndex = null;
      }
      this.updateActiveIndex(value);
    },
    defaultOpeneds(value) {
      if (!this.collapse) {
        this.openedMenus = value;
      }
    },
    collapse(value) {
      if (value) this.openedMenus = [];
      this.broadcast("ElSubmenu", "toggle-collapse", value);
    }
  },
  methods: {
    updateActiveIndex(val) {
      const item = this.items[val] || this.items[this.activeIndex] || this.items[this.defaultActive];
      if (item) {
        this.activeIndex = item.index;
        this.initOpenedMenu();
      } else {
        this.activeIndex = null;
      }
    },
    getMigratingConfig() {
      return {
        props: {
          "theme": "theme is removed."
        }
      };
    },
    getColorChannels(color) {
      color = color.replace("#", "");
      if (/^[0-9a-fA-F]{3}$/.test(color)) {
        color = color.split("");
        for (let i = 2; i >= 0; i--) {
          color.splice(i, 0, color[i]);
        }
        color = color.join("");
      }
      if (/^[0-9a-fA-F]{6}$/.test(color)) {
        return {
          red: parseInt(color.slice(0, 2), 16),
          green: parseInt(color.slice(2, 4), 16),
          blue: parseInt(color.slice(4, 6), 16)
        };
      } else {
        return {
          red: 255,
          green: 255,
          blue: 255
        };
      }
    },
    mixColor(color, percent) {
      let {
        red,
        green,
        blue
      } = this.getColorChannels(color);
      if (percent > 0) {
        red *= 1 - percent;
        green *= 1 - percent;
        blue *= 1 - percent;
      } else {
        red += (255 - red) * percent;
        green += (255 - green) * percent;
        blue += (255 - blue) * percent;
      }
      return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
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
    openMenu(index, indexPath) {
      let openedMenus = this.openedMenus;
      if (openedMenus.indexOf(index) !== -1) return;
      if (this.uniqueOpened) {
        this.openedMenus = openedMenus.filter((index2) => {
          return indexPath.indexOf(index2) !== -1;
        });
      }
      this.openedMenus.push(index);
    },
    closeMenu(index) {
      const i = this.openedMenus.indexOf(index);
      if (i !== -1) {
        this.openedMenus.splice(i, 1);
      }
    },
    handleSubmenuClick(submenu) {
      const {
        index,
        indexPath
      } = submenu;
      let isOpened = this.openedMenus.indexOf(index) !== -1;
      if (isOpened) {
        this.closeMenu(index);
        this.$emit("close", index, indexPath);
      } else {
        this.openMenu(index, indexPath);
        this.$emit("open", index, indexPath);
      }
    },
    handleItemClick(item) {
      const {
        index,
        indexPath
      } = item;
      const oldActiveIndex = this.activeIndex;
      const hasIndex = item.index !== null;
      if (hasIndex) {
        this.activeIndex = item.index;
      }
      this.$emit("select", index, indexPath, item);
      if (this.mode === "horizontal" || this.collapse) {
        this.openedMenus = [];
      }
      if (this.router && hasIndex) {
        this.routeToItem(item, (error) => {
          this.activeIndex = oldActiveIndex;
          if (error) {
            if (error.name === "NavigationDuplicated") return;
            console.error(error);
          }
        });
      }
    },
    // 初始化展开菜单
    // initialize opened menu
    initOpenedMenu() {
      const index = this.activeIndex;
      const activeItem = this.items[index];
      if (!activeItem || this.mode === "horizontal" || this.collapse) return;
      let indexPath = activeItem.indexPath;
      indexPath.forEach((index2) => {
        let submenu = this.submenus[index2];
        submenu && this.openMenu(index2, submenu.indexPath);
      });
    },
    routeToItem(item, onError) {
      let route = item.route || item.index;
      try {
        this.$router.push(route, () => {
        }, onError);
      } catch (e) {
        console.error(e);
      }
    },
    open(index) {
      const {
        indexPath
      } = this.submenus[index.toString()];
      indexPath.forEach((i) => this.openMenu(i, indexPath));
    },
    close(index) {
      this.closeMenu(index);
    }
  },
  mounted() {
    this.initOpenedMenu();
    this.$on("item-click", this.handleItemClick);
    this.$on("submenu-click", this.handleSubmenuClick);
    if (this.mode === "horizontal") {
      new Menu(this.$el);
    }
    this.$watch("items", this.updateActiveIndex);
  }
};
const _sfc_render = null;
const _sfc_staticRenderFns = null;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElMenu = __component__.exports;
const _ElMenu = ElMenu;
_ElMenu.install = function install(Vue) {
  Vue.component(_ElMenu.name, _ElMenu);
};
export {
  _ElMenu as default
};
