import "vue";
import { r as removeResizeListener, a as addResizeListener } from "./resize-event-v8kLSIyU.js";
import { s as scrollbarWidth } from "./scrollbar-width-DBGsBGf6.js";
import { t as toObject } from "./util-_v-3H2Ts.js";
import { c as off, o as on } from "./dom-5kqU03Ls.js";
const BAR_MAP = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
};
function renderThumbStyle({ move, size, bar }) {
  const style = {};
  const translate = `translate${bar.axis}(${move}%)`;
  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;
  return style;
}
const Bar = {
  name: "Bar",
  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },
  computed: {
    bar() {
      return BAR_MAP[this.vertical ? "vertical" : "horizontal"];
    },
    wrap() {
      return this.$parent.wrap;
    }
  },
  render(h) {
    const {
      size,
      move,
      bar
    } = this;
    return h("div", {
      "class": ["el-scrollbar__bar", "is-" + bar.key],
      "on": {
        "mousedown": this.clickTrackHandler
      }
    }, [h("div", {
      "ref": "thumb",
      "class": "el-scrollbar__thumb",
      "on": {
        "mousedown": this.clickThumbHandler
      },
      "style": renderThumbStyle({
        size,
        move,
        bar
      })
    })]);
  },
  methods: {
    clickThumbHandler(e) {
      if (e.ctrlKey || e.button === 2) {
        return;
      }
      this.startDrag(e);
      this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    },
    clickTrackHandler(e) {
      const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      const thumbHalf = this.$refs.thumb[this.bar.offset] / 2;
      const thumbPositionPercentage = (offset - thumbHalf) * 100 / this.$el[this.bar.offset];
      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    },
    startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;
      on(document, "mousemove", this.mouseMoveDocumentHandler);
      on(document, "mouseup", this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    },
    mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      const prevPage = this[this.bar.axis];
      if (!prevPage) return;
      const offset = (this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1;
      const thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage;
      const thumbPositionPercentage = (offset - thumbClickPosition) * 100 / this.$el[this.bar.offset];
      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    },
    mouseUpDocumentHandler(e) {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, "mousemove", this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  },
  destroyed() {
    off(document, "mouseup", this.mouseUpDocumentHandler);
  }
};
const Scrollbar = {
  name: "ElScrollbar",
  components: {
    Bar
  },
  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean,
    // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: "div"
    }
  },
  data() {
    return {
      sizeWidth: "0",
      sizeHeight: "0",
      moveX: 0,
      moveY: 0
    };
  },
  computed: {
    wrap() {
      return this.$refs.wrap;
    }
  },
  render(h) {
    let gutter = scrollbarWidth();
    let style = this.wrapStyle;
    if (gutter) {
      const gutterWith = `-${gutter}px`;
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;
      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle);
        style.marginRight = style.marginBottom = gutterWith;
      } else if (typeof this.wrapStyle === "string") {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    const view = h(this.tag, {
      class: ["el-scrollbar__view", this.viewClass],
      style: this.viewStyle,
      ref: "resize"
    }, this.$slots.default);
    const wrap = h("div", {
      "ref": "wrap",
      "style": style,
      "on": {
        "scroll": this.handleScroll
      },
      "class": [this.wrapClass, "el-scrollbar__wrap", gutter ? "" : "el-scrollbar__wrap--hidden-default"]
    }, [[view]]);
    let nodes;
    if (!this.native) {
      nodes = [wrap, h(Bar, {
        "attrs": {
          "move": this.moveX,
          "size": this.sizeWidth
        }
      }), h(Bar, {
        "attrs": {
          "vertical": true,
          "move": this.moveY,
          "size": this.sizeHeight
        }
      })];
    } else {
      nodes = [h("div", {
        "ref": "wrap",
        "class": [this.wrapClass, "el-scrollbar__wrap"],
        "style": style
      }, [[view]])];
    }
    return h("div", {
      class: "el-scrollbar"
    }, nodes);
  },
  methods: {
    handleScroll() {
      const wrap = this.wrap;
      this.moveY = wrap.scrollTop * 100 / wrap.clientHeight;
      this.moveX = wrap.scrollLeft * 100 / wrap.clientWidth;
    },
    update() {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap;
      if (!wrap) return;
      heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;
      this.sizeHeight = heightPercentage < 100 ? heightPercentage + "%" : "";
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + "%" : "";
    }
  },
  mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },
  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  }
};
const _Scrollbar = Scrollbar;
_Scrollbar.install = function install(Vue) {
  Vue.component(_Scrollbar.name, _Scrollbar);
};
export {
  _Scrollbar as default
};
