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

// Mixins
var LayeredComponent = require('../../../../common/mixins/layered-component/layered-component')

// Actions
import { ArticleActions } from '../../../../article-editor/article-actions.js'

// Components
var Modal = require('../../../../common/components/modal/modal.js')

// Component
var DeleteSectionBtn = React.createClass({
  mixins: [LayeredComponent],

  getInitialState: function() {
    return {
      shown: false
    }
  },

  toggleModal: function() {
    this.setState({shown:!this.state.shown})
  },

  deleteSection: function() {
    this.toggleModal()
    ArticleActions.deleteSection(this.props.cursor)
  },

  renderLayer: function() {
    if (!this.state.shown) {
      return <span />
    }
    return (
      <div className="delete-section">
        <Modal onRequestClose={this.toggleModal}>
          <div className="modal">

            <div className="modal-header grid-block">
              <div className="grid-content">
                Confirm Delete Section
                <div className="close-icon">
                  <img src="media/close-icon-teal.png" onClick={this.toggleModal} />
                </div>
              </div>
            </div>

            <div className="grid-block modal-body">
              <div className="grid-content medium-12">
                <div className="grid-block">
                  <div className="grid-block medium-12">
                    <div className="grid-content">
                      <h3>Are you sure you want to delete this section?</h3>
                      <p>All of its content will be lost forever!</p>
                      <div className="button-container">
                        <div>
                          <button className="button cancel large" onClick={this.toggleModal}>Save my content!</button>
                        </div>
                        <div>
                          <button className="button primary large" onClick={this.deleteSection}>Delete section</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Modal>
      </div>
    )
  },

  render: function() {

    return (
      <div className="close-icon" onClick={this.toggleModal}>
        <img src="media/close-icon-teal.png" />
      </div>
    )
  }
})

module.exports = DeleteSectionBtn