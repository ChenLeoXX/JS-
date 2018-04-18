/* 
  用async await 函数实现一个间隔函数
  @params: times <Number,undefined>  gap <Number,1000> 
*/


//包含异步的函数
function sleep(interval){
  return new Promise((resolve,reject)=>{
      setTimeout(resolve,interval)
  })
}

async function output(times,gap){
   let j = gap || 1000
   for(var i=0;i<times;i++){        
        //await 需要等待异步函数执行完毕后才会执行后面代码
       await sleep(j)
       console.log(i+1)
   }
  await sleep(j)
  console.log(i+1)
}
output(6) 


// promise 版本
function promiseSleep(times,gap){
  for(var i=0;i<times;i++){
   let j = gap + (gap * i) || 1000*i
    new Promise((resolve)=>{
      //setTimeout 第三个参数开始当做回调函数的参数传入
     setTimeout(resolve,j,i)
    }).then(res=>{
     console.log(res+1)
    })
  }
 }











