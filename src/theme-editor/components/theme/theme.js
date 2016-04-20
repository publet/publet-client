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
var Immutable = require('immutable')

// Functions
function loadCSS(url) {
  var f = document.createElement('link');
  f.setAttribute('rel', 'stylesheet');
  f.setAttribute('type', 'text/css');
  f.setAttribute('href', url);
  document.getElementsByTagName('head')[0].appendChild(f);
}

// Actions
var ThemeActions = require('../../../theme-editor/theme-actions.js')

//Components
var ColorPaletteEditor = require('../color-palette-editor/color-palette-editor.js')
var FontSettings = require('../font-settings/font-settings.js')
var TextStyles = require('../text-styles/text-styles.js')
var ButtonStyles = require('../button-styles/button-styles.js')
var ImageStyles = require('../image-styles/image-styles.js')
var CaptionStyles = require('../caption-styles/caption-styles.js')
var QuoteStyles = require('../quote-styles/quote-styles.js')
var VideoStyles = require('../video-styles/video-styles.js')

// Component
var Theme = React.createClass({
  render() {
    if (this.props.theme) {
      loadCSS(this.props.theme.get('stylesheet'))
      return (
        <div className="grid-block vertical theme">

          <ColorPaletteEditor data={this.props.theme.get('palette')} />

          <FontSettings data={this.props.theme.get('fonts')} theme={this.props.theme} />

          <ButtonStyles data={this.props.theme.get('buttonStyles')} theme={this.props.theme} />

          <ImageStyles data={this.props.theme.get('imageStyles')} theme={this.props.theme}  />

          <QuoteStyles data={this.props.theme.get('quoteStyles')} theme={this.props.theme} />

          <VideoStyles data={this.props.theme.get('videoStyles')} theme={this.props.theme}  />

          <TextStyles data={this.props.theme.get('textStyles')} theme={this.props.theme} />
        </div>
      )
    } else {
      return (
        <div className="grid-block vertical theme">
          <h2>Theme not loaded yet</h2>
        </div>
      )
    }
  }
})

module.exports = Theme

// to use once quill has reusable text styles
// <TextStyles data={this.props.theme.get('textStyles')} theme={this.props.theme} />
