$(function()
{
    
    //aos
    AOS.init();

    //gnb 탭메뉴 따라서 스크롤바 이동
    $(".gnb li").click(function(e){
        let c = 0;
        e.preventDefault();
        //클릭한 동그라미 버튼 순서값
        c = $(this).index();
        //스크롤바 이동 animate() 스크롤바 움직임 초수제어도 가능
        //컨테이너 안에 섹션들 시작 위치값 알아내기 - > offset().top 위 offset().left 왼쪽
        let movePoint = $(".sec").eq(c).offset().top;
        //animate 안에서 scrollTop (스크롤바 위치값)으로 접근
        $("html,body").stop().animate({"scrollTop":movePoint},2000);
    });

    //햄버거 메뉴 클릭시 모바일 메뉴 등장
    $(".ham").click(function(e)
    {
        e.preventDefault();
        $(".m_menu").animate({"right":0},500);
    });

     //X버튼 클릭시 모바일 메뉴 사라짐
     $(".m_close_btn").click(function(e)
     {
         e.preventDefault();
         $(".m_menu").animate({"right":"-300px"},500);
     });

    //모바일 gnb 메뉴 클릭시 스크롤바 이동
    $(".m_gnb li").click(function(e){
        let f = 0;
        e.preventDefault();
        //>>표시되는 클래스 제거
        $(".m_gnb li").removeClass("on");
        //클릭한 모바일 gnb li 버튼 순서값
        f = $(this).index();
        //무브포인트 c랑 f 따로
        //컨테이너 안에 섹션들 시작 위치값 알아내기 - > offset().top 위 offset().left 왼쪽
        let movePoint = $(".sec").eq(f).offset().top;
        //animate 안에서 scrollTop (스크롤바 위치값)으로 접근
        $("html,body").stop().animate({"scrollTop":movePoint},2000);
        //gnb 메뉴들 클래스 제거
        $(".gnb li").removeClass("on");
        //해당 gnb 클래스 on 추가
        $(".gnb li").eq(f).addClass("on");
        //클릭한 모바일 메뉴 li에 >> 표시 추가
        $(this).addClass("on");
    }); 

    //스크롤 이벤트
    $(window).scroll(function(){
        //스크롤바 위치값 알아내는 방법
        let scTop = $(this).scrollTop(); //스크롤바 위치값 받아내는 window.scrollY;랑 동일
        
        //스크롤바의 위치가 두번째 구역쯤 도달했을 때 header가 fixed로 따라온다!
        let sec2 = $("#cont2").offset().top;
        $(".gnb li").removeClass("on");
        if(scTop >= sec2 - 35)
        {
            $("#header").addClass("fixed");
        }
        else
        {
            $("#header").removeClass("fixed");
        }
        //각 구역 도달했을 때 헤더 gnb에 클래스 추가되는 기능 작업
        if(scTop >= $("#cont1").offset().top-90)
        {
            $(".gnb li").removeClass("on");
            $(".gnb li").eq(0).addClass("on");    
        }
        if(scTop >= $("#cont2").offset().top-90)
        {
            $(".gnb li").removeClass("on");
            $(".gnb li").eq(1).addClass("on");    
        }
        if(scTop >= $("#cont3").offset().top-90)
        {
            $(".gnb li").removeClass("on");
            $(".gnb li").eq(2).addClass("on");    
        }
        if(scTop >= $("#cont6").offset().top-90)
        {
            $(".gnb li").removeClass("on");
            $(".gnb li").eq(3).addClass("on");    
        }
    });

    //cont3 카운트 작업
    let CountArray = [333,1000,10000,99999,777];

    for(let i = 0; i < CountArray.length; i++)
    {
        autoCount(CountArray[i],i);
    }
    //카운트 기능이 들어가는 함수 명령어
    function autoCount(limit,index)
    {
        //증가할 숫자 변수
        let start = 0;
        //start가 증가하도록 처리
        let plus = setInterval(function(){
            start += 1; //10씩 증가
            //숫자가 증가해서 상한선 숫자보다 크거나 같을 때 멈춤
            if(start >= limit)
            {
                clearInterval(plus);

                $(".count_box").eq(index).children(".count").text(limit);
            }
            else //계속 숫자 증가하는 상태
            {
                $(".count_box").eq(index).children(".count").text(start);
            }
        },10);
    }

    //cont4의 이미지들 isotope
    $(".select_img_wrap").isotope({
        //options
        itemSelector : '.art',
        layoutMode : 'masonry',
        transitionDuration : '1.5s' 
    });
    //버튼 클릭시 정렬 기능 수행
    $(".select_tab li").click(function(){
        //버튼 클릭시 해당 버튼의 data-filter값 가져옴
        let sorting = $(this).attr("data-filter");
        //정렬기능 수행
        $(".select_img_wrap").isotope({filter : sorting});
        //정렬 버튼 눌렀을 때 li에 on클래스 추가/제거 작업
        $(".select_tab li").removeClass("on");
        $(this).addClass("on");
    });

    //cont4 프로필 누르면 슬라이더 넘어가는 작업
    let d = 0;
    $(".mini_wrap > li").click(function(e){
        e.preventDefault();
        d = $(this).attr("data-index");
        $(".mini_wrap > li").removeClass("on");
        $(this).addClass("on");
        $(".slider .wrap").stop().animate({"margin-left":-100*d + "%"},1000);
    });

    //인풋 폼 공백 검증
    
    $(".submit_btn").click(function(e)
    {
        //위로 올라가는 거 방지
        e.preventDefault();  validation
            //input,textarea 태그들 합쳐서 input이라고 지정
            let input = $("form input, form textarea");
            //error클래스 제거
            input.removeClass("error");
    
            validation("name");
            validation("email");
            validation("contact_nc");
            validation("subject");
            validation("message");
    
            //error가 붙은 name이 있는 경우 경고창 표시
            if ($('[name].error').length){
                alert("필수 입력값을 모두 입력해주세요.");
                return false;
            }
            else
            {
                alert("등록 성공");
                return false;
            }
    
        function validation(typing)
        {
            //name값 달라도 같은 동작 수행하도록 selector로 설정
            let Selector = $("[name="+typing+"]");
            //공백인 경우 error클래스 추가 밑 placeholder내용 변경
            if (Selector.val() == "")
            {
                Selector.attr("placeholder","필수 입력값입니다.").addClass("error");
            }
        }
    });
        

});




