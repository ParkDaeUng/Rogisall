
<!DOCTYPE html>
<head>
    <title>LogiWorks</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<%=ROOT%>/resources/css/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
    <link href="../.././../../resources/css/common.css" rel="stylesheet" type="text/css">
    <link href="../.././../../resources/css/group.css" rel="stylesheet" type="text/css">
    <script src="/logiworks/resources/js/user/login/index.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

</head>
<body>
    <c:import url="../../common/header.jsp"></c:import>
    <!-- <%@ include file="/WEB-INF/jsp/common/nav.jsp" %> -->
    <main>
        <div class="group-wrapper">
            <section class="routes">
                <img src="../../../../resources/svgs/home2.svg">
                <ul>
                    <li>Breadcrumbs link</li>
                    <li><img src="../../../../resources/svgs/arrowright2.svg"/> Breadcrumbs link2</li>
                    <li><img src="../../../../resources/svgs/arrowright2.svg"/>Breadcrumbs link3</li>
                </ul>
            </section>
            <section class="group-head">
                <h1 class="title">조직도</h1>
                <div class="right-btn">
                    <button type="button">부서추가</button>
                    <button type="button">사원등록</button>
                </div>
            </section>
            <section class="group-content">
                <!-- json data 처리 부분 -->
                <div class="tree-list-top">
                    <div class="select-aff">
                        <select id="select-options">
                            <option value="" disabled selected>계열사 선택</option>
                        </select>
                        <img src="../../../../resources/svgs/Icon_arrowdown2.svg" />
                    </div>
                    <div class="search">
                        <input type="text" placeholder="부서 검색"/>
                        <img src="../../../../resources/svgs/Icon_search.svg" alt="search"/>
                    </div>
                </div>
                <div class="tree-list-bottom" id="jstree">
                    <ul class="menu-list">
                    </ul>
                </div>
                <div class="group-user" id="COM1477">
                    <div class="userlist-top">
                        <h4>사원정보 <p>13</p>명</h4> 
                        <div class="search"><input type="text" placeholder="담당자를 검색해주세요"/><img src="../../../../resources/svgs/Icon_search.svg" alt="search"/></div>
                    </div>
                    <div class="userlist-bottom">
                        <ul>
                            <li class="user-card" name="USR2135" style="width:325px; height:216px; background-color: aqua;">
                                <div class="card-top"></div>
                                <div class="card-middle"></div>
                                <div class="card-bottom">
                                    
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </main>
    <!-- jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>
    <!-- jsTree -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
    <!-- <script src="../../../../resources/js/user/group/index.js"></script> -->
     <script>
        $(document).ready(function(){
            $.getJSON("../../../../resources/db/group.json",function(data){
                // json 객체 담기
                let menu_list=[];
                let menu_list_info=[];
                let select_list="";

                $.each(data,function(key,value){
                    if(value.UP_COM_SYS_SN==="1" && value.CTG==="C") {
                        menu_list[key]=value.Header+"<img src=\"../../../../resources/svgs/Icon_arrowdownx16 (1).svg\">";
                        select_list+="<option id="+value.id+">"+value.Header+"</option>";
                    }
                    
                    menu_list_info[key]=({'name' : value.Header,'nodekey':value.ID, 'parent':value.UP_COM_SYS_SN,'child':value.COM_SYS_SN, 'isPerson':value.CTG});
                });
                $('#jstree').jstree({
                'core' : {
                    check_callback: true,
                        data : menu_list ,
                        themes: {icons:false, dots:false},
                        children: [
                        { 'text' : 'Child 1' },
                        'Child 2'
                        ]
                },
                'checkbox' : {
                    "keep_selected_style" : false
                },
                'plugins' : ["dnd","types","search"],
		        'type' : false
            });
                // $("#jstree").append(menu_list);
                $("#select-options").append(select_list);
            });
        });
        $(function () { 
            // $('#jstree').jstree(); 
            $('#jstree').on("changed.jstree", function (e, data) {
            });
            $('button').on('click', function () {
            $('#jstree').jstree(true).select_node('child_node_1');
            $('#jstree').jstree('select_node', 'child_node_1');
            $.jstree.reference('#jstree').select_node('child_node_1');
            });
        });
    </script>
   
</body>
</html>
