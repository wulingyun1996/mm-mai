
$(function(){



var pageid=getSearch().pageid || 0;


$.ajax({

  type:"get",
  url:"http://127.0.0.1:9090/api/getmoneyctrl",
  data:{
    pageid:pageid
  },
  success:function(info){
    console.log(info);
    $(".mm_product>ul").html(template("tpl",info));

    var pageCount = Math.ceil(info.totalCount / info.pagesize);
    var textHtml = "";
    for (var i = 0; i < pageCount; i++) {
      if (pageid == i) {
        textHtml += '<option value="' + (i+1) + '" selected>' + (i+1) + '/' + pageCount + '</option>';
      } else {
        textHtml += '<option value="' + (i+1) + '">' + (i+1) + '/' + pageCount + '</option>';
      }
    }
    $("#selectPage").html(textHtml);

    $("#selectPage").on("change", function() {
      window.location.href = "moneyctrl.html?pageid=" + $(this).val();
      $(this).attr('selected',"selected");
    });

    $(".next").on("click", function() {
      // console.log("1111");
      pageid++;

      if (pageid > pageCount) {
        pageid = pageCount;
      }
      location.href = "moneyctrl.html?pageid="+pageid;
    });

    

    $(".prev").on("click",function(){
         pageid--;
        if(pageid<=0){
          pageid=0;
        }
          
     
        location.href = "moneyctrl.html?pageid="+pageid;
      
    });
  }



});






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


});