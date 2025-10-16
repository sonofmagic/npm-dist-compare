"use strict";
const helper = require("./helper-x_rsIeNY.cjs");
require("vue");
const util = require("element-ui/lib/utils/util");
const util$1 = require("./util-wNQ4L80Y.cjs");
const ElCheckbox = require("element-ui/lib/checkbox");
const cellStarts = {
  default: {
    order: ""
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: "",
    className: "el-table-column--selection"
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  }
};
const cellForced = {
  selection: {
    renderHeader: function(h, {
      store
    }) {
      return h("el-checkbox", {
        "attrs": {
          "disabled": store.states.data && store.states.data.length === 0,
          "indeterminate": store.states.selection.length > 0 && !this.isAllSelected,
          "value": this.isAllSelected
        },
        "on": {
          "input": this.toggleAllSelection
        }
      });
    },
    renderCell: function(h, {
      row,
      column,
      isSelected,
      store,
      $index
    }) {
      return h("el-checkbox", {
        "nativeOn": {
          "click": (event) => event.stopPropagation()
        },
        "attrs": {
          "value": isSelected,
          "disabled": column.selectable ? !column.selectable.call(null, row, $index) : false
        },
        "on": {
          "input": () => {
            store.commit("rowSelectedChanged", row);
          }
        }
      });
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: function(h, {
      column
    }) {
      return column.label || "#";
    },
    renderCell: function(h, {
      $index,
      column
    }) {
      let i = $index + 1;
      const index = column.index;
      if (typeof index === "number") {
        i = $index + index;
      } else if (typeof index === "function") {
        i = index($index);
      }
      return h("div", [i]);
    },
    sortable: false
  },
  expand: {
    renderHeader: function(h, {
      column
    }) {
      return column.label || "";
    },
    renderCell: function(h, {
      row,
      store,
      isExpanded
    }) {
      const classes = ["el-table__expand-icon"];
      if (isExpanded) {
        classes.push("el-table__expand-icon--expanded");
      }
      const callback = function(e) {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      return h("div", {
        "class": classes,
        "on": {
          "click": callback
        }
      }, [h("i", {
        "class": "el-icon el-icon-arrow-right"
      })]);
    },
    sortable: false,
    resizable: false,
    className: "el-table__expand-column"
  }
};
function defaultRenderCell(h, {
  row,
  column,
  $index
}) {
  const property = column.property;
  const value = property && util.getPropByPath(row, property).v;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value;
}
function treeCellPrefix(h, {
  row,
  treeNode,
  store
}) {
  if (!treeNode) return null;
  const ele = [];
  const callback = function(e) {
    e.stopPropagation();
    store.loadOrToggle(row);
  };
  if (treeNode.indent) {
    ele.push(h("span", {
      "class": "el-table__indent",
      "style": {
        "padding-left": treeNode.indent + "px"
      }
    }));
  }
  if (typeof treeNode.expanded === "boolean" && !treeNode.noLazyChildren) {
    const expandClasses = ["el-table__expand-icon", treeNode.expanded ? "el-table__expand-icon--expanded" : ""];
    let iconClasses = ["el-icon-arrow-right"];
    if (treeNode.loading) {
      iconClasses = ["el-icon-loading"];
    }
    ele.push(h("div", {
      "class": expandClasses,
      "on": {
        "click": callback
      }
    }, [h("i", {
      "class": iconClasses
    })]));
  } else {
    ele.push(h("span", {
      "class": "el-table__placeholder"
    }));
  }
  return ele;
}
let columnIdSeed = 1;
const ElTableColumn = {
  name: "ElTableColumn",
  props: {
    type: {
      type: String,
      default: "default"
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [Boolean, String],
      default: false
    },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: true
    },
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    index: [Number, Function],
    sortOrders: {
      type: Array,
      default() {
        return ["ascending", "descending", null];
      },
      validator(val) {
        return val.every((order) => ["ascending", "descending", null].indexOf(order) > -1);
      }
    }
  },
  data() {
    return {
      isSubColumn: false,
      columns: []
    };
  },
  computed: {
    owner() {
      let parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent() {
      let parent = this.$parent;
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent;
      }
      return parent;
    },
    realWidth() {
      return util$1.parseWidth(this.width);
    },
    realMinWidth() {
      return util$1.parseMinWidth(this.minWidth);
    },
    realAlign() {
      return this.align ? "is-" + this.align : null;
    },
    realHeaderAlign() {
      return this.headerAlign ? "is-" + this.headerAlign : this.realAlign;
    }
  },
  methods: {
    getPropsData(...props) {
      return props.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          cur.forEach((key) => {
            prev[key] = this[key];
          });
        }
        return prev;
      }, {});
    },
    getColumnElIndex(children, child) {
      return [].indexOf.call(children, child);
    },
    setColumnWidth(column) {
      if (this.realWidth) {
        column.width = this.realWidth;
      }
      if (this.realMinWidth) {
        column.minWidth = this.realMinWidth;
      }
      if (!column.minWidth) {
        column.minWidth = 80;
      }
      column.realWidth = column.width === void 0 ? column.minWidth : column.width;
      return column;
    },
    setColumnForcedProps(column) {
      const type = column.type;
      const source = cellForced[type] || {};
      Object.keys(source).forEach((prop) => {
        let value = source[prop];
        if (value !== void 0) {
          column[prop] = prop === "className" ? `${column[prop]} ${value}` : value;
        }
      });
      return column;
    },
    setColumnRenders(column) {
      if (this.renderHeader) {
        console.warn("[Element Warn][TableColumn]Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.");
      } else if (column.type !== "selection") {
        column.renderHeader = (h, scope) => {
          const renderHeader = this.$scopedSlots.header;
          return renderHeader ? renderHeader(scope) : column.label;
        };
      }
      let originRenderCell = column.renderCell;
      if (column.type === "expand") {
        column.renderCell = (h, data) => h("div", {
          "class": "cell"
        }, [originRenderCell(h, data)]);
        this.owner.renderExpanded = (h, data) => {
          return this.$scopedSlots.default ? this.$scopedSlots.default(data) : this.$slots.default;
        };
      } else {
        originRenderCell = originRenderCell || defaultRenderCell;
        column.renderCell = (h, data) => {
          let children = null;
          if (this.$scopedSlots.default) {
            children = this.$scopedSlots.default(data);
          } else {
            children = originRenderCell(h, data);
          }
          const prefix = treeCellPrefix(h, data);
          const props = {
            class: "cell",
            style: {}
          };
          if (column.showOverflowTooltip) {
            props.class += " el-tooltip";
            props.style = {
              width: (data.column.realWidth || data.column.width) - 1 + "px"
            };
          }
          return h("div", helper._mergeJSXProps2([{}, props]), [prefix, children]);
        };
      }
      return column;
    },
    registerNormalWatchers() {
      const props = ["label", "property", "filters", "filterMultiple", "sortable", "index", "formatter", "className", "labelClassName", "showOverflowTooltip"];
      const aliases = {
        prop: "property",
        realAlign: "align",
        realHeaderAlign: "headerAlign",
        realWidth: "width"
      };
      const allAliases = props.reduce((prev, cur) => {
        prev[cur] = cur;
        return prev;
      }, aliases);
      Object.keys(allAliases).forEach((key) => {
        const columnKey = aliases[key];
        this.$watch(key, (newVal) => {
          this.columnConfig[columnKey] = newVal;
        });
      });
    },
    registerComplexWatchers() {
      const props = ["fixed"];
      const aliases = {
        realWidth: "width",
        realMinWidth: "minWidth"
      };
      const allAliases = props.reduce((prev, cur) => {
        prev[cur] = cur;
        return prev;
      }, aliases);
      Object.keys(allAliases).forEach((key) => {
        const columnKey = aliases[key];
        this.$watch(key, (newVal) => {
          this.columnConfig[columnKey] = newVal;
          const updateColumns = columnKey === "fixed";
          this.owner.store.scheduleLayout(updateColumns);
        });
      });
    }
  },
  components: {
    ElCheckbox
  },
  beforeCreate() {
    this.row = {};
    this.column = {};
    this.$index = 0;
    this.columnId = "";
  },
  created() {
    const parent = this.columnOrTableParent;
    this.isSubColumn = this.owner !== parent;
    this.columnId = (parent.tableId || parent.columnId) + "_column_" + columnIdSeed++;
    const type = this.type || "default";
    const sortable = this.sortable === "" ? true : this.sortable;
    const defaults = {
      ...cellStarts[type],
      id: this.columnId,
      type,
      property: this.prop || this.property,
      align: this.realAlign,
      headerAlign: this.realHeaderAlign,
      showOverflowTooltip: this.showOverflowTooltip || this.showTooltipWhenOverflow,
      // filter 相关属性
      filterable: this.filters || this.filterMethod,
      filteredValue: [],
      filterPlacement: "",
      isColumnGroup: false,
      filterOpened: false,
      // sort 相关属性
      sortable,
      // index 列
      index: this.index
    };
    const basicProps = ["columnKey", "label", "className", "labelClassName", "type", "renderHeader", "formatter", "fixed", "resizable"];
    const sortProps = ["sortMethod", "sortBy", "sortOrders"];
    const selectProps = ["selectable", "reserveSelection"];
    const filterProps = ["filterMethod", "filters", "filterMultiple", "filterOpened", "filteredValue", "filterPlacement"];
    let column = this.getPropsData(basicProps, sortProps, selectProps, filterProps);
    column = util$1.mergeOptions(defaults, column);
    const chains = util$1.compose(this.setColumnRenders, this.setColumnWidth, this.setColumnForcedProps);
    column = chains(column);
    this.columnConfig = column;
    this.registerNormalWatchers();
    this.registerComplexWatchers();
  },
  mounted() {
    const owner = this.owner;
    const parent = this.columnOrTableParent;
    const children = this.isSubColumn ? parent.$el.children : parent.$refs.hiddenColumns.children;
    const columnIndex = this.getColumnElIndex(children, this.$el);
    owner.store.commit("insertColumn", this.columnConfig, columnIndex, this.isSubColumn ? parent.columnConfig : null);
  },
  destroyed() {
    if (!this.$parent) return;
    const parent = this.$parent;
    this.owner.store.commit("removeColumn", this.columnConfig, this.isSubColumn ? parent.columnConfig : null);
  },
  render(h) {
    return h("div", this.$slots.default);
  }
};
ElTableColumn.install = function(Vue) {
  Vue.component(ElTableColumn.name, ElTableColumn);
};
module.exports = ElTableColumn;
