let currentWatcher = null //设置一个全局唯一的一个,data中属性的观测者
let id = 0 //每个主题有唯一的ID 

class mvvm {
    constructor(opts) {
        this.init(opts)//初始化
        observer(this.$data)//把所有要观测的数据,推入observer中进行数据拦截
        new Compile(this)//解析模板同时让对应的属性添加watcher
    }

    init(opts) {
        this.$el = document.querySelector(opts.el)
        this.$data = opts.data || {}
        this.$methods = opts.methods || {}
        this.observers = []
        //数据代理,让vm实例可以直接获取到data数据
        for (let key in this.$data) {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                //箭头函数让this指向vm实例
                get: () => {
                    return this.$data[key]
                },
                set: (newVal) => {
                    this.$data[key] = newVal
                }
            })
        }
        //让methods里的this指向vm实例,和Vue里的methods保持一致
        for (let key in this.$methods) {
            this.$methods[key] = this.$methods[key].bind(this)//这里的this是vm实例
        }
    }
}

function observer(data) { //让所有的VM的$data进行数据监听
    if (typeof data !== 'object' || !data) return
    let keys = Object.keys(data)
    keys.forEach((key) => {
        let val = data[key] //局部作用域 保持val值
        let subject = new Subject()
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                if (currentWatcher) {
                    console.log('has Watcher')
                    currentWatcher.subscribeTo(subject)
                }
                return val
            },
            set(newVal) {
                console.log(`data change ${val}=>${newVal}`)
                val = newVal
                //通知所有观测者进行更新
                subject.notify()
            }
        })
        if (typeof val === 'object') {//递归
            observer(val)
        }
    })
}

//解析模板
class Compile {
    constructor(vm) {//vm为watcher实例
        this.vm = vm
        this.node = vm.$el
        this.compile()
    }

    compile() {
        //遍历节点
        this.traverse(this.node)
    }

    traverse(node) {
        //如果为1说明有子节点
        if (node.nodeType === 1) {
            //处理节点上的v-model,v-on指令
            this.compileNode(node)
            //继续向下遍历,childNodes是类数组nodeList,但是有forEach方法
            node.childNodes.forEach(child => {
                this.traverse(child)
            })//为3,说明为文本节点,解析文本
        } else if (node.nodeType === 3) {
            this.compileText(node)
        }
    }

    compileText(node) {
        //创建正则规则: 全局匹配花括号内的分组内容用非贪婪模式
        let reg = /{{(.+?)}}/
        let matches
        //reg.exec 返回匹配到的数组,循环调用直到没有对应结果返回null
        while (matches = reg.exec(node.nodeValue)) {
            //reg匹配到的全部字符
            let raw = matches[0]
            //分组内容里匹配的字符
            let key = matches[1].trim()
            //将节点文本替换为实例对象属性对应的值
            node.nodeValue = node.nodeValue.replace(raw, this.vm.$data[key])
            //给对应的主题(data内的属性)添加watcher观测者,同时给update时添加一个回调函数更新View
            new Watcher(this.vm, key, function (newVal, oldVal) {
                node.nodeValue = node.nodeValue.replace(oldVal, newVal)
            })
        }
    }

    //解析指令
    compileNode(node) {
        //类数组转换为真数组
        let attrs = [...node.attributes]
        attrs.forEach(attr => {
            //attr为这个节点上的每个属性的键值对象,key是属性名,value是属性值
            if (this.isModelDirective(attr.name)) {
                this.bindModel(node, attr)
            } else if (this.isEventDirective(attr.name)) {
                this.bindEventHandle(node, attr)
            }
        })
    }

    bindModel(node, attr) {
        let key = attr.value
        //node一般为input
        node.value = this.vm[key]
        //为属性添加watcher
        new Watcher(this.vm, key, function (newVal) {
            node.value = newVal
        })
        //绑定事件
        node.oninput = (e) => {//箭头函数this绑定声明上下文作用域this
            this.vm[key] = e.target.value
        }
    }

    bindEventHandle(node, attr) {//事件绑定
        console.log(attr)
        let eventType = attr.name.substr(5) //索引为5开始到结束的字符串 e.g:"v-on:click"
        let methodName = attr.value
        node.addEventListener(eventType, this.vm.$methods[methodName])
    }

    isModelDirective(attrName) {//判断指令
        return attrName === 'v-model'
    }

    isEventDirective(attrName) {//判断指令
        return attrName.indexOf('v-on') === 0
    }
}

//发布订阅主题
class Subject {
    constructor() {
        this.observers = []
        this.id = id++
    }

    addOberserver(observer) {
        this.observers.push(observer)
    }

    removeOberserver(observer) {
        let index = this.observers.indexOf(observer)
        if (index > 0) {
            this.observers.splice(index, 1)
        }
    }

    notify() {
        this.observers.forEach((item) => {
            item.updata()
        })
    }
}

//观察者
class Watcher {//每个属性的观测者.观测数据的变化然后通知View进行更新
    constructor(vm, key, callback) {
        this.subjects = {}
        this.key = key
        this.vm = vm//当前的ViewModel实例
        this.callback = callback
        this.value = this.getValue()
    }

    updata() {
        let oldVal = this.value
        let value = this.getValue() //如果触发了update事件,那么此时的get值已经被set更新到最新
        //如果发生了更新那么就要通知 Vm实例的view发生变化,同时传递参数,调用replace替换新值
        if (oldVal !== value) {
            this.value = value
            this.callback.bind(this.vm)(value, oldVal)
        }
    }

    subscribeTo(subject) {
        //当观测者的还没有订阅相对应的主题(data中的属性)时就添加一个,否则不执行逻辑
        if (!this.subjects[subject.id]) {
            console.log(`has subscribeto${subject}`)
            subject.addOberserver(this)
            //让观测者有了订阅主题
            this.subjects[subject.id] = subject
        }
    }

    getValue() {
        //让全局唯一的观测者变成当前的实例对象
        currentWatcher = this
        //触发Observer的get函数,让把当前对象(watcher观测者)添加到主题(data的属性就是一个主题)中
        let value = this.vm.$data[this.key]
        //添加进主题后把全局唯一观测者变回null
        currentWatcher = null
        return value
    }
}