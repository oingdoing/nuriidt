let $nav = $('.app-neav');
console.log('testttt');

$(function () {
  nav.init();
  console.log('test');
});

const nav = {
  init: function () {
    nav.open();
  },
  open: function () {
    $nav.on('click', '.btn-menu', function () {
      $(this).toggleClass('is-active');
    });
  },
};
