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

// Component
var DemoGate = React.createClass({
  render() {
    var formInputs = []
    this.props.form.get('inputs').map((input, index) => {
      var formInput = (
        <div key={index} className={input.get('width')}>
          <div className="input">
            <span className="label">{input.get('label')}</span>
            <input className="field" type={input.get('type')}/>
          </div>
        </div>
      )
      formInputs.push(formInput)
    })
    var ctaBtnStyle = this.props.form.getIn(['cta', 'style'], {}).toJS()
    return (
      <div className="demo-gate">
        <div className="modal edit-button-style">

          <div style={{backgroundColor: this.props.content.get('titleBgColor', null)}} className="modal-header grid-block">
            <div className="grid-content">
              <span style={{color: this.props.content.get('titleTextColor', null)}}>
                {this.props.content.get('title', 'Gate Title')}
              </span>
            </div>
          </div>

          <div style={{backgroundColor: this.props.content.get('backgroundColor', null)}} className="grid-block modal-content">
            <div className="analytics grid-content medium-12">
              <h4 style={{color: this.props.content.get('headerTextColor', null)}}>
                {this.props.content.get('header', 'Gate Header')}
              </h4>
              <p style={{color: this.props.content.get('bodyTextColor', null)}}>
                {this.props.content.get('body', 'Gate Body Copy')}
              </p>
              <form id="gate-form" className="gate-form">
                {formInputs}
                <button
                  id="gate-cta-btn"
                  style={ctaBtnStyle}
                  type="submit"
                >
                  {this.props.form.getIn(['cta', 'label'], 'Default CTA Message')}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    )
  }
})

module.exports = DemoGate
