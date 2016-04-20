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

var articleData = require('./default-data.js').article;
var themeData = require('./default-data.js').theme;

if (localStorage.getItem('article')) {
  exports.article = JSON.parse(localStorage.getItem('article'));
} else {
  exports.article = articleData;
}

if (localStorage.getItem('theme')) {
  exports.theme = JSON.parse(localStorage.getItem('theme'));
} else {
  exports.theme = themeData;
}

exports.nav = {
  caption: "",
  style: {
    borderBottom: "12px solid #D59439"
  },
  textColor: "white",
  textColorHover: "#D59439",
  background: "#1C4382",
  logo: null,
  fixed: false,
  enabled: false,
  navItems: [{
    url: "http://publications.publet.com/alex-test-group-o5x37/sandbox-test-pub-on0bb/#one",
    name: "Lol, cats",
    order: 1
  }]
}

exports.group = {
  slug: "alex-test-group-o5x37",
  id: 328,
  name: "Alex Test Group"
}

exports.publication = {
  articles: [{
    url: "https://article.publet.com/editor/#/134",
    name: "Lol, cats"
  }],
  name: "Sandbox Test Pub",
  url: "/api/2/publication/855/",
  liveUrl: "http://publications.publet.com/alex-test-group-o5x37/sandbox-test-pub-on0bb/",
  id: 855,
  slug: "sandbox-test-pub-on0bb"
}
