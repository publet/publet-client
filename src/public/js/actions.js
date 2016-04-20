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

var $ = require('jquery');

function submitEvent(name, type, value) {
  window.analytics.track('action', {
    name: name,
    type: type,
    value: value
  });
}

function registerMediaActions() {
}

function registerNavigationActions() {
  $('#articleNavItems > li a').click(function() {
    submitEvent('button click', 'navigation', this.innerHTML);
    return true;
  });
}

function registerWindowActions() {
}

function registerButtonActions() {
}

function registerFormActions() {
  $('#gate-cta-btn').click(function() {
    submitEvent('submit button click', 'form', this.innerHTML);
  });
}

function registerActions() {
  registerMediaActions();
  registerNavigationActions();
  registerWindowActions();
  registerButtonActions();
  registerFormActions();
}

module.exports.registerActions = registerActions;
