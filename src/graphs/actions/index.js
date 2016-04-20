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

import * as types from '../constants/ActionTypes'
import * as request from 'superagent'

export function requestDashboard(publicationId) {
  return {
    type: types.REQUEST_DASHBOARD,
    loadState: 'Loading...'
  }
}

export function receiveDashboard(publicationId, data) {
  console.log('receiveDashboard', data);
  return {
    type: types.RECEIVE_DASHBOARD,
    data: data,
    loadState: true,
    publicationID: publicationId
  }
}

export function failDashboard(publicationId) {
  return {
    type: types.FAIL_DASHBOARD,
    loadState: 'Failed to load data',
    publicationID: publicationId
  }
}

export function fetchDashboard(publicationId) {
  return function(dispatch) {
    dispatch(requestDashboard(publicationId))

    const url = window.config.api.insights.baseUrl + '/api/1/publication/' + publicationId;

    return request.get(url).withCredentials().end(function(err, res) {
      if (err) {
        return dispatch(failDashboard(publicationId))
      }
      // TODO: Add error handling
      dispatch(receiveDashboard(publicationId, res.body))
    })

  }
}

export function loadProfile() {
}

export function toggleProfileShown() {
}
