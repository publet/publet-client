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

/*
  HEY HEY HEY BIG DEPRECIATION NOTICE READ ME DAMNIT

  So, this approach to modals won't work past this version
  of react. In fact, since stateful components are classes
  in es2015 and do not support mixins, this approach is
  probably a dead end. This is kept in for legacy support
  in article editor, theme editor, and sandbox.

  Kill this w/ fire for the refactor. --AB, 11/23/2015
*/

var React = require('react')
var ReactDom = require('react-dom')

var LayeredComponent = {
  componentWillUnmount: function() {
    this._unrenderLayer();
    document.body.removeChild(this._target)
  },
  componentDidUpdate: function() {
      this._renderLayer()
  },
  componentDidMount: function() {
    // Appending to the body is easier than managing the z-index of everything on the page.
    // It's also better for accessibility and makes stacking a snap (since components will stack
    // in mount order).
    this._target = document.createElement('div');
    document.body.appendChild(this._target);
    this._renderLayer()
  },
  _renderLayer: function() {
    // By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
    // creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
    // entirely different part of the page.
    ReactDom.render(this.renderLayer(), this._target)
  },
  _unrenderLayer: function() {
    ReactDom.unmountComponentAtNode(this._target)
  }
}

module.exports = LayeredComponent