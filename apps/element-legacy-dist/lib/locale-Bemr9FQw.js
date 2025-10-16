import { t } from "element-ui/lib/locale";
const Locale = {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
export {
  Locale as L
};
