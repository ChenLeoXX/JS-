//柯里化
function createCurry(func, args) {
    let funcArgs = func.length;
    let args1 = args ? args : [];
    return function () {
        let _args = [].slice.call(arguments);
        [].push.apply(_args, args1);
        if (_args.length < funcArgs) {
            return createCurry.call(this, func, _args)
        }
        return func.apply(this, _args)
    }
}