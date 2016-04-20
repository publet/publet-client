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
import { withScrollLock } from '../../../common/components/scroll-lock/scroll-lock.js'
import { ProfileInfo } from '../profile-info/profile-info'
import { ProfileStats } from '../profile-stats/profile-stats'
import { ActionHistory } from '../action-history/action-history'

// Component
@withScrollLock
export class Profile extends React.Component {
  render() {
    return (
      <div className="modal edit-button-style">
        <div className="modal-header grid-block">
          <div className="grid-content">
            Lead Profile - {this.props.profile.getIn(['gate_data', 'name'])}
            <div className="close-icon">
              <img src="media/close-icon-teal.png" onClick={this.props.closeFn} />
            </div>
          </div>
        </div>

        <div className="grid-block modal-content">
          <div className="analytics grid-content medium-12">
            <div className="lead-profile">

              <div className="profile-sidebar">
                <ProfileInfo
                  name={this.props.profile.getIn(['gate_data','name'])}
                  jobTitle={this.props.profile.getIn(['gate_data','job_title'])}
                  company={this.props.profile.getIn(['gate_data','company'])}
                  location={this.props.profile.get('location')}
                  device={this.props.profile.get('device')}
                  email={this.props.profile.getIn(['gate_data', 'email'])}
                  photo={this.props.profile.getIn(['gate_data','photo_url'])}
                />
              </div>

              <div className="profile-main">
                <ProfileStats
                  engagedSeconds={this.props.profile.get('engaged_seconds')}
                  percentRead={this.props.profile.get('percent_read')}
                />
                <ActionHistory history={this.props.profile.get('action_history')} />
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}

//export default ScrollLockComponent(LeadProfile)
