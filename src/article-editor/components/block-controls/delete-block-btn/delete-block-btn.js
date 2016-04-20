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
const DeleteBlockBtn = (props) => {
  const handleClick = () => {
    ArticleActions.deleteBlock(props.cursor)
  }
  return (
    <div className="close-icon">
      <img src="media/close-icon-teal.png" onClick={handleClick} />
    </div>
  )
}
module.exports = DeleteBlockBtn;