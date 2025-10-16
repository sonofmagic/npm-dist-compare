// @ts-nocheck
import { t } from 'element-ui/src/locale';
import fecha from 'element-ui/src/utils/date';
var weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
function newArray(start, end) {
  var result = [];
  for (var i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
export function getI18nSettings() {
  return {
    dayNamesShort: weeks.map(week => t("el.datepicker.weeks.".concat(week))),
    dayNames: weeks.map(week => t("el.datepicker.weeks.".concat(week))),
    monthNamesShort: months.map(month => t("el.datepicker.months.".concat(month))),
    monthNames: months.map((month, index) => t("el.datepicker.month".concat(index + 1))),
    amPm: ['am', 'pm']
  };
}
export function toDate(date) {
  return isDate(date) ? new Date(date) : null;
}
export function isDate(date) {
  if (date === null || date === undefined) {
    return false;
  }
  if (isNaN(new Date(date).getTime())) {
    return false;
  }
  if (Array.isArray(date)) {
    return false;
  } // deal with `new Date([ new Date() ]) -> new Date()`
  return true;
}
export function isDateObject(val) {
  return val instanceof Date;
}
export function formatDate(date, format) {
  date = toDate(date);
  if (!date) {
    return '';
  }
  return fecha.format(date, format || 'yyyy-MM-dd', getI18nSettings());
}
export function parseDate(string, format) {
  return fecha.parse(string, format || 'yyyy-MM-dd', getI18nSettings());
}
export function getDayCountOfMonth(year, month) {
  if (isNaN(+month)) {
    return 31;
  }
  return new Date(year, +month + 1, 0).getDate();
}
export function getDayCountOfYear(year) {
  var isLeapYear = year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
  return isLeapYear ? 366 : 365;
}
export function getFirstDayOfMonth(date) {
  var temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
}

// see: https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript
// {prev, next} Date should work for Daylight Saving Time
// Adding 24 * 60 * 60 * 1000 does not work in the above scenario
export function prevDate(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
}
export function nextDate(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}
export function getStartDateOfMonth(year, month) {
  var result = new Date(year, month, 1);
  var day = result.getDay();
  if (day === 0) {
    return prevDate(result, 7);
  } else {
    return prevDate(result, day);
  }
}
export function getWeekNumber(src) {
  if (!isDate(src)) {
    return null;
  }
  var date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
export function getRangeHours(ranges) {
  var hours = [];
  var disabledHours = [];
  (ranges || []).forEach(range => {
    var value = range.map(date => date.getHours());
    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });
  if (disabledHours.length) {
    for (var i = 0; i < 24; i++) {
      hours[i] = !disabledHours.includes(i);
    }
  } else {
    for (var _i = 0; _i < 24; _i++) {
      hours[_i] = false;
    }
  }
  return hours;
}
export function getPrevMonthLastDays(date, amount) {
  if (amount <= 0) {
    return [];
  }
  var temp = new Date(date.getTime());
  temp.setDate(0);
  var lastDay = temp.getDate();
  return range(amount).map((_, index) => lastDay - (amount - index - 1));
}
export function getMonthDays(date) {
  var temp = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var days = temp.getDate();
  return range(days).map((_, index) => index + 1);
}
function setRangeData(arr, start, end, value) {
  for (var i = start; i < end; i++) {
    arr[i] = value;
  }
}
export function getRangeMinutes(ranges, hour) {
  var minutes = Array.from({
    length: 60
  });
  if (ranges.length > 0) {
    ranges.forEach(range => {
      var start = range[0];
      var end = range[1];
      var startHour = start.getHours();
      var startMinute = start.getMinutes();
      var endHour = end.getHours();
      var endMinute = end.getMinutes();
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
export function range(n) {
  // see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
  return Array.apply(null, {
    length: n
  }).map((_, n) => n);
}
export function modifyDate(date, y, m, d) {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
export function modifyTime(date, h, m, s) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, s, date.getMilliseconds());
}
export function modifyWithTimeString(date, time) {
  if (date == null || !time) {
    return date;
  }
  time = parseDate(time, 'HH:mm:ss');
  return modifyTime(date, time.getHours(), time.getMinutes(), time.getSeconds());
}
export function clearTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
export function clearMilliseconds(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
}
export function limitTimeRange(date, ranges) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'HH:mm:ss';
  // TODO: refactory a more elegant solution
  if (ranges.length === 0) {
    return date;
  }
  var normalizeDate = date => fecha.parse(fecha.format(date, format), format);
  var ndate = normalizeDate(date);
  var nranges = ranges.map(range => range.map(normalizeDate));
  if (nranges.some(nrange => ndate >= nrange[0] && ndate <= nrange[1])) {
    return date;
  }
  var minDate = nranges[0][0];
  var maxDate = nranges[0][0];
  nranges.forEach(nrange => {
    minDate = new Date(Math.min(nrange[0], minDate));
    maxDate = new Date(Math.max(nrange[1], minDate));
  });
  var ret = ndate < minDate ? minDate : maxDate;
  // preserve Year/Month/Date
  return modifyDate(ret, date.getFullYear(), date.getMonth(), date.getDate());
}
export function timeWithinRange(date, selectableRange, format) {
  var limitedDate = limitTimeRange(date, selectableRange, format);
  return limitedDate.getTime() === date.getTime();
}
export function changeYearMonthAndClampDate(date, year, month) {
  // clamp date to the number of days in `year`, `month`
  // eg: (2010-1-31, 2010, 2) => 2010-2-28
  var monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
}
export function prevMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  return month === 0 ? changeYearMonthAndClampDate(date, year - 1, 11) : changeYearMonthAndClampDate(date, year, month - 1);
}
export function nextMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  return month === 11 ? changeYearMonthAndClampDate(date, year + 1, 0) : changeYearMonthAndClampDate(date, year, month + 1);
}
export function prevYear(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var year = date.getFullYear();
  var month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
}
export function nextYear(date) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var year = date.getFullYear();
  var month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
}
export function extractDateFormat(format) {
  return format.replace(/\W?m{1,2}|\W?ZZ/g, '').replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '').trim();
}
export function extractTimeFormat(format) {
  return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '').trim();
}
export function validateRangeInOneMonth(start, end) {
  return start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
}