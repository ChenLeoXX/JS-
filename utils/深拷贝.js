function jsonCopy(obj) { // 缺点无法拷贝,函数,和日期,undefined,正则等特殊对象
    let res = JSON.parse(JSON.stringify(obj))
    return res
}

/*
 @paramer 任意数据类型
*/
function deepCopy(obj) {
    var target  //不能使用let 因为无法先声明在赋值
    if (!(obj instanceof Object)) {//返回基本类型
        return obj
    } else if (obj instanceof Array) {
        target = []
    } else if (obj instanceof Function) {
        target = eval(obj)
    } else if (obj instanceof Object) {
        target = {}
    }
    for (let key in obj) {
        target[key] = deepCopy(obj[key])
    }
    return target
}

var a = Object.prototype.toString.call(null)
a.replace(/[^\[{1}\d+]\s{1}/g, '')