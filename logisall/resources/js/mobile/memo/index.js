//팝업 열기

$('.popup-open').on('click',function(){    
    $('.layer-popup').show();
    $('.dim').show();
});

// 팝업 닫기
$('.popup-close,.dim').on('click',function(){    
    $('.layer-popup').hide();
    $('.dim').hide();
});

