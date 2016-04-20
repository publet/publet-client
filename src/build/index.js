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

// Server dependencies
const winston = require('winston');
var raven = require('raven');

// Env variables
var debug = process.env.DEBUG || false;
var dsn = process.env.RAVEN_DSN || null;

// Logging
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        var date = new Date();
        return date.toISOString();
      },
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

// Error handling
if (!debug && !dsn) {
  logger.error('Raven DSN not set.')
  process.exit(1);
}
if (debug) {
  process.on('uncaughtException', function (err) {
    console.log(err);
  })
}

var client = new raven.Client(dsn);

client.patchGlobal(function(logged, err) {
  logger.error(err);
  process.exit(1);
});

const fs = require('fs');
const css = fs.readdirSync('./dist/article-editor/css');
const js = fs.readdirSync('./dist/public/js');
const express = require('express');
const bodyParser = require('body-parser');

// Client-side dependencies
var React = require('react'),
    ReactDom = require('react-dom/server'),
    ReactArticle = React.createFactory(require('../article-editor/components/article/article.js')),
    Immutable = require('immutable');

// Vars
var app = express();
var port = process.env.REACT_BUILD_SERVER_PORT || 4444;

// Middleware
app.use(raven.middleware.express.requestHandler(dsn));
app.use(raven.middleware.express.errorHandler(dsn));
app.use(bodyParser.json({limit: '500mb'})); // for parsing application/json

// Routes
app.get('*', function(req, res) {
  'use strict';

  res.json({
    'route': 'Sorry this page does not exist!'
  });
});

function asyncRenderToString(component, callback) {
  'use strict';
  process.nextTick(function() {
    callback(ReactDom.renderToString(component));
  });
}

app.post('/api/article/', function(req, res){
  'use strict';

  var articleID = req.body.article.id;
  var article = Immutable.fromJS(req.body.article);
  var nav = Immutable.fromJS(req.body.publication.nav);
  var theme = Immutable.fromJS(req.body.theme);

  logger.info('New job, article id: ' + articleID);

  var articleComponent = new ReactArticle({
    article: article,
    articleID: articleID,
    cursor: Immutable.List(),
    editor: false,
    nav: nav,
    order: article.get('orderHuman'),
    theme: theme
  });

  asyncRenderToString(articleComponent, function(html) {
    logger.info('Received HTML, article id: ' + articleID);
    res.json({
      articleID: articleID,
      reactHtml: html,
      css: css,
      js: js
    });

  });

});

// Run server
app.listen(port);
console.log('Server running ' + port);
