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
var _ = require('lodash');

const HIDE_MARGIN = '-10000px';

class TextStyleTooltip {
  constructor(quill, options = {}) {
    this.quill = quill;
    this.container = this.buildContainer()
    this.options = options;
    this.formats = [];
    this.textStyleContainer = this.container.querySelector('.text-style-container');
    this.initListeners();
  }

  buildContainer() {
    var container = document.createElement('span');
    container.classList.add('ql-picker');
    container.style.backgroundColor = 'white';
    container.style.border = '1px solid transparent';
    container.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0 2px 8px';
    container.style.zIndex = '2';
    container.innerHTML = TextStyleTooltip.DEFAULTS.template
    return container;
  }

  buildItem(item) {
    var textStyleItem = document.createElement("div")
    var styleProps = _.keys(item.style);

    _.each(styleProps, (key) => {
        textStyleItem.style[key] = item.style[key];
        if (this.formats.indexOf(key) === -1 && item.style[key]) {
          this.quill.addFormat(key, {
            style: key
          });
          this.formats.push(key);
        }
      }
    )
    textStyleItem.innerHTML = item.name;
    textStyleItem.className = "text-style-item";
    textStyleItem.textStyle = item;
    textStyleItem.base = this;
    textStyleItem.onclick = this.onSelectTextStyle;
    return textStyleItem
  }

  buildPicker() {
    _.each(this.options.textStyles, (item)=> {
      var textStyleItem = this.buildItem.call(this, item)
      this.textStyleContainer.appendChild(textStyleItem)
    });
    this.textStyleToobar = this.quill.modules.toolbar.container.querySelector('.ql-textStyle')
    this.textStyleToobar.appendChild(this.container);

  }

  onSelectTextStyle() {
    let range = this.base.quill.editor.selection.getRange(true);
    var styleProps = _.keys(this.textStyle.style);
    _.each(styleProps, (key, i) => {
      if (this.textStyle.style[key]) {
        var source = 'silent'
        if (i === styleProps.length - 1) {
          source = 'user'
        }
        this.base.quill.formatText(range, key, this.textStyle.style[key], source);
      }
    });
  }

  initListeners() {
    this.quill.onModuleLoad('toolbar', this._onToolbar.bind(this));
    this.quill.onModuleLoad('keyboard', (keyboard) => {
      keyboard.addHotkey(TextStyleTooltip.hotkeys.LINK, this._onKeyboard.bind(this));
    });
    this.quill.container.addEventListener('click', (evt) => {
      if (evt.target !== this.textStyleToobar) {
        this.hide();
      }
    });
  }

  hide() {
    this.container.style.left = HIDE_MARGIN;
    this.quill.focus();
  }

  show() {
    this.container.style.left = '0px';
    this.container.style.top = '0px'
  }

  _onToolbar() {
    this.textStyleToobar = this.quill.modules.toolbar.container.querySelector('.ql-textStyle');
    this.label = document.createElement('span');
    this.label.style.width = '50px;'
    this.label.style.height = '20px;'
    this.label.innerHTML = '';
    this.textStyleToobar.appendChild(this.label);
    this.textStyleToobar.appendChild(this.container);
    this.buildPicker();
    this.hide();
    this.textStyleToobar.addEventListener('click', () => {
      this.container.classList.toggle('ql-expanded');
      this.show();
    });
  }

  _onKeyboard() {
    let range = this.quill.getSelection();
    this._toggle(range);
  }

  _toggle() {
    this.show();
  }
}

TextStyleTooltip.DEFAULTS = {
  maxLength: 50,
  template: `
    <span class="title">Apply text style:&nbsp;</span>
    <div class="text-style-container">
    </div>`
};
TextStyleTooltip.hotkeys = {
  LINK: {
    key: 'K',
    metaKey: true
  }
};

Quill.registerModule('text-style-tooltip', TextStyleTooltip);

export { TextStyleTooltip as default };
