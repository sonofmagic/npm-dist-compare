"use strict";
const locale = require("element-ui/lib/locale");
const Locale = {
  methods: {
    t(...args) {
      return locale.t.apply(this, args);
    }
  }
};
exports.Locale = Locale;
