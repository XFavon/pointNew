window.onload = function () {
    var name = document.getElementById('name'),
        point = document.getElementById('point'),
        submit = document.getElementById('submit'),
        flag1 = flag2 = false;

    document.oncontextmenu = function () {
        return false;
    }

    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            toSubmit();
            submit.click();
        }
    })

    name.onblur = function () {
        var userName = /^[\u4e00-\u9fa5]{2,3}$/;
        if (userName.test(name.value)) {
            this.parentElement.className = 'right';
            flag1 = true;
        } else {
            this.parentElement.className = 'wrong';
            flag1 = false;
        }
        toSubmit()
    }
    point.onblur = function () {
        var getPoint = /^(([1-9]\d?)|100)$/;
        if (getPoint.test(point.value)) {
            this.parentElement.className = 'right';
            flag2 = true;
        } else {
            this.parentElement.className = 'wrong';
            flag2 = false;
        }
        toSubmit()
    }

    function toSubmit() {
        if (flag1 && flag2) {
            submit.className = 'right';
            submit.innerHTML = '就是这样吧 ^_^';
            submit.removeAttribute('disabled');
        } else {
            submit.className = '';
            submit.innerHTML = '格式错误啦 >_<';
            submit.setAttribute('disabled', 'true');
        }
    }
}