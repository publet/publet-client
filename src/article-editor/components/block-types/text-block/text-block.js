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
var ReactQuill = require('react-quill')
import * as _ from 'lodash'

// Actions
import {ArticleActions } from '../../../../article-editor/article-actions.js'

//Components
var CustomQuill = require('../../block-types/text-block/custom-quill.js')
var MoveBlockBtn = require('../../block-controls/move-block-btn/move-block-btn.js')
var DeleteBlockBtn = require('../../block-controls/delete-block-btn/delete-block-btn.js')

require('./text-style-tooltip')

// Component
export const TextBlock = React.createClass({
  getInitialState: function() {
    return {
      editorValue: this.props.content.get('text')
    }
  },
  createMarkup: function() {
    var text = this.props.content.get('text')
    return { __html: text }
  },
  onTextChange: function(value) {
    this.setState({ editorValue: value })
    ArticleActions.updateTextBlockContent(value, this.props.cursor)
  },

  render: function() {
    if (this.props.editable && this.props.editor) {
      var textStyleName = this.props.content.get('style') ? this.props.content.get('style') : 'paragraph'
      var fontOptions = []
      this.props.theme.get('fonts').map(function(fontObj) {
        fontObj = fontObj.toJS()
        var fontOption = {
          label: fontObj.name,
          value: fontObj.fontFamily
        }
        fontOptions.push(fontOption)
      })
      var fontSizeOptions = []
      this.props.theme.get('fontSizes').map(function(fontSizeObj) {
        var fontSizeOption = {
          label: fontSizeObj,
          value: fontSizeObj
        }
        fontSizeOptions.push(fontSizeOption)
      })

      var textStyles = []
      this.props.theme.get('textStyles').map(function(styleObj) {
        styleObj = styleObj.toJS()
        textStyles.push(styleObj)
      })

      var customFontSizeOption = {
        label: 'Custom',
        value: 'custom'
      }
      fontSizeOptions.push(customFontSizeOption)

      var colorArray = []
      this.props.theme.get('palette').map(function(colorObj) {
        colorArray.push({ value: colorObj.get('hex') })
      })
      var toolbarFormats = {
        items: [
          {
            items: fontOptions,
            label: "Font",
            type: "font"
          },
          { type: "separator" },
          {
            items: fontSizeOptions,
            label: "Size",
            type: "size"
          },
          { type: "separator" },
          {
            label: 'Alignment', type: 'align', items: [
            { label: '', value: 'left' },
            { label: '', value: 'center' },
            { label: '', value: 'right' },
            { label: '', value: 'justify' }
          ]
          },
          { type: "separator" },
          { label: 'Text styles', type: 'textStyle', items: textStyles }
        ],
        label: "Formats",
        type: "group"
      }
      var toolbarText = {
        label: 'Text', type: 'group', items: [
          { type: 'bold', label: 'Bold' },
          { type: 'italic', label: 'Italic' },
          { type: 'strike', label: 'Strike' },
          { type: 'underline', label: 'Underline' },
          { type: 'separator' },
          { type: 'color', label: 'Color', items: colorArray },
          { type: 'background', label: 'Background color', items: colorArray },
          { type: 'separator' },
          { type: 'link', label: 'Link' },
          { type: 'line-height-decrease', label: 'Decrease line height' },
          { type: 'line-height-label', label: 'Current line height' },
          { type: 'line-height-increase', label: 'Increase line height' }
        ]
      }
      var toolbarBlocks = {
        label: 'Blocks', type: 'group', items: [
          { type: 'bullet', label: 'Bullet' },
          { type: 'separator' },
          { type: 'list', label: 'List' }
        ]
      }
      var toolbarItems = [toolbarFormats, toolbarText, toolbarBlocks]
      return (
        <form className="img-block edit-panel">
          <div className="block-header grid-block">
            <div className="grid-content">
              Text Block
              <DeleteBlockBtn cursor={this.props.cursor}/>
              <MoveBlockBtn className="move-block-btn" cursor={this.props.cursor}/>
            </div>
          </div>

          <CustomQuill
            theme="snow"
            value={this.state.editorValue}
            onChange={this.onTextChange}
            toolbarItems={toolbarItems}
            />

        </form>
      )
    } else {
      return (
        <div className="text-block">
          <span
            className={this.props.classes ? this.props.classes.toArray() : []}
            dangerouslySetInnerHTML={this.createMarkup()}
            />
        </div>
      )
    }
  }
})
