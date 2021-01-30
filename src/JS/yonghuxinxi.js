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
// 点击logo去首页
$(".logoImg").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop"
})


// 点击导航栏搜索框变背景颜色
let navipt = $(".navipt").find("input")[0]
navipt.onfocus = function () {
    setTimeout(function () {
        navipt.style.backgroundColor = "#fff"
        $(".navipt")[0].style.backgroundColor = "#fff"
    }, 300)
}
//失焦变回来
navipt.onblur = function () {
    setTimeout(function () {
        navipt.style.backgroundColor = "#ffe600"
        $(".navipt")[0].style.backgroundColor = "#ffe600"
    }, 300)
}
// =========================================

// 从数据库拿到当前用户信息并展示在页面上,登录时候已经存了用户名跟密码，通过这个来查询数据库
// 后台的第三个接口，查询功能

// 如果是登陆的话
if (sessionStorage.getItem("isLogin")) {

    let dianYou = localStorage.getItem("dianYou")
    let miMa = localStorage.getItem("miMa")

    // 发送数据
    let http = new XMLHttpRequest()
    http.open("get", `http://192.168.31.192:8080/getUsers?dianYou=${dianYou}&miMa=${miMa}`)
    http.send()
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            let data = http.responseText
            // console.log(data)
            // 根据数据库返回的数据将页面中的部分信息补全
            let userInformation = JSON.parse(data)[0]
            // 男或女
            console.log(data)
            if (userInformation.xinDianYou == 0) {
                $("#famle")[0].checked = true
            }
            else {
                $("#male")[0].checked = true;
            }
            // 名
            $(".ming").val(userInformation.name)
            //  姓
            $(".xing").val(userInformation.xing)
            // 新电邮
            $(".xinDianYou").val(userInformation.dianYou)
            // 重复
            // $(".reXinDianYou").val(userInformation.dianYou)
            // 当前密码
            $(".nowMiMa").val(userInformation.miMa)

            // 存到本地
            // 用户在表中的id
            localStorage.setItem("id",userInformation.id)
            // 将用户信息存到本地
            localStorage.setItem("sex", userInformation.sex)
            localStorage.setItem("name", userInformation.name)
            localStorage.setItem("xingShi", userInformation.xing)
            localStorage.setItem("dianYou", userInformation.dianYou)
            localStorage.setItem("miMa", userInformation.miMa)
            localStorage.setItem("dianHua", userInformation.dianHua)
            localStorage.setItem("jdAndMp", userInformation.jdAndMp)
            localStorage.setItem("youBian", userInformation.youBian)
            localStorage.setItem("shi", userInformation.shi)

        }
    }
}

// 后台第四个接口，更改用户信息之改男女姓名

//  更改姓名性别
$(".reXingming").click(function () {
    // 直接给后台发数据
    // sex ... name ...xing 
    // 发送数据
    // 先判断男女
    let sex = $("#male")[0].checked ? 1 : 0
    let name = $(".ming").val()
    let xing = $(".xing").val()
    let dianYou = localStorage.getItem("dianYou")
    // 如果非空发送请求
    if (name && xing) {
        // 规划请求
        let http = new XMLHttpRequest()
        http.open("get", `http://192.168.31.192:8080/updateUsers?sex=${sex}&name=${name}&xing=${xing}&dianYou=${dianYou}`)
        http.send()
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                let data = http.responseText
                if(data === "success"){
                    alert("修改成功啦~~")
                }
                else{
                    alert("对不起呢~修改失败了~~ ")
                }
            }
        }
    }
})

