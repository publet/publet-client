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

import { LOAD_PROFILE, TOGGLE_PROFILE_SHOWN } from '../constants/ActionTypes'
import { profile as profileDummyData } from '../dummyAPI-graphs'

const initialState = {
  shown: false,
  profileID: undefined,
  loaded: false,
  profileData: undefined
}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        profileData: profileDummyData,
        ...state
      }
    default:
      return state
  }
}
