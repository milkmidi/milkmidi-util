'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
2017 08 03
@version 1.0.1
*/

var validateListener = function validateListener(listener, fnName) {
  if (typeof listener !== 'function') {
    throw new Error('Phaser.Signal: listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
  }
};
var indexOfListener = function indexOfListener(listeners, listener, context) {
  var n = listeners.length;
  var cur = void 0;
  while (n--) {
    // eslint-disable-line
    cur = listeners[n];
    if (cur.listener === listener && cur.context === context) {
      return n;
    }
  }
  return -1;
};

var Slot = function () {
  /**
   * @param  {Signal} signal
   * @param  {Function} listener
   * @param  {object} context
   * @param  {boolean} onece
   */
  function Slot(signal, listener, context) {
    var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Slot);

    this.signal = signal;
    this.listener = listener;
    this.context = context;
    this.once = once;
    this.destroyed = false;
  }

  _createClass(Slot, [{
    key: 'execute',
    value: function execute() {
      if (this.destroyed) {
        return;
      }

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.listener.apply(this.context, args);
      if (this.once) {
        this.remove();
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (this.destroyed) {
        return;
      }
      this.signal.remove(this.listener);
    }
    /**
     * @internal function
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.signal = null;
      this.listener = null;
      this.context = null;
      this.destroyed = true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '[Slot destroyed:' + this.destroyed + ']';
    }
  }]);

  return Slot;
}();

var Signal = function () {
  function Signal() {
    _classCallCheck(this, Signal);

    this.enabled = true;
    this.destroyed = false;
    /**
     * @type {Slot[]}
     */
    this.listeners = [];
  }
  /**
   * @param  {function} listener 偵聽的函式
   * @param  {any} context
   * @return {Slot}
   */


  _createClass(Signal, [{
    key: 'add',
    value: function add(listener, context) {
      validateListener(listener, 'add');
      return this.registerListener(listener, context, false);
    }
    /**
     * @param  {function} listener
     * @param  {any} context
     * @return {Slot}
     */

  }, {
    key: 'addOnce',
    value: function addOnce(listener, context) {
      validateListener(listener, 'add');
      return this.registerListener(listener, context, true);
    }

    /**
     * @param  {function} listener
     * @param  {any} context
     * @param  {boolean} isOnce
     * @return {Slot}
     */

  }, {
    key: 'registerListener',
    value: function registerListener(listener, context, isOnce) {
      var index = indexOfListener(this.listeners, listener, context);
      var slot = void 0;
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

  }, {
    key: 'remove',
    value: function remove(listener, context) {
      validateListener(listener, 'remove');
      var i = indexOfListener(this.listeners, listener, context);
      if (i !== -1) {
        this.listeners[i].destroy();
        this.listeners.splice(i, 1);
      }
      return listener;
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      var n = this.listeners.length;
      if (n === 0) {
        return;
      }
      this.listeners.forEach(function (slot) {
        return slot.destroy();
      });
      this.listeners.length = 0;
    }
  }, {
    key: 'dispatch',
    value: function dispatch() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (!this.enabled) {
        return;
      }
      this.listeners.forEach(function (slot) {
        return slot.execute.apply(slot, args);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.destroyed) {
        return;
      }
      this.removeAll();
      this.listeners.length = 0;
      delete this.listeners;
      this.destroyed = true;
    }
    /**
     * @return {number} This is the result
     */

  }, {
    key: 'getNumListeners',
    value: function getNumListeners() {
      return this.listeners.length;
    }
    /**
     * @return {string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return '[Signal enabled:' + this.enabled + ' numListeners:' + this.numListeners + ']';
    }
  }]);

  return Signal;
}();

module.exports = Signal;