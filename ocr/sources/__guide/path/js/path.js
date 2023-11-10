$(function () {
    $('#root_tree').on('click', 'a', function (e) {
        if (!e.ctrlKey) {
            //ctrlKey
            e.preventDefault();
            var href = $(this).attr('href');
            if (href != 'javascript:;') {
                $('#viewArea').find('iframe').attr('src', href);
                $('#url').val(href);
            }
        }
    });
    //filter
    $('#filter').treeListFilter('#root_tree', 200);

    $('#url').on('keypress', function (e) {
        if (e.keyCode == '13') {
            var url = $(this).val();
            $('#root_tree')
                .find('a')
                .each(function () {
                    var href = $(this).attr('href');
                    if (href == url) {
                        $(this).click();
                    }
                });
        }
    });

    $('#root_tree li').each(function () {
        var comment = $(this).children('dl').find('dd').length;
        if (comment > 0) {
            $(this).append(
                '<span class="view-comment"><i class="fa fa-plus-circle" aria-hidden="true"><span>Modify</span></i></span>',
            );
            $('.view-comment').bind('click', function () {
                $(this).hide().prev('dl').slideDown();
            });
        }
    });
    $('#root_tree a').each(function () {
        var $this = $(this);
        var url = $this.attr('href');
        if ($this.next('ul').length > 0) {
            $this.addClass('close');
        }
        if (url == 'javascript:;' || url == '') {
            $this.on('click', function () {
                var $list = $this.next('ul');
                if (!$list.is(':visible')) {
                    $list.slideDown();
                    $this.removeClass('open').addClass('close');
                } else {
                    $list.slideUp();
                    $this.removeClass('close').addClass('open');
                }
            });
        } else {
            $this.attr('title', 'Ctrl + Click : New Window');
        }
    });

    var $progressRate = $('.progress-rate');
    var $progressCurrent = $('.progress-current');
    var $progressLen = $('.progress-len');
    var progressLen = $('li[data-count]').length;
    var progressComplete = $('li.complete[data-count]').length;

    $progressLen.text(progressLen);
    $progressCurrent.text(progressComplete);
    $progressRate.text(Math.floor(progressComplete/progressLen*100) + '%');

    var $window = $(window);
    var $body = $('body');
    var windowW = $window.outerWidth();
    var breakpoint = 900;

    if ($('.view-mobile').length) {
        $('#viewArea').css({ 'background-color': '#333' });
        $('.view-mobile').resizable({
            minWidth: 320,
            maxWidth: (windowW * 3) / 4,
            handles: 'w',
            resize: function (event, ui) {
                $('.view-mobile').css('left', '0');
                $('.header, #treeArea').css(
                    'width',
                    windowW - ui.size.width + 'px',
                );
            },
        });

        var deviceList = [
            {
                name: 'Samsung S10',
                width: '412',
                height: '869',
            },
            {
                name: 'Samsung S21',
                width: '412',
                height: '915',
            },
            {
                name: 'Apple iPhone 12 Pro Max',
                width: '428',
                height: '926',
            },
            {
                name: 'Apple iPhone 12 Pro',
                width: '390',
                height: '844',
            },
            {
                name: 'Apple iPhone 11 Pro Max / XS Max / 11 / XR',
                width: '414',
                height: '896',
            },
            {
                name: 'Apple iPhone X / XS / 11 Pro',
                width: '375',
                height: '812',
            },
            {
                name: 'Apple iPhone Smallest',
                width: '320',
                height: '568',
            },
            {
                name: 'Samsung Old',
                width: '360',
                height: '640',
            },
            {
                name: 'Responsive',
                class: 'responsive',
            },
        ];
        $('.device-group').find('select').empty();
        $('.view-mobile').append(
            '<p class="annotation">미리보기 320px 에서 아이콘 BG가 정상작동하지 않습니다.</p>',
        );

        $.each(deviceList, function (i) {
            var options;
            if (deviceList[i].class != undefined) {
                options =
                    '<option class="' +
                    deviceList[i].class +
                    '"><span>' +
                    deviceList[i].name +
                    '</span></option>';
            } else {
                options =
                    '<option data-x="' +
                    deviceList[i].width +
                    '" data-y="' +
                    deviceList[i].height +
                    '"><span>' +
                    deviceList[i].name +
                    '</span></option>';
            }
            $('.device-group').find('select').append(options);
            $('.device-group').find('select').trigger('change');
        });

        $('.device-group').on('change', 'select', function () {
            var $viewArea = $('.view-area');
            var realWidth, realHeight;
            var scrollWidth = 17;
            var $selected = $(this).find('option:selected');
            var width = Number($selected.attr('data-x'));
            var height = Number($selected.attr('data-y'));
            if (!$('.macos').length) {
                realWidth = width;
                realHeight = height;
            } else {
                realWidth = width - scrollWidth;
                realHeight = height - scrollWidth;
            }

            function annotation(width) {
                if (width < 360) {
                    $('.view-mobile').find('.annotation').show();
                } else {
                    $('.view-mobile').find('.annotation').hide();
                }
            }

            $viewArea.find('span').remove();
            if (!$selected.hasClass('responsive')) {
                $viewArea
                    .css({ width: realWidth + 'px', height: realHeight + 'px' })
                    .append(
                        '<span class="x">' +
                            width +
                            '</span><span class="y">' +
                            height +
                            '</span>',
                    );
                if ($viewArea.hasClass('is-resizable'))
                    $viewArea.removeClass('is-resizable').resizable('destroy');
            } else {
                // console.log(width,height)
                $viewArea.resizable({
                    minWidth: 320,
                    minHeight: 640,
                    create: function (event, ui) {
                        width = $viewArea.width();
                        height = $viewArea.height();
                        $viewArea.addClass('is-resizable');
                    },
                    resize: function (event, ui) {
                        width = ui.size.width;
                        height = ui.size.height;
                        $viewArea.find('.x').text(width);
                        $viewArea.find('.y').text(height);
                        annotation(width);
                    },
                });
                $viewArea
                    .css({ width: realWidth + 'px', height: realHeight + 'px' })
                    .append(
                        '<span class="x">' +
                            width +
                            '</span><span class="y">' +
                            height +
                            '</span>',
                    );
            }
            annotation(width);
        });

        function mobileView(winW) {
            if (winW >= breakpoint) {
                $body.removeClass('is-mobile');
                if (sessionStorage.getItem('mobileView') == 'active') {
                    $('button.mobile-view').addClass('is-active');
                    $body.addClass('is-mobile-view');
                }
            } else {
                $body.addClass('is-mobile').removeClass('is-mobile-view');
                $('button.mobile-view').removeClass('is-active');
            }
        }
        mobileView(windowW);

        $(window).on('resize', function () {
            windowW = $(this).outerWidth();
            mobileView(windowW);
        });
    }
});
