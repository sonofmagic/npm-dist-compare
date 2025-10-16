// @ts-nocheck
import { hasOwn } from 'element-ui/src/utils/util';
var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
export default function (Vue) {
  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (args.length === 1 && typeof args[0] === 'object') {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      var result;
      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      } else {
        result = hasOwn(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }
        return result;
      }
    });
  }
  return template;
}