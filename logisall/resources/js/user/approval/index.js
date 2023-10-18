$(function() {
    // 탭 이동
    $(".sign-tab .tab-btn").click(function(){

        TabIndex = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".search-board").eq(TabIndex).addClass("on").siblings().removeClass("on");
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
    // 차트
    const ctx = document.getElementById('barChart');   
    const legendMargin = {
        beforeInit: function (chart) {
          const originalFit = chart.legend.fit

          chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)()
            this.height += 25 // Change the height
          }
        }
      }
    new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: ['월(2일)', '화(3일)', '수(4일)','목(5일)','금(6일)','토(7일)','일(8일)'],
            datasets: [
                {
                    label: '인트라넷',
                    data: [20, 25, 30, 10, 20, 12, 35],
                    borderRadius: 3,
                    backgroundColor: '#0093C1',
                    maxBarThickness: 10,
                    datalabels: {
                        color: '#0093C1',
                    },
                },
                {
                    label: 'KPP',
                    data: [40, 45, 10, 50, 30, 45, 10],
                    borderRadius: 3,
                    backgroundColor: '#7389DD',
                    maxBarThickness: 10,
                    datalabels: {
                        color: '#7389DD'
                    },
                },
                {
                    label: 'KCP',
                    data: [15, 5, 18, 30, 25, 10, 25],
                    borderRadius: 3,
                    backgroundColor: '#146ECF',
                    maxBarThickness: 10,
                    datalabels: {
                        color: '#146ECF'
                    },
                },
                {
                    label: 'NAMS',
                    data: [20, 45, 30, 25, 10, 30, 10],
                    borderRadius: 3,
                    backgroundColor: '#0E9CFF',
                    maxBarThickness: 10,
                    datalabels: {
                        color: '#0E9CFF'
                    },
                },
                {
                    label: 'KPN',
                    data: [30, 5, 7, 25, 30, 50, 20],
                    borderRadius: 3,
                    backgroundColor: '#394DC0',
                    maxBarThickness: 10,
                    datalabels: {
                        color: '#394DC0'
                    },
                },
            ]
        },
        options: {
            responsive: true,
            categoryPercentage: 0.5,  // 항목 사이 간격
            barPercentage: 1,  // 바 크기 비율
            plugins:{
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        padding: 20,  // 범례 항목 사이 간격
                        font: {
                            family: 'Noto Sans KR',
                            size: 13,
                            weight: '400'
                        },
                        sort: function (a, b, c) {
                            return 1;  // 범례 역순 정렬
                        }
                    }
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {  // 데이터 라벨 공통
                    anchor: 'end',
                    align: 270,
                    font: {
                        family: 'Noto Sans',
                        size: 0,
                        weight: '400'
                    },
                    formatter: function (value, context) {
                        return value + '%'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR',
                            size: 13,
                            color: '#888888',
                            weight: 400,
                            lineHeight: 1
                        },
                    },
                    border: {
                        display: false
                    }

                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 50,
                    title: {
                        align: 'center'
                        // display: false,
                    },
                    grid: {
                        drawTicks: false,  // 그리드 시작점 틱 표시
                        color: '#CCCCCC',
                        lineWidth: 1,
                    },
                    ticks: {
                        display: true,
                        stepSize: 10,
                        font:{
                            family: 'Noto Sans KR',
                            size: 13,
                            color: '#777777',
                            weight: 400,
                            lineHeight: 1
                        }
                    },
                    border: {
                        display: false,
                        dash: [4],  // 점선 간격
                    }
                }
            },
        },
        plugins:[legendMargin]
    });

    // 레이어 팝업 - 열기
    $('.reserve-add,.popup-open').on('click',function(){    
        $('.layer-popup').show();
        $('.dim').show();
    });

    // 레이어 팝업 - 닫기
    $('.popup-close,.dim').on('click',function(){    
        $('.layer-popup').hide();
        $('.dim').hide();
    });

    // @note 2023-03-06 - 메인페이지 미결재 오픈 스크립트
    $('.cont-left').on('click',function(){
        var targetParent = $(this).parent();
        $('.box-cont').removeClass('active');
        $(this).parent().addClass('active');
    });    
});

/* @note 2023-03-10 조직도 추가 */
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