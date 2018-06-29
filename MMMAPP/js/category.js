$(function(){

  render();

  function render(){
    $.ajax({

      type:"get",
      url:"http://127.0.0.1:9090/api/getcategorytitle",
      success:function(info){
        // console.log(info);
        $(".category ul").html(template("tpl",info));
      }
  
    });
  
  $(".category ul").on("click",".confim",function(){
    $(this).next().toggleClass("hide");

    var id=$(this).data("id");
    console.log(id);
    $.ajax({

      type:"get",
      url:"http://127.0.0.1:9090/api/getcategory",
      data:{
        titleid:id
      },
      success:function(info){
        console.log(info);
        $(".category ul .mune").html(template("tpl2",info));
      }

    });

  });

  }


});