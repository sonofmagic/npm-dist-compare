import { t } from 'element-ui/src/locale';
export default {
  methods: {
    t() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return t.apply(this, args);
    }
  }
};