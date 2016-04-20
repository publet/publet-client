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
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import ChartistGraph from 'react-chartist'

export function Chart(props) {
  let data = {
    labels: ['Bananas', 'Apples', 'Grapes'],
      series: [20, 15, 40]
  }
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
  let type = 'Pie'
  return (
    <div>
      <ChartistGraph data={data} options={options} responsiveOptions={responsiveOptions} type={type} />
    </div>
  )
}