$(function(){

 //用于获取地址栏中的参数
 function getSearch() {
  //1. 获取到地址栏中的key对应的值，把这个值放到搜索框中
  var search = location.search;
  //2. 地址栏会对中文进行转码
  search = decodeURI(search);
  //3. 去掉?
  search = search.slice(1);
  //4. 变成一个数组
  var arr = search.split("&");
  var obj = {};
  arr.forEach(function(e, i) {
    var k = e.split("=")[0];
    var v = e.split("=")[1];
    obj[k] = v;
  });
  return obj;
}
var titleid =getSearch().titleid || 0;

$.ajax({

  type:"get",
  url:"http://127.0.0.1:9090/api/getbaicaijiatitle",
  success:function(info){
    // console.log(info);
    $(".bcj_list>ul").html(template("tpl",info));

    var ul =document.querySelector(".bcj_list>ul");

    var lis = ul.querySelectorAll("li");

    ul.style.width = lis[0].offsetWidth * lis.length +90 +"px";


    //传的是父元素的选择器
    new IScroll(".bcj_list", {
      scrollY:false,//禁用垂直滚动
      scrollX:true//启动水平滚动
    });
    var titleLi = $('.bcj_list>ul li');
    $(titleLi[titleid || 0]).addClass('now');
  }





});



$.ajax({
  type:"get",
  url:"http://127.0.0.1:9090/api/getbaicaijiaproduct",
  data:{
    titleid:titleid
  },
  success:function(info){
    console.log(info);


    $(".bcj_product ul").html(template("tpl2",info));
  }
})





});