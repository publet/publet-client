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
var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router')
import Offline from '../../components/offline'
// Routing
var Route = Router.Route
var RouteHandler = Router.RouteHandler
var routes = (
  <Route handler={App}>
    <Route path="article-editor" handler={ArticleEditor}/>
    <Route path="theme-editor" handler={ThemeEditor}/>
  </Route>
)

Router.run(routes, function (Handler) {
  ReactDom.render(<Handler/>, document.body);
});

// Component
var App = React.createClass({

  render: function() {
    return (
      <div>
        <h2>lol i am app</h2>
        <RouteHandler/>
        <Offline/>
      </div>
    )
  }
})

module.exports = App
