/* 
  用async await 函数实现一个间隔函数
  @params: times <Number,undefined>  gap <Number,1000> 
*/


//包含异步的函数
function sleep(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, interval)
    })
}

async function output(times, gap) {
    let j = gap || 1000
    for (var i = 0; i < times; i++) {
        //await 需要等待异步函数执行完毕后才会执行后面代码
        await sleep(j)
        console.log(i + 1)
    }
    await sleep(j)
    console.log(i + 1)
}

output(6)


// promise 版本
function promiseSleep(times, gap) {
    for (var i = 0; i < times; i++) {
        let j = gap + (gap * i) || 1000 * i
        new Promise((resolve) => {
            //setTimeout 第三个参数开始当做回调函数的参数传入
            setTimeout(resolve, j, i)
        }).then(res => {
            console.log(res + 1)
        })
    }
}

/*
 实现一个函数，返回一个函数
 function repeat(func,times,interval){

 }
var example = repeat(alert,10,2000)
example('你好') 输出 10 次 你好 间隔 2秒
*/

function repeat(func, times, interval) {
    return function () {
        let args = arguments
        for (let i = 0; i < times; i++) {
            setTimeout(() => {
                func.apply(null, args)
            }, interval * i)
        }
    }
}

let example = repeat(alert, 10, 2000)
example('你好')

//async 
function repeat2(func, times, interval) {
    // 返回一个async 函数
    return async function () {
        let args = arguments
        for (let i = 0; i < times; i++) {
            // 等待await 执行完才会往下执行
            await new Promise((resolve) => {
                setTimeout(resolve, interval)
            })
            func.apply(null, args)
        }
    }
}

var example2 = repeat2(console.log, 10, 2000)
example2('hello')










