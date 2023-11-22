let $body = $('body');
let $window = $(window);
let windowWd = $window.width();
let windowHt = $window.outerHeight();
let $app = $('.app');
let $header = $('.app-header');
let $footer = $('.app-footer');
let $nav = $('.app-header__gnb');
let $bcrmb = $('.app-breadcrumb');
let $article = $('.app-article');


$( function(){
  util.nav();
  $window
    .on('load', function(){
      if(windowWd < 768){
        util.navMob();
        util.posBrcrmb(windowWd);
      }
    })
    .on('resize', function(){
      let re_windowWd = $(window).width();
      if(re_windowWd < 768){
        util.navMob();
        util.posBrcrmb(windowWd);
      }
    })
    .on('scroll', function(){
      var scrolltop = $window.scrollTop();
      util.gnbSticky(scrolltop);
      util.counting(scrolltop); 
    });
});


let util = {
  gnbSticky: function(st){
    if(st > ($header.height()/2)){
      $header.addClass('is-sticky');
    }else{
      $header.removeClass('is-sticky');
    }
  },
  nav: function() {
    $header.on('click', '.app-header__menu-btn', function () {
      $(this).closest($header).toggleClass('is-active');
      $body.toggleClass('is-hidden');
    })
  },
  navMob: function(){
    $nav.find('a').unbind('mouseenter mouseleave');
    $nav.on('click', '.app-header__gnb-main', function(e){
      e.preventDefault()
      $(this).parent().addClass('is-active').siblings().removeClass('is-active');
    });
  },
  posBrcrmb: function(windowwidth){
    let baseWd = $bcrmb.find('.app-breadcrumb__list').width();
    if($bcrmb.length>0 && windowwidth < baseWd){
      var targetPos = Math.floor($bcrmb.find('.app-breadcrumb__item.is-active').offset().left);
      var $setPosEl = $bcrmb.find('.app-breadcrumb__box');
      $setPosEl.scrollLeft(targetPos);
    }
  },
  counting: function(st){
    var $countEl = $('.counting-box');
    if($countEl.length>0){
      var countTarget = $countEl.offset().top  - (windowHt/2);
      var activeChk = $countEl.hasClass('is-counting');
      if(st > countTarget){
        if(!activeChk){
          $countEl.addClass('is-counting');
          $('.counter').counterUp({
            delay: 10,
            time: 1000
          });
        }
      }
    }
  }
}

// PC,mobile 
const device = function(){
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
  }else{
    $body.removeClass('is-mobile');
  }

}