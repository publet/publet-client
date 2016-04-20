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
import { ArticleActions } from '../../../article-editor/article-actions.js'

// Styles
// var ArticleStyles = require('../../../article-editor/components/layout-menu/layout-menu.scss')

//Components

// Component
var LayoutMenu = React.createClass({
  propTypes: {},
  mixins : [],

  // getInitialState: function() {},
  // getDefaultProps: function() {},

  // componentWillMount : function() {},
  // componentWillReceiveProps: function() {},
  // componentWillUnmount : function() {},

  // _parseData : function() {},
  // _onSelect : function() {},

  handleSelect: function(event) {
    var selectedLayout = event.target.value
    ArticleActions.updateLayout(this.props.sectionID, selectedLayout)
  },

  render: function() {
    return (
      <div>
        <form className="layout-menu">
          <span className="inline-label">
            <span className="layout-menu-label">Section Layout</span>
            <select className="layout-select" value={this.props.selected} onChange={this.handleSelect} >
              <option value="OneCol">1 Column</option>
              <option value="OneColThin">1 Column Thin</option>
              <option value="TwoCol">2 Columns</option>
              <option value="ThreeCol">3 Columns</option>
              <option value="SidebarRight">Sidebar Right</option>
              <option value="SidebarLeft">Sidebar Left</option>
              <option value="MarginaliaRight">Marginalia Right</option>
              <option value="MarginaliaLeft">Marginalia Left</option>
            </select>
          </span>
        </form>
      </div>
    )
  }
})

module.exports = LayoutMenu