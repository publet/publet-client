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
import * as cx from 'classnames'
import Immutable from 'immutable'
var Gate = require('../gate/gate');

// Components
const ArticleNavItem = function(props) {
  return (
    <li>
      <a style={{color: props.color}} href={props.url}>{props.title}</a>
    </li>
  )
}

// Component
const ArticleNav = React.createClass({
  getInitialState() {
    return {
      navOpen: false
    }
  },
  toggleNav(e) {
    console.log('navtoggle!')
    this.setState({navOpen: this.state.navOpen ? false : true})
  },
  render() {
    if (this.props.enabled) {
      // nav wrapper styles (navbar)
      var customNavStyles = this.props.config.get('style')
      var fixedNavStyles = Immutable.Map({
        position: 'fixed',
        width: '100%'
      })
      var defaultNavStyles = Immutable.Map({
        background: this.props.config.get('background'),
        zIndex:9999,
        transition:'visibility .15s ease-in-out, opacity .15s linear'
      })
      var navContainerStyles = defaultNavStyles.merge(customNavStyles)
      if (this.props.position === 'fixed') {
        navContainerStyles = navContainerStyles.merge(fixedNavStyles)
      }

      // populate nav links
      var navLinks = []
      var navLinkSize = 0
      var that = this
      var navItems = this.props.config.get('navItems').map( function(navItem, index) {
        navItem = navItem.toJS()
        navLinkSize++
        // Note: most of these props are not implemented yet --AB
        var navLink = (
          <ArticleNavItem
            key={index}
            url={navItem.url}
            title={navItem.name}
            color={that.props.config.get('textColor')}
            colorHover={that.props.config.get('textColorHover')}
            background={that.props.config.get('background')}
            backgroundHover={that.props.config.get('backgroundHover')}
          />
        )
        navLinks.push(navLink)
      })
      if (navLinkSize > 4) {
        var articleNavID = "articleNavBig"
      } else {
        var articleNavID = "articleNav"
      }
      // Nav logo
      var navLogo
      if (this.props.config.get('logo')) {
        navLogo = <a href="#" className="logo" dangerouslySetInnerHTML={{__html: this.props.config.get('logo')}} />
      }
      var gateConfig = this.props.config.get('gate');
      return (
        <header className="article-nav" style={navContainerStyles.toJS()}>
          {navLogo}
          <ul id={articleNavID}>
            <div className="icon" onClick={this.toggleNav}>&#9776; Sections</div>
            <div
              id="articleNavItems"
              style={{background: this.props.config.get('background')}}
              className={this.state.navOpen ? "showitems items" : "items"}
            >
              {navLinks}
              <li>
                <Gate
                  content={gateConfig.get('content')}
                  button={gateConfig.get('navButton')}
                  enabled={gateConfig.get('enabled')}
                  editor={this.props.editor}
                  form={gateConfig.get('form')}
                  trigger={gateConfig.get('trigger')}
                />
              </li>
            </div>
          </ul>
        </header>
      )
    } else {
      return <span />
    }

  }
})
module.exports = ArticleNav
