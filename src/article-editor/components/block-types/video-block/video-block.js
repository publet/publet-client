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
export class VideoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { caption: props.content.get('caption')};
    this.formUpdate = this.formUpdate.bind(this);
    this.filepickerHandler  = this.filepickerHandler.bind(this);
    this.posterUpload  = this.posterUpload.bind(this);
  }
  filepickerHandler(e) {
    e.preventDefault()
    var that = this
    filepicker.pick({
      policy: window.FP.write.policy,
      signature: window.FP.write.signature,
      mimetype: 'video/*', /* Videos only */
      services: ['COMPUTER', 'URL', 'DROPBOX', 'GOOGLE_DRIVE', 'SKYDRIVE', 'BOX'] /* All available third-parties */
    }, function(blob) {
      var filename = blob.filename;
      // This only works for images, damnit. --AB, 10/2015
      var thumbUrl = blob.thumb300x300
      var id = blob.id;
      var isWriteable = blob.isWriteable;
      var mimetype = blob.mimetype;
      var size = blob.size;

      var fpAuth = '?signature=' + window.FP.read.signature + '&policy=' + window.FP.read.policy
      var url = blob.url + fpAuth
      ArticleActions.updateBlock('url', url, this.props.cursor)
    }, function(FPError) {
      console.log('error')
      console.log(FPError)
      console.log(FPError.toString())
    })
  }

  //Custom poster for videos
  posterUpload(e) {
    e.preventDefault()
    filepicker.pick({
      policy: window.FP.write.policy,
      signature: window.FP.write.signature,
      mimetype: 'image/*', /* Images only */
      services: ['COMPUTER', 'URL', 'DROPBOX', 'GOOGLE_DRIVE', 'SKYDRIVE', 'BOX'] /* All available third-parties */
    }, function(blob) {
      var fpAuth = '?signature=' + window.FP.read.signature + '&policy=' + window.FP.read.policy
      var url = blob.url + fpAuth
      ArticleActions.updateBlock('posterUrl', url, this.props.cursor)
    }.bind(this), function(FPError) {
      console.log('error')
      console.log(FPError)
      console.log(FPError.toString())
    });
  }

  formUpdate(event) {
    let _state = {};
    _state[event.target.name] = event.target.value
    this.setState(_state);
    ArticleActions.updateBlock(event.target.name, event.target.value, this.props.cursor)
  }

  render() {
    if (this.props.editable === true) {
      var videoStyleOptions = this.props.theme.get('videoStyles').valueSeq().map(function(videoStyleOption, index) {
        if (Immutable.Map.isMap(videoStyleOption)) {
          videoStyleOption = videoStyleOption.toJS()
        }
        return (
          <option key={index} value={videoStyleOption.name}>{videoStyleOption.name}</option>
        )
      })
      var selectedStyle = this.props.content ? this.props.content.get('styleName') : 'default'
      // var selectOpts = props.theme.imageStyles.forEach(option, function{
      //   return <option value={option.key}>{option.value}</option>
      // })
      var thumbnail
      // if (props.content?props.content.get('url'):null) {
      //   thumbnail = <div className="thumbnail"><img src={props.content?props.content.get('url'):null} /></div>
      // } else {
      //   thumbnail = <span />
      // }
      return (
        <div>
          <form className="img-block edit-panel">
            <div className="block-header grid-block">
              <div className="grid-content">
                Video Block
                <DeleteBlockBtn cursor={this.props.cursor}/>
                <MoveBlockBtn className="move-block-btn" cursor={this.props.cursor}/>
              </div>
            </div>

            <div className="edit-form grid-block">

              <div className="grid-content medium-6">
                <label>Video Preview
                  <div className="img-preview edit-video-preview">
                    <div className="thumbnail">
                      <video
                        poster={this.props.content?this.props.content.get('posterUrl'):null}
                        id="example_video_1" className="video-js vjs-default-skin"
                        controls preload="auto" width="auto"
                        data-setup='{"example_option":true}'>
                        <source src={this.props.content?this.props.content.get('url'):null} type='video/mp4'/>
                        <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to
                          a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports
                            HTML5 video</a></p>
                      </video>
                    </div>
                  </div>
                </label>
              </div>
              <div className=" grid-content medium-6 file-chooser video-chooser">
                <button className="button" onClick={this.filepickerHandler}>Choose Video</button>
              </div>
              <div className="grid-block">
                <div className="grid-content medium-6">
                  <label className="img-style">Video Style
                    <select name="styleName" value={selectedStyle} onChange={this.formUpdate}>
                      {videoStyleOptions}
                    </select>
                  </label>
                </div>

                <div className="grid-content medium-6 poster-chooser">
                  <label className="img-style">Thumbnail</label>
                  <input name="posterchooser" className=" posterchooser button" type="button" onClick={this.posterUpload}
                         value="Choose Image"/>
                </div>
              </div>

              <div className="grid-content medium-12">
                <label className="img-style">Video Caption
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
      var displayStyle = this.props.theme.getIn(['quoteStyles', displayStyleName, 'style'])
      if (Immutable.Map.isMap(displayStyle)) {
        displayStyle = displayStyle.toJS()
      }
      return (
        <div className="image-block">
          <video id="example_video_1" className="video video-js vjs-default-skin"
                 poster={this.props.content?this.props.content.get('posterUrl'):null}
                 controls preload="auto" width="auto"
                 data-setup='{"example_option":true}'
                 style={displayStyle}>
            <source src={this.props.content?this.props.content.get('url'):null} type='video/mp4'/>
            <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web
              browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
          </video>
          <label className="caption-default">{this.props.content ? this.props.content.get('caption') : null}</label>
        </div>
      )
    }
  }

}
