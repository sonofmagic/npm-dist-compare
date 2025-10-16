"use strict";
const _commonjsHelpers = require("./_commonjsHelpers-DHfMLFPC.cjs");
var helper;
var hasRequiredHelper;
function requireHelper() {
  if (hasRequiredHelper) return helper;
  hasRequiredHelper = 1;
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(a) {
      for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
      return a;
    }, _extends.apply(this, arguments);
  }
  var normalMerge = ["attrs", "props", "domProps"], toArrayMerge = ["class", "style", "directives"], functionalMerge = ["on", "nativeOn"], mergeJsxProps = function(a) {
    return a.reduce(function(c, a2) {
      for (var b in a2) if (!c[b]) c[b] = a2[b];
      else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends({}, c[b], a2[b]);
      else if (-1 !== toArrayMerge.indexOf(b)) {
        var d = c[b] instanceof Array ? c[b] : [c[b]], e = a2[b] instanceof Array ? a2[b] : [a2[b]];
        c[b] = [].concat(d, e);
      } else if (-1 !== functionalMerge.indexOf(b)) {
        for (var f in a2[b]) if (c[b][f]) {
          var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]], h = a2[b][f] instanceof Array ? a2[b][f] : [a2[b][f]];
          c[b][f] = [].concat(g, h);
        } else c[b][f] = a2[b][f];
      } else if ("hook" === b) for (var i in a2[b]) c[b][i] = c[b][i] ? mergeFn(c[b][i], a2[b][i]) : a2[b][i];
      else c[b] = a2[b];
      return c;
    }, {});
  }, mergeFn = function(a, b) {
    return function() {
      a && a.apply(this, arguments), b && b.apply(this, arguments);
    };
  };
  helper = mergeJsxProps;
  return helper;
}
var helperExports = requireHelper();
const _mergeJSXProps2 = /* @__PURE__ */ _commonjsHelpers.getDefaultExportFromCjs(helperExports);
exports._mergeJSXProps2 = _mergeJSXProps2;
