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

// Actions
import { CommonActions } from '../../../common/common-actions.js'

// Stores
import { ArticleEditorStore } from '../article-editor/article-editor-store.js'

// Components
import ErrorMessage from '../../../common/components/error-message/error-message'
import { Navbar } from '../../../common/components/navbar/navbar.js'
import { ArticleOptions } from '../../../article-editor/components/article/article-options.js'
import Article from '../../../article-editor/components/article/article.js'

// Component - Uses old React.createClass syntax to allow for Refux mixin.
export const ArticleEditor = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState() {
    return {
      article: null,
      theme: null,
      nav: null,
      pub: null,
      group: null,
      loaded: false
    }
  },
  componentWillMount() {
    window.addEventListener("hashchange", this.locationHashChanged, false)
  },
  componentDidMount() {
    this.locationHashChanged()
    this.listenTo(ArticleEditorStore, this.updateData)
  },
  componentWillUnmount() {
    window.removeEventListener("hashchange", this.locationHashChanged, false)
  },
  locationHashChanged() {
    console.log(location.hash.replace(/#/i, '').replace(/\//i, ''))
    CommonActions.load(location.hash.replace(/#/i, ''))
  },
  updateData(changeObj) {
    this.setState({
      error: changeObj.get('error'),
      article: changeObj.get('article'),
      theme: changeObj.get('theme'),
      nav: changeObj.getIn(['publication','nav']),
      pub: changeObj.get('publication'),
      group: changeObj.get('group'),
      loaded: true
    })
  },
  render() {
    // Create url for going back to article management
    let backSlug = this.state.group ? 'groups/' + this.state.group.get('slug') + '/publications/' : null
    backSlug = this.state.pub ? backSlug + this.state.pub.get('slug') + '/' : null
    return (
      <div className="grid-frame vertical">
        <Navbar enabled={this.props.editor} loaded={this.state.loaded}/>
        <ArticleOptions
          themeID={this.state.theme ? this.state.theme.get('id') : null}
          enabled={this.props.editor}
          liveUrl={this.state.article? this.state.pub.get('liveUrl') : null}
          pdfUrl={this.state.article?this.state.article.get('pdfUrl'):null}
          articleList={this.state.pub? this.state.pub.get('articles'):null}
          backUrl={window.config.baseUrl + backSlug}

          />
        <ErrorMessage error={this.state.error}/>
        <Article
          order={this.state.article? this.state.article.get('orderHuman'):null}
          article={this.state.article}
          articleID={this.props.articleID}
          cursor={Immutable.List()}
          editor={this.props.editor}
          nav={this.state.nav}
          theme={this.state.theme}
          />
      </div>
    )
  }
})
