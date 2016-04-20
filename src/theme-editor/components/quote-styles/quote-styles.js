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
var EditQuoteStyle = require('../../../theme-editor/components/edit-quote-style/edit-quote-style.js')
var DeleteStyleBtn = require('../../../theme-editor/components/delete-style-btn/delete-style-btn.js')

// Component
var QuoteStyles = React.createClass({
  render() {
    var that = this
    var quoteStyles = this.props.data.valueSeq().map(function(quoteStyle, i){
      return (
        <div key={i} className="theme-style">
          <div className="name">
            <p>{quoteStyle.get('name')}</p>
          </div>
          <div className="example">
            <blockquote style={quoteStyle.get('style').toJS()}>
              If you want to make an apple pie from scratch, you must first create the universe. <br />
              -- Carl Sagan
            </blockquote>
          </div>
          <div className="edit">
            <EditQuoteStyle selectedStyle={quoteStyle.get('name')} theme={that.props.theme}/>
          </div>
          <DeleteStyleBtn
            styleType="quoteStyles"
            styleName={quoteStyle.get('name')}
          />
        </div>
      )
    })
    return (
      <div className="quote-styles">
        <h2>Quote Styles</h2>
        {quoteStyles}
        <div className="theme-style">
          <div className="add">
            <EditQuoteStyle buttonCopy="Add New Style" selectedStyle={"new style"} theme={this.props.theme} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = QuoteStyles
