let $body = $('body');
let $window = $(window);
let windowHt = $window.outerHeight();
let $app = $('.app');
let $header = $('.app-header');
let $footer = $('.app-footer');
let $nav = $('.app-header__gnb');
let $article = $('.app-article');


$( function(){
  main.set();
  $window.on('scroll', function(){
    var scrolltop = $window.scrollTop();
    util.gnb(scrolltop);
  });
});

let main = {
  set: function(){
  },
}
let util = {
  set: function(){
  },
  gnb: function(scrolltop){
    if(scrolltop > ($header.height()/2)){
      $header.addClass('is-sticky');
    }else{
      $header.removeClass('is-sticky');
    }
  },
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