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

// Actions
import { ThemeActions } from '../../../theme-editor/theme-actions.js'

// Components
var CloseBtn = require('../../../common/components/close-btn/close-btn.js')

// Microcomponents
var AddTypefaceForm = React.createClass({
  getInitialState: function() {
    return {
      name: null,
      weight: null,
      url: null
    }
  },
  filepicker: function(e) {
    e.preventDefault()
    var that = this
    filepicker.pick({
      policy: window.FP.write.policy,
      signature: window.FP.write.signature,
      extensions: ['.otf', '.ttf','.woff','.woff2'],
      maxSize: 1024 * 1024 * 5, /* 5mb */
      services: ['COMPUTER'] /* All available third-parties */
    }, function(blob){
      var fpAuth = '?signature=' + window.FP.read.signature + '&policy=' + window.FP.read.policy
      var url = blob.url + fpAuth
      that.setState({url: url})
    },function(FPError){
      console.log('error')
      console.log(FPError)
      console.log(FPError.toString())
    })
  },
  handleSubmit: function(e) {
    e.preventDefault()
    ThemeActions.addTypeface(this.state.name, this.state.weight, this.state.url)
    this.setState({
      name: null,
      weight: null,
      url: null
    })
  },
  updateState: function(e) {
    var stateUpdate = new Object()
    stateUpdate[e.target.name] = e.target.value
    this.setState(stateUpdate)
  },
  render: function() {
    return (
      <form className="add-typeface">
        <div className="input">
          <span className="label">Name</span>
          <input
            name="name"
            value={this.state.name}
            onChange={this.updateState} />
        </div>
        <div className="inline-input">
          <div className="input">
            <span className="label">Font Weight</span>
            <input
              name="weight"
              value={this.state.weight}
              onChange={this.updateState} />
          </div>
          <div className="input">
            <span className="label">Font File</span>
            <button className="button upload" onClick={this.filepicker}>{this.state.url ? '\u2714' : 'Upload'}</button>
          </div>
        </div>
        <div className="submit">
          <button
            className="button"
            onClick={this.handleSubmit}>
            Add Typeface
          </button>
        </div>
      </form>
    )
  }
})

var DeleteTypefaceBtn = React.createClass({
  handleClick: function(e) {
    ThemeActions.deleteTypeface(e.target.name)
  },
  render: function() {
    return (
      <div className="delete-typeface">
        <CloseBtn name={this.props.name} onClick={this.handleClick} />
      </div>
    )
  }
})

// Component
var FontSettings = React.createClass({
  render: function() {
    var typefaces = this.props.data.map(function(typeface, i) {
      var headerStyle = {
        fontFamily: typeface.get('fontFamily'),
        textTransform: "capitalize"
      }
      return (
        <div key={i} className="typeface">
          <div className="header">
            <h4 style={headerStyle}>{typeface.get('name')}</h4>
            <DeleteTypefaceBtn name={typeface.get('name')} />
          </div>
        </div>
      )
    })
    return (
      <div className="font-settings">
        <h2>Font Settings</h2>
        <div className="typefaces">
          {typefaces}
          <div className="typeface">
            <h4>Add Typeface</h4>
            <AddTypefaceForm />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = FontSettings
