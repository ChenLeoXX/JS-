(function (global) {
    function randomFuncName() {//生成随机回调名
        return `jsonpcallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    }

    function removeScript(id) {//删除script标签
        document.body.removeChild(document.getElementById(id))
    }

    function deleteFunc(name) {//删除回调函数
        delete global[name]
    }

    function jsonp(url, [timeout] = [3000]) {
        let funcName = randomFuncName()
        return new Promise((resolve, reject) => {
            let timer
            global[funcName] = (res) => {//全局数据回调函数
                resolve(res)
                timer = setTimeout(() => {
                    removeScript(funcName)
                    deleteFunc(funcName)
                }, timeout)
            };
            let script = document.createElement('script')
            script.id = funcName
            script.src = `${url}?callback=${funcName}`
            document.body.appendChild(script)
            script.onerror = function () {//错误处理
                reject(new Error('jonp request error'))
                removeScript(funcName)
                deleteFunc(funcName)
                if (timer) clearTimeout(timer)
            };
        });
    }

    global.jsonp = jsonp
})(window)
jsonp('http://localhost:5000').then((res) => alert(res.data));