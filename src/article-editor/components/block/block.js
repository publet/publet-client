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
import React from 'react'
import Reflux from 'reflux'
import cx from 'classnames'

//Components
import { ButtonBlock } from '../block-types/button-block/button-block.js'
import { ImageBlock } from '../block-types/image-block/image-block.js'
import { QuoteBlock } from '../block-types/quote-block/quote-block.js'
import { TextBlock } from '../block-types/text-block/text-block.js'
import { VideoBlock } from '../block-types/video-block/video-block.js'

import { decode } from '../../../common/utils/decode.js'

// Component
const Block = function(props) {
  var blockContent = resolveBlock(props.type)
  var classes = cx({
    'block': true,
    'grid-content': true,
    'editable': props.editable
  })

  function resolveBlock(blockType) {
    if (/^ButtonBlock|ImageBlock|TextBlock|QuoteBlock|VideoBlock$/.test(blockType)) {
      var blockComponents = {
        ButtonBlock: ButtonBlock,
        ImageBlock: ImageBlock,
        QuoteBlock: QuoteBlock,
        TextBlock: TextBlock,
        VideoBlock: VideoBlock
      }
      var Component = blockComponents[blockType]
      var hash = decode(props.articleID, props.publetID)
      return (
        <Component
          classes={props.classes}
          content={props.content}
          cursor={props.cursor}
          editable={props.editable}
          editor={props.editor}
          theme={props.theme}
          sectionStyle={props.sectionStyle}
          layout={props.layout}
          shortLinkHash={hash}
          />
      )
    } else {
      return ( <p>{blockType} does not exist</p> )
    }
  }

  return (
    <div data-publet-id={props.publetID} className={classes}>
      {blockContent}
    </div>
  )
}
module.exports = Block;
