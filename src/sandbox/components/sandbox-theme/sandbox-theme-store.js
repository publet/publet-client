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
var diff = require('immutablediff')
var _ = require('lodash')
var defaultData = require('../../../sandbox/default-data');

// Actions
import { ThemeActions }from '../../../theme-editor/theme-actions.js'
import { CommonActions } from '../../../common/common-actions.js'
import { SandboxThemeActions } from './theme-actions.js'

// Dummy API
var data = require('../../data.js')

// Store
var SandboxThemeStore = Reflux.createStore({
  listenables: [ThemeActions, CommonActions, SandboxThemeActions],

  getInitialState: function() {
    this.data = null
    this.location = null
    return this.data
  },

  onReset: function() {
    console.log('Theme Store Reset called')
    localStorage.removeItem('theme');
    data.theme = defaultData.theme;
    this.getData()
  },

  getData: function(location) {
    // Load dummy data
    this.data = Immutable.fromJS(data)
    this.theme = this.data
    ThemeActions.init(this.data)
    this.trigger(this.data)
  },

  // Loads initial data
  onLoad: function() {
    this.getData()
  },

  onSync: _.debounce(function(newData) {
    // unused
  }, 1000),

  onUpdateData: function(dataLocation, newData) {
    console.log('updateData called')
    console.log(newData.toJS())
    var oldData = this.data
    if (oldData.isSubset(newData) === false) {
      this.data = newData
      //save the new articles to localstorage
      if (dataLocation === 'theme') {
        var theme = newData.toJSON().theme;
        theme = JSON.stringify(theme);
        localStorage.setItem('theme', theme)
      }

      this.trigger(this.data)
      var diffData = diff(oldData, newData)
      CommonActions.sync(diffData)
    } else {
      console.log('updateData: no update found')
    }
  }

})

module.exports = SandboxThemeStore
