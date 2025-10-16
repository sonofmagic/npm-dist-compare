import { kebabCase } from 'element-ui/src/utils/util';
/**
 * Show migrating guide in browser console.
 *
 * Usage:
 * import Migrating from 'element-ui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */
export default {
  mounted() {
    if (process.env.NODE_ENV === 'production') return;
    if (!this.$vnode) return;
    var {
      props = {},
      events = {}
    } = this.getMigratingConfig();
    var {
      data,
      componentOptions
    } = this.$vnode;
    var definedProps = data.attrs || {};
    var definedEvents = componentOptions.listeners || {};
    for (var propName in definedProps) {
      propName = kebabCase(propName); // compatible with camel case
      if (props[propName]) {
        console.warn("[Element Migrating][".concat(this.$options.name, "][Attribute]: ").concat(props[propName]));
      }
    }
    for (var eventName in definedEvents) {
      eventName = kebabCase(eventName); // compatible with camel case
      if (events[eventName]) {
        console.warn("[Element Migrating][".concat(this.$options.name, "][Event]: ").concat(events[eventName]));
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {},
        events: {}
      };
    }
  }
};