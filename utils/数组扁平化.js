//flat array
// es5 递归遍历实现
function flatten(arr) {
    let res = []
    for (let i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flatten(arr[i]))
        } else {
            res.push(arr[i])
        }
    }
    return res
}

// reduce 简化代码
function flatten2(arr) {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten2(next) : next)
    }, [])
}

// es6 拓展操作符

function flatten3(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

// underscore 的flatern实现
/*d
  arr <Array>初始数组
  shadow<Boolean> 是否只扁平一层
  strict<Boolean> 是否严格检测为数组
  output<Array> 输出数组
*/
function flatten4(arr, shadow, strict, output) {
    if (!Array.isArray(arr)) throw new Error('arr 只能为数组')
    output = output || []
    let idx = output.length
    for (let i = 0, len = arr.length; i < len; i++) {
        let value = arr[i]
        if (Array.isArray(value)) {
            //             是否只扁平一层
            if (shadow) {
                let j = 0, vlen = value.length;
                while (j < vlen) {
                    output[idx++] = value[j++]
                }
            } else {
                //             递归记录下标
                flatten4(value, shadow, strict, output)
                idx = output.length
            }
        } else if (!strict) {
            output[idx++] = value
        }
    }
    return output
}