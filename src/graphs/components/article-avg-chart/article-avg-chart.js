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
import React, { PropTypes, Component } from 'react'
import { formatTime } from '../../../common/utils/format-time'

// Component
export class ArticleAvgChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAvg: "engagedTime"
    }
    this.selectAvg = this.selectAvg.bind(this)
  }
  selectAvg(e) {
    this.setState({selectedAvg:e.target.value})
  }
  render() {
    const articleAvg = []
    let articles = this.props[this.state.selectedAvg] || []
    articles.map( (article) => {
      let articleName = article.name
      let articleValue

      if (this.state.selectedAvg === "engagedTime") {
        articleValue = formatTime(article.seconds)
      } else {
        articleValue = article.value + '%'
      }
      articleAvg.push(
        <li key={article.id}>
          <p className="article-name">{articleName}</p>
          <p className="article-value">{articleValue}</p>
        </li>
      )
    })
    return (
      <div className="article avg-chart">
        <h1>Top Article Avgs.</h1>
        <header>
          <label className="article">Article</label>
          <label className="average">Average:</label>
          <select value={this.state.selectedAvg} onChange={this.selectAvg}>
            <option value="engagedTime">Engaged Time</option>
            <option value="percentRead">Percent Read</option>
          </select>
        </header>
        <ul className="article-list">
          {articleAvg}
        </ul>
      </div>
    )
  }
}
ArticleAvgChart.defaultProps = {value: ''};
