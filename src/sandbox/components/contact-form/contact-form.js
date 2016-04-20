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

// Dependency
var React = require('react')
var request = require('superagent')

// Component
var ContactForm = React.createClass({
  handleFormSubmit(event) {
    event.preventDefault()
    var email = event.target.elements[0].value
    if (email === '') {
      return false;
    }
    // This isn't working locally :(
    request
      .post('https://beta.publet.com/email')
      .set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
      .send({email: email})
      .end(function(err, res) {
        window.location.href = 'https://publet.com/thankyou.html'
      	if (res){
          console.log(res)
      	}
        else {
          console.log('Error: ' + err)
          console.log('Response obj:')
          console.log(res)
	       }
      })
  },
  render() {
    return (
      <form className="input-group email-submit-wrapper" onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your email..."
        />
        <span className="input-group-btn">
          <button className="btn email-submit-button" type="submit">
            Request full demo
          </button>
        </span>
      </form>
    )
  }
})

module.exports = ContactForm
