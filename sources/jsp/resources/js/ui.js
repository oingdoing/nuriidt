let $body = $('body');
let $nav = $('.app-nav');
let $tooltip = $('.tooltip-wrap');

$(function () {
  navFunction.set();
  tooltipAction.set();
  ocrAction.set();
  pgJahyung.set();
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

const pgJahyung = {
  set: function () {
    pgJahyung.filter();
  },
  filter: function () {
    let $filter = $('.charactor-list');
    let $filterBox = $filter.find('.charactor-list__filter');
    let $filterItem = $filter.find('.charactor-list__items');
    $filterItem.on('click', '.filter-item button', function () {
      var chkLength = $filterBox.find('.selected-filter-item').length;
      var chkClass = $filterBox.hasClass('is-filtering');
      $(this).toggleClass('is-selected');
      if (!chkClass) {
        $filterBox.addClass('is-filtering');
      }
      if (chkClass && chkLength < 1) {
        $filterBox.removeClass('is-filtering');
      }
      console.log(chkLength);
    });
  },
};
