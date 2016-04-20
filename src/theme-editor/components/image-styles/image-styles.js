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
var EditImageStyle = require('../../../theme-editor/components/edit-image-style/edit-image-style.js')
var DeleteStyleBtn = require('../../../theme-editor/components/delete-style-btn/delete-style-btn.js')

// Component
var ImageStyles = React.createClass({
  render() {
    var that = this
    var imageStyles = this.props.data.valueSeq().map(function(imageStyle, i){
      return (
        <div key={i} className="theme-style">
          <div className="name">
            <p>{imageStyle.get('name')}</p>
          </div>
          <div className="example">
            <img src="http://www.placehold.it/300x150" style={imageStyle.get('style').toJS()} />
          </div>
          <div className="edit">
            <EditImageStyle selectedStyle={imageStyle.get('name')} theme={that.props.theme} />
          </div>
          <DeleteStyleBtn
            styleType="imageStyles"
            styleName={imageStyle.get('name')}
          />
        </div>
      )
    })
    return (
      <div className="image-styles">
        <h2>Image Styles</h2>
        {imageStyles}
        <div className="theme-style">
          <div className="add">
            <EditImageStyle buttonCopy="Add New Style" selectedStyle="new style" theme={that.props.theme} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = ImageStyles
