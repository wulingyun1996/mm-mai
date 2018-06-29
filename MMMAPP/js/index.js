$(function(){

  renderNav();

  function renderNav (){
    $.ajax({

      type:"get",
      url:"http://127.0.0.1:9090/api/getindexmenu",
      success:function(info){
        // console.log(info);
        $(".mm_nav ul").html(template("tpl",info));
      }
  
    });

    $(".mm_nav ul").on("click",".emid",function(){
      $("li:nth-child(n+9)").toggleClass("hide");
    })


  };

  renderProduct();
  function renderProduct(){

    $.ajax({

      type:"get",
      url:"http://127.0.0.1:9090/api/getmoneyctrl",
      success:function(info){
        console.log(info);
        $(".mm_product ul").html(template("tpl2",info));
      }

    });

  }


});