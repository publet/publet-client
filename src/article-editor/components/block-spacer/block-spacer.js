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

// 1/17/2016
// Didn't touch this one as far as es6 syntax goes as react dnd stuff probably
// should get a closer inspection before conversion, as it uses some es6-y stuff
// in it. This component definitely needs to be looked at for es6 upgrade. --AB

// Dependencies
import React from 'react'

// Actions
import { ArticleActions } from '../../../article-editor/article-actions.js'

// Components
import { AddBlockBtn } from '../block-controls/add-block-btn/add-block-btn.js'

// Drag & Drop
var PropTypes = React.PropTypes
var ItemTypes = require('../../constants').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;
var blockTarget = {
  drop: function (props, monitor) {
    console.log('dropped')
    var originCursor = monitor.getItem().originCursor.toJS()
    var destinationCursor = props.cursor.toJS()
    ArticleActions.moveBlock(originCursor, destinationCursor)
  }
}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

// Component
var BlockSpacer = React.createClass({
  getInitialState() {
    return {hover: false};
  },

  mouseOver() {
    if (this.props.editor) {
      this.setState({hover: true});
    }

  },

  mouseOut() {
    if (this.props.editor) {
      this.setState({hover: false});
    }
  },

  render() {
    var identity = this.props.cursor.toJS()
    var connectDropTarget = this.props.connectDropTarget
    var isOver = this.props.isOver

    if (this.props.editable === true) {
      return connectDropTarget(
        <div
          className="block grid-content block-spacer"
          style={{background: isOver ? '#FFF0C2' : 'none'}}
          onMouseEnter={this.mouseOver}
          onMouseLeave={this.mouseOut}
        >
          <AddBlockBtn
            maxBlocks={this.props.maxBlocks}
            cursor={this.props.cursor}
            visible={this.state.hover}
          />
        </div>
      )
    } else {
      return connectDropTarget(
        <div
          className="block grid-content block-spacer"
          style={{background: isOver ? '#FFF0C2' : 'none'}}
          onMouseEnter={this.mouseOver}
          onMouseLeave={this.mouseOut}
        >
        </div>
      )
    }
  }
})

module.exports = DropTarget(ItemTypes.BLOCK, blockTarget, collect)(BlockSpacer)
