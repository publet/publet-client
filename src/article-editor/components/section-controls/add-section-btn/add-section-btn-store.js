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
import { ArticleActions } from '../../../../article-editor/article-actions.js'

// Store
var AddSectionBtnStore = Reflux.createStore({
  listenables: [ArticleActions],

  init: function() {},

  getInitialState: function() {
    return {addSectionMenu: false}
  },

  onCloseAddSectionMenu: function() {
    this.trigger({addSectionMenu:false})
  }

})

module.exports = AddSectionBtnStore
