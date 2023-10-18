$(document).ready(function () {

    const ctx = document.getElementById('barChart');

    new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022'],
            datasets: [
                {
                    label: '복리후생비',
                    data: [70, 75, 90],
                    borderRadius: 3,
                    backgroundColor: '#394DC0',
                    maxBarThickness: 40,
                    datalabels: {
                        color: '#394DC0',
                    },
                },
                {
                    label: '접대비',
                    data: [30, 25, 10],
                    borderRadius: 3,
                    backgroundColor: '#FEAA12',
                    maxBarThickness: 40,
                    datalabels: {
                        color: '#FEAA12'
                    },
                },
            ]
        },
        options: {
            responsive: true,
            categoryPercentage: 0.8,  // 항목 사이 간격
            barPercentage: 1,  // 바 크기 비율
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 15,  // 범례 항목 사이 간격
                        font: {
                            family: 'Noto Sans KR',
                            size: 13,
                            weight: '400'
                        },
                        sort: function (a, b, c) {
                            return -1;  // 범례 역순 정렬
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
                        size: 14,
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
                    max: 100,
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
                        display: false,
                        stepSize: 25,
                    },
                    border: {
                        display: false,
                        dash: [4],  // 점선 간격
                    }
                }
            },
        }
    });

    $('#doughnut1').easyPieChart({
        barColor: '#394DC0',  //차트 바 색상
        trackColor: '#EEEEEE',  // 차트 트랙(기본) 색상
        scaleColor: false, // 차트 테두리 기준선 (사용 시 색상코드 입력)
        lineCap: $('#doughnut1').attr('data-percent') != 0 ? 'round' : 'button', // 차트 선 끝 모양 butt / round / square
        lineWidth: 12, // 차트 선 두께
        size: 100, // 차트 크기
        animate: 500, // 애니메이션 시간
        onStart: $.noop,
        onStop: $.noop
    });

    $('#doughnut2').easyPieChart({
        barColor: '#FD548E',  //차트 바 색상
        trackColor: '#EEEEEE',  // 차트 트랙(기본) 색상
        scaleColor: false, // 차트 테두리 기준선 (사용 시 색상코드 입력)
        lineCap: $('#doughnut2').attr('data-percent') != 0 ? 'round' : 'button', // 차트 선 끝 모양 butt / round / square
        lineWidth: 12, // 차트 선 두께
        size: 100, // 차트 크기
        animate: 500, // 애니메이션 시간
        onStart: $.noop,
        onStop: $.noop
    });


    /** 캐러셀 */
    let $slider = $('#slider');

    $slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $(".current").text('0' + i);
        $(".total").text('0' + slick.slideCount);
    });
    
    $slider.slick({
        autoplay: true,
        prevArrow : $('.prev'),		
        nextArrow : $('.next'),	
        // prevArrow : "<button type='button' class='slick-prev'>Previous</button>",		// 이전 화살표 모양 설정
        // nextArrow : "<button type='button' class='slick-next'>Next</button>",	
    });
    

});


// var $slider = $('.slider');

// if ($slider.length) {
//   var currentSlide;
//   var slidesCount;
//   var sliderCounter = document.createElement('div');
//   sliderCounter.classList.add('slider__counter');
  
//   var updateSliderCounter = function(slick, currentIndex) {
//     currentSlide = slick.slickCurrentSlide() + 1;
//     slidesCount = slick.slideCount;
//     $(sliderCounter).text(currentSlide + '/' +slidesCount)
//   };

//   $slider.on('init', function(event, slick) {
//     $slider.append(sliderCounter);
//     updateSliderCounter(slick);
//   });

//   $slider.on('afterChange', function(event, slick, currentSlide) {
//     updateSliderCounter(slick, currentSlide);
//   });

//   $slider.slick();
// }