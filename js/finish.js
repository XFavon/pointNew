var ppp = document.getElementById("ppp"),
    t = 5,
    tag = [],
    flag = true,
    obj = obj;
document.onkeydown = function (e) {
    var godCode = [38, 38, 40, 40, 37, 39, 37, 39],
        str = godCode.toString();
    tag.push(e.keyCode);
    if (flag) {
        if (tag.toString().indexOf(str) >= 0) {
            console.log("right ");
            window.location.href = "http://127.0.0.1:8888/result ";
            tag = [];
            clearInterval(timer);
            clearTimeout(timeO);
            flag = false;
        } else if (e.keyCode == 116 || e.keyCode == 123) {
            e.keyCode = 0;
            e.cancelBubble = true; return false;
        }
    }
};
document.oncontextmenu = function () {
    return false;
};
var timer = setInterval(function () {
    if (t > 0) {
        t--;
        ppp.innerHTML = t
    } else {
        clearInterval(timer); ppp.innerHTML = 0
    }
}, 1000);
var timeO = setTimeout(function () {
    window.close();
    window.location.href = "about:blank "
}, 5000);