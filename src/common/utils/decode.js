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

function _decode(integer) {
  var BASE = 62;
  var UPPERCASE_OFFSET = 55;
  var LOWERCASE_OFFSET = 61;
  var DIGIT_OFFSET = 48;

  function trueChr(integer) {
    if (integer < 10) {
      return String.fromCharCode(integer + DIGIT_OFFSET);
    } else if ((10 <= integer) && (integer <= 35)) {
      return String.fromCharCode(integer + UPPERCASE_OFFSET);
    } else if ((36 <= integer) && (integer <= 62)) {
      return String.fromCharCode(integer + LOWERCASE_OFFSET);
    } else {
      throw 'invalid';
    }

  }

  if (integer === 0) {
    return '0';
  }

  var string = '';
  var remainder;

  while (integer > 0) {
    remainder = Math.floor(integer % BASE);
    string = trueChr(remainder) + string;
    integer = Math.floor(integer / BASE);
  }

  return string;

}

export const decode = function(articleID, blockID) {
  return _decode(articleID) + '-' + _decode(blockID);
}
