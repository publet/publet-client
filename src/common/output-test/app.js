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

// This file will be inserted into the static publication
(function() {
  // Gate Logic

  if (localStorage.gateCompleted ===  "true") {
    console.log('Gate was completed previously')
  } else {
    console.log('Gate has not been completed yet')
  }

  if (document.querySelector('#gate-modal')) {
    // Gate Modal toggle
    function toggleGateModal() {
      document.body.classList.toggle('scroll-lock');
      document.querySelector('#gate-modal').classList.toggle('modal-closed');
      document.querySelector('#gate-modal').classList.toggle('modal-open');
    }
    document.querySelector('#gate-cta-btn').onclick = function(e ) {
      e.preventDefault();
      toggleGateModal()
    }

    // Gate Modal Form Submit
    document.querySelector('#gate-form').onsubmit = function(e) {
      var formData = []
      console.log('Gate form submitted')
      var inputs = this.querySelectorAll('input')
      for (var i = 0; i < inputs.length; i++) {
        var inputObj = {}
        inputObj[inputs[i].name] = inputs[i].value
        formData.push(inputObj)
      }
      var submitObj = {
        "publication": {
          "pk": window.analytics.user().anonymousId()
        },
        "data": formData
      }
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
        navLinks[i].onclick = function(e) {
          if (localStorage.gateCompleted !== "true") {
            toggleGateModal()
            return false
          }
        }
      }
    }

    // Gate Scroll Trigger
    var firstArticleHeight = document.querySelector('#content').children[0].offsetHeight

    function triggerScrollGate(e) {
      // only trigger modal if scrolled past 1st article and gate hasn't been completed
      if (window.pageYOffset > firstArticleHeight && localStorage.gateCompleted !== "true") {
        // only fire if toggleGateModal is not in progress
        if (localStorage.scrollGateInProgress !== "true") {
          localStorage.scrollGateInProgress = true
          toggleGateModal()
          // reset after 100ms
          setTimeout(function(){
            localStorage.scrollGateInProgress = !localStorage.scrollGateInProgress
          }, 100)
        }
      }
    }

    // Scroll handler for firing modal
    window.addEventListener('scroll', triggerScrollGate);

  } else {}


  // Article Navigation

  if (document.querySelector('#articleNav')) {
    document.querySelector('#articleNav > .icon').onclick = function() {
      document.querySelector('#articleNavItems').classList.toggle('showitems');
    };
  } else if (document.querySelector('#articleNavBig')) {
    document.querySelector('#articleNavBig').onclick = function() {
      document.querySelector('#articleNavItems').classList.toggle('showitems');
    };
  } else {
    console.log('Navigation js failed. Check src/public/js/app.js')
  }
})();
