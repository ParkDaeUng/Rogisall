$(document).ready(function() {
    $('#nav-open').on('click',function(){
        $('nav').addClass('active');
    });
    $('#nav-close').on('click',function(){
        $('nav').removeClass('active');
    });
});

// Nav menu DropDown End
$(document).ready(function() {
    // nav dropDown
    $('.nav-list-2nd').hide();
    $('.nav-list-1nd').click(function() {
        $('.list-2nd-item').removeClass('select');
        $('.sub-content').css({'display':'none'});
        $(this).toggleClass('select');
        $('.nav-list-1nd').not(this).removeClass('select');
        $(this).next('.nav-list-2nd').slideToggle(300);
        $('.nav-list-1nd').not(this).next('.nav-list-2nd').slideUp(300);
    });

    // nav-sub dropDown
    $('.list-2nd-item').click(function(e) {
        let viewY = window.innerHeight;
        let targetY = Math.floor(e.target.getBoundingClientRect().top);
        let popupHeight = $('.sub-content').outerHeight()


        $(this).toggleClass('select');
        $('.list-2nd-item').not(this).removeClass('select');
        if($('.list-2nd-item').hasClass('select')) {
            if((viewY - popupHeight) > (targetY + 10)) {
                $('.sub-content').css({'display':'block', 'top':targetY, 'bottom':''});
            }else { 
                $('.sub-content').css({'display':'block', 'top':'', 'bottom':viewY - targetY - 30});
            }
        }else {
            $('.sub-content').css({'display':'none'});
        }
    });

    $(document).click(function(e) {
        if (!$(e.target).closest('.list-2nd-item').length &&
            !$(e.target).closest('.sub-content').length) {
                $('.sub-content').css({'display': 'none'});
                $('.list-2nd-item').removeClass('select');
        };
    });
});

// 셀렉트 박스 클릭
$('.select-label').click(function () {
    var select_box = $(this).parents('.select-box');
    if(select_box.hasClass('selected')){
        $('.select-box').removeClass('selected');
        $('.select-box').find('.option').hide();
    }else{
        $('.select-box').removeClass('selected');
        $('.select-box').find('.option').hide();
        select_box.addClass('selected');
        select_box.find('.option').show();
    }    
});

// 셀렉트 옵션 선택
$('.option-item').click(function () {
    var select_box = $(this).parents('.select-box');
    select_box.removeClass('selected');
    select_box.find('.option').toggle();
    select_box.find('.select-label').text($(this).text());  // 라벨에 선택값 넣기
    select_box.find('#select-input').val($(this).text());  // input에 선택값 넣기
});

$('#search-open').click(function () {
    $(this).hide();
    $('#search-close').show();
    $('.header-search').addClass('active');
});
$('#search-close').click(function () {
    $(this).hide();
    $('#search-open').show();
    $('.header-search').removeClass('active');
});