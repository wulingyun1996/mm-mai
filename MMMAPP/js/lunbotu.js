$(function(){

  //1. 找对象
  var box = document.querySelector(".mask_banner");
  var ul = document.querySelector(".mask_banner ul");
  var imgs = ul.children;
  var leftArr = document.querySelector(".mask_banner .arrow-left");
  var rightArr = document.querySelector(".mask_banner .arrow-right");

  //自动播放的持续时间
  var duration = 1000;



  //3. 克隆第一张的图片，添加到ul的最后面
  ul.appendChild(ul.firstElementChild.cloneNode(true));


  //4. 左右箭头功能
  //4.1 点击右箭头功能

  //count是用来记录左边出去了几张  0
  //根据count就能够确认ul的位置  - count * box.offsetWidth
  //核心变量
  var count = 0;
  rightArr.onclick = function () {

    //判断，如果是最后一张了，需要瞬间变成第一张
    if (count >= imgs.length - 1) {
      count = 0;
      ul.style.left = -count * box.offsetWidth + "px";
    }

    count++;
    //修改ul的位置
    animate2(ul, -count * box.offsetWidth);



  };


  //4.2 点击左箭头的功能
  leftArr.onclick = function () {

    //需要判断，如果是第1张，需要换成最后一张
    if (count <= 0) {
      count = imgs.length - 1;
      ul.style.left = -count * box.offsetWidth + "px";
    }

    count--;
    animate2(ul, -count * box.offsetWidth);

    
  }


 
  //5. 自动播放
  //5.1 开启一个定时器，每隔一段时间点击右箭头
  var timeId = setInterval(rightArr.onclick, duration);
  //5.2 鼠标经过box，需要清除定时器
  box.onmouseover = function () {
    clearInterval(timeId);
  }
  //5.3 鼠标离开box，需要重新开启定时器
  box.onmouseout = function () {
    timeId = setInterval(function () {
      rightArr.click();
    }, duration);
  }


  



});