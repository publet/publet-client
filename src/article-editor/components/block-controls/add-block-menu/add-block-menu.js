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

// Actions
import { ArticleActions } from '../../../../article-editor/article-actions.js'

// Component
export const AddBlockMenu = (props) => {
  const handleAddBlock = (e) => {
    e.preventDefault()
    var selectedBlockType = e.currentTarget.name
    ArticleActions.closeAddBlockMenu()
    props.selfDestruct ? ArticleActions.addBlock(props.cursor, selectedBlockType, true) : ArticleActions.addBlock(props.cursor, selectedBlockType)
  }
  const handleClose = () => {
    ArticleActions.closeAddBlockMenu()
  }
  return (
    <div className="add-block menu">
      <form className="img-block edit-panel">
        <div className="block-header grid-block">
          <div className="grid-content">
            Choose Block Type
            <div className="close-icon">
              <img src="media/close-icon-teal.png" onClick={handleClose} />
            </div>
          </div>
        </div>

        <div className="edit-form grid-block">
          <ul className="button-group small">
            <li className="block-type-option">
              <a name="text" href="#" onClick={handleAddBlock}>
                <img src="media/textBlock-lightTeal-80x80.png" />
                <label>Text</label>
              </a>
            </li>
            <li className="block-type-option">
              <a name="image" href="#" onClick={handleAddBlock}>
                <img src="media/imageBlock-lightTeal-80x80.png" />
                <label>Image</label>
              </a>
            </li>
            <li className="block-type-option">
              <a name="button" href="#" onClick={handleAddBlock}>
                <img src="media/buttonBlock-lightTeal-80x80.png" />
                <label>Button</label>
              </a>
            </li>
            <li className="block-type-option">
              <a name="quote" href="#" onClick={handleAddBlock}>
                <img src="media/quoteBlock-lightTeal-80x80.png" />
                <label>Quote</label>
              </a>
            </li>
            <li className="block-type-option">
              <a name="video" href="#" onClick={handleAddBlock}>
                <img src="media/videoBlock-lightTeal-80x80.png" />
                <label>Video</label>
              </a>
            </li>
          </ul>
        </div>
      </form>
    </div>
  )
}
