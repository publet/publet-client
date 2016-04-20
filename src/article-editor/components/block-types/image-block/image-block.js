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
var _ = require('lodash')

// Actions
import { ArticleActions } from '../../../../article-editor/article-actions.js'
//Components
import MoveBlockBtn from '../../block-controls/move-block-btn/move-block-btn.js'
import DeleteBlockBtn from '../../block-controls/delete-block-btn/delete-block-btn.js'

// Component
export class ImageBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { caption: props.content.get('caption'), alt: props.content.get('alt') };
    this.formUpdate = this.formUpdate.bind(this);
    this.filepickerHandler = this.filepickerHandler.bind(this);
  }

  filepickerHandler(e) {
    e.preventDefault()
    filepicker.pick({
      policy: window.FP.write.policy,
      signature: window.FP.write.signature,
      mimetype: 'image/*', /* Images only */
      maxSize: 1024 * 1024 * 5, /* 5mb */
      services: ['COMPUTER', 'URL', 'DROPBOX', 'GOOGLE_DRIVE', 'SKYDRIVE', 'BOX', 'FLICKR', 'INSTAGRAM', 'FACEBOOK', 'EVERNOTE', 'CONVERT'], /* All available third-parties */
      conversions: ['crop']
    }, function(blob) {
      var filename = blob.filename;
      var id = blob.id;
      var isWriteable = blob.isWriteable;
      var mimetype = blob.mimetype;
      var size = blob.size;

      var fpAuth = '';

      if (_.contains(blob.url, 'crop')) {
        fpAuth = '&';
      } else {
        fpAuth = '?';
      }

      fpAuth = fpAuth + 'signature=' + window.FP.read.signature + '&policy=' + window.FP.read.policy;

      var url = blob.url + fpAuth
      ArticleActions.updateBlock('url', url, this.props.cursor)
    }.bind(this), function(FPError) {
      console.log('error')
      console.log(FPError)
      console.log(FPError.toString())
    })
  }

  formUpdate(event) {
    let _state = {};
    _state[event.target.name] = event.target.value
    this.setState(_state);
    ArticleActions.updateBlock(event.target.name, event.target.value, this.props.cursor)
  }

  render() {
    if (this.props.editable === true) {
      var imageStyleOptions = this.props.theme.get('imageStyles').valueSeq().map(function(imageStyleOption, index) {
        if (Immutable.Map.isMap(imageStyleOption)) {
          imageStyleOption = imageStyleOption.toJS()
        }
        return (
          <option key={index} value={imageStyleOption.name}>{imageStyleOption.name}</option>
        )
      })
      var selectedStyle = this.props.content ? this.props.content.get('styleName') : 'default'
      var thumbnail
      if (this.props.content ? this.props.content.get('url') : null) {
        thumbnail = <div className="thumbnail"><img src={this.props.content?this.props.content.get('url'):null}/></div>
      } else {
        thumbnail = <span />
      }
      return (
        <div>
          <form className="img-block edit-panel">
            <div className="block-header grid-block">
              <div className="grid-content">
                Image Block
                <DeleteBlockBtn cursor={this.props.cursor}/>
                <MoveBlockBtn className="move-block-btn" cursor={this.props.cursor}/>
              </div>
            </div>

            <div className="edit-form grid-block">

              <div className="grid-content medium-12">
                <label>Image Preview
                  <div className="img-preview">
                    {thumbnail}
                    <div className="file-chooser">
                      <button className="button" onClick={this.filepickerHandler}>Choose Image</button>
                    </div>
                  </div>
                </label>
              </div>

              <div className="grid-block">
                <div className="grid-content medium-6">
                  <label>Image Alt Text
                    <input name="alt" type="text" value={this.state.alt}
                           onChange={this.formUpdate}/>
                  </label>
                </div>
                <div className="grid-content medium-6">
                  <label className="img-style">Image Style
                    <select name="styleName" value={selectedStyle} onChange={this.formUpdate}>
                      {imageStyleOptions}
                    </select>
                  </label>
                </div>
              </div>

              <div className="grid-content medium-12">
                <label>Image Caption
                  <input name="caption" type="text" value={this.state.caption}
                         onChange={this.formUpdate}/>
                </label>
              </div>
            </div>
          </form>
        </div>
      )
    } else {
      var displayStyleName = this.props.content.get('styleName') ? this.props.content.get('styleName') : 'default'
      var displayStyle = this.props.theme.getIn(['imageStyles', displayStyleName, 'style'])
      if (Immutable.Map.isMap(displayStyle)) {
        displayStyle = displayStyle.toJS()
      }
      return (
        <div className="image-block">
          <img style={displayStyle} src={this.props.content?this.props.content.get('url'):null}
               alt={this.props.content?this.props.content.get('alt'):null}/>
          <label className="caption-default">{this.props.content ? this.props.content.get('caption') : null}</label>
        </div>
      )
    }
  }

}
