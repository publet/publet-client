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
import {PublicationActions} from  '../../publication-actions.js'

// Components
var GateFormInput = require('../gate-form-input/gate-form-input.js')
var ColorPalette = require('../../../common/components/color-palette/color-palette.js')
var Tab = ReactTabs.Tab
var Tabs = ReactTabs.Tabs
var TabList = ReactTabs.TabList
var TabPanel = ReactTabs.TabPanel

// Component
var GateEditorForm = React.createClass({
  getInitialState() {
    return {
      tabSelectIndex: 0
    }
  },
  handleInputChange(e) {
    PublicationActions.updateGateContent(e.target.name, e.target.value)
  },
  handleGateStyleChange(e) {
    PublicationActions.updateGateContent(
      e.currentTarget.getAttribute('name'), e.currentTarget.getAttribute('value')
    )
  },
  handleTabSelect: function(index, last) {
    this.setState({tabSelectIndex: index})
  },
  render() {
    var ctaBtnStyle = this.props.form.getIn(['cta', 'style'], {}).toJS()
    return (
      <form className="gate-editor-form">
        <h4 className="title">Gate Content</h4>
        <GateFormInput
          name="title"
          type="text"
          value={this.props.content.get('title')}
          onChange={this.handleInputChange}
        />
        <GateFormInput
            name="header"
            type="text"
            value={this.props.content.get('header')}
            onChange={this.handleInputChange}
          />
        <GateFormInput
          name="body"
          type="textarea"
          value={this.props.content.get('body')}
          onChange={this.handleInputChange}
        />
        <div className="color-select">
          <Tabs onSelect={this.handleTabSelect} selectedIndex={this.state.tabSelectIndex}>
            <TabList>
              <Tab>Title</Tab>
              <Tab>Title BG</Tab>
              <Tab>Header</Tab>
              <Tab>Body Text</Tab>
              <Tab>Background</Tab>
            </TabList>
            <TabPanel>
              <ColorPalette
                name="titleTextColor"
                value={this.props.content.get('titleTextColor')}
                palette={this.props.theme.get('palette')}
                onChange={this.handleGateStyleChange}
              />
            </TabPanel>
            <TabPanel>
              <ColorPalette
                name="titleBgColor"
                value={this.props.content.get('titleBgColor')}
                palette={this.props.theme.get('palette')}
                onChange={this.handleGateStyleChange}
              />
            </TabPanel>
            <TabPanel>
              <ColorPalette
                name="headerTextColor"
                value={this.props.content.get('headerTextColor')}
                palette={this.props.theme.get('palette')}
                onChange={this.handleGateStyleChange}
              />
            </TabPanel>
            <TabPanel>
              <ColorPalette
                name="bodyTextColor"
                value={this.props.content.get('bodyTextColor')}
                palette={this.props.theme.get('palette')}
                onChange={this.handleGateStyleChange}
              />
            </TabPanel>
            <TabPanel>
              <ColorPalette
                name="backgroundColor"
                value={this.props.content.get('backgroundColor')}
                palette={this.props.theme.get('palette')}
                onChange={this.handleGateStyleChange}
              />
            </TabPanel>
          </Tabs>
        </div>
      </form>
    )
  }
})

module.exports = GateEditorForm
