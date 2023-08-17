// frozenUI弹窗封装
var Popup = {
    /* 
     * alert 弹窗
     */
    alert: function (title, text, fn) {
        Popup.closeLoad();
        if (!text) {
            text = title;
            title = '';
        }
        console.log(text);
        var alertEl = document.getElementById('dialogAlert');
        if (alertEl) {
            alertEl.children[0].children[0].children[0].innerText = title;
            alertEl.children[0].children[0].children[1].innerText = text;
            var closeBtnEl = alertEl.children[0].children[1].children[0];
            closeBtnEl.onclick = () => { Popup.closeAlert(fn); };
            alertEl.classList.add('show');
            document.body.appendChild(alertEl);//将节点移动到body最后一个保证每次弹窗都在最上面不会被前面的弹窗覆盖
            return
        }
        console.log("创建alert");
        var alertRoot = document.createElement('div'); // 创建alert
        alertRoot.setAttribute('id', 'dialogAlert');   // 设置属性
        alertRoot.setAttribute('class', 'ui-dialog show');

        var cntNode = document.createElement('div'); //创建 ui-dialog-cnt div
        cntNode.setAttribute('class', 'ui-dialog-cnt');
        alertRoot.appendChild(cntNode);

        var bdNode = document.createElement('div');
        bdNode.setAttribute('class', 'ui-dialog-bd');
        cntNode.appendChild(bdNode);
        var h3Node = document.createElement('h3');
        h3Node.innerText = title;
        bdNode.appendChild(h3Node);
        var pNode = document.createElement('p');
        pNode.innerText = text;
        bdNode.appendChild(pNode);

        var ftNode = document.createElement('div');
        ftNode.setAttribute('class', 'ui-dialog-ft');
        cntNode.appendChild(ftNode);

        var closeBtnNode = document.createElement('button');//创建关闭按钮
        closeBtnNode.setAttribute('type', 'button');
        closeBtnNode.innerText = '关 闭';
        closeBtnNode.onclick = () => { Popup.closeAlert(fn); };
        // closeBtnNode.addEventListener('click', function () {
        //     Popup.closeAlert();
        // })
        ftNode.appendChild(closeBtnNode);

        document.body.appendChild(alertRoot);
    },
    closeAlert: function (fn) {
        var alertEl = document.getElementById('dialogAlert');
        if (alertEl) {
            alertEl.classList.remove('show')
        }
        if (!!fn && typeof (fn) == 'function') {
            fn();
        }
    },
    confirm: function (title, text, fn, fnCancel) {
        var confirmEl = document.getElementById('dialogConfirm');
        if (confirmEl) {
            confirmEl.children[0].children[0].children[0].innerText = title
            confirmEl.children[0].children[0].children[1].innerHTML = typeof (text) == 'string' ? text : text.outerHTML;
            var cancelBtnEl = confirmEl.children[0].children[1].children[0];
            cancelBtnEl.onclick = () => { Popup.closeConfirm(fnCancel); }
            var yesBtnEl = confirmEl.children[0].children[1].children[1];
            yesBtnEl.onclick = () => { Popup.sureConfirm(fn); };
            confirmEl.classList.add('show');
            document.body.appendChild(confirmEl);
            window.stopScan = true;
            return
        }

        var dialogRoot = document.createElement('div'); // 创建confirm
        dialogRoot.setAttribute('id', 'dialogConfirm');   // 设置属性
        // dialogRoot.setAttribute('class', 'ui-dialog ui-dialog-operate show');
        dialogRoot.setAttribute('class', 'ui-dialog show');

        var cntNode = document.createElement('div'); //创建 ui-dialog-cnt div
        cntNode.setAttribute('class', 'ui-dialog-cnt');
        dialogRoot.appendChild(cntNode);

        var bdNode = document.createElement('div');
        bdNode.setAttribute('class', 'ui-dialog-bd');
        cntNode.appendChild(bdNode);
        var h3Node = document.createElement('h3');
        h3Node.innerText = title;
        bdNode.appendChild(h3Node);
        var itemNode = document.createElement('div');
        itemNode.setAttribute('clase', 'ui-dialog-item')
        itemNode.innerHTML = typeof (text) == 'string' ? text : text.innerHTML;
        bdNode.appendChild(itemNode);

        var ftNode = document.createElement('div');
        ftNode.setAttribute('class', 'ui-dialog-ft');
        cntNode.appendChild(ftNode);

        var cancelBtnNode = document.createElement('button');//创建取消按钮
        cancelBtnNode.setAttribute('type', 'button');
        cancelBtnNode.innerText = '取 消'
        cancelBtnNode.onclick = () => { Popup.closeConfirm(fnCancel); }
        // cancelBtnNode.addEventListener('click', function () {
        //     Popup.closeConfirm();
        // })
        ftNode.appendChild(cancelBtnNode)

        var yesBtnNode = document.createElement('button');//创建取消按钮
        yesBtnNode.setAttribute('type', 'button');
        yesBtnNode.innerText = '确 定'
        yesBtnNode.onclick = () => { Popup.sureConfirm(fn); }
        // yesBtnNode.addEventListener('click', function () {
        //     Popup.sureConfirm(fn);
        // })
        ftNode.appendChild(yesBtnNode)

        document.body.appendChild(dialogRoot);

        let lastTime = new Date().getTime();
        dialogRoot.onkeydown = function (e) {
            let nextTime = new Date().getTime();
            var theEvent = window.event || e;
            var code = theEvent.keyCode || theEvent.which;
            //当弹窗是打开时 响应回车事件 判断按键间隔 小于30毫秒证明是扫码枪输入的回车则不触发按钮点击事件
            if (code == 13 && dialogRoot.classList.contains('show') && nextTime - lastTime >= 30) {
                yesBtnNode.click();
            }
            lastTime = nextTime;
        }
        window.stopScan = true;
    },
    //取消按钮事件
    closeConfirm: function (fn) {
        var dialogEl = document.getElementById('dialogConfirm');
        if (dialogEl) {
            dialogEl.classList.remove('show')
        }
        window.stopScan = false;
        if (!!fn && typeof (fn) == 'function') {
            fn();
        }
    },
    //确定按钮事件
    sureConfirm: function (fn) {
        var fnStatus = true
        if (typeof (fn) == 'function') {
            fnStatus = fn();
        }
        var dialogEl = document.getElementById('dialogConfirm');
        if (dialogEl && fnStatus) {
            dialogEl.classList.remove('show')
            window.stopScan = false;
        }
    },
    //弹出加载窗
    load: function (text) {
        text = text ?? '加载中...';

        var loadEl = document.getElementById('popupLoad');
        if (loadEl) {
            loadEl.children[0].children[1].innerHTML = text;
            loadEl.classList.add('show');
            document.body.appendChild(loadEl);
            window.stopScan = true;
            return
        }

        var loadRoot = document.createElement('div');
        loadRoot.setAttribute('id', 'popupLoad');   // 设置属性
        loadRoot.setAttribute('class', 'ui-loading-block show');

        var cntNode = document.createElement('div'); //创建 ui-dialog-cnt div
        cntNode.setAttribute('class', 'ui-loading-cnt');
        loadRoot.appendChild(cntNode);

        var spinNode = document.createElement('i');
        spinNode.setAttribute('class', 'ui-loading-bright');
        cntNode.appendChild(spinNode);

        var textNode = document.createElement('p');
        textNode.innerHTML = text;
        cntNode.appendChild(textNode);

        document.body.appendChild(loadRoot);
        window.stopScan = true;
    },
    //关闭加载窗
    closeLoad: function () {
        var loadEl = document.getElementById('popupLoad');
        if (loadEl) {
            loadEl.classList.remove('show')
        }
        window.stopScan = false;
    },
    //顶部警告信息
    warn: function (msg, duration, fn) {
        console.log(msg);
        if ((!duration || isNaN(duration)) && duration != 0) {
            duration = 5000;
        }
        Popup.closeLoad();
        // var warnRoot = document.getElementById('popupWarn');
        // if (!warnRoot) {
        //     warnRoot.remove();
        // }
        var warnRoot = document.createElement('div');
        var id = `popup-warn-${Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)}`;
        warnRoot.setAttribute('id', id);
        warnRoot.setAttribute('class', 'ui-tooltips ui-tooltips-warn');

        var cntNode = document.createElement('div');
        cntNode.setAttribute('class', 'ui-tooltips-cnt ui-border-b');
        warnRoot.appendChild(cntNode);

        var iNode = document.createElement('i');
        cntNode.appendChild(iNode);
        cntNode.append(msg);


        var aNode = document.createElement('a');
        aNode.setAttribute('class', 'ui-icon-close')
        aNode.onclick = () => { Popup.closeWarn(id, fn); }

        cntNode.appendChild(aNode);

        //在页面容器节点第一个子节点前面插入提示信息
        var containerNode = document.querySelector('.ui-container');
        // console.log(JSON.stringify(containerNode));
        if (containerNode.childElementCount > 0) {
            var firstChild = containerNode.children[0];
            firstChild.parentNode.insertBefore(warnRoot, firstChild);
        }
        else {
            containerNode.appendChild(warnRoot);
        }

        //如果时间参数有效则定时关闭
        if (!!duration) {
            // console.log(duration);
            setTimeout(() => { Popup.closeWarn(id, fn); }, duration);
        }
    },
    //关闭顶部警告
    closeWarn: function (id, fn) {
        var warnEl = document.getElementById(id);
        if (warnEl) {
            warnEl.remove();
        }
        if (!!fn && typeof (fn) == 'function') {
            fn();
        }
    },
    //轻提示定时器
    toastTimer: undefined,
    //轻提示
    toast: function (msg, duration) {
        console.log(msg);
        Popup.closeLoad();
        //取消上一个定时器
        clearTimeout(Popup.toastTimer);
        var toastBox = document.getElementsByClassName('toast-box')[0];
        //防止重复弹出
        if (!!toastBox) toastBox.remove();
        duration = isNaN(duration) ? 1000 : duration;
        var m = document.createElement('div');
        m.className = 'toast-box';
        m.innerHTML = msg;
        m.style.cssText = "position: fixed;top: 50%;left: 50%;z-index: 999;display: flex;padding: 8px 12px;color: #fff;line-height: 20px;text-align: center;background-color: rgba(0,0,0,.7);transform: translate3d(-50%,-50%,0);border-radius: 5px;";
        document.body.appendChild(m);
        Popup.toastTimer = setTimeout(function () {
            var d = 0.3;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () { m.remove(); }, d * 1000);
        }, duration);
    }
}