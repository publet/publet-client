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
var React = require('react')
var Reflux = require('reflux')

// Store
var AddSectionBtnStore = require('../add-section-btn/add-section-btn-store')

// Components
var AddSectionMenu = require('../add-section-menu/add-section-menu.js')

// Component
var AddSectionBtn = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return {
      addSectionMenu: false
    }
  },
  componentDidMount: function () {
    this.listenTo(AddSectionBtnStore, this.onAddSectionBtnStoreChange)
  },
  onAddSectionBtnStoreChange: function(changeObj) {
    if (this.props.sectionID === changeObj.sectionID) {
      this.setState({
        addSectionMenu: changeObj.addSectionMenu
      })
    }
  },
  handleAddSectionBtn: function() {
    this.setState({addSectionMenu: true})
  },
  closeAddSectionMenu: function() {
    this.setState({addSectionMenu:false})
  },
  render: function() {
    var addSectionMenuElement = <AddSectionMenu cursor={this.props.cursor} onClick={this.closeAddSectionMenu} />
    var addSectionBtnElement = <button onClick={this.handleAddSectionBtn}>+</button>

    var contentVisible = this.state.addSectionMenu ? addSectionMenuElement : addSectionBtnElement
    var contentHidden = this.state.addSectionMenu ? addSectionMenuElement : <span />
    var content = this.props.visible ? contentVisible : contentHidden
    return (
      <div className="add-section btn">
        {content}
      </div>
    )
  }
})

module.exports = AddSectionBtn