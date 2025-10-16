"use strict";
function Focus(ref) {
  return {
    methods: {
      focus() {
        this.$refs[ref].focus();
      }
    }
  };
}
exports.Focus = Focus;
