// timePicker
$(function () {
    const timeIndex = $('.time-selt').length;
    var target;
    var targetLayer,selectHour_elmt,selectMin_elmt,selectAm_elmt;
    var minute,ampm,hour;

    // 페이지에 timepicker 갯수 구하기
    if(timeIndex >= 1){
        timePickerMake();
    }

    // 레이어 생성
    function timePickerMake(){
        
        let layerElmt ='<div class="time-select-layer">';
        layerElmt +='    <div class="select-top">',
        layerElmt +='       <div class="time-swiper-hour swiper-container">',
        layerElmt +='           <div class="swiper-wrapper time-selecter time-select-hour" id=""></div>',
        layerElmt +='       </div>',
        layerElmt +='       <div class="dot">',
        layerElmt +='            :',
        layerElmt +='       </div>',
        layerElmt +='       <div class="time-swiper-min swiper-container">',
        layerElmt +='           <div class="swiper-wrapper time-selecter time-select-min" id=""></div>',
        layerElmt +='       </div>',
        layerElmt +='       <div class="time-swiper-am swiper-container">',
        layerElmt +='           <div class="swiper-wrapper time-selecter time-select-am" id=""></div>',
        layerElmt +='       </div>',
        layerElmt +='    </div>',
        layerElmt +='    <div class="btn-bottom">',
        layerElmt +='        <button type="button" class="time-select-btn layer-close btn-border" >닫기</button>',
        layerElmt +='        <button type="button" class="time-select-btn save btn-blue" >저장</button>',
        layerElmt +='    </div>',
        layerElmt +='</div>';
        
        $('body').append(layerElmt);

        targetLayer = $('.time-select-layer');
        selectHour_elmt = targetLayer.find('.time-select-hour');
        selectMin_elmt = targetLayer.find('.time-select-min');
        selectAm_elmt = targetLayer.find('.time-select-am');
        
        // 시계 만들기 - 시
        for (var i = 1; i <= 12; i++) {
            let padded = i.toString().padStart(2, "0");
            let hour = '<div class="swiper-slide" value='+ padded +'>'+ padded +'</div>';
            selectHour_elmt.append(hour);
        };
        // 시계 만들기 - 분
        for (var i = 0; i < 60; i++) {
            let paddedMin = i.toString().padStart(2, "0");
            let min = '<div class="swiper-slide" value='+ paddedMin +'>'+ paddedMin +'</div>';
            selectMin_elmt.append(min);
        };
        // 시계 만들기 - AM,PM
        selectAm_elmt.append('<div class="swiper-slide" value="AM">AM</div><div class="swiper-slide" value="PM">PM</div>');       
        
    }

    // 레이어 위치 잡기, 열기
    $('.time-selt').on('click',function(){
        // 레이어 위치 잡기
        target = $(this);
        let layerPosition = $(this).offset();
        let layerPositionTop = layerPosition.top + $(this).height() + 10;
        if(target.hasClass('on')){
            $('.time-select-layer').hide();
            target.removeClass('on');
        }else{
            $('.time-selt').removeClass('on');
            $('.time-select-layer').css({"top":layerPositionTop, "left": layerPosition.left}).show();
            target.addClass('on');
        }        
        $('html body').css('overflow','hidden');
        swiper_ce();
        
    });

    // 레이어 저장 및 닫기
    $('.time-select-btn.save').on('click',function(){
        var selectHour = selectHour_elmt.find('.swiper-slide-active').attr('value');
        var selectMin = selectMin_elmt.find('.swiper-slide-active').attr('value');
        var selectAm = selectAm_elmt.find('.swiper-slide-active').attr('value');

        // val 값에 시간 저장
        target.find('input').val(selectHour + ':'+selectMin + ' ' +selectAm);
        target.text(selectHour + ' : '+ selectMin + ' ' + selectAm);
        target.removeClass('on');
        $('.time-select-layer').hide();
        $('html body').css('overflow','visible');
        swiper_re()
    });

    // 레이어 닫기
    $('.time-select-btn,.popup-close').on('click',function(){
        $('.time-selt').removeClass('on');
        $('.time-select-layer').hide();
        $('html body').css('overflow','visible');
        swiper_re()
    });



    function swiper_ce(){
        hour = new Swiper( '.time-swiper-hour', {
            autoHeight: true,
            slidesPerView: 3,
            freeMode: true,
            freeModeSticky: true,
            freeModeMomentumRatio: 0.5,
            freeModeVelocityRatio: 0.5,
            freeModeMinimumVelocity: 0.1,
            mousewheelControl: false,
            mousewheelSensitivity: 0.5,
            //loop: true,
            loopAdditionalSlides: 5,
            direction: 'vertical',
            slideToClickedSlide: true,
            centeredSlides: true          
        });
        minute = new Swiper( '.time-swiper-min', {
            autoHeight: true,
            slidesPerView: 3,
            freeMode: true,
            freeModeSticky: true,
            freeModeMomentumRatio: 0.5,
            freeModeVelocityRatio: 0.5,
            freeModeMinimumVelocity: 0.1,
            mousewheelControl: false,
            mousewheelSensitivity: 0.5,
            //loop: true,
            loopAdditionalSlides: 5,
            direction: 'vertical',
            slideToClickedSlide: true,
            centeredSlides: true
        });
        ampm = new Swiper( '.time-swiper-am', {
            autoHeight: true,
            pagination: '.swiper-pagination',
            slidesPerView: 3,
            freeMode: true,
            freeModeSticky: true,
            freeModeMomentumRatio: 0.25,
            freeModeVelocityRatio: 0.25,
            freeModeMinimumVelocity: 0.1,
            mousewheelControl: false,
            mousewheelSensitivity: 0.5,
            loop: false,
            loopAdditionalSlides: 5,
            direction: 'vertical',
            slideToClickedSlide: true,
            centeredSlides: true
        });
    }    
    function swiper_re(){
        hour.destroy();
        minute.destroy();
        ampm.destroy();
    }
});
