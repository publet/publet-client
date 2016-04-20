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
import Immutable from 'immutable'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Functions
function loadCSS(url) {
  if (typeof document === 'undefined') {
    return;
  }
  let f = document.createElement('link');
  f.setAttribute('rel', 'stylesheet');
  f.setAttribute('type', 'text/css');
  f.setAttribute('href', url);
  document.getElementsByTagName('head')[0].appendChild(f);
}
function injectCSS(styles) {
  let style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = styles
  } else {
    style.appendChild(document.createTextNode(styles))
  }
  document.getElementsByTagName('head')[0].appendChild(style)
}

// Actions
import {ArticleActions} from '../../../article-editor/article-actions.js'

// Stores
var ArticleStore = require('../article/article-store.js')

//Components
var ArticleNav = require('../article-nav/article-nav.js')
var AddSectionBtn = require('../section-controls/add-section-btn/add-section-btn.js')
var Section = require('../section/section.js')
var SectionSpacer = require('../section-spacer/section-spacer.js')

// Component
class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let cursor = this.props.cursor
    let that = this
    if (this.props.article) {
      loadCSS(this.props.theme.get('stylesheet'))
      let sections
      if (this.props.article.get('sections').size !== 0) {
        sections = this.props.article.get('sections').map(function(section, index) {
          return (
            <div key={index}>
              <Section
                articleID={that.props.article.get('id')}
                publetID={section.get('id')}
                sectionID={index}
                cursor={cursor.push('sections', index)}
                editor={that.props.editor}
                columns={section.get('columns')}
                layout={section.get('layout')}
                theme={that.props.theme}
                bg={section.get('bg')}
                style={section.get('style')}
                bgUrl={section.get('bgImageUrl')}
                editable={false}
                />
              <SectionSpacer cursor={cursor.push('sections', index+1)}
                             editor={that.props.editor}/>
            </div>
          )
        })
      } else {
        sections = <AddSectionBtn cursor={cursor.push('sections', 1)} visible={true}/>
      }

      let articleBodyStyle
      let articleNav
      if (this.props.nav) {
        articleNav = <ArticleNav
          config={this.props.nav}
          enabled={!this.props.editor}
          position="fixed"
          />
        // this is for fixed nav. When other types of nav are enabled, this will
        // need to only be applied if the nav is fixed. --AB, 10/23
        articleBodyStyle = {
          paddingTop: this.props.editor ? '0' : '4.5em'
        }
      }
      return (
        <div>
          <a className="anchor" name={this.props.order}/>
          {articleNav}
          <div
            data-publet-id={this.props.article.get('id')}
            className="grid-block vertical article"
            style={articleBodyStyle}
            >
            {sections}
          </div>
        </div>
      )
    } else {
      return <span/>
    }
  }
}

module.exports = DragDropContext(HTML5Backend)(Article)
