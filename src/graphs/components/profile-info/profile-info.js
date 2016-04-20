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

import React, { PropTypes, Component } from 'react'

export const ProfileInfo = (props) => {
  let profilePhoto = props.photo ? props.photo : 'http://placehold.it/300x300'
  return (
    <div className="profile-info">
      <img className="profile-image" src={profilePhoto} />
      <h3>{props.name}</h3>
      <p className="employment">
        <strong>{ props.jobTitle}</strong> at <strong>{props.company}</strong>
      </p>
      <p className="location">{props.location}</p>
      <p className="device">Accessed publication on <strong>{props.device}</strong></p>
      <a className="button" href={'mailto:' + props.email} target="_blank">Email {props.name}</a>
    </div>
  )
}
