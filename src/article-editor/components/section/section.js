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

'use strict';

// Dependencies
var React = require('react')
var cx = require('classnames')

// Actions
import { ArticleActions } from '../../../article-editor/article-actions.js'

// Components
var SectionToolbar = require('../section-controls/section-toolbar/section-toolbar.js')
var Column = require('../column/column.js')

// Component
var Section = React.createClass({
  mixins: [],
  getInitialState: function() {

    return {
      editable: this.isEmptySection(this.props.columns),
      hover: false
    }
  },
  editableToggle: function() {
    if (this.props.editor && !this.isEmptySection(this.props.columns)) {
      var editable = this.state.editable
      editable = !editable
      this.setState({editable: editable})
    }
  },
  isEmptySection:function(columns){
    var emptySection = true;
      columns.map(function(column) {
        if(!!column.count()){
          emptySection = false;
        }
      });
    return emptySection;
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      editable: this.isEmptySection(nextProps.columns)|| this.state.editable
    });
  },
  hoverOn: function ( ) {
    this.setState({hover:true})
  },
  hoverOff: function ( ) {
    this.setState({hover:false})
  },
  render: function() {
    var cursor = this.props.cursor
    var that = this
    var sectionClasses = cx({
      'section': true,
      'grid-frame': true,
      'vertical': true,
      'editable': this.state.editable
    })
    var sectionLayoutClasses = cx({
      'section-layout': true,
      'grid-block': true,
      'one-col-thin': this.props.layout === 'OneColThin',
      'sidebar-left': this.props.layout === 'SidebarLeft',
      'sidebar-right': this.props.layout === 'SidebarRight',
      'marginalia-left': this.props.layout === 'MarginaliaLeft',
      'marginalia-right': this.props.layout === 'MarginaliaRight'
    })
    var clickToEditStyles = {
      backgroundColor: this.state.hover ? 'rgba(255, 218, 102, .5)' : 'rgba(255, 218, 102, 0)',
      transition: 'background-color .15s ease-in-out',
      cursor: this.state.editable ? 'auto' : 'pointer'
    }
    var gridContainerStyles = {
      opacity: this.state.hover ? 0.5 : 1,
      transition: 'opacity .15s ease-in-out'
    }
    var columns = this.props.columns.map(function(column, index) {
      return (
        <Column
          key={index}
          articleID={that.props.articleID}
          content={column}
          cursor={cursor.push('columns', index)}
          editable={that.state.editable}
          editor={that.props.editor}
          theme={that.props.theme}
          sectionStyle={that.props.style}
          layout={that.props.layout}
        />
      )
    })
    return (
      <div data-publet-id={this.props.publetID} className={sectionClasses} style={this.props.style.toJS()}>
        <SectionToolbar
          enabled={this.props.editor}
          emptySection={this.isEmptySection(this.props.columns)}
          cursor={this.props.cursor}
          selectedLayout={this.props.layout}
          editable={this.state.editable}
          onChange={this.editableToggle}
          sectionID={this.props.sectionID}
          theme={this.props.theme}
          style={this.props.style}
          bg={this.props.bg}
        />
        <div
          value={this.state.editable}
          style={this.state.editable ? {width:'auto'} : clickToEditStyles}
          onClick={this.state.editable? '' : this.editableToggle}
        >
          <div
            className="section grid-container"
            onMouseEnter={this.hoverOn}
            onMouseLeave={this.hoverOff}
            style={this.state.editable ? {width:'auto'} : gridContainerStyles}
          >
            <div className={sectionLayoutClasses}>
              {columns}
            </div>
          </div>
        </div>

      </div>
    )
  }
})

module.exports = Section
