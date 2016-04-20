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

// Components
import { ContentMetrics } from '../content-metrics/content-metrics.js'
import { AudienceMetrics } from '../audience-metrics/audience-metrics.js'
import { LeadProfiles } from '../lead-profiles/lead-profiles.js'

// Component
export function Dashboard(props) {
  if (props.loadState !== true) {
    return (<p>{props.loadState}</p>)
  } else {
    return (
      <div className="dashboard">
        <div className="metrics">
          <ContentMetrics {...props} />
          <AudienceMetrics {...props} />
        </div>

        <LeadProfiles {...props} data={props.data.lead_profiles} />
      </div>
    )
  }
}
