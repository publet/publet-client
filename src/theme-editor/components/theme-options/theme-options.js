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

'use strict'

// Dependencies
var React = require('react')

// Component
var ThemeOptions = React.createClass({
  onBackClick: function(e) {
    // Redirect to the theme's group url when there is nothing interesting to
    // go back to.

    var groupUrl = config.baseUrl.slice(0, -1) + this.props.theme.getIn(['group', 'url']);
    var currentUrl = location.origin + location.pathName;

    if (document.referrer !== currentUrl) {
      location.href = groupUrl;
    } else {
      window.history.back();
    }

    e.preventDefault();
  },
  render : function() {
    if (this.props.enabled) {
      var themeName = this.props.theme ? this.props.theme.get('name') : ' '

      return (
        <div className="menu-group theme-opts">
          <div className="menu-group-left">
            <ul className="theme-opts-bar">
              <li><a href onClick={this.onBackClick}>Back</a></li>
              <li><p><b>Theme:</b> {themeName}</p></li>
            </ul>
            </div>
            <div className="menu-group-right">
              <ul className="icon-left theme-opts-bar">
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

module.exports = ThemeOptions

