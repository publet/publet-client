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
import React from 'react'

// Component
export const ArticleOptions = (props) => {
  if (props.enabled) {
    const themeEditorUrl = 'https://theme-staging.publet.com/editor/#/' + props.themeID
    let articleList
    if (props.articleList) {
      console.log(props.articleList.toJS())
       articleList = props.articleList.map(function(listItem, i) {
        listItem = listItem.toJS()
        // var articleItem = <li><a href={listItem.url}>{listItem.name}</a></li>
        // articleList.push(articleItem)
        return (<li key={i}><a href={listItem.url}>{listItem.name}</a></li>)
      })
    }
    return (
      <div className="menu-group article">
        <div className="menu-group-left">
          <ul className="article-opts-bar">
            <li><a href={props.backUrl}>Back</a></li>
            <li><a href="#">Save</a></li>
          </ul>
          </div>
          <div className="menu-group-right">
            <ul className="icon-left article-opts-bar">
            <li>
              <a href={props.liveUrl} target="_blank"><img className="iconic-color-primary" />Live Publication</a>
            </li>
            <li className="nav-dropdown">
              <a href="#">Exports</a>
              <ul className="dropdown-items">
                <li><a href={props.pdfUrl} target="_blank">PDF</a></li>
                <li className="disabled"><a href="#">Kindle (Coming soon)</a></li>
                <li className="disabled"><a href="#">Pocket (Coming soon)</a></li>
                <li className="disabled"><a href="#">Evernote (Coming soon)</a></li>
              </ul>
            </li>
            <li>
              <a href={themeEditorUrl} target="_blank"><img className="iconic-color-primary" />Theme Editor</a>
            </li>
            <li className="nav-dropdown">
              <a href="#">Other Articles</a>
              <ul className="dropdown-items">
                {articleList}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  } else {
    return (<span />)
  }
}
