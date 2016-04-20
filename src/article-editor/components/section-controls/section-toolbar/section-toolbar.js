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

// Random notes:
// For some ridiculous reason, switches need empty labels. Okay, foundation. I guess. >:| --Alex

// Dependencies
var React = require('react')
var Reflux = require('reflux')

// Actions
import { ArticleActions } from '../../../../article-editor/article-actions.js'

//Components
var LayoutMenu = require('../../layout-menu/layout-menu.js')
var SectionBgModal = require('../section-bg-modal/section-bg-modal.js')
var SectionSpacingModal = require('../section-spacing-modal/section-spacing-modal.js')
var MoveSectionBtn = require('../move-section-btn/move-section-btn.js')

var DeleteSectionBtn = require('../delete-section-btn/delete-section-btn.js')
var ReactTooltip = require('react-tooltip')
// Component
var SectionToolbar = React.createClass({
  _renderSwitchEditModeButton(){

    if (this.props.emptySection) {

      var emptySectionStyle = { backgroundColor: '#DDDDDD' }
      return (<div><ReactTooltip type="error" effect="solid">
        </ReactTooltip>

          <div data-tip="You cann't disable edit mode while the section is empty" className="switch">
            <input
              value={this.props.editable}
              type="checkbox"
              id={this.props.sectionID}
              checked={this.props.editable}
              onChange={this.props.onChange}
              />
            <label style={emptySectionStyle} htmlFor={this.props.sectionID}></label>
          </div>
        </div>
      )
    } else {

      return (
        <div>
          <div className="switch">
            <input
              value={this.props.editable}
              type="checkbox"
              id={this.props.sectionID}
              checked={this.props.editable}
              onChange={this.props.onChange}
              />
            <label htmlFor={this.props.sectionID}></label>
          </div>
        </div>
      )
    }
  },
  render() {
    /* IMPORTANT NOTE
    // The switch MUST have an ID === the <label>'s htmlFor property
    // or the switch WILL NOT WORK. This is dumb. Blame Foundation. */
    var sectionStyle = { display: this.props.editable ? 'inherit' : 'none' }

    return (
      <div className="section-toolbar" style={sectionStyle}>
        <div className="grid-container">
          <div className="menu-group">
            <div className="menu-group-left">
              <ul className="menu-bar">
                <li><LayoutMenu sectionID={this.props.sectionID} selected={this.props.selectedLayout} /></li>
                <li>
                  <SectionBgModal
                    cursor={this.props.cursor}
                    theme={this.props.theme}
                    style={this.props.style}
                    bg={this.props.bg}
                  />
                </li>
                <li>
                  <SectionSpacingModal
                    cursor={this.props.cursor}
                    theme={this.props.theme}
                    style={this.props.style}
                    bg={this.props.bg}
                    />
                </li>
              </ul>
            </div>
            <div className="menu-group-right">
              <ul className="menu-bar">
                <li>
                  {this._renderSwitchEditModeButton()}
                </li>
                <li><MoveSectionBtn cursor={this.props.cursor} /></li>
                <li><DeleteSectionBtn cursor={this.props.cursor} /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
})


module.exports = SectionToolbar