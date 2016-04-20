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

// Dependency
var React = require('react')
var Immutable = require('immutable')

// Data
var Data = require('../../data.js')
Data = Immutable.fromJS(Data)

// Component
var SandboxArticle = React.createClass({
  render() {
    return (
      <Article
        order={Data.getIn(['article','order'])}
        article={Data.get('article')}
        articleID="1"
        cursor={Immutable.List()}
        editor={true}
        nav={Data.get('nav')}
        theme={Data.get('theme')}
      />
    )
  }
})