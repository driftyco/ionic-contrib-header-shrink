// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic'])

.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(max, amt);
    fadeAmt = 1 - amt / max;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var last = [ starty, starty, starty, starty, starty ];
      var shrinkAmt;

      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;

      $element.bind('scroll', function(e) {
        var last_delta = last.shift() - last[last.length-1];
        last.push(e.detail.scrollTop);
        var delta = last[0] - last[last.length-1];

        if ($element[0].scrollHeight > $element[0].offsetHeight)  {
          if (last_delta <= 0 && delta > 0)
            starty = Math.max(0, e.detail.scrollTop - headerHeight);
          else if (last_delta >= 0 && delta < 0)
            starty = Math.max(0, e.detail.scrollTop);

          starty = Math.min(starty, $element[0].scrollHeight - $element[0].offsetHeight - headerHeight);

          shrinkAmt = Math.max(0, headerHeight - Math.max(0, (starty + headerHeight) - e.detail.scrollTop));
          shrink(header, $element[0], shrinkAmt, headerHeight);
        }
      });
    }
  }
})
