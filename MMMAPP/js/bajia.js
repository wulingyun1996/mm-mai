$(function() {
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

  var categoryId = getSearch().categoryid;
  var productid =getSearch().productid;

  
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getcategorybyid",
    data: {
      categoryid: categoryId
    },
    success: function(info) {
      // console.log(info);
      $(".list_nav").html(template("tpl3",info));
    }
  });



  render();
  function render(){
    $.ajax({
      type:"get",
      url:"http://127.0.0.1:9090/api/getproduct",
      data:{
        productid:productid
      },
      success:function(info){
        console.log(info);
        $(".bajia_add").html(template("tpl",info));
        var  info=$(".product_title").data("info");
        tetx=info.slice(0,16)
        $(".text").text(tetx);
      }
    });
  }

  $.ajax({

    type:"get",
    url:"http://127.0.0.1:9090/api/getproductcom",
    data:{
      productid:productid
    },
    success:function(info){
      // console.log(info);
      $(".bajia_list ul").html(template("tpl2",info));
    }


  });

  
});
