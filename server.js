const http = require('http');
const fs = require('fs');
const urlLib = require('url')
const querystring = require('querystring');

var result = {};

var server = http.createServer(function (req, res) {
    var str = '';
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        var obj = urlLib.parse(req.url, true);
        const url = obj.pathname;
        const GET = obj.query;
        const POST = querystring.parse(str);
        var result = {};
        if (url == '/result') {
            result[req.connection.remoteAddress] = POST.point;
            res.end(JSON.stringify(result));
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
    })
}).listen(8888);


function ava(req, res, next) {
    var count = 0,
        result = 0,
        max = 0,
        min = 100;
    for (var key in pointObj) {
        count++;
        var point = parseInt(pointObj[key].point);
        max = max < point ? point : max;
        min = min < point ? min : point;
        result += point;

    }
    console.log(pointObj);
    if (count < 3) {
        var r = result / count;
    } else {
        var r = (result - max - min) / (count - 2);
    }
    console.log('打分人数: ' + count + ',  去掉最高分: ' + max + ',  去掉最低分: ' + min + ',  平均值: ' + r);
    res.send('打分人数: ' + count + ',  去掉最高分: ' + max + ',  去掉最低分: ' + min + ',  平均值: ' + r);
}