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
import Reflux from 'reflux'

const PropTypes = React.PropTypes;
var ItemTypes = require('../../../constants').ItemTypes;
var DragSource = require('react-dnd').DragSource;

//Components

// Drag & Drop Crap
var blockSource = {
  beginDrag: function (props) {
    console.log('beginning drag')
    return {originCursor: props.cursor}
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

// Component
var MoveBlockBtn = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render() {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div className="move-icon" style={{opacity: isDragging ? 0.5 : 1}}>
        <img src="media/move-icon-teal.png" />
      </div>
    )
  }
})

module.exports = DragSource(ItemTypes.BLOCK, blockSource, collect)(MoveBlockBtn)
