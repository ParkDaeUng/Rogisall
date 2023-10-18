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
    // 셀렉트 박스 클릭
    $('.select-label').click(function () {
        if ($(this).attr('id') == 'select-label') {
            $('#select-box').toggleClass('selected');
            $('#select-options').toggle();
        } else {
            $('#popup-select-box').toggleClass('selected');
            $('#popup-select-options').toggle();
        }
        // $('.select-box').toggleClass('selected');   //테두리 파란색 클래스 추가삭제
        // $('.option').toggle();  //옵션트리 리스트 on off
    });

    // 셀렉트 옵션 선택
    $('.option-item').click(function () {
        $('.select-box').removeClass('selected');
        $('.option').toggle();
        // $('.option').css({'display':'none'});
        $('.select-label').text(this.id);  // 라벨에 선택값 넣기
        $('#select-input').val(this.id);  // input에 선택값 넣기
    });

    // 사원정보 팝업 open 이벤트
    $('.user-card').click(function () {
        // $('.popup-wrapper').css({'display': 'block'});
        $('#user-info').css({ 'display': 'block' });
    });

    // 조직도 팝업 open 이벤트
    $('#btn-add-dept').click(function () {
        $('#add-dept').css({ 'display': 'block' });
    });

    // 팝업 close 이벤트
    $('.close-btn').click(function () {
        // $('.popup-wrapper').css({'display': 'none'});
        $(this).parent().parent().css("display", "none");
    });
    $('.popup-wrapper').click(function (e) {
        if (this == e.target) {
            $('.popup-wrapper').css({ 'display': 'none' });
        };
    });


});

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

// popup jstree
$('#popup-jstree').on('select_node.jstree', function (e, data) {
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

// popup jstree
$(function () {
    $('#popup-jstree').on("changed.jstree", function (e, data) {
    });
    $('button').on('click', function () {
        $('#popup-jstree').jstree(true).select_node('child_node_1');
        $('#popup-jstree').jstree('select_node', 'child_node_1');
        $.jstree.reference('#popup-jstree').select_node('child_node_1');
    });
    $(document)
        .on("click", ".delete-btn", function (e) {
            let name = $(this).parent().text();
            let number = list_names.indexOf(name);
            list_names.splice(number, '1');
            $(this).parent().remove();
            let num = $(".list-num").text();
            num--;
            $(".list-num").text(num);
        })
        .on("click", ".middle-box-left .jstree-node", function () {
            let name = $(this).children(".jstree-anchor").text();
            if (list_names.indexOf(name) == "-1") {
                let html = `<div class="list-box"><p>${name}</p> <img src="../../../../resources/svgs/Icon_Close.svg" class="delete-btn"></div>`;
                let num = $(".list-num").text();
                num++;
                $(".list-num").text(num);
                $(".middle-box-right-list").append(html);
                list_names.push(name);
            }
        })
    $(".reset-btn").click(function () {
        $(".list-num").text(0);
        $(".middle-box-right-list").html("");
        list_names = [];
    })


});