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
var EditButtonStyle = require('../../../theme-editor/components/edit-button-style/edit-button-style.js')
var DeleteStyleBtn = require('../../../theme-editor/components/delete-style-btn/delete-style-btn.js')

// Component
var ButtonStyles = React.createClass({
  render: function() {
    var that = this
    var buttonStyles = this.props.data.valueSeq().map(function(buttonStyle, i){
      return (
        <div key={i} className="button-style">
          <div className="name">
            <p>{buttonStyle.get('name')}</p>
          </div>
          <div className="example">
            <button className="button" style={buttonStyle.get('style').toJS()}>{buttonStyle.get('name')}</button>
          </div>
          <div className="edit">
            <EditButtonStyle selectedStyle={buttonStyle.get('name')} theme={that.props.theme} />
          </div>
          <DeleteStyleBtn
            styleType="buttonStyles"
            styleName={buttonStyle.get('name')}
          />
        </div>
      )
    })
    return (
      <div className="button-styles">
        <h2>Button Styles</h2>
        {buttonStyles}
        <div className="button-style">
          <div className="add">
            <EditButtonStyle buttonCopy="Add New Style" selectedStyle="new style" theme={this.props.theme} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = ButtonStyles
