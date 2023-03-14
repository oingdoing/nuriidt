"use strict";

var $body = $('body');
var $nav = $('.app-nav');
var $tooltip = $('.tooltip-wrap');
$(function () {
  navFunction.set();
  tooltipAction.set();
  ocrAction.set();
  pgJahyung.set();
});
var navFunction = {
  set: function set() {
    navFunction.open();
  },
  open: function open() {
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
  }
};
var tooltipAction = {
  set: function set() {
    tooltipAction.active();
  },
  active: function active() {
    $tooltip
    // 열기
    .on('click', '.tooltip-button__open', function () {
      $(this).closest('.tooltip-wrap').addClass('is-active');
    })
    // 닫기
    .on('click', '.tooltip-button__close', function () {
      $(this).closest('.tooltip-wrap').removeClass('is-active');
    }).on('click', '.btn-close', function () {
      $(this).closest('.tooltip-wrap').removeClass('is-active');
    });
  }
};
var ocrAction = {
  set: function set() {
    ocrAction.imgUpload();
  },
  imgUpload: function imgUpload() {
    var $ocrUpload = $('.ocr-img');
    $ocrUpload.on('click', '.button-ocr-upload', function () {
      $(this).closest('.ocr-img').find('#ocrImgUpload').trigger('click');
    });
  }
};
var pgJahyung = {
  set: function set() {
    pgJahyung.filter();
  },
  filter: function filter() {
    var $filter = $('.charactor-list');
    var $filterBox = $filter.find('.charactor-list__filter');
    var $filterItem = $filter.find('.charactor-list__items');
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
  }
};
//# sourceMappingURL=maps/ui.js.map
