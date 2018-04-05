/* 
 实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!
 
LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 
以此类推。
*/
// 明显的链式调用,和工厂函数. 考察JS运行机制

function LazyMan(name) {
    return new _lazyMan(name)
}
class _lazyMan {
    constructor(name) {
        this.tasks = [] //创建一个模拟任务队列
        let task = (name => () => {
            console.log(`Hi,this is ${name}!`)
            this.next()
        })(name)
        this.tasks.push(task)
        setTimeout(() => {
            this.next()
        }, 0)
    }
    next() {
        let task = this.tasks.shift()
        task && task()
    }
    eat(food) {
        let task = (
            food => () => {
                console.log(`Eat ${food} ~~~`)
                this.next()
            }
        )(food)
        this.tasks.push(task)
        return this //返回实例链式调用
    }
    sleep(time) {
        let task = (
            time => () => {
                setTimeout(() => {
                    console.log(`Wake up after ${time}s`)
                    this.next()
                }, time * 1000)
            }
        )(time)
        this.tasks.push(task)
        return this
    }
    sleepFirst(time) {
        let task = (
            time => () => {
                setTimeout(() => {
                    console.log(`wake up after ${time}s`)
                    this.next()
                }, time * 1000)
            })(time)
        this.tasks.unshift(task) //优先调用
        return this
    }
}


LazyMan('leo').eat('banana').sleep(3).eat('dinner').sleepFirst(5)


//promise化
class LazyMan {
    constructor(name) {
        this.sleepFirstTime = 0
        //直接返回表达式结果,return 一个promise对象所以等待resolve结果后才可以then
        this.promise = Promise.resolve().then(
            () => this.sleepFirstTime && this._sleep(this.sleepFirstTime) //1
        ).then(() => {
            console.log(`Hi,this is ${name} !`) //2
        })
    }
    eat(food) {
        this.promise.then(() => {
            console.log(`eat ${food}~`)
        })
        return this
    }
    sleep(time) {
        this.promise = this.promise.then(
            () => {
                return this._sleep(time)
            }
        )
        return this
    }
    sleepFirst(time) {
        this.sleepFirstTime = time
        return this
    }
    _sleep(time) {
        console.log(`Wake up after ${time}s`)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, time * 1000)
        })
    }
}

function Lazy(name) {
    return new LazyMan(name)
}
Lazy('leo').eat('banana').sleep(3).eat('dinner').sleepFirst(5)