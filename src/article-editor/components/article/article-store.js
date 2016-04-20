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
import Immutable from 'immutable'
import * as diff from 'immutablediff'

// Actions
import { ArticleActions } from '../../../article-editor/article-actions.js'
import { CommonActions } from '../../../common/common-actions.js'

// Store
var ArticleStore = Reflux.createStore({
  listenables: [ArticleActions],

  // data management
  onInit: function(article) {
    console.log('Article Store Init called')
    this.data = article
  },

  // Action handlers
  onAddBlock: function(blockLocation, blockType, replaceBlock) {
    var currentArticle = this.data
    var updatedArticle
    var newBlockIndex = blockLocation.slice(-1).toJS()
    var columnLocation = blockLocation.pop()
    var textBlockDefault = Immutable.fromJS({
      type: 'TextBlock',
      classes: [],
      content: {
        text: '<p>Hello, World!</p>'
      }
    })
    var imageBlockDefault = Immutable.fromJS({
      type: 'ImageBlock',
      classes: [],
      content: {
        url: 'https://placehold.it/350x150',
        alt: 'placeholder image for 350x150 image',
        caption: 'Hello, World!',
        styleName: 'default'
      }
    })
    var buttonBlockDefault = Immutable.fromJS({
      type: 'ButtonBlock',
      classes: [],
      content: {
        destination: 'https://placehold.it/350x150',
        caption: 'Hello, World!',
        target: '_blank',
        styleName: 'default'
      }
    })
    var quoteBlockDefault = Immutable.fromJS({
      type: 'QuoteBlock',
      classes: [],
      content: {
        quote: 'Hello, World!',
        author: 'Dennis Richie',
        styleName: 'default'
      }
    })
    var videoBlockDefault = Immutable.fromJS({
      type: 'VideoBlock',
      classes: [],
      content: {
        url: null,
        thumbUrl: 'https://placehold.it/350x150',
        caption: 'Hello, World!',
        styleName: 'default'
      }
    })
    var newBlock = function(blockType) {
      switch (blockType) {
        case 'text':
          return textBlockDefault
          break
        case 'image':
          return imageBlockDefault
          break
        case 'quote':
          return quoteBlockDefault
          break
        case 'button':
          return buttonBlockDefault
          break
        case 'video':
          return videoBlockDefault
          break
      }
    }
    if (replaceBlock !== true) {
      // update column with new block at selected index
      var updatedColumn = currentArticle.getIn(columnLocation).splice(newBlockIndex, 0, newBlock(blockType))
      // update article with the updated column
      updatedArticle = currentArticle.setIn(columnLocation, updatedColumn)
    } else {
      updatedArticle = currentArticle.setIn(blockLocation, newBlock(blockType))
    }
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  onAddSection: function(sectionLocation, sectionType) {
    var currentArticle = this.data
    var OneColDefault = Immutable.fromJS({
      layout: 'OneCol',
      editable: true,
      style: {},
      bg: {
        color: "#FFF",
        imageUrl: null,
        fullHeight: false
      },
      columns: [[]]
    })
    var OneColThinDefault = Immutable.fromJS({
      layout: 'OneColThin',
      editable: true,
      style: {},
      bg: {
        color: "#FFF",
        imageUrl: null,
        fullHeight: false
      },
      columns: [[]]
    })
    var TwoColDefault = Immutable.fromJS({
      layout: 'TwoCol',
      editable: true,
      style: {},
      bg: {
        color: "#FFF",
        imageUrl: null,
        fullHeight: false
      },
      columns: [[], []]
    })
    var ThreeColDefault = Immutable.fromJS({
      layout: 'ThreeCol',
      editable: true,
      style: {},
      bg: {
        color: "#FFF",
        imageUrl: null,
        fullHeight: false
      },
      columns: [[], [], []]
    })
    var SidebarRightDefault = Immutable.fromJS({
      layout: 'SidebarRight',
      editable: true,
      style: {},
      bg: {
        color: "#FFF",
        imageUrl: null,
        fullHeight: false
      },
      columns: [[], []]
    })
    var SidebarLeftDefault = Immutable.fromJS({
      layout: 'SidebarLeft',
      editable: true,
      style: {},
      bg: {
        color: "#FFF",
        imageUrl: null,
        fullHeight: false
      },
      columns: [[], []]
    })
    var MarginaliaRightDefault = Immutable.fromJS({
      layout: 'MarginaliaRight',
      editable: true,
      style: {},
      bg: {
        color: "#FFF",
        imageUrl: null,
        fullHeight: false
      },
      columns: [[], []]
    })
    var MarginaliaLeftDefault = Immutable.fromJS({
      layout: 'MarginaliaLeft',
      editable: true,
      style: {},
      bg: {
        color: "#FFF",
        imageUrl: null,
        fullHeight: false
      },
      columns: [[], [], []]
    })
    // Immutable's .splice() method seems to crash stuff here. Converting to plain JS. --AB, 07/2015
    var sections = currentArticle.get('sections').toJS()
    var newSectionIndex = sectionLocation.slice(-1).toJS()

    function newSection(sectionType) {
      switch (sectionType) {
        case 'OneCol':
          return OneColDefault
          break
        case 'OneColThin':
          return OneColThinDefault
          break
        case 'TwoCol':
          return TwoColDefault
          break
        case 'ThreeCol':
          return ThreeColDefault
          break
        case 'SidebarRight':
          return SidebarRightDefault
          break
        case 'SidebarLeft':
          return SidebarLeftDefault
          break
        case 'MarginaliaRight':
          return MarginaliaRightDefault
          break
        case 'MarginaliaLeft':
          return MarginaliaLeftDefault
          break
      }
    }

    var newSectionObj = newSection(sectionType).toJS();
    sections.splice(newSectionIndex, 0, newSectionObj)
    sections = Immutable.fromJS(sections)
    var updatedArticle = currentArticle.set('sections', sections)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  onDeleteBlock: function(blockLocation) {
    var currentArticle = this.data
    var updatedArticle = currentArticle.deleteIn(blockLocation)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  onDeleteSection: function(sectionLocation) {
    var currentArticle = this.data
    var updatedArticle = currentArticle.deleteIn(sectionLocation)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  onMoveBlock: function(originCursor, destinationCursor) {
    var currentArticle = this.data
    // find origin block, save in var
    var originBlock = currentArticle.getIn(originCursor)
    // delete origin block
    var prunedArticle = currentArticle.deleteIn(originCursor)
    // define destination column
    var destinationBlockIndex = destinationCursor.pop()
    var destinationColumn = destinationCursor
    // update destination column w/ origin block
    var updatedColumn = prunedArticle.getIn(destinationColumn).splice(destinationBlockIndex, 0, originBlock)
    // update article w/ new column
    var updatedArticle = prunedArticle.setIn(destinationColumn, updatedColumn)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },
  onMoveSection: function(originCursor, destinationCursor) {
    var currentArticle = this.data
    // find origin block, save in var
    var originSection = currentArticle.getIn(originCursor)
    // delete origin block
    var prunedArticle = currentArticle.deleteIn(originCursor)
    // // define destination column
    var destinationSectionIndex = destinationCursor.pop()
    // // update destination column w/ origin block
    var updatedSections = prunedArticle.getIn(destinationCursor).splice(destinationSectionIndex, 0, originSection)
    // update article w/ new column
    var updatedArticle = prunedArticle.setIn(destinationCursor, updatedSections)
    console.log('origin: ' + originCursor)
    console.log('destination: ' + destinationCursor)
    console.log('prunedArticle')
    console.log(prunedArticle.toJS())
    console.log('updatedArticle')
    console.log(updatedArticle.toJS())
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  onUpdateBlock: function(property, value, cursor) {
    var currentArticle = this.data
    console.log('onUpdateImageBlock called')
    // Find content Location
    var contentLocation = cursor.toArray()
    contentLocation.push('content')
    // Find property location w/in content
    contentLocation.push(property)
    console.log('contentLocation: ' + contentLocation)
    console.log('property: ' + property)
    console.log('property Location: ' + contentLocation)
    console.log('old value: ' + currentArticle.getIn(contentLocation))
    console.log('new value: ' + value)
    // Update current article w/ new content
    var updatedArticle = currentArticle.setIn(contentLocation, value)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  // Seems to update class, but class isn't applying to text (text-alignment) --AB, 08/2015
  onUpdateCSS: function(CSSclassArray, cursor) {
    var currentArticle = this.data
    var classesLocation = cursor.toArray()
    classesLocation.push('classes')
    var oldClasses = currentArticle.getIn(classesLocation)
    var newClasses = Immutable.List([CSSclassArray])
    // if classes array has changed or has no classes in it, add new classes
    if (oldClasses.isSubset(newClasses) === false || oldClasses.toJS().length === 0) {
      var updatedArticle = currentArticle.setIn(classesLocation, newClasses)
      CommonActions.updateData('article', updatedArticle)
      this.data = updatedArticle
    }
  },

  onUpdateLayout: function(sectionID, newLayout) {
    var currentArticle = this.data
    var layoutLocation = ['sections', sectionID, 'layout']
    // update section layout value
    var updatedArticle = currentArticle.setIn(layoutLocation, newLayout)
    // update column structure
    var columns = currentArticle.getIn(['sections', sectionID, 'columns'])
    // splits array into n # of Immutable Lists
    function splitList(list, n) {
      var length = list.size,
        minN = n,
        output = Immutable.List([]),
        i = 0
      if (length === 0) {
        // if columns are empty, return layout w/ n empty columns
        for (var i = 0; i < n; i++) {
          output = output.push(Immutable.List([]))
        }
      } else {
        while (i < length) {
          var size = Math.ceil((length - i) / n--),
            slicedEntry = list.slice(i, i += size)
          output = output.push(slicedEntry)
        }
        // if there aren't enough columns, generate a column
        if (output.count() < minN) {
          var emptyCol = Immutable.List([])
          output = output.push(emptyCol)
        }
      }
      return output;
    }

    // rebuild columns based on new layout
    var flatColumns = columns.flatten(true)
    switch (newLayout) {
      case 'OneCol':
        columns = Immutable.List([flatColumns])
        break
      case 'OneColThin':
        columns = Immutable.List([flatColumns])
        break
      case 'TwoCol':
        columns = splitList(flatColumns, 2)
        break
      case 'ThreeCol':
        columns = splitList(flatColumns, 3)
        break
      case 'SidebarRight':
        columns = splitList(flatColumns, 2)
        break
      case 'SidebarLeft':
        columns = splitList(flatColumns, 2)
        break
      case 'MarginaliaRight':
        columns = splitList(flatColumns, 2)
        break
      case 'MarginaliaLeft':
        columns = splitList(flatColumns, 2)
        break
    }
    // update data & trigger changes
    updatedArticle = updatedArticle.setIn(['sections', sectionID, 'columns'], columns)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  // NOTE: This can probably be accomplished w/o BG prop on <Section>.
  // Just need to parse style obj intelligently. Do after MVP --AB, 09/2015
  onUpdateSectionBG: function(config, cursor) {
    console.log('updateSectionBG called')
    console.log(config)
    // console.log(cursor.toJS() + ' bg updated')
    var currentArticle = this.data
    var bgImage = config.imageUrl ? "url('" + config.imageUrl + "')" : 'none'
    var bgUrlLocation = cursor.push('bgImageUrl')

    // update section w/ new BG values
    var sectionLocation = cursor
    var updatedSection = currentArticle.getIn(sectionLocation).set('bg', Immutable.fromJS(config))

    // update section w. new style values
    var sectionStyle = updatedSection.get('style')
    var updatedSectionStyle = Immutable.Map({
      backgroundColor: config.color,
      backgroundImage: bgImage,
      backgroundPosition: 'center center no-repeat',
      backgroundSize: 'cover'
    })
    if (config.fullHeight && config.imageHeight) {
      console.log('full height image: ' + config.imageHeight)
      updatedSectionStyle = updatedSectionStyle.set('minHeight', config.imageHeight)
    }

    // update article w/ updated section
    updatedSection = updatedSection.set('style', updatedSectionStyle)
    var updatedArticle = currentArticle.setIn(sectionLocation, updatedSection)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  onUpdateSectionSpacing: function(config, cursor) {
    console.log('updateSectionBG called')
    console.log(config)
    // console.log(cursor.toJS() + ' bg updated')
    var currentArticle = this.data

    // update section w/ new BG values
    var sectionLocation = cursor
    var updatedSection = currentArticle.getIn(sectionLocation)

    // update section w. new style values
    var sectionStyle = updatedSection.get('style').toJSON();
    var updatedSectionStyle = Immutable.Map(
      Object.assign({}, sectionStyle, config)
    )

    // update article w/ updated section
    updatedSection = updatedSection.set('style', updatedSectionStyle)
    var updatedArticle = currentArticle.setIn(sectionLocation, updatedSection)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },
  // Current unused - keep, as we'll be reintroducing text styles
  onUpdateTextStyle: function(selectedTextStyle, cursor) {
    var currentArticle = this.data
    var textStyleLocation = cursor.push('content', 'style')
    var updatedArticle = currentArticle.setIn(textStyleLocation, selectedTextStyle)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },

  updateTextBlockStyle: function(newStyle, cursor) {
    var currentArticle = this.data
    var styleLocation = cursor.toArray()
    styleLocation.push('content', 'style')
    var updatedArticle = currentArticle.setIn(styleLocation, newStyle)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  },
  updateTextBlockContent: function(newText, cursor) {
    var currentArticle = this.data
    var textLocation = cursor.toArray()
    textLocation.push('content', 'text')
    var updatedArticle = currentArticle.setIn(textLocation, newText)
    CommonActions.updateData('article', updatedArticle)
    this.data = updatedArticle
  }

})

module.exports = { ArticleStore: ArticleStore }
