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

/*
 * git-adder
 *
 * This plugin adds the git sha of the current HEAD to the top of the file.
 * Like this sha=abcd
 *
 * Usage:
 * var git-adder = require('./node/git.js);
 * src().pipe(git-adder());
 *
 */
var through = require('through2');
var gutil = require('gulp-util');
var git = require('gulp-git');
var PluginError = gutil.PluginError;


function shaStream(sha) {
  'use strict';
  var stream = through();
  stream.write(sha);
  return stream;
}

function gitAdder() {
  'use strict';
  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }


    git.revParse({args: 'HEAD'}, function (err, hash) {
      if (err) {
        throw new PluginError('publet-git-adder', err);
      }

      var gitSha = new Buffer('/* sha=' + hash + ' */\n');

      if (file.isBuffer()) {
        file.contents = Buffer.concat([gitSha, file.contents]);
      }

      if (file.isStream()) {
        file.contents = file.contents.pipe(shaStream(gitSha));
      }

      cb(null, file);

    });

  });
}

module.exports = gitAdder;
