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

const initialState = {
  publicationID: undefined,
  loadState: 'No data',
  data: {
    avg_engaged_seconds: 0,
    avg_percent_read: 0,
    articles_by_avg_engaged_seconds: [],
    articles_by_avg_percent_read:[],
    actions_by_popularity: []
  }
}

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_DASHBOARD:
      return Object.assign({}, state, {
        data: action.data,
        loadState: action.loadState
      })
    case types.REQUEST_DASHBOARD:
    case types.FAIL_DASHBOARD:
      return Object.assign({}, state, {
        loadState: action.loadState
      })
    default:
      console.log('dashboard reducer returned default')
      return state
  }
}
