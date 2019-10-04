// 反柯里化
Function.prototype.uncurrying = function () {
    let self = this;    // self 此时就是下面的Array.prototype.push方法
    return function () {
        let obj = Array.prototype.shift.call(arguments);
        console.log(obj)
        /*
            obj其实是这种样子的
            obj = {
                'length': 1,
                '0': 1
            }
        */
        return self.apply(obj, arguments); // 相当于Array.prototype.push(obj, 110)
    }
};
let slice = Array.prototype.push.uncurrying();

let obj = {
    'length': 1,
    '0': 1
};
slice(obj, 110);