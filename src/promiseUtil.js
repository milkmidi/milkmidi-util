/*
 * promiseSerial resolves Promises sequentially.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * const funcs = urls.map(url => () => $.ajax(url))
 *
 * promiseSerial(funcs)
 *   .then(console.log)
 *   .catch(console.error)
 */
export const promiseSerial = (funcs:Function[]):Promise => funcs.reduce(
  (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))),
  Promise.resolve([]),
);

export const delay = (time:number):Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, time);
});
