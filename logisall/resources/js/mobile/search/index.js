// 탭 변경
$(document).ready(function() {
  $(".tab-title li").on('click',function() {
    var idx = $(this).index();
    $(".tab-title li").removeClass("active");
    $(".tab-title li").eq(idx).addClass("active");
    $(".tab-contents > div").hide();
    $(".tab-contents > div").eq(idx).show();
  })
});

// 팝업 열기
$('.receive-more-btn').on('click',function(){    
  $('.layer-popup').show();
  $('.dim').show();
});

// 팝업 닫기
$('.popup-close,.dim').on('click',function(){    
  $('.layer-popup').hide();
  $('.dim').hide();
});