import Emitter from "element-ui/lib/mixins/emitter";
import { n as normalizeComponent } from "./_plugin-vue2_normalizer-DGsclbVT.js";
const keyCode = Object.freeze({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
});
const _sfc_main = {
  name: "ElRadioGroup",
  componentName: "ElRadioGroup",
  inject: {
    elFormItem: {
      default: ""
    }
  },
  mixins: [Emitter],
  props: {
    value: {},
    size: String,
    fill: String,
    textColor: String,
    disabled: Boolean
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    _elTag() {
      let tag = (this.$vnode.data || {}).tag;
      if (!tag || tag === "component") tag = "div";
      return tag;
    },
    radioGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },
  created() {
    this.$on("handleChange", (value) => {
      this.$emit("change", value);
    });
  },
  mounted() {
    const radios = this.$el.querySelectorAll("[type=radio]");
    const firstLabel = this.$el.querySelectorAll("[role=radio]")[0];
    if (![].some.call(radios, (radio) => radio.checked) && firstLabel) {
      firstLabel.tabIndex = 0;
    }
  },
  methods: {
    handleKeydown(e) {
      const target = e.target;
      const className = target.nodeName === "INPUT" ? "[type=radio]" : "[role=radio]";
      const radios = this.$el.querySelectorAll(className);
      const length = radios.length;
      const index = [].indexOf.call(radios, target);
      const roleRadios = this.$el.querySelectorAll("[role=radio]");
      switch (e.keyCode) {
        case keyCode.LEFT:
        case keyCode.UP:
          e.stopPropagation();
          e.preventDefault();
          if (index === 0) {
            roleRadios[length - 1].click();
            roleRadios[length - 1].focus();
          } else {
            roleRadios[index - 1].click();
            roleRadios[index - 1].focus();
          }
          break;
        case keyCode.RIGHT:
        case keyCode.DOWN:
          if (index === length - 1) {
            e.stopPropagation();
            e.preventDefault();
            roleRadios[0].click();
            roleRadios[0].focus();
          } else {
            roleRadios[index + 1].click();
            roleRadios[index + 1].focus();
          }
          break;
      }
    }
  },
  watch: {
    value(value) {
      this.dispatch("ElFormItem", "el.form.change", [this.value]);
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c(_vm._elTag, { tag: "component", staticClass: "el-radio-group", attrs: { "role": "radiogroup" }, on: { "keydown": _vm.handleKeydown } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false
);
const RadioGroup = __component__.exports;
RadioGroup.install = function(Vue) {
  Vue.component(RadioGroup.name, RadioGroup);
};
export {
  RadioGroup as default
};
