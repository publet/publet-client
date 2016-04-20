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

var React = require('react');
var ReactColor = require('react-color');
var ColorPicker = React.createClass({
  getInitialState: function() {
    return { displayColorPicker: false };
  },

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  },

  handleChange(color){
    this.props.onChange('#' + color.hex)
    return;
  },
  handleClose(){
    this.setState({ displayColorPicker: false });
  },
  render() {
    return (
      <div style={{position: 'relative'}}>
        <button onClick={ this.handleClick } type="button">Pick Color</button>
        <ReactColor.default onChange={ this.handleChange } onClose={this.handleClose}
                            display={ this.state.displayColorPicker } type="compact"/>
      </div>
    );
  }
})

module.exports = ColorPicker