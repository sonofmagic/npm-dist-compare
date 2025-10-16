import "vue";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const _sfc_main = {
  name: "ElTag",
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: "light",
      validator(val) {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      }
    }
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit("close", event);
    },
    handleClick(event) {
      this.$emit("click", event);
    }
  },
  computed: {
    tagSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },
  render(h) {
    const {
      type,
      tagSize,
      hit,
      effect
    } = this;
    const classes = ["el-tag", type ? `el-tag--${type}` : "", tagSize ? `el-tag--${tagSize}` : "", effect ? `el-tag--${effect}` : "", hit && "is-hit"];
    const tagEl = h("span", {
      "class": classes,
      "style": {
        backgroundColor: this.color
      },
      "on": {
        "click": this.handleClick
      }
    }, [this.$slots.default, this.closable && h("i", {
      "class": "el-tag__close el-icon-close",
      "on": {
        "click": this.handleClose
      }
    })]);
    return this.disableTransitions ? tagEl : h("transition", {
      "attrs": {
        "name": "el-zoom-in-center"
      }
    }, [tagEl]);
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
const ElTag = __component__.exports;
ElTag.install = function(Vue) {
  Vue.component(ElTag.name, ElTag);
};
export {
  ElTag as default
};
