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
var Immutable = require('immutable')
var diff = require('immutablediff')

// Functions
var injectWebfont = function(fontFace) {
  var style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet){
    style.styleSheet.cssText = fontFace
  } else {
    style.appendChild(document.createTextNode(fontFace))
  }
  document.getElementsByTagName('head')[0].appendChild(style)
}

// Actions
import { ThemeActions } from '../../../theme-editor/theme-actions.js'
import { CommonActions } from '../../../common/common-actions.js'

// Store
var ThemeStore = Reflux.createStore({
  listenables: [ThemeActions],

  // Initialize ThemeStore w/ data from from ThemeEditorStore
  init: function(theme) {
    this.data = theme
  },

  // Manipulate Color Palette
  onAddColor: function(name, hex) {
    var newColor = Immutable.fromJS({
      "name": name,
      "hex": hex
    })
    var currentTheme = this.data
    var currentPalette = currentTheme.getIn(['theme', 'palette'])
    var updatedPalette = currentPalette.push(newColor)
    var updatedTheme = currentTheme.setIn(['theme','palette'], updatedPalette)
    CommonActions.updateData('theme', updatedTheme)
    this.data = updatedTheme
  },
  onDeleteColor: function(index) {
    var currentTheme = this.data
    var updatedTheme = currentTheme.deleteIn(['theme', 'palette', index])
    CommonActions.updateData('theme', updatedTheme)
    this.data = updatedTheme
  },

  // Manipulate Font Settings
  onAddTypeface: function(name, weight, srcUrl) {
    var currentTheme = this.data
    var finalName = name + ' ' + weight
    var newTypeface = Immutable.fromJS({
      fontFamily:"'"+ finalName + "', helvetica, sans-serif",
      url: srcUrl,
      name: finalName
    })
    var currentFonts = currentTheme.getIn(['theme', 'fonts'])
    var updatedFonts = currentFonts.push(newTypeface)
    var updatedTheme = currentTheme.setIn(['theme', 'fonts'], updatedFonts)
    this.data = updatedTheme
    CommonActions.updateData('theme', updatedTheme)
    var fontFace = `@font-face {
      font-weight: ${weight};
      src: local("${name}"), url("${srcUrl}") format("woff2");
      font-family: ${finalName};
      font-style: normal;
    }`
    injectWebfont(fontFace)
  },
  // Works with multiple font weights, switch back to this later --AB, 09/2015
  // onAddTypeface: function(name, weight, weightUrl) {
  //   var currentTheme = this.data
  //   var newTypeface = Immutable.fromJS({
  //     fontFamily:"'"+ name + "', helvetica, sans-serif",
  //     weights: [
  //       {
  //         weight: weight,
  //         url: weightUrl
  //       },
  //     ],
  //     name: name
  //   })
  //   var currentFonts = currentTheme.getIn(['theme', 'fonts'])
  //   var updatedFonts = currentFonts.push(newTypeface)
  //   var updatedTheme = currentTheme.setIn(['theme', 'fonts'], updatedFonts)
  //   CommonActions.updateData('theme', updatedTheme)
  //   var fontFace = `@font-face {
  //     font-weight: ${weight};
  //     src: local("${name}"), url("${weightUrl}") format("woff2");
  //     font-family: ${name};
  //     font-style: normal;
  //   }`
  //   injectWebfont(fontFace)
  // },
  onDeleteTypeface: function(typefaceName) {
    var currentFonts = this.data.getIn(['theme', 'fonts'])
    var indexToDelete = undefined
    currentFonts.map(function(fontObj, index) {
      if(fontObj.get('name') === typefaceName) {
        indexToDelete = index
      }
    })
    if (indexToDelete || indexToDelete === 0) {
      var updatedFonts = currentFonts.delete(indexToDelete)
      var updatedTheme = this.data.setIn(['theme', 'fonts'], updatedFonts)
      CommonActions.updateData('theme', updatedTheme)
      this.data = updatedTheme
    }
  },
  onAddFontWeight: function(name, weight, weightUrl) {
    var currentTheme = this.data
    var newFontWeight = Immutable.fromJS({
      weight: weight,
      url: weightUrl
    })
    var typefaceIndex = undefined
    var currentFonts = currentTheme.getIn(['theme', 'fonts'])
    currentFonts.map(function(fontObj, index) {
      if(fontObj.get('name') === name) {
        typefaceIndex = index
      }
    })
    if (typefaceIndex) {
      var currentFontWeights = currentTheme.getIn(['theme', 'fonts', typefaceIndex, 'weights'])
      var updatedFontWeights = currentFontWeights.push(newFontWeight)
      var updatedTheme = currentTheme.setIn(['theme', 'fonts', typefaceIndex, 'weights'], updatedFontWeights)
      CommonActions.updateData('theme', updatedTheme)
      this.data = updatedTheme
      var fontFace = `@font-face {
        font-weight: ${weight};
        src: local("${name}"), url("${weightUrl}") format("woff2");
        font-family: ${name};
        font-style: normal;
      }`
      injectWebfont(fontFace)
    }
  },
  onDeleteFontWeight: function(typeface, weight) {
    var currentFonts = this.data.getIn(['theme', 'fonts'])
    var typefaceIndex = undefined
    var weightIndex = undefined
    currentFonts.map(function(fontObj, index) {
      if(fontObj.get('name') === typeface) {
        typefaceIndex = index
        fontObj.get('weights').map(function(weightObj, index) {
          if (weightObj.get('weight') === weight) {
            weightIndex = index
          }
        })
      }
    })
    if (weightIndex || weightIndex === 0) {
      var updatedFonts = currentFonts.deleteIn([typefaceIndex, 'weights', weightIndex])
      var updatedTheme = this.data.setIn(['theme', 'fonts'], updatedFonts)
      CommonActions.updateData('theme', updatedTheme)
      this.data = updatedTheme
    }
  },

  // Manipulate Theme Styles
  onDeleteStyle: function(styleType, styleName) {
    var currentTheme = this.data
    var updatedTheme = currentTheme.deleteIn(['theme', styleType, styleName])
    CommonActions.updateData('theme', updatedTheme)
    this.data = updatedTheme
  },
  onUpdateThemeButtonStyle: function(buttonStyleName, updatedButtonStyle) {
    var currentTheme = this.data
    var buttonStyleLocation = ['theme','buttonStyles', buttonStyleName, 'style']
    var buttonStyleNameLocation = ['theme','buttonStyles', buttonStyleName, 'name']
    updatedButtonStyle = Immutable.Map(updatedButtonStyle)
    var updatedTheme = currentTheme.setIn(buttonStyleNameLocation, buttonStyleName)
    updatedTheme = updatedTheme.setIn(buttonStyleLocation, updatedButtonStyle)
    CommonActions.updateData('theme', updatedTheme)
    this.data = updatedTheme
  },
  onUpdateThemeImageStyle: function(imageStyleName, updatedImageStyle) {
    var currentTheme = this.data
    var imageStyleLocation = ['theme','imageStyles', imageStyleName, 'style']
    var imageStyleNameLocation = ['theme','imageStyles', imageStyleName, 'name']
    updatedImageStyle = Immutable.Map(updatedImageStyle)
    var updatedTheme = currentTheme.setIn(imageStyleNameLocation, imageStyleName)
    updatedTheme = updatedTheme.setIn(imageStyleLocation, updatedImageStyle)
    CommonActions.updateData('theme', updatedTheme)
    this.data = updatedTheme
  },
  onUpdateThemeQuoteStyle: function(quoteStyleName, updatedQuoteStyle) {
    var currentTheme = this.data
    var quoteStyleLocation = ['theme','quoteStyles', quoteStyleName, 'style']
    var quoteStyleNameLocation = ['theme','quoteStyles', quoteStyleName, 'name']
    updatedQuoteStyle = Immutable.Map(updatedQuoteStyle)
    var updatedTheme = currentTheme.setIn(quoteStyleNameLocation, quoteStyleName)
    updatedTheme = updatedTheme.setIn(quoteStyleLocation, updatedQuoteStyle)
    CommonActions.updateData('theme', updatedTheme)
    this.data = updatedTheme
  },
  onUpdateThemeTextStyle: function(textStyleName, updatedTextStyle) {
    var currentTheme = this.data
    var textStyleLocation = ['theme','textStyles', textStyleName, 'style']
    var textStyleNameLocation = ['theme','textStyles', textStyleName, 'name']
    updatedTextStyle = Immutable.Map(updatedTextStyle)
    var updatedTheme = currentTheme.setIn(textStyleNameLocation, textStyleName)
    updatedTheme = updatedTheme.setIn(textStyleLocation, updatedTextStyle)
    CommonActions.updateData('theme', updatedTheme)
    this.data = updatedTheme
  },
  onUpdateThemeVideoStyle: function(videoStyleName, updatedVideoStyle) {
    var currentTheme = this.data
    var videoStyleLocation = ['theme','videoStyles', videoStyleName, 'style']
    var videoStyleNameLocation = ['theme','videoStyles', videoStyleName, 'name']
    updatedVideoStyle = Immutable.Map(updatedVideoStyle)
    var updatedTheme = currentTheme.setIn(videoStyleNameLocation, videoStyleName)
    updatedTheme = updatedTheme.setIn(videoStyleLocation, updatedVideoStyle)
    CommonActions.updateData('theme', updatedTheme)
    this.data = updatedTheme
  }
})


module.exports = ThemeStore
