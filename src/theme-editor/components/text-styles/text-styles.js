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
var cx = require('classnames')

// Components
var EditTextStyle = require('../../../common/components/edit-text-style/edit-text-style')
var DeleteStyleBtn = require('../../../theme-editor/components/delete-style-btn/delete-style-btn.js')

// Component
var TextStyles = React.createClass({
  render: function() {
    var that = this
    var textStyles = this.props.data.valueSeq().map(function(textStyle, i) {
      var fontSize = parseInt(textStyle.getIn(['style', 'fontSize']), 10)
      var exampleText
      if (fontSize > 47) {
        exampleText = <p>Engine disposable</p>
      } else if (fontSize > 35 ) {
        exampleText = <p style={textStyle.get('style').toJS()}>Engine disposable kanji</p>
      } else if (fontSize > 23 ) {
        exampleText = <p style={textStyle.get('style').toJS()}>Engine disposable kanji refrigerator</p>
      } else if (fontSize > 15 ) {
        exampleText = <p style={textStyle.get('style').toJS()}>Engine disposable kanji refrigerator engine drugs</p>
      } else {
        exampleText = <p style={textStyle.get('style').toJS()}>Engine disposable kanji refrigerator engine drugs man industrial grade</p>
      }
      return (
        <div className="theme-style" key={i}>
          <div className="name">
            <p>{textStyle.get('name')}</p>
          </div>
          <div className="example">
            {exampleText}
          </div>
          <div className="edit">
            <EditTextStyle selectedStyle={textStyle.get('name')} theme={that.props.theme}/>
          </div>
          <DeleteStyleBtn
            styleType="textStyles"
            styleName={textStyle.get('name')}
          />
        </div>
      )
    })
    return (
      <div className="theme-styles text">
        <h2>Text Styles</h2>
        {textStyles}
        <div className="theme-style">
          <div className="add">
            <EditTextStyle buttonCopy="Add New Style" selectedStyle="new style" theme={that.props.theme} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = TextStyles
