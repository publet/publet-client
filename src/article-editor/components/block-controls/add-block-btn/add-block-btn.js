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

// Store
import { AddBlockBtnStore } from '../add-block-btn/add-block-btn-store'

// Components
import { AddBlockMenu } from '../add-block-menu/add-block-menu.js'

// Component
export const AddBlockBtn = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState() {
    return {
      addBlockMenu: this.props.addBlockMenu
    }
  },
  componentDidMount() {
    this.listenTo(AddBlockBtnStore, this.onAddBlockBtnStoreChange)
  },
  onAddBlockBtnStoreChange(changeObj) {
    if (this.props.sectionID === changeObj.sectionID) {
      this.setState({
        addBlockMenu: changeObj.addBlockMenu
      })
    }
  },
  handleAddBlockBtn() {
    this.setState({addBlockMenu: true})
  },
  closeAddBlockMenu() {
    this.setState({addBlockMenu:false})
  },
  render() {
    var addBlock = <span />
    if (this.state.addBlockMenu === true) {
      addBlock = <AddBlockMenu cursor={this.props.cursor} onClick={this.closeAddBlockMenu} />
    } else {
      if (this.props.visible === true) {
        var blockWarning = (
          <p className="max-blocks-warning">
            <b>Warning:</b> More blocks in this column may result in a degraded mobile experience.
          </p>
        )
        addBlock = <div>
          {this.props.maxBlocks ? blockWarning : <span />}
          <button onClick={this.handleAddBlockBtn}>+</button>
        </div>
      }
    }
    return (
      <div className="add-block btn">
        {addBlock}
      </div>
    )
  }
})
