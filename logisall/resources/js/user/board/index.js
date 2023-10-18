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
    console.log('aa');
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


// 상세검색 열기
$('.content-search .search-open-btn').on('click',function(){    
    $('.board-search-detail').show();
    $('.content-search .btn-box').hide();
    $('.content-search-row').addClass('on');        
});

// 상세검색 닫기
$('.content-search .search-close-btn').on('click',function(){    
    $('.board-search-detail').hide();
    $('.content-search .btn-box').show();
    $('.content-search-row').removeClass('on');        
});

//팝업 열기

$('.appoint-btn').on('click',function(){    
    $('.layer-popup').show();
    $('.dim').show();
});

// 회의실 팝업 - 닫기
$('.popup-close,.dim').on('click',function(){    
    $('.layer-popup').hide();
    $('.dim').hide();
});


/*
$(".sign-tab.defult-list .tab-btn").click(function(){

    TabIndex = $(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".sign-tab-cont.defult-tb .tab-board").eq(TabIndex).addClass("on").siblings().removeClass("on");
    return false;
});



$(".sign-tab.media-list .tab-btn").click(function(){
    TabI_event = $(this).index();
    console.log(TabI_event)
    $(this).addClass("on").siblings().removeClass("on");

    if(TabI_event == 0){
        $(".sign-tab-cont.media .tab-board").removeClass("off");
    }else{
        TabI_event = TabI_event - 1
        console.log(TabI_event)
        $(".sign-tab-cont.media .tab-board").addClass("off");
        $(".sign-tab-cont.media .tab-board").eq(TabI_event).removeClass("off");
    }
    return false;
});
*/


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