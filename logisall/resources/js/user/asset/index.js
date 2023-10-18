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

// 체크 박스 선택
var boxes = $('.check-box.allType input[type="checkbox"]');
boxes.change(function () {    
    var boxLength = boxes.length;
    var checkName = $(this).attr('name');
    var checkName_All = $('input[id='+ checkName +'-all]');    
    var checkedLength = $('input[name='+ checkName +']:checked').length;    

    if($(this).attr('id') == checkName_All.attr('id')){
        $('input[name='+ checkName +']').prop('checked', false);
        checkName_All.prop('checked', true);        
    }else{
        if(checkedLength == 0){
            checkName_All.prop("checked", true);
        }else{
            checkName_All.prop("checked",false);
        }
    }
});

// 회의실 팝업 - 열기
$('.place-popup-open').on('click',function(){
    var $target = $(this).parents('.place');
    var $target_popup = $target.find('.place-popup');
    $(this).addClass('font-blue');
    $target_popup.show();    
});

// 회의실 팝업 - 닫기
$('.place-popup .popup-close').on('click',function(){
    $(this).parents('.place-popup').hide();    
    $(this).parents('.place').find('.font-blue').removeClass('font-blue');
});

// 회의실 팝업2 - 열기
$('.reserve-add,.popup-open').on('click',function(){    
    $('.layer-popup').show();
    $('.dim').show();
});

// 회의실 팝업 - 닫기
$('.popup-close,.dim').on('click',function(){    
    $('.layer-popup').hide();
    $('.dim').hide();
});


