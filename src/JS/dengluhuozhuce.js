// 判断滚动条事件，让导航固定在头部
window.onscroll = function () {
    // document.documentElement.scrollTop用来兼容IE
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    let navCon = document.getElementsByClassName("nav-con")[0]
    if (t >= 1) {
        navCon.style.top = 0
    } else {
        navCon.style.top = 39 + "px"
    }
}
// 点击导航栏去搜索也
$(".nav1-ul").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop/suoyouye.html"
})
// 点击logo去首页
$(".logoImg").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop"
})

// 判断是否登录过，是的话将上次登录的记录显示在左边
let isLog = localStorage.getItem("id")
if(isLog){
    $(".yijingdianyou").val(localStorage.getItem("dianYou"))
    $(".yijingmima").val(localStorage.getItem("miMa"))
}

// 男或女
let sex = ""
$(".xianshengornvshi")[0].onblur = function () {
    if (this.selectedIndex) {
        sex = 1
    }
    else {
        sex = 0
    }
}

// 填写的名
let userName = $(".username")
$(".username").blur(function () {
    if (!userName.val()) {
        alert("什么都没有填呢~")
    }
    else {
        console.log(userName)
    }
})
// 填写的姓
let xingShi = $(".xingshi")
$(".xingshi").blur(function () {
    if (!xingShi.val()) {
        alert("什么都没有填呢~")
    }
})

// 电子邮箱验证
let dianyou = $(".dianyou")
dianyou.blur(function () {
    if (!(/^([A-z]|\d)+\@([A-z]|\d)+\.([A-z]{2,})$/.test(dianyou.val()))) {
        alert("错了呢~")
    }
})

// 密码验证 
//您的密码至少包含8个字符,密码区分大小写。
let mima = $(".shuruMima")
$(".shuruMima").blur(function () {
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(mima.val()))) {
        alert("错了呢~")
    }
})
// 电话验证
let dianhua = $(".dianhua")
$(".dianhua").blur(function () {
    let dianhuayanzheng = /^([1]\d{10}|([\((]?0[0-9]{2,3}[)\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/
    if (!(dianhuayanzheng.test(dianhua.val()))) {
        alert("错了呢~")
    }
})

// 点击继续按钮
$(".shuoming-but").click(function () {
    // 街道和门牌号
    let jiedaoandmenpai = $(".jiedaoandmenpai").val()
    // 邮编
    let youbian = $(".gonsiipt1").val()
    // 市
    let shi = $(".gonsiipt2").val()
    // 非空
    if (!jiedaoandmenpai || !youbian || !shi || !sex || !userName.val() || !xingShi.val() || !dianyou.val() || !mima.val() || !dianhua.val()) {
        alert("请完善信息~~")
    }

    // 验证都合法后，向后台发送信息
    // 后台注册接口
    let http = new XMLHttpRequest()
    http.open("get", `http://192.168.31.192:8080/addUser?sex=${sex}&name=${userName.val()}&xingShi=${xingShi.val()}&dianYou=${dianyou.val()}&miMa=${mima.val()}&dianHua=${dianhua.val()}&jdAndMp=${jiedaoandmenpai}&youBian=${youbian}&shi=${shi}`)
    http.send()
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            let data = http.responseText
            if (data == "success") {
                // 将用户信息存到本地
                localStorage.setItem("sex", sex)
                localStorage.setItem("name", userName.val())
                localStorage.setItem("xingShi", xingShi.val())
                localStorage.setItem("dianYou", dianyou.val())
                localStorage.setItem("miMa", mima.val())
                localStorage.setItem("dianHua", dianhua.val())
                localStorage.setItem("jdAndMp", jiedaoandmenpai)
                localStorage.setItem("youBian", youbian)
                localStorage.setItem("shi", shi)
                // 将右边用户部分信息放在左边
                $(".yijingdianyou").val(localStorage.getItem("dianYou"))
                $(".yijingmima").val(localStorage.getItem("miMa"))
                alert("注册成功~~！")
            }
            else {
                alert("注册失败了~")
            }
        }
    }
})

// 点击登录按钮登录,
// 后来第二个接口，登录
$(".denglu").click(function () {
    // 判断账户密码是否为空
    let dianYou = $(".yijingdianyou").val()
    let miMa = $(".yijingmima").val()
    if (dianYou && miMa) {
        // 发送登录信息
        let http = new XMLHttpRequest()
        http.open("get", `http://192.168.31.192:8080/login?dianYou=${dianYou}&miMa=${miMa}`)
        http.send()
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                let data = http.responseText
                if (data == "success") {
                    alert("登录成功啦~~")
                    // 记录登录状态
                    sessionStorage.setItem("isLogin", "true")
                    // 记录用户名个人你密码
                    localStorage.setItem("dianYou", $(".yijingdianyou").val())
                    localStorage.setItem("miMa", $(".yijingmima").val())

                    // 跳转到用户信息页
                    location.href = "http://192.168.31.192/bvbfanshop/yonghuxinxi.html"
                }
                else {
                    alert("对不起呢~~登陆失败了~")
                }
            }
        }

    }
    else {
        alert("请把信息填全了吧~")
    }
})

// 购物车
$(".gouwuche").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop/gouwuche.html"
})
