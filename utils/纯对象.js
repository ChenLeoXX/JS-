/*
   定义一个对象 如果是由字面量创建 或者 由 new Object() 创建 ,或者没有原型 那么我们认为它是一个纯对象
   用于与浏览器中的宿主对象区分 如Math history等等
*/

let class2type = {}
let type = Object.prototype.toString
let hasOwn = Object.prototype.hasOwnProperty

function isPlainObject(obj) {
    let conFun, proto
//     排除非对象与宿主对象
    if (!obj || type.call(obj) !== '[object Object]') return false
    proto = Object.getPrototypeOf(obj)
//    如果不存在原型 即 obj.__proto__为null 也是纯对象
    if (!proto) return true
    conFun = hasOwn.call(proto, 'constructor') && proto.constructor
//   判断原型的构造函数是否与Object的构造函数相同,与自定义的区分
    return typeof conFun === 'function' && hasOwn.toString.call(conFun) === hasOwn.toString.call(Object)
}