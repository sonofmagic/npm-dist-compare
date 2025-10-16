import { t } from "element-ui/lib/locale";
let fecha = {};
let token = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
let twoDigits = "\\d\\d?";
let threeDigits = "\\d{3}";
let fourDigits = "\\d{4}";
let word = "[^\\s]+";
let literal = /\[([\s\S]*?)\]/g;
let noop = function() {
};
function regexEscape(str) {
  return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}
function shorten(arr, sLen) {
  let newArr = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i].substr(0, sLen));
  }
  return newArr;
}
function monthUpdate(arrName) {
  return function(d, v, i18n) {
    let index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
    if (~index) {
      d.month = index;
    }
  };
}
function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = `0${val}`;
  }
  return val;
}
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthNamesShort = shorten(monthNames, 3);
let dayNamesShort = shorten(dayNames, 3);
fecha.i18n = {
  dayNamesShort,
  dayNames,
  monthNamesShort,
  monthNames,
  amPm: ["am", "pm"],
  DoFn: function DoFn(D) {
    return D + ["th", "st", "nd", "rd"][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
  }
};
let formatFlags = {
  D(dateObj) {
    return dateObj.getDay();
  },
  DD(dateObj) {
    return pad(dateObj.getDay());
  },
  Do(dateObj, i18n) {
    return i18n.DoFn(dateObj.getDate());
  },
  d(dateObj) {
    return dateObj.getDate();
  },
  dd(dateObj) {
    return pad(dateObj.getDate());
  },
  ddd(dateObj, i18n) {
    return i18n.dayNamesShort[dateObj.getDay()];
  },
  dddd(dateObj, i18n) {
    return i18n.dayNames[dateObj.getDay()];
  },
  M(dateObj) {
    return dateObj.getMonth() + 1;
  },
  MM(dateObj) {
    return pad(dateObj.getMonth() + 1);
  },
  MMM(dateObj, i18n) {
    return i18n.monthNamesShort[dateObj.getMonth()];
  },
  MMMM(dateObj, i18n) {
    return i18n.monthNames[dateObj.getMonth()];
  },
  yy(dateObj) {
    return pad(String(dateObj.getFullYear()), 4).substr(2);
  },
  yyyy(dateObj) {
    return pad(dateObj.getFullYear(), 4);
  },
  h(dateObj) {
    return dateObj.getHours() % 12 || 12;
  },
  hh(dateObj) {
    return pad(dateObj.getHours() % 12 || 12);
  },
  H(dateObj) {
    return dateObj.getHours();
  },
  HH(dateObj) {
    return pad(dateObj.getHours());
  },
  m(dateObj) {
    return dateObj.getMinutes();
  },
  mm(dateObj) {
    return pad(dateObj.getMinutes());
  },
  s(dateObj) {
    return dateObj.getSeconds();
  },
  ss(dateObj) {
    return pad(dateObj.getSeconds());
  },
  S(dateObj) {
    return Math.round(dateObj.getMilliseconds() / 100);
  },
  SS(dateObj) {
    return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
  },
  SSS(dateObj) {
    return pad(dateObj.getMilliseconds(), 3);
  },
  a(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
  },
  A(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
  },
  ZZ(dateObj) {
    let o = dateObj.getTimezoneOffset();
    return (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
  }
};
let parseFlags = {
  d: [twoDigits, function(d, v) {
    d.day = v;
  }],
  Do: [twoDigits + word, function(d, v) {
    d.day = Number.parseInt(v, 10);
  }],
  M: [twoDigits, function(d, v) {
    d.month = v - 1;
  }],
  yy: [twoDigits, function(d, v) {
    let da = /* @__PURE__ */ new Date();
    let cent = +`${da.getFullYear()}`.substr(0, 2);
    d.year = `${v > 68 ? cent - 1 : cent}${v}`;
  }],
  h: [twoDigits, function(d, v) {
    d.hour = v;
  }],
  m: [twoDigits, function(d, v) {
    d.minute = v;
  }],
  s: [twoDigits, function(d, v) {
    d.second = v;
  }],
  yyyy: [fourDigits, function(d, v) {
    d.year = v;
  }],
  S: ["\\d", function(d, v) {
    d.millisecond = v * 100;
  }],
  SS: ["\\d{2}", function(d, v) {
    d.millisecond = v * 10;
  }],
  SSS: [threeDigits, function(d, v) {
    d.millisecond = v;
  }],
  D: [twoDigits, noop],
  ddd: [word, noop],
  MMM: [word, monthUpdate("monthNamesShort")],
  MMMM: [word, monthUpdate("monthNames")],
  a: [word, function(d, v, i18n) {
    let val = v.toLowerCase();
    if (val === i18n.amPm[0]) {
      d.isPm = false;
    } else if (val === i18n.amPm[1]) {
      d.isPm = true;
    }
  }],
  ZZ: ["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z", function(d, v) {
    let parts = `${v}`.match(/([+-]|\d\d)/g);
    let minutes;
    if (parts) {
      minutes = +(parts[1] * 60) + Number.parseInt(parts[2], 10);
      d.timezoneOffset = parts[0] === "+" ? minutes : -minutes;
    }
  }]
};
parseFlags.dd = parseFlags.d;
parseFlags.dddd = parseFlags.ddd;
parseFlags.DD = parseFlags.D;
parseFlags.mm = parseFlags.m;
parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
parseFlags.MM = parseFlags.M;
parseFlags.ss = parseFlags.s;
parseFlags.A = parseFlags.a;
fecha.masks = {
  default: "ddd MMM dd yyyy HH:mm:ss",
  shortDate: "M/D/yy",
  mediumDate: "MMM d, yyyy",
  longDate: "MMMM d, yyyy",
  fullDate: "dddd, MMMM d, yyyy",
  shortTime: "HH:mm",
  mediumTime: "HH:mm:ss",
  longTime: "HH:mm:ss.SSS"
};
fecha.format = function(dateObj, mask, i18nSettings) {
  let i18n = i18nSettings || fecha.i18n;
  if (typeof dateObj === "number") {
    dateObj = new Date(dateObj);
  }
  if (Object.prototype.toString.call(dateObj) !== "[object Date]" || isNaN(dateObj.getTime())) {
    throw new Error("Invalid Date in fecha.format");
  }
  mask = fecha.masks[mask] || mask || fecha.masks.default;
  let literals = [];
  mask = mask.replace(literal, ($0, $1) => {
    literals.push($1);
    return "@@@";
  });
  mask = mask.replace(token, ($0) => {
    return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
  });
  return mask.replace(/@@@/g, () => {
    return literals.shift();
  });
};
fecha.parse = function(dateStr, format, i18nSettings) {
  let i18n = i18nSettings || fecha.i18n;
  if (typeof format !== "string") {
    throw new TypeError("Invalid format in fecha.parse");
  }
  format = fecha.masks[format] || format;
  if (dateStr.length > 1e3) {
    return null;
  }
  let dateInfo = {};
  let parseInfo = [];
  let literals = [];
  format = format.replace(literal, ($0, $1) => {
    literals.push($1);
    return "@@@";
  });
  let newFormat = regexEscape(format).replace(token, ($0) => {
    if (parseFlags[$0]) {
      let info = parseFlags[$0];
      parseInfo.push(info[1]);
      return `(${info[0]})`;
    }
    return $0;
  });
  newFormat = newFormat.replace(/@@@/g, () => {
    return literals.shift();
  });
  let matches = dateStr.match(new RegExp(newFormat, "i"));
  if (!matches) {
    return null;
  }
  for (let i = 1; i < matches.length; i++) {
    parseInfo[i - 1](dateInfo, matches[i], i18n);
  }
  let today = /* @__PURE__ */ new Date();
  if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }
  let date;
  if (dateInfo.timezoneOffset != null) {
    dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
    date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1, dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
  } else {
    date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1, dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
  }
  return date;
};
const weeks = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
function newArray(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
function getI18nSettings() {
  return {
    dayNamesShort: weeks.map((week) => t(`el.datepicker.weeks.${week}`)),
    dayNames: weeks.map((week) => t(`el.datepicker.weeks.${week}`)),
    monthNamesShort: months.map((month) => t(`el.datepicker.months.${month}`)),
    monthNames: months.map((month, index) => t(`el.datepicker.month${index + 1}`)),
    amPm: ["am", "pm"]
  };
}
function toDate(date) {
  return isDate(date) ? new Date(date) : null;
}
function isDate(date) {
  if (date === null || date === void 0) {
    return false;
  }
  if (isNaN(new Date(date).getTime())) {
    return false;
  }
  if (Array.isArray(date)) {
    return false;
  }
  return true;
}
function isDateObject(val) {
  return val instanceof Date;
}
function formatDate(date, format) {
  date = toDate(date);
  if (!date) {
    return "";
  }
  return fecha.format(date, format || "yyyy-MM-dd", getI18nSettings());
}
function parseDate(string, format) {
  return fecha.parse(string, format || "yyyy-MM-dd", getI18nSettings());
}
function getDayCountOfMonth(year, month) {
  if (isNaN(+month)) {
    return 31;
  }
  return new Date(year, +month + 1, 0).getDate();
}
function getDayCountOfYear(year) {
  const isLeapYear = year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
  return isLeapYear ? 366 : 365;
}
function getFirstDayOfMonth(date) {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
}
function prevDate(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
}
function nextDate(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}
function getStartDateOfMonth(year, month) {
  const result = new Date(year, month, 1);
  const day = result.getDay();
  if (day === 0) {
    return prevDate(result, 7);
  } else {
    return prevDate(result, day);
  }
}
function getWeekNumber(src) {
  if (!isDate(src)) {
    return null;
  }
  const date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
}
function getRangeHours(ranges) {
  const hours = [];
  let disabledHours = [];
  (ranges || []).forEach((range2) => {
    const value = range2.map((date) => date.getHours());
    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });
  if (disabledHours.length) {
    for (let i = 0; i < 24; i++) {
      hours[i] = !disabledHours.includes(i);
    }
  } else {
    for (let i = 0; i < 24; i++) {
      hours[i] = false;
    }
  }
  return hours;
}
function getPrevMonthLastDays(date, amount) {
  if (amount <= 0) {
    return [];
  }
  const temp = new Date(date.getTime());
  temp.setDate(0);
  const lastDay = temp.getDate();
  return range(amount).map((_, index) => lastDay - (amount - index - 1));
}
function getMonthDays(date) {
  const temp = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const days = temp.getDate();
  return range(days).map((_, index) => index + 1);
}
function setRangeData(arr, start, end, value) {
  for (let i = start; i < end; i++) {
    arr[i] = value;
  }
}
function getRangeMinutes(ranges, hour) {
  const minutes = Array.from({ length: 60 });
  if (ranges.length > 0) {
    ranges.forEach((range2) => {
      const start = range2[0];
      const end = range2[1];
      const startHour = start.getHours();
      const startMinute = start.getMinutes();
      const endHour = end.getHours();
      const endMinute = end.getMinutes();
      if (startHour === hour && endHour !== hour) {
        setRangeData(minutes, startMinute, 60, true);
      } else if (startHour === hour && endHour === hour) {
        setRangeData(minutes, startMinute, endMinute + 1, true);
      } else if (startHour !== hour && endHour === hour) {
        setRangeData(minutes, 0, endMinute + 1, true);
      } else if (startHour < hour && endHour > hour) {
        setRangeData(minutes, 0, 60, true);
      }
    });
  } else {
    setRangeData(minutes, 0, 60, true);
  }
  return minutes;
}
function range(n) {
  return Array.apply(null, { length: n }).map((_, n2) => n2);
}
function modifyDate(date, y, m, d) {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
function modifyTime(date, h, m, s) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, s, date.getMilliseconds());
}
function modifyWithTimeString(date, time) {
  if (date == null || !time) {
    return date;
  }
  time = parseDate(time, "HH:mm:ss");
  return modifyTime(date, time.getHours(), time.getMinutes(), time.getSeconds());
}
function clearTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function clearMilliseconds(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
}
function limitTimeRange(date, ranges, format = "HH:mm:ss") {
  if (ranges.length === 0) {
    return date;
  }
  const normalizeDate = (date2) => fecha.parse(fecha.format(date2, format), format);
  const ndate = normalizeDate(date);
  const nranges = ranges.map((range2) => range2.map(normalizeDate));
  if (nranges.some((nrange) => ndate >= nrange[0] && ndate <= nrange[1])) {
    return date;
  }
  let minDate = nranges[0][0];
  let maxDate = nranges[0][0];
  nranges.forEach((nrange) => {
    minDate = new Date(Math.min(nrange[0], minDate));
    maxDate = new Date(Math.max(nrange[1], minDate));
  });
  const ret = ndate < minDate ? minDate : maxDate;
  return modifyDate(
    ret,
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}
function timeWithinRange(date, selectableRange, format) {
  const limitedDate = limitTimeRange(date, selectableRange, format);
  return limitedDate.getTime() === date.getTime();
}
function changeYearMonthAndClampDate(date, year, month) {
  const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
}
function prevMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 0 ? changeYearMonthAndClampDate(date, year - 1, 11) : changeYearMonthAndClampDate(date, year, month - 1);
}
function nextMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 11 ? changeYearMonthAndClampDate(date, year + 1, 0) : changeYearMonthAndClampDate(date, year, month + 1);
}
function prevYear(date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
}
function nextYear(date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
}
function extractDateFormat(format) {
  return format.replace(/\W?m{1,2}|\W?ZZ/g, "").replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, "").trim();
}
function extractTimeFormat(format) {
  return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, "").trim();
}
function validateRangeInOneMonth(start, end) {
  return start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
}
export {
  getRangeHours as A,
  limitTimeRange as B,
  getPrevMonthLastDays as C,
  getMonthDays as D,
  fecha as E,
  getI18nSettings as F,
  validateRangeInOneMonth as G,
  getFirstDayOfMonth as a,
  getDayCountOfMonth as b,
  getStartDateOfMonth as c,
  clearTime as d,
  prevMonth as e,
  prevYear as f,
  getWeekNumber as g,
  nextMonth as h,
  isDate as i,
  nextYear as j,
  modifyWithTimeString as k,
  parseDate as l,
  modifyTime as m,
  nextDate as n,
  modifyDate as o,
  prevDate as p,
  formatDate as q,
  extractDateFormat as r,
  extractTimeFormat as s,
  range as t,
  getDayCountOfYear as u,
  timeWithinRange as v,
  changeYearMonthAndClampDate as w,
  clearMilliseconds as x,
  isDateObject as y,
  getRangeMinutes as z
};
