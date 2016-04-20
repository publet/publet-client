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
    this.setState({shown: !this.state.shown});
  },

  handleFullHeightCheckbox() {
    var config = this.props.bg.toJS()
    config.fullHeight = !config.fullHeight
    console.log(config)
    ArticleActions.updateSectionBG(config, this.props.cursor)
  },

  handlePaletteUpdate(e) {
    var config = this.props.bg.toJS()
    config.color = e.currentTarget.getAttribute('value')
    config.imageUrl = 'none'
    ArticleActions.updateSectionBG(config, this.props.cursor)
  },

  filepicker(e) {
    e.preventDefault()
    var that = this
    filepicker.pick({
      policy: window.FP.write.policy,
      signature: window.FP.write.signature,
      mimetype: 'image/*', /* Images only */
      maxSize: 1024 * 1024 * 5, /* 5mb */
      services: ['COMPUTER', 'CONVERT'], /* All available third-parties */
      conversions: ['crop']
    }, function(blob){
      var config = that.props.bg.toJS()
      var filename = blob.filename

      var fpAuth = '';

      if (_.contains(blob.url, 'crop')) {
        fpAuth = '&';
      } else {
        fpAuth = '?';
      }
      fpAuth = fpAuth + 'signature=' + window.FP.read.signature + '&policy=' + window.FP.read.policy;
      config.imageUrl = blob.url + fpAuth
      filepicker.stat(
        blob,
        {
          height: true,
          policy: window.FP.write.policy,
          signature: window.FP.write.signature
        },
        function(metadata){
          config.imageHeight = metadata.height
          ArticleActions.updateSectionBG(config, that.props.cursor)
        }
      )
    },function(FPError){
      console.log('error')
      console.log(FPError)
      console.log(FPError.toString())
    });
  },

  renderLayer() {
    if (!this.state.shown) {
      return <span />
    }
    var thumbnail
    if (this.props.bg.get('imageUrl')) {
      thumbnail = <div className="thumbnail"><img src={this.props.bg.get('imageUrl')} /></div>
    } else {
      thumbnail = <span />
    }
    return (
      <Modal onRequestClose={this.handleClick}>
        <div className="modal section-bg">
          <div className="modal-header grid-block">
            <div className="grid-content">
              Edit Section Background
              <div className="close-icon">
                <img src="media/close-icon-teal.png" onClick={this.handleClick} />
              </div>
            </div>
          </div>
          <div className="grid-block modal-content">
            <div className="grid-content medium-12">
              <div className="grid-block">
                <div className="grid-block medium-6">
                  <div className="grid-content">
                    <div className="input inline">
                      <label>Image Preview
                        <div className="img-preview">
                          {thumbnail}
                          <div className="file-chooser">
                            <button className="button" onClick={this.filepicker}>Choose Image</button>
                            <label>
                              <input type="checkbox" checked={this.props.bg.get('fullHeight')} onChange={this.handleFullHeightCheckbox}/>
                              Full Height Image
                            </label>
                          </div>
                        </div>
                      </label>
                    </div>

                  </div>
                </div>
                <div className="grid-block medium-6">
                  <ColorPalette
                    name="color"
                    palette={this.props.theme.get('palette')}
                    onChange={this.handlePaletteUpdate}
                    label="Color"
                    value={this.props.bg.get('color')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  },

  render() {
    var backgroundColor = <rect x="0" y="5" width="15" height="15" fill="#FFFFFF" />
    if (this.props.style.toJS().background) {
      backgroundColor = <rect x="0" y="5" width="15" height="15" fill={this.props.style.toJS().background} />
    }

    return (
      <a
        className="button section-bg"
        href="javascript:;"
        role="button"
        onClick={this.handleClick}
      >
        <label>
          <svg width="15" height="15" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
            {backgroundColor}
          </svg>
          Background
        </label>
      </a>
    )
  }
})

module.exports = SectionBgModal
