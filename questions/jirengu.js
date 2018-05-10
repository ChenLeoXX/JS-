/*
   2018-4-30 
  实现一个阻塞线程的函数
  @parames t <Number> 阻塞事件
  @returens  undefined

*/
async function execTime(t) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}
console.log('a')
await execTime(3000)
console.log('b')

// 利用while循环来阻塞进程，Date对象的时间来控制阻塞时间
function execTime2(t) {
  let now = Date.now()
  let after
  while (after - now <= t) {
    after = Date.now()
  }
}
console.log('a')
execTime2(3000)
console.log('b')

/* 
  2018-5-1
  实现一个函数，先输出1，2，过3秒后输出3
  思路：考察JS运行机制，主要利用setTimeout 形成另一个macro task 然后当script 全局运行完后就会运行另一个macro task
  另外通过 拓展运算符向回调函数传输参数
*/
function execTime3(t, cb) {
  let args = [...arguments].slice(2)
  setTimeout(cb, 3000, ...args)
}
console.log(1)
execTime3(3000, function () {
  console.log(...arguments, this)
}, 3)
console.log(2)

/* 
  2018-5-2
  用JS实现一个对象，有这样的效果： obj.obj.obj === obj 为true，无论多少个obj都为true
  考察了 引用类型赋值 赋值的是 内存中地址值， 通过===判断是否全相等。
  思路1：可以直接赋值，然后让obj内的obj属性等于 最外层obj的地址值
  思路2： 通过 Object.defineProperty，设置 get函数返回原obj
*/
function equalObj() {
  var obj = {}
  obj.obj = obj
  return obj
}

function equalObj2() {
  var obj = {}
  Object.defineProperty(obj, 'obj', {
    configurable: true,
    enumerable: true,
    get() {
      return obj
    },
    set(newVal) {
      obj = obj
    }
  })
  return obj
}

/* 
  2018-5-3
  实现一个函数有如下效果：
  1. fn() === fn
  2. fn.fn === fn
*/
function fn(){
 fn.fn = fn
  return fn
}

/* 
  2018年5月4日
  实现一个函数fn，有如下效果：
  fn() 打印 'a'
  fn()() 打印 'b'
  fn()()() 打印 'c'
  思路1： JS执行机制，根据防抖的思想，利用setTimeout和clearTimeout来控制输出
  思路2： 根据js 执行机制，闭包
 */

function fn(){
  let timer
  timer = setTimeout(console.log,0,'a')
  return function(){
    if(timer) clearTimeout(timer)
    timer = setTimeout(console.log,0,'b')
    return function(){
      if(timer) clearTimeout(timer)
      timer = setTimeout(console.log,0,'c')
    }
  }
}

function fn2(){
 let result = 'a'
 setTimeout(()=>{
   console.log(result)
 })
 return ()=>{
   result = 'b'
   return ()=>{
     result = 'c'
   }
 }
}
/* 
  2018-5-5
  写出一个函数有如下效果：
    fn() == 'a'
    fn()() ==  'b'
    fn()()() == 'c'
    思路： == 会进行隐式转换比较，对象在与 原始类型比较的时候会优先调用自身的valueOf方法
    通过修改valueOf 方法  实现效果
    var test = ()=>{}
    test.valueOf = ()=>{return 'a'}
    test == 'a'
*/
function fn3(){
  let a = ()=>{
    return  b
  }
  let b = ()=> 'c'
  a.valueOf = ()=> 'a'
  b.valueOf = ()=> 'b'
  return a
}
/* 
 2018-5-6
 用Promise改写以下函数：
  function exam({
    var score = Math.floor(Math.random() * 101)
    if(score >= 60){
      console.log('及格)
    }else{
      console.log('不及格)
      setTimeout(exam,1000)
    }
  })
  实现 exam().then(res=>{
    console.log('及格了',res)
  })
*/
function examPromise(){
  var score = Math.floor(Math.random() *101)
   return new Promise(resolve =>{     
    while(score < 60){
      console.log('不及格')
      score = Math.floor(Math.random() *101)
    }
    resolve(score)
   })
}
examPromise().then(res=>{
  console.log('及格了',res)
})
// async /await
async function examPromise2(score){
  let score = Math.floor(Math.random() * 101)
  return new Promise(resolve=>{
   while(score <= 60){
     console.log('不及格')
     score = Math.floor(Math.random() * 101)
   }
   resolve(socre)
 })
}
await examPromise2().then(res=>{
  console.log('及格了',res)
})

/* 
  2018-5-7
  写一个函数根据字段返回sort排序返回结果
  思路：Array.prototype.sort 接受一个 compare函数，这个函数接受两个参数，根据返回值 是否大于0  决定是否交换位置。
*/
var users = [
  {name:'John',age:20,company:'Jirengu'},
  {name:'Pete',age:18,company:'Alibaba'},
  {name:'Ann',age:19,company:'Tencent'}
]
function compare(field){
 return function(val1,val2){
  return v1[field] > v2[field] ? 1:-1
 }
}
users.sort(compare('company'))

/* 
  2018-5-8
  实现如下效果：
  const obj = {a:1,b:2,c:3}
  function selector(obj,arr){
    
  }
  selector(obj,['a','c']) //output {a:1,c:3}
  思路1： 直接遍历数组获取对应的key，创建另一个变量对象，判断是否存在进行赋值。
  思路2： 使用ES6 for...of 遍历数组的values，大同小异
*/
const obj = {a:1,b:2,c:3}
function selector(obj,arr){
 let res = {}
 arr.forEach(item => {
   if(obj[item]){
     res[item]= obj[item]
   }
 });
 return res
}

function selector2(obj,arr){
 let res= {}
 for(let val of arr.values()){
  res[val] = obj[val]
 }
 return res
}
selector(obj,['a','c']) //output {a:1,c:3}
selector2(obj,['a','c']) //output {a:1,c:3}








































