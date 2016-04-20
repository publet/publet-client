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
var Reflux = require('reflux')
var ScrollLock = require('../scroll-lock/scroll-lock')

// Functions
String.prototype.capitalizeFirstLetter = function(string) {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// Actions
var ThemeActions = require('../../../theme-editor/theme-actions.js')

// Stores
var ThemeStore = require('../../../theme-editor/components/theme/theme-store')

// Mixins
var LayeredComponent = require('../../../common/mixins/layered-component/layered-component')

// Components
var Modal = require('../../../common/components/modal/modal.js')
var ColorPalette = require('../../../common/components/color-palette/color-palette.js')

var EditTextStyle = React.createClass({
  mixins: [LayeredComponent, ScrollLock],

  getInitialState: function() {
    var textStyles = this.props.theme.get('textStyles').toJS()
    var defaultStyleName = this.props.selectedStyle
    if (defaultStyleName === "new style") {
      var defaultStyle = textStyles["paragraph"].style
    } else {
      var defaultStyle = textStyles[defaultStyleName].style
    }
    return {
      shown: false,
      modalShown: false,
      workingStyle: defaultStyle,
      workingStyleName: defaultStyleName,
      workingColor: defaultStyle.color,
      workingFontFamily: defaultStyle.fontFamily,
      workingFontSize: defaultStyle.fontSize,
      workingLetterSpacing: defaultStyle.letterSpacing,
      workingTextTransform: defaultStyle.textTransform,
      workingFontWeight: defaultStyle.fontWeight.weight,
      selectedFontIndex: 0
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

  handleFontSelect: function(e) {
    // update available font-weights
    this.setState({selectedFontIndex: e.target.value})
    // update font-family value of workingStyle
    var fonts = this.props.theme.get('fonts').toJS()
    var updatedFontFamily = fonts[e.target.value].fontFamily
    this.updateWorkingStyle('fontFamily', updatedFontFamily)
  },

  handleNameChange: function(e) {
    this.setState({workingStyleName:e.target.value})
  },

  handleSaveAndClose: function(e) {
    ThemeActions.updateThemeTextStyle(this.state.workingStyleName, this.state.workingStyle)
    // close modal
    this.toggleModal()
  },

  handleStyleSelect: function(e) {
    var selectedStyles
    if (e.target.value === 'new style') {
      selectedStyles = {}
    } else {
      selectedStyles = this.props.theme.getIn(['textStyles', e.target.value, 'style']).toJS()
      this.setState({
        workingColor: selectedStyles.color,
        workingFontFamily: selectedStyles.fontFamily,
        workingFontSize: selectedStyles.fontSize,
        workingLetterSpacing: selectedStyles.letterSpacing,
        workingTextTransform: selectedStyles.textTransform,
        workingFontWeight: selectedStyles.fontWeight.weight
      })
    }
    this.setState({workingStyleName: e.target.value})
    this.setState({workingStyle:selectedStyles})
  },

  toggleModal: function() {
    this.setState({shown: !this.state.shown});
  },

  updateWorkingStyle: function(attribute, value) {
    var oldWorkingStyle = this.state.workingStyle
    oldWorkingStyle[attribute] = value
    var updatedWorkingStyle = oldWorkingStyle
    this.setState({workingStyle: updatedWorkingStyle})
  },

  renderLayer: function() {
    if (!this.state.shown) {
      return <span />
    }
    // Populate existing text styles & set selected
    var textStyleOptions = []
    this.props.theme.get('textStyles').map(function(optionObj, i) {
      optionObj = optionObj.toJS()
      var textStyleOption = <option key={i} value={optionObj.name}>{optionObj.name}</option>
      textStyleOptions.push(textStyleOption)
    })

    var fonts = this.props.theme.get('fonts').toJS()
    // Populate available fonts & set selected
    var fontOptions = []
    fonts.map(function(fontObj, index) {
      var fontOption = <option key={index} value={index}>{fontObj.name}</option>
      fontOptions.push(fontOption)
    })

    // Populate available font-weights & set selected
    var fontWeightOptions = []
    var selectedFontWeight = this.state.workingFontWeight
    //fonts[this.state.selectedFontIndex].weights.map(function(weight) {
    //  var fontWeightOption = <option value={weight.weight}>{weight.weight}</option>
    //  fontWeightOptions.push(fontWeightOption)
    //})

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
        <div className="modal edit-text-style">
          <div className="modal-header grid-block">
            <div className="grid-content">
              Edit Text Styles
              <div className="close-icon">
                <img src="media/close-icon-teal.png" onClick={this.toggleModal} />
              </div>
            </div>
          </div>
          <div className="grid-block modal-content">
            <div className="grid-content medium-12">
              <div className="edit-text-style">
                <div className="select-text-style">
                  <form className="style-select">
                    <label>Style Select</label>
                    <select onChange={this.handleStyleSelect} value={this.state.workingStyleName} >
                      {textStyleOptions}
                      <option value="new style">New Style</option>
                    </select>
                  </form>
                  <div className="sample-text" style={this.props.sectionStyle}>
                    <p style={this.state.workingStyle}>“Language is impossible,” says Debord.  but only if Lyotard’s essay on the capitalist paradigm of context is invalid; otherwise, we can assume that class has objective value...</p>
                  </div>
                </div>
                <div className="text-style-edit">
                  <form className="typography">
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
                        <span className="label">Weight</span>
                        <select
                          name="fontWeight"
                          className="field"
                          value={this.state.workingFontWeight}
                          onChange={this.handleStyleChange} >
                          {fontWeightOptions}
                        </select>
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
                  </form>
                  <div className="color">
                    <ColorPalette
                      name="color"
                      value={this.state.workingColor}
                      label="Text Color"
                      palette={this.props.theme.get('palette')}
                      onChange={this.handleStyleChange}
                    />
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
      <a className="button edit-text-style" href="javascript:;" role="button" onClick={this.toggleModal}>
        {buttonCopy}
      </a>
    )
  }
})

module.exports = EditTextStyle
