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
var ReactDOM = require('react-dom')
var Reflux = require('reflux')
var Immutable = require('immutable')
var ScrollLock = require('../common/components/scroll-lock/scroll-lock')
var fpSettings = require('../common/filepicker.js')
import Router,{ IndexRoute, Route, Link} from 'react-router' // or var Router = ReactRouter; in browsers
import createHistory from 'history/lib/createHashHistory';
import Offline from '../common/components/offline'

// Data
var Data = require('./data.js')
Data = Immutable.fromJS(Data)

// Mixins
var LayeredComponent = require('../common/mixins/layered-component/layered-component')

// Actions
import { CommonActions } from '../common/common-actions.js'
import { ArticleActions } from './components/sandbox-article/article-actions.js'
import { ThemeActions } from './components/sandbox-theme/theme-actions.js'

// Stores
var SandboxArticleStore = require('../sandbox/components/sandbox-article/sandbox-article-store.js')
var SandboxThemeStore = require('../sandbox/components/sandbox-theme/sandbox-theme-store.js')

// Components
var Article = require('../article-editor/components/article/article.js')
var Theme = require('../theme-editor/components/theme/theme.js')
var ContactForm = require('../sandbox/components/contact-form/contact-form.js')
var Modal = require('../common/components/modal/modal.js')

// Initialize filepicker
fpSettings()

// Component
var App = React.createClass({
  reset(){
    ArticleActions.reset();
    ThemeActions.reset();
  },

  render() {
    // this sets the active route's text color to $maroon
    var ACTIVE = { color: '#A73E5C' }
    var reset = this.reset
    return (
      <div className="grid-frame vertical">
        <header className="navbar sandbox">
          <span className="left"><a href="https://www.publet.com"
                                    alt="Publet.com | Make B2B content that works like a webpage"><img
            className="publet-logo " src="media/publet-logo-dark.png" alt="Publet logo"/></a></span>
          <span className="right">
            <ContactForm />
          </span>
        </header>
        <nav className="menu-group article sandbox">
          <div className="menu-group-left">
            <ul className="article-opts-bar">
              <li><a href="javascript:void(0)" onClick={reset}>Reset</a></li>
            </ul>
          </div>
          <div className="menu-group-right">
            <ul className="icon-left article-opts-bar">
              <li><Link activeStyle={ACTIVE} to="article">Article Editor</Link></li>
              <li><Link activeStyle={ACTIVE} to="theme">Theme Editor</Link></li>
              <li><Link activeStyle={ACTIVE} to="analytics">Analytics</Link></li>
            </ul>
          </div>
        </nav>
        {/* this is the important part */}
        {this.props.children}
        <Offline/>
      </div>
    )
  }
})

var SandboxArticle = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return {
      article: null,
      theme: null,
      nav: null,
      pub: null,
      group: null,
      loaded: false
    }
  },
  componentWillMount: function() {
    CommonActions.load();
  },
  componentDidMount: function() {
    this.listenTo(SandboxArticleStore, this.updateData)
  },
  updateData: function(changeObj) {
    this.setState({
      article: changeObj.get('article'),
      theme: changeObj.get('theme'),
      nav: changeObj.get('nav'),
      pub: changeObj.get('publication'),
      group: changeObj.get('group'),
      loaded: true
    })
  },
  render: function() {
    if (this.state.article) {
      console.log(this.state.article.toJS())
      return (
        <Article
          order={this.state.article? this.state.article.get('order'):null}
          article={this.state.article}
          articleID={this.props.articleID}
          cursor={Immutable.List()}
          editor={true}
          nav={this.state.nav}
          theme={this.state.theme}
          />
      )
    } else {
      return (<div><h3>Loading</h3></div>)
    }

  }
})

var SandboxTheme = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return { theme: null }
  },
  componentWillMount: function() {
    CommonActions.load()
  },
  componentDidMount: function() {
    this.listenTo(SandboxThemeStore, this.updateData)
  },
  updateData: function(changeObj) {
    console.log(changeObj.toJS())
    this.setState({ theme: changeObj.get('theme') })
  },
  render: function() {
    return <Theme theme={this.state.theme}/>
  }
})

var SandboxAnalytics = React.createClass({
  mixins: [LayeredComponent],
  getInitialState() {
    return { shown: true }
  },
  toggleModal: function() {
    this.setState({ shown: !this.state.shown });
  },
  renderLayer() {
    if (!this.state.shown) {
      return <span />
    }
    return (
      <Modal onRequestClose={this.toggleModal}>
        <div className="modal edit-button-style">

          <div className="modal-header grid-block">
            <div className="grid-content">
              Publication Analytics
              <div className="close-icon">
                <img src="media/close-icon-teal.png" onClick={this.toggleModal}/>
              </div>
            </div>
          </div>

          <div className="grid-block modal-content">
            <div className="analytics grid-content medium-12">
              <h4>Insights about individual leads, audience behavior, and content performance is collected and displayed
                in Publet.</h4>

              <p>
                You can send it to Salesforce, Marketo, or other marketing automation software to streamline your sales
                funnel. Watch which content is performing best, who’s reading it, where they’re coming from, what device
                they’re using, and then decide what and who to focus on.
              </p>

              <p>
                Here's a sample of Publet's analytics.
              </p>
            </div>
          </div>

        </div>
      </Modal>
    )
  },
  render() {
    return (
      <div className="analytics-demo grid-frame vertical">
        <img src="media/analytics-old.png"/>
      </div>
    )
  }
})

var routes = (
  <Route path="/" component={App}>
    <Route path="theme" component={SandboxTheme}/>
    <Route path="analytics" component={SandboxAnalytics}/>
    <Route path="article" component={SandboxArticle}/>
    <IndexRoute component={SandboxArticle}/>
  </Route>
)

var history = createHistory({
  queryKey: false
});

ReactDOM.render(<Router history={history } routes={routes}></Router>, document.getElementById('content'))
