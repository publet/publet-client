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

var Quill = require('quill');
var Tooltip = require('quill').modules.tooltip;
var ReactDom = require('react-dom');

class LineHeightTooltip extends Tooltip {
  constructor(quill, options = {}) {
    super(quill, options);
    this.initListeners();

    quill.addFormat('lineHeight', {
      style: 'lineHeight',
      default: '1'
    });
    this.quill = quill;

  }
  initListeners() {
    this.quill.on('selection-change', this.selectionChange.bind(this));
    this.quill.onModuleLoad('toolbar', (toolbar) => {
      this.toolbar = toolbar;
      toolbar.initFormat('line-height-decrease', this.formatText.bind(this, false));
      toolbar.initFormat('line-height-increase', this.formatText.bind(this, true));
      toolbar.initFormat('line-height-label', this.setCustom.bind(this, true));
    });
  }

  selectionChange(range){
    if(range){
      var lineHeight = 0;
      var leafFormats = this.quill.editor.doc.findLeafAt((range.start + range.end)/2, true)
      if (!_.isEmpty(leafFormats) && leafFormats[0].formats && leafFormats[0].formats.lineHeight) {
        lineHeight = parseFloat(leafFormats[0].formats.lineHeight);
        if(lineHeight){
          this.updateLabel(lineHeight);
        }else{
          this.updateLabel(1);
        }
      }else{
        this.updateLabel(1);
      }
    }
  }

  setCustom() {
    let range = this.quill.getSelection(true);
    var lineHeight = 1;
    var leafFormats = this.quill.editor.doc.findLeafAt((range.start + range.end)/2, true)
    if (!_.isEmpty(leafFormats) && leafFormats[0].formats && leafFormats[0].formats.lineHeight) {
      lineHeight = parseFloat(leafFormats[0].formats.lineHeight);
    }
    this.quill.formatText(range.start, range.end, 'lineHeight', false, 'silent');
    var lineHeightPrompt = prompt("Please enter line height", lineHeight);
    if(lineHeightPrompt.match(/[0-9]+(\.[0-9][0-9]?)?/i) != null){
      lineHeightPrompt = lineHeightPrompt.replace(/[^0-9.]+/g,"");
      this.quill.formatText(range, 'lineHeight', lineHeightPrompt, 'user');
      this.updateLabel(lineHeightPrompt);
    }else{
      alert('Invalid line height');
    }
  }

  updateLabel(value){
    var qlLineHeightLabel =ReactDom.findDOMNode(this.toolbar.container).getElementsByClassName('ql-line-height-label')[0]
    qlLineHeightLabel.innerHTML = '<span>' + value + '</span>'
  }

  formatText(isIncrease) {
    let range = this.quill.getSelection(true);
    var lineHeight = 1;
    var leafFormats = this.quill.editor.doc.findLeafAt((range.start + range.end)/2, true)
    if (!_.isEmpty(leafFormats) && leafFormats[0].formats && leafFormats[0].formats.lineHeight) {
      lineHeight = parseFloat(leafFormats[0].formats.lineHeight);
    }
    this.quill.formatText(range.start, range.end, 'lineHeight', false, 'silent');
    if (isIncrease) {
      lineHeight++
    } else {
      if (lineHeight > 1) {
        lineHeight--
      }
    }
    this.quill.formatText(range, 'lineHeight', lineHeight, 'user');
    if(range.start !== range.end){
      this.updateLabel(lineHeight);
    }
  }
}

Quill.registerModule('line-height-tooltip', LineHeightTooltip);

export { LineHeightTooltip as default };