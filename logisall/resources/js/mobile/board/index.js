
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

$('.detail-serch-btn').on('click',function(){    
    $('.layer-popup').show();
    $('.dim').show();
});

// 회의실 팝업 - 닫기
$('.popup-close,.dim').on('click',function(){    
    $('.layer-popup').hide();
    $('.dim').hide();
});



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


