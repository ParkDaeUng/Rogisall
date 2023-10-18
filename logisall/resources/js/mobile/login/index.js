

//팝업 열기

$('.login-help').on('click',function(){    
    $('.layer-popup').show();
    $('.dim').show();
});

// 팝업 닫기
$('.popup-close,.dim').on('click',function(){    
    $('.layer-popup').hide();
    $('.dim').hide();
});



$(document).ready(function() {
    $('.password-hide').on({'click': function() {
        if ($('#password').attr('type') === "password") {
            $('#password').attr('type',"text");
            $(this).attr('src','../../../../resources/svgs/Icon_eye.svg');
        } else {
            $('#password').attr('type',"password");
            $(this).attr('src','../../../../resources/svgs/Icon_eyeslash.svg');
        };
    }});
    $('#login-form').submit(function(e) {
        // e.preventDefault();
        alert("form submit Event");

        if($('#remember').prop('checked')) {
            localStorage.setItem("id", $('#username').val());
        }else {
            localStorage.removeItem("id");
        };
    });

});