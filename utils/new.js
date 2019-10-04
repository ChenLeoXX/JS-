// new
function newFun(...args) {
    let ctor = args.shift();
    let obj = Object.create(ctor.prototype);
    let result = ctor.apply(obj, args);
    return typeof result === 'object' && result !== null ? result : obj
}
