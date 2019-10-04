// 异步回调
function red() {
    console.log('red')
}

function yellow() {
    console.log('yellow')
}

function green() {
    console.log('green')
}

// 回调方式
const task = (gap, light, cb) => {
    setTimeout(() => {
        if (light === 'yellow') {
            yellow()
        } else if (light === 'red') {
            red()
        } else {
            green()
        }
        cb()
    }, gap)
}

function step() {
    task(3000, 'red', () => {
        task(2000, 'yellow', () => {
            task(1000, 'green', step)
        })
    })
}

//   step()
//   promise 方式
const task1 = (gap, light) => {
    return new Promise(resolve => {
        setTimeout(() => {
            switch (light) {
                case 'red':
                    red()
                    break;
                case 'yellow':
                    yellow()
                    break;
                case 'green':
                    green()
                    break;
            }
            resolve()
        }, gap)
    })
}

function step_promise() {
    task1(3000, 'red')
        .then(() => task1(2000, 'yellow'))
        .then(() => task1(1000, 'green'))
        .then(() => step_promise())
}

// step_promise()
// async await 方式
async function step_await() {
    await task1(3000, 'red')
    await task1(2000, 'yellow')
    await task1(1000, 'green')
    step_await()
}

step_await()
