/**
 * Created by zhousg on 2017/8/1.
 */

$(function(){
  wjs_banner();
  wjs_pageList();

  $('[data-toggle="tooltip"]').tooltip();
});


var wjs_banner=function () {
  var date=[
    {
      bigUrl: "images/slide_01_2000x410.jpg",
      smallUrl: "images/slide_01_640x340.jpg"
    },
    {
      bigUrl: "images/slide_02_2000x410.jpg",
      smallUrl: "images/slide_02_640x340.jpg"
    },
    {
      bigUrl: "images/slide_03_2000x410.jpg",
      smallUrl: "images/slide_03_640x340.jpg"
    }
  ];

  var render =function () {
    var windowWidth=$(window).width();
    var isMobile=false;

    if(windowWidth<768){
      isMobile=true;
    }

    var dotHtml="";
    var imgHtml="";
    $.each(date,function (i,item) {
      dotHtml+='<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="'+(i==0?"active":"")+'"></li>';
      imgHtml+='<div class="item '+(i==0?"active":"")+'">';
      if(isMobile){
        imgHtml+='<a><img class="m_img" src="'+item.smallUrl+'"></a>';
      }else{
        imgHtml+='<a class="big" style="background-image: url('+item.bigUrl+')"></a>';
      }
      imgHtml+='</div>';
    });
    //console.log(dotHtml);
    //console.log(imgHtml);
    $(".carousel-indicators").html(dotHtml);
    $(".carousel-inner").html(imgHtml);
  };

  $(window).on("resize",function () {//
    render();
  }).trigger("resize");//刷新时先触发一次resize


  var startX=0;
  var isMove=false;
  var sum=0;

  $(".carousel-inner").on("touchstart",function (e) {
    startX=e.originalEvent.touches[0].clientX;
  }).on("touchmove",function (e) {
    var moveX=e.originalEvent.touches[0].clientX;
    sum=moveX-startX;
    isMove=true;
  }).on("touchend",function (e) {
    if(isMove){
      if(Math.abs(sum)>50){
        if(sum>0){
          $(".carousel").carousel("prev");//切换上一张
        }else{
          $(".carousel").carousel("next");//切换下一张
        }
      }
    }
  });
};


var wjs_pageList=function () {
  var ulPage=document.querySelector(".ulBox_product .nav-tabs");//css中overflow:hidden;一定要加在父盒子中
  var lis=ulPage.querySelectorAll("li");
  var wid=0;

  $.each(lis,function (i,item) {
    wid+=$(item).outerWidth(true);//注意item的获取方式
  });
  ulPage.style.width=wid+"px";
  new IScroll(".ulBox_product",{
    scrollY:false,
    scrollX:true
  });
};



