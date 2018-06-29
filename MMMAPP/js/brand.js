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

  var brandtitleid =getSearch().brandtitleid;

  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getbrand",
    data:{
      brandtitleid:brandtitleid
    },
    success:function(info){
      // console.log(info);
      $(".brand_list ul").html(template("tpl",info));
    }
  });


  
  $.ajax({

    type:"get",
    url:"http://127.0.0.1:9090/api/getbrandproductlist",
    data:{
      brandtitleid:brandtitleid,
      pagesize:4
    },
    success:function(info){
      // console.log(info);
      $(".product_list ul").html(template("tpl2",info));
      var id =$(".product_list ul li").data("id");
     
      $.ajax({

        type:"get",
        url:"http://127.0.0.1:9090/api/getproductcom",
        data:{
          productid:id
        },
        success:function(info){
          console.log(info);
          $(".brand_comment ul").html(template("tpl3",info));


          $.ajax({
            type:"get",
            url:"http://127.0.0.1:9090/api/getproduct",
            data:{
              productid:id
            },
            success:function(info){
              console.log(info);
              $(".comment_head").html(template("tpl4",info));
            }
          });
        }
    
    
      });

      
     
   
    }

  });

  
 

  



});