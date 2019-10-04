//bind
Function.prototype.bind2 = function (context) {
    // self 指向调用bind2 的函数 函数也是个对象
    let self = this
    if (!self instanceof Function) {
        throw new Error('type error, it must be Function instance')
    }
    let ags = Array.prototype.slice.call(arguments, 1)

    function boundFun() {
        let childArgs = Array.prototype.slice.call(arguments)
        //这里通过this在做判断,如果返回的函数用作构造函数,那么this就指向 实例,否则就指向 bind函数指定的context
        return self.apply(this instanceof boundFun ? this : context, childArgs.concat(ags))
    }

    // 修改返回函数的prototype 为 绑定函数的prototype 使得当返回函数作为构造函数的时候可以继承绑定函数的值
    boundFun.prototype = Object.create(self.prototype)
    return boundFun
}
//apply , call
/*
   使用ES3语法模拟call的实现
*/

Function.prototype.call2 = function (context) {
    let context_ = context || window
    context_.fn = this
    // 获取call this参数之后的参数
    let args = []
    let len = arguments.length
    for (let i = 1; i < len; i++) {
        args.push("arguments[" + i + "]")
    }
    //    args= ['arguments[1]','arguments[2]'] ...
    //     args数组默认调用toString方法 同时eval 执行 对应的context下的调用函数 (指向调用call的函数)
    let result = eval("context.fn(" + args + ")")  //可能有返回结果
    delete context_.fn //删除掉fn属性
    return result
}

let obj = {
    value: 110
}
let value = 120

function test(name, age) {
    console.log(this.value)
    console.log(name)
    console.log(age)
}

test()
test.call2(obj, 'leo', 23)
test.call2(null)