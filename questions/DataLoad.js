/* 
   如果页面需要一次性加载1w条数据，在不卡顿的情况下加载，用一个函数实现
   @parames dataCount<Number> 数据总量
   @parames el <String> 元素选择符
   @parames child <String> 插入的节点标签
   @parames eventType <String> 事件类型
   @parames handler <Function> 事件回调
*/

function dataLoad(opts){  
  let container = document.querySelector(opts.el),
      eachLoad = 5,
      loadCount = opts.dataCount / 5
      hasLoadedCount = 0  
      // fragment创建虚拟dom，分批载入真实DOM
  function appendTo(){
    let fragment = document.createDocumentFragment()
    for(let i=0;i<eachLoad;i++){
      let item = document.createElement(opts.child)
      item.innerText = eachLoad * hasLoadedCount + i +1
      fragment.appendChild(item)
    }
    container.appendChild(fragment)
    hasLoadedCount++
    requestLoad()
  }
  // 请求浏览器重绘，重绘之间调用参数里的回调
  function requestLoad(){
    if(hasLoadedCount < loadCount){
      window.requestAnimationFrame(appendTo)
    }
  }
  requestLoad()
  // 事件代理
  container.addEventListener(opts.eventType,opts.handler)
}



