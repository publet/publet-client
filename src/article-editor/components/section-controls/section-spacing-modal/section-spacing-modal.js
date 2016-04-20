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

var React = require('react')
var Reflux = require('reflux')
var Immutable = require('immutable')
var _ = require('lodash')

// Actions
import { ArticleActions } from '../../../../article-editor/article-actions.js'

// Mixins
var LayeredComponent = require('../../../../common/mixins/layered-component/layered-component')

// Components
var Modal = require('../../../../common/components/modal/modal.js')
var ColorPalette = require('../../../../common/components/color-palette/color-palette.js')

// Component
var SectionBgModal = React.createClass({
  mixins: [LayeredComponent, Reflux.ListenerMixin],

  getInitialState() {
    return {
      shown: false,
      modalShown: false
    }
  },

  handleClick() {
    this.setState({ shown: !this.state.shown });
  },

  handleSpacingChange(event){
    let config = {}
    let value = event.target.value;
    let name = event.target.name;
    value = value.replace(/[^0-9\.]/g,'')
    value += 'px';
    config[name] = value ;
    ArticleActions.updateSectionSpacing(config, this.props.cursor)
  },

  renderLayer() {
    if (!this.state.shown) {
      return <span />
    }
    var thumbnail
    if (this.props.bg.get('imageUrl')) {
      thumbnail = <div className="thumbnail"><img src={this.props.bg.get('imageUrl')}/></div>
    } else {
      thumbnail = <span />
    }
    return (
      <Modal onRequestClose={this.handleClick}>
        <div className="modal section-bg">
          <div className="modal-header grid-block">
            <div className="grid-content">
              Edit Section Spacing
              <div className="close-icon">
                <img src="media/close-icon-teal.png" onClick={this.handleClick}/>
              </div>
            </div>
          </div>
          <div className="grid-block modal-content">
            <div className="grid-content medium-12">
              <div className="section-spacing-edit">
                <div className="note">
                  <span className="label"><strong>Note:</strong> All values in pixels.</span>
                </div>
                <form className="typography">
                  <div className="grid-block">
                    <div className="grid-block medium-6">
                      <div className="input">
                        <span className="input-label">Margin Top</span>
                        <input type="text" className="field" name="marginTop" value={this.props.style.get('marginTop','').replace('px','')} onChange={this.handleSpacingChange}/>
                      </div>
                      <div className="input">
                        <span className="input-label">Margin Right</span>
                        <input type="text" className="field" name="marginBottom" value={this.props.style.get('marginBottom','').replace('px','')} onChange={this.handleSpacingChange}/>
                      </div>
                    </div>
                    <div className="grid-block medium-6">
                      <div className="input"><span className="input-label">Padding Top</span>
                        <input type="text" className="field" name="paddingTop" value={this.props.style.get('paddingTop','').replace('px','')} onChange={this.handleSpacingChange}/>
                      </div>
                      <div className="input"><span className="input-label">Padding Right</span>
                        <input type="text" className="field" name="paddingRight" value={this.props.style.get('paddingRight','').replace('px','')} onChange={this.handleSpacingChange}/>
                      </div>

                      <div className="input"><span className="input-label">Padding Bottom</span>
                        <input type="text" className="field" name="paddingBottom" value={this.props.style.get('paddingBottom','').replace('px','')} onChange={this.handleSpacingChange}/>
                      </div>

                      <div className="input"><span className="input-label">Padding Left</span>
                        <input type="text" className="field" name="paddingLeft"  value={this.props.style.get('paddingLeft','').replace('px','')} onChange={this.handleSpacingChange}/>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  },
  render() {
    return (
      <a className="button section-bg"
         href="javascript:;"
         role="button"
         onClick={this.handleClick}>
        <label>
          Spacing
        </label>
      </a>
    )
  }
})

module.exports = SectionBgModal
