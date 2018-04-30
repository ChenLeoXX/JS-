/*
   2018-4-30 
  实现一个阻塞线程的函数
  @parames t <Number> 阻塞事件
  @returens  undefined

*/
async function execTime(t){
  return new Promise(resolve =>{
     setTimeout(resolve,t)
  })
}
console.log('a')
await execTime(3000)
console.log('b')

// 利用while循环来阻塞进程，Date对象的时间来控制阻塞时间
function execTime2(t){
  let now = Date.now()
  let after
  while(after - now <= t){
    after = Date.now() 
  }
}
console.log('a')
execTime2(3000)
console.log('b')