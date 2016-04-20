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

//Components
var Block = require('../block/block.js')
var BlockSpacer = require('../block-spacer/block-spacer.js')

// Component
var Column = React.createClass({
  getInitialState: function() {
    return {
      maxBlocksReached: false,
      maxBlocks:  2
    }
  },

  render: function() {
    var that = this
    var cursor = this.props.cursor
    var numberOfBlocks = this.props.content.size - 1
    var maxBlocksReached = false
    if (numberOfBlocks > this.state.maxBlocks && this.props.layout !== 'OneCol') {
      maxBlocksReached = true
    }
    var blockspacerTop = null
    var blockspacerBottom = null
    var blocks
    if (this.props.content.count() > 0) {
      blocks = this.props.content.map(function(block, index){
        if (that.props.editable === true) {
          blockspacerTop = <BlockSpacer
            editable={that.props.editable}
            maxBlocks={maxBlocksReached}
            cursor={cursor.push(index)}
            editor={that.props.editor}
          />
        }
        if (index === numberOfBlocks && that.props.editable === true) {
          blockspacerBottom = <BlockSpacer
            editable={that.props.editable}
            maxBlocks={maxBlocksReached}
            cursor={cursor.push(index + 1)}
            bottom='true'
            editor={that.props.editor}
          />
        }
        return (
          <div key={index}>
            {blockspacerTop}
            <Block
              publetID={block.get('id')}
              articleID={that.props.articleID}
              key={index}
              cursor={cursor.push(index)}
              type={block.get('type')}
              classes={block.get('classes')}
              content={block.get('content')}
              editable={that.props.editable}
              editor={that.props.editor}
              theme={that.props.theme}
              sectionStyle={that.props.sectionStyle}
              layout={that.props.layout}
            />
            {blockspacerBottom}
          </div>
        )
      })
    } else {
      blocks = <BlockSpacer cursor={cursor.push('0')} editable={this.props.editable} editor={this.props.editor} />
    }
    return (
      <div className="column vertical">
        { blocks }
      </div>
    )
  }
})

module.exports = Column
