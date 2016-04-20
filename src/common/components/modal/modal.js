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

// Mixins
var ScrollLock = require('../scroll-lock/scroll-lock')

// SOURCE
// http://jsfiddle.net/LBAr8/ --Alex, 6/20/2015

var Modal = React.createClass({
  mixins: [ScrollLock],

  killClick: function(e) {
    // clicks on the content shouldn't close the modal
    e.stopPropagation()
  },
  handleBackdropClick: function() {
    // when you click the background, the user is requesting that the modal gets closed.
    // note that the modal has no say over whether it actually gets closed. the owner of the
    // modal owns the state. this just "asks" to be closed.
    this.props.onRequestClose()
  },
  render: function() {
    return (
      <div className="ModalBackdrop" onClick={this.handleBackdropClick}>
        <div className="ModalContent" onClick={this.killClick}>
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Modal