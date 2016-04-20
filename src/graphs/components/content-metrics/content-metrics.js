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
import React, { PropTypes, Component } from 'react'

// Components
import { Chart } from '../chart/chart.js'
import { PubAvgChart } from '../pub-avg-chart/pub-avg-chart'
import { ArticleAvgChart } from '../article-avg-chart/article-avg-chart'
import { TopActionsChart } from '../top-actions-chart/top-actions-chart'

// Component
export const ContentMetrics = (props) => {
  console.log('ContentMetrics.props', props);
  return (
    <div className="content">
      <h3>Content Performance</h3>
      <div className="widgets">
        <div className="widget narrow">
          <PubAvgChart
            avgEngagedSeconds={props.data.dashboard.avg_engaged_seconds}
            avgPercentRead={props.data.dashboard.avg_percent_read}
          />
        </div>
        <div className="widget">
          <ArticleAvgChart
            engagedTime={props.data.dashboard.articles_by_avg_engaged_seconds}
            percentRead={props.data.dashboard.articles_by_avg_percent_read}
          />
        </div>
        <div className="widget">
          <TopActionsChart actionsByPopularity={props.data.dashboard.actions_by_popularity} />
        </div>
      </div>
    </div>
  )
}
