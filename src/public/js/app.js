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

require('./track.new.js');
var actions = require('./actions.js');
var $ = require('jquery');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

$(function() {
  'use strict';
  // Gate Logic

  function toggleGateModal() {
    // causing issues in Kaltura gate - scroll lock toggled improperly --AB, 02/09/2016
    // document.body.classList.toggle('scroll-lock');
    document.querySelector('#gate-modal').classList.toggle('modal-closed');
    document.querySelector('#gate-modal').classList.toggle('modal-open');
  }

  function navLinkClickHandler() {
    if (localStorage.gateCompleted !== 'true') {
      toggleGateModal();
      return false;
    }
  }

  // If gate has been completed, don't show gate
  if (localStorage.gateCompleted ===  'true') {
    toggleGateModal()
  }

  var firstArticleHeight = document.querySelector('#content').children[0].offsetHeight;

  function triggerScrollGate() {
    // only trigger modal if scrolled past 1st article and gate hasn't been completed
    if (window.pageYOffset > firstArticleHeight && localStorage.gateCompleted !== 'true') {
      // only fire if toggleGateModal is not in progress
      if (localStorage.scrollGateInProgress !== 'true') {
        localStorage.scrollGateInProgress = true
        toggleGateModal()
        // reset after 100ms
        setTimeout(function(){
          localStorage.scrollGateInProgress = !localStorage.scrollGateInProgress
        }, 100)
      }
    }
  }

  console.log('before');

  if (document.querySelector('#gate-modal')) {
    console.log('has gate');

    // Gate Modal Form Submit
    document.querySelector('#gate-cta-btn').onclick = function() {
      var form = this.parentElement;
      var formData = {};
      console.log('Gate form submitted')
      var inputs = form.querySelectorAll('input')

      for (var i = 0; i < inputs.length; i++) {
        var inputObj = {}
        var name = slugify(inputs[i].name)

        if (name === '') {
          continue;
        }
        formData[name] = inputs[i].value
      }

      var submitObj = {
        'publication': {
          'pk': window.publicationId
        },
        'anonymous_id': window.analytics.user().anonymousId(),
        'data': formData
      };
      var apiUrl = window.config.baseUrl + 'api/generic-gate/'
      var xhr = new XMLHttpRequest()
      xhr.open('POST', apiUrl, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.onreadystatechange = function () {
      	if (xhr.readyState !== 4 || xhr.status !== 200) {
      	  return;
        }
      	console.log(xhr.responseText);
      };
      xhr.send(JSON.stringify(submitObj));
      console.log(submitObj)
      localStorage.gateCompleted = true
      toggleGateModal()
      return false
    }

    // Gate Nav Trigger
    if (document.querySelector('.nav-link')) {
      var navLinks = document.querySelectorAll('.nav-link')
      for (var i = 0; i < navLinks.length; i++) {
        // Make it so nav links don't work if gate is not completed
        // as well as trigger modal when clicked
        navLinks[i].onclick = navLinkClickHandler;
      }
    }

    // Scroll handler for firing modal
    window.addEventListener('scroll', triggerScrollGate);

  }

  // Article Navigation
  if (document.querySelector('#articleNav')) {
    document.querySelector('#articleNav').onclick = function() {
      document.querySelector('#articleNavItems').classList.toggle('showitems');
    };
  } else if (document.querySelector('#articleNavBig')) {
    document.querySelector('#articleNavBig').onclick = function() {
      document.querySelector('#articleNavItems').classList.toggle('showitems');
    };
  } else {
    console.log('Navigation js failed. Check src/public/js/app.js')
  }

  actions.registerActions();

});
