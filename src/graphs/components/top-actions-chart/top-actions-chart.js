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
import ChartistGraph from 'react-chartist'

export const TopActionsChart = (props) => {
  let data = {
    labels: [],
      series: [[]]
  }

  let actions = props.actionsByPopularity || []

  actions.map( (action) => {
    data.labels.push(action.name)
    data.series[0].push(action.value)
  })

  let options = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  }

  let responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 40,
      chartPadding: 20
    }]
  ]

  return (
    <div className="top-actions-chart">
      <h1>Top Actions by Click</h1>
      <ChartistGraph data={data} options={options} responsiveOptions={responsiveOptions} type={'Bar'} />
    </div>
  )
}
