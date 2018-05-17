function siblings(target){
  let ret = []
  let _target = target // 获取目标元素的副本引用
  while(target  = target.nextSibling){ // 让目标元素赋值为同级的下相邻元素
    if(target.nodeType === 1){// 1为元素,3为文本内容
        ret.push(target)
        continue
    }  
  }
  target = _target 
  while(target = target.previousSibling){
    if(target.nodeType === 1){
      ret.push(target)
      continue
    }
  }
  return ret  
}
//更加优雅的写法
function sibling(target) {
  let ret = target.parentNode.children
  ret = [...ret]//转化数组
  let index =ret.indexOf(target) //内部比较使用===
  ret.splice(index,1)
  return ret
} 