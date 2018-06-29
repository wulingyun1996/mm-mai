/**
 * Created by HUCC on 2018/4/27.
 */
function animate(element, target, num) {

  num = num || 40;
  clearInterval(element.timeId);
  element.timeId = setInterval(function () {
    var current = element.offsetLeft;//当前位置
    var step = current < target ? num : -num;

    if (Math.abs(current - target) >= Math.abs(step)) {
      current += step;
      element.style.left = current + "px";
    } else {
      clearInterval(element.timeId);
      element.style.left = target + "px";
    }
  }, 15);

}


//需求：让任意元素能够运动到任意位置  要求：速度变化的
function animate2(element, target) {
  //1. 开启定时器
  //2. 获取当前的位置，计算step
  clearInterval(element.timeId);
  element.timeId = setInterval(function () {
    var current = element.offsetLeft;
    var step = (target - current) / 10;
    //当step>0,对step向上取整,否则向下，保证至少走1px
    step = step > 0 ? Math.ceil(step) : Math.floor(step);

    current += step;
    element.style.left = current + "px";

    if (current == target) {
      clearInterval(element.timeId);
    }
    //console.log("代码还在执行吗");

  }, 15);
}

