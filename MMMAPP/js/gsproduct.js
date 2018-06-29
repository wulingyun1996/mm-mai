$(function(){

  

  var shopid=0;
  var areaid=0;
  $.ajax({

    type:"get",
    url:"http://127.0.0.1:9090/api/getgsshop",
    success:function(info){
      // console.log(info);
      $(".shop ul").html(template("tpl",info));


      
    }


  });
  
  $(".shop ul").on("click","li",function(){
    var txt=$(this).text();
   
    shopid=$(this).data("shopid");
    
    $(".title_jd a span").text(txt);
    render();
    $(".shop").removeClass("on");
    $(".title_jd i").removeClass('now');
  })
  $(".title_jd").on("click",function(){

    $(".shop").toggleClass("on");

    $(".title_jd i").toggleClass('now');


  });

  $.ajax({

    type:"get",
    url:"http://127.0.0.1:9090/api/getgsshoparea",
    success:function(info){
      console.log(info);
      $(".area ul").html(template("tpl2",info));
    }


  });
  $(".area ul").on("click","li",function(){
    var tlxt=$(this).text();
    $(".second_hb a span").text(tlxt);
    areaid=$(this).data("areaid");
    render();
    $(".area").removeClass("on");
    $(".second_hb i").removeClass('now');
  });

  $(".second_hb").on("click",function(){
    $(".area").toggleClass("on");
    $(".second_hb i").toggleClass('now');

  });
  $(".three_price").on("click",function(){
    $(".price").toggleClass("on");
    $(".three_price i").toggleClass('now');

  });

  render();

function render(){
  
  $.ajax({

    type:"get",
    url:"http://127.0.0.1:9090/api/getgsproduct",
    data:{
      shopid:shopid,
      areaid:areaid
    },
    success:function(info){
      console.log(info);
      $(".list_banner ul").html(template("tpl3",info));
    }

  });

}

});