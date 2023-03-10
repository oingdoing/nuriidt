let $body = $('body');
let $nav = $('.app-nav');

$(function () {
  navFunction.init();
});

const navFunction = {
  init: function () {
    navFunction.open();
  },
  open: function () {
    $nav.on('click', '.btn-menu', function () {
      var chkNav = $nav.hasClass('is-active');
      if (!chkNav) {
        $nav.addClass('is-active');
        $body.addClass('is-hidden');
      } else {
        $nav.removeClass('is-active');
        $body.removeClass('is-hidden');
      }
    });
  },
};
