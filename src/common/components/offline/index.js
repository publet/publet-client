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
import 'offline-js/offline'
import 'offline-js/themes/offline-language-english.css'
import 'offline-js/themes/offline-theme-chrome.css'

export default class Offline  extends React.Component {

  componentDidMount() {
    // Use this url to check if internet connection is on (maybe create a specific endpoint for this)
    window.Offline.options = {checks: {image: {url: 'media/publet-logo-dark.png'}, active: 'image'}}
  }

  render() {
    return false;
  }
}
