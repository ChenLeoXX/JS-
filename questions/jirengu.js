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
function fn() {
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

function fn() {
  let timer
  timer = setTimeout(console.log, 0, 'a')
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(console.log, 0, 'b')
    return function () {
      if (timer) clearTimeout(timer)
      timer = setTimeout(console.log, 0, 'c')
    }
  }
}

function fn2() {
  let result = 'a'
  setTimeout(() => {
    console.log(result)
  })
  return () => {
    result = 'b'
    return () => {
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
function fn3() {
  let a = () => {
    return b
  }
  let b = () => 'c'
  a.valueOf = () => 'a'
  b.valueOf = () => 'b'
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
function examPromise() {
  var score = Math.floor(Math.random() * 101)
  return new Promise(resolve => {
    while (score < 60) {
      console.log('不及格')
      score = Math.floor(Math.random() * 101)
    }
    resolve(score)
  })
}
examPromise().then(res => {
  console.log('及格了', res)
})
// async /await
async function examPromise2(score) {
  let score = Math.floor(Math.random() * 101)
  return new Promise(resolve => {
    while (score <= 60) {
      console.log('不及格')
      score = Math.floor(Math.random() * 101)
    }
    resolve(socre)
  })
}
await examPromise2().then(res => {
  console.log('及格了', res)
})

/* 
  2018-5-7
  写一个函数根据字段返回sort排序返回结果
  思路：Array.prototype.sort 接受一个 compare函数，这个函数接受两个参数，根据返回值 是否大于0  决定是否交换位置。
*/
var users = [{
    name: 'John',
    age: 20,
    company: 'Jirengu'
  },
  {
    name: 'Pete',
    age: 18,
    company: 'Alibaba'
  },
  {
    name: 'Ann',
    age: 19,
    company: 'Tencent'
  }
]

function compare(field) {
  return function (val1, val2) {
    return v1[field] > v2[field] ? 1 : -1
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
const obj = {
  a: 1,
  b: 2,
  c: 3
}

function selector(obj, arr) {
  let res = {}
  arr.forEach(item => {
    if (obj[item]) {
      res[item] = obj[item]
    }
  });
  return res
}

function selector2(obj, arr) {
  let res = {}
  for (let val of arr.values()) {
    res[val] = obj[val]
  }
  return res
}
selector(obj, ['a', 'c']) //output {a:1,c:3}
selector2(obj, ['a', 'c']) //output {a:1,c:3}


/* 
  2018-5-12
  实现一个函数，用于测试另一个函数执行一定次数的时长。
  如：execTimes(sort,1000),sort的参数 是'hello'
  思路：这种调用方式一定放回的是一个函数，所以，首先迭代前记录时间，while循环迭代阻塞进程，随后输出结果
*/
function sort(str) {
  return str.split('').sort().join('')
}

function execTimes(sort, times) {
  return function () {
    let now = +new Date()
    let hasCounted = 0
    while (hasCounted < times) {
      sort.apply(null, [...arguments])
        ++hasCounted
    }
    console.log(`执行${hasCounted}次，耗时${Date.now() - now}ms`)
  }
}
execTimes(sort, 1000)('hello') //output 执行1000次，耗时7ms

/* 
  2018-5-13
  实现一个函数，测试两个字符串是否匹配
  如：function isMatch(str1,str2){
    //...
  }
  isMatch('hello','olelh') //true 不管顺序只看单个字符
  isMatch('something','gnihtemos') //true 
  isMatch('abb','baa')//false
  isMatch('aaa','aa')//false
  使用一个execTimes（）测试执行该函数的耗时，给出最优解，尽量使用ES6
  思路1：利用split和join 将字符串转化数组，排序后在转化回来，对比。
  思路2：利用hashMap 循环来记录每个字符，然后第二次循环直接对比是否存在
  思路3：利用 replace方法 ，替换另一个字符串中的对应字符，直到它变成 ''空字符串，利用!转化为布尔值返回
  如果还有字符说明不相等返回false，空字符则返回true
*/
function isMatch(str1, str2) {
  str1 = str1.trim()
  str2 = str2.trim()
  if (str1.length !== str2.length) return false
  str1 = str1.split('').sort().join('')
  str2 = str2.split('').sort().join('')
  return str1.toString() === str2.toString()
}

function isMatch2(str1, str2) {
  str1 = str1.trim()
  str2 = str2.trim()
  if (str1.length !== str2.length) return false
  // 使用hash表记录每个字符
  let hash = {}
  for (let i = 0; i < str1.length; i++) {
    let key = str1[i]
    if (!hash[key]) {
      hash[key] = true
    }
  }
  for (let i = 0; i < str2.length; i++) {
    let key = str2[i]
    if (!hash[key]) {
      return false
    }
  }
  return true
}

function isMatch3(str1, str2) {
  str1 = str1.trim()
  str2 = str2.trim()
  if (str1.length !== str2.length) return false
  //遍历和替换不为同一字符串
  for (let i = 0; i < str2.length; i++) {
    str1 = str1.replace(str2[i], '')
  }
  return !str1
}

/* 
 2018-5-14
 以下代码输出什么？为什么？
 思路： js 中this 的绑定是在调用时决定的（不包含箭头函数），默认全局调用在非严格模式下为window。
 app.fn1(): 输出app对象，因为对象中的调用this进行隐式绑定指向了调用它的对象。
 app.fn2()() :输出window ，这种调用返回了一个函数，接着在全局环境下进行调用。
 app.fn3(): 输出window，因为这种在函数内声明调用，this同样默认指向 window
 app.fn4().fn(): 指向了返回的声明对象，同样隐式绑定。
 app.fn5(): 输出：window， 因为setTimeout计时器，默认下它属于全局下的一个定时器，同样回调的调用方式也是全局的
 所以输出window。
 app.fn6(): 由于计时器的回调是一个箭头函数的特殊性，它的this是在声明时确定的，它的this是根据声明时父级作用域this一样的指向。
 由此可知，它的父级 fn6，它的this指向了app，所以输出app。
app.fn7(): 输出app，利用bind，传入当前作用域内的this，即fn7的this，所以输出app。
app.fn8(): 输出window，因为 fn8也是箭头函数，向上找this，直到window。
*/

var app = {
  fn1: function () {
    console.log(this)
  },
  fn2: function () {
    return function () {
      console.log(this)
    }
  },
  fn3: function () {
    function fn() {
      console.log(this)
    }
    fn()
  },
  fn4: function () {
    return {
      fn: function () {
        console.log(this)
      }
    }
  },
  fn5() {
    setTimeout(function () {
      console.log(this)
    }, 10)
  },
  fn6() {
    setTimeout(() => {
      console.log(this)
    }, 20)
  },
  fn7() {
    setTimeout((function () {
      console.log(this)
    }).bind(this), 30)
  },
  fn8: () => {
    setTimeout(() => {
      console.log(this)
    }, 40)
  }
}
app.fn1()
app.fn2()()
app.fn3()
app.fn4().fn()
app.fn5()
app.fn6()
app.fn7()
app.fn8()
/* 
  2018-5-16
  说出以下代码中的this指向
  <div class="father">
    <div class="child">child</div>
  </div>
*/
$('.child').on('click', function () { //原本this 指向 绑定事件的元素
  console.log(this)
})
$('.father').on('click', '.child', function () { //this指向child
  console.log(this)
})
$('.child')[0].onclick = function () { //this 指向 child
  console.log(this)
}
var app = {
  init: function () {
    this.$father = $('.father')
    this.$child = $('.child')
    this.bind()
  },
  bind: function () {
    var _this = this
    this.$father.on('click', this.sayHi) //指向 father
    this.$child.on('click', function () {
      _this.sayHello() //指向app对象
    })
    this.$child.on('click', this.sayBye.bind(this)) //指向app对象
  },
  sayHi: function () {
    console.log(this)
  },
  sayHello: function () {
    console.log(this)
  },
  sayBye: function () {
    console.log(this)
  }
}
app.init()

/* 
  2018-5-17
  封装一个JSONP函数如下效果：
  jsonp(url,[,data][,callbackName])
  @parames  url <String> 请求url
  @parames  data <PlainObject> 参数对象
  @parames  callbackName <String> 服务端的回调函数key 默认为"callback"
  @returns  Promise 对象
*/
function jsonp(url,data,callbackName){
  function param(data){
    let url = ''
    for(let key in data){
      let value = data[key] ? data[key] : ''
      url += `&${key}=${encodeURIComponent(value)}`
    }
    return url 
  }

  function randomFunc(){
    return 'jsonpfunc_' + new Date().getTime() + Math.floor(Math.random() * 10000)
  }

  function removeScript(id){
    if(typeof id !== 'string') throw new Error('type of id is not String')
    document.body.removeChild(document.getElementById(id))
  }

  function deleteFunc(name){
    delete window[name]
  }
  let funcName = randomFunc()
  return new Promise((resolve,reject)=>{
  let timer 
  window[funcName] = (res)=>{
   resolve(res)
   timer = setTimeout(()=>{
    removeScript(funcName)
    deleteFunc(funcName)
   },3000) 
  }
  let script = document.createElement('script')
  script.id = funcName
  script.src = `${url += (url.includes('?') ? '' : '?')}${callbackName || 'callbak'}=${funcName}${param(data)}`
  document.body.appendChild(script)
  script.onerror = function(){
    reject(new Error('jonp request error'))
    removeScript(funcName)
    deleteFunc(funcName)
    if(timer) clearTimeout(timer)
  }
  })
}