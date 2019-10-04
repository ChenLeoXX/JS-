/* 
 模拟一个new 操作符
 new主要做了这些事：
 1. 创建一个对象，这个对象的隐式原型指向构造函数的显式原型
 2. 构造函数内的this 指向该对象
 3. 如果构造函数内有返回值 并且 返回值是一个对象，那么返回该对象，否则返回这个实例。
 @parames 构造函数
 @parames 其余参数
*/
function newFactory() {
    // 转化成数组
    let args = [...arguments]
    // 获取构造函数，shift方法改变原数组
    let Constructor = args.shift()
    // 返回一个指向构造函数原型的对象
    let instance = Object.create(Constructor.prototype)
    // 改变this
    let temp = Constructor.apply(instance, args)
    // 判断是否有返回值和不为null，typeof null返回object
    return (typeof temp === 'object' && temp !== null) ? temp : instance
}


function parent(name, age) {
    this.name = name
    this.age = age
}

var child = newFactory(parent, 'leo', 23)
console.log(child)