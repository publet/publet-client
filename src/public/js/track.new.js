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

var _ = require('underscore');
var $ = require('jquery');
var Bacon = require('baconjs');

$.fn.asEventStream = Bacon.$.asEventStream;

$(function() {
  'use strict';

  // The window is a view of the document that is the browser window.  This
  // function gets the position of the window in the document.  It returns an
  // object that says where the top and the bottom edge of the window are.
  function getVisibleViewport() {
    var $w = $(window);
    return {
      top: $w.scrollTop(),
      bottom: $w.scrollTop() + $w.height()
    };
  }

  // Given a visible viewport, return a filter function.  This function
  // determines whether an element is currently visible.
  function isInView(visible) {
    return function(i, el) {
      if (
        ((el.top > visible.top) && (el.top < visible.bottom)) ||
          // or the bottom edge of the element is in view
          ((el.bottom > visible.top) && (el.bottom < visible.bottom)) ||
          // or the top edge is above the viewport and the bottom edge is below
          // the viewport
          ((el.top < visible.top) && (el.bottom > visible.bottom))
      ) {
        return true;
      } else {
        return false;
      }
    };
  }

  function getVisibleArticles() {
    var $articles = $('.article');
    var articlePositions = $articles.map(function(i, el) {
      var $el = $(el);
      return {
        top: $el.offset().top,
        bottom: $el.offset().top + $el.height(),
        id: parseInt($el.data('publet-id'), 10)
      };
    });

    var visible = getVisibleViewport();
    return articlePositions.filter(isInView(visible));
  }

  function getVisibleBlocks() {
    var $blocks = $('.block');

    var blockPositions = $blocks.map(function(i, el) {
      var $el = $(el);
      return {
        top: $el.offset().top,
        bottom: $el.offset().top + $el.height(),
        id: parseInt($el.data('publet-id'), 10)
      };
    });

    var visible = getVisibleViewport();
    return blockPositions.filter(isInView(visible));

  }

  // Attention minutes

  function merge(stream1, stream2) {
    return stream1.merge(stream2);
  }

  function eventStream(eventName) {
    return $(window).asEventStream(eventName);
  }

  var DECAY = 5000; // 5s
  var EVENT_NAMES = ['focus', 'click', 'scroll', 'mousemove', 'touchstart',
                      'touchend', 'touchcancel', 'touchleave', 'touchmove'];

  var isFocused = eventStream('focus').map(true)
      .merge(eventStream('blur').map(false))
      .toProperty(true);

  var streams = _.map(EVENT_NAMES, eventStream);
  var activityStream = _.reduce(streams, merge);

  var recentlyActive = activityStream
      .map(true)
      .flatMapLatest(function() {
        return Bacon.once(true).merge(Bacon.once(false).delay(DECAY));
      })
      .toProperty(false);

  var isActive = recentlyActive.and(isFocused);

  var secondsActive = Bacon.mergeAll(isActive.changes(), isActive.sample(1000))
    .map(function(isActive) {
      return {
        isActive: isActive,
        timestamp: new Date().getTime()
      };
    })
    .slidingWindow(2,2)
    .filter(function(span) { return span[0].isActive; })
    .map(function(span) { return span[1].timestamp - span[0].timestamp; })
    .scan(0, function(x,y) { return x + y;})
    .map(function(x) { return x / 1000; }) // milliseconds
    .map(Math.floor);

  var Analytics = (function() {
    var ws = new WebSocket(window.PB.trackUrl + '/ws');
    var buffer = [];
    var ready = false;

    ws.onopen = function() {
      ready = true;

      _.each(buffer, function(el) {
        ws.send(el);
      });
    };

    return {
      send: function(data) {
        data = JSON.stringify(data);

        if (!ready) {
          return buffer.push(data);
        }

        return ws.send(data);
      }
    };
  })();

  function rangeTo100(height, range) {
    var one = height / 100;

    var start = range[0];
    var end = range[1];

    var seen = [];
    var acc = start;

    while (acc < end) {
      seen.push(Math.round(acc / one));
      acc = acc + one;
    }

    return seen;

  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function percentFromRanges(height, ranges) {
    var all = [];

    for (var i = 0; i < ranges.length; i++) {
      all = all.concat(rangeTo100(height, ranges[i]));
    }

    var len = all.filter(onlyUnique).length;

    if (len > 100) {
      return 100;
    }

    return len;
  }

  var article = function($elm) {
    var articleId = $elm.data('publet-id');
    window.articlePercentages[articleId] = {
      height: null,
      ranges: []
    };

    var height;

    var getViewRange = function() {
      var visible = getVisibleViewport();

      height = $elm.height();

      var top = $elm.offset().top;
      var bottom = top + height;

      var topVisible = (top > visible.top) && (top < visible.bottom);
      var bottomVisible = (bottom > visible.top) && (bottom < visible.bottom);
      var middleVisible = (top < visible.top) && (bottom > visible.bottom);

      var heightVisible = 0;

      if (topVisible && bottomVisible) {
        return [0, height];
      }

      if (middleVisible) {
          return [visible.top - top, visible.bottom];
        }

        if (!topVisible && !bottomVisible) {
          return [];
        }

        // top or bottom visible

        if (topVisible) {
          heightVisible = visible.bottom - top;
          return [0, heightVisible];
        }

        if (bottomVisible) {
          heightVisible = bottom - visible.top;
          return [heightVisible, height];
        }

        return [];

      };

      $(document).on('publet-scroll', function() {
        window.articlePercentages[articleId].height = height;
        var ranges = window.articlePercentages[articleId].ranges;
        ranges = ranges.concat([getViewRange()]);
        window.articlePercentages[articleId].ranges = ranges;
      });

    };

    var IdentityStorage = {
      get: function(callback) {
        return $.ajax({
          url: (window.PB.host || '') + '/api/user/identity/',
          method: 'get',
          dataType: 'json',
          success: callback
        });
      }
    };

    // Publication controller
    (function() {
      window.articlePercentages = {};

      var articles = $('.article');

      articles.each(function(_, el) {
        article($(el));
      });

      IdentityStorage.get(function(data) {
        window.PB.userId = data.user_id;
        window.seenGate = data.seen[window.publicationId];
        window.seenPages = data.seen_pages[window.publicationId];

        window.analytics.identify(window.PB.userId, {
          agent: window.navigator.userAgent,
          languages: window.navigator.languages
        });

        Analytics.send(window._publet);
      });

      var $window = $(window);
      var $body = $('body');

      var windowHeight = $window.height();
      var pageHeight = $body.height();

      var chunkCount = Math.round(pageHeight / windowHeight);
      var chunkSize = windowHeight;

      var getCurrentChunk = function(scroll) {
        return Math.round((scroll + chunkSize) / chunkSize);
      };

      var chunksSeen = [];

      var percentChunksSeen = function() {
        if (chunksSeen.length === chunkCount) {
          return 100;
        }
        return Math.round(chunksSeen.length / chunkCount * 100);
      };

      var scroll = function() {
        $.event.trigger({
          type: 'publet-scroll'
        });

        var curChunk = getCurrentChunk($window.scrollTop());

        if (_.indexOf(chunksSeen, curChunk) === -1) {
          chunksSeen.push(curChunk);
        }

      };

      $window.scroll(_.throttle(scroll, 300));

      var seconds = 0;
      var articleSeconds = {};
      var blockSeconds = {};

      secondsActive.onValue(function(x) {
        if (x === seconds) {
          return;
        }

        seconds++;

        var visibleArticles = getVisibleArticles();
        var visibleBlocks = getVisibleBlocks();

        visibleArticles.each(function(i, el) {
          if (articleSeconds[el.id] === undefined) {
            articleSeconds[el.id] = 1;
          } else {
            articleSeconds[el.id]++;
          }
        });

        visibleBlocks.each(function(i, el) {
          if (blockSeconds[el.id] === undefined) {
            blockSeconds[el.id] = 1;
          } else {
            blockSeconds[el.id]++;
          }
        });

      });

      window.collectAndSend = function() {
        var seen = percentChunksSeen();

        var engaged = ['engaged', {
          seconds: seconds,
          articleSeconds: articleSeconds,
          blockSeconds: blockSeconds,
          publication: window.publicationId
        }];

        var read = ['read', {
          value: seen,
          publication: window.publicationId
        }];

        var articlesRead = ['articles-read', {
          value: _.map(window.articlePercentages, function(article, id) {
            return {
              articleId: parseInt(id, 10),
              percentRead: percentFromRanges(article.height, article.ranges)
            };
          }),
          publication: window.publicationId
        }];

        var data = window._publet.concat([engaged, read, articlesRead]);
        Analytics.send(data);
      };

      window.addEventListener('beforeunload', function() {
        // Try to send at the end; it's fine if it fails
        window.collectAndSend();
      });

      setInterval(function() {
        window.collectAndSend();
      }, 30 * 1000); // 30s

      scroll();


    })();

});
