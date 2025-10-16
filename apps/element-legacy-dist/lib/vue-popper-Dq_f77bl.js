import { PopupManager } from "element-ui/lib/utils/popup";
let root = window;
let DEFAULTS = {
  // placement of the popper
  placement: "bottom",
  gpuAcceleration: true,
  // shift popper from its origin by the given amount of pixels (can be negative)
  offset: 0,
  // the element which will act as boundary of the popper
  boundariesElement: "viewport",
  // amount of pixel used to define a minimum distance between the boundaries and the popper
  boundariesPadding: 5,
  // popper will try to prevent overflow following this order,
  // by default, then, it could overflow on the left and on top of the boundariesElement
  preventOverflowOrder: ["left", "right", "top", "bottom"],
  // the behavior used by flip to change the placement of the popper
  flipBehavior: "flip",
  arrowElement: "[x-arrow]",
  arrowOffset: 0,
  // list of functions used to modify the offsets before they are applied to the popper
  modifiers: ["shift", "offset", "preventOverflow", "keepTogether", "arrow", "flip", "applyStyle"],
  modifiersIgnored: [],
  forceAbsolute: false
};
function Popper$1(reference, popper, options) {
  this._reference = reference.jquery ? reference[0] : reference;
  this.state = {};
  let isNotDefined = typeof popper === "undefined" || popper === null;
  let isConfig = popper && Object.prototype.toString.call(popper) === "[object Object]";
  if (isNotDefined || isConfig) {
    this._popper = this.parse(isConfig ? popper : {});
  } else {
    this._popper = popper.jquery ? popper[0] : popper;
  }
  this._options = Object.assign({}, DEFAULTS, options);
  this._options.modifiers = this._options.modifiers.map((modifier) => {
    if (this._options.modifiersIgnored.includes(modifier)) {
      return;
    }
    if (modifier === "applyStyle") {
      this._popper.setAttribute("x-placement", this._options.placement);
    }
    return this.modifiers[modifier] || modifier;
  });
  this.state.position = this._getPosition(this._popper, this._reference);
  setStyle(this._popper, { position: this.state.position, top: 0 });
  this.update();
  this._setupEventListeners();
  return this;
}
Popper$1.prototype.destroy = function() {
  this._popper.removeAttribute("x-placement");
  this._popper.style.left = "";
  this._popper.style.position = "";
  this._popper.style.top = "";
  this._popper.style[getSupportedPropertyName("transform")] = "";
  this._removeEventListeners();
  if (this._options.removeOnDestroy) {
    this._popper.remove();
  }
  return this;
};
Popper$1.prototype.update = function() {
  let data = { instance: this, styles: {} };
  data.placement = this._options.placement;
  data._originalPlacement = this._options.placement;
  data.offsets = this._getOffsets(this._popper, this._reference, data.placement);
  data.boundaries = this._getBoundaries(data, this._options.boundariesPadding, this._options.boundariesElement);
  data = this.runModifiers(data, this._options.modifiers);
  if (typeof this.state.updateCallback === "function") {
    this.state.updateCallback(data);
  }
};
Popper$1.prototype.onCreate = function(callback) {
  callback(this);
  return this;
};
Popper$1.prototype.onUpdate = function(callback) {
  this.state.updateCallback = callback;
  return this;
};
Popper$1.prototype.parse = function(config) {
  let defaultConfig = {
    tagName: "div",
    classNames: ["popper"],
    attributes: [],
    parent: root.document.body,
    content: "",
    contentType: "text",
    arrowTagName: "div",
    arrowClassNames: ["popper__arrow"],
    arrowAttributes: ["x-arrow"]
  };
  config = Object.assign({}, defaultConfig, config);
  let d = root.document;
  let popper = d.createElement(config.tagName);
  addClassNames(popper, config.classNames);
  addAttributes(popper, config.attributes);
  if (config.contentType === "node") {
    popper.appendChild(config.content.jquery ? config.content[0] : config.content);
  } else if (config.contentType === "html") {
    popper.innerHTML = config.content;
  } else {
    popper.textContent = config.content;
  }
  if (config.arrowTagName) {
    let arrow = d.createElement(config.arrowTagName);
    addClassNames(arrow, config.arrowClassNames);
    addAttributes(arrow, config.arrowAttributes);
    popper.appendChild(arrow);
  }
  let parent = config.parent.jquery ? config.parent[0] : config.parent;
  if (typeof parent === "string") {
    parent = d.querySelectorAll(config.parent);
    if (parent.length > 1) {
      console.warn(`WARNING: the given \`parent\` query(${config.parent}) matched more than one element, the first one will be used`);
    }
    if (parent.length === 0) {
      throw "ERROR: the given `parent` doesn't exists!";
    }
    parent = parent[0];
  }
  if (parent.length > 1 && parent instanceof Element === false) {
    console.warn("WARNING: you have passed as parent a list of elements, the first one will be used");
    parent = parent[0];
  }
  parent.appendChild(popper);
  return popper;
  function addClassNames(element, classNames) {
    classNames.forEach((className) => {
      element.classList.add(className);
    });
  }
  function addAttributes(element, attributes) {
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.split(":")[0], attribute.split(":")[1] || "");
    });
  }
};
Popper$1.prototype._getPosition = function(popper, reference) {
  getOffsetParent(reference);
  if (this._options.forceAbsolute) {
    return "absolute";
  }
  let isParentFixed = isFixed(reference);
  return isParentFixed ? "fixed" : "absolute";
};
Popper$1.prototype._getOffsets = function(popper, reference, placement) {
  placement = placement.split("-")[0];
  let popperOffsets = {};
  popperOffsets.position = this.state.position;
  let isParentFixed = popperOffsets.position === "fixed";
  let referenceOffsets = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), isParentFixed);
  let popperRect = getOuterSizes(popper);
  if (["right", "left"].includes(placement)) {
    popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - popperRect.height / 2;
    if (placement === "left") {
      popperOffsets.left = referenceOffsets.left - popperRect.width;
    } else {
      popperOffsets.left = referenceOffsets.right;
    }
  } else {
    popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
    if (placement === "top") {
      popperOffsets.top = referenceOffsets.top - popperRect.height;
    } else {
      popperOffsets.top = referenceOffsets.bottom;
    }
  }
  popperOffsets.width = popperRect.width;
  popperOffsets.height = popperRect.height;
  return {
    popper: popperOffsets,
    reference: referenceOffsets
  };
};
Popper$1.prototype._setupEventListeners = function() {
  this.state.updateBound = this.update.bind(this);
  root.addEventListener("resize", this.state.updateBound);
  if (this._options.boundariesElement !== "window") {
    let target = getScrollParent(this._reference);
    if (target === root.document.body || target === root.document.documentElement) {
      target = root;
    }
    target.addEventListener("scroll", this.state.updateBound);
    this.state.scrollTarget = target;
  }
};
Popper$1.prototype._removeEventListeners = function() {
  root.removeEventListener("resize", this.state.updateBound);
  if (this._options.boundariesElement !== "window" && this.state.scrollTarget) {
    this.state.scrollTarget.removeEventListener("scroll", this.state.updateBound);
    this.state.scrollTarget = null;
  }
  this.state.updateBound = null;
};
Popper$1.prototype._getBoundaries = function(data, padding, boundariesElement) {
  let boundaries = {};
  let width, height;
  if (boundariesElement === "window") {
    let body = root.document.body;
    let html = root.document.documentElement;
    height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
    boundaries = {
      top: 0,
      right: width,
      bottom: height,
      left: 0
    };
  } else if (boundariesElement === "viewport") {
    let offsetParent = getOffsetParent(this._popper);
    let scrollParent = getScrollParent(this._popper);
    let offsetParentRect = getOffsetRect(offsetParent);
    let getScrollTopValue = function(element) {
      return element == document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : element.scrollTop;
    };
    let getScrollLeftValue = function(element) {
      return element == document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : element.scrollLeft;
    };
    let scrollTop = data.offsets.popper.position === "fixed" ? 0 : getScrollTopValue(scrollParent);
    let scrollLeft = data.offsets.popper.position === "fixed" ? 0 : getScrollLeftValue(scrollParent);
    boundaries = {
      top: 0 - (offsetParentRect.top - scrollTop),
      right: root.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
      bottom: root.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
      left: 0 - (offsetParentRect.left - scrollLeft)
    };
  } else {
    if (getOffsetParent(this._popper) === boundariesElement) {
      boundaries = {
        top: 0,
        left: 0,
        right: boundariesElement.clientWidth,
        bottom: boundariesElement.clientHeight
      };
    } else {
      boundaries = getOffsetRect(boundariesElement);
    }
  }
  boundaries.left += padding;
  boundaries.right -= padding;
  boundaries.top = boundaries.top + padding;
  boundaries.bottom = boundaries.bottom - padding;
  return boundaries;
};
Popper$1.prototype.runModifiers = function(data, modifiers, ends) {
  let modifiersToRun = modifiers.slice();
  if (ends !== void 0) {
    modifiersToRun = this._options.modifiers.slice(0, getArrayKeyIndex(this._options.modifiers, ends));
  }
  modifiersToRun.forEach((modifier) => {
    if (isFunction(modifier)) {
      data = modifier.call(this, data);
    }
  });
  return data;
};
Popper$1.prototype.isModifierRequired = function(requesting, requested) {
  let index = getArrayKeyIndex(this._options.modifiers, requesting);
  return !!this._options.modifiers.slice(0, index).filter((modifier) => {
    return modifier === requested;
  }).length;
};
Popper$1.prototype.modifiers = {};
Popper$1.prototype.modifiers.applyStyle = function(data) {
  let styles = {
    position: data.offsets.popper.position
  };
  let left = Math.round(data.offsets.popper.left);
  let top = Math.round(data.offsets.popper.top);
  let prefixedProperty;
  if (this._options.gpuAcceleration && (prefixedProperty = getSupportedPropertyName("transform"))) {
    styles[prefixedProperty] = `translate3d(${left}px, ${top}px, 0)`;
    styles.top = 0;
    styles.left = 0;
  } else {
    styles.left = left;
    styles.top = top;
  }
  Object.assign(styles, data.styles);
  setStyle(this._popper, styles);
  this._popper.setAttribute("x-placement", data.placement);
  if (this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) && data.offsets.arrow) {
    setStyle(data.arrowElement, data.offsets.arrow);
  }
  return data;
};
Popper$1.prototype.modifiers.shift = function(data) {
  let placement = data.placement;
  let basePlacement = placement.split("-")[0];
  let shiftVariation = placement.split("-")[1];
  if (shiftVariation) {
    let reference = data.offsets.reference;
    let popper = getPopperClientRect(data.offsets.popper);
    let shiftOffsets = {
      y: {
        start: { top: reference.top },
        end: { top: reference.top + reference.height - popper.height }
      },
      x: {
        start: { left: reference.left },
        end: { left: reference.left + reference.width - popper.width }
      }
    };
    let axis = ["bottom", "top"].includes(basePlacement) ? "x" : "y";
    data.offsets.popper = Object.assign(popper, shiftOffsets[axis][shiftVariation]);
  }
  return data;
};
Popper$1.prototype.modifiers.preventOverflow = function(data) {
  let order = this._options.preventOverflowOrder;
  let popper = getPopperClientRect(data.offsets.popper);
  let check = {
    left() {
      let left = popper.left;
      if (popper.left < data.boundaries.left) {
        left = Math.max(popper.left, data.boundaries.left);
      }
      return { left };
    },
    right() {
      let left = popper.left;
      if (popper.right > data.boundaries.right) {
        left = Math.min(popper.left, data.boundaries.right - popper.width);
      }
      return { left };
    },
    top() {
      let top = popper.top;
      if (popper.top < data.boundaries.top) {
        top = Math.max(popper.top, data.boundaries.top);
      }
      return { top };
    },
    bottom() {
      let top = popper.top;
      if (popper.bottom > data.boundaries.bottom) {
        top = Math.min(popper.top, data.boundaries.bottom - popper.height);
      }
      return { top };
    }
  };
  order.forEach((direction) => {
    data.offsets.popper = Object.assign(popper, check[direction]());
  });
  return data;
};
Popper$1.prototype.modifiers.keepTogether = function(data) {
  let popper = getPopperClientRect(data.offsets.popper);
  let reference = data.offsets.reference;
  let f = Math.floor;
  if (popper.right < f(reference.left)) {
    data.offsets.popper.left = f(reference.left) - popper.width;
  }
  if (popper.left > f(reference.right)) {
    data.offsets.popper.left = f(reference.right);
  }
  if (popper.bottom < f(reference.top)) {
    data.offsets.popper.top = f(reference.top) - popper.height;
  }
  if (popper.top > f(reference.bottom)) {
    data.offsets.popper.top = f(reference.bottom);
  }
  return data;
};
Popper$1.prototype.modifiers.flip = function(data) {
  if (!this.isModifierRequired(this.modifiers.flip, this.modifiers.preventOverflow)) {
    console.warn("WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!");
    return data;
  }
  if (data.flipped && data.placement === data._originalPlacement) {
    return data;
  }
  let placement = data.placement.split("-")[0];
  let placementOpposite = getOppositePlacement(placement);
  let variation = data.placement.split("-")[1] || "";
  let flipOrder = [];
  if (this._options.flipBehavior === "flip") {
    flipOrder = [
      placement,
      placementOpposite
    ];
  } else {
    flipOrder = this._options.flipBehavior;
  }
  flipOrder.forEach((step, index) => {
    if (placement !== step || flipOrder.length === index + 1) {
      return;
    }
    placement = data.placement.split("-")[0];
    placementOpposite = getOppositePlacement(placement);
    let popperOffsets = getPopperClientRect(data.offsets.popper);
    let a = ["right", "bottom"].includes(placement);
    if (a && Math.floor(data.offsets.reference[placement]) > Math.floor(popperOffsets[placementOpposite]) || !a && Math.floor(data.offsets.reference[placement]) < Math.floor(popperOffsets[placementOpposite])) {
      data.flipped = true;
      data.placement = flipOrder[index + 1];
      if (variation) {
        data.placement += `-${variation}`;
      }
      data.offsets.popper = this._getOffsets(this._popper, this._reference, data.placement).popper;
      data = this.runModifiers(data, this._options.modifiers, this._flip);
    }
  });
  return data;
};
Popper$1.prototype.modifiers.offset = function(data) {
  let offset = this._options.offset;
  let popper = data.offsets.popper;
  if (data.placement.includes("left")) {
    popper.top -= offset;
  } else if (data.placement.includes("right")) {
    popper.top += offset;
  } else if (data.placement.includes("top")) {
    popper.left -= offset;
  } else if (data.placement.includes("bottom")) {
    popper.left += offset;
  }
  return data;
};
Popper$1.prototype.modifiers.arrow = function(data) {
  let arrow = this._options.arrowElement;
  let arrowOffset = this._options.arrowOffset;
  if (typeof arrow === "string") {
    arrow = this._popper.querySelector(arrow);
  }
  if (!arrow) {
    return data;
  }
  if (!this._popper.contains(arrow)) {
    console.warn("WARNING: `arrowElement` must be child of its popper element!");
    return data;
  }
  if (!this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)) {
    console.warn("WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!");
    return data;
  }
  let arrowStyle = {};
  let placement = data.placement.split("-")[0];
  let popper = getPopperClientRect(data.offsets.popper);
  let reference = data.offsets.reference;
  let isVertical = ["left", "right"].includes(placement);
  let len = isVertical ? "height" : "width";
  let side = isVertical ? "top" : "left";
  let altSide = isVertical ? "left" : "top";
  let opSide = isVertical ? "bottom" : "right";
  let arrowSize = getOuterSizes(arrow)[len];
  if (reference[opSide] - arrowSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
  }
  if (reference[side] + arrowSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowSize - popper[opSide];
  }
  let center = reference[side] + (arrowOffset || reference[len] / 2 - arrowSize / 2);
  let sideValue = center - popper[side];
  sideValue = Math.max(Math.min(popper[len] - arrowSize - 8, sideValue), 8);
  arrowStyle[side] = sideValue;
  arrowStyle[altSide] = "";
  data.offsets.arrow = arrowStyle;
  data.arrowElement = arrow;
  return data;
};
function getOuterSizes(element) {
  let _display = element.style.display;
  let _visibility = element.style.visibility;
  element.style.display = "block";
  element.style.visibility = "hidden";
  element.offsetWidth;
  let styles = root.getComputedStyle(element);
  let x = Number.parseFloat(styles.marginTop) + Number.parseFloat(styles.marginBottom);
  let y = Number.parseFloat(styles.marginLeft) + Number.parseFloat(styles.marginRight);
  let result = { width: element.offsetWidth + y, height: element.offsetHeight + x };
  element.style.display = _display;
  element.style.visibility = _visibility;
  return result;
}
function getOppositePlacement(placement) {
  let hash = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return placement.replace(/left|right|bottom|top/g, (matched) => {
    return hash[matched];
  });
}
function getPopperClientRect(popperOffsets) {
  let offsets = Object.assign({}, popperOffsets);
  offsets.right = offsets.left + offsets.width;
  offsets.bottom = offsets.top + offsets.height;
  return offsets;
}
function getArrayKeyIndex(arr, keyToFind) {
  let i = 0;
  let key;
  for (key in arr) {
    if (arr[key] === keyToFind) {
      return i;
    }
    i++;
  }
  return null;
}
function getStyleComputedProperty(element, property) {
  let css = root.getComputedStyle(element, null);
  return css[property];
}
function getOffsetParent(element) {
  let offsetParent = element.offsetParent;
  return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
}
function getScrollParent(element) {
  let parent = element.parentNode;
  if (!parent) {
    return element;
  }
  if (parent === root.document) {
    if (root.document.body.scrollTop || root.document.body.scrollLeft) {
      return root.document.body;
    } else {
      return root.document.documentElement;
    }
  }
  if (["scroll", "auto"].includes(getStyleComputedProperty(parent, "overflow")) || ["scroll", "auto"].includes(getStyleComputedProperty(parent, "overflow-x")) || ["scroll", "auto"].includes(getStyleComputedProperty(parent, "overflow-y"))) {
    return parent;
  }
  return getScrollParent(element.parentNode);
}
function isFixed(element) {
  if (element === root.document.body) {
    return false;
  }
  if (getStyleComputedProperty(element, "position") === "fixed") {
    return true;
  }
  return element.parentNode ? isFixed(element.parentNode) : element;
}
function setStyle(element, styles) {
  function is_numeric(n) {
    return n !== "" && !isNaN(Number.parseFloat(n)) && isFinite(n);
  }
  Object.keys(styles).forEach((prop) => {
    let unit = "";
    if (["width", "height", "top", "right", "bottom", "left"].includes(prop) && is_numeric(styles[prop])) {
      unit = "px";
    }
    element.style[prop] = styles[prop] + unit;
  });
}
function isFunction(functionToCheck) {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
}
function getOffsetRect(element) {
  let elementRect = {
    width: element.offsetWidth,
    height: element.offsetHeight,
    left: element.offsetLeft,
    top: element.offsetTop
  };
  elementRect.right = elementRect.left + elementRect.width;
  elementRect.bottom = elementRect.top + elementRect.height;
  return elementRect;
}
function getBoundingClientRect(element) {
  let rect = element.getBoundingClientRect();
  let isIE = navigator.userAgent.includes("MSIE");
  let rectTop = isIE && element.tagName === "HTML" ? -element.scrollTop : rect.top;
  return {
    left: rect.left,
    top: rectTop,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rectTop
  };
}
function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
  let elementRect = getBoundingClientRect(element);
  let parentRect = getBoundingClientRect(parent);
  if (fixed) {
    let scrollParent = getScrollParent(parent);
    parentRect.top += scrollParent.scrollTop;
    parentRect.bottom += scrollParent.scrollTop;
    parentRect.left += scrollParent.scrollLeft;
    parentRect.right += scrollParent.scrollLeft;
  }
  let rect = {
    top: elementRect.top - parentRect.top,
    left: elementRect.left - parentRect.left,
    bottom: elementRect.top - parentRect.top + elementRect.height,
    right: elementRect.left - parentRect.left + elementRect.width,
    width: elementRect.width,
    height: elementRect.height
  };
  return rect;
}
function getSupportedPropertyName(property) {
  let prefixes = ["", "ms", "webkit", "moz", "o"];
  for (let i = 0; i < prefixes.length; i++) {
    let toCheck = prefixes[i] ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) : property;
    if (typeof root.document.body.style[toCheck] !== "undefined") {
      return toCheck;
    }
  }
  return null;
}
if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value(target) {
      if (target === void 0 || target === null) {
        throw new TypeError("Cannot convert first argument to object");
      }
      let to = new Object(target);
      for (let i = 1; i < arguments.length; i++) {
        let nextSource = arguments[i];
        if (nextSource === void 0 || nextSource === null) {
          continue;
        }
        nextSource = new Object(nextSource);
        let keysArray = Object.keys(nextSource);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          let nextKey = keysArray[nextIndex];
          let desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}
const stop = (e) => e.stopPropagation();
const Popper = {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: true
    },
    placement: {
      type: String,
      default: "bottom"
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: {},
    popper: {},
    offset: {
      default: 0
    },
    value: Boolean,
    visibleArrow: Boolean,
    arrowOffset: {
      type: Number,
      default: 35
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    popperOptions: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false
        };
      }
    }
  },
  data() {
    return {
      showPopper: false,
      currentPlacement: ""
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.showPopper = val;
        this.$emit("input", val);
      }
    },
    showPopper(val) {
      if (this.disabled) return;
      val ? this.updatePopper() : this.destroyPopper();
      this.$emit("input", val);
    }
  },
  methods: {
    createPopper() {
      if (this.$isServer) return;
      this.currentPlacement = this.currentPlacement || this.placement;
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return;
      }
      const options = this.popperOptions;
      const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
      let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;
      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }
      if (!popper || !reference) return;
      if (this.visibleArrow) this.appendArrow(popper);
      if (this.appendToBody) document.body.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }
      options.placement = this.currentPlacement;
      options.offset = this.offset;
      options.arrowOffset = this.arrowOffset;
      this.popperJS = new Popper$1(reference, popper, options);
      this.popperJS.onCreate((_) => {
        this.$emit("created", this);
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      });
      if (typeof options.onUpdate === "function") {
        this.popperJS.onUpdate(options.onUpdate);
      }
      this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
      this.popperElm.addEventListener("click", stop);
    },
    updatePopper() {
      const popperJS = this.popperJS;
      if (popperJS) {
        popperJS.update();
        if (popperJS._popper) {
          popperJS._popper.style.zIndex = PopupManager.nextZIndex();
        }
      } else {
        this.createPopper();
      }
    },
    doDestroy(forceDestroy) {
      if (!this.popperJS || this.showPopper && !forceDestroy) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },
    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },
    resetTransformOrigin() {
      if (!this.transformOrigin) return;
      let placementMap = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      };
      let placement = this.popperJS._popper.getAttribute("x-placement").split("-")[0];
      let origin = placementMap[placement];
      this.popperJS._popper.style.transformOrigin = typeof this.transformOrigin === "string" ? this.transformOrigin : ["top", "bottom"].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`;
    },
    appendArrow(element) {
      let hash;
      if (this.appended) {
        return;
      }
      this.appended = true;
      for (let item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name;
          break;
        }
      }
      const arrow = document.createElement("div");
      if (hash) {
        arrow.setAttribute(hash, "");
      }
      arrow.setAttribute("x-arrow", "");
      arrow.className = "popper__arrow";
      element.appendChild(arrow);
    }
  },
  beforeDestroy() {
    this.doDestroy(true);
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener("click", stop);
      document.body.removeChild(this.popperElm);
    }
  },
  // call destroy in keep-alive mode
  deactivated() {
    this.$options.beforeDestroy[0].call(this);
  }
};
export {
  Popper as P
};