// 캘린더형 스케줄표 레이아웃 
/* @note 2023-03-15 */ 
function celendar_reserve(){    
    // 예약 시간 레이아웃
    function reserveLayout(){
        var $place = $('.place-reserve-time');  //일정 box
        var hour_W = $('.celendar-list-time .time').width();  //시간별 box
        var half = hour_W / 2;  //시간별box width/2
        $place.each (function (index) {
            // 시작시간 위치 조정
            var shour = hour_W * ($place.eq(index).attr('shour') -7);
            var starthalf = $place.eq(index).attr('shalf');
            if(starthalf == 'y'){
                $place.eq(index).css('left',shour + half);
            }else{
                $place.eq(index).css('left',shour);
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
            $place.eq(index).css('width',time);
        });
    };

    // 시간표 테이블 세로 라인 만들기
    function tableLine(){         
        var $target = $('.celendar-list-time .time');
        var $row = $('.celendar-list-place .place-row').length;        
        var $row_h = $('.celendar-list-place').height() + 20;
        $target.each (function (index) {
            $target.eq(index).append('<span class="line"></span>');
        });
    };

    // 현재 시간 표시
    function nowTimeLine(){
        var nowTimeHr = new Date().getHours();
        var nowTimeMin = new Date().getMinutes();
        var target = $('.celendar-list-timeline');
        var TimeLine_target = target.find('.time_'+ nowTimeHr);

        var hourLine_px = (60 * 13) ;
        var nowTime_px = (nowTimeHr - 7) * 60 + nowTimeMin;
        var nowTime_position = (nowTime_px/hourLine_px) * 100;

        var $row = $('.celendar-list-place .place-row').length;
        var $row_h = 81 * $row;

        if(nowTimeHr >= 7 && nowTimeHr <= 20){
            TimeLine_target.addClass('now');        
            target.append('<span class="nowTimeLine" style="height:'+ $row_h +'px;left:'+ nowTime_position +'%"></span>');    
        }
    };

    reserveLayout();
    tableLine();
    nowTimeLine();
}
celendar_reserve();


// 주간 스케줄표
function reserveTable_week(){
    // 예약 시간 레이아웃
    function reserveLayout(){
        var $place = $('.reserve-table .reserve');
        var hour_H = 60;
        var half = hour_H / 2;
        $place.each (function (index) {
            // 시작시간 위치 조정
            var shour = hour_H * ($place.eq(index).attr('shour') - 7);
            var starthalf = $place.eq(index).attr('shalf');
            if(starthalf == 'y'){
                $place.eq(index).css('top',shour + half );
            }else{
                $place.eq(index).css('top',shour);
            }

            // 레이아웃 크기 조정
            var hour = hour_H * $place.eq(index).attr('hour');
            var hourhalf = $place.eq(index).attr('half');
            var time = hour;

            if(hour <= hour_H){
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
        var target = $('.place-reserve-cont .time-table');
        var TimeLine_target = target.find('.time_'+ nowTimeHr);
        TimeLine_target.addClass('now');
    };
    reserveLayout();
    nowTimeLine();
}
reserveTable_week();


// 월간 스케줄표 라인 정리
$('.celendar-list-cont .week-row:first-child .none').last().addClass('last');
function reserveTable_month(){
    var target = $('.celendar-list-cont .week-row');
    var listTarget = target.find('.reserve_list');
    listTarget.each(function(index){
        var reserveLength = listTarget.eq(index).find('li').length;
        if(reserveLength >= 4){
            listTarget.eq(index).after('<span class="dotdot"></span>');
        }
    });    
    
    $('.reserve_list').on('click',function(){
        var popupTarget = $(this).parents('.box').find('.place-popup');
        $('.place-popup').hide();
        popupTarget.show();
    });
    $('.celendar-list-cont .popup-close').on('click',function(){
        var popupTarget = $(this).parents('.place-popup');
        popupTarget.hide();
    });
}
reserveTable_month();


/* @note 2023-03-06 조직도 추가 */
var list_names = [];

// 계열사 선택시 선택된 노드 정보를 받아와서 이벤트 처리하는 부분
function get_selected_menu(data) {
    var id = data.instance.get_node(data.selected).id; // COM_SYS_SN
    var parent = data.instance.get_node(data.selected).parent; // UP_COM_SYS_SN
    var nodekey = 'COM' + id; // node id 

    console.log('node id =', nodekey)
};
// select box 선택시 노드 정보를 받아와서 이벤트 처리하는 부분
function get_selected_opts(event) {
    var id = event.target.id;
    var parent = event.target.title;
    var parentId = event.target.parentElement.id

    $('.select-box').removeClass('selected');
    $('.option').css({ 'display': 'none' });

    if (parentId == 'select-options') {
        $('#select-label').text(parent);
        $('#select-input').val(id);
    } else {
        $('#popup-select-label').text(parent);
        $('#select-input').val(id);
    }

    $("#jstree").jstree("close_all");
    $('#jstree').jstree("open_node", id);
};

function get_selected_opts2(event) {
    var id = event.target.id;
    var parent = event.target.title;
    var parentId = event.target.parentElement.id

    $('.select-box').removeClass('selected');
    $('.option').css({ 'display': 'none' });

    if (parentId == 'select-options') {
        $('#select-label').text(parent);
        $('#select-input').val(id);
    } else {
        $('#popup-select-label').text(parent);
        $('#select-input').val(id);
    }

    $("#popup-jstree").jstree("close_all");
    $('#popup-jstree').jstree("open_node", id);
    let name = $("#popup-jstree").jstree().get_node(id).text;
    if (list_names.indexOf(name) == "-1") {
        let html = `<div class="list-box"><p>${name}</p> <img src="../../../../resources/svgs/Icon_Close.svg" class="delete-btn"></div>`;
        let num = $(".list-num").text();
        num++;
        $(".list-num").text(num);
        $(".middle-box-right-list").append(html);
        list_names.push(name);
    }
};


$(document).ready(function () {
    let jsoninfo = []; // json data중 jstree에 필요한 정보만 담을 배열
    let jsoninfo2 = [];
    // 데이터 바인딩하는 부분입니다. 현재는 전달받은 json data load
    $.getJSON("../../../../resources/db/group.json", function (data) {
        let menu_list = [];
        let menu_list2 = [];
        data.map(item => {
            item.lstItems.map(item2 => {
                item2.lstItems.map(item3 => {
                    item3.lstItems.map(item4 => {
                        item4.lstItems.map(item5 => {
                            if (!item5.ID.includes('USR')) {
                                const tmp5 = { text: item5.Header, id: item5.COM_SYS_SN, parent: item5.UP_COM_SYS_SN };
                                jsoninfo.push(tmp5);
                            }
                        });
                        if (!item4.ID.includes('USR')) {
                            const tmp4 = { text: item4.Header, id: item4.COM_SYS_SN, parent: item4.UP_COM_SYS_SN };
                            jsoninfo.push(tmp4);
                        }
                    });
                    if (!item3.ID.includes('USR')) {
                        const tmp3 = { text: item3.Header, id: item3.COM_SYS_SN, parent: item3.UP_COM_SYS_SN };
                        jsoninfo.push(tmp3);

                    }
                })
                if (!item2.ID.includes('USR')) {
                    const tmp2 = { text: item2.Header, id: item2.COM_SYS_SN, parent: item2.UP_COM_SYS_SN };
                    jsoninfo.push(tmp2)
                }
            })
            const tmp1 = { text: item.Header, id: item.COM_SYS_SN, parent: "#" };
            if (!item.ID.includes('USR')) {
                jsoninfo.push(tmp1)
                menu_list += "<li class=\"option-item\" id=\"" + item.COM_SYS_SN + "\" title=\"" + item.Header + "\" onclick=\"get_selected_opts(event)\">" + item.Header + "</li>";
                menu_list2 += "<li class=\"option-item\" id=\"" + item.COM_SYS_SN + "\" title=\"" + item.Header + "\" onclick=\"get_selected_opts2(event)\">" + item.Header + "</li>";
            }
        });

        // 부서 정보만 모은 배열을 객체화하여 jstree로 조직도 생성
        let aff = Object.assign(jsoninfo);
        $('#jstree').jstree({
            'core': {
                check_callback: true,
                data: aff,
                themes: { dots: false },
            },
            'checkbox': {
                "keep_selected_style": false
            },
            // dnd = drag and drop, search = 검색 옵션
            'plugins': ["dnd", "search"],
            'group': {
                'jstree-leaf': false

            },
            'search': {
                "show_only_matches": true,
                "show_only_matches_children": true,
            }
        }).bind("open_node.jstree", function (event, date) {
            let parentId = event.target;
            let temp = document.createElement('i');
            parentId.appendChild(temp)
            temp.setAttribute('src', '../../../../resources/svgs/Icon_arrowdown16.svg')
        });

        // 
        let aff2 = Object.assign(jsoninfo2);
        $('#popup-jstree').jstree({
            'core': {
                check_callback: true,
                data: aff,
                themes: { dots: false },
            },
            'checkbox': {
                "keep_selected_style": false
            },
            // dnd = drag and drop, search = 검색 옵션
            'plugins': ["dnd", "search"],
            'group': {
                'jstree-leaf': false

            },
            'search': {
                "show_only_matches": true,
                "show_only_matches_children": true,
            }
        }).bind("open_node.jstree", function (event, date) {
            let parentId = event.target;
            let temp = document.createElement('i');
            parentId.appendChild(temp)
            temp.setAttribute('src', '../../../../resources/svgs/Icon_arrowdown16.svg')
        });
        // 

        $("#jstree").append(menu_list);
        $("#popup-jstree").append(menu_list2);

        $("#select-options").append(menu_list);     //id main,popup 분리
        $("#popup-select-options").append(menu_list2);
    });
});

// jstree click handling
$('#jstree').on('select_node.jstree', function (e, data) {
    data.instance.toggle_node(data.node);
    get_selected_menu(data)
});


$(function () {
    $('#jstree').on("changed.jstree", function (e, data) {
    });
    $('button').on('click', function () {
        $('#jstree').jstree(true).select_node('child_node_1');
        $('#jstree').jstree('select_node', 'child_node_1');
        $.jstree.reference('#jstree').select_node('child_node_1');
    });
});

/* // @note 2023-03-06 조직도 추가 */