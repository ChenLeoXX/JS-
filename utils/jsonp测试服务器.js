const http = require('http');
const data = {'data': 'hello'};
const url = require('url');
const queryString = require('querystring');

http.createServer(function (req, res) {
    var params = url.parse(req.url);
    console.log(params);
    if (params.query && queryString.parse(params.query).callback) {
        console.log(1231232);
        const str = queryString.parse(params.query).callback + '(' + JSON.stringify(data) + ')';
        return res.end(str)
    }
    res.end(JSON.stringify(data));
}).listen(5000);