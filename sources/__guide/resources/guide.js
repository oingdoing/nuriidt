var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

var escapeHtml = function (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
};

//Code Change
$('.box .flex-dl > dt').append('<pre><code>//Code</code></pre>');
$('.box .flex-dl > dd')
  .not('.guide-description')
  .each(function () {
    var desc = $(this).data('description');

    var $iframe = $(this).find('iframe');
    var $code = $(this).siblings('dt').find('code');
    if (!$iframe.length) {
      var sample = escapeHtml(String($(this).html()));
      // console.log(sample)
      $code.append(sample);
    } else {
      // var src = $iframe.attr('src');
      // var link =
      //     '<a href="' + src + '" target="_blank">소스 바로 가기</a>';
      // $code.append(link);
    }
    if (desc) $(this).prepend('<p class="g-desc">' + desc + '</p>');
  });
// .resizable({
//     maxWidth: 768, //galaxy fold open
//     minWidth: 320, //galaxy fold front
// });

$('.box').on('click', '.btn-view-source', function () {
  $(this).toggleClass('is-active');
});

$('.box:not(.fold)')
  .find('.flex-dl:not([aria-expanded=true]) > dt')
  .not('.no-code')
  .prepend('<button class="btn-view-source"><span></span></button>');
$('.box:not(.fold)')
  .find('.flex-dl[aria-expanded=true] > dt')
  .not('.no-code')
  .prepend('<button class="btn-view-source is-active"><span></span></button>');

// LEFT NAV
var $container = $('.guide-container');
if (
  !$container.find('.guide-history').length &&
  !$container.find('.guide-index').length
) {
  $container.wrapInner('<div class="guide-content"></div>');
  $container.prepend('<div class="guide-nav"><ul></ul></div>');
  $container.find('.box').each(function () {
    var title = $(this).children('h2:first-child').html();
    $('.guide-nav ul').append(
      '<li><button type="button">' + title + '</button></li>',
    );
  });
  $('.guide-nav button').find('a').remove();

  $('.guide-nav').on('click', 'button', function () {
    var idx = $(this).parent('li').index();
    var top = $('.guide-content').children('.box').eq(idx).offset().top - 83;
    $('html,body').stop().animate({ scrollTop: top }, 200);
    $(this)
      .parent('li')
      .addClass('is-active')
      .siblings('li')
      .removeClass('is-active');
  });
}

//새로운 로그 등록시
$('.gnb').find('li:eq(0)').addClass('new');

var gnb = '<ul class="gnb">';
gnb += '<li><a href="./index.html">Structure</a></li>';
gnb += '<li><a href="./components.html">Components</a></li>';
// gnb += '<li><a href="./functions.html">Functions</a></li>';
gnb += '</ul>';

$('.guide_select').append(gnb);
$('.guide_select .gnb li').each(function () {
  var linkUrl = $(this).find('a').attr('href').replace('./', '');
  var thisUrl = location.href;
  if (thisUrl.indexOf(linkUrl) > 0)
    $(this).addClass('is-active').siblings('li').removeClass('is-active');
});