// 更改电子邮箱
$(".reDianyou").click(function(){
    // 直接给后台发数据
    // xinDianYou ... reXinDianYou ...nowMiMa 
    let xinDianYou = $(".xinDianYou").val()
    let reXinDianYou = $(".reXinDianYou").val()
    let nowMiMa = $(".nowMiMa").val()
    let dianHua = localStorage.getItem("dianHua")
    // 如果非空并且两次电邮相同
    if ((xinDianYou && reXinDianYou && nowMiMa) && (xinDianYou == reXinDianYou)) {
        // 规划请求 
        let http = new XMLHttpRequest()
        http.open("get", `http://192.168.31.192:8080/updateDianYou?xinDianYou=${xinDianYou}&nowMiMa=${nowMiMa}&dianHua=${dianHua}`)
        http.send()
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                let data = http.responseText
                console.log(data)
                if(data === "success"){
                    alert("修改成功啦~~")
                    localStorage.setItem("dianYou",`${xinDianYou}`)
                }
                else{
                    alert("对不起呢~修改失败了~~ ")
                }
            }
        }
    }
    else{
        alert("再康康吧！~~")
    }
})

// 变更密码~
$(".reMima").click(function(){
    // 直接给后台发数据
    // xinDianYou ... reXinDianYou ...nowMiMa 
    let xinMima = $(".xinMima").val()
    let reXinMima = $(".reXinMima").val()
    let dangQianMima = $(".dangQianMima").val()
    let id = localStorage.getItem("")
    // 如果非空并且两次电邮相同
    if ((xinMima && reXinMima && dangQianMima) && (xinMima == reXinMima)) {
        // 规划请求 
        let http = new XMLHttpRequest()
        http.open("get", `http://192.168.31.192:8080/updateMiMa?xinMima=${xinMima}&dangQianMima=${dangQianMima}`)
        http.send()
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                let data = http.responseText
                if(data === "success"){
                    alert("修改成功啦~~")
                    // 更新一下缓存
                    localStorage.setItem("miMa",xinMima)
                }
                else{
                    alert("对不起呢~修改失败了~~ ")
                }
            }
        }
    }
    else{
        alert("在康康呗~~错了呢！~")
    }
})

// 鼠标移上“注销”时。
$(".zhuxiao").mouseenter(function(){
    $(".zhuxiao")[0].style.backgroundColor = "#ffe600"
    $(".zhuxiao")[0].style.width = "100%"
    $(".zhuxiao")[0].style.marginLeft = 0
    $(".zhuxiao")[0].style.textIndent = "28px"
    $(".zhuxiao")[0].style.fontWeight = "bold"
    $(".myzhanghufirstli")[0].style.fontWeight = "normal"
})

// 移出消失
$(".zhuxiao").mouseout(function(){
    $(".zhuxiao")[0].style.backgroundColor = "#fff"
    $(".zhuxiao")[0].style.width = "90%"
    $(".zhuxiao")[0].style.marginLeft = "28px"
    $(".zhuxiao")[0].style.textIndent = 0
    $(".zhuxiao")[0].style.fontWeight = "normal"
    $(".myzhanghufirstli")[0].style.fontWeight = "bold"
})


 $(".zhuxiao").click(function(){
     sessionStorage.clear("isLogin")
     alert("注销成功！~~")
     location.href = "http://192.168.31.192/bvbfanshop/dengluhuozhuce.html"
 })

 // 鼠标移上看看商品时候
 $(".kankan").mouseenter(function(){
    $(".kankan")[0].style.backgroundColor = "#ffe600"
    $(".kankan")[0].style.width = "100%"
    $(".kankan")[0].style.marginLeft = 0
    $(".kankan")[0].style.textIndent = "28px"
    $(".kankan")[0].style.fontWeight = "bold"
    $(".myzhanghufirstli")[0].style.fontWeight = "normal"
})

 // 移出
 $(".kankan").mouseout(function(){
    $(".kankan")[0].style.backgroundColor = "#fff"
    $(".kankan")[0].style.width = "90%"
    $(".kankan")[0].style.marginLeft = "28px"
    $(".kankan")[0].style.textIndent = 0
    $(".kankan")[0].style.fontWeight = "normal"
    $(".myzhanghufirstli")[0].style.fontWeight = "bold"
})

// 点击跳转商品详情页
$(".kankan").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop/suoyouye.html"
})
// 购物车
$(".gouwuche").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop/gouwuche.html"
})