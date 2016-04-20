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
import React, { Component } from 'react'

export class EstValueCalc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valuePerLead: props.valuePerLead
    }
  }
  handleUpdateValuePerLead(e) {
    this.setState({valuePerLead:e.target.value})
  }
  truncateValue(number, decPlaces) {
    // taken from http://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k
    // This may need adjustments for accuracy, but seems like a simple enough
    // first implementation
    let abbrev = ["k", "m", "b", "t"]
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces)
    for (let i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      let size = Math.pow(10, (i + 1) * 3)
      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // multiply by decPlaces, round, and then divide by decPlaces
        // This gives us nice rounding to a particular decimal place
        var number = Math.round(number * decPlaces / size) / decPlaces
        // Handle special case where we round up to the next abbreviation
        if ((number === 1000) && (i < abbrev.length - 1)) {
            number = 1
            i++
        }
        // Add the letter for the abbreviation
        number += abbrev[i]
        break
      }
    }
    return number
  }
  render() {
    let estimatedValue = this.state.valuePerLead * this.props.numberOfLeads
    return (
      <div className="estimated-value-calc">
        <div className="publication-value">
          <label>Estimated Value</label>
          <h2 className="value">
            ${this.truncateValue(estimatedValue, 0)}
          </h2>
        </div>
        <form className="lead-value">
          <input
            type="text"
            value={this.state.valuePerLead}
            onChange={this.handleUpdateValuePerLead.bind(this)}
          />
        <label>Dollars per Lead</label>
        </form>
      </div>
    )
  }
}
EstValueCalc.propTypes = {
  numberOfLeads: React.PropTypes.number,
  valuePerLead: React.PropTypes.number
}
EstValueCalc.defaultProps = {
  numberOfLeads: 0,
  valuePerLead: 1000
}
