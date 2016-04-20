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

/* ROOT.JS
   This is the root container component for the entire Graphs application. Its
   sole purpose is to wrap the primary application in a redux <Provider> component
*/

import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from './App.js'

export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
          <App />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
