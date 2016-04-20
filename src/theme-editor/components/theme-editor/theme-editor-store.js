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

// API crap
var request = require('superagent')

// Actions
import { ThemeActions } from '../../../theme-editor/theme-actions.js'
import { CommonActions } from '../../../common/common-actions.js'

// Dummy API
var data = require('../../../theme-editor/dummyAPI-theme.js')

// Store
var ThemeEditorStore = Reflux.createStore({
  listenables: [ThemeActions, CommonActions],

  getInitialState: function() {
    this.data = null
    this.location = null
    return this.data
  },

  getData: function(location) {
    var baseUrl = config.api.theme.baseUrl;
    var apiCall = baseUrl + location + '/';

    // Load dummy data
    // this.data = Immutable.fromJS(data)
    // this.theme = this.data
    // ThemeActions.init(this.data)
    // this.trigger(this.data)

    // Load actual data
    request
      .get(apiCall)
      .withCredentials()
      .end(function (err, res) {
        // Make data immutable, assign to this.data
        this.data = Immutable.fromJS(res.body)
        this.location = location
        // save theme here & in theme store
        this.theme = this.data

        ThemeActions.init(this.data)

        this.establishPresence(this.data.getIn(['theme','id']))
        this.trigger(this.data)
        console.log('getData returned')
        console.log(this.data.toJS())
      }.bind(this))
  },

  establishPresence: function(id) {
    let apiCall = config.api.presence.baseUrl + '/' + id
    new WebSocket(apiCall)
  },

  // Loads initial data
  onLoad: function(location) {
    this.getData(location)
  },

  onSync: _.debounce(function(newData) {
    var baseUrl = config.api.theme.baseUrl;
    var apiCall = baseUrl + this.location + '/';
    console.log('Sync called')
    console.log(newData.toJS())
    request
      .patch(apiCall)
      .withCredentials()
      .type('json')
      .send(newData.toJS())
      .end(function(err, res) {
        // console.log('Error: ' + err)
        // console.log('Response obj:')
        // console.log(res)
      })
  }, 1000),

  onUpdateData: function(dataLocation, newData) {
    console.log('updateData called')
    console.log(newData.toJS())
    var oldData = this.data
    if (oldData.isSubset(newData) === false) {
      this.data = newData
      this.trigger(this.data)
      var diffData = diff(oldData, newData)
      CommonActions.sync(diffData)
    } else {
      console.log('updateData: no update found')
    }
  }

})

module.exports = ThemeEditorStore
