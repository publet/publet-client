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
import { ArticleActions } from '../../../article-editor/article-actions.js'

// Drag & Drop
var PropTypes = React.PropTypes
var ItemTypes = require('../../constants').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;
var sectionTarget = {
  drop: function (props, monitor) {
    console.log('section dropped')
    var originCursor = monitor.getItem().originCursor.toJS()
    var destinationCursor = props.cursor.toJS()
    ArticleActions.moveSection(originCursor, destinationCursor)
  }
}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

// Components
var AddSectionBtn = require('../section-controls/add-section-btn/add-section-btn.js')

// Component
var SectionSpacer = React.createClass({
  getInitialState: function () {
    return {hover: false}
  },

  mouseOver: function () {
    if (this.props.editor) {
      this.setState({hover: true})
    }
  },

  mouseOut: function () {
    if (this.props.editor) {
      this.setState({hover: false})
    }
  },

  render: function() {
    var identity = this.props.cursor.toJS()
    var connectDropTarget = this.props.connectDropTarget
    var isOver = this.props.isOver
    return connectDropTarget(
      <div className="section-spacer" style={{background: isOver ? '#FFF0C2' : 'none'}} >
        <div className="section-spacer-wrapper" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
          <AddSectionBtn cursor={this.props.cursor} visible={this.state.hover} />
        </div>
      </div>
    )
  }
})

module.exports = DropTarget(ItemTypes.SECTION, sectionTarget, collect)(SectionSpacer)