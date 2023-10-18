// 회의실 팝업2 - 열기
$('.reserve-add,.popup-open').on('click',function(){    
    $('.layer-popup').show();
    $('.dim').show();
    console.log('aa')
});

// 회의실 팝업 - 닫기
$('.popup-close,.dim').on('click',function(){    
    $('.layer-popup').hide();
    $('.dim').hide();
});




// 캘린더형 스케줄표 레이아웃 
function celendar_reserve(){    
    // 예약 시간 레이아웃
    function reserveLayout(){
        var $place = $('.place-reserve-time');
        var hour_W = $('.celendar-list-time .time').outerHeight();
        var half = hour_W / 2;
        $place.each (function (index) {
            // 시작시간 위치 조정
            var shour = hour_W * ($place.eq(index).attr('shour') - 7);
            var starthalf = $place.eq(index).attr('shalf');
            if(starthalf == 'y'){
                $place.eq(index).css('top',shour + half);
            }else{
                $place.eq(index).css('top',shour);
            }

            // 레이아웃 크기 조정
            var hour = hour_W * $place.eq(index).attr('hour');
            var hourhalf = $place.eq(index).attr('half');
            var time = hour;

            if(hour <= hour_W){
                $place.eq(index).addClass('pd');
            }           
            if(hourhalf == 'y'){
                time = hour + half;
            }
            $place.eq(index).css('height',time);
        });
    };
     // 현재 시간 표시
     function nowTimeLine(){
        var nowTimeHr = new Date().getHours();
        var target = $('.celendar-list-time');
        var TimeLine_target = target.find('.time_'+ nowTimeHr);
        TimeLine_target.addClass('now');
    };
    reserveLayout();
    nowTimeLine();
}
celendar_reserve();

// @note 2023-04-04
$('.header-select,#header-select-clsoe').on('click',function(){
    if($('.header-select').hasClass('active')){
        $('.header-select,.header-search.select').removeClass('active');
        $('.txt-btn').show();
        $('#header-select-clsoe').hide();
    }else{
        $('.header-select,.header-search.select').addClass('active');
        $('.txt-btn').hide();
        $('#header-select-clsoe').show();
    }
});

$('.header-search.select > ul > li').on('click',function(){
    $('.header-search.select > ul > li').removeClass('on');
    $(this).addClass('on');
});


