/*
    函数重载是指同调用同一个函数 不同的输入(参数)会有不同的输出,而js是没有函数重载的
    实现一个函数重载 overrideFunc
*/

function overrideFunc(obj, name, fn) {
    let oldFunc = obj[name]
    obj[name] = function () {
        if (arguments.length === fn.length) {
            return fn.apply(this, arguments)
        } else if (typeof oldFunc === 'function') {
            return oldFunc.apply(this, arguments)
        }
    }
}

let Obj = {
    age: [12, 13, 14, 15],
    find: function () {
        return this.age.length
    }
}
overrideFunc(Obj, 'find', function (index) {
    if (this.age[index] !== -1) {
        return this.age[index]
    } else {
        throw new Error('不存在')
    }
})
overrideFunc(Obj, 'find', function (index1, index2) {
    return index1 + index2
})
console.log(Obj.find())
console.log(Obj.find(3))
console.log(Obj.find(100, 100))