/* 
 函数节流：在一定次数的重复操作中只按一定事件间隔执行函数，不会一直触发函数
*/

function throttle(func,interval){
    let context 
    let args 
    let previous = 0
    return function(){
      context = this
      args = arguments
      let now = new Date.getTime()
      //如果目前的时间已经过了，之前的时间那么执行函数否则return掉
        if(now - previous > interval){
          func.apply(this,args)
          previous = now
        }
    }
}
