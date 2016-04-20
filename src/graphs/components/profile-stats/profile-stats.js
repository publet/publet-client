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
import { formatTime } from '../../../common/utils/format-time'

export const ProfileStats = (props) => {
  return (
    <div className="profile-stats">
      <div className="engaged-time stat">
        <label>Engaged Time</label>
        <h2>{formatTime(props.engagedSeconds)}</h2>
      </div>
      <div className="percent-read stat">
        <label>Percent Read</label>
        <h2>{props.percentRead}%</h2>
      </div>
    </div>
  )
}
