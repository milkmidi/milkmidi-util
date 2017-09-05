export function isArray(value) {
  if (Array.isArray) {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}

export function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}

export function toDigi(value) {
  return value.toString().length === 1 ? `0${value}` : value;
}


export function toCommaNumber(num) {
  if (!isNumber(num)) {
    return '';
  }
  const numStr = num.toString();
  const floatArr = numStr.split('.');
  const intNum = floatArr[0];

  const result = intNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return result + (floatArr.length === 1 ? '' : `.${floatArr[1]}`);
}
export function pipe(...args) {
  const argsList = isArray(args[0]) ? args[0] : args;
  return initValue => argsList.reduce((value, fn) => fn(value), initValue);
}
