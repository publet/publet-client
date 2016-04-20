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

// Data
var data = require('../../data.js')
var defaultData = require('../../../sandbox/default-data')

// Actions
import { ArticleActions } from '../../../article-editor/article-actions.js'
import { CommonActions } from '../../../common/common-actions.js'
import { SandboxArticleActions } from './article-actions.js'

// Store
var SandboxArticleStore = Reflux.createStore({
  listenables: [ArticleActions, CommonActions, SandboxArticleActions],

  onReset: function() {
    console.log('Article Store Reset called')
    localStorage.removeItem('article');
    data.article = defaultData.article
    this.onLoad()
  },

  // Set initial vars to null, broadcast whole state
  getInitialState: function() {
    this.data = null
    this.location = null
    return this.data;
  },
  onLoad: function() {
    this.data = Immutable.fromJS({
      article: data.article,
      theme: data.theme,
      nav: data.nav,
      group: data.group,
      publication: data.publication
    })
    this.article = this.data.get('article')
    ArticleActions.init(this.article)
    this.trigger(this.data)
  },
  onUpdateData: function(dataLocation, updatedData) {
    console.log('Update Data called')
    var oldData = this.data
    var newData = this.data.set(dataLocation, updatedData)
    if (oldData.isSubset(newData) === false) {
      var diffData = diff(oldData, newData)
      this.data = newData

      //save the new articles to localstorage
      if (dataLocation === 'article') {
        var article = newData.toJSON().article;
        article = JSON.stringify(article);
        localStorage.setItem('article', article)
      }
      if (dataLocation === 'theme') {
        data.theme = newData.toJSON().theme.theme;
        this.onLoad();
      }

      this.trigger(this.data)
    } else {
      // console.log('updateData: no update found')
    }
  }
})

module.exports = SandboxArticleStore
