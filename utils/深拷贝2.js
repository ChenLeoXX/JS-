//深拷贝
function deepClone(obj) {
    if (typeof obj !== 'object') {
        throw Error('类型只可为对象或者数组')
        return
    }
    let target = obj instanceof Object ? {} : []
    for (let key in obj) {
        target[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
    return target
}