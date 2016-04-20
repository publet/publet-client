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

// Actions
import { ArticleActions } from '../../../../article-editor/article-actions.js'

//Components
var LayoutMenu = require('../../layout-menu/layout-menu.js');

var AddSectionMenu = React.createClass({

  handleAddSection: function(e) {
    e.preventDefault()
    var selectedSectionType = e.currentTarget.name
    ArticleActions.closeAddSectionMenu()
    ArticleActions.addSection(this.props.cursor, selectedSectionType)
  },

  handleClose: function(e) {
    ArticleActions.closeAddSectionMenu()
  },

  render : function() {
    return (
      <div className="add-section-menu">
        <header>
          <h2>Add Section Menu </h2>
          <div className="close-button">
            <img src="media/close-icon-brown.png" onClick={this.handleClose} />
          </div>
        </header>
        <div className="add-section edit-form grid-block">
          <label>Select <br />Layout</label>
          <ul className="button-group small">
            <li className="section-layout-option">
              <a name="OneCol" href="#" onClick={this.handleAddSection}>
                <img src="media/section-btn-oneCol.png" />
                <label>One Column</label>
              </a>
            </li>
            <li className="section-layout-option">
              <a name="TwoCol" href="#" onClick={this.handleAddSection}>
                <img src="media/section-btn-twoCol.png" />
                <label>Two Column</label>
              </a>
            </li>
            <li className="section-layout-option">
              <a name="ThreeCol" href="#" onClick={this.handleAddSection}>
                <img src="media/section-btn-threeCol.png" />
                <label>Three Column</label>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = AddSectionMenu;