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

import React from 'react'
import { formatTime } from '../../../common/utils/format-time'

// Component
export const PubAvgChart = (props) => {
  return (
    <div className="publication avg-chart">
      <h1>Publication Avg.</h1>
      <h2>{formatTime(props.avgEngagedSeconds)}</h2>
      <p>Engaged Time</p>
      <h2>{props.avgPercentRead}%</h2>
      <p>Pub. read</p>
    </div>
  )
}
