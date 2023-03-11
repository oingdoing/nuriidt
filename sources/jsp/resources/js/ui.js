let $body = $('body');
let $nav = $('.app-nav');
let $tooltip = $('.tooltip-wrap');

$(function () {
  navFunction.set();
  tooltipAction.set();
  ocrAction.set();
});

const navFunction = {
  set: function () {
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

const tooltipAction = {
  set: function () {
    tooltipAction.active();
  },
  active: function () {
    $tooltip
      // 열기
      .on('click', '.tooltip-button__open', function () {
        $(this).closest('.tooltip-wrap').addClass('is-active');
      })
      // 닫기
      .on('click', '.tooltip-button__close', function () {
        $(this).closest('.tooltip-wrap').removeClass('is-active');
      })
      .on('click', '.btn-close', function () {
        $(this).closest('.tooltip-wrap').removeClass('is-active');
      });
  },
};

const ocrAction = {
  set: function () {
    ocrAction.imgUpload();
  },
  imgUpload: function () {
    let $ocrUpload = $('.ocr-img');
    $ocrUpload.on('click', '.button-ocr-upload', function () {
      $(this).closest('.ocr-img').find('#ocrImgUpload').trigger('click');
    });
  },
};
