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

'use strict'

// Dependencies
import React from 'react'

// API crap
import * as request from 'superagent'
const userApiUrl = config.api.user

// Component
export class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: 'user'}
  }
  componentWillMount() {
    var username
    request
    .get(userApiUrl)
    .withCredentials()
    .end(function (err, res) {
      if (res) {
        this.setState({username:res.body.username})
      } else {
        this.setState({username:'Unknown User'})
        console.log('Unable to ascertain user')
        console.log(err)
      }

    }.bind(this))
  }
  render() {
    if (this.props.enabled) {
      return (
        <div className="navbar">
          <span className="left"><img className="publet-logo " src="media/publet-logo-dark.png" alt="Publet logo" /></span>
          <span className="right"><a className="user"><img src="media/user-icon.png" />{this.state.username}</a></span>
        </div>
      )
    } else {
      return (<span />)
    }
  }
}
