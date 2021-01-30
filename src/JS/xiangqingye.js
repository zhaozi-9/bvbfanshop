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
// 进来拿到存的缓存
let data = JSON.parse(localStorage.getItem("isgoods"))
// 商品的名

$(".conareaL-shangpinming").html(data[0].goodsSort)
// 大图
$(".datuimg")[0].srcset = data[0].goodsSrc.split(",")[0]
// 小图1
// $(".xiao1").find("img")[0].srcset = data[0].goodsSrc.split(",")[0]
// $(".xiao2").find("img")[0].srcset = data[0].goodsSrc.split(",")[1]
// 价格
$(".conareaR-top").html(data[0].goodsPrice + "￥*")
// 商品编号
$(".shangpinbianhao").html(data[0].goodsId)
// 商品下的商品描述
$(".chanpinxinxi").html(data[0].goodsSort)
$(".miaoshua").html(data[0].goodsMiaoshu1)
$(".miaoshub").html(data[0].goodsMiaoshu2)
// 重新配置
$(".shangpinxinxi button").click(function () {
    $(".shangpinxingming").val("")
    $(".shangpinhaoma").val("")
})
// 大小
$(".spsize").find("span").click(function () {
    // 清除所有
    $(".spsize").find("span").css({
        "backgroundColor": "#ddd"
    })
    //给当前点击的节点加上颜色
    this.style.backgroundColor = "#ffe600"
    // 大小存进缓存
    localStorage.setItem("size", $(this).attr("class"))
})

// 点击添加购物车时候发给后台，收到成功时跳转
$(".addgouwuche").click(function () {
    // 获取用户输入的买的商品的规格等信息
    let goodsXingMing = $(".shangpinxingming").val()
    let goodsHaoMa = $(".shangpinhaoma").val()
    let dianYou = localStorage.getItem("dianYou")
    let goodsId = data[0].goodsId
    let goodsSize = localStorage.getItem("size").split("size")[1]
    // 点击时默认选中一个
    let goodscount = 1
    // 判断一些必要的非空
    if (goodsId && goodsSize && goodsXingMing && goodsHaoMa && dianYou && goodscount) {
        let http = new XMLHttpRequest()
        http.open("get", `http://192.168.31.192:8080/addshopping?goodsId=${goodsId}&goodsSize=${goodsSize}&goodsXingMing=${goodsXingMing}&goodsHaoMa=${goodsHaoMa}&dianYou=${dianYou}&goodscount=${goodscount}`)
        http.send()
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                let data = http.responseText
                if (data === "success") {
                    // 出现遮罩层
                    $("#mask")[0].style.display = "block"
                    // 继续添加
                    $(".jixuadd").click(function () {
                        location.href = "http://192.168.31.192/bvbfanshop/suoyouye.html"
                    })
                    // 去购物车
                    $(".qugouwuche").click(function(){
                        location.href = "http://192.168.31.192/bvbfanshop/gouwuche.html"
                    })
                }
                else {
                    alert("对不起呢~添加失败了~~ ")
                }
            }
        }
    }
    else {
        alert("再看看呢~~出现了错误！！")
    }
})