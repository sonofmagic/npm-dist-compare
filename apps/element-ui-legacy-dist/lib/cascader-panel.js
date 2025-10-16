import { _ as _mergeJSXProps2 } from "./helper-BAtyFj_W.js";
import "vue";
import ElScrollbar from "element-ui/lib/scrollbar";
import ElCheckbox from "element-ui/lib/checkbox";
import ElRadio from "element-ui/lib/radio";
import { isEqual, generateId, capitalize, coerceTruthyValueToArray, valueEquals, isEmpty, noop } from "element-ui/lib/utils/util";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
import Locale from "element-ui/lib/mixins/locale";
import { isDef } from "element-ui/lib/utils/shared";
import merge from "element-ui/lib/utils/merge";
import AriaUtils from "element-ui/lib/utils/aria-utils";
import scrollIntoView from "element-ui/lib/utils/scroll-into-view";
const stopPropagation = (e) => e.stopPropagation();
const _sfc_main$2 = {
  inject: ["panel"],
  components: {
    ElCheckbox,
    ElRadio
  },
  props: {
    node: {
      required: true
    },
    nodeId: String
  },
  computed: {
    config() {
      return this.panel.config;
    },
    isLeaf() {
      return this.node.isLeaf;
    },
    isDisabled() {
      return this.node.isDisabled;
    },
    checkedValue() {
      return this.panel.checkedValue;
    },
    isChecked() {
      return this.node.isSameNode(this.checkedValue);
    },
    inActivePath() {
      return this.isInPath(this.panel.activePath);
    },
    inCheckedPath() {
      if (!this.config.checkStrictly) return false;
      return this.panel.checkedNodePaths.some((checkedPath) => this.isInPath(checkedPath));
    },
    value() {
      return this.node.getValueByOption();
    }
  },
  methods: {
    handleExpand() {
      const {
        panel,
        node,
        isDisabled,
        config
      } = this;
      const {
        multiple,
        checkStrictly
      } = config;
      if (!checkStrictly && isDisabled || node.loading) return;
      if (config.lazy && !node.loaded) {
        panel.lazyLoad(node, () => {
          const {
            isLeaf: isLeaf2
          } = this;
          if (!isLeaf2) this.handleExpand();
          if (multiple) {
            const checked = isLeaf2 ? node.checked : false;
            this.handleMultiCheckChange(checked);
          }
        });
      } else {
        panel.handleExpand(node);
      }
    },
    handleCheckChange() {
      const {
        panel,
        value,
        node
      } = this;
      panel.handleCheckChange(value);
      panel.handleExpand(node);
    },
    handleMultiCheckChange(checked) {
      this.node.doCheck(checked);
      this.panel.calculateMultiCheckedValue();
    },
    isInPath(pathNodes) {
      const {
        node
      } = this;
      const selectedPathNode = pathNodes[node.level - 1] || {};
      return selectedPathNode.uid === node.uid;
    },
    renderPrefix(h) {
      const {
        isLeaf: isLeaf2,
        isChecked,
        config
      } = this;
      const {
        checkStrictly,
        multiple
      } = config;
      if (multiple) {
        return this.renderCheckbox(h);
      } else if (checkStrictly) {
        return this.renderRadio(h);
      } else if (isLeaf2 && isChecked) {
        return this.renderCheckIcon(h);
      }
      return null;
    },
    renderPostfix(h) {
      const {
        node,
        isLeaf: isLeaf2
      } = this;
      if (node.loading) {
        return this.renderLoadingIcon(h);
      } else if (!isLeaf2) {
        return this.renderExpandIcon(h);
      }
      return null;
    },
    renderCheckbox(h) {
      const {
        node,
        config,
        isDisabled
      } = this;
      const events = {
        on: {
          change: this.handleMultiCheckChange
        },
        nativeOn: {}
      };
      if (config.checkStrictly) {
        events.nativeOn.click = stopPropagation;
      }
      return h("el-checkbox", _mergeJSXProps2([{
        "attrs": {
          "value": node.checked,
          "indeterminate": node.indeterminate,
          "disabled": isDisabled
        }
      }, events]));
    },
    renderRadio(h) {
      let {
        checkedValue,
        value,
        isDisabled
      } = this;
      if (isEqual(value, checkedValue)) {
        value = checkedValue;
      }
      return h("el-radio", {
        "attrs": {
          "value": checkedValue,
          "label": value,
          "disabled": isDisabled
        },
        "on": {
          "change": this.handleCheckChange
        },
        "nativeOn": {
          "click": stopPropagation
        }
      }, [h("span")]);
    },
    renderCheckIcon(h) {
      return h("i", {
        "class": "el-icon-check el-cascader-node__prefix"
      });
    },
    renderLoadingIcon(h) {
      return h("i", {
        "class": "el-icon-loading el-cascader-node__postfix"
      });
    },
    renderExpandIcon(h) {
      return h("i", {
        "class": "el-icon-arrow-right el-cascader-node__postfix"
      });
    },
    renderContent(h) {
      const {
        panel,
        node
      } = this;
      const render2 = panel.renderLabelFn;
      const vnode = render2 ? render2({
        node,
        data: node.data
      }) : null;
      return h("span", {
        "class": "el-cascader-node__label"
      }, [vnode || node.label]);
    }
  },
  render(h) {
    const {
      inActivePath,
      inCheckedPath,
      isChecked,
      isLeaf: isLeaf2,
      isDisabled,
      config,
      nodeId
    } = this;
    const {
      expandTrigger,
      checkStrictly,
      multiple
    } = config;
    const disabled = !checkStrictly && isDisabled;
    const events = {
      on: {}
    };
    if (expandTrigger === "click") {
      events.on.click = this.handleExpand;
    } else {
      events.on.mouseenter = (e) => {
        this.handleExpand();
        this.$emit("expand", e);
      };
      events.on.focus = (e) => {
        this.handleExpand();
        this.$emit("expand", e);
      };
    }
    if (isLeaf2 && !isDisabled && !checkStrictly && !multiple) {
      events.on.click = this.handleCheckChange;
    }
    return h("li", _mergeJSXProps2([{
      "attrs": {
        "role": "menuitem",
        "id": nodeId,
        "aria-expanded": inActivePath,
        "tabindex": disabled ? null : -1
      },
      "class": {
        "el-cascader-node": true,
        "is-selectable": checkStrictly,
        "in-active-path": inActivePath,
        "in-checked-path": inCheckedPath,
        "is-active": isChecked,
        "is-disabled": disabled
      }
    }, events]), [this.renderPrefix(h), this.renderContent(h), this.renderPostfix(h)]);
  }
};
const _sfc_render$2 = null;
const _sfc_staticRenderFns$2 = null;
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false
);
const CascaderNode = __component__$2.exports;
const _sfc_main$1 = {
  name: "ElCascaderMenu",
  mixins: [Locale],
  inject: ["panel"],
  components: {
    ElScrollbar,
    CascaderNode
  },
  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: Number
  },
  data() {
    return {
      activeNode: null,
      hoverTimer: null,
      id: generateId()
    };
  },
  computed: {
    isEmpty() {
      return !this.nodes.length;
    },
    menuId() {
      return `cascader-menu-${this.id}-${this.index}`;
    }
  },
  methods: {
    handleExpand(e) {
      this.activeNode = e.target;
    },
    handleMouseMove(e) {
      const {
        activeNode,
        hoverTimer
      } = this;
      const {
        hoverZone
      } = this.$refs;
      if (!activeNode || !hoverZone) return;
      if (activeNode.contains(e.target)) {
        clearTimeout(hoverTimer);
        const {
          left
        } = this.$el.getBoundingClientRect();
        const startX = e.clientX - left;
        const {
          offsetWidth,
          offsetHeight
        } = this.$el;
        const top = activeNode.offsetTop;
        const bottom = top + activeNode.offsetHeight;
        hoverZone.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
        `;
      } else if (!hoverTimer) {
        this.hoverTimer = setTimeout(this.clearHoverZone, this.panel.config.hoverThreshold);
      }
    },
    clearHoverZone() {
      const {
        hoverZone
      } = this.$refs;
      if (!hoverZone) return;
      hoverZone.innerHTML = "";
    },
    renderEmptyText(h) {
      return h("div", {
        "class": "el-cascader-menu__empty-text"
      }, [this.t("el.cascader.noData")]);
    },
    renderNodeList(h) {
      const {
        menuId
      } = this;
      const {
        isHoverMenu
      } = this.panel;
      const events = {
        on: {}
      };
      if (isHoverMenu) {
        events.on.expand = this.handleExpand;
      }
      const nodes = this.nodes.map((node, index) => {
        const {
          hasChildren
        } = node;
        return h("cascader-node", _mergeJSXProps2([{
          "key": node.uid,
          "attrs": {
            "node": node,
            "node-id": `${menuId}-${index}`,
            "aria-haspopup": hasChildren,
            "aria-owns": hasChildren ? menuId : null
          }
        }, events]));
      });
      return [...nodes, isHoverMenu ? h("svg", {
        "ref": "hoverZone",
        "class": "el-cascader-menu__hover-zone"
      }) : null];
    }
  },
  render(h) {
    const {
      isEmpty: isEmpty2,
      menuId
    } = this;
    const events = {
      nativeOn: {}
    };
    if (this.panel.isHoverMenu) {
      events.nativeOn.mousemove = this.handleMouseMove;
    }
    return h("el-scrollbar", _mergeJSXProps2([{
      "attrs": {
        "tag": "ul",
        "role": "menu",
        "id": menuId,
        "wrap-class": "el-cascader-menu__wrap",
        "view-class": {
          "el-cascader-menu__list": true,
          "is-empty": isEmpty2
        }
      },
      "class": "el-cascader-menu"
    }, events]), [isEmpty2 ? this.renderEmptyText(h) : this.renderNodeList(h)]);
  }
};
const _sfc_render$1 = null;
const _sfc_staticRenderFns$1 = null;
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const CascaderMenu = __component__$1.exports;
let uid = 0;
class Node {
  constructor(data, config, parentNode) {
    this.data = data;
    this.config = config;
    this.parent = parentNode || null;
    this.level = !this.parent ? 1 : this.parent.level + 1;
    this.uid = uid++;
    this.initState();
    this.initChildren();
  }
  initState() {
    const { value: valueKey, label: labelKey } = this.config;
    this.value = this.data[valueKey];
    this.label = this.data[labelKey];
    this.pathNodes = this.calculatePathNodes();
    this.path = this.pathNodes.map((node) => node.value);
    this.pathLabels = this.pathNodes.map((node) => node.label);
    this.loading = false;
    this.loaded = false;
  }
  initChildren() {
    const { config } = this;
    const childrenKey = config.children;
    const childrenData = this.data[childrenKey];
    this.hasChildren = Array.isArray(childrenData);
    this.children = (childrenData || []).map((child) => new Node(child, config, this));
  }
  get isDisabled() {
    const { data, parent, config } = this;
    const disabledKey = config.disabled;
    const { checkStrictly } = config;
    return data[disabledKey] || !checkStrictly && parent && parent.isDisabled;
  }
  get isLeaf() {
    const { data, loaded, hasChildren, children } = this;
    const { lazy, leaf: leafKey } = this.config;
    if (lazy) {
      const isLeaf2 = isDef(data[leafKey]) ? data[leafKey] : loaded ? !children.length : false;
      this.hasChildren = !isLeaf2;
      return isLeaf2;
    }
    return !hasChildren;
  }
  calculatePathNodes() {
    const nodes = [this];
    let parent = this.parent;
    while (parent) {
      nodes.unshift(parent);
      parent = parent.parent;
    }
    return nodes;
  }
  getPath() {
    return this.path;
  }
  getValue() {
    return this.value;
  }
  getValueByOption() {
    return this.config.emitPath ? this.getPath() : this.getValue();
  }
  getText(allLevels, separator) {
    return allLevels ? this.pathLabels.join(separator) : this.label;
  }
  isSameNode(checkedValue) {
    const value = this.getValueByOption();
    return this.config.multiple && Array.isArray(checkedValue) ? checkedValue.some((val) => isEqual(val, value)) : isEqual(checkedValue, value);
  }
  broadcast(event, ...args) {
    const handlerName = `onParent${capitalize(event)}`;
    this.children.forEach((child) => {
      if (child) {
        child.broadcast(event, ...args);
        child[handlerName] && child[handlerName](...args);
      }
    });
  }
  emit(event, ...args) {
    const { parent } = this;
    const handlerName = `onChild${capitalize(event)}`;
    if (parent) {
      parent[handlerName] && parent[handlerName](...args);
      parent.emit(event, ...args);
    }
  }
  onParentCheck(checked) {
    if (!this.isDisabled) {
      this.setCheckState(checked);
    }
  }
  onChildCheck() {
    const { children } = this;
    const validChildren = children.filter((child) => !child.isDisabled);
    const checked = validChildren.length ? validChildren.every((child) => child.checked) : false;
    this.setCheckState(checked);
  }
  setCheckState(checked) {
    const totalNum = this.children.length;
    const checkedNum = this.children.reduce((c, p) => {
      const num = p.checked ? 1 : p.indeterminate ? 0.5 : 0;
      return c + num;
    }, 0);
    this.checked = checked;
    this.indeterminate = checkedNum !== totalNum && checkedNum > 0;
  }
  syncCheckState(checkedValue) {
    const value = this.getValueByOption();
    const checked = this.isSameNode(checkedValue, value);
    this.doCheck(checked);
  }
  doCheck(checked) {
    if (this.checked !== checked) {
      if (this.config.checkStrictly) {
        this.checked = checked;
      } else {
        this.broadcast("check", checked);
        this.setCheckState(checked);
        this.emit("check");
      }
    }
  }
}
const flatNodes = (data, leafOnly) => {
  return data.reduce((res, node) => {
    if (node.isLeaf) {
      res.push(node);
    } else {
      !leafOnly && res.push(node);
      res = res.concat(flatNodes(node.children, leafOnly));
    }
    return res;
  }, []);
};
class Store {
  constructor(data, config) {
    this.config = config;
    this.initNodes(data);
  }
  initNodes(data) {
    data = coerceTruthyValueToArray(data);
    this.nodes = data.map((nodeData) => new Node(nodeData, this.config));
    this.flattedNodes = this.getFlattedNodes(false, false);
    this.leafNodes = this.getFlattedNodes(true, false);
  }
  appendNode(nodeData, parentNode) {
    const node = new Node(nodeData, this.config, parentNode);
    const children = parentNode ? parentNode.children : this.nodes;
    children.push(node);
  }
  appendNodes(nodeDataList, parentNode) {
    nodeDataList = coerceTruthyValueToArray(nodeDataList);
    nodeDataList.forEach((nodeData) => this.appendNode(nodeData, parentNode));
  }
  getNodes() {
    return this.nodes;
  }
  getFlattedNodes(leafOnly, cached = true) {
    const cachedNodes = leafOnly ? this.leafNodes : this.flattedNodes;
    return cached ? cachedNodes : flatNodes(this.nodes, leafOnly);
  }
  getNodeByValue(value) {
    const nodes = this.getFlattedNodes(false, !this.config.lazy).filter((node) => valueEquals(node.path, value) || node.value === value);
    return nodes && nodes.length ? nodes[0] : null;
  }
}
const { keys: KeyCode } = AriaUtils;
const DefaultProps = {
  expandTrigger: "click",
  // or hover
  multiple: false,
  checkStrictly: false,
  // whether all nodes can be selected
  emitPath: true,
  // wether to emit an array of all levels value in which node is located
  lazy: false,
  lazyLoad: noop,
  value: "value",
  label: "label",
  children: "children",
  leaf: "leaf",
  disabled: "disabled",
  hoverThreshold: 500
};
const isLeaf = (el) => !el.getAttribute("aria-owns");
const getSibling = (el, distance) => {
  const { parentNode } = el;
  if (parentNode) {
    const siblings = parentNode.querySelectorAll('.el-cascader-node[tabindex="-1"]');
    const index = Array.prototype.indexOf.call(siblings, el);
    return siblings[index + distance] || null;
  }
  return null;
};
const getMenuIndex = (el, distance) => {
  if (!el) return;
  const pieces = el.id.split("-");
  return Number(pieces[pieces.length - 2]);
};
const focusNode = (el) => {
  if (!el) return;
  el.focus();
  !isLeaf(el) && el.click();
};
const checkNode = (el) => {
  if (!el) return;
  const input = el.querySelector("input");
  if (input) {
    input.click();
  } else if (isLeaf(el)) {
    el.click();
  }
};
const _sfc_main = {
  name: "ElCascaderPanel",
  components: {
    CascaderMenu
  },
  props: {
    value: {},
    options: Array,
    props: Object,
    border: {
      type: Boolean,
      default: true
    },
    renderLabel: Function
  },
  provide() {
    return {
      panel: this
    };
  },
  data() {
    return {
      checkedValue: null,
      checkedNodePaths: [],
      store: [],
      menus: [],
      activePath: [],
      loadCount: 0
    };
  },
  computed: {
    config() {
      return merge({ ...DefaultProps }, this.props || {});
    },
    multiple() {
      return this.config.multiple;
    },
    checkStrictly() {
      return this.config.checkStrictly;
    },
    leafOnly() {
      return !this.checkStrictly;
    },
    isHoverMenu() {
      return this.config.expandTrigger === "hover";
    },
    renderLabelFn() {
      return this.renderLabel || this.$scopedSlots.default;
    }
  },
  watch: {
    value() {
      this.syncCheckedValue();
      this.checkStrictly && this.calculateCheckedNodePaths();
    },
    options: {
      handler: function() {
        this.initStore();
      },
      immediate: true,
      deep: true
    },
    checkedValue(val) {
      if (!isEqual(val, this.value)) {
        this.checkStrictly && this.calculateCheckedNodePaths();
        this.$emit("input", val);
        this.$emit("change", val);
      }
    }
  },
  mounted() {
    if (!this.isEmptyValue(this.value)) {
      this.syncCheckedValue();
    }
  },
  methods: {
    initStore() {
      const { config, options } = this;
      if (config.lazy && isEmpty(options)) {
        this.lazyLoad();
      } else {
        this.store = new Store(options, config);
        this.menus = [this.store.getNodes()];
        this.syncMenuState();
      }
    },
    syncCheckedValue() {
      const { value, checkedValue } = this;
      if (!isEqual(value, checkedValue)) {
        this.activePath = [];
        this.checkedValue = value;
        this.syncMenuState();
      }
    },
    syncMenuState() {
      const { multiple, checkStrictly } = this;
      this.syncActivePath();
      multiple && this.syncMultiCheckState();
      checkStrictly && this.calculateCheckedNodePaths();
      this.$nextTick(this.scrollIntoView);
    },
    syncMultiCheckState() {
      const nodes = this.getFlattedNodes(this.leafOnly);
      nodes.forEach((node) => {
        node.syncCheckState(this.checkedValue);
      });
    },
    isEmptyValue(val) {
      const { multiple, config } = this;
      const { emitPath } = config;
      if (multiple || emitPath) {
        return isEmpty(val);
      }
      return false;
    },
    syncActivePath() {
      const { store, multiple, activePath, checkedValue } = this;
      if (!isEmpty(activePath)) {
        const nodes = activePath.map((node) => this.getNodeByValue(node.getValue()));
        this.expandNodes(nodes);
      } else if (!this.isEmptyValue(checkedValue)) {
        const value = multiple ? checkedValue[0] : checkedValue;
        const checkedNode = this.getNodeByValue(value) || {};
        const nodes = (checkedNode.pathNodes || []).slice(0, -1);
        this.expandNodes(nodes);
      } else {
        this.activePath = [];
        this.menus = [store.getNodes()];
      }
    },
    expandNodes(nodes) {
      nodes.forEach((node) => this.handleExpand(
        node,
        true
        /* silent */
      ));
    },
    calculateCheckedNodePaths() {
      const { checkedValue, multiple } = this;
      const checkedValues = multiple ? coerceTruthyValueToArray(checkedValue) : [checkedValue];
      this.checkedNodePaths = checkedValues.map((v) => {
        const checkedNode = this.getNodeByValue(v);
        return checkedNode ? checkedNode.pathNodes : [];
      });
    },
    handleKeyDown(e) {
      const { target, keyCode } = e;
      switch (keyCode) {
        case KeyCode.up:
          const prev = getSibling(target, -1);
          focusNode(prev);
          break;
        case KeyCode.down:
          const next = getSibling(target, 1);
          focusNode(next);
          break;
        case KeyCode.left:
          const preMenu = this.$refs.menu[getMenuIndex(target) - 1];
          if (preMenu) {
            const expandedNode = preMenu.$el.querySelector('.el-cascader-node[aria-expanded="true"]');
            focusNode(expandedNode);
          }
          break;
        case KeyCode.right:
          const nextMenu = this.$refs.menu[getMenuIndex(target) + 1];
          if (nextMenu) {
            const firstNode = nextMenu.$el.querySelector('.el-cascader-node[tabindex="-1"]');
            focusNode(firstNode);
          }
          break;
        case KeyCode.enter:
          checkNode(target);
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.$emit("close");
          break;
        default:
          return;
      }
    },
    handleExpand(node, silent) {
      const { activePath } = this;
      const { level } = node;
      const path = activePath.slice(0, level - 1);
      const menus = this.menus.slice(0, level);
      if (!node.isLeaf) {
        path.push(node);
        menus.push(node.children);
      }
      this.activePath = path;
      this.menus = menus;
      if (!silent) {
        const pathValues = path.map((node2) => node2.getValue());
        const activePathValues = activePath.map((node2) => node2.getValue());
        if (!valueEquals(pathValues, activePathValues)) {
          this.$emit("active-item-change", pathValues);
          this.$emit("expand-change", pathValues);
        }
      }
    },
    handleCheckChange(value) {
      this.checkedValue = value;
    },
    lazyLoad(node, onFullfiled) {
      const { config } = this;
      if (!node) {
        node = node || { root: true, level: 0 };
        this.store = new Store([], config);
        this.menus = [this.store.getNodes()];
      }
      node.loading = true;
      const resolve = (dataList) => {
        const parent = node.root ? null : node;
        dataList && dataList.length && this.store.appendNodes(dataList, parent);
        node.loading = false;
        node.loaded = true;
        if (Array.isArray(this.checkedValue)) {
          const nodeValue = this.checkedValue[this.loadCount++];
          const valueKey = this.config.value;
          const leafKey = this.config.leaf;
          if (Array.isArray(dataList) && dataList.filter((item) => item[valueKey] === nodeValue).length > 0) {
            const checkedNode = this.store.getNodeByValue(nodeValue);
            if (!checkedNode.data[leafKey]) {
              this.lazyLoad(checkedNode, () => {
                this.handleExpand(checkedNode);
              });
            }
            if (this.loadCount === this.checkedValue.length) {
              this.$parent.computePresentText();
            }
          }
        }
        onFullfiled && onFullfiled(dataList);
      };
      config.lazyLoad(node, resolve);
    },
    /**
     * public methods
    */
    calculateMultiCheckedValue() {
      this.checkedValue = this.getCheckedNodes(this.leafOnly).map((node) => node.getValueByOption());
    },
    scrollIntoView() {
      if (this.$isServer) return;
      const menus = this.$refs.menu || [];
      menus.forEach((menu) => {
        const menuElement = menu.$el;
        if (menuElement) {
          const container = menuElement.querySelector(".el-scrollbar__wrap");
          const activeNode = menuElement.querySelector(".el-cascader-node.is-active") || menuElement.querySelector(".el-cascader-node.in-active-path");
          scrollIntoView(container, activeNode);
        }
      });
    },
    getNodeByValue(val) {
      return this.store.getNodeByValue(val);
    },
    getFlattedNodes(leafOnly) {
      const cached = !this.config.lazy;
      return this.store.getFlattedNodes(leafOnly, cached);
    },
    getCheckedNodes(leafOnly) {
      const { checkedValue, multiple } = this;
      if (multiple) {
        const nodes = this.getFlattedNodes(leafOnly);
        return nodes.filter((node) => node.checked);
      } else {
        return this.isEmptyValue(checkedValue) ? [] : [this.getNodeByValue(checkedValue)];
      }
    },
    clearCheckedNodes() {
      const { config, leafOnly } = this;
      const { multiple, emitPath } = config;
      if (multiple) {
        this.getCheckedNodes(leafOnly).filter((node) => !node.isDisabled).forEach((node) => node.doCheck(false));
        this.calculateMultiCheckedValue();
      } else {
        this.checkedValue = emitPath ? [] : null;
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { class: [
    "el-cascader-panel",
    _vm.border && "is-bordered"
  ], on: { "keydown": _vm.handleKeyDown } }, _vm._l(_vm.menus, function(menu, index) {
    return _c("cascader-menu", { key: index, ref: "menu", refInFor: true, attrs: { "index": index, "nodes": menu } });
  }), 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const CascaderPanel = __component__.exports;
CascaderPanel.install = function(Vue) {
  Vue.component(CascaderPanel.name, CascaderPanel);
};
export {
  CascaderPanel as default
};
