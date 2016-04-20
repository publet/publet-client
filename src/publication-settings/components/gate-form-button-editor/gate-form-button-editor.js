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
var ReactTabs = require('react-tabs')

// Actions
import { PublicationActions } from '../../publication-actions.js';

//Components
var ColorPalette = require('../../../common/components/color-palette/color-palette.js')
var Tab = ReactTabs.Tab
var Tabs = ReactTabs.Tabs
var TabList = ReactTabs.TabList
var TabPanel = ReactTabs.TabPanel

// Functions
String.prototype.capitalizeFirstLetter = function(string) {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// Component
var GateFormButtonEditor = React.createClass({
  getInitialState() {
    return {
      tabSelectIndex: 0
    }
  },
  handleStyleChange(event) {
    var property = event.target.name
    var value = event.target.value
    // if value/property are undefined, try using currentTarget instead
    if (property === undefined || value === undefined) {
      var property = event.currentTarget.getAttribute('name')
      var value = event.currentTarget.getAttribute('value')
    }
    PublicationActions.updateGateCta(property, value)
  },
  handleFontSelect(e) {
    var fonts = this.props.theme.get('fonts').toJS()
    PublicationActions.updateGateCta('fontFamily', fonts[e.target.value].fontFamily)
  },
  handleTabSelect: function(index, last) {
    this.setState({tabSelectIndex: index})
  },
  render() {
    // Populate available fonts & set selected
    var fonts = this.props.theme.get('fonts').toJS()
    var fontOptions = []
    fonts.map(function(fontObj, index) {
      var fontOption = <option key={index} value={index}>{fontObj.name}</option>
      fontOptions.push(fontOption)
    })
    // Populate available font-sizes & set selected
    var fontSizeOptions = []
    var selectedFontSize = this.state.workingFontSize
    this.props.theme.get('fontSizes').toJS().map(function(size, index) {
      var fontSizeOption = <option key={index} value={size}>{size}</option>
      fontSizeOptions.push(fontSizeOption)
    })
    return (
      <div className="gate-form-button">
        <h4>Gate Call-to-Action</h4>
        <div className="button-style-edit">
          <form className="typography">
            <div className="input">
              <span className="label">Font</span>
              <select
                className="field"
                value={this.props.cta.getIn(['style','fontFamily'], null)}
                onChange={this.handleFontSelect}
              >
                {fontOptions}
              </select>
            </div>
            <div className="inline-input">
              <div className="input">
                <span className="label">Size</span>
                <select
                  name="fontSize"
                  className="field"
                  value={this.props.cta.getIn(['style','fontSize'], null)}
                  onChange={this.handleStyleChange}
                >
                  {fontSizeOptions}
                </select>
              </div>
              <div className="input">
                <span className="label">Rounded Corners</span>
                <select
                  name="borderRadius"
                  className="field"
                  value={this.props.cta.getIn(['style','borderRadius'], null)}
                  onChange={this.handleStyleChange}
                >
                  <option value="0px">No rounding</option>
                  <option value="2px">Slight rounding</option>
                  <option value="4px">Moderate rounding</option>
                  <option value="10px">Heavy rounding</option>
                  <option value="20px">Very heavy rounding</option>
                </select>
              </div>
            </div>
            <div className="inline-input">
              <div className="input">
                <span className="label">Caps</span>
                <select
                  name="textTransform"
                  className="field"
                  value={this.props.cta.getIn(['style','textTransform'], null)}
                  onChange={this.handleStyleChange}
                >
                  <option value="none">None</option>
                  <option value="capitalize">Capitalize</option>
                  <option value="lowercase">lowercase</option>
                  <option value="uppercase">CAPSLOCK</option>
                </select>
              </div>
              <div className="input">
                <span className="label">Spacing</span>
                <select
                  name="letterSpacing"
                  className="field"
                  value={this.props.cta.getIn(['style','letterSpacing'], null)}
                  onChange={this.handleStyleChange}
                >
                  <option value="0.1px">0.1px</option>
                  <option value="0.3px">0.3px</option>
                  <option value="0.5px">0.5px</option>
                  <option value="0.7px">0.7px</option>
                  <option value="1.0px">1.0px</option>
                  <option value="1.5px">1.5px</option>
                  <option value="2.0px">2.0px</option>
                  <option value="2.5px">2.5px</option>
                </select>
              </div>
            </div>
            <div className="inline-input">
              <div className="input">
                <span className="label">Border Width</span>
                <select
                  name="borderWidth"
                  className="field"
                  value={this.props.cta.getIn(['style','borderWidth'], null)}
                  onChange={this.handleStyleChange}
                >
                  <option value="0px">0px (no border)</option>
                  <option value="1px">1px</option>
                  <option value="2px">2px</option>
                  <option value="3px">3px</option>
                  <option value="4px">4px</option>
                  <option value="5px">5px</option>
                  <option value="6px">6px</option>
                </select>
              </div>
              <div className="input">
                <span className="label">Border Style</span>
                <select
                  name="borderStyle"
                  className="field"
                  value={this.props.cta.getIn(['style','borderStyle'], null)}
                  onChange={this.handleStyleChange}
                >
                  <option value="">No Border</option>
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="Dotted">Dotted</option>
                </select>
              </div>
            </div>
            <div className="inline-input">
              <div className="input">
                <span className="label">Button Width</span>
                <select
                  name="minWidth"
                  className="field"
                  value={this.props.cta.getIn(['style','minWidth'], null)}
                  onChange={this.handleStyleChange}
                >
                  <option value="auto">Automatic</option>
                  <option value="25%">Small</option>
                  <option value="50%">Medium</option>
                  <option value="75%">Large</option>
                  <option value="100%">Full Width</option>
                </select>
              </div>
              <div className="input">
                <span className="label">Button Padding</span>
                <select
                  name="padding"
                  className="field"
                  value={this.props.cta.getIn(['style','padding'], null)}
                  onChange={this.handleStyleChange}
                >
                  <option value="0px">0px</option>
                  <option value="4px">4px</option>
                  <option value="8px">8px</option>
                  <option value="12px">12px</option>
                  <option value="16px">16px</option>
                  <option value="24px">24px</option>
                  <option value="32px">32px</option>
                </select>
              </div>
            </div>
            <div className="inline-input">

              <div className="input">
              </div>
            </div>
          </form>

          <div className="color-select">
            <Tabs onSelect={this.handleTabSelect} selectedIndex={this.state.tabSelectIndex}>
              <TabList>
                <Tab>Text Color</Tab>
                <Tab>Border Color</Tab>
                <Tab>Button Color</Tab>
              </TabList>
              <TabPanel>
                <ColorPalette
                  name="color"
                  value={this.props.cta.getIn(['style','color'], null)}
                  palette={this.props.theme.get('palette')}
                  onChange={this.handleStyleChange}
                />
              </TabPanel>
              <TabPanel>
                <ColorPalette
                  name="borderColor"
                  value={this.props.cta.getIn(['style','borderColor'], null)}
                  palette={this.props.theme.get('palette')}
                  onChange={this.handleStyleChange}
                />
              </TabPanel>
              <TabPanel>
                <ColorPalette
                  name="backgroundColor"
                  value={this.props.cta.getIn(['style','backgroundColor'], null)}
                  palette={this.props.theme.get('palette')}
                  onChange={this.handleStyleChange}
                />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = GateFormButtonEditor
