function unique(arr) {
    return Array.from(new Set(arr))
}


function unique2(arr) {
    let res = []
    for (var i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i])
        }
    }
    return res
}

function unique3(arr) {
    let obj = {}
    /*
    利用数组过滤的方法,然后用一个对象的hasOwnProperty 和 typeof 和对象的键值可以是任意字符串的特性来
    还有()求值返回true,来过滤掉广义object这种类型,让数组放回唯一的那种类型值

    */
    return arr.filter((item, index, arr) => {
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}


var array = [{value: 1}, {value: 1}, {value: 2}];
unique3(array)
