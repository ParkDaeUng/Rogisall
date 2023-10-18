//datePicker
$(function () {
    // ############## datePicker 원본 ##############
    // $('.datepicker-multi').daterangepicker({
    //     "locale": {
    //         "format": "YYYY-MM-DD",
    //         "separator": " ~ ",
    //         "applyLabel": "저장",
    //         "cancelLabel": "닫기",
    //         "fromLabel": "From",
    //         "toLabel": "To",
    //         "customRangeLabel": "Custom",
    //         "weekLabel": "W",
    //         "daysOfWeek": ["<span color='#FF0000'>일</span>", "월", "화", "수", "목", "금", "토"],
    //         "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    //         "firstDay": 1
    //     },
    //     "drops": "down",
    //     "autoApply": false,
    // }, function (start, end, label) {    
    // });

    // @note 2023-06-12
    // @note 2023-06-14
    // ############## datePicker 수정본 ##############
    var startDatePicker = $('.start-datepicker');
    var endDatePicker = $('.end-datepicker');
    var today = moment().format('YYYY-MM-DD'); // 오늘 날짜를 가져옴
  
    var startPicker = $('#user-input-start');
    var endPicker = $('#user-input-end');
  
    startPicker.attr('placeholder', today);
    endPicker.attr('placeholder', today);
  
    var startDateRangePicker = startDatePicker.daterangepicker({
      "locale": {
        "format": "YYYY-MM-DD",
        "separator": " ~ ",
        "applyLabel": "저장",
        "cancelLabel": "닫기",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": ["<span color='#FF0000'>일</span>", "월", "화", "수", "목", "금", "토"],
        "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        "firstDay": 1
        },
        singleDatePicker: true,
        "drops": "down",
        "opens": "center",
        "autoApply": false,
    }, function(start) {
        var formattedStartDate = start.format('YYYY-MM-DD');
        startPicker.val(formattedStartDate);
    });

    var endDateRangePicker = endDatePicker.daterangepicker({
        "locale": {
          "format": "YYYY-MM-DD",
          "separator": " ~ ",
          "applyLabel": "저장",
          "cancelLabel": "닫기",
          "fromLabel": "From",
          "toLabel": "To",
          "customRangeLabel": "Custom",
          "weekLabel": "W",
          "daysOfWeek": ["<span color='#FF0000'>일</span>", "월", "화", "수", "목", "금", "토"],
          "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
          "firstDay": 1
        },
        singleDatePicker: true,
        "drops": "down",
        "opens": "left",
        "autoApply": false,
    }, function(start) {
        var formattedEndDate = start.format('YYYY-MM-DD');
        endPicker.val(formattedEndDate);
    });

    startDatePicker.eq(0).on('apply.daterangepicker', function(ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        startPicker.val(startDate);
    });

    endDatePicker.eq(0).on('apply.daterangepicker', function(ev, picker) {
        var endDate = picker.endDate.format('YYYY-MM-DD');
        endPicker.val(endDate);
    });

    startPicker.on('focusout', function() {
        var startDate = $(this).val();
        var formattedStartDate = moment(startDate, 'YYYYMMDD').format('YYYY-MM-DD');
        
        if (startDate === '') {
            startDateRangePicker.data('daterangepicker').setStartDate(today);
            startDateRangePicker.data('daterangepicker').setEndDate(today);
            $(this).val(today);
        } else if (!moment(startDate, 'YYYY-MM-DD').isValid()) {
            startDateRangePicker.data('daterangepicker').setStartDate(today);
            startDateRangePicker.data('daterangepicker').setEndDate(today);
            $(this).val(today);
        } else {
            startDateRangePicker.data('daterangepicker').setStartDate(formattedStartDate);
            startDateRangePicker.data('daterangepicker').setEndDate(formattedStartDate);
            $(this).val(formattedStartDate);
        }
    });

    endPicker.on('focusout', function() {
        var endDate = $(this).val();
        var formattedEndDate = moment(endDate, 'YYYYMMDD').format('YYYY-MM-DD');
        var startDate = startPicker.val();

        if (endDate === '') {
            endDateRangePicker.data('daterangepicker').setStartDate(today);
            endDateRangePicker.data('daterangepicker').setEndDate(today);
        } else if (!moment(endDate, 'YYYY-MM-DD').isValid()) {
            endDateRangePicker.data('daterangepicker').setStartDate(today);
            endDateRangePicker.data('daterangepicker').setEndDate(today);
            $(this).val(today);
        } else {
            endDateRangePicker.data('daterangepicker').setStartDate(formattedEndDate);
            endDateRangePicker.data('daterangepicker').setEndDate(formattedEndDate);
            $(this).val(formattedEndDate);
        }
    });
  
    $('#user-input-start, #user-input-end').on('input', function() {
        var userInputStartDate = $('#user-input-start').val();
        var userInputEndDate = $('#user-input-end').val();
    
        var calculatedStartDate = moment(userInputStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
        var calculatedEndDate = moment(userInputEndDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
  
        if ( calculatedStartDate && calculatedEndDate && calculatedEndDate !== 'Invalid date') {
            startDateRangePicker.data('daterangepicker').setStartDate(calculatedStartDate);
            endDateRangePicker.data('daterangepicker').setEndDate(calculatedEndDate);
        }
    });

    startPicker.on('input', function() {
        var startDate = $(this).val();
        
        if (startDate === '') {
            startDateRangePicker.data('daterangepicker').setStartDate(today);
        } else if (!moment(startDate, 'YYYY-MM-DD').isValid()) {
            startDateRangePicker.data('daterangepicker').setStartDate(today);
        } else {
            startDateRangePicker.data('daterangepicker').setStartDate(moment(startDate, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        }
    });
      
    endPicker.on('input', function() {
        var endDate = $(this).val();
        
        if (endDate === '') {
            endDateRangePicker.data('daterangepicker').setEndDate(today);
        } else if (!moment(endDate, 'YYYYMMDD').isValid()) {
            endDateRangePicker.data('daterangepicker').setEndDate(today);
        } else {
            endDateRangePicker.data('daterangepicker').setEndDate(endDate);
        }
    });
  
    // 문자 및 특수기호 입력 방지
    $('#user-input-start, #user-input-end').on('input', function() {
        var value = $(this).val();
        var sanitizedValue = value.replace(/[^0-9\-]/g, ''); // 숫자와 "-"(대시)만 허용
        $(this).val(sanitizedValue);
    });


    $('.datepicker-single').daterangepicker({
        locale: {            
            "format": "YYYY-MM-DD",
            "separator": " ~ ",
            "applyLabel": "저장",
            "cancelLabel": "닫기",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": ["<span color='#FF0000'>일</span>", "월", "화", "수", "목", "금", "토"],
            "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            "firstDay": 1
        },        
        singleDatePicker: true,
        "drops": "down",
        "autoApply": false,
    }, function (start, end, label) {
    });

    // @note 2023-04-21
    $('.datepicker-single-up').daterangepicker({
        locale: {            
            "format": "YYYY-MM-DD",
            "separator": " ~ ",
            "applyLabel": "저장",
            "cancelLabel": "닫기",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": ["<span color='#FF0000'>일</span>", "월", "화", "수", "목", "금", "토"],
            "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            "firstDay": 1
        },        
        singleDatePicker: true,
        "drops": "up",
        "autoApply": false,
    }, function (start, end, label) {
    });
});


