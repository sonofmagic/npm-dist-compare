import { h } from "vue";
import { b as isFunction } from "./types-C2yGIQX_.js";
const DescriptionsRow = {
  name: "ElDescriptionsRow",
  props: {
    row: {
      type: Array
    }
  },
  inject: ["elDescriptions"],
  render(h2) {
    const {
      elDescriptions
    } = this;
    const row = (this.row || []).map((item) => {
      return {
        ...item,
        label: item.slots.label || item.props.label,
        ...["labelClassName", "contentClassName", "labelStyle", "contentStyle"].reduce((res, key) => {
          res[key] = item.props[key] || elDescriptions[key];
          return res;
        }, {})
      };
    });
    if (elDescriptions.direction === "vertical") {
      return h2("tbody", [h2("tr", {
        "class": "el-descriptions-row"
      }, [row.map((item) => {
        return h2("th", {
          "class": {
            "el-descriptions-item__cell": true,
            "el-descriptions-item__label": true,
            "has-colon": elDescriptions.border ? false : elDescriptions.colon,
            "is-bordered-label": elDescriptions.border,
            [item.labelClassName]: true
          },
          "style": item.labelStyle,
          "attrs": {
            "colSpan": item.props.span
          }
        }, [item.label]);
      })]), h2("tr", {
        "class": "el-descriptions-row"
      }, [row.map((item) => {
        return h2("td", {
          "class": ["el-descriptions-item__cell", "el-descriptions-item__content", item.contentClassName],
          "style": item.contentStyle,
          "attrs": {
            "colSpan": item.props.span
          }
        }, [item.slots.default]);
      })])]);
    }
    if (elDescriptions.border) {
      return h2("tbody", [h2("tr", {
        "class": "el-descriptions-row"
      }, [row.map((item) => {
        return [h2("th", {
          "class": {
            "el-descriptions-item__cell": true,
            "el-descriptions-item__label": true,
            "is-bordered-label": elDescriptions.border,
            [item.labelClassName]: true
          },
          "style": item.labelStyle,
          "attrs": {
            "colSpan": "1"
          }
        }, [item.label]), h2("td", {
          "class": ["el-descriptions-item__cell", "el-descriptions-item__content", item.contentClassName],
          "style": item.contentStyle,
          "attrs": {
            "colSpan": item.props.span * 2 - 1
          }
        }, [item.slots.default])];
      })])]);
    }
    return h2("tbody", [h2("tr", {
      "class": "el-descriptions-row"
    }, [row.map((item) => {
      return h2("td", {
        "class": "el-descriptions-item el-descriptions-item__cell",
        "attrs": {
          "colSpan": item.props.span
        }
      }, [h2("div", {
        "class": "el-descriptions-item__container"
      }, [h2("span", {
        "class": {
          "el-descriptions-item__label": true,
          "has-colon": elDescriptions.colon,
          [item.labelClassName]: true
        },
        "style": item.labelStyle
      }, [item.label]), h2("span", {
        "class": ["el-descriptions-item__content", item.contentClassName],
        "style": item.contentStyle
      }, [item.slots.default])])]);
    })])]);
  }
};
const Descriptions = {
  name: "ElDescriptions",
  components: {
    [DescriptionsRow.name]: DescriptionsRow
  },
  props: {
    border: {
      type: Boolean,
      default: false
    },
    column: {
      type: Number,
      default: 3
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    size: {
      type: String
      // validator: isValidComponentSize,
    },
    title: {
      type: String,
      default: ""
    },
    extra: {
      type: String,
      default: ""
    },
    labelStyle: {
      type: Object
    },
    contentStyle: {
      type: Object
    },
    labelClassName: {
      type: String,
      default: ""
    },
    contentClassName: {
      type: String,
      default: ""
    },
    colon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    descriptionsSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },
  provide() {
    return {
      elDescriptions: this
    };
  },
  methods: {
    getOptionProps(vnode) {
      if (vnode.componentOptions) {
        const componentOptions = vnode.componentOptions;
        const {
          propsData = {},
          Ctor = {}
        } = componentOptions;
        const props = (Ctor.options || {}).props || {};
        const res = {};
        for (const k in props) {
          const v = props[k];
          const defaultValue = v.default;
          if (defaultValue !== void 0) {
            res[k] = isFunction(defaultValue) ? defaultValue.call(vnode) : defaultValue;
          }
        }
        return {
          ...res,
          ...propsData
        };
      }
      return {};
    },
    getSlots(vnode) {
      let componentOptions = vnode.componentOptions || {};
      const children = vnode.children || componentOptions.children || [];
      const slots = {};
      children.forEach((child) => {
        if (!this.isEmptyElement(child)) {
          const name = child.data && child.data.slot || "default";
          slots[name] = slots[name] || [];
          if (child.tag === "template") {
            slots[name].push(child.children);
          } else {
            slots[name].push(child);
          }
        }
      });
      return {
        ...slots
      };
    },
    isEmptyElement(c) {
      return !(c.tag || c.text && c.text.trim() !== "");
    },
    filledNode(node, span, count, isLast = false) {
      if (!node.props) {
        node.props = {};
      }
      if (span > count) {
        node.props.span = count;
      }
      if (isLast) {
        node.props.span = count;
      }
      return node;
    },
    getRows() {
      const children = (this.$slots.default || []).filter((vnode) => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === "ElDescriptionsItem");
      const nodes = children.map((vnode) => {
        return {
          props: this.getOptionProps(vnode),
          slots: this.getSlots(vnode),
          vnode
        };
      });
      const rows = [];
      let temp = [];
      let count = this.column;
      nodes.forEach((node, index) => {
        const span = node.props.span || 1;
        if (index === children.length - 1) {
          temp.push(this.filledNode(node, span, count, true));
          rows.push(temp);
          return;
        }
        if (span < count) {
          count -= span;
          temp.push(node);
        } else {
          temp.push(this.filledNode(node, span, count));
          rows.push(temp);
          count = this.column;
          temp = [];
        }
      });
      return rows;
    }
  },
  render() {
    const {
      title,
      extra,
      border,
      descriptionsSize,
      $slots
    } = this;
    const rows = this.getRows();
    return h("div", {
      "class": "el-descriptions"
    }, [title || extra || $slots.title || $slots.extra ? h("div", {
      "class": "el-descriptions__header"
    }, [h("div", {
      "class": "el-descriptions__title"
    }, [$slots.title ? $slots.title : title]), h("div", {
      "class": "el-descriptions__extra"
    }, [$slots.extra ? $slots.extra : extra])]) : null, h("div", {
      "class": "el-descriptions__body"
    }, [h("table", {
      "class": ["el-descriptions__table", {
        "is-bordered": border
      }, descriptionsSize ? `el-descriptions--${descriptionsSize}` : ""]
    }, [rows.map((row) => h(DescriptionsRow, {
      "attrs": {
        "row": row
      }
    }))])])]);
  }
};
const _Descriptions = Descriptions;
_Descriptions.install = function install(Vue) {
  Vue.component(_Descriptions.name, _Descriptions);
};
export {
  _Descriptions as default
};
