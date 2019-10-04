function ajax(url, opt) {
    var url = opt.url
    var type = opt.tpye || 'GET'
    var dataType = opt.dataType || 'json'
    var onError = opt.onError || function () {
    }
    var data = opt.data || {}
    var dataStr = [] //请求参数
    for (key in data) {
        dataStr.push(key + '=' + data[key])
    }
    dataStr = dataStr.join('&')
    if (type === 'GET') {
        url += '?' + dataStr
    }
    var promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(type, url)
        xhr.onload = function () {
            if (xhr.status === 200 || (xhr.status > 200 && xhr.status <= 304)) {
                resolve(xhr.responseText)
            } else {
                reject(new Error(xhr.statusText))
            }
            xhr.responseType = dataType
            xhr.onerror = onError
            xhr.setResquestHeader('Accept', 'application/json')
            if (type === 'POST') {
                xhr.send(dataStr)
            } else {
                xhr.send()
            }
        }
    })
    return promise
}

// let res = ajax({})
// res.then((data) => {
//   let result = JSON.parse(data)
// }).catch((err) => {
//   console.log(err)
// })




