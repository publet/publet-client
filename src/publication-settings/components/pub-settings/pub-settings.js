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
import Immutable from 'immutable'

var hashLocation = {
  getCurrentPath: function() {
    return location.hash.slice(1, location.hash.length);
  }
};

// Actions
import {CommonActions} from '../../../common/common-actions.js'
import {PublicationActions} from '../../publication-actions.js'

// Components
import { Navbar      } from '../../../common/components/navbar/navbar.js'
import { PubOptions  } from '../pub-options/pub-options.js'
import { Publication } from '../publication/publication.js'

// Stores
var PubSettingsStore = require('./pub-settings-store.js')

// Component
export const PubSettings = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return {
      publication: null,
      group: null,
      theme: null
    }
  },

  componentWillMount() {
    CommonActions.load(hashLocation.getCurrentPath())
    window.addEventListener('hashchange', function() {
      CommonActions.load(hashLocation.getCurrentPath())
    }, false);
  },
  componentDidMount() {
    this.listenTo(PubSettingsStore, this.updateData)
  },
  componentWillUnmount() {
    hashLocation.removeChangeListener()
  },

  updateData(changeObj) {
    this.setState({
      publication: changeObj.get('publication', null),
      group: changeObj.get('group', null),
      theme: changeObj.get('theme', null)
    })
  },

  render() {
    return (
      <div className="grid-frame vertical">
        <Navbar enabled="true"/>
        <PubOptions enabled="true"/>
        <Publication data={this.state.publication} theme={this.state.theme}/>
      </div>
    )
  }
})
