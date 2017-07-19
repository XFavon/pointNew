var ppp = document.getElementById("ppp"),
    bgc = document.querySelector('.bgc'),
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
            location.href = "/result";
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
    console.log(t);
    if (t > 0) {
        if (t < 4) {
            bgc.style.backgroundImage = 'url(/img/baoman1.png)'
        }
        t--;
        ppp.innerHTML = t
    } else {
        clearInterval(timer);
        ppp.innerHTML = 0;
        bgc.style.backgroundImage = 'url(/img/baoman2.jpeg)'
    }
}, 1000);
var timeO = setTimeout(function () {
    window.close();
    location.href = "about:blank"
}, 8000);

function shake(dom, t) {
    var t = t || 50;
    setInterval(function () {
        t--;
        var x, y;
        x = (Math.random() - .5) * (50 - t);
        y = (Math.random() - .5) * (50 - t);
        // console.log(x, y);
        dom.style.transform = 'translate( ' + x + 'px,' + y + 'px)';
    }, 100)
}
shake(document.querySelector('div'));