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

var GateFormInput = React.createClass({
  render() {
    if (this.props.type === 'textarea') {
      return (
        <div className="full form-input">
          <div className="input">
            <span className="label">{this.props.name}</span>
              <textarea
                name={this.props.name}
                className="field"
                value={this.props.value}
                onChange={this.props.onChange}
              />
          </div>
        </div>
      )
    }
    return (
      <div className="full form-input">
        <div className="input">
          <span className="label">{this.props.name}</span>
            <input
              name={this.props.name}
              className="field"
              type={this.props.type}
              value={this.props.value}
              onChange={this.props.onChange}
            />
        </div>
      </div>
    )
  }
})

module.exports = GateFormInput
