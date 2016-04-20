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

// Components
var EditVideoStyle = require('../../../theme-editor/components/edit-video-style/edit-video-style.js')
var DeleteStyleBtn = require('../../../theme-editor/components/delete-style-btn/delete-style-btn.js')

// Component
var VideoStyles = React.createClass({
  render: function() {
    var that = this
    var videoStyles = this.props.data.valueSeq().map(function(videoStyle, i){
      return (
        <div key={i} className="theme-style">
          <div className="name">
            <p>{videoStyle.get('name')}</p>
          </div>
          <div className="example">
            <video style={videoStyle.get('style').toJS()} className="video-js vjs-default-skin"
              controls preload="auto" width="100%"
              // poster={this.state.thumbUrl}
              data-setup='{"example_option":true}'>
             <source src="https://youtu.be/o0u4M6vppCI" type='video/mp4' />
             <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
            </video>
          </div>
          <div className="edit">
            <EditVideoStyle selectedStyle={videoStyle.get('name')} theme={that.props.theme} />
          </div>
          <DeleteStyleBtn
            styleType="videoStyles"
            styleName={videoStyle.get('name')}
          />
        </div>
      )
    })
    return (
      <div className="video-styles">
        <h2>Video Styles</h2>
        {videoStyles}
        <div className="theme-style">
          <div className="add">
            <EditVideoStyle buttonCopy="Add New Style" selectedStyle="new style" theme={this.props.theme} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = VideoStyles
