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
var Reflux = require('reflux')
var ScrollLock = require('../../../common/components/scroll-lock/scroll-lock')
var ReactTabs = require('react-tabs')

// Actions
import { ThemeActions } from '../../../theme-editor/theme-actions'

// Stores
var ThemeStore = require('../../../theme-editor/components/theme/theme-store')

// Mixins
var LayeredComponent = require('../../../common/mixins/layered-component/layered-component')

// Components
var Tab = ReactTabs.Tab
var Tabs = ReactTabs.Tabs
var TabList = ReactTabs.TabList
var TabPanel = ReactTabs.TabPanel
var Modal = require('../../../common/components/modal/modal.js')
var ColorPalette = require('../../../common/components/color-palette/color-palette.js')
var CustomQuill = require('../../../article-editor/components/block-types/text-block/custom-quill.js')

// Functions
String.prototype.capitalizeFirstLetter = function(string) {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// Component
var EditButtonStyle = React.createClass({
  mixins: [Reflux.ListenerMixin, LayeredComponent, ScrollLock],

  getInitialState: function() {
    var buttonStyles = this.props.theme.get('buttonStyles').toJS()
    var defaultStyleName = this.props.selectedStyle
    if (defaultStyleName === "new style") {
      var defaultStyle = buttonStyles["default"].style
    } else {
      var defaultStyle = buttonStyles[defaultStyleName].style
    }
    return {
      shown: false,
      modalShown: false,
      selectedFontIndex: 0,
      tabSelectIndex: 0,

      workingStyle: defaultStyle,
      workingStyleName: defaultStyleName,

      workingPadding: defaultStyle.padding,
      workingWidth: defaultStyle.width,
      workingBackgroundColor: defaultStyle.backgroundColor,

      workingBorderWidth: defaultStyle.borderWidth,
      workingBorderStyle: defaultStyle.borderStyle,
      workingBorderColor: defaultStyle.borderColor,
      workingBorderRadius: defaultStyle.borderRadius,
      workingTextAlign: defaultStyle.textAlign,

      workingFontFamily: defaultStyle.fontFamily,
      workingFontSize: defaultStyle.fontSize,
      workingLetterSpacing: defaultStyle.letterSpacing,
      workingTextTransform: defaultStyle.textTransform,
      workingFontWeight: defaultStyle.fontWeight,
      workingColor: defaultStyle.color
    }
  },

  handleStyleChange: function(event) {
    var property = event.target.name
    var value = event.target.value
    // if value/property are undefined, try using currentTarget instead
    if (property === undefined || value === undefined) {
      var property = event.currentTarget.getAttribute('name')
      var value = event.currentTarget.getAttribute('value')
    }
    var stateName = 'working' + property.capitalizeFirstLetter()
    var updatedStyle = {}
    updatedStyle[stateName] = value
    this.setState(updatedStyle)
    this.updateWorkingStyle(property, value)
  },
  handleTabSelect: function(index, last) {
    this.setState({ tabSelectIndex: index })
  },
  handleFontSelect: function(e) {
    // update available font-weights
    this.setState({ selectedFontIndex: e.target.value })
    // update font-family value of workingStyle
    var fonts = this.props.theme.get('fonts').toJS()
    var updatedFontFamily = fonts[e.target.value].fontFamily
    this.updateWorkingStyle('fontFamily', updatedFontFamily)
  },
  handleNameChange: function(e) {
    this.setState({ workingStyleName: e.target.value })
  },
  handleSaveAndClose: function(e) {
    ThemeActions.updateThemeButtonStyle(this.state.workingStyleName, this.state.workingStyle)
    this.toggleModal()
  },
  handleStyleSelect: function(e) {
    var selectedStyles
    if (e.target.value === 'new style') {
      selectedStyles = {}
    } else {
      selectedStyles = this.props.theme.getIn(['buttonStyles', e.target.value, 'style']).toJS()
      this.setState({
        workingPadding: selectedStyles.padding,
        workingWidth: selectedStyles.width,
        workingBackgroundColor: selectedStyles.backgroundColor,

        workingBorderWidth: selectedStyles.borderWidth,
        workingBorderStyle: selectedStyles.borderStyle ? selectedStyles.borderStyle : 'solid',
        workingBorderColor: selectedStyles.borderColor,
        workingBorderRadius: selectedStyles.borderRadius,
        workingTextAlign: selectedStyles.textAlign,

        workingFontFamily: selectedStyles.fontFamily,
        workingFontSize: selectedStyles.fontSize,
        workingLetterSpacing: selectedStyles.letterSpacing,
        workingTextTransform: selectedStyles.textTransform,
        workingFontWeight: selectedStyles.fontWeight,
        workingColor: selectedStyles.color
      })
    }
    this.setState({ workingStyleName: e.target.value })
    this.setState({ workingStyle: selectedStyles })
  },
  toggleModal: function() {
    this.setState({ shown: !this.state.shown });
  },
  updateWorkingStyle: function(attribute, value) {
    var oldWorkingStyle = this.state.workingStyle
    oldWorkingStyle[attribute] = value
    var updatedWorkingStyle = oldWorkingStyle
    this.setState({ workingStyle: updatedWorkingStyle })
  },
  alignmentMessage(){
    if (this.state.workingTextAlign && this.state.workingTextAlign !== 'center' && (!this.state.workingWidth || this.state.workingWidth === 'auto')) {
      return (
        <div className="inline-input">
          <div className="input">
          </div>
          <div className="input">
            <p className="help-text" id="passwordHelpText">Select button width to activate the
              alignment.</p>
          </div>
        </div>);
    } else {
      return (<span></span>)
    }

  },
  renderLayer: function() {
    if (!this.state.shown) {
      return <span />
    }
    // Populate existing text styles & set selected
    var buttonStyleOptions = []
    this.props.theme.get('buttonStyles').map(function(optionObj, i) {
      optionObj = optionObj.toJS()
      var buttonStyleOption = <option key={i} value={optionObj.name}>{optionObj.name}</option>
      buttonStyleOptions.push(buttonStyleOption)
    })
    // Populate available fonts & set selected
    var fonts = this.props.theme.get('fonts').toJS()
    var fontOptions = []
    fonts.map(function(fontObj, index) {
      var fontOption = <option key={index} value={index}>{fontObj.name}</option>
      fontOptions.push(fontOption)
    })
    // Populate available font-weights & set selected
    var fontWeightOptions = []
    var selectedFontWeight = this.state.workingFontWeight
    console.log(fonts[this.state.selectedFontIndex])
    // fonts[this.state.selectedFontIndex].weights.map(function(weight) {
    //   var fontWeightOption = <option value={weight}>{weight}</option>
    //   fontWeightOptions.push(fontWeightOption)
    // })
    // Populate available font-sizes & set selected
    var fontSizeOptions = []
    var selectedFontSize = this.state.workingFontSize
    this.props.theme.get('fontSizes').toJS().map(function(size, i) {
      var fontSizeOption = <option key={i} value={size}>{size}</option>
      fontSizeOptions.push(fontSizeOption)
    })
    // Set Style Name
    var styleName = this.state.workingStyleName

    return (
      <Modal onRequestClose={this.toggleModal}>
        <div className="modal edit-button-style">
          <div className="modal-header grid-block">
            <div className="grid-content">
              Edit Button Styles
              <div className="close-icon">
                <img src="media/close-icon-teal.png" onClick={this.toggleModal}/>
              </div>
            </div>
          </div>
          <div className="grid-block modal-content">
            <div className="grid-content medium-12">
              <div className="edit-button-style">
                <div className="select-button-style">
                  <form className="style-select">
                    <label>Style Select</label>
                    <select onChange={this.handleStyleSelect} value={this.state.workingStyleName}>
                      {buttonStyleOptions}
                      <option value="new style">New Style</option>
                    </select>
                  </form>
                  <div className="sample-text" style={this.props.sectionStyle}>
                    <button style={this.state.workingStyle}>{this.state.workingStyleName}</button>
                  </div>
                </div>
                <div className="button-style-edit">
                  <form className="typography">
                    <div className="input">
                      <span className="label">Name</span>
                      <input
                        type="text"
                        className="field"
                        placeholder="Text Style Name"
                        value={styleName}
                        onChange={this.handleNameChange}
                        />
                    </div>
                    <div className="input">
                      <span className="label">Font</span>
                      <select className="field" onChange={this.handleFontSelect}>
                        {fontOptions}
                      </select>
                    </div>
                    <div className="inline-input">
                      <div className="input">
                        <span className="label">Size</span>
                        <select
                          name="fontSize"
                          className="field"
                          value={this.state.workingFontSize}
                          onChange={this.handleStyleChange}
                          >
                          {fontSizeOptions}
                        </select>
                      </div>
                      <div className="input">

                      </div>
                    </div>
                    <div className="inline-input">
                      <div className="input">
                        <span className="label">Caps</span>
                        <select
                          name="textTransform"
                          className="field"
                          value={this.state.workingTextTransform}
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
                          value={this.state.workingLetterSpacing}
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
                          value={this.state.workingBorderWidth}
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
                          value={this.state.workingBorderStyle}
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
                          name="width"
                          className="field"
                          value={this.state.workingWidth}
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
                          value={this.state.workingPadding}
                          onChange={this.handleStyleChange}
                          >
                          <option value="0px">0px</option>
                          <option value="2px">2px</option>
                          <option value="4px">4px</option>
                          <option value="6px">6px</option>
                          <option value="8px">8px</option>
                          <option value="10px">10px</option>
                          <option value="12px">12px</option>
                        </select>
                      </div>
                    </div>
                    <div className="inline-input">
                      <div className="input">
                        <span className="label">Rounded Corners</span>
                        <select
                          name="borderRadius"
                          className="field"
                          value={this.state.workingBorderRadius}
                          onChange={this.handleStyleChange}
                          >
                          <option value="0px">No rounding</option>
                          <option value="2px">Slight rounding</option>
                          <option value="4px">Moderate rounding</option>
                          <option value="10px">Heavy rounding</option>
                          <option value="20px">Very heavy rounding</option>
                        </select>
                      </div>
                      <div className="input">
                        <span className="label">Text Align</span>
                        <select aria-describedby="passwordHelpText"
                                name="textAlign"
                                className="field"
                                value={this.state.workingTextAlign}
                                onChange={this.handleStyleChange}
                          >
                          <option value="center">Center</option>
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                        </select>

                      </div>
                    </div>
                    {this.alignmentMessage()}
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
                          value={this.state.workingColor}
                          palette={this.props.theme.get('palette')}
                          onChange={this.handleStyleChange}
                          />
                      </TabPanel>
                      <TabPanel>
                        <ColorPalette
                          name="borderColor"
                          value={this.state.workingBorderColor}
                          palette={this.props.theme.get('palette')}
                          onChange={this.handleStyleChange}
                          />
                      </TabPanel>
                      <TabPanel>
                        <ColorPalette
                          name="backgroundColor"
                          value={this.state.workingBackgroundColor}
                          palette={this.props.theme.get('palette')}
                          onChange={this.handleStyleChange}
                          />
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
                <div>
                  <button className="save-and-close button" onClick={this.handleSaveAndClose}>Save &amp; Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  },

  render: function() {
    var buttonCopy = this.props.buttonCopy ? this.props.buttonCopy : "Edit"
    return (
      <a className="button edit-button-style" href="javascript:;" role="button" onClick={this.toggleModal}>
        {buttonCopy}
      </a>
    )
  }
})

module.exports = EditButtonStyle

/* font weight input - currently not needed, will probably be re-implemented
 <span className="label">Weight</span>
 <select
 name="fontWeight"
 className="field"
 value={this.state.workingFontWeight}
 onChange={this.handleStyleChange}
 >
 {fontWeightOptions}
 </select>
 */
