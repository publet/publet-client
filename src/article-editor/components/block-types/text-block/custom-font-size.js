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

class CustomFontSize {
  constructor(quill, options = {}) {
    this.quill = quill;
    this.initListeners();
  }

  initListeners() {
    this.quill.onModuleLoad('toolbar', (toolbar) => {
      this.toolbar = toolbar;
      var customFont = this.toolbar.container.querySelector('.ql-size .ql-picker-item[data-value="custom"]')
      customFont.addEventListener('click', this.customFontSizePrompt.bind(this))
    });
  }

  customFontSizePrompt() {
    var fontSize = prompt("Please enter font size", "");

    if (fontSize != null) {
      if(fontSize.indexOf('px') === -1){
        fontSize += 'px';
      }

      let range = this.quill.getSelection(true);
      this.quill.formatText(range, 'size', fontSize, 'user');

    }
  }

}

Quill.registerModule('custom-font-size', CustomFontSize);

export { CustomFontSize as default };