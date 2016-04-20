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

// Component
export const PubOptions = React.createClass({
  render() {
    if (this.props.enabled) {
      return (
        <div className="menu-group pub-opts">
          <div className="menu-group-left">
            <ul className="pub-opts-bar">
              <li><a href="#" onClick={function() {window.history.back()}}>Back</a></li>
              <li></li>
            </ul>
            </div>
            <div className="menu-group-right">
              <ul className="icon-left pub-opts-bar">
              <li>
                <a href="#"><img className="iconic-color-primary" /></a>
              </li>
            </ul>
          </div>
        </div>
      )
    } else {
      return (<span />)
    }

  }
})
