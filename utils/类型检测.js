//类型检测
function type(target) {
    window.typeDict = {}
    "Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function (item, index) {
        window.typeDict["[object " + item + "]"] = item.toLowerCase();
    })
    return function (target) {
        let type = Object.prototype.toString
        return typeof target === 'object' || typeof target === 'function' ? window.typeDict[type.call(target)] || 'object' : typeof target
    }
}

type()({})