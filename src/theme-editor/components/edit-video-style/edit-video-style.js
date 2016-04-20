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
var Modal = require('../../../common/components/modal/modal.js')
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
var EditVideoStyle = React.createClass({
  mixins: [LayeredComponent, ScrollLock],
  getInitialState: function() {
    var videoStyles = this.props.theme.get('videoStyles').toJS()
    var defaultStyleName = this.props.selectedStyle
    if (defaultStyleName === "new style") {
      var defaultStyle = videoStyles["default"].style
    } else {
      var defaultStyle = videoStyles[defaultStyleName].style
    }
    return {
      shown: false,
      modalShown: false,

      workingStyle: defaultStyle,
      workingStyleName: defaultStyleName,

      workingBorderWidth: defaultStyle.borderWidth,
      workingBorderStyle: defaultStyle.borderStyle,
      workingBorderColor: defaultStyle.borderColor,
      woringBorderRadius: defaultStyle.borderRadius,
      workingPadding: defaultStyle.padding,
      workingBackgroundColor: defaultStyle.backgroundColor
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
    this.setState({tabSelectIndex: index})
  },
  handleNameChange: function(e) {
    this.setState({workingStyleName:e.target.value})
  },
  handleSaveAndClose: function(e) {
    ThemeActions.updateThemeVideoStyle(this.state.workingStyleName, this.state.workingStyle)
    // close modal
    this.toggleModal()
  },
  handleStyleSelect: function(e) {
    var selectedStyles
    if (e.target.value === 'new style') {
      selectedStyles = {}
    } else {
      selectedStyles = this.props.theme.getIn(['videoStyles', e.target.value, 'style']).toJS()
      this.setState({
        workingBorderWidth:     selectedStyles.borderWidth,
        workingBorderStyle:     selectedStyles.borderStyle,
        workingBorderRadius:    selectedStyles.borderRadius,
        workingPadding:         selectedStyles.padding,
        workingBackgroundColor: defaultStyle.backgroundColor
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
    if (!this.state.shown) { return <span /> }
    // Populate existing text styles & set selected
    var videoStyleOptions = []
    this.props.theme.get('videoStyles').map(function(optionObj, i) {
      optionObj = optionObj.toJS()
      var videoStyleOption = <option key={i} value={optionObj.name}>{optionObj.name}</option>
      videoStyleOptions.push(videoStyleOption)
    })
    // Set Style Name
    var styleName = this.state.workingStyleName

    return (
      <Modal onRequestClose={this.toggleModal}>
        <div className="modal edit-button-style">
          <div className="modal-header grid-block">
            <div className="grid-content">
              Edit Video Styles
              <div className="close-icon">
                <img src="media/close-icon-teal.png" onClick={this.toggleModal} />
              </div>
            </div>
          </div>
          <div className="grid-block modal-content">
            <div className="grid-content medium-12">
              <div className="edit-button-style">
                <div className="select-button-style">
                  <form className="style-select">
                    <label>Style Select</label>
                    <select onChange={this.handleStyleSelect} value={this.state.workingStyleName} >
                      {videoStyleOptions}
                      <option value="new style">New Style</option>
                    </select>
                  </form>
                  <div className="sample-text" style={this.props.sectionStyle}>
                    <video style={this.state.workingStyle} className="video-js vjs-default-skin"
                      controls preload="auto" width="640" height="264"
                      // poster={this.state.thumbUrl}
                      data-setup='{"example_option":true}'>
                     <source src="https://youtu.be/o0u4M6vppCI" type='video/mp4' />
                     <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
                    </video>
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
                        <span className="label">Video Padding</span>
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
                    </div>
                  </form>
                  <div className="color-select">
                    <Tabs onSelect={this.handleTabSelect} selectedIndex={this.state.tabSelectIndex}>
                      <TabList>
                        <Tab>Border Color</Tab>
                        <Tab>Background Color</Tab>
                      </TabList>
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
      <a className="button edit-video-style" href="javascript:;" role="button" onClick={this.toggleModal}>
        {buttonCopy}
      </a>
    )
  }
})

module.exports = EditVideoStyle




