import { k as kebabCase } from "./util-_v-3H2Ts.js";
const Migrating = {
  mounted() {
    if (process.env.NODE_ENV === "production") return;
    if (!this.$vnode) return;
    const { props = {}, events = {} } = this.getMigratingConfig();
    const { data, componentOptions } = this.$vnode;
    const definedProps = data.attrs || {};
    const definedEvents = componentOptions.listeners || {};
    for (let propName in definedProps) {
      propName = kebabCase(propName);
      if (props[propName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Attribute]: ${props[propName]}`);
      }
    }
    for (let eventName in definedEvents) {
      eventName = kebabCase(eventName);
      if (events[eventName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Event]: ${events[eventName]}`);
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
export {
  Migrating as M
};
