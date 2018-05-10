/* 
  2018-5-5
  利用Array.reduce ，写出一个 让promise 按照顺序发送异步请求，或者执行动画
*/
// 普通写法：
var arr = [1,2,3,4,5]
async function promiseReq(gap){
  return new Promise(resolve=>{
    setTimeout(resolve,gap *1000,gap)
  })
}
for(let i =0;i<arr.length;i++){
  await promiseReq(arr[i]).then(res=>{console.log(res)})
}
// reduce写法
arr.reduce( async (init,curVal)=>{
  return 
},Promise.resolve())

