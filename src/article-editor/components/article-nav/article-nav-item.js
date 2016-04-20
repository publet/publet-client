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



/* Flexbox-based responsive nav based on http://codepen.io/chriswrightdesign/pen/FxrCg?editors=110
// Thanks, Chris Wright! --AB, 07/2015 */

// Dependencies
import React from 'react'

// Component
export const ArticleNavItem = React.createClass({

  getInitialState() {
    return {
      hover: false
    }
  },

 mouseOver() {
   this.setState({hover: true})
 },

 mouseOut() {
   this.setState({hover: false})
 },

  render() {
    var listItemStyles = {
      background: this.props.background
    }
    var listItemStylesHover = {
      background: this.props.backgroundHover ? this.props.backgroundHover : this.props.background
    }
    var linkStyles = {
      color: this.props.color
    }
    var linkStylesHover = {
      color: this.props.color ? this.props.colorHover : this.props.color
    }
    return (
      <li
        className="navigation-item"
        style={this.state.hover ? listItemStylesHover : listItemStyles}
        onMouseEnter={this.mouseOver}
        onMouseLeave={this.mouseOut}
      >
        <a
          className="nav-link"
          style={this.state.hover ? linkStylesHover : linkStyles}
          href={this.props.url}
        >
          {this.props.title}
        </a>
      </li>
    )
  }
})
