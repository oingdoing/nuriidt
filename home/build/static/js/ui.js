"use strict";

var $body = $('body');
var $window = $(window);
var windowHt = $window.outerHeight();
var $app = $('.app');
var $header = $('.app-header');
var $footer = $('.app-footer');
var $nav = $('.app-header__gnb');
var $article = $('.app-article');
$(function () {
  main.set();
  $window.on('scroll', function () {
    var scrolltop = $window.scrollTop();
    util.gnb(scrolltop);
    util.counting(scrolltop);
  });
});
var main = {
  set: function set() {}
};
var util = {
  gnb: function gnb(st) {
    if (st > $header.height() / 2) {
      $header.addClass('is-sticky');
    } else {
      $header.removeClass('is-sticky');
    }
  },
  counting: function counting(st) {
    var $countEl = $('.counting-box');
    if ($countEl.length > 0) {
      var countTarget = $countEl.offset().top - windowHt / 2;
      var activeChk = $countEl.hasClass('is-counting');
      if (st > countTarget) {
        if (!activeChk) {
          $countEl.addClass('is-counting');
          $('.counter').counterUp({
            delay: 10,
            time: 1000
          });
        }
      }
    }
  }
};

// PC,mobile 
var device = function device() {
  var uAgent = navigator.userAgent.toLowerCase();
  var mobilePhones = new Array('iphone', 'ipod', 'android', 'blackberry', 'windows ce', 'nokia', 'webos', 'opera mini', 'sonyericsson', 'opera mobi', 'iemobile', 'windows phone');
  var isMobile = false;
  for (var i = 0; i < mobilePhones.length; ++i) {
    if (uAgent.indexOf(mobilePhones[i]) > -1) {
      isMobile = true;
      break;
    }
  }
  if (isMobile) {
    $body.addClass('is-mobile');
  } else {
    $body.removeClass('is-mobile');
  }
};
//# sourceMappingURL=maps/ui.js.map
