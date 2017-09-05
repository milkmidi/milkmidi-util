'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;
exports.isNumber = isNumber;
exports.toCommaNumber = toCommaNumber;
exports.pipe = pipe;
function isArray(value) {
  if (Array.isArray) {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}

function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

function toCommaNumber(num) {
  if (!isNumber(num)) {
    return '';
  }
  var numStr = num.toString();
  var floatArr = numStr.split('.');
  var intNum = floatArr[0];

  var result = intNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return result + (floatArr.length === 1 ? '' : '.' + floatArr[1]);
}
function pipe() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var argsList = isArray(args[0]) ? args[0] : args;
  return function (initValue) {
    return argsList.reduce(function (value, fn) {
      return fn(value);
    }, initValue);
  };
}