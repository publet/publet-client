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

import React, { PropTypes, Component } from 'react'

export const ActionHistory =  (props => {
  let userActions = []
  let actionHistory = props.history.toJS()
  actionHistory.map( (action, index) => {
    let userAction = (
      <li key={index} className="action">
        <p className="type">{action.type}</p>
        <p className="name">{action.name}</p>
        <p className="value">{action.value}</p>
      </li>
    )
    userActions.push(userAction)
  })
  return (
    <div className="action-history">
      <div className="history-header">
        <h2>Lead History</h2>
      </div>
      <div className="history-key">
        <p>Action Type</p>
        <p>Action Name</p>
        <p>Corresponding Content</p>
      </div>
      <ul className="user-actions">
        {userActions}
      </ul>
    </div>
  )
})
