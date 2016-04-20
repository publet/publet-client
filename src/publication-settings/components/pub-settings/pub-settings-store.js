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
import { PublicationActions } from '../../../publication-settings/publication-actions'
import { CommonActions } from '../../../common/common-actions.js'

// Store
var PubSettingsStore = Reflux.createStore({
  listenables: [PublicationActions, CommonActions],
  getInitialState() {
    this.data = null
    this.location = null
    return this.data
  },
  getData(location) {
    var baseUrl = config.api.publication.baseUrl;
    var apiCall = baseUrl + location + '/';
    request
      .get(apiCall)
      .withCredentials()
      .end(function (err, res) {
        // Make data immutable, assign to this.data
        this.data = Immutable.fromJS(res.body)
        // save response obj here & in pub store
        PublicationActions.init(this.data)

        // Need to enable tracking on publication. Check w/ HP --AB
        // this.establishPresence(this.data.getIn(['theme','id']))
        this.trigger(this.data)
        console.log('getData returned')
      }.bind(this))
  },
  // in-app analytics
  establishPresence(id) {
    let apiCall = config.api.presence.baseUrl + '/' + id
    new WebSocket(apiCall)
  },
  // Loads initial data
  onLoad(location) {
    this.getData(location)
    this.location = location
  },
  onSync: _.debounce(function(newData) {
    var baseUrl = config.api.publication.baseUrl
    var apiCall = baseUrl + this.location + '/'
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
  onUpdateData(newData) {
    console.log('updateData called')
    console.log(newData.toJS())
    var oldData = this.data
    if (oldData.isSubset(newData) === false) {
      this.data = newData
      this.trigger(this.data)
      var diffData = diff(oldData, newData)
      // CommonActions.sync(diffData)
    } else {
      console.log('updateData: no update found')
    }
  },




  // Two store system decided not to work. go go gadget one store system? --AB
  // Publication Store
  onToggleGate() {
    var gateEnabled = this.data.getIn(['publication','nav','gate', 'enabled'])
    gateEnabled ? gateEnabled = false : gateEnabled = true
    var updatedData = this.data.setIn(['publication', 'nav', 'gate', 'enabled'], gateEnabled)
    CommonActions.updateData(updatedData)
  },

  onUpdateGateContent(name, value) {
    var oldContent = this.data.getIn(['publication', 'nav', 'gate', 'content'])
    console.log(this.data.toJS())
    console.log(oldContent)
    var newContent = oldContent.set(name, value)
    var updatedData = this.data.setIn(['publication', 'nav', 'gate', 'content'], newContent)
    CommonActions.updateData(updatedData)
  },

  onUpdateGateCta(name, value) {
    var cursor = ['publication', 'nav', 'gate', 'form', 'cta']
    if (name !== 'label') {
      cursor = ['publication', 'nav', 'gate', 'form', 'cta', 'style']
    }
    var oldContent = this.data.getIn(cursor)
    var newContent = oldContent.set(name, value)
    var updatedData = this.data.setIn(cursor, newContent)
    CommonActions.updateData(updatedData)
  }

})

module.exports = PubSettingsStore
