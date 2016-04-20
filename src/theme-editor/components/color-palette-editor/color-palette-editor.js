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
import { ThemeActions } from '../../../theme-editor/theme-actions'

// Components
var ColorPalette = require('../../../common/components/color-palette/color-palette.js')
var CloseBtn = require('../../../common/components/close-btn/close-btn.js')
var ReactColor = require('../../components/color-picker/color-picker.js')

// Microcomponents
var DeleteColorBtn = React.createClass({
  handleDeleteColor() {
    ThemeActions.deleteColor(this.props.value)
  },
  render: function() {
    return (
      <div className="delete-color">
        <CloseBtn onClick={this.handleDeleteColor}/>
      </div>
    )
  }
})

var AddColorForm = React.createClass({
  getInitialState: function() {
    return {
      hex: undefined,
      name: undefined
    }
  },
  handleAddColor: function() {
    if (this.state.hex && this.state.name) {
      ThemeActions.addColor(this.state.name, this.state.hex)
    } else {
      console.log('invalid values for new color name or hex')
    }
  },
  updateHex: function(e) {
    var hex = e.target.value
    // implement hex validation/notification later
    // var hexValid  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex)
    if (hex.charAt(0) === '#') {
      this.setState({ hex: hex })
    } else {
      // Add hash if user types anything in hex field
      if (hex !== '') {
        hex = "#" + hex
        this.setState({ hex: hex })
      }
    }
  },
  updateName: function(e) {
    this.setState({ name: e.target.value })
  },
  onChangeColor: function(color) {
    this.setState({ hex: color })
  },
  render: function() {
    return (
      <div className="add-color">
        <div className="color">
          <svg width="120" height="120"
               viewBox="0 0 120 120"
               xmlns="http://www.w3.org/2000/svg">
            <rect fill={this.state.hex} x="10" y="10" width="100" height="100"/>
          </svg>
          <form>
            <div className="input">
              <span className="label">Color Name</span>
              <input
                required
                placeholder="Add Color"
                value={this.state.name}
                onChange={this.updateName}
              />
            </div>
            <div className="input">
              <span className="label">Hex Code</span>
              <input
                required
                value={this.state.hex}
                onChange={this.updateHex}
                pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
              />
            </div>
            <div className="input">
              <ReactColor onChange={this.onChangeColor}></ReactColor>
            </div>
          </form>
        </div>
        <button className="button" onClick={this.handleAddColor}>Add Color</button>
      </div>
    )

  }
})

// Component
var ColorPaletteEditor = React.createClass({
  render: function() {
    var that = this
    var colors = this.props.data.map(function(color, index) {
      return (
        <div key={index} className="palette-item">
          <div className="color">
            <svg width="120" height="120"
                 viewBox="0 0 120 120"
                 xmlns="http://www.w3.org/2000/svg">
              <rect
                fill={color.get('hex')}
                x="10" y="10"
                width="100" height="100"
                stroke="silver"
                strokeWidth="1"
              />
            </svg>
            <div className="item-info">
              <p>{color.get('name')}</p>
              <DeleteColorBtn value={index}/>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="color-palette-editor">
        <h2>Color Palette Editor</h2>
        <div className="palette-container">
          {colors}
          <div className="palette-item">
            <AddColorForm />
          </div>
        </div>
      </div>
    )
  }

})

module.exports = ColorPaletteEditor
