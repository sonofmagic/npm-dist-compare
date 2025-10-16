"use strict";
const dom = require("element-ui/lib/utils/dom");
const util = require("element-ui/lib/utils/util");
const Popup = require("element-ui/lib/utils/popup");
const _pluginVue2_normalizer = require("./_plugin-vue2_normalizer-CLZGzUhB.cjs");
const Locale = require("element-ui/lib/mixins/locale");
const types = require("element-ui/lib/utils/types");
const index = require("./index-Cf0anSwe.cjs");
const Mode = {
  CONTAIN: {
    name: "contain",
    icon: "el-icon-full-screen"
  },
  ORIGINAL: {
    name: "original",
    icon: "el-icon-c-scale-to-original"
  }
};
const mousewheelEventName = util.isFirefox() ? "DOMMouseScroll" : "mousewheel";
const _sfc_main$1 = {
  name: "elImageViewer",
  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2e3
    },
    onSwitch: {
      type: Function,
      default: () => {
      }
    },
    onClose: {
      type: Function,
      default: () => {
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      index: this.initialIndex,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    };
  },
  computed: {
    isSingle() {
      return this.urlList.length <= 1;
    },
    isFirst() {
      return this.index === 0;
    },
    isLast() {
      return this.index === this.urlList.length - 1;
    },
    currentImg() {
      return this.urlList[this.index];
    },
    imgStyle() {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? "transform .3s" : "",
        "margin-left": `${offsetX}px`,
        "margin-top": `${offsetY}px`
      };
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = "100%";
      }
      return style;
    },
    viewerZIndex() {
      const nextZIndex = Popup.PopupManager.nextZIndex();
      return this.zIndex > nextZIndex ? this.zIndex : nextZIndex;
    }
  },
  watch: {
    index: {
      handler: function(val) {
        this.reset();
        this.onSwitch(val);
      }
    },
    currentImg(val) {
      this.$nextTick((_) => {
        const $img = this.$refs.img[0];
        if (!$img.complete) {
          this.loading = true;
        }
      });
    }
  },
  methods: {
    hide() {
      this.deviceSupportUninstall();
      this.onClose();
    },
    deviceSupportInstall() {
      this._keyDownHandler = (e) => {
        e.stopPropagation();
        const keyCode = e.keyCode;
        switch (keyCode) {
          // ESC
          case 27:
            this.hide();
            break;
          // SPACE
          case 32:
            this.toggleMode();
            break;
          // LEFT_ARROW
          case 37:
            this.prev();
            break;
          // UP_ARROW
          case 38:
            this.handleActions("zoomIn");
            break;
          // RIGHT_ARROW
          case 39:
            this.next();
            break;
          // DOWN_ARROW
          case 40:
            this.handleActions("zoomOut");
            break;
        }
      };
      this._mouseWheelHandler = util.rafThrottle((e) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          this.handleActions("zoomIn", {
            zoomRate: 0.015,
            enableTransition: false
          });
        } else {
          this.handleActions("zoomOut", {
            zoomRate: 0.015,
            enableTransition: false
          });
        }
      });
      dom.on(document, "keydown", this._keyDownHandler);
      dom.on(document, mousewheelEventName, this._mouseWheelHandler);
    },
    deviceSupportUninstall() {
      dom.off(document, "keydown", this._keyDownHandler);
      dom.off(document, mousewheelEventName, this._mouseWheelHandler);
      this._keyDownHandler = null;
      this._mouseWheelHandler = null;
    },
    handleImgLoad(e) {
      this.loading = false;
    },
    handleImgError(e) {
      this.loading = false;
      e.target.alt = "加载失败";
    },
    handleMouseDown(e) {
      if (this.loading || e.button !== 0) return;
      const { offsetX, offsetY } = this.transform;
      const startX = e.pageX;
      const startY = e.pageY;
      this._dragHandler = util.rafThrottle((ev) => {
        this.transform.offsetX = offsetX + ev.pageX - startX;
        this.transform.offsetY = offsetY + ev.pageY - startY;
      });
      dom.on(document, "mousemove", this._dragHandler);
      dom.on(document, "mouseup", (ev) => {
        dom.off(document, "mousemove", this._dragHandler);
      });
      e.preventDefault();
    },
    handleMaskClick() {
      if (this.maskClosable) {
        this.hide();
      }
    },
    reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    },
    toggleMode() {
      if (this.loading) return;
      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const index2 = modeValues.indexOf(this.mode);
      const nextIndex = (index2 + 1) % modeNames.length;
      this.mode = Mode[modeNames[nextIndex]];
      this.reset();
    },
    prev() {
      if (this.isFirst && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index - 1 + len) % len;
    },
    next() {
      if (this.isLast && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index + 1) % len;
    },
    handleActions(action, options = {}) {
      if (this.loading) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      const { transform } = this;
      switch (action) {
        case "zoomOut":
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
          }
          break;
        case "zoomIn":
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case "clocelise":
          transform.deg += rotateDeg;
          break;
        case "anticlocelise":
          transform.deg -= rotateDeg;
          break;
      }
      transform.enableTransition = enableTransition;
    }
  },
  mounted() {
    this.deviceSupportInstall();
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    this.$refs["el-image-viewer__wrapper"].focus();
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "viewer-fade" } }, [_c("div", { ref: "el-image-viewer__wrapper", staticClass: "el-image-viewer__wrapper", style: { "z-index": _vm.viewerZIndex }, attrs: { "tabindex": "-1" } }, [_c("div", { staticClass: "el-image-viewer__mask", on: { "click": function($event) {
    if ($event.target !== $event.currentTarget) return null;
    return _vm.handleMaskClick.apply(null, arguments);
  } } }), _c("span", { staticClass: "el-image-viewer__btn el-image-viewer__close", on: { "click": _vm.hide } }, [_c("i", { staticClass: "el-icon-close" })]), !_vm.isSingle ? [_c("span", { staticClass: "el-image-viewer__btn el-image-viewer__prev", class: { "is-disabled": !_vm.infinite && _vm.isFirst }, on: { "click": _vm.prev } }, [_c("i", { staticClass: "el-icon-arrow-left" })]), _c("span", { staticClass: "el-image-viewer__btn el-image-viewer__next", class: { "is-disabled": !_vm.infinite && _vm.isLast }, on: { "click": _vm.next } }, [_c("i", { staticClass: "el-icon-arrow-right" })])] : _vm._e(), _c("div", { staticClass: "el-image-viewer__btn el-image-viewer__actions" }, [_c("div", { staticClass: "el-image-viewer__actions__inner" }, [_c("i", { staticClass: "el-icon-zoom-out", on: { "click": function($event) {
    return _vm.handleActions("zoomOut");
  } } }), _c("i", { staticClass: "el-icon-zoom-in", on: { "click": function($event) {
    return _vm.handleActions("zoomIn");
  } } }), _c("i", { staticClass: "el-image-viewer__actions__divider" }), _c("i", { class: _vm.mode.icon, on: { "click": _vm.toggleMode } }), _c("i", { staticClass: "el-image-viewer__actions__divider" }), _c("i", { staticClass: "el-icon-refresh-left", on: { "click": function($event) {
    return _vm.handleActions("anticlocelise");
  } } }), _c("i", { staticClass: "el-icon-refresh-right", on: { "click": function($event) {
    return _vm.handleActions("clocelise");
  } } })])]), _c("div", { staticClass: "el-image-viewer__canvas" }, _vm._l(_vm.urlList, function(url, i) {
    return i === _vm.index ? _c("img", { key: url, ref: "img", refInFor: true, staticClass: "el-image-viewer__img", style: _vm.imgStyle, attrs: { "src": _vm.currentImg }, on: { "load": _vm.handleImgLoad, "error": _vm.handleImgError, "mousedown": _vm.handleMouseDown } }) : _vm._e();
  }), 0)], 2)]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false
);
const ImageViewer = __component__$1.exports;
const isSupportObjectFit = () => document.documentElement.style.objectFit !== void 0;
const ObjectFit = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover",
  FILL: "fill",
  SCALE_DOWN: "scale-down"
};
let prevOverflow = "";
const _sfc_main = {
  name: "ElImage",
  mixins: [Locale],
  inheritAttrs: false,
  components: {
    ImageViewer
  },
  props: {
    src: String,
    fit: String,
    lazy: Boolean,
    scrollContainer: {},
    previewSrcList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2e3
    },
    initialIndex: Number
  },
  data() {
    return {
      loading: true,
      error: false,
      show: !this.lazy,
      imageWidth: 0,
      imageHeight: 0,
      showViewer: false
    };
  },
  computed: {
    imageStyle() {
      const { fit } = this;
      if (!this.$isServer && fit) {
        return isSupportObjectFit() ? { "object-fit": fit } : this.getImageStyle(fit);
      }
      return {};
    },
    alignCenter() {
      return !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
    },
    preview() {
      const { previewSrcList } = this;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    },
    imageIndex() {
      let previewIndex = 0;
      const initialIndex = this.initialIndex;
      if (initialIndex >= 0) {
        previewIndex = initialIndex;
        return previewIndex;
      }
      const srcIndex = this.previewSrcList.indexOf(this.src);
      if (srcIndex >= 0) {
        previewIndex = srcIndex;
        return previewIndex;
      }
      return previewIndex;
    }
  },
  watch: {
    src(val) {
      this.show && this.loadImage();
    },
    show(val) {
      val && this.loadImage();
    }
  },
  mounted() {
    if (this.lazy) {
      this.addLazyLoadListener();
    } else {
      this.loadImage();
    }
  },
  beforeDestroy() {
    this.lazy && this.removeLazyLoadListener();
  },
  methods: {
    loadImage() {
      if (this.$isServer) return;
      this.loading = true;
      this.error = false;
      const img = new Image();
      img.onload = (e) => this.handleLoad(e, img);
      img.onerror = this.handleError.bind(this);
      Object.keys(this.$attrs).forEach((key) => {
        const value = this.$attrs[key];
        img.setAttribute(key, value);
      });
      img.src = this.src;
    },
    handleLoad(e, img) {
      this.imageWidth = img.width;
      this.imageHeight = img.height;
      this.loading = false;
      this.error = false;
    },
    handleError(e) {
      this.loading = false;
      this.error = true;
      this.$emit("error", e);
    },
    handleLazyLoad() {
      if (dom.isInContainer(this.$el, this._scrollContainer)) {
        this.show = true;
        this.removeLazyLoadListener();
      }
    },
    addLazyLoadListener() {
      if (this.$isServer) return;
      const { scrollContainer } = this;
      let _scrollContainer = null;
      if (types.isHtmlElement(scrollContainer)) {
        _scrollContainer = scrollContainer;
      } else if (types.isString(scrollContainer)) {
        _scrollContainer = document.querySelector(scrollContainer);
      } else {
        _scrollContainer = dom.getScrollContainer(this.$el);
      }
      if (_scrollContainer) {
        this._scrollContainer = _scrollContainer;
        this._lazyLoadHandler = index.throttle(200, this.handleLazyLoad);
        dom.on(_scrollContainer, "scroll", this._lazyLoadHandler);
        this.handleLazyLoad();
      }
    },
    removeLazyLoadListener() {
      const { _scrollContainer, _lazyLoadHandler } = this;
      if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return;
      dom.off(_scrollContainer, "scroll", _lazyLoadHandler);
      this._scrollContainer = null;
      this._lazyLoadHandler = null;
    },
    /**
     * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
     */
    getImageStyle(fit) {
      const { imageWidth, imageHeight } = this;
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight
      } = this.$el;
      if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};
      const imageAspectRatio = imageWidth / imageHeight;
      const containerAspectRatio = containerWidth / containerHeight;
      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
      }
      switch (fit) {
        case ObjectFit.NONE:
          return { width: "auto", height: "auto" };
        case ObjectFit.CONTAIN:
          return imageAspectRatio < containerAspectRatio ? { width: "auto" } : { height: "auto" };
        case ObjectFit.COVER:
          return imageAspectRatio < containerAspectRatio ? { height: "auto" } : { width: "auto" };
        default:
          return {};
      }
    },
    clickHandler() {
      if (!this.preview) {
        return;
      }
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      this.showViewer = true;
    },
    closeViewer() {
      document.body.style.overflow = prevOverflow;
      this.showViewer = false;
    }
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "el-image" }, [_vm.loading ? _vm._t("placeholder", function() {
    return [_c("div", { staticClass: "el-image__placeholder" })];
  }) : _vm.error ? _vm._t("error", function() {
    return [_c("div", { staticClass: "el-image__error" }, [_vm._v(_vm._s(_vm.t("el.image.error")))])];
  }) : _c("img", _vm._g(_vm._b({ staticClass: "el-image__inner", class: { "el-image__inner--center": _vm.alignCenter, "el-image__preview": _vm.preview }, style: _vm.imageStyle, attrs: { "src": _vm.src }, on: { "click": _vm.clickHandler } }, "img", _vm.$attrs, false), _vm.$listeners)), _vm.preview ? [_vm.showViewer ? _c("image-viewer", { attrs: { "z-index": _vm.zIndex, "initial-index": _vm.imageIndex, "on-close": _vm.closeViewer, "url-list": _vm.previewSrcList } }) : _vm._e()] : _vm._e()], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ _pluginVue2_normalizer.normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const Image$1 = __component__.exports;
Image$1.install = function(Vue) {
  Vue.component(Image$1.name, Image$1);
};
module.exports = Image$1;
