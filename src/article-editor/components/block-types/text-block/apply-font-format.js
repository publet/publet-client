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


class ApplyFontFormat {
  constructor(quill, options = {}) {
    this.quill = quill;
    this.initListeners();
  }

  initListeners() {
    this.quill.on(Quill.events.SELECTION_CHANGE, (range)=> {
      this.updateFormat(range);
    });

    this.quill.on(Quill.events.TEXT_CHANGE, (delta) => {
      var range;
      if (delta.ops.length === 2 && delta.ops[1].insert === '\n') {
        range = this.quill.getSelection();
        this.updateFormat(range);
      }
    });
  }

  updateFormat(range) {
    if (range == null || !range.isCollapsed() || range.start !== range.end) {
      return;
    }
    var cursorPosition = this.quill.getBounds(range.start);
    var delta = this.quill.getContents(range.start, range.start + 1);
    if (cursorPosition.left === 15 && delta.ops[0].insert === '\n') {

      this.quill.updateContents({
        ops: [
          { retain: range.start },
          { insert: ' ', attributes: { size: '8px' } }
        ]
      }, Quill.sources.SILENT);
      this.quill.setSelection(range.start, range.start, Quill.sources.SILENT)
    }
  }
}

Quill.registerModule('apply-font-format', ApplyFontFormat);

export { ApplyFontFormat as default };