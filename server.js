const http = require('http');
const fs = require('fs');
const urlLib = require('url')
const querystring = require('querystring');

var result = {};
var ave = '';

var server = http.createServer(function (req, res) {

    const obj = urlLib.parse(req.url, true);
    const url = obj.pathname;
    const GET = obj.query;

    if (url == '/result') {
        if (obj.search.indexOf('?') < 0) {
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.end(ave);
        } else {
            result[req.connection.remoteAddress] = GET.point;
            console.log(result);
            ave = average(result);
            res.end();
        }
    } else {
        var file_name = '';
        if (obj.pathname.indexOf('.') < 0) {
            file_name = './pages' + obj.pathname + '.html';
        } else {
            file_name = '.' + obj.pathname;
        }
        fs.readFile(file_name, function (err, data) {
            if (err) {
                res.write('404');
            } else {
                res.write(data);
            }
            res.end();
        })
    }
}).listen(8888);


function average(obj) {
    var count = 0,
        total = 0,
        max = 0,
        min = 100;
    for (var k in obj) {
        count++;
        var point = parseInt(obj[k]);
        max = max < point ? point : max;
        min = min < point ? min : point;
        total += point;
    }
    if (count <= 3) {
        var r = total / count;
    } else {
        var r = (total - max - min) / (count - 2);
    }
    var htmlStr = '打分人数: ' + count + ',  最高分: ' + max + ',  最低分: ' + min + ',  平均值: ' + r;
    console.log(htmlStr);
    return htmlStr;
}