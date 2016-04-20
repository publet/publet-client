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

// Actions
import { ArticleActions } from '../../../../article-editor/article-actions.js'

//Components
import MoveBlockBtn from '../../block-controls/move-block-btn/move-block-btn.js'
import DeleteBlockBtn from '../../block-controls/delete-block-btn/delete-block-btn.js'

// Component
export class QuoteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { author: props.content.get('author'), quote: props.content.get('quote') };
    this.formUpdate = this.formUpdate.bind(this);
  }

  formUpdate(event) {
    let _state = {};
    _state[event.target.name] = event.target.value
    this.setState(_state);
    ArticleActions.updateBlock(event.target.name, event.target.value, this.props.cursor)
  }

  render() {
    if (this.props.editable === true) {
      var quoteStyleOptions = this.props.theme.get('quoteStyles').valueSeq().map(function(quoteStyleOption, i) {
        if (Immutable.Map.isMap(quoteStyleOption)) {
          quoteStyleOption = quoteStyleOption.toJS()
        }
        return (
          <option key={i} value={quoteStyleOption.name}>{quoteStyleOption.name}</option>
        )
      })
      var selectedStyle = this.props.content ? this.props.content.get('styleName') : 'default'
      return (
        <div>
          <form className="quote-block edit-panel">
            <div className="block-header grid-block">
              <div className="grid-content">
                Quote Block
                <DeleteBlockBtn cursor={this.props.cursor}/>
                <MoveBlockBtn className="move-block-btn" cursor={this.props.cursor}/>
              </div>
            </div>
            <div className="edit-form grid-block">
              <div className="grid-content medium-12">
                <label>Quote Text
                  <input debounceTimeout={1000} name="quote" type="text"
                         value={this.state.quote} onChange={this.formUpdate}/>
                </label>
              </div>
              <div className="grid-block">
                <div className="grid-content medium-6">
                  <label>Author
                    <input name="author" type="text"
                           value={this.state.author} onChange={this.formUpdate}/>
                  </label>
                </div>
                <div className="grid-content medium-6">
                  <label>Quote Style
                    <select name="styleName" value={selectedStyle} onChange={this.formUpdate}>
                      {quoteStyleOptions}
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      )
    }
    else {
      var displayStyleName = this.props.content.get('styleName') ? this.props.content.get('styleName') : 'default'
      var displayStyle = this.props.theme.getIn(['quoteStyles', displayStyleName, 'style'])
      if (Immutable.Map.isMap(displayStyle)) {
        displayStyle = displayStyle.toJS()
      }
      return (
        <div>
          <blockquote style={displayStyle}>
            {this.props.content.get('quote')} <br />
            -- {this.props.content.get('author')}
          </blockquote>
        </div>
      )
    }

  }
}