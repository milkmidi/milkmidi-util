/**
2017 08 03
@version 1.0.1
*/

const validateListener = (listener:Function, fnName:string) => {
  if (typeof listener !== 'function') {
    throw new Error('Phaser.Signal: listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
  }
};
const indexOfListener = (listeners:Function[], listener, context:any) => {
  let n = listeners.length;
  let cur;
  while (n--) {// eslint-disable-line
    cur = listeners[n];
    if (cur.listener === listener && cur.context === context) {
      return n;
    }
  }
  return -1;
};

class Slot {
  /**
   * @param  {Signal} signal
   * @param  {Function} listener
   * @param  {object} context
   * @param  {boolean} onece
   */
  constructor(private signal, private listener, private context,private  once = false) {
    this.signal = signal;
    this.listener = listener;
    this.context = context;
    this.once = once;
    this.destroyed = false;
  }
  execute(...args) {
    if (this.destroyed) {
      return;
    }
    this.listener.apply(this.context, args);
    if (this.once) {
      this.remove();
    }
  }
  remove() {
    if (this.destroyed) {
      return;
    }
    this.signal.remove(this.listener);
  }
  /**
   * @internal function
   */
  destroy() {
    this.signal = null;
    this.listener = null;
    this.context = null;
    this.destroyed = true;
  }
  toString() {
    return `[Slot destroyed:${this.destroyed}]`;
  }
}


class Signal {
  public enabled: boolean;
  public destroyed: boolean;
  private listeners: Slot[];
  constructor() {
    this.enabled = true;
    this.destroyed = false;
    this.listeners = [];
  }
  /**
   * @param  {function} listener 偵聽的函式
   * @param  {any} context
   * @return {Slot}
   */
  add(listener:Function, context:any) {
    validateListener(listener, 'add');
    return this.registerListener(listener, context, false);
  }
  /**
   * @param  {function} listener
   * @param  {any} context
   * @return {Slot}
   */
  addOnce(listener:Function, context:any) {
    validateListener(listener, 'add');
    return this.registerListener(listener, context, true);
  }

  /**
   * @param  {function} listener
   * @param  {any} context
   * @param  {boolean} isOnce
   * @return {Slot}
   */
  registerListener(listener:Function, context:any, isOnce = false) {
    const index = indexOfListener(this.listeners, listener, context);
    let slot;
    if (index !== -1) {
      slot = this.listeners[index];
    } else {
      slot = new Slot(this, listener, context, isOnce);
      this.listeners.push(slot);
    }
    return slot;
  }

  /**
   * @param  {function} listener
   * @param  {any} context
   * @return {function}
   */
  remove(listener, context) {
    validateListener(listener, 'remove');
    const i = indexOfListener(this.listeners, listener, context);
    if (i !== -1) {
      this.listeners[i].destroy();
      this.listeners.splice(i, 1);
    }
    return listener;
  }
  removeAll() {
    const n = this.listeners.length;
    if (n === 0) {
      return;
    }
    this.listeners.forEach(slot => slot.destroy());
    this.listeners.length = 0;
  }
  dispatch(...args) {
    if (!this.enabled) {
      return;
    }
    this.listeners.forEach(slot => slot.execute(...args));
  }
  destroy() {
    if (this.destroyed) { return; }
    this.removeAll();
    this.listeners.length = 0;
    delete this.listeners;
    this.destroyed = true;
  }
  /**
   * @return {number} This is the result
   */
  getNumListeners() {
    return this.listeners.length;
  }
  /**
   * @return {string}
   */
  toString() {
    return `[Signal enabled:${this.enabled} numListeners:${this.numListeners}]`;
  }
}

export default Signal;
