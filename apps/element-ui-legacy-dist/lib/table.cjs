"use strict";
const ElCheckbox = require("element-ui/lib/checkbox");
const index = require("./index-Cf0anSwe.cjs");
const resizeEvent = require("element-ui/lib/utils/resize-event");
const _commonjsHelpers = require("./_commonjsHelpers-DHfMLFPC.cjs");
const Locale = require("element-ui/lib/mixins/locale");
const Migrating = require("element-ui/lib/mixins/migrating");
const Vue = require("vue");
const merge = require("element-ui/lib/utils/merge");
const util = require("./util-wNQ4L80Y.cjs");
const util$1 = require("element-ui/lib/utils/util");
const scrollbarWidth = require("element-ui/lib/utils/scrollbar-width");
const dom = require("element-ui/lib/utils/dom");
const ElTooltip = require("element-ui/lib/tooltip");
const Popper = require("element-ui/lib/utils/vue-popper");
const Popup = require("element-ui/lib/utils/popup");
const Clickoutside = require("element-ui/lib/utils/clickoutside");
const ElCheckboxGroup = require("element-ui/lib/checkbox-group");
const ElScrollbar = require("element-ui/lib/scrollbar");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
var UserAgent_DEPRECATED_1;
var hasRequiredUserAgent_DEPRECATED;
function requireUserAgent_DEPRECATED() {
  if (hasRequiredUserAgent_DEPRECATED) return UserAgent_DEPRECATED_1;
  hasRequiredUserAgent_DEPRECATED = 1;
  var _populated = false;
  var _ie, _firefox, _opera, _webkit, _chrome;
  var _ie_real_version;
  var _osx, _windows, _linux, _android;
  var _win64;
  var _iphone, _ipad, _native;
  var _mobile;
  function _populate() {
    if (_populated) {
      return;
    }
    _populated = true;
    var uas = navigator.userAgent;
    var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
    var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);
    _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
    _ipad = /\b(iP[ao]d)/.exec(uas);
    _android = /Android/i.exec(uas);
    _native = /FBAN\/\w+;/i.exec(uas);
    _mobile = /Mobile/i.exec(uas);
    _win64 = !!/Win64/.exec(uas);
    if (agent) {
      _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN;
      if (_ie && document && document.documentMode) {
        _ie = document.documentMode;
      }
      var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
      _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;
      _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
      _opera = agent[3] ? parseFloat(agent[3]) : NaN;
      _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
      if (_webkit) {
        agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
        _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
      } else {
        _chrome = NaN;
      }
    } else {
      _ie = _firefox = _opera = _chrome = _webkit = NaN;
    }
    if (os) {
      if (os[1]) {
        var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
        _osx = ver ? parseFloat(ver[1].replace("_", ".")) : true;
      } else {
        _osx = false;
      }
      _windows = !!os[2];
      _linux = !!os[3];
    } else {
      _osx = _windows = _linux = false;
    }
  }
  var UserAgent_DEPRECATED = {
    /**
     *  Check if the UA is Internet Explorer.
     *
     *
     *  @return float|NaN Version number (if match) or NaN.
     */
    ie: function() {
      return _populate() || _ie;
    },
    /**
     * Check if we're in Internet Explorer compatibility mode.
     *
     * @return bool true if in compatibility mode, false if
     * not compatibility mode or not ie
     */
    ieCompatibilityMode: function() {
      return _populate() || _ie_real_version > _ie;
    },
    /**
     * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
     * only need this because Skype can't handle 64-bit IE yet.  We need to remove
     * this when we don't need it -- tracked by #601957.
     */
    ie64: function() {
      return UserAgent_DEPRECATED.ie() && _win64;
    },
    /**
     *  Check if the UA is Firefox.
     *
     *
     *  @return float|NaN Version number (if match) or NaN.
     */
    firefox: function() {
      return _populate() || _firefox;
    },
    /**
     *  Check if the UA is Opera.
     *
     *
     *  @return float|NaN Version number (if match) or NaN.
     */
    opera: function() {
      return _populate() || _opera;
    },
    /**
     *  Check if the UA is WebKit.
     *
     *
     *  @return float|NaN Version number (if match) or NaN.
     */
    webkit: function() {
      return _populate() || _webkit;
    },
    /**
     *  For Push
     *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
     */
    safari: function() {
      return UserAgent_DEPRECATED.webkit();
    },
    /**
     *  Check if the UA is a Chrome browser.
     *
     *
     *  @return float|NaN Version number (if match) or NaN.
     */
    chrome: function() {
      return _populate() || _chrome;
    },
    /**
     *  Check if the user is running Windows.
     *
     *  @return bool `true' if the user's OS is Windows.
     */
    windows: function() {
      return _populate() || _windows;
    },
    /**
     *  Check if the user is running Mac OS X.
     *
     *  @return float|bool   Returns a float if a version number is detected,
     *                       otherwise true/false.
     */
    osx: function() {
      return _populate() || _osx;
    },
    /**
     * Check if the user is running Linux.
     *
     * @return bool `true' if the user's OS is some flavor of Linux.
     */
    linux: function() {
      return _populate() || _linux;
    },
    /**
     * Check if the user is running on an iPhone or iPod platform.
     *
     * @return bool `true' if the user is running some flavor of the
     *    iPhone OS.
     */
    iphone: function() {
      return _populate() || _iphone;
    },
    mobile: function() {
      return _populate() || (_iphone || _ipad || _android || _mobile);
    },
    nativeApp: function() {
      return _populate() || _native;
    },
    android: function() {
      return _populate() || _android;
    },
    ipad: function() {
      return _populate() || _ipad;
    }
  };
  UserAgent_DEPRECATED_1 = UserAgent_DEPRECATED;
  return UserAgent_DEPRECATED_1;
}
var ExecutionEnvironment_1;
var hasRequiredExecutionEnvironment;
function requireExecutionEnvironment() {
  if (hasRequiredExecutionEnvironment) return ExecutionEnvironment_1;
  hasRequiredExecutionEnvironment = 1;
  var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  var ExecutionEnvironment = {
    canUseDOM,
    canUseWorkers: typeof Worker !== "undefined",
    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM
    // For now, this is true - might change in the future.
  };
  ExecutionEnvironment_1 = ExecutionEnvironment;
  return ExecutionEnvironment_1;
}
var isEventSupported_1;
var hasRequiredIsEventSupported;
function requireIsEventSupported() {
  if (hasRequiredIsEventSupported) return isEventSupported_1;
  hasRequiredIsEventSupported = 1;
  var ExecutionEnvironment = requireExecutionEnvironment();
  var useHasFeature;
  if (ExecutionEnvironment.canUseDOM) {
    useHasFeature = document.implementation && document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    document.implementation.hasFeature("", "") !== true;
  }
  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */
  function isEventSupported(eventNameSuffix, capture) {
    if (!ExecutionEnvironment.canUseDOM || capture && !("addEventListener" in document)) {
      return false;
    }
    var eventName = "on" + eventNameSuffix;
    var isSupported = eventName in document;
    if (!isSupported) {
      var element = document.createElement("div");
      element.setAttribute(eventName, "return;");
      isSupported = typeof element[eventName] === "function";
    }
    if (!isSupported && useHasFeature && eventNameSuffix === "wheel") {
      isSupported = document.implementation.hasFeature("Events.wheel", "3.0");
    }
    return isSupported;
  }
  isEventSupported_1 = isEventSupported;
  return isEventSupported_1;
}
var normalizeWheel_1;
var hasRequiredNormalizeWheel$1;
function requireNormalizeWheel$1() {
  if (hasRequiredNormalizeWheel$1) return normalizeWheel_1;
  hasRequiredNormalizeWheel$1 = 1;
  var UserAgent_DEPRECATED = requireUserAgent_DEPRECATED();
  var isEventSupported = requireIsEventSupported();
  var PIXEL_STEP = 10;
  var LINE_HEIGHT = 40;
  var PAGE_HEIGHT = 800;
  function normalizeWheel2(event) {
    var sX = 0, sY = 0, pX = 0, pY = 0;
    if ("detail" in event) {
      sY = event.detail;
    }
    if ("wheelDelta" in event) {
      sY = -event.wheelDelta / 120;
    }
    if ("wheelDeltaY" in event) {
      sY = -event.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in event) {
      sX = -event.wheelDeltaX / 120;
    }
    if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ("deltaY" in event) {
      pY = event.deltaY;
    }
    if ("deltaX" in event) {
      pX = event.deltaX;
    }
    if ((pX || pY) && event.deltaMode) {
      if (event.deltaMode == 1) {
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }
  normalizeWheel2.getEventType = function() {
    return UserAgent_DEPRECATED.firefox() ? "DOMMouseScroll" : isEventSupported("wheel") ? "wheel" : "mousewheel";
  };
  normalizeWheel_1 = normalizeWheel2;
  return normalizeWheel_1;
}
var normalizeWheel$1;
var hasRequiredNormalizeWheel;
function requireNormalizeWheel() {
  if (hasRequiredNormalizeWheel) return normalizeWheel$1;
  hasRequiredNormalizeWheel = 1;
  normalizeWheel$1 = requireNormalizeWheel$1();
  return normalizeWheel$1;
}
var normalizeWheelExports = requireNormalizeWheel();
const normalizeWheel = /* @__PURE__ */ _commonjsHelpers.getDefaultExportFromCjs(normalizeWheelExports);
const isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const mousewheel = function(element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? "DOMMouseScroll" : "mousewheel", function(event) {
      const normalized = normalizeWheel(event);
      callback && callback.apply(this, [event, normalized]);
    });
  }
};
const Mousewheel = {
  bind(el, binding) {
    mousewheel(el, binding.value);
  }
};
const expand = {
  data() {
    return {
      states: {
        defaultExpandAll: false,
        expandRows: []
      }
    };
  },
  methods: {
    updateExpandRows() {
      const { data = [], rowKey, defaultExpandAll, expandRows } = this.states;
      if (defaultExpandAll) {
        this.states.expandRows = data.slice();
      } else if (rowKey) {
        const expandRowsMap = util.getKeysMap(expandRows, rowKey);
        this.states.expandRows = data.reduce((prev, row) => {
          const rowId = util.getRowIdentity(row, rowKey);
          const rowInfo = expandRowsMap[rowId];
          if (rowInfo) {
            prev.push(row);
          }
          return prev;
        }, []);
      } else {
        this.states.expandRows = [];
      }
    },
    toggleRowExpansion(row, expanded) {
      const changed = util.toggleRowStatus(this.states.expandRows, row, expanded);
      if (changed) {
        this.table.$emit("expand-change", row, this.states.expandRows.slice());
        this.scheduleLayout();
      }
    },
    setExpandRowKeys(rowKeys) {
      this.assertRowKey();
      const { data, rowKey } = this.states;
      const keysMap = util.getKeysMap(data, rowKey);
      this.states.expandRows = rowKeys.reduce((prev, cur) => {
        const info = keysMap[cur];
        if (info) {
          prev.push(info.row);
        }
        return prev;
      }, []);
    },
    isRowExpanded(row) {
      const { expandRows = [], rowKey } = this.states;
      if (rowKey) {
        const expandMap = util.getKeysMap(expandRows, rowKey);
        return !!expandMap[util.getRowIdentity(row, rowKey)];
      }
      return expandRows.indexOf(row) !== -1;
    }
  }
};
const current = {
  data() {
    return {
      states: {
        // 不可响应的，设置 currentRowKey 时，data 不一定存在，也许无法算出正确的 currentRow
        // 把该值缓存一下，当用户点击修改 currentRow 时，把该值重置为 null
        _currentRowKey: null,
        currentRow: null
      }
    };
  },
  methods: {
    setCurrentRowKey(key) {
      this.assertRowKey();
      this.states._currentRowKey = key;
      this.setCurrentRowByKey(key);
    },
    restoreCurrentRowKey() {
      this.states._currentRowKey = null;
    },
    setCurrentRowByKey(key) {
      const { states } = this;
      const { data = [], rowKey } = states;
      let currentRow = null;
      if (rowKey) {
        currentRow = util$1.arrayFind(data, (item) => util.getRowIdentity(item, rowKey) === key);
      }
      states.currentRow = currentRow;
    },
    updateCurrentRow(currentRow) {
      const { states, table } = this;
      const oldCurrentRow = states.currentRow;
      if (currentRow && currentRow !== oldCurrentRow) {
        states.currentRow = currentRow;
        table.$emit("current-change", currentRow, oldCurrentRow);
        return;
      }
      if (!currentRow && oldCurrentRow) {
        states.currentRow = null;
        table.$emit("current-change", null, oldCurrentRow);
      }
    },
    updateCurrentRowData() {
      const { states, table } = this;
      const { rowKey, _currentRowKey } = states;
      const data = states.data || [];
      const oldCurrentRow = states.currentRow;
      if (data.indexOf(oldCurrentRow) === -1 && oldCurrentRow) {
        if (rowKey) {
          const currentRowKey = util.getRowIdentity(oldCurrentRow, rowKey);
          this.setCurrentRowByKey(currentRowKey);
        } else {
          states.currentRow = null;
        }
        if (states.currentRow === null) {
          table.$emit("current-change", null, oldCurrentRow);
        }
      } else if (_currentRowKey) {
        this.setCurrentRowByKey(_currentRowKey);
        this.restoreCurrentRowKey();
      }
    }
  }
};
const tree = {
  data() {
    return {
      states: {
        // defaultExpandAll 存在于 expand.js 中，这里不重复添加
        // 在展开行中，expandRowKeys 会被转化成 expandRows，expandRowKeys 这个属性只是记录了 TreeTable 行的展开
        // TODO: 拆分为独立的 TreeTable，统一用法
        expandRowKeys: [],
        treeData: {},
        indent: 16,
        lazy: false,
        lazyTreeNodeMap: {},
        lazyColumnIdentifier: "hasChildren",
        childrenColumnName: "children"
      }
    };
  },
  computed: {
    // 嵌入型的数据，watch 无法是检测到变化 https://github.com/ElemeFE/element/issues/14998
    // TODO: 使用 computed 解决该问题，是否会造成性能问题？
    // @return { id: { level, children } }
    normalizedData() {
      if (!this.states.rowKey) return {};
      const data = this.states.data || [];
      return this.normalize(data);
    },
    // @return { id: { children } }
    // 针对懒加载的情形，不处理嵌套数据
    normalizedLazyNode() {
      const { rowKey, lazyTreeNodeMap, lazyColumnIdentifier } = this.states;
      const keys = Object.keys(lazyTreeNodeMap);
      const res = {};
      if (!keys.length) return res;
      keys.forEach((key) => {
        if (lazyTreeNodeMap[key].length) {
          const item = { children: [] };
          lazyTreeNodeMap[key].forEach((row) => {
            const currentRowKey = util.getRowIdentity(row, rowKey);
            item.children.push(currentRowKey);
            if (row[lazyColumnIdentifier] && !res[currentRowKey]) {
              res[currentRowKey] = { children: [] };
            }
          });
          res[key] = item;
        }
      });
      return res;
    }
  },
  watch: {
    normalizedData: "updateTreeData",
    normalizedLazyNode: "updateTreeData"
  },
  methods: {
    normalize(data) {
      const {
        childrenColumnName,
        lazyColumnIdentifier,
        rowKey,
        lazy
      } = this.states;
      const res = {};
      util.walkTreeNode(
        data,
        (parent, children, level) => {
          const parentId = util.getRowIdentity(parent, rowKey);
          if (Array.isArray(children)) {
            res[parentId] = {
              children: children.map((row) => util.getRowIdentity(row, rowKey)),
              level
            };
          } else if (lazy) {
            res[parentId] = {
              children: [],
              lazy: true,
              level
            };
          }
        },
        childrenColumnName,
        lazyColumnIdentifier
      );
      return res;
    },
    updateTreeData() {
      const nested = this.normalizedData;
      const normalizedLazyNode = this.normalizedLazyNode;
      const keys = Object.keys(nested);
      const newTreeData = {};
      if (keys.length) {
        const {
          treeData: oldTreeData,
          defaultExpandAll,
          expandRowKeys,
          lazy
        } = this.states;
        const rootLazyRowKeys = [];
        const getExpanded = (oldValue, key) => {
          const included = defaultExpandAll || expandRowKeys && expandRowKeys.indexOf(key) !== -1;
          return !!(oldValue && oldValue.expanded || included);
        };
        keys.forEach((key) => {
          const oldValue = oldTreeData[key];
          const newValue = { ...nested[key] };
          newValue.expanded = getExpanded(oldValue, key);
          if (newValue.lazy) {
            const { loaded = false, loading = false } = oldValue || {};
            newValue.loaded = !!loaded;
            newValue.loading = !!loading;
            rootLazyRowKeys.push(key);
          }
          newTreeData[key] = newValue;
        });
        const lazyKeys = Object.keys(normalizedLazyNode);
        if (lazy && lazyKeys.length && rootLazyRowKeys.length) {
          lazyKeys.forEach((key) => {
            const oldValue = oldTreeData[key];
            const lazyNodeChildren = normalizedLazyNode[key].children;
            if (rootLazyRowKeys.indexOf(key) !== -1) {
              if (newTreeData[key].children.length !== 0) {
                throw new Error("[ElTable]children must be an empty array.");
              }
              newTreeData[key].children = lazyNodeChildren;
            } else {
              const { loaded = false, loading = false } = oldValue || {};
              newTreeData[key] = {
                lazy: true,
                loaded: !!loaded,
                loading: !!loading,
                expanded: getExpanded(oldValue, key),
                children: lazyNodeChildren,
                level: ""
              };
            }
          });
        }
      }
      this.states.treeData = newTreeData;
      this.updateTableScrollY();
    },
    updateTreeExpandKeys(value) {
      this.states.expandRowKeys = value;
      this.updateTreeData();
    },
    toggleTreeExpansion(row, expanded) {
      this.assertRowKey();
      const { rowKey, treeData } = this.states;
      const id = util.getRowIdentity(row, rowKey);
      const data = id && treeData[id];
      if (id && data && "expanded" in data) {
        const oldExpanded = data.expanded;
        expanded = typeof expanded === "undefined" ? !data.expanded : expanded;
        treeData[id].expanded = expanded;
        if (oldExpanded !== expanded) {
          this.table.$emit("expand-change", row, expanded);
        }
        this.updateTableScrollY();
      }
    },
    loadOrToggle(row) {
      this.assertRowKey();
      const { lazy, treeData, rowKey } = this.states;
      const id = util.getRowIdentity(row, rowKey);
      const data = treeData[id];
      if (lazy && data && "loaded" in data && !data.loaded) {
        this.loadData(row, id, data);
      } else {
        this.toggleTreeExpansion(row);
      }
    },
    loadData(row, key, treeNode) {
      const { load } = this.table;
      const { treeData: rawTreeData } = this.states;
      if (load && !rawTreeData[key].loaded) {
        rawTreeData[key].loading = true;
        load(row, treeNode, (data) => {
          if (!Array.isArray(data)) {
            throw new Error("[ElTable] data must be an array");
          }
          const { lazyTreeNodeMap, treeData } = this.states;
          treeData[key].loading = false;
          treeData[key].loaded = true;
          treeData[key].expanded = true;
          if (data.length) {
            this.$set(lazyTreeNodeMap, key, data);
          }
          this.table.$emit("expand-change", row, true);
        });
      }
    }
  }
};
const sortData = (data, states) => {
  const sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === "string") {
    return data;
  }
  return util.orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};
const doFlattenColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};
const Watcher = Vue.extend({
  data() {
    return {
      states: {
        // 3.0 版本后要求必须设置该属性
        rowKey: null,
        // 渲染的数据来源，是对 table 中的 data 过滤排序后的结果
        data: [],
        // 是否包含固定列
        isComplex: false,
        // 列
        _columns: [],
        // 不可响应的
        originColumns: [],
        columns: [],
        fixedColumns: [],
        rightFixedColumns: [],
        leafColumns: [],
        fixedLeafColumns: [],
        rightFixedLeafColumns: [],
        leafColumnsLength: 0,
        fixedLeafColumnsLength: 0,
        rightFixedLeafColumnsLength: 0,
        // 选择
        isAllSelected: false,
        selection: [],
        reserveSelection: false,
        selectOnIndeterminate: false,
        selectable: null,
        // 过滤
        filters: {},
        // 不可响应的
        filteredData: null,
        // 排序
        sortingColumn: null,
        sortProp: null,
        sortOrder: null,
        hoverRow: null
      }
    };
  },
  mixins: [expand, current, tree],
  methods: {
    // 检查 rowKey 是否存在
    assertRowKey() {
      const rowKey = this.states.rowKey;
      if (!rowKey) throw new Error("[ElTable] prop row-key is required");
    },
    // 更新列
    updateColumns() {
      const states = this.states;
      const _columns = states._columns || [];
      states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === "left");
      states.rightFixedColumns = _columns.filter((column) => column.fixed === "right");
      if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === "selection" && !_columns[0].fixed) {
        _columns[0].fixed = true;
        states.fixedColumns.unshift(_columns[0]);
      }
      const notFixedColumns = _columns.filter((column) => !column.fixed);
      states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);
      const leafColumns = doFlattenColumns(notFixedColumns);
      const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
      const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);
      states.leafColumnsLength = leafColumns.length;
      states.fixedLeafColumnsLength = fixedLeafColumns.length;
      states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;
      states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
      states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
    },
    // 更新 DOM
    scheduleLayout(needUpdateColumns) {
      if (needUpdateColumns) {
        this.updateColumns();
      }
      this.table.debouncedUpdateLayout();
    },
    // 选择
    isSelected(row) {
      const { selection = [] } = this.states;
      return selection.indexOf(row) > -1;
    },
    clearSelection() {
      const states = this.states;
      states.isAllSelected = false;
      const oldSelection = states.selection;
      if (oldSelection.length) {
        states.selection = [];
        this.table.$emit("selection-change", []);
      }
    },
    cleanSelection() {
      const states = this.states;
      const { data, rowKey, selection } = states;
      let deleted;
      if (rowKey) {
        deleted = [];
        const selectedMap = util.getKeysMap(selection, rowKey);
        const dataMap = util.getKeysMap(data, rowKey);
        for (let key in selectedMap) {
          if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
            deleted.push(selectedMap[key].row);
          }
        }
      } else {
        deleted = selection.filter((item) => data.indexOf(item) === -1);
      }
      if (deleted.length) {
        const newSelection = selection.filter((item) => deleted.indexOf(item) === -1);
        states.selection = newSelection;
        this.table.$emit("selection-change", newSelection.slice());
      }
    },
    toggleRowSelection(row, selected, emitChange = true) {
      const changed = util.toggleRowStatus(this.states.selection, row, selected);
      if (changed) {
        const newSelection = (this.states.selection || []).slice();
        if (emitChange) {
          this.table.$emit("select", newSelection, row);
        }
        this.table.$emit("selection-change", newSelection);
      }
    },
    _toggleAllSelection() {
      const states = this.states;
      const { data = [], selection } = states;
      const value = states.selectOnIndeterminate ? !states.isAllSelected : !(states.isAllSelected || selection.length);
      states.isAllSelected = value;
      let selectionChanged = false;
      data.forEach((row, index2) => {
        if (states.selectable) {
          if (states.selectable.call(null, row, index2) && util.toggleRowStatus(selection, row, value)) {
            selectionChanged = true;
          }
        } else {
          if (util.toggleRowStatus(selection, row, value)) {
            selectionChanged = true;
          }
        }
      });
      if (selectionChanged) {
        this.table.$emit("selection-change", selection ? selection.slice() : []);
      }
      this.table.$emit("select-all", selection);
    },
    updateSelectionByRowKey() {
      const states = this.states;
      const { selection, rowKey, data } = states;
      const selectedMap = util.getKeysMap(selection, rowKey);
      data.forEach((row) => {
        const rowId = util.getRowIdentity(row, rowKey);
        const rowInfo = selectedMap[rowId];
        if (rowInfo) {
          selection[rowInfo.index] = row;
        }
      });
    },
    updateAllSelected() {
      const states = this.states;
      const { selection, rowKey, selectable } = states;
      const data = states.data || [];
      if (data.length === 0) {
        states.isAllSelected = false;
        return;
      }
      let selectedMap;
      if (rowKey) {
        selectedMap = util.getKeysMap(selection, rowKey);
      }
      const isSelected = function(row) {
        if (selectedMap) {
          return !!selectedMap[util.getRowIdentity(row, rowKey)];
        } else {
          return selection.indexOf(row) !== -1;
        }
      };
      let isAllSelected = true;
      let selectedCount = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        const item = data[i];
        const isRowSelectable = selectable && selectable.call(null, item, i);
        if (!isSelected(item)) {
          if (!selectable || isRowSelectable) {
            isAllSelected = false;
            break;
          }
        } else {
          selectedCount++;
        }
      }
      if (selectedCount === 0) isAllSelected = false;
      states.isAllSelected = isAllSelected;
    },
    // 过滤与排序
    updateFilters(columns, values) {
      if (!Array.isArray(columns)) {
        columns = [columns];
      }
      const states = this.states;
      const filters = {};
      columns.forEach((col) => {
        states.filters[col.id] = values;
        filters[col.columnKey || col.id] = values;
      });
      return filters;
    },
    updateSort(column, prop, order) {
      if (this.states.sortingColumn && this.states.sortingColumn !== column) {
        this.states.sortingColumn.order = null;
      }
      this.states.sortingColumn = column;
      this.states.sortProp = prop;
      this.states.sortOrder = order;
    },
    execFilter() {
      const states = this.states;
      const { _data, filters } = states;
      let data = _data;
      Object.keys(filters).forEach((columnId) => {
        const values = states.filters[columnId];
        if (!values || values.length === 0) return;
        const column = util.getColumnById(this.states, columnId);
        if (column && column.filterMethod) {
          data = data.filter((row) => {
            return values.some((value) => column.filterMethod.call(null, value, row, column));
          });
        }
      });
      states.filteredData = data;
    },
    execSort() {
      const states = this.states;
      states.data = sortData(states.filteredData, states);
    },
    // 根据 filters 与 sort 去过滤 data
    execQuery(ignore) {
      if (!(ignore && ignore.filter)) {
        this.execFilter();
      }
      this.execSort();
    },
    clearFilter(columnKeys) {
      const states = this.states;
      const { tableHeader, fixedTableHeader, rightFixedTableHeader } = this.table.$refs;
      let panels = {};
      if (tableHeader) panels = merge(panels, tableHeader.filterPanels);
      if (fixedTableHeader) panels = merge(panels, fixedTableHeader.filterPanels);
      if (rightFixedTableHeader) panels = merge(panels, rightFixedTableHeader.filterPanels);
      const keys = Object.keys(panels);
      if (!keys.length) return;
      if (typeof columnKeys === "string") {
        columnKeys = [columnKeys];
      }
      if (Array.isArray(columnKeys)) {
        const columns = columnKeys.map((key) => util.getColumnByKey(states, key));
        keys.forEach((key) => {
          const column = columns.find((col) => col.id === key);
          if (column) {
            panels[key].filteredValue = [];
          }
        });
        this.commit("filterChange", {
          column: columns,
          values: [],
          silent: true,
          multi: true
        });
      } else {
        keys.forEach((key) => {
          panels[key].filteredValue = [];
        });
        states.filters = {};
        this.commit("filterChange", {
          column: {},
          values: [],
          silent: true
        });
      }
    },
    clearSort() {
      const states = this.states;
      if (!states.sortingColumn) return;
      this.updateSort(null, null, null);
      this.commit("changeSortCondition", {
        silent: true
      });
    },
    // 适配层，expand-row-keys 在 Expand 与 TreeTable 中都有使用
    setExpandRowKeysAdapter(val) {
      this.setExpandRowKeys(val);
      this.updateTreeExpandKeys(val);
    },
    // 展开行与 TreeTable 都要使用
    toggleRowExpansionAdapter(row, expanded) {
      const hasExpandColumn = this.states.columns.some(({ type }) => type === "expand");
      if (hasExpandColumn) {
        this.toggleRowExpansion(row, expanded);
      } else {
        this.toggleTreeExpansion(row, expanded);
      }
    }
  }
});
Watcher.prototype.mutations = {
  setData(states, data) {
    const dataInstanceChanged = states._data !== data;
    states._data = data;
    this.execQuery();
    this.updateCurrentRowData();
    this.updateExpandRows();
    if (states.reserveSelection) {
      this.assertRowKey();
      this.updateSelectionByRowKey();
    } else {
      if (dataInstanceChanged) {
        this.clearSelection();
      } else {
        this.cleanSelection();
      }
    }
    this.updateAllSelected();
    this.updateTableScrollY();
  },
  insertColumn(states, column, index2, parent) {
    let array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }
    if (typeof index2 !== "undefined") {
      array.splice(index2, 0, column);
    } else {
      array.push(column);
    }
    if (column.type === "selection") {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    }
    if (this.table.$ready) {
      this.updateColumns();
      this.scheduleLayout();
    }
  },
  removeColumn(states, column, parent) {
    let array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }
    if (array) {
      array.splice(array.indexOf(column), 1);
    }
    if (this.table.$ready) {
      this.updateColumns();
      this.scheduleLayout();
    }
  },
  sort(states, options) {
    const { prop, order, init } = options;
    if (prop) {
      const column = util$1.arrayFind(states.columns, (column2) => column2.property === prop);
      if (column) {
        column.order = order;
        this.updateSort(column, prop, order);
        this.commit("changeSortCondition", { init });
      }
    }
  },
  changeSortCondition(states, options) {
    const { sortingColumn: column, sortProp: prop, sortOrder: order } = states;
    if (order === null) {
      states.sortingColumn = null;
      states.sortProp = null;
    }
    const ingore = { filter: true };
    this.execQuery(ingore);
    if (!options || !(options.silent || options.init)) {
      this.table.$emit("sort-change", {
        column,
        prop,
        order
      });
    }
    this.updateTableScrollY();
  },
  filterChange(states, options) {
    let { column, values, silent } = options;
    const newFilters = this.updateFilters(column, values);
    this.execQuery();
    if (!silent) {
      this.table.$emit("filter-change", newFilters);
    }
    this.updateTableScrollY();
  },
  toggleAllSelection() {
    this.toggleAllSelection();
  },
  rowSelectedChanged(states, row) {
    this.toggleRowSelection(row);
    this.updateAllSelected();
  },
  setHoverRow(states, row) {
    states.hoverRow = row;
  },
  setCurrentRow(states, row) {
    this.updateCurrentRow(row);
  }
};
Watcher.prototype.commit = function(name, ...args) {
  const mutations = this.mutations;
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error(`Action not found: ${name}`);
  }
};
Watcher.prototype.updateTableScrollY = function() {
  Vue.nextTick(this.table.updateScrollY);
};
function createStore(table, initialState = {}) {
  if (!table) {
    throw new Error("Table is required.");
  }
  const store = new Watcher();
  store.table = table;
  store.toggleAllSelection = index.debounce(10, store._toggleAllSelection);
  Object.keys(initialState).forEach((key) => {
    store.states[key] = initialState[key];
  });
  return store;
}
function mapStates(mapper) {
  const res = {};
  Object.keys(mapper).forEach((key) => {
    const value = mapper[key];
    let fn;
    if (typeof value === "string") {
      fn = function() {
        return this.store.states[value];
      };
    } else if (typeof value === "function") {
      fn = function() {
        return value.call(this, this.store.states);
      };
    } else {
      console.error("invalid value type");
    }
    if (fn) {
      res[key] = fn;
    }
  });
  return res;
}
class TableLayout {
  constructor(options) {
    this.observers = [];
    this.table = null;
    this.store = null;
    this.columns = null;
    this.fit = true;
    this.showHeader = true;
    this.height = null;
    this.scrollX = false;
    this.scrollY = false;
    this.bodyWidth = null;
    this.fixedWidth = null;
    this.rightFixedWidth = null;
    this.tableHeight = null;
    this.headerHeight = 44;
    this.appendHeight = 0;
    this.footerHeight = 44;
    this.viewportHeight = null;
    this.bodyHeight = null;
    this.fixedBodyHeight = null;
    this.gutterWidth = scrollbarWidth();
    for (let name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }
    if (!this.table) {
      throw new Error("table is required for Table Layout");
    }
    if (!this.store) {
      throw new Error("store is required for Table Layout");
    }
  }
  updateScrollY() {
    const height = this.height;
    if (height === null) return false;
    const bodyWrapper = this.table.bodyWrapper;
    if (this.table.$el && bodyWrapper) {
      const body = bodyWrapper.querySelector(".el-table__body");
      const prevScrollY = this.scrollY;
      const scrollY = body.offsetHeight > this.bodyHeight;
      this.scrollY = scrollY;
      return prevScrollY !== scrollY;
    }
    return false;
  }
  setHeight(value, prop = "height") {
    if (Vue.prototype.$isServer) return;
    const el = this.table.$el;
    value = util.parseHeight(value);
    this.height = value;
    if (!el && (value || value === 0)) return Vue.nextTick(() => this.setHeight(value, prop));
    if (typeof value === "number") {
      el.style[prop] = value + "px";
      this.updateElsHeight();
    } else if (typeof value === "string") {
      el.style[prop] = value;
      this.updateElsHeight();
    }
  }
  setMaxHeight(value) {
    this.setHeight(value, "max-height");
  }
  getFlattenColumns() {
    const flattenColumns = [];
    const columns = this.table.columns;
    columns.forEach((column) => {
      if (column.isColumnGroup) {
        flattenColumns.push.apply(flattenColumns, column.columns);
      } else {
        flattenColumns.push(column);
      }
    });
    return flattenColumns;
  }
  updateElsHeight() {
    if (!this.table.$ready) return Vue.nextTick(() => this.updateElsHeight());
    const { headerWrapper, appendWrapper, footerWrapper } = this.table.$refs;
    this.appendHeight = appendWrapper ? appendWrapper.offsetHeight : 0;
    if (this.showHeader && !headerWrapper) return;
    const headerTrElm = headerWrapper ? headerWrapper.querySelector(".el-table__header tr") : null;
    const noneHeader = this.headerDisplayNone(headerTrElm);
    const headerHeight = this.headerHeight = !this.showHeader ? 0 : headerWrapper.offsetHeight;
    if (this.showHeader && !noneHeader && headerWrapper.offsetWidth > 0 && (this.table.columns || []).length > 0 && headerHeight < 2) {
      return Vue.nextTick(() => this.updateElsHeight());
    }
    const tableHeight = this.tableHeight = this.table.$el.clientHeight;
    const footerHeight = this.footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
    if (this.height !== null) {
      this.bodyHeight = tableHeight - headerHeight - footerHeight + (footerWrapper ? 1 : 0);
    }
    this.fixedBodyHeight = this.scrollX ? this.bodyHeight - this.gutterWidth : this.bodyHeight;
    const noData = !(this.store.states.data && this.store.states.data.length);
    this.viewportHeight = this.scrollX ? tableHeight - (noData ? 0 : this.gutterWidth) : tableHeight;
    this.updateScrollY();
    this.notifyObservers("scrollable");
  }
  headerDisplayNone(elm) {
    if (!elm) return true;
    let headerChild = elm;
    while (headerChild.tagName !== "DIV") {
      if (getComputedStyle(headerChild).display === "none") {
        return true;
      }
      headerChild = headerChild.parentElement;
    }
    return false;
  }
  updateColumnsWidth() {
    if (Vue.prototype.$isServer) return;
    const fit = this.fit;
    const bodyWidth = this.table.$el.clientWidth;
    let bodyMinWidth = 0;
    const flattenColumns = this.getFlattenColumns();
    let flexColumns = flattenColumns.filter((column) => typeof column.width !== "number");
    flattenColumns.forEach((column) => {
      if (typeof column.width === "number" && column.realWidth) column.realWidth = null;
    });
    if (flexColumns.length > 0 && fit) {
      flattenColumns.forEach((column) => {
        bodyMinWidth += column.width || column.minWidth || 80;
      });
      const scrollYWidth = this.scrollY ? this.gutterWidth : 0;
      if (bodyMinWidth <= bodyWidth - scrollYWidth) {
        this.scrollX = false;
        const totalFlexWidth = bodyWidth - scrollYWidth - bodyMinWidth;
        if (flexColumns.length === 1) {
          flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
        } else {
          const allColumnsWidth = flexColumns.reduce((prev, column) => prev + (column.minWidth || 80), 0);
          const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
          let noneFirstWidth = 0;
          flexColumns.forEach((column, index2) => {
            if (index2 === 0) return;
            const flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
            noneFirstWidth += flexWidth;
            column.realWidth = (column.minWidth || 80) + flexWidth;
          });
          flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
        }
      } else {
        this.scrollX = true;
        flexColumns.forEach(function(column) {
          column.realWidth = column.minWidth;
        });
      }
      this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
      this.table.resizeState.width = this.bodyWidth;
    } else {
      flattenColumns.forEach((column) => {
        if (!column.width && !column.minWidth) {
          column.realWidth = 80;
        } else {
          column.realWidth = column.width || column.minWidth;
        }
        bodyMinWidth += column.realWidth;
      });
      this.scrollX = bodyMinWidth > bodyWidth;
      this.bodyWidth = bodyMinWidth;
    }
    const fixedColumns = this.store.states.fixedColumns;
    if (fixedColumns.length > 0) {
      let fixedWidth = 0;
      fixedColumns.forEach(function(column) {
        fixedWidth += column.realWidth || column.width;
      });
      this.fixedWidth = fixedWidth;
    }
    const rightFixedColumns = this.store.states.rightFixedColumns;
    if (rightFixedColumns.length > 0) {
      let rightFixedWidth = 0;
      rightFixedColumns.forEach(function(column) {
        rightFixedWidth += column.realWidth || column.width;
      });
      this.rightFixedWidth = rightFixedWidth;
    }
    this.notifyObservers("columns");
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    const index2 = this.observers.indexOf(observer);
    if (index2 !== -1) {
      this.observers.splice(index2, 1);
    }
  }
  notifyObservers(event) {
    const observers = this.observers;
    observers.forEach((observer) => {
      switch (event) {
        case "columns":
          observer.onColumnsChange(this);
          break;
        case "scrollable":
          observer.onScrollableChange(this);
          break;
        default:
          throw new Error(`Table Layout don't have event ${event}.`);
      }
    });
  }
}
const LayoutObserver = {
  created() {
    this.tableLayout.addObserver(this);
  },
  destroyed() {
    this.tableLayout.removeObserver(this);
  },
  computed: {
    tableLayout() {
      let layout = this.layout;
      if (!layout && this.table) {
        layout = this.table.layout;
      }
      if (!layout) {
        throw new Error("Can not find table layout.");
      }
      return layout;
    }
  },
  mounted() {
    this.onColumnsChange(this.tableLayout);
    this.onScrollableChange(this.tableLayout);
  },
  updated() {
    if (this.__updated__) return;
    this.onColumnsChange(this.tableLayout);
    this.onScrollableChange(this.tableLayout);
    this.__updated__ = true;
  },
  methods: {
    onColumnsChange(layout) {
      const cols = this.$el.querySelectorAll("colgroup > col");
      if (!cols.length) return;
      const flattenColumns = layout.getFlattenColumns();
      const columnsMap = {};
      flattenColumns.forEach((column) => {
        columnsMap[column.id] = column;
      });
      for (let i = 0, j = cols.length; i < j; i++) {
        const col = cols[i];
        const name = col.getAttribute("name");
        const column = columnsMap[name];
        if (column) {
          col.setAttribute("width", column.realWidth || column.width);
        }
      }
    },
    onScrollableChange(layout) {
      const cols = this.$el.querySelectorAll("colgroup > col[name=gutter]");
      for (let i = 0, j = cols.length; i < j; i++) {
        const col = cols[i];
        col.setAttribute("width", layout.scrollY ? layout.gutterWidth : "0");
      }
      const ths = this.$el.querySelectorAll("th.gutter");
      for (let i = 0, j = ths.length; i < j; i++) {
        const th = ths[i];
        th.style.width = layout.scrollY ? layout.gutterWidth + "px" : "0";
        th.style.display = layout.scrollY ? "" : "none";
      }
    }
  }
};
const TableRow = {
  name: "ElTableRow",
  props: ["columns", "row", "index", "isSelected", "isExpanded", "store", "context", "firstDefaultColumnIndex", "treeRowData", "treeIndent", "columnsHidden", "getSpan", "getColspanRealWidth", "getCellStyle", "getCellClass", "handleCellMouseLeave", "handleCellMouseEnter", "fixed"],
  components: {
    ElCheckbox
  },
  render() {
    const {
      columns,
      row,
      index: $index,
      store,
      context,
      firstDefaultColumnIndex,
      treeRowData,
      treeIndent,
      columnsHidden = [],
      isSelected,
      isExpanded
    } = this;
    return Vue.h("tr", [columns.map((column, cellIndex) => {
      const {
        rowspan,
        colspan
      } = this.getSpan(row, column, $index, cellIndex);
      if (!rowspan || !colspan) {
        return null;
      }
      const columnData = {
        ...column
      };
      columnData.realWidth = this.getColspanRealWidth(columns, colspan, cellIndex);
      const data = {
        store,
        isSelected,
        isExpanded,
        _self: context,
        column: columnData,
        row,
        $index
      };
      if (cellIndex === firstDefaultColumnIndex && treeRowData) {
        data.treeNode = {
          indent: treeRowData.level * treeIndent,
          level: treeRowData.level
        };
        if (typeof treeRowData.expanded === "boolean") {
          data.treeNode.expanded = treeRowData.expanded;
          if ("loading" in treeRowData) {
            data.treeNode.loading = treeRowData.loading;
          }
          if ("noLazyChildren" in treeRowData) {
            data.treeNode.noLazyChildren = treeRowData.noLazyChildren;
          }
        }
      }
      return Vue.h("td", {
        "style": this.getCellStyle($index, cellIndex, row, column),
        "class": this.getCellClass($index, cellIndex, row, column),
        "attrs": {
          "rowspan": rowspan,
          "colspan": colspan
        },
        "on": {
          "mouseenter": ($event) => this.handleCellMouseEnter($event, row),
          "mouseleave": this.handleCellMouseLeave
        }
      }, [column.renderCell.call(this._renderProxy, this.$createElement, data, columnsHidden[cellIndex])]);
    })]);
  }
};
const TableBody = {
  name: "ElTableBody",
  mixins: [LayoutObserver],
  components: {
    ElCheckbox,
    ElTooltip,
    TableRow
  },
  props: {
    store: {
      required: true
    },
    stripe: Boolean,
    context: {},
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: String,
    highlight: Boolean
  },
  render(h) {
    const data = this.data || [];
    return h("table", {
      "class": "el-table__body",
      "attrs": {
        "cellspacing": "0",
        "cellpadding": "0",
        "border": "0"
      }
    }, [h("colgroup", [this.columns.map((column) => h("col", {
      "attrs": {
        "name": column.id
      },
      "key": column.id
    }))]), h("tbody", [data.reduce((acc, row) => {
      return acc.concat(this.wrappedRowRender(row, acc.length));
    }, []), h("el-tooltip", {
      "attrs": {
        "effect": this.table.tooltipEffect,
        "placement": "top",
        "content": this.tooltipContent
      },
      "ref": "tooltip"
    })])]);
  },
  computed: {
    table() {
      return this.$parent;
    },
    ...mapStates({
      data: "data",
      columns: "columns",
      treeIndent: "indent",
      leftFixedLeafCount: "fixedLeafColumnsLength",
      rightFixedLeafCount: "rightFixedLeafColumnsLength",
      columnsCount: (states) => states.columns.length,
      leftFixedCount: (states) => states.fixedColumns.length,
      rightFixedCount: (states) => states.rightFixedColumns.length,
      hasExpandColumn: (states) => states.columns.some(({
        type
      }) => type === "expand")
    }),
    columnsHidden() {
      return this.columns.map((column, index2) => this.isColumnHidden(index2));
    },
    firstDefaultColumnIndex() {
      return util$1.arrayFindIndex(this.columns, ({
        type
      }) => type === "default");
    }
  },
  watch: {
    // don't trigger getter of currentRow in getCellClass. see https://jsfiddle.net/oe2b4hqt/
    // update DOM manually. see https://github.com/ElemeFE/element/pull/13954/files#diff-9b450c00d0a9dec0ffad5a3176972e40
    "store.states.hoverRow"(newVal, oldVal) {
      if (!this.store.states.isComplex || this.$isServer) return;
      let raf = window.requestAnimationFrame;
      if (!raf) {
        raf = (fn) => setTimeout(fn, 16);
      }
      raf(() => {
        const rows = this.$el.querySelectorAll(".el-table__row");
        const oldRow = rows[oldVal];
        const newRow = rows[newVal];
        if (oldRow) {
          dom.removeClass(oldRow, "hover-row");
        }
        if (newRow) {
          dom.addClass(newRow, "hover-row");
        }
      });
    }
  },
  data() {
    return {
      tooltipContent: ""
    };
  },
  created() {
    this.activateTooltip = index.debounce(50, (tooltip) => tooltip.handleShowPopper());
  },
  methods: {
    getKeyOfRow(row, index2) {
      const rowKey = this.table.rowKey;
      if (rowKey) {
        return util.getRowIdentity(row, rowKey);
      }
      return index2;
    },
    isColumnHidden(index2) {
      if (this.fixed === true || this.fixed === "left") {
        return index2 >= this.leftFixedLeafCount;
      } else if (this.fixed === "right") {
        return index2 < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return index2 < this.leftFixedLeafCount || index2 >= this.columnsCount - this.rightFixedLeafCount;
      }
    },
    getSpan(row, column, rowIndex, columnIndex) {
      let rowspan = 1;
      let colspan = 1;
      const fn = this.table.spanMethod;
      if (typeof fn === "function") {
        const result = fn({
          row,
          column,
          rowIndex,
          columnIndex
        });
        if (Array.isArray(result)) {
          rowspan = result[0];
          colspan = result[1];
        } else if (typeof result === "object") {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }
      return {
        rowspan,
        colspan
      };
    },
    getRowStyle(row, rowIndex) {
      const rowStyle = this.table.rowStyle;
      if (typeof rowStyle === "function") {
        return rowStyle.call(null, {
          row,
          rowIndex
        });
      }
      return rowStyle || null;
    },
    getRowClass(row, rowIndex) {
      let selection = this.store.states.selection;
      const classes = ["el-table__row"];
      if (this.table.highlightCurrentRow && row === this.store.states.currentRow) {
        classes.push("current-row");
      }
      if (this.table.highlightSelectionRow) {
        for (let i = 0; i < selection.length; i++) {
          if (util.objectEquals(row, selection[i])) {
            classes.push("selection-row");
          }
        }
      }
      if (this.stripe && rowIndex % 2 === 1) {
        classes.push("el-table__row--striped");
      }
      const rowClassName = this.table.rowClassName;
      if (typeof rowClassName === "string") {
        classes.push(rowClassName);
      } else if (typeof rowClassName === "function") {
        classes.push(rowClassName.call(null, {
          row,
          rowIndex
        }));
      }
      if (this.store.states.expandRows.indexOf(row) > -1) {
        classes.push("expanded");
      }
      return classes;
    },
    getCellStyle(rowIndex, columnIndex, row, column) {
      const cellStyle = this.table.cellStyle;
      if (typeof cellStyle === "function") {
        return cellStyle.call(null, {
          rowIndex,
          columnIndex,
          row,
          column
        });
      }
      return cellStyle;
    },
    getCellClass(rowIndex, columnIndex, row, column) {
      const classes = [column.id, column.align, column.className];
      if (this.isColumnHidden(columnIndex)) {
        classes.push("is-hidden");
      }
      const cellClassName = this.table.cellClassName;
      if (typeof cellClassName === "string") {
        classes.push(cellClassName);
      } else if (typeof cellClassName === "function") {
        classes.push(cellClassName.call(null, {
          rowIndex,
          columnIndex,
          row,
          column
        }));
      }
      classes.push("el-table__cell");
      return classes.join(" ");
    },
    getColspanRealWidth(columns, colspan, index2) {
      if (colspan < 1) {
        return columns[index2].realWidth;
      }
      const widthArr = columns.map(({
        realWidth
      }) => realWidth).slice(index2, index2 + colspan);
      return widthArr.reduce((acc, width) => acc + width, -1);
    },
    handleCellMouseEnter(event, row) {
      const table = this.table;
      const cell = util.getCell(event);
      if (cell) {
        const column = util.getColumnByCell(table, cell);
        const hoverState = table.hoverState = {
          cell,
          column,
          row
        };
        table.$emit("cell-mouse-enter", hoverState.row, hoverState.column, hoverState.cell, event);
      }
      const cellChild = event.target.querySelector(".cell");
      if (!(dom.hasClass(cellChild, "el-tooltip") && cellChild.childNodes.length)) {
        return;
      }
      const range = document.createRange();
      range.setStart(cellChild, 0);
      range.setEnd(cellChild, cellChild.childNodes.length);
      const rangeWidth = range.getBoundingClientRect().width;
      const padding = (parseInt(dom.getStyle(cellChild, "paddingLeft"), 10) || 0) + (parseInt(dom.getStyle(cellChild, "paddingRight"), 10) || 0);
      if ((rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) && this.$refs.tooltip) {
        const tooltip = this.$refs.tooltip;
        this.tooltipContent = cell.innerText || cell.textContent;
        tooltip.referenceElm = cell;
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = "none");
        tooltip.doDestroy();
        tooltip.setExpectedState(true);
        this.activateTooltip(tooltip);
      }
    },
    handleCellMouseLeave(event) {
      const tooltip = this.$refs.tooltip;
      if (tooltip) {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }
      const cell = util.getCell(event);
      if (!cell) return;
      const oldHoverState = this.table.hoverState || {};
      this.table.$emit("cell-mouse-leave", oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
    },
    handleMouseEnter: index.debounce(30, function(index2) {
      this.store.commit("setHoverRow", index2);
    }),
    handleMouseLeave: index.debounce(30, function() {
      this.store.commit("setHoverRow", null);
    }),
    handleContextMenu(event, row) {
      this.handleEvent(event, row, "contextmenu");
    },
    handleDoubleClick(event, row) {
      this.handleEvent(event, row, "dblclick");
    },
    handleClick(event, row) {
      this.store.commit("setCurrentRow", row);
      this.handleEvent(event, row, "click");
    },
    handleEvent(event, row, name) {
      const table = this.table;
      const cell = util.getCell(event);
      let column;
      if (cell) {
        column = util.getColumnByCell(table, cell);
        if (column) {
          table.$emit(`cell-${name}`, row, column, cell, event);
        }
      }
      table.$emit(`row-${name}`, row, column, event);
    },
    rowRender(row, $index, treeRowData) {
      const {
        treeIndent,
        columns,
        firstDefaultColumnIndex
      } = this;
      const rowClasses = this.getRowClass(row, $index);
      let display = true;
      if (treeRowData) {
        rowClasses.push("el-table__row--level-" + treeRowData.level);
        display = treeRowData.display;
      }
      let displayStyle = display ? null : {
        display: "none"
      };
      return Vue.h(TableRow, {
        "style": [displayStyle, this.getRowStyle(row, $index)],
        "class": rowClasses,
        "key": this.getKeyOfRow(row, $index),
        "nativeOn": {
          "dblclick": ($event) => this.handleDoubleClick($event, row),
          "click": ($event) => this.handleClick($event, row),
          "contextmenu": ($event) => this.handleContextMenu($event, row),
          "mouseenter": (_) => this.handleMouseEnter($index),
          "mouseleave": this.handleMouseLeave
        },
        "attrs": {
          "columns": columns,
          "row": row,
          "index": $index,
          "store": this.store,
          "context": this.context || this.table.$vnode.context,
          "firstDefaultColumnIndex": firstDefaultColumnIndex,
          "treeRowData": treeRowData,
          "treeIndent": treeIndent,
          "columnsHidden": this.columnsHidden,
          "getSpan": this.getSpan,
          "getColspanRealWidth": this.getColspanRealWidth,
          "getCellStyle": this.getCellStyle,
          "getCellClass": this.getCellClass,
          "handleCellMouseEnter": this.handleCellMouseEnter,
          "handleCellMouseLeave": this.handleCellMouseLeave,
          "isSelected": this.store.isSelected(row),
          "isExpanded": this.store.states.expandRows.indexOf(row) > -1,
          "fixed": this.fixed
        }
      });
    },
    wrappedRowRender(row, $index) {
      const store = this.store;
      const {
        isRowExpanded,
        assertRowKey
      } = store;
      const {
        treeData,
        lazyTreeNodeMap,
        childrenColumnName,
        rowKey
      } = store.states;
      if (this.hasExpandColumn && isRowExpanded(row)) {
        const renderExpanded = this.table.renderExpanded;
        const tr = this.rowRender(row, $index);
        if (!renderExpanded) {
          console.error("[Element Error]renderExpanded is required.");
          return tr;
        }
        return [[tr, Vue.h("tr", {
          "key": "expanded-row__" + tr.key
        }, [Vue.h("td", {
          "attrs": {
            "colspan": this.columnsCount
          },
          "class": "el-table__cell el-table__expanded-cell"
        }, [renderExpanded(this.$createElement, {
          row,
          $index,
          store: this.store
        })])])]];
      } else if (Object.keys(treeData).length) {
        assertRowKey();
        const key = util.getRowIdentity(row, rowKey);
        let cur = treeData[key];
        let treeRowData = null;
        if (cur) {
          treeRowData = {
            expanded: cur.expanded,
            level: cur.level,
            display: true
          };
          if (typeof cur.lazy === "boolean") {
            if (typeof cur.loaded === "boolean" && cur.loaded) {
              treeRowData.noLazyChildren = !(cur.children && cur.children.length);
            }
            treeRowData.loading = cur.loading;
          }
        }
        const tmp = [this.rowRender(row, $index, treeRowData)];
        if (cur) {
          let i = 0;
          const traverse = (children, parent) => {
            if (!(children && children.length && parent)) return;
            children.forEach((node) => {
              const innerTreeRowData = {
                display: parent.display && parent.expanded,
                level: parent.level + 1
              };
              const childKey = util.getRowIdentity(node, rowKey);
              if (childKey === void 0 || childKey === null) {
                throw new Error("for nested data item, row-key is required.");
              }
              cur = {
                ...treeData[childKey]
              };
              if (cur) {
                innerTreeRowData.expanded = cur.expanded;
                cur.level = cur.level || innerTreeRowData.level;
                cur.display = !!(cur.expanded && innerTreeRowData.display);
                if (typeof cur.lazy === "boolean") {
                  if (typeof cur.loaded === "boolean" && cur.loaded) {
                    innerTreeRowData.noLazyChildren = !(cur.children && cur.children.length);
                  }
                  innerTreeRowData.loading = cur.loading;
                }
              }
              i++;
              tmp.push(this.rowRender(node, $index + i, innerTreeRowData));
              if (cur) {
                const nodes2 = lazyTreeNodeMap[childKey] || node[childrenColumnName];
                traverse(nodes2, cur);
              }
            });
          };
          cur.display = true;
          const nodes = lazyTreeNodeMap[key] || row[childrenColumnName];
          traverse(nodes, cur);
        }
        return tmp;
      } else {
        return this.rowRender(row, $index);
      }
    }
  }
};
var dropdowns = [];
!Vue.prototype.$isServer && document.addEventListener("click", function(event) {
  dropdowns.forEach(function(dropdown) {
    var target = event.target;
    if (!dropdown || !dropdown.$el) return;
    if (target === dropdown.$el || dropdown.$el.contains(target)) {
      return;
    }
    dropdown.handleOutsideClick && dropdown.handleOutsideClick(event);
  });
});
const Dropdown = {
  open(instance) {
    if (instance) {
      dropdowns.push(instance);
    }
  },
  close(instance) {
    var index2 = dropdowns.indexOf(instance);
    if (index2 !== -1) {
      dropdowns.splice(instance, 1);
    }
  }
};
const _sfc_main$1 = {
  name: "ElTableFilterPanel",
  mixins: [Popper, Locale],
  directives: {
    Clickoutside
  },
  components: {
    ElCheckbox,
    ElCheckboxGroup,
    ElScrollbar
  },
  props: {
    placement: {
      type: String,
      default: "bottom-end"
    }
  },
  methods: {
    isActive(filter) {
      return filter.value === this.filterValue;
    },
    handleOutsideClick() {
      setTimeout(() => {
        this.showPopper = false;
      }, 16);
    },
    handleConfirm() {
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },
    handleReset() {
      this.filteredValue = [];
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },
    handleSelect(filterValue) {
      this.filterValue = filterValue;
      if (typeof filterValue !== "undefined" && filterValue !== null) {
        this.confirmFilter(this.filteredValue);
      } else {
        this.confirmFilter([]);
      }
      this.handleOutsideClick();
    },
    confirmFilter(filteredValue) {
      this.table.store.commit("filterChange", {
        column: this.column,
        values: filteredValue
      });
      this.table.store.updateAllSelected();
    }
  },
  data() {
    return {
      table: null,
      cell: null,
      column: null
    };
  },
  computed: {
    filters() {
      return this.column && this.column.filters;
    },
    filterValue: {
      get() {
        return (this.column.filteredValue || [])[0];
      },
      set(value) {
        if (this.filteredValue) {
          if (typeof value !== "undefined" && value !== null) {
            this.filteredValue.splice(0, 1, value);
          } else {
            this.filteredValue.splice(0, 1);
          }
        }
      }
    },
    filteredValue: {
      get() {
        if (this.column) {
          return this.column.filteredValue || [];
        }
        return [];
      },
      set(value) {
        if (this.column) {
          this.column.filteredValue = value;
        }
      }
    },
    multiple() {
      if (this.column) {
        return this.column.filterMultiple;
      }
      return true;
    }
  },
  mounted() {
    this.popperElm = this.$el;
    this.referenceElm = this.cell;
    this.table.bodyWrapper.addEventListener("scroll", () => {
      this.updatePopper();
    });
    this.$watch("showPopper", (value) => {
      if (this.column) this.column.filterOpened = value;
      if (value) {
        Dropdown.open(this);
      } else {
        Dropdown.close(this);
      }
    });
  },
  watch: {
    showPopper(val) {
      if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < Popup.PopupManager.zIndex) {
        this.popperJS._popper.style.zIndex = Popup.PopupManager.nextZIndex();
      }
    }
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "el-zoom-in-top" } }, [_vm.multiple ? _c("div", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleOutsideClick, expression: "handleOutsideClick" }, { name: "show", rawName: "v-show", value: _vm.showPopper, expression: "showPopper" }], staticClass: "el-table-filter" }, [_c("div", { staticClass: "el-table-filter__content" }, [_c("el-scrollbar", { attrs: { "wrap-class": "el-table-filter__wrap" } }, [_c("el-checkbox-group", { staticClass: "el-table-filter__checkbox-group", model: { value: _vm.filteredValue, callback: function($$v) {
    _vm.filteredValue = $$v;
  }, expression: "filteredValue" } }, _vm._l(_vm.filters, function(filter) {
    return _c("el-checkbox", { key: filter.value, attrs: { "label": filter.value } }, [_vm._v(_vm._s(filter.text))]);
  }), 1)], 1)], 1), _c("div", { staticClass: "el-table-filter__bottom" }, [_c("button", { class: { "is-disabled": _vm.filteredValue.length === 0 }, attrs: { "disabled": _vm.filteredValue.length === 0 }, on: { "click": _vm.handleConfirm } }, [_vm._v(_vm._s(_vm.t("el.table.confirmFilter")))]), _c("button", { on: { "click": _vm.handleReset } }, [_vm._v(_vm._s(_vm.t("el.table.resetFilter")))])])]) : _c("div", { directives: [{ name: "clickoutside", rawName: "v-clickoutside", value: _vm.handleOutsideClick, expression: "handleOutsideClick" }, { name: "show", rawName: "v-show", value: _vm.showPopper, expression: "showPopper" }], staticClass: "el-table-filter" }, [_c("ul", { staticClass: "el-table-filter__list" }, [_c("li", { staticClass: "el-table-filter__list-item", class: { "is-active": _vm.filterValue === void 0 || _vm.filterValue === null }, on: { "click": function($event) {
    return _vm.handleSelect(null);
  } } }, [_vm._v(_vm._s(_vm.t("el.table.clearFilter")))]), _vm._l(_vm.filters, function(filter) {
    return _c("li", { key: filter.value, staticClass: "el-table-filter__list-item", class: { "is-active": _vm.isActive(filter) }, attrs: { "label": filter.value }, on: { "click": function($event) {
      return _vm.handleSelect(filter.value);
    } } }, [_vm._v(_vm._s(filter.text))]);
  })], 2)])]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const FilterPanel = __component__$1.exports;
const getAllColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};
const convertToRows = (originColumns) => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      let colSpan = 0;
      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };
  originColumns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });
  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }
  const allColumns = getAllColumns(originColumns);
  allColumns.forEach((column) => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });
  return rows;
};
const TableHeader = {
  name: "ElTableHeader",
  mixins: [LayoutObserver],
  render(h) {
    const originColumns = this.store.states.originColumns;
    const columnRows = convertToRows(originColumns, this.columns);
    const isGroup = columnRows.length > 1;
    if (isGroup) this.$parent.isGroup = true;
    return h("table", {
      "class": "el-table__header",
      "attrs": {
        "cellspacing": "0",
        "cellpadding": "0",
        "border": "0"
      }
    }, [h("colgroup", [this.columns.map((column) => h("col", {
      "attrs": {
        "name": column.id
      },
      "key": column.id
    })), this.hasGutter ? h("col", {
      "attrs": {
        "name": "gutter"
      }
    }) : ""]), h("thead", {
      "class": [{
        "is-group": isGroup,
        "has-gutter": this.hasGutter
      }]
    }, [this._l(columnRows, (columns, rowIndex) => h("tr", {
      "style": this.getHeaderRowStyle(rowIndex),
      "class": this.getHeaderRowClass(rowIndex)
    }, [columns.map((column, cellIndex) => h("th", {
      "attrs": {
        "colspan": column.colSpan,
        "rowspan": column.rowSpan
      },
      "on": {
        "mousemove": ($event) => this.handleMouseMove($event, column),
        "mouseout": this.handleMouseOut,
        "mousedown": ($event) => this.handleMouseDown($event, column),
        "click": ($event) => this.handleHeaderClick($event, column),
        "contextmenu": ($event) => this.handleHeaderContextMenu($event, column)
      },
      "style": this.getHeaderCellStyle(rowIndex, cellIndex, columns, column),
      "class": this.getHeaderCellClass(rowIndex, cellIndex, columns, column),
      "key": column.id
    }, [h("div", {
      "class": ["cell", column.filteredValue && column.filteredValue.length > 0 ? "highlight" : "", column.labelClassName]
    }, [column.renderHeader ? column.renderHeader.call(this._renderProxy, h, {
      column,
      $index: cellIndex,
      store: this.store,
      _self: this.$parent.$vnode.context
    }) : column.label, column.sortable ? h("span", {
      "class": "caret-wrapper",
      "on": {
        "click": ($event) => this.handleSortClick($event, column)
      }
    }, [h("i", {
      "class": "sort-caret ascending",
      "on": {
        "click": ($event) => this.handleSortClick($event, column, "ascending")
      }
    }), h("i", {
      "class": "sort-caret descending",
      "on": {
        "click": ($event) => this.handleSortClick($event, column, "descending")
      }
    })]) : "", column.filterable ? h("span", {
      "class": "el-table__column-filter-trigger",
      "on": {
        "click": ($event) => this.handleFilterClick($event, column)
      }
    }, [h("i", {
      "class": ["el-icon-arrow-down", column.filterOpened ? "el-icon-arrow-up" : ""]
    })]) : ""])])), this.hasGutter ? h("th", {
      "class": "el-table__cell gutter"
    }) : ""]))])]);
  },
  props: {
    fixed: String,
    store: {
      required: true
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default() {
        return {
          prop: "",
          order: ""
        };
      }
    }
  },
  components: {
    ElCheckbox
  },
  computed: {
    table() {
      return this.$parent;
    },
    hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    },
    ...mapStates({
      columns: "columns",
      isAllSelected: "isAllSelected",
      leftFixedLeafCount: "fixedLeafColumnsLength",
      rightFixedLeafCount: "rightFixedLeafColumnsLength",
      columnsCount: (states) => states.columns.length,
      leftFixedCount: (states) => states.fixedColumns.length,
      rightFixedCount: (states) => states.rightFixedColumns.length
    })
  },
  created() {
    this.filterPanels = {};
  },
  mounted() {
    this.$nextTick(() => {
      const {
        prop,
        order
      } = this.defaultSort;
      const init = true;
      this.store.commit("sort", {
        prop,
        order,
        init
      });
    });
  },
  beforeDestroy() {
    const panels = this.filterPanels;
    for (let prop in panels) {
      if (panels.hasOwnProperty(prop) && panels[prop]) {
        panels[prop].$destroy(true);
      }
    }
  },
  methods: {
    isCellHidden(index2, columns) {
      let start = 0;
      for (let i = 0; i < index2; i++) {
        start += columns[i].colSpan;
      }
      const after = start + columns[index2].colSpan - 1;
      if (this.fixed === true || this.fixed === "left") {
        return after >= this.leftFixedLeafCount;
      } else if (this.fixed === "right") {
        return start < this.columnsCount - this.rightFixedLeafCount;
      } else {
        return after < this.leftFixedLeafCount || start >= this.columnsCount - this.rightFixedLeafCount;
      }
    },
    getHeaderRowStyle(rowIndex) {
      const headerRowStyle = this.table.headerRowStyle;
      if (typeof headerRowStyle === "function") {
        return headerRowStyle.call(null, {
          rowIndex
        });
      }
      return headerRowStyle;
    },
    getHeaderRowClass(rowIndex) {
      const classes = [];
      const headerRowClassName = this.table.headerRowClassName;
      if (typeof headerRowClassName === "string") {
        classes.push(headerRowClassName);
      } else if (typeof headerRowClassName === "function") {
        classes.push(headerRowClassName.call(null, {
          rowIndex
        }));
      }
      return classes.join(" ");
    },
    getHeaderCellStyle(rowIndex, columnIndex, row, column) {
      const headerCellStyle = this.table.headerCellStyle;
      if (typeof headerCellStyle === "function") {
        return headerCellStyle.call(null, {
          rowIndex,
          columnIndex,
          row,
          column
        });
      }
      return headerCellStyle;
    },
    getHeaderCellClass(rowIndex, columnIndex, row, column) {
      const classes = [column.id, column.order, column.headerAlign, column.className, column.labelClassName];
      if (rowIndex === 0 && this.isCellHidden(columnIndex, row)) {
        classes.push("is-hidden");
      }
      if (!column.children) {
        classes.push("is-leaf");
      }
      if (column.sortable) {
        classes.push("is-sortable");
      }
      const headerCellClassName = this.table.headerCellClassName;
      if (typeof headerCellClassName === "string") {
        classes.push(headerCellClassName);
      } else if (typeof headerCellClassName === "function") {
        classes.push(headerCellClassName.call(null, {
          rowIndex,
          columnIndex,
          row,
          column
        }));
      }
      classes.push("el-table__cell");
      return classes.join(" ");
    },
    toggleAllSelection() {
      this.store.commit("toggleAllSelection");
    },
    handleFilterClick(event, column) {
      event.stopPropagation();
      const target = event.target;
      let cell = target.tagName === "TH" ? target : target.parentNode;
      if (dom.hasClass(cell, "noclick")) return;
      cell = cell.querySelector(".el-table__column-filter-trigger") || cell;
      const table = this.$parent;
      let filterPanel = this.filterPanels[column.id];
      if (filterPanel && column.filterOpened) {
        filterPanel.showPopper = false;
        return;
      }
      if (!filterPanel) {
        filterPanel = new Vue(FilterPanel);
        this.filterPanels[column.id] = filterPanel;
        if (column.filterPlacement) {
          filterPanel.placement = column.filterPlacement;
        }
        filterPanel.table = table;
        filterPanel.cell = cell;
        filterPanel.column = column;
        !this.$isServer && filterPanel.$mount(document.createElement("div"));
      }
      setTimeout(() => {
        filterPanel.showPopper = true;
      }, 16);
    },
    handleHeaderClick(event, column) {
      if (!column.filters && column.sortable) {
        this.handleSortClick(event, column);
      } else if (column.filterable && !column.sortable) {
        this.handleFilterClick(event, column);
      }
      this.$parent.$emit("header-click", column, event);
    },
    handleHeaderContextMenu(event, column) {
      this.$parent.$emit("header-contextmenu", column, event);
    },
    handleMouseDown(event, column) {
      if (this.$isServer) return;
      if (column.children && column.children.length > 0) return;
      if (this.draggingColumn && this.border) {
        this.dragging = true;
        this.$parent.resizeProxyVisible = true;
        const table = this.$parent;
        const tableEl = table.$el;
        const tableLeft = tableEl.getBoundingClientRect().left;
        const columnEl = this.$el.querySelector(`th.${column.id}`);
        const columnRect = columnEl.getBoundingClientRect();
        const minLeft = columnRect.left - tableLeft + 30;
        dom.addClass(columnEl, "noclick");
        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft
        };
        const resizeProxy = table.$refs.resizeProxy;
        resizeProxy.style.left = this.dragState.startLeft + "px";
        document.onselectstart = function() {
          return false;
        };
        document.ondragstart = function() {
          return false;
        };
        const handleMouseMove = (event2) => {
          const deltaLeft = event2.clientX - this.dragState.startMouseLeft;
          const proxyLeft = this.dragState.startLeft + deltaLeft;
          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + "px";
        };
        const handleMouseUp = () => {
          if (this.dragging) {
            const {
              startColumnLeft,
              startLeft
            } = this.dragState;
            const finalLeft = parseInt(resizeProxy.style.left, 10);
            const columnWidth = finalLeft - startColumnLeft;
            column.width = column.realWidth = columnWidth;
            table.$emit("header-dragend", column.width, startLeft - startColumnLeft, column, event);
            this.store.scheduleLayout();
            document.body.style.cursor = "";
            this.dragging = false;
            this.draggingColumn = null;
            this.dragState = {};
            table.resizeProxyVisible = false;
          }
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;
          setTimeout(function() {
            dom.removeClass(columnEl, "noclick");
          }, 0);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    },
    handleMouseMove(event, column) {
      if (column.children && column.children.length > 0) return;
      let target = event.target;
      while (target && target.tagName !== "TH") {
        target = target.parentNode;
      }
      if (!column || !column.resizable) return;
      if (!this.dragging && this.border) {
        let rect = target.getBoundingClientRect();
        const bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = "col-resize";
          if (dom.hasClass(target, "is-sortable")) {
            target.style.cursor = "col-resize";
          }
          this.draggingColumn = column;
        } else if (!this.dragging) {
          bodyStyle.cursor = "";
          if (dom.hasClass(target, "is-sortable")) {
            target.style.cursor = "pointer";
          }
          this.draggingColumn = null;
        }
      }
    },
    handleMouseOut() {
      if (this.$isServer) return;
      document.body.style.cursor = "";
    },
    toggleOrder({
      order,
      sortOrders
    }) {
      if (order === "") return sortOrders[0];
      const index2 = sortOrders.indexOf(order || null);
      return sortOrders[index2 > sortOrders.length - 2 ? 0 : index2 + 1];
    },
    handleSortClick(event, column, givenOrder) {
      event.stopPropagation();
      let order = column.order === givenOrder ? null : givenOrder || this.toggleOrder(column);
      let target = event.target;
      while (target && target.tagName !== "TH") {
        target = target.parentNode;
      }
      if (target && target.tagName === "TH") {
        if (dom.hasClass(target, "noclick")) {
          dom.removeClass(target, "noclick");
          return;
        }
      }
      if (!column.sortable) return;
      const states = this.store.states;
      let sortProp = states.sortProp;
      let sortOrder;
      const sortingColumn = states.sortingColumn;
      if (sortingColumn !== column || sortingColumn === column && sortingColumn.order === null) {
        if (sortingColumn) {
          sortingColumn.order = null;
        }
        states.sortingColumn = column;
        sortProp = column.property;
      }
      if (!order) {
        sortOrder = column.order = null;
      } else {
        sortOrder = column.order = order;
      }
      states.sortProp = sortProp;
      states.sortOrder = sortOrder;
      this.store.commit("changeSortCondition");
    }
  },
  data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {}
    };
  }
};
const TableFooter = {
  name: "ElTableFooter",
  mixins: [LayoutObserver],
  render(h) {
    let sums = [];
    if (this.summaryMethod) {
      sums = this.summaryMethod({
        columns: this.columns,
        data: this.store.states.data
      });
    } else {
      this.columns.forEach((column, index2) => {
        if (index2 === 0) {
          sums[index2] = this.sumText;
          return;
        }
        const values = this.store.states.data.map((item) => Number(item[column.property]));
        const precisions = [];
        let notNumber = true;
        values.forEach((value) => {
          if (!isNaN(value)) {
            notNumber = false;
            let decimal = ("" + value).split(".")[1];
            precisions.push(decimal ? decimal.length : 0);
          }
        });
        const precision = Math.max.apply(null, precisions);
        if (!notNumber) {
          sums[index2] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index2] = "";
        }
      });
    }
    return h("table", {
      "class": "el-table__footer",
      "attrs": {
        "cellspacing": "0",
        "cellpadding": "0",
        "border": "0"
      }
    }, [h("colgroup", [this.columns.map((column) => h("col", {
      "attrs": {
        "name": column.id
      },
      "key": column.id
    })), this.hasGutter ? h("col", {
      "attrs": {
        "name": "gutter"
      }
    }) : ""]), h("tbody", {
      "class": [{
        "has-gutter": this.hasGutter
      }]
    }, [h("tr", [this.columns.map((column, cellIndex) => h("td", {
      "key": cellIndex,
      "attrs": {
        "colspan": column.colSpan,
        "rowspan": column.rowSpan
      },
      "class": [...this.getRowClasses(column, cellIndex), "el-table__cell"]
    }, [h("div", {
      "class": ["cell", column.labelClassName]
    }, [sums[cellIndex]])])), this.hasGutter ? h("th", {
      "class": "el-table__cell gutter"
    }) : ""])])]);
  },
  props: {
    fixed: String,
    store: {
      required: true
    },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    defaultSort: {
      type: Object,
      default() {
        return {
          prop: "",
          order: ""
        };
      }
    }
  },
  computed: {
    table() {
      return this.$parent;
    },
    hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth;
    },
    ...mapStates({
      columns: "columns",
      isAllSelected: "isAllSelected",
      leftFixedLeafCount: "fixedLeafColumnsLength",
      rightFixedLeafCount: "rightFixedLeafColumnsLength",
      columnsCount: (states) => states.columns.length,
      leftFixedCount: (states) => states.fixedColumns.length,
      rightFixedCount: (states) => states.rightFixedColumns.length
    })
  },
  methods: {
    isCellHidden(index2, columns, column) {
      if (this.fixed === true || this.fixed === "left") {
        return index2 >= this.leftFixedLeafCount;
      } else if (this.fixed === "right") {
        let before = 0;
        for (let i = 0; i < index2; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedLeafCount;
      } else if (!this.fixed && column.fixed) {
        return true;
      } else {
        return index2 < this.leftFixedCount || index2 >= this.columnsCount - this.rightFixedCount;
      }
    },
    getRowClasses(column, cellIndex) {
      const classes = [column.id, column.align, column.labelClassName];
      if (column.className) {
        classes.push(column.className);
      }
      if (this.isCellHidden(cellIndex, this.columns, column)) {
        classes.push("is-hidden");
      }
      if (!column.children) {
        classes.push("is-leaf");
      }
      return classes;
    }
  }
};
let tableIdSeed = 1;
const _sfc_main = {
  name: "ElTable",
  mixins: [Locale, Migrating],
  directives: {
    Mousewheel
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    size: String,
    width: [String, Number],
    height: [String, Number],
    maxHeight: [String, Number],
    fit: {
      type: Boolean,
      default: true
    },
    stripe: Boolean,
    border: Boolean,
    rowKey: [String, Function],
    context: {},
    showHeader: {
      type: Boolean,
      default: true
    },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    highlightSelectionRow: {
      type: Boolean,
      default: false
    },
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    spanMethod: Function,
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    indent: {
      type: Number,
      default: 16
    },
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: "hasChildren",
          children: "children"
        };
      }
    },
    lazy: Boolean,
    load: Function
  },
  components: {
    TableHeader,
    TableFooter,
    TableBody,
    ElCheckbox
  },
  methods: {
    getMigratingConfig() {
      return {
        events: {
          expand: "expand is renamed to expand-change"
        }
      };
    },
    setCurrentRow(row) {
      this.store.commit("setCurrentRow", row);
    },
    toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected, false);
      this.store.updateAllSelected();
    },
    toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansionAdapter(row, expanded);
    },
    clearSelection() {
      this.store.clearSelection();
    },
    clearFilter(columnKeys) {
      this.store.clearFilter(columnKeys);
    },
    clearSort() {
      this.store.clearSort();
    },
    handleMouseLeave() {
      this.store.commit("setHoverRow", null);
      if (this.hoverState) this.hoverState = null;
    },
    updateScrollY() {
      const changed = this.layout.updateScrollY();
      if (changed) {
        this.layout.notifyObservers("scrollable");
        this.layout.updateColumnsWidth();
      }
    },
    handleFixedMousewheel(event, data) {
      const bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        const currentScrollTop = bodyWrapper.scrollTop;
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault();
        }
        if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
          event.preventDefault();
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
      } else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
      }
    },
    handleHeaderFooterMousewheel(event, data) {
      const { pixelX, pixelY } = data;
      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },
    // TODO 使用 CSS transform
    syncPostion() {
      const { scrollLeft, scrollTop, offsetWidth, scrollWidth } = this.bodyWrapper;
      const { headerWrapper, footerWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this.$refs;
      if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
      if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
      if (fixedBodyWrapper) fixedBodyWrapper.scrollTop = scrollTop;
      if (rightFixedBodyWrapper) rightFixedBodyWrapper.scrollTop = scrollTop;
      const maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
      if (scrollLeft >= maxScrollLeftPosition) {
        this.scrollPosition = "right";
      } else if (scrollLeft === 0) {
        this.scrollPosition = "left";
      } else {
        this.scrollPosition = "middle";
      }
    },
    throttleSyncPostion: index.throttle(16, function() {
      this.syncPostion();
    }),
    onScroll(evt) {
      let raf = window.requestAnimationFrame;
      if (!raf) {
        this.throttleSyncPostion();
      } else {
        raf(this.syncPostion);
      }
    },
    bindEvents() {
      this.bodyWrapper.addEventListener("scroll", this.onScroll, { passive: true });
      if (this.fit) {
        resizeEvent.addResizeListener(this.$el, this.resizeListener);
      }
    },
    unbindEvents() {
      this.bodyWrapper.removeEventListener("scroll", this.onScroll, { passive: true });
      if (this.fit) {
        resizeEvent.removeResizeListener(this.$el, this.resizeListener);
      }
    },
    resizeListener() {
      if (!this.$ready) return;
      let shouldUpdateLayout = false;
      const el = this.$el;
      const { width: oldWidth, height: oldHeight } = this.resizeState;
      const width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }
      const height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }
      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doLayout();
      }
    },
    doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
    },
    sort(prop, order) {
      this.store.commit("sort", { prop, order });
    },
    toggleAllSelection() {
      this.store.commit("toggleAllSelection");
    }
  },
  computed: {
    tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
    bodyWrapper() {
      return this.$refs.bodyWrapper;
    },
    shouldUpdateHeight() {
      return this.height || this.maxHeight || this.fixedColumns.length > 0 || this.rightFixedColumns.length > 0;
    },
    bodyWidth() {
      const { bodyWidth, scrollY, gutterWidth } = this.layout;
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + "px" : "";
    },
    bodyHeight() {
      const { headerHeight = 0, bodyHeight, footerHeight = 0 } = this.layout;
      if (this.height) {
        return {
          height: bodyHeight ? bodyHeight + "px" : ""
        };
      } else if (this.maxHeight) {
        const maxHeight = util.parseHeight(this.maxHeight);
        if (typeof maxHeight === "number") {
          return {
            "max-height": maxHeight - footerHeight - (this.showHeader ? headerHeight : 0) + "px"
          };
        }
      }
      return {};
    },
    fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + "px" : ""
        };
      } else if (this.maxHeight) {
        let maxHeight = util.parseHeight(this.maxHeight);
        if (typeof maxHeight === "number") {
          maxHeight = this.layout.scrollX ? maxHeight - this.layout.gutterWidth : maxHeight;
          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }
          maxHeight -= this.layout.footerHeight;
          return {
            "max-height": maxHeight + "px"
          };
        }
      }
      return {};
    },
    fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          };
        }
        return {
          bottom: this.layout.scrollX && this.data.length ? this.layout.gutterWidth + "px" : ""
        };
      } else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight ? this.layout.tableHeight + "px" : ""
          };
        }
        return {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + "px" : ""
        };
      }
    },
    emptyBlockStyle() {
      if (this.data && this.data.length) return null;
      let height = "100%";
      if (this.layout.appendHeight) {
        height = `calc(100% - ${this.layout.appendHeight}px)`;
      }
      return {
        width: this.bodyWidth,
        height
      };
    },
    ...mapStates({
      selection: "selection",
      columns: "columns",
      tableData: "data",
      fixedColumns: "fixedColumns",
      rightFixedColumns: "rightFixedColumns"
    })
  },
  watch: {
    height: {
      immediate: true,
      handler(value) {
        this.layout.setHeight(value);
      }
    },
    maxHeight: {
      immediate: true,
      handler(value) {
        this.layout.setMaxHeight(value);
      }
    },
    currentRowKey: {
      immediate: true,
      handler(value) {
        if (!this.rowKey) return;
        this.store.setCurrentRowKey(value);
      }
    },
    data: {
      immediate: true,
      handler(value) {
        this.store.commit("setData", value);
      }
    },
    expandRowKeys: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.store.setExpandRowKeysAdapter(newVal);
        }
      }
    }
  },
  created() {
    this.tableId = "el-table_" + tableIdSeed++;
    this.debouncedUpdateLayout = index.debounce(50, () => this.doLayout());
  },
  mounted() {
    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();
    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };
    this.store.states.columns.forEach((column) => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit("filterChange", {
          column,
          values: column.filteredValue,
          silent: true
        });
      }
    });
    this.$ready = true;
  },
  destroyed() {
    this.unbindEvents();
  },
  data() {
    const { hasChildren = "hasChildren", children = "children" } = this.treeProps;
    this.store = createStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      // TreeTable 的相关配置
      indent: this.indent,
      lazy: this.lazy,
      lazyColumnIdentifier: hasChildren,
      childrenColumnName: children
    });
    const layout = new TableLayout({
      store: this.store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      layout,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: "left"
    };
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-table", class: [{
    "el-table--fit": _vm.fit,
    "el-table--striped": _vm.stripe,
    "el-table--border": _vm.border || _vm.isGroup,
    "el-table--hidden": _vm.isHidden,
    "el-table--group": _vm.isGroup,
    "el-table--fluid-height": _vm.maxHeight,
    "el-table--scrollable-x": _vm.layout.scrollX,
    "el-table--scrollable-y": _vm.layout.scrollY,
    "el-table--enable-row-hover": !_vm.store.states.isComplex,
    "el-table--enable-row-transition": (_vm.store.states.data || []).length !== 0 && (_vm.store.states.data || []).length < 100
  }, _vm.tableSize ? `el-table--${_vm.tableSize}` : ""], on: { "mouseleave": function($event) {
    return _vm.handleMouseLeave($event);
  } } }, [_c("div", { ref: "hiddenColumns", staticClass: "hidden-columns" }, [_vm._t("default")], 2), _vm.showHeader ? _c("div", { directives: [{ name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleHeaderFooterMousewheel, expression: "handleHeaderFooterMousewheel" }], ref: "headerWrapper", staticClass: "el-table__header-wrapper" }, [_c("table-header", { ref: "tableHeader", style: {
    width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + "px" : ""
  }, attrs: { "store": _vm.store, "border": _vm.border, "default-sort": _vm.defaultSort } })], 1) : _vm._e(), _c("div", { ref: "bodyWrapper", staticClass: "el-table__body-wrapper", class: [_vm.layout.scrollX ? `is-scrolling-${_vm.scrollPosition}` : "is-scrolling-none"], style: [_vm.bodyHeight] }, [_c("table-body", { style: {
    width: _vm.bodyWidth
  }, attrs: { "context": _vm.context, "store": _vm.store, "stripe": _vm.stripe, "row-class-name": _vm.rowClassName, "row-style": _vm.rowStyle, "highlight": _vm.highlightCurrentRow } }), !_vm.data || _vm.data.length === 0 ? _c("div", { ref: "emptyBlock", staticClass: "el-table__empty-block", style: _vm.emptyBlockStyle }, [_c("span", { staticClass: "el-table__empty-text" }, [_vm._t("empty", function() {
    return [_vm._v(_vm._s(_vm.emptyText || _vm.t("el.table.emptyText")))];
  })], 2)]) : _vm._e(), _vm.$slots.append ? _c("div", { ref: "appendWrapper", staticClass: "el-table__append-wrapper" }, [_vm._t("append")], 2) : _vm._e()], 1), _vm.showSummary ? _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.data && _vm.data.length > 0, expression: "data && data.length > 0" }, { name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleHeaderFooterMousewheel, expression: "handleHeaderFooterMousewheel" }], ref: "footerWrapper", staticClass: "el-table__footer-wrapper" }, [_c("table-footer", { style: {
    width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + "px" : ""
  }, attrs: { "store": _vm.store, "border": _vm.border, "sum-text": _vm.sumText || _vm.t("el.table.sumText"), "summary-method": _vm.summaryMethod, "default-sort": _vm.defaultSort } })], 1) : _vm._e(), _vm.fixedColumns.length > 0 ? _c("div", { directives: [{ name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleFixedMousewheel, expression: "handleFixedMousewheel" }], ref: "fixedWrapper", staticClass: "el-table__fixed", style: [
    {
      width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + "px" : ""
    },
    _vm.fixedHeight
  ] }, [_vm.showHeader ? _c("div", { ref: "fixedHeaderWrapper", staticClass: "el-table__fixed-header-wrapper" }, [_c("table-header", { ref: "fixedTableHeader", style: {
    width: _vm.bodyWidth
  }, attrs: { "fixed": "left", "border": _vm.border, "store": _vm.store } })], 1) : _vm._e(), _c("div", { ref: "fixedBodyWrapper", staticClass: "el-table__fixed-body-wrapper", style: [
    {
      top: _vm.layout.headerHeight + "px"
    },
    _vm.fixedBodyHeight
  ] }, [_c("table-body", { style: {
    width: _vm.bodyWidth
  }, attrs: { "fixed": "left", "store": _vm.store, "stripe": _vm.stripe, "highlight": _vm.highlightCurrentRow, "row-class-name": _vm.rowClassName, "row-style": _vm.rowStyle } }), _vm.$slots.append ? _c("div", { staticClass: "el-table__append-gutter", style: { height: _vm.layout.appendHeight + "px" } }) : _vm._e()], 1), _vm.showSummary ? _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.data && _vm.data.length > 0, expression: "data && data.length > 0" }], ref: "fixedFooterWrapper", staticClass: "el-table__fixed-footer-wrapper" }, [_c("table-footer", { style: {
    width: _vm.bodyWidth
  }, attrs: { "fixed": "left", "border": _vm.border, "sum-text": _vm.sumText || _vm.t("el.table.sumText"), "summary-method": _vm.summaryMethod, "store": _vm.store } })], 1) : _vm._e()]) : _vm._e(), _vm.rightFixedColumns.length > 0 ? _c("div", { directives: [{ name: "mousewheel", rawName: "v-mousewheel", value: _vm.handleFixedMousewheel, expression: "handleFixedMousewheel" }], ref: "rightFixedWrapper", staticClass: "el-table__fixed-right", style: [
    {
      width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + "px" : "",
      right: _vm.layout.scrollY ? (_vm.border ? _vm.layout.gutterWidth : _vm.layout.gutterWidth || 0) + "px" : ""
    },
    _vm.fixedHeight
  ] }, [_vm.showHeader ? _c("div", { ref: "rightFixedHeaderWrapper", staticClass: "el-table__fixed-header-wrapper" }, [_c("table-header", { ref: "rightFixedTableHeader", style: {
    width: _vm.bodyWidth
  }, attrs: { "fixed": "right", "border": _vm.border, "store": _vm.store } })], 1) : _vm._e(), _c("div", { ref: "rightFixedBodyWrapper", staticClass: "el-table__fixed-body-wrapper", style: [
    {
      top: _vm.layout.headerHeight + "px"
    },
    _vm.fixedBodyHeight
  ] }, [_c("table-body", { style: {
    width: _vm.bodyWidth
  }, attrs: { "fixed": "right", "store": _vm.store, "stripe": _vm.stripe, "row-class-name": _vm.rowClassName, "row-style": _vm.rowStyle, "highlight": _vm.highlightCurrentRow } }), _vm.$slots.append ? _c("div", { staticClass: "el-table__append-gutter", style: { height: _vm.layout.appendHeight + "px" } }) : _vm._e()], 1), _vm.showSummary ? _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.data && _vm.data.length > 0, expression: "data && data.length > 0" }], ref: "rightFixedFooterWrapper", staticClass: "el-table__fixed-footer-wrapper" }, [_c("table-footer", { style: {
    width: _vm.bodyWidth
  }, attrs: { "fixed": "right", "border": _vm.border, "sum-text": _vm.sumText || _vm.t("el.table.sumText"), "summary-method": _vm.summaryMethod, "store": _vm.store } })], 1) : _vm._e()]) : _vm._e(), _vm.rightFixedColumns.length > 0 ? _c("div", { ref: "rightFixedPatch", staticClass: "el-table__fixed-right-patch", style: {
    width: _vm.layout.scrollY ? _vm.layout.gutterWidth + "px" : "0",
    height: _vm.layout.headerHeight + "px"
  } }) : _vm._e(), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.resizeProxyVisible, expression: "resizeProxyVisible" }], ref: "resizeProxy", staticClass: "el-table__column-resize-proxy" })]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const ElTable = __component__.exports;
ElTable.install = function(Vue2) {
  Vue2.component(ElTable.name, ElTable);
};
module.exports = ElTable;
