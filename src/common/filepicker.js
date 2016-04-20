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

var request = require('superagent')

var fpKey = 'AH5FfH2wSbOnW3MKuxIjgz'

var fpAuth =  function() {
  if (window.config.name === 'staging') {
    var apiCall = 'https://staging.publet.com/api/2/filepicker/'
    request
      .get(apiCall)
      .withCredentials()
      .type('json')
      .end(function(err, res) {
        localStorage.setItem('policy',res.body.read.policy);
        localStorage.setItem('signature',res.body.read.signature);

        window.FP = {
          write: res.body.write,
          read: res.body.read
        }
      })
    filepicker.setKey(fpKey)
  } else if (window.config.name === 'beta') {
    var apiCall = 'https://beta.publet.com/api/2/filepicker/'
    request
      .get(apiCall)
      .withCredentials()
      .type('json')
      .end(function(err, res) {
        localStorage.setItem('policy',res.body.read.policy);
        localStorage.setItem('signature',res.body.read.signature);
        window.FP = {
          write: res.body.write,
          read: res.body.read
        }
      })
    filepicker.setKey(fpKey)

  } else {
    console.log('no config name set; filepicker.js cannot auth')
  }
}

module.exports = fpAuth
