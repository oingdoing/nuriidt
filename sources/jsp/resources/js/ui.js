let $body = $('body');
let $nav = $('.app-nav');
let $tooltip = $('.tooltip-wrap');
let $appLayered = $('.app-layered');

$(function () {
  navFunction.set();
  tooltipAction.set();
  ocrAction.set();
  pgJahyung.set();
});

$(document).on('click', '.js_layered-close', function () {
  gfn_layered.close();
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
      } else {
        if (chkClass && chkLength < 1) {
          $filterBox.removeClass('is-filtering');
        }
      }
      console.log(chkLength);
    });
  },
};

const gfn_layered = {
  open: function (layeredName) {
    //markup에 레이어가 없을때
    if (!$(`.js_layered[data-layered-name=${layeredName}]`).length) {
      console.log(`"${layeredName}"라는 이름의 팝업은 없습니다.`);
      return false;
    }
    $('.js_layered')
      .each(function (i) {
        let $this = $(this);
        if ($this.data('layered-name') == layeredName) {
          $this.addClass('is-active');
        } else {
          //layer 이름이 같지 않으면 닫기
          $(this).removeClass('is-active');
        }
      })
      .promise()
      .done(function () {
        gfn_layered.wrap();
      });
  },
  wrap: function () {
    //열려있는 레이어가 있는지 체크
    if ($('.js_layered.is-active').length > 0) {
      // gfn_body.fix();
      $appLayered.addClass('is-active').scrollTop(0);
    } else {
      // gfn_body.loose();
      $appLayered.removeClass('is-active');
    }
  },

  //레이이닫기
  close: function (layeredName) {
    //지정된 레이어이름이 있는 경우
    if (layeredName) {
      $('.js_layered')
        .each(function (i) {
          if ($(this).data('layered-name') == layeredName) {
            $(this).removeClass('is-active');
          }
        })
        .promise()
        .done(function () {
          gfn_layered.wrap();
        });
    }
    //지정된 레이어이름이 없는 경우 전체 닫기
    else {
      $appLayered
        .removeClass('is-active')
        .find('.is-active')
        .removeClass('is-active');
      gfn_layered.wrap();
    }
  },
};
