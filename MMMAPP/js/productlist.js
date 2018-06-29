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
  var category = getSearch().category;
  var categoryid = getSearch().categoryid;
  var pageid = getSearch().pageid;
  
  // console.log(categoryid);
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getcategorybyid",
    data: {
      categoryid: categoryid
    },
    success: function(info) {
      // console.log(info);
      $(".list_nav").html(template("tpl", info));
    }
  });

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getproductlist",
      data: {
        categoryid: categoryid,
        pageid: pageid
      },
      success: function(info) {
        // console.log(info);
        $(".product_list>ul").html(template("tpl2", info));

        var pageCount = Math.ceil(info.totalCount / info.pagesize);
        var textHtml="";
        for (var i = 0; i < pageCount; i++) {
          if (pageid == i + 1) {
            textHtml  += '<option value="' + (i+1) + '" selected>' + (i+1) + '/' + pageCount + '</option>';
          } else {
            textHtml += '<option value="' + (i+1) + '">' + (i+1) + '/' + pageCount + '</option>';
          }
        }
        $("#selectPage").html(textHtml);

        $("#selectPage").on("change", function() {
          window.location.href =
            "productlist.html?categoryid=" +categoryid +"&category=" +category +"&pageid=" +$(this).val();
          $(this).attr('selected',"selected");
        });

        $(".next").off().on("click", function() {
          pageid++;
    
          if (pageid > pageCount) {
            pageid = pageCount;
          }
          location.href ="productlist.html?categoryid=" +categoryid +"&category=" + category + "&pageid=" + pageid;
        });

        

        $(".prev").on("click",function(){
          
             pageid--;
          if(pageid<=0){
            pageid=1
          }
          location.href ="productlist.html?categoryid=" +categoryid +"&category=" + category + "&pageid=" + pageid;
          
            
          
        });

      }
    });

 

    
  }
  

  // $(".prev").on("click", function() {
  //   pageid = getSearch().pageid;
  //   pageid--;
  //   if (pageid = 0) {
  //     pageid = 1;
  //   }
  //   location.href =
  //     "productlist.html?categoryid=" +
  //     categoryid +
  //     "&category=" +
  //     category +
  //     "&pageid=" +
  //     pageid;
  // });

  
});

// var textHtml = '<span>' + '<a href="productlist.html?categoryid=' + categoryid + '&category=' + category + '&pageid=' + (pageid - 1) + '">上一页</a></span>';
//       textHtml += '<span><select id="selectPage" name="select"  selected >';
//       for (var i = 0; i < pageCount; i++) {
//           if (pageid == i+1) {
//               textHtml += '<option value="' + Number(i+1) + '" selected>' + Number(i+1) + '/' + Number(pageCount) + '</option>';
//           } else {
//               textHtml += '<option value="' + Number(i+1) + '">' + Number(i+1) + '/' + Number(pageCount) + '</option>';
//           }
//       }
//       textHtml += '</select></span>'
//       textHtml += '<span><a href="productlist.html?categoryid=' + categoryid + '&category=' + $('#category').html() + '&pageid=' + (Number(pageid) + 1) + '" >下一页</a></span>'

//       $(".product_page").html(textHtml);
//       $('#selectPage').on('change', function(e) {
//         window.location.href = 'productlist.html?categoryid=' + $.getUrlParam('categoryid') + '&category=' + $('#category').html() + '&pageid='+ $(this).val();
//         $(this).attr('selected',"selected");
//     });
