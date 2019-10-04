function _Promise(excutor) {
    this.state = 'pending'
    this.value = ''
    this.reason = ''
    // resolved和reject之后 then方法的回调数组
    this.onFulfiledArray = []
    this.onRejectedArray = []
    //     resolve为用户调用 需要注意this的指向
    const resolve = (value) => {
        //         如果value是一个promise实例则直接返回一个then方法回调
        if (value instanceof _Promise) {
            return value.then(resolve, reject)
        }
        this.state = 'fulfiled'
        this.value = value
        //         模拟then方法后的nextTick
        setTimeout(() => {
                this.onFulfiledArray.forEach(fn => {
                        fn(value)
                    }
                )
            }
        )
    }
    const reject = (reason) => {
        this.state = 'rejected'
        this.reason = reason
        setTimeout(() => {
                this.onRejectedArray.forEach(fn => {
                        fn(reason)
                    }
                )
            }
        )
    }
    //     捕获错误
    try {
        excutor(resolve, reject)
    } catch (err) {
        throw err
    }
}


/*
  处理then 返回一个promise 的情况
  promise2：一个promise实例
  result： onFulfiled或 onRejected的结果 可能为一个promise
  resolve方法，reject方法
*/

function resolvePromise(promise2, result, resolve, reject) {
    //防止死循环
    if (promise2 === result) {
        return reject(new TypeError('rejected due to circular reference'))
    }
//     是否已经执行过onfulfiled或onRejected
    let consume = false
    let thenable
    if (result instanceof _Promise) {
        if (result.state === 'pending') {
            result.then(function (data) {
//                递归调用resolvePromise 因为data 也可能为promise实例
                resolvePromise(promise2, data, resolve, reject)
            }, reject)
        } else {
            result.then(resolve, reject)
        }
        return
    }

    function isComplexTarget(target) {
        return (typeof target === 'function' || typeof target === 'object') && target !== null
    }

//     是否是一个具有then方法的对象
    if (isComplexTarget(result)) {
        try {
            thenable = result.then
            if (typeof thenable === 'function') {
                thenable.call(result, function (data) {
                    if (consume) return
                    consume = true
                    return resolvePromise(promise2, data, resolve, reject)
                }, function (reason) {
                    if (consume) return
                    consume = true
                    reject(reason)
                })
            } else {
                resolve(result)
            }
        } catch (err) {
            if (consume) return
            consume = true
            return reject(err)
        }

    } else {
        resolve(result)
    }
}


//需要改造 支持then的链式调用 返回一个新的promise 实例
_Promise.prototype.then = function (onFulfiled, onRejected) {
    //     如果参数不是一个函数则强制返回一个函数
    onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
        throw err
    }
    let promise2
    //     实例状态检测
    if (this.state === 'fulfiled') {
        return promise2 = new _Promise((resolve, reject) => {
                //             放入timout中保证then的执行顺序
                setTimeout(() => {
                        //             将这次的then 结果 传递到当前新的 promise 实例中
                        try {
                            let result = onFulfiled(this.value)
                            resolvePromise(promise2, result, resolve, reject)
                        } catch (err) {
                            throw err
                        }
                    }
                )
            }
        )
    }
    if (this.state === 'rejected') {
        return promise2 = new _Promise((resolve, reject) => {
                //             同上
                setTimeout(() => {
                        try {
                            let result = onRejected(this.reason)
                            resolvePromise(promise2, result, resolve, reject)
                        } catch (err) {
                            throw err
                        }
                    }
                )
            }
        )
    }
    /*
  *如果实例异步状态还未结束则应当把 新实例中的onFulfiled放到
    当前未结束实例的 onFulfiledArray中，等待异步结束后一同执行,
    只有第一次调用then的实力需要等到 异步resolve fulfiled之后调用，后面的链式调用
    都是根据 返回的promise2 的state 一般为pending，所以需要放到前一个实力的 数组中执行
  */
    if (this.state === 'pending') {
        return promise2 = new _Promise((resolve, reject) => {
                this.onFulfiledArray.push(() => {
                        try {
                            let result = onFulfiled(this.value)
                            resolvePromise(promise2, result, resolve, reject)
                        } catch (err) {
                            throw err
                        }
                    }
                )
                this.onRejectedArray.push(() => {
                        try {
                            let result = onRejected(this.reason)
                            resolvePromise(promise2, result, resolve, reject)
                        } catch (err) {
                            throw err
                        }
                    }
                )
            }
        )
    }
}

_Promise.prototype.catch = function (fn) {
    return this.then(null, fn)
}
// resolve，reject，all,race方法只存在在构造函数上
_Promise.resolve = function (val) {
    return new _Promise((resolve, reject) => {
        resolve(val)
    })
}
_Promise.reject = function (reason) {
    return new _Promise((resolve, reject) => {
        reject(val)
    })
}
_Promise.all = function (arr) {
    if (!Array.isArray(arr)) throw TypeError('the paramer should be an array')
//     通过promise实例来统一resolve 
    return new _Promise((resolve, reject) => {
        let resultArr = []
        let len = arr.length
        try {
            for (let i = 0; i < len; i++) {
                arr[i].then((data) => {
                    resultArr.push(data)
                    if (len === resultArr.length) {
                        resolve(resultArr)
                    }
                }, reject)
            }
        } catch (err) {
            reject(err)
        }
    })
}
_Promise.race = function (arr) {
    if (!Array.isArray(arr)) throw TypeError('the paramer should be an array')
    return new _Promise((resolve, reject) => {
        try {
            let len = arr.length
            for (let i = 0; i++; i < len) {
                arr[i].then(resolve, reject)
            }
        } catch (err) {
            reject(err)
        }
    })

}
let p1 = new _Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 3000)
    }
)
p1.then(res => {
        return new _Promise(resolve => {
            setTimeout(() => {
                resolve(res + 1)
            }, 2000)
        })
    }
).then(res => {
        console.log(res)
    }
)
