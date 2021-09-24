/* eslint no-param-reassign:0 */


export function isNumber(value:any) {
  return typeof value === 'number' && isFinite(value);
}

export function toDigi(value:number | string) {
  return value.toString().length === 1 ? `0${value}` : value;
}


let queryStringObj:Record<string, string> = null;
export function queryString(name:string, queryStr = location.href) {
  if (queryStringObj) {
    return queryStringObj[name];
  }
  const reg = /[^&?]*?=[^&?]*/g;
  const founds = queryStr.match(reg);
  const queryObj = founds.reduce((obj, valueStr) => {
    const [key, value] = valueStr.split('=');
    obj[key] = value;
    return obj;
  }, {});
  queryStringObj = queryObj;
  return queryObj[name];
}


export function toCommaNumber(num:string | number):string {
  if (!isNumber(num)) {
    return '';
  }
  const numStr = num.toString();
  const floatArr = numStr.split('.');
  const intNum = floatArr[0];

  const result = intNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return result + (floatArr.length === 1 ? '' : `.${floatArr[1]}`);
}

export function pipe(...args:Function[]) {
  return (initValue:any) => args.reduce((value, fn) => fn(value), initValue);
}



export function debounce(func:Function, wait:number) {
  let timeout:number = -1;
  return function () {
    const context = this;
    const args = arguments;

    if (timeout) window.clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

export function throttle(func:Function, wait:number) {
  let previous = 0;
  return function () {
    const now = Date.now();
    const context = this;
    const args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}
