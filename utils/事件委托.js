function listen(element,eventType,selector,func){
  element.addEventListener(eventType,(e)=>{
    //获取触发事件的元素
    let el = e.target 
    //如果触发元素不是要监听的目标元素
    while(!el.matches(selector)){
      //是否已经是委托的父元素,是的话说明元素内部没有这个selector,设置为null,不触发事件,退出循环
      if(element === el){
        el = null
        break
      }
      el = el.parentNode //继续向上查找
    }
    el && func.call(el,e,el)
  })
  return element
}