$(function(){

$.ajax({
type:"get",
url:"http://127.0.0.1:9090/api/getsitenav",
success:function(info){
  console.log(info);
  $(".sitenav_list").html(template("tpl",info));
}
});


});