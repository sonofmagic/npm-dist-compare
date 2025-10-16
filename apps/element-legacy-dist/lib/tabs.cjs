"use strict";
const helper = require("./helper-x_rsIeNY.cjs");
require("vue");
const util = require("./util-KJN0EjuU.cjs");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const resizeEvent = require("./resize-event-DTlGJ6Pc.cjs");
const _sfc_main$2 = {
  name: "TabBar",
  props: {
    tabs: Array
  },
  inject: ["rootTabs"],
  computed: {
    barStyle: {
      get() {
        let style = {};
        let offset = 0;
        let tabSize = 0;
        const sizeName = ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1 ? "width" : "height";
        const sizeDir = sizeName === "width" ? "x" : "y";
        const firstUpperCase2 = (str) => {
          return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        };
        this.tabs.every((tab, index) => {
          let $el = util.arrayFind(this.$parent.$refs.tabs || [], (t) => t.id.replace("tab-", "") === tab.paneName);
          if (!$el) {
            return false;
          }
          if (!tab.active) {
            offset += $el[`client${firstUpperCase2(sizeName)}`];
            return true;
          } else {
            tabSize = $el[`client${firstUpperCase2(sizeName)}`];
            const tabStyles = window.getComputedStyle($el);
            if (sizeName === "width" && this.tabs.length > 1) {
              tabSize -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
            }
            if (sizeName === "width") {
              offset += parseFloat(tabStyles.paddingLeft);
            }
            return false;
          }
        });
        const transform = `translate${firstUpperCase2(sizeDir)}(${offset}px)`;
        style[sizeName] = tabSize + "px";
        style.transform = transform;
        style.msTransform = transform;
        style.webkitTransform = transform;
        return style;
      }
    }
  }
};
var _sfc_render$2 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-tabs__active-bar", class: `is-${_vm.rootTabs.tabPosition}`, style: _vm.barStyle });
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false
);
const TabBar = __component__$2.exports;
function noop() {
}
const firstUpperCase = (str) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};
const _sfc_main$1 = {
  name: "TabNav",
  components: {
    TabBar
  },
  inject: ["rootTabs"],
  props: {
    panes: Array,
    currentName: String,
    editable: Boolean,
    onTabClick: {
      type: Function,
      default: noop
    },
    onTabRemove: {
      type: Function,
      default: noop
    },
    type: String,
    stretch: Boolean
  },
  data() {
    return {
      scrollable: false,
      navOffset: 0,
      isFocus: false,
      focusable: true
    };
  },
  computed: {
    navStyle() {
      const dir = ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1 ? "X" : "Y";
      return {
        transform: `translate${dir}(-${this.navOffset}px)`
      };
    },
    sizeName() {
      return ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1 ? "width" : "height";
    }
  },
  methods: {
    scrollPrev() {
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
      const currentOffset = this.navOffset;
      if (!currentOffset) return;
      let newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;
      this.navOffset = newOffset;
    },
    scrollNext() {
      const navSize = this.$refs.nav[`offset${firstUpperCase(this.sizeName)}`];
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
      const currentOffset = this.navOffset;
      if (navSize - currentOffset <= containerSize) return;
      let newOffset = navSize - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize - containerSize;
      this.navOffset = newOffset;
    },
    scrollToActiveTab() {
      if (!this.scrollable) return;
      const nav = this.$refs.nav;
      const activeTab = this.$el.querySelector(".is-active");
      if (!activeTab) return;
      const navScroll = this.$refs.navScroll;
      const isHorizontal = ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1;
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = navScroll.getBoundingClientRect();
      const maxOffset = isHorizontal ? nav.offsetWidth - navScrollBounding.width : nav.offsetHeight - navScrollBounding.height;
      const currentOffset = this.navOffset;
      let newOffset = currentOffset;
      if (isHorizontal) {
        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
        }
      } else {
        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
        }
      }
      newOffset = Math.max(newOffset, 0);
      this.navOffset = Math.min(newOffset, maxOffset);
    },
    update() {
      if (!this.$refs.nav) return;
      const sizeName = this.sizeName;
      const navSize = this.$refs.nav[`offset${firstUpperCase(sizeName)}`];
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(sizeName)}`];
      const currentOffset = this.navOffset;
      if (containerSize < navSize) {
        const currentOffset2 = this.navOffset;
        this.scrollable = this.scrollable || {};
        this.scrollable.prev = currentOffset2;
        this.scrollable.next = currentOffset2 + containerSize < navSize;
        if (navSize - currentOffset2 < containerSize) {
          this.navOffset = navSize - containerSize;
        }
      } else {
        this.scrollable = false;
        if (currentOffset > 0) {
          this.navOffset = 0;
        }
      }
    },
    changeTab(e) {
      const keyCode = e.keyCode;
      let nextIndex;
      let currentIndex, tabList;
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        tabList = e.currentTarget.querySelectorAll("[role=tab]");
        currentIndex = Array.prototype.indexOf.call(tabList, e.target);
      } else {
        return;
      }
      if (keyCode === 37 || keyCode === 38) {
        if (currentIndex === 0) {
          nextIndex = tabList.length - 1;
        } else {
          nextIndex = currentIndex - 1;
        }
      } else {
        if (currentIndex < tabList.length - 1) {
          nextIndex = currentIndex + 1;
        } else {
          nextIndex = 0;
        }
      }
      tabList[nextIndex].focus();
      tabList[nextIndex].click();
      this.setFocus();
    },
    setFocus() {
      if (this.focusable) {
        this.isFocus = true;
      }
    },
    removeFocus() {
      this.isFocus = false;
    },
    visibilityChangeHandler() {
      const visibility = document.visibilityState;
      if (visibility === "hidden") {
        this.focusable = false;
      } else if (visibility === "visible") {
        setTimeout(() => {
          this.focusable = true;
        }, 50);
      }
    },
    windowBlurHandler() {
      this.focusable = false;
    },
    windowFocusHandler() {
      setTimeout(() => {
        this.focusable = true;
      }, 50);
    }
  },
  updated() {
    this.update();
  },
  render(h) {
    const {
      type,
      panes,
      editable,
      stretch,
      onTabClick,
      onTabRemove,
      navStyle,
      scrollable,
      scrollNext,
      scrollPrev,
      changeTab,
      setFocus,
      removeFocus
    } = this;
    const scrollBtn = scrollable ? [h("span", {
      "class": ["el-tabs__nav-prev", scrollable.prev ? "" : "is-disabled"],
      "on": {
        "click": scrollPrev
      }
    }, [h("i", {
      "class": "el-icon-arrow-left"
    })]), h("span", {
      "class": ["el-tabs__nav-next", scrollable.next ? "" : "is-disabled"],
      "on": {
        "click": scrollNext
      }
    }, [h("i", {
      "class": "el-icon-arrow-right"
    })])] : null;
    const tabs = this._l(panes, (pane, index) => {
      let tabName = pane.name || pane.index || index;
      const closable = pane.isClosable || editable;
      pane.index = `${index}`;
      const btnClose = closable ? h("span", {
        "class": "el-icon-close",
        "on": {
          "click": (ev) => {
            onTabRemove(pane, ev);
          }
        }
      }) : null;
      const tabLabelContent = pane.$slots.label || pane.label;
      const tabindex = pane.active ? 0 : -1;
      return h("div", {
        "class": {
          "el-tabs__item": true,
          [`is-${this.rootTabs.tabPosition}`]: true,
          "is-active": pane.active,
          "is-disabled": pane.disabled,
          "is-closable": closable,
          "is-focus": this.isFocus
        },
        "attrs": {
          "id": `tab-${tabName}`,
          "aria-controls": `pane-${tabName}`,
          "role": "tab",
          "aria-selected": pane.active,
          "tabindex": tabindex
        },
        "key": `tab-${tabName}`,
        "ref": "tabs",
        "refInFor": true,
        "on": {
          "focus": () => {
            setFocus();
          },
          "blur": () => {
            removeFocus();
          },
          "click": (ev) => {
            removeFocus();
            onTabClick(pane, tabName, ev);
          },
          "keydown": (ev) => {
            if (closable && (ev.keyCode === 46 || ev.keyCode === 8)) {
              onTabRemove(pane, ev);
            }
          }
        }
      }, [tabLabelContent, btnClose]);
    });
    return h("div", {
      "class": ["el-tabs__nav-wrap", scrollable ? "is-scrollable" : "", `is-${this.rootTabs.tabPosition}`]
    }, [scrollBtn, h("div", {
      "class": ["el-tabs__nav-scroll"],
      "ref": "navScroll"
    }, [h("div", {
      "class": ["el-tabs__nav", `is-${this.rootTabs.tabPosition}`, stretch && ["top", "bottom"].indexOf(this.rootTabs.tabPosition) !== -1 ? "is-stretch" : ""],
      "ref": "nav",
      "style": navStyle,
      "attrs": {
        "role": "tablist"
      },
      "on": {
        "keydown": changeTab
      }
    }, [!type ? h("tab-bar", {
      "attrs": {
        "tabs": panes
      }
    }) : null, tabs])])]);
  },
  mounted() {
    resizeEvent.addResizeListener(this.$el, this.update);
    document.addEventListener("visibilitychange", this.visibilityChangeHandler);
    window.addEventListener("blur", this.windowBlurHandler);
    window.addEventListener("focus", this.windowFocusHandler);
    setTimeout(() => {
      this.scrollToActiveTab();
    }, 0);
  },
  beforeDestroy() {
    if (this.$el && this.update) resizeEvent.removeResizeListener(this.$el, this.update);
    document.removeEventListener("visibilitychange", this.visibilityChangeHandler);
    window.removeEventListener("blur", this.windowBlurHandler);
    window.removeEventListener("focus", this.windowFocusHandler);
  }
};
const _sfc_render$1 = null;
const _sfc_staticRenderFns$1 = null;
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const TabNav = __component__$1.exports;
const _sfc_main = {
  name: "ElTabs",
  components: {
    TabNav
  },
  props: {
    type: String,
    activeName: String,
    closable: Boolean,
    addable: Boolean,
    value: {},
    editable: Boolean,
    tabPosition: {
      type: String,
      default: "top"
    },
    beforeLeave: Function,
    stretch: Boolean
  },
  provide() {
    return {
      rootTabs: this
    };
  },
  data() {
    return {
      currentName: this.value || this.activeName,
      panes: []
    };
  },
  watch: {
    activeName(value) {
      this.setCurrentName(value);
    },
    value(value) {
      this.setCurrentName(value);
    },
    currentName(value) {
      if (this.$refs.nav) {
        this.$nextTick(() => {
          this.$refs.nav.$nextTick((_) => {
            this.$refs.nav.scrollToActiveTab();
          });
        });
      }
    }
  },
  methods: {
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter((vnode) => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === "ElTabPane");
        const panes = paneSlots.map(({
          componentInstance
        }) => componentInstance);
        const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]));
        if (isForceUpdate || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return;
      this.setCurrentName(tabName);
      this.$emit("tab-click", tab, event);
    },
    handleTabRemove(pane, ev) {
      if (pane.disabled) return;
      ev.stopPropagation();
      this.$emit("edit", pane.name, "remove");
      this.$emit("tab-remove", pane.name);
    },
    handleTabAdd() {
      this.$emit("edit", null, "add");
      this.$emit("tab-add");
    },
    setCurrentName(value) {
      const changeCurrentName = () => {
        this.currentName = value;
        this.$emit("input", value);
      };
      if (this.currentName !== value && this.beforeLeave) {
        const before = this.beforeLeave(value, this.currentName);
        if (before && before.then) {
          before.then(() => {
            changeCurrentName();
            this.$refs.nav && this.$refs.nav.removeFocus();
          }, () => {
          });
        } else if (before !== false) {
          changeCurrentName();
        }
      } else {
        changeCurrentName();
      }
    }
  },
  render(h) {
    let {
      type,
      handleTabClick,
      handleTabRemove,
      handleTabAdd,
      currentName,
      panes,
      editable,
      addable,
      tabPosition,
      stretch
    } = this;
    const newButton = editable || addable ? h("span", {
      "class": "el-tabs__new-tab",
      "on": {
        "click": handleTabAdd,
        "keydown": (ev) => {
          if (ev.keyCode === 13) {
            handleTabAdd();
          }
        }
      },
      "attrs": {
        "tabindex": "0"
      }
    }, [h("i", {
      "class": "el-icon-plus"
    })]) : null;
    const navData = {
      props: {
        currentName,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        editable,
        type,
        panes,
        stretch
      },
      ref: "nav"
    };
    const header = h("div", {
      "class": ["el-tabs__header", `is-${tabPosition}`]
    }, [newButton, h("tab-nav", helper._mergeJSXProps2([{}, navData]))]);
    const panels = h("div", {
      "class": "el-tabs__content"
    }, [this.$slots.default]);
    return h("div", {
      "class": {
        "el-tabs": true,
        "el-tabs--card": type === "card",
        [`el-tabs--${tabPosition}`]: true,
        "el-tabs--border-card": type === "border-card"
      }
    }, [tabPosition !== "bottom" ? [header, panels] : [panels, header]]);
  },
  created() {
    if (!this.currentName) {
      this.setCurrentName("0");
    }
    this.$on("tab-nav-update", this.calcPaneInstances.bind(null, true));
  },
  mounted() {
    this.calcPaneInstances();
  },
  updated() {
    this.calcPaneInstances();
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
const ElTabs = __component__.exports;
const _ElTabs = ElTabs;
_ElTabs.install = function install(Vue) {
  Vue.component(_ElTabs.name, _ElTabs);
};
module.exports = _ElTabs;
