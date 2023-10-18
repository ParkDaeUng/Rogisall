// timePicker
$(function () {
    const timeIndex = $('.time-selt').length;
    var target;
    var targetLayer,selectHour_elmt,selectMin_elmt,selectAm_elmt;

    // 페이지에 timepicker 갯수 구하기
    if(timeIndex >= 1){
        timePickerMake();
    }

    // 레이어 생성
    function timePickerMake(){
        
        let layerElmt ='<div class="time-select-layer">';
        layerElmt +='    <div class="select-top">',
        layerElmt +='        <select name="time-select" class="time-selecter time-select-hour" id=""></select>',
        layerElmt +='        <select name="time-select" class="time-selecter time-select-min" id=""></select>',
        layerElmt +='        <select name="time-select" class="time-selecter time-select-am" id=""></select>',
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
            let hour = '<option value='+ padded +'>'+ padded +'</option>';
            selectHour_elmt.append(hour);
        };
        // 시계 만들기 - 분
        for (var i = 0; i < 60; i++) {
            let paddedMin = i.toString().padStart(2, "0");
            let min = '<option value='+ paddedMin +'>'+ paddedMin +'</option>';
            selectMin_elmt.append(min);
        };
        // 시계 만들기 - AM,PM
        selectAm_elmt.append('<option value="AM">AM</option><option value="PM">PM</option>');
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
    });

    // 레이어 저장 및 닫기
    $('.time-select-btn.save').on('click',function(){
        var selectHour = selectHour_elmt.val();
        var selectMin = selectMin_elmt.val();
        var selectAm = selectAm_elmt.val();

        // val 값에 시간 저장
        target.find('intup').val(selectHour + ':'+selectMin + ' ' +selectAm);
        target.text('').append('<span>'+ selectHour + ' : '+selectMin + ' ' +selectAm +'</span>');
        target.removeClass('on');
        $('.time-select-layer').hide();
    });

    // 레이어 닫기
    $('.time-select-btn').on('click',function(){
        $('.time-selt').removeClass('on');
        $('.time-select-layer').hide();
    });
});

