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
import Immutable from 'immutable'
import DebounceInput from 'react-debounce-input';

// Actions
import { ArticleActions } from '../../../../article-editor/article-actions.js'

//Components
import  MoveBlockBtn  from '../../block-controls/move-block-btn/move-block-btn.js'
import  DeleteBlockBtn  from '../../block-controls/delete-block-btn/delete-block-btn.js'

// Component
export const ButtonBlock = (props) => {
  const formUpdate = (event) => {
    ArticleActions.updateBlock(event.target.name, event.target.value, props.cursor)
  }
  let buttonBlock
  const buttonStyleOptions = props.theme.get('buttonStyles').valueSeq().map(function(buttonStyleOption, i) {
    if (Immutable.Map.isMap(buttonStyleOption)) {
      buttonStyleOption = buttonStyleOption.toJS()
    }
    return (
      <option key={i} value={buttonStyleOption.name}>{buttonStyleOption.name}</option>
    )
  })
  const selectedStyle = props.content ? props.content.get('styleName') : 'default'

  const editableInterface = (
    <form className="btn-block edit-panel">
      <div className="block-header grid-block">
        <div className="grid-content">
          Button Block
          <DeleteBlockBtn cursor={props.cursor}/>
          <MoveBlockBtn className="move-block-btn" cursor={props.cursor}/>
        </div>
      </div>
      <div className="edit-form">
        <div className="grid-content medium-12">
          <label>Destination URL
            <DebounceInput debounceTimeout={1000} name="destination" type="text" value={props.content?props.content.get('destination'):null} onChange={formUpdate} />
          </label>
        </div>
        <div className="grid-content medium-12">
          <label>Button Text
            <DebounceInput debounceTimeout={1000} name="caption" type="text" value={props.content?props.content.get('caption'):null} onChange={formUpdate} />
          </label>
        </div>
        <div className="grid-block">
          <div className="grid-content medium-6">
            <label>Style
              <select name="styleName" value={selectedStyle} onChange={formUpdate}>
                {buttonStyleOptions}
              </select>
            </label>
          </div>
          <div className="grid-content medium-6">
          </div>
        </div>

      </div>
    </form>
  )
  const displayStyleName = props.content.get('styleName') ? props.content.get('styleName') : 'default'
  let displayStyle = props.theme.getIn(['buttonStyles', displayStyleName, 'style'])
  if (Immutable.Map.isMap(displayStyle)) {
    displayStyle = displayStyle.toJS()
  }
  const displayInterface = (
    <div>
      <a
        href={props.content?props.content.get('destination'):null}
        target={props.content.target}
        style={displayStyle}
        >{props.content.get('caption')}</a>
    </div>
  )
  const displayInterfaceNoClick = (
    <div>
      <a
        style={displayStyle}
        >{props.content.get('caption')}</a>
    </div>
  )

  // Display Logic
  // display editable interface
  if (props.editable === true) {
    return (<div>{editableInterface}</div>)
  } else {
    // disable button clickthrough if in editor (temporary fix) GH #170 --AB, 08/15
    if (props.editor) {
      return (<div>{displayInterfaceNoClick}</div>)
    } else {
      return (<div>{displayInterface}</div>)
    }
  }
  // API stuff, I think. Not sure when added. revisit. --AB, 08/15
  return ( { buttonBlock: buttonBlock } )
}
