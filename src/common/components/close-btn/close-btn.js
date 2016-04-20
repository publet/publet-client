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

// Component
var CloseBtn = React.createClass({
  render: function() {
    return (
      <img
        className="close-btn"
        name={this.props.name ? this.props.name : "close-btn"}
        value={this.props.value ? this.props.value : "close-btn"}
        src="media/close-icon-teal.png"
        onClick={this.props.onClick} />
    )
  }
})

module.exports = CloseBtn