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

var React = require('react')
var cx = require('classnames')

var ColorPalette = React.createClass({
  render: function() {
    var activeBG = this.props.value
    var paletteLabel = <span />
    if (this.props.label) {
      paletteLabel = (
        <div className="palette-label">
          <label>{this.props.label}</label>
        </div>
      )
    }
    return (
      <div className="color-palette">
        {paletteLabel}
        <div className={this.props.label ? "palette" : "palette fullwidth"}>
          <div className="palette-grid">
            {
              this.props.palette.map(function(color, i) {
              var active = false
              if (color.get('hex') === activeBG) {
                active = true
              }
              var classes = cx({
                'palette-item': true,
                'active': active
              })

              return (
                <div
                  name={this.props.name}
                  value={color.get('hex')}
                  key={i}
                  className={classes}
                  onClick={this.props.onChange}
                >
                  <div className="color">
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                      <circle
                        className="palette-color"
                        cx="10" cy="10" r="10"
                        fill={color.get('hex')}
                      />
                    </svg>
                  </div>
                  <div className="label">
                    <label>{color.get('name')}</label>
                  </div>
                </div>
              );
            }, this)
          }

          </div>
        </div>
      </div>
    )
  }
})

module.exports = ColorPalette