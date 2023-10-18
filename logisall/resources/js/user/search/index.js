
$(function(){
    $(".cb-tab .tab-btn").click(function(){
        TabI_event = $(this).index();
        console.log(TabI_event)
        $(this).addClass("on").siblings().removeClass("on");

        if(TabI_event == 0){
            $(".cb-tab-cont .tab-board").removeClass("off");
        }else{
            TabI_event = TabI_event - 1
            console.log(TabI_event)
            $(".cb-tab-cont .tab-board").addClass("off");
            $(".cb-tab-cont .tab-board").eq(TabI_event).removeClass("off");
        }
        return false;
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
});