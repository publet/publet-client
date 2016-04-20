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
import React, { PropTypes, Component } from 'react'
import { formatTime } from '../../../common/utils/format-time'
import { sortBy } from 'lodash'

// Component
export class LeadProfiles extends Component {
  // Temporary workaround. Sort should be handled in central store and w/ actions
  // --AB
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: 'engaged_time'
    }
    this.handleSortClick = this.handleSortClick.bind(this)
  }
  handleSortClick(e) {
    console.log(e.target.value)
    this.setState({sortMethod: e.target.value})
  }
  render() {
    let profiles = []
    let data = this.props.data
    data = sortBy(data, this.state.sortMethod)
    if (this.state.sortMethod === 'percent_read') {
      data.reverse()
    }
    data.map((profile, index) => {
      // Temporary workaround. toggling modal should be an action, and profileId
      // should be sent with it. --AB
      let profileListItem = (
        <li
          key={index}
          className="profile-list-item"
          onClick={this.props.toggleModal}
        >
          <p className="name">{profile.data.first_name} {profile.data.last_name}</p>
          <p className="engaged-time">{formatTime(profile.engaged_seconds)}</p>
          <p className="percent-read">{profile.percent_read}%</p>
        </li>
      )
      profiles.push(profileListItem)
    })

    return (
      <div className="lead-profiles">
        <header>
          <h4>Lead Profiles</h4>
          <button value="engaged_time" className="engaged-time" onClick={this.handleSortClick}>
            Engaged Time
          </button>
          <button value="percent_read" className="percent-read" onClick={this.handleSortClick}>
            Percent Read
          </button>
        </header>
        <ul className="profile-list">
          {profiles}
        </ul>
      </div>
    )
  };
}
