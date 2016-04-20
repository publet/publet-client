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
import React from 'react'
import Reflux from 'reflux'
import * as Immutable from 'immutable'
var diff = require('immutablediff')
import * as _ from 'lodash'

// API crap
import * as request from 'superagent'

// Dummy API
import { data } from '../../../article-editor/dummyAPI-article.js'

// Actions
import { ArticleActions } from '../../../article-editor/article-actions.js'
import { CommonActions } from '../../../common/common-actions.js'
import { ThemeActions } from '../../../theme-editor/theme-actions.js'

// Store
export const ArticleEditorStore = Reflux.createStore({
  listenables: [ArticleActions, CommonActions],

  // Set initial vars to null, broadcast whole state
  getInitialState() {
    this.data = null
    this.location = null
    return this.data;
  },

  // API Calls
  getData(location) {
    console.log('getData called')
    var baseUrl = config.api.articles.baseUrl;
    var apiCall = baseUrl + location + '/';
    request
      .get(apiCall)
      .withCredentials()
      .end(function(err, res) {
        // Make data immutable, assign to this.data
        if (err) {
          var error = { error: { status: err.status, message: err.message } };
          this.data = Immutable.fromJS(error);
          this.trigger(this.data)
          return;
        }
        console.log('getData response')
        console.log(res.body)
        this.data = Immutable.fromJS(res.body)
        this.location = location

        // save article here & in article store
        this.article = this.data.get('article')
        ArticleActions.init(this.article)
        this.establishPresence(this.article.get('id'))

        // save theme here & in theme store
        this.theme = this.data.get('theme')
        ThemeActions.init(this.theme)

        this.trigger(this.data)
      }.bind(this))
    // this.data = Immutable.fromJS(data)
    // this.article = this.data.get('article')
    // ArticleActions.init(this.article)
    // this.establishPresence(this.article.get('id'))
    // this.theme = this.data.get('theme')
    // ThemeActions.init(this.theme)
    // this.trigger(this.data)
  },

  // Tracking
  establishPresence(id) {
    let apiCall = config.api.presence.baseUrl + '/' + id
    new WebSocket(apiCall)
  },

  // Action Handlers
  onLoad(location) {
    this.getData(location)
  },
  onSync: _.debounce(function(newData) {
    var baseUrl = config.api.articles.baseUrl;
    var apiCall = baseUrl + this.location + '/';
    console.log('Sync called')
    console.log(newData.toJS())
    request
      .patch(apiCall)
      .withCredentials()
      .type('json')
      .send(newData.toJS())
      .end(function(err, res) {
        if (err) {
          console.log('Error: ' + err)
          console.log('Response obj:')
          console.log(res)
        }
      })
  }, 1000),
  onUpdateData(dataLocation, updatedData) {
    console.log('Update Data called')
    // console.log(updatedData.toJS())
    var oldData = this.data
    var newData = this.data.set(dataLocation, updatedData)
    // console.log(newData.toJS())
    // console.log(oldData.toJS())
    if (oldData.isSubset(newData) === false) {
      var diffData = diff(oldData, newData)
      // console.log(diffData.toJS())
      this.data = newData
      CommonActions.sync(diffData)
      this.trigger(this.data)
    } else {
      // console.log('updateData: no update found')
    }
  }
})
