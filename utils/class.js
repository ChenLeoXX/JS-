class Person {
    constructor(opts) {
        this.name = opts.name
        this.age = opts.age
    }

    sayHi() {
        console.log(`hi my name is ${this.name}`)
    }
}

class Job extends Person {
    constructor(opts) {
        super(opts)
        this.work = opts.work
    }

    myjob() {
        console.log(`my job is ${this.work}`)
    }
}

let a = new Job({name: 'leo', age: 23, work: 'programer'})

//es5 

function Person(opts) {
    this.name = opts.name
    this.age = opts.age
}

Person.prototype.sayHi = function () {
    console.log(`this is my ${this.name}`)
}

function Student(opts) {
    Person.call(this, opts)
    this.class = opts.class
    this.teacher = opts.teacher
}

//继承
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student
Student.prototype.score = function () {
    console.log('my score is 100')
}
var c = new Student({name: "ha", age: 23, class: '初一一班', teacher: '若愚'})

function extend(func, parent, pramas) {

}

function inherit(parent, child) {
    child.prototype = Object.create(parent.prototype)
    chid.constructor = child
}