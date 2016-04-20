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
var React = require('react')

// Actions
var ThemeActions = require('../../../theme-editor/theme-actions.js')

// Component
var DeleteStyleBtn = React.createClass({
  handleDelete: function(e) {
    var styleType = e.target.name
    var styleName = e.target.value
    ThemeActions.deleteStyle(styleType, styleName)
  },
  render: function() {
    return (
      <div className="delete">
        <button
          name={this.props.styleType}
          value={this.props.styleName}
          className="button delete"
          onClick={this.handleDelete}
        >
          X
        </button>
      </div>
    )
  }
})

module.exports = DeleteStyleBtn
