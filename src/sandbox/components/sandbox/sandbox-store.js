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

// Ideally, this store would cover both article and theme editor.
// The goal being data persisting across theme and article editor
// when users go back and forth in the sandbox. Right now, it doesn't.

// Dependencies
var React = require('react')
var Reflux = require('reflux')
var Immutable = require('immutable')
var diff = require('immutablediff')

// Data
var data = require('../../data.js')

// Actions
import { ThemeActions } from '../../../theme-editor/theme-actions.js'
import { ArticleActions } from '../../../article-editor/article-actions.js'
import { CommonActions } from '../../../common/common-actions.js'

// Store
var SandboxStore = Reflux.createStore({
  listenables: [ThemeActions, ArticleActions, CommonActions],
  getInitialState: function() {
    this.data = Immutable.fromJS({
      article: data.article,
      theme: data.theme,
      nav: data.nav,
      group:data.group,
      publication:data.publication
    })
    return this.data;
  },
  onLoad: function() {
    if (!this.data) {
      this.data = Immutable.fromJS({
        article: data.article,
        theme: data.theme,
        nav: data.nav,
        group:data.group,
        publication:data.publication
      })
    }
    ArticleActions.init(this.data)
    ThemeActions.init(this.data)
    this.trigger(this.data)
  },
  onUpdateData: function(dataLocation, updatedData) {
    var oldData = this.data
    var newData = this.data.set(dataLocation, updatedData)
    if (oldData.isSubset(newData) === false) {
      var diffData = diff(oldData, newData)
      this.data = newData
      this.trigger(this.data)
    } else {
      // console.log('updateData: no update found')
    }
  }
})

module.exports = SandboxStore
