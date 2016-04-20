/*
 * Publet --- online publishing platform
 * Copyright (C) 2016, Publet Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Dependencies
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// imported stuff from react-scroll-lock
var cancelScrollEvent = function (e) {
  e.stopImmediatePropagation();
  e.preventDefault();
  e.returnValue = false;
  return false;
};

var addScrollEventListener = function (elem, handler) {
  elem.addEventListener('wheel', handler, false);
};

var removeScrollEventListener = function (elem, handler) {
  elem.removeEventListener('wheel', handler, false);
};

export function withScrollLock(ComposedComponent) {
  return class ScrollLock extends Component {
    componentDidMount() {
      this.scrollLock()
    }
    componentDidUpdate() {
      this.scrollLock()
    }
    componentWillUnmount() {
      this.scrollRelease()
    }
    scrollLock() {
      var elem = ReactDOM.findDOMNode(this)
      if (elem) {
        addScrollEventListener(elem, this.onScrollHandler);
      }
    }
    scrollRelease() {
      var elem = ReactDOM.findDOMNode(this)
      if (elem) {
        removeScrollEventListener(elem, this.onScrollHandler)
      }
    }
    onScrollHandler(e) {
      var elem = ReactDOM.findDOMNode(this)
      var scrollTop = elem.scrollTop
      var scrollHeight = elem.scrollHeight
      var height = elem.clientHeight
      var wheelDelta = e.deltaY
      var isDeltaPositive = wheelDelta > 0

      if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
        elem.scrollTop = scrollHeight
        return cancelScrollEvent(e)
      }
      else if (!isDeltaPositive && -wheelDelta > scrollTop) {
        elem.scrollTop = 0
        return cancelScrollEvent(e);
      }
    }
    render() {
      return <ComposedComponent {...this.props} />
    }
  }
}

// Component attempt 1
const ScrollLockComponent = ComposedComponent => class extends Component {
  componentDidMount() {
    this.scrollLock()
  }
  componentDidUpdate() {
    this.scrollLock()
  }
  componentWillUnmount() {
    this.scrollRelease()
  }
  scrollLock() {
    var elem = ReactDOM.findDOMNode(this)
    if (elem) {
      addScrollEventListener(elem, this.onScrollHandler);
    }
  }
  scrollRelease() {
    var elem = ReactDOM.findDOMNode(this)
    if (elem) {
      removeScrollEventListener(elem, this.onScrollHandler)
    }
  }
  onScrollHandler(e) {
    var elem = ReactDOM.findDOMNode(this)
    var scrollTop = elem.scrollTop
    var scrollHeight = elem.scrollHeight
    var height = elem.clientHeight
    var wheelDelta = e.deltaY
    var isDeltaPositive = wheelDelta > 0

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      elem.scrollTop = scrollHeight
      return cancelScrollEvent(e)
    }
    else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      elem.scrollTop = 0
      return cancelScrollEvent(e);
    }
  }
  render() {
    return <ComposedComponent {...this.props} />
  }
}