define('mock-socket/event-target', ['exports', 'mock-socket/helpers/array-helpers'], function (exports, _mockSocketHelpersArrayHelpers) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  /*
  * EventTarget is an interface implemented by objects that can
  * receive events and may have listeners for them.
  *
  * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
  */

  var EventTarget = (function () {
    function EventTarget() {
      _classCallCheck(this, EventTarget);

      this.listeners = {};
    }

    /*
    * Ties a listener function to a event type which can later be invoked via the
    * dispatchEvent method.
    *
    * @param {string} type - the type of event (ie: 'open', 'message', etc.)
    * @param {function} listener - the callback function to invoke whenever a event is dispatched matching the given type
    * @param {boolean} useCapture - N/A TODO: implement useCapture functionality
    */

    EventTarget.prototype.addEventListener = function addEventListener(type, listener /* , useCapture */) {
      if (typeof listener === 'function') {
        if (!Array.isArray(this.listeners[type])) {
          this.listeners[type] = [];
        }

        // Only add the same function once
        if ((0, _mockSocketHelpersArrayHelpers.filter)(this.listeners[type], function (item) {
          return item === listener;
        }).length === 0) {
          this.listeners[type].push(listener);
        }
      }
    };

    /*
    * Removes the listener so it will no longer be invoked via the dispatchEvent method.
    *
    * @param {string} type - the type of event (ie: 'open', 'message', etc.)
    * @param {function} listener - the callback function to invoke whenever a event is dispatched matching the given type
    * @param {boolean} useCapture - N/A TODO: implement useCapture functionality
    */

    EventTarget.prototype.removeEventListener = function removeEventListener(type, removingListener /* , useCapture */) {
      var arrayOfListeners = this.listeners[type];
      this.listeners[type] = (0, _mockSocketHelpersArrayHelpers.reject)(arrayOfListeners, function (listener) {
        return listener === removingListener;
      });
    };

    /*
    * Invokes all listener functions that are listening to the given event.type property. Each
    * listener will be passed the event as the first argument.
    *
    * @param {object} event - event object which will be passed to all listeners of the event.type property
    */

    EventTarget.prototype.dispatchEvent = function dispatchEvent(event) {
      var _this = this;

      for (var _len = arguments.length, customArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        customArguments[_key - 1] = arguments[_key];
      }

      var eventName = event.type;
      var listeners = this.listeners[eventName];

      if (!Array.isArray(listeners)) {
        return false;
      }

      listeners.forEach(function (listener) {
        if (customArguments.length > 0) {
          listener.apply(_this, customArguments);
        } else {
          listener.call(_this, event);
        }
      });
    };

    return EventTarget;
  })();

  exports['default'] = EventTarget;
});