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
var React = require('react')
var Reflux = require('reflux')
var Immutable = require('immutable')

// Actions
import { CommonActions } from '../../../common/common-actions.js'
import { ThemeActions } from '../../../theme-editor/theme-actions.js'

// Components
import { Navbar } from '../../../common/components/navbar/navbar.js'
var ThemeOptions = require('../theme-options/theme-options.js')
var Theme = require('../theme/theme.js')

// Stores
var ThemeEditorStore = require('../theme-editor/theme-editor-store.js')

// Component
var ArticleEditor = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return {
      theme: null
    }
  },

  componentWillMount() {
    window.addEventListener("hashchange", this.locationHashChanged, false)
  },
  locationHashChanged() {
    CommonActions.load(location.hash.replace(/#/i, ''))
  },
  componentDidMount() {
    this.locationHashChanged()
    this.listenTo(ThemeEditorStore, this.updateData)
  },
  componentWillUnmount() {
    window.removeEventListener("hashchange", this.locationHashChanged, false)
  },

  updateData(changeObj) {
    this.setState({ theme: changeObj.get('theme') })
  },

  render() {
    return (
      <div className="grid-frame vertical">
        <Navbar enabled="true" />
        <ThemeOptions theme={this.state.theme} enabled="true"/>
        <Theme theme={this.state.theme} />
      </div>
    )
  }
})

module.exports = ArticleEditor
