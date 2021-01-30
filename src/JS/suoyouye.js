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
//=========================================

// 进入页面后，显示商品列表
// 后台的第七个数据接口


// 规划请求 
let http = new XMLHttpRequest()
http.open("get", `http://192.168.31.192:8080/getGoods`)
http.send()
http.onreadystatechange = function () {
    if (http.readyState === 4) {
        let data = JSON.parse(http.responseText)
        // 代表是第几个好用来加样式
        let a = 0;
        data.forEach(item => {
            item.isitem = a
            a++
            function changImg(isgoods) {
                // 克隆模板，放到页面，并对应图片
                let li = $(".moban").clone(true)
                li.removeClass("moban")
                li.toggleClass(isgoods)
                li.appendTo($(".xiangqingul"))
                // 图片路径
                li.find(".lidiv img")[0].srcset = item.goodsSrc
                // 商品的描述
                li.find(".miaoshuqq").html(item.goodsSort)
                // 价格
                li.find(".jiageqq").html(item.goodsPrice)
                // 让1.4.7.10.13...的倍数的li拥有左右边框
                for (let b = 1; b < data.length; b += 3) {
                    if (item.isitem == b) {
                        li[0].style.borderLeft = "1px solid #999"
                        li[0].style.borderRight = "1px solid #999"
                    }
                }

            }

            if (item.goodsId == "qw-123456") {
                changImg("qw-123456")
            }
            if (item.goodsId == "qw-621478") {
                changImg("qw-621478")
            }
            if (item.goodsId == "qw-785426") {
                changImg("qw-785426")
            }
            if (item.goodsId == "qw-258852") {
                changImg("qw-258852")
            }
            if (item.goodsId == "qw-741852") {
                changImg("qw-741852")
            }
            if (item.goodsId == "qw-789852") {
                changImg("qw-789852")
            }
            if (item.goodsId == "qw-785461") {
                changImg("qw-785461")
            }
            if (item.goodsId == "qw-356425") {
                changImg("qw-356425")
            }
            if (item.goodsId == "qw-951456") {
                changImg("qw-951456")
            }
        })
    }
}

$(".more").click(function () {
    alert("emmmm...还没做呢~~")
})

// 做搜索功能
$(".navipt").find("i").click(function () {
    // 先让预先加载的内容都消失
    $(".xiangqingul").html("")
    // 拿到输入的内容,不能一下搜多个关键词(如果做的话，让用户输入多个关键字时用逗号隔开，拿到之后切割，分别发送)
    let goodsMiaoshu1 = $(".navipt").find("input").val()
    // 发送搜索请求
    let http = new XMLHttpRequest()
    http.open("get", `http://192.168.31.192:8080/searchGoods?goodsMiaoshu1=${goodsMiaoshu1}&goodsMiaoshu2=${goodsMiaoshu1}&goodsMiaoshu3=${goodsMiaoshu1}&goodsMiaoshu4=${goodsMiaoshu1}&`)
    http.send()
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            let data = JSON.parse(http.responseText)
            // 代表是第几个好用来加样式
            let a = 0;
            // 循环
            data.forEach(item => {
                item.isitem = a
                a++
                function changImg(isgoods) {
                    // 克隆模板，放到页面，并对应图片
                    let li = $(".moban").clone(true)
                    li.removeClass("moban")
                    li.toggleClass(isgoods)
                    li.appendTo($(".xiangqingul"))
                    // 图片路径
                    li.find(".lidiv img")[0].srcset = item.goodsSrc
                    // 商品的描述
                    li.find(".miaoshuqq").html(item.goodsSort)
                    // 价格
                    li.find(".jiageqq").html(item.goodsPrice)
                    // 让1.4.7.10.13...的倍数的li拥有左右边框
                    for (let b = 1; b < data.length; b += 3) {
                        if (item.isitem == b) {
                            li[0].style.borderLeft = "1px solid #999"
                            li[0].style.borderRight = "1px solid #999"
                        }
                    }

                }
                // 循环，自动确定页面里有都少li，然后根据item.goodsId的不同，自动添加每个li里的内容(没有成功，只能这样了~~~要是商品太多的话，实在太麻烦，呜呜呜呜)
                if (item.goodsId == "qw-123456") {
                    changImg("qw-123456")
                }
                if (item.goodsId == "qw-621478") {
                    changImg("qw-621478")
                }
                if (item.goodsId == "qw-785426") {
                    changImg("qw-785426")
                }
                if (item.goodsId == "qw-258852") {
                    changImg("qw-258852")
                }
                if (item.goodsId == "qw-741852") {
                    changImg("qw-741852")
                }
                if (item.goodsId == "qw-789852") {
                    changImg("qw-789852")
                }
                if (item.goodsId == "qw-785461") {
                    changImg("qw-785461")
                }
                if (item.goodsId == "qw-356425") {
                    changImg("qw-356425")
                }
                if (item.goodsId == "qw-951456") {
                    changImg("qw-951456")
                }
            })
        }
    }
    // 让框里的话消失
    $(".navipt").find("input").val("")
})
// 回车
$(".navipt").find("input").keyup(function (event) {
    if (event.keyCode === 13) {
        $(".navipt").find("i")[0].click()
    }
})

// 点击添加到购物车，让用户去详情页
$(".addgouwuche").click(function () {
    alert("请点击图片转到详情页！呜呜~~")
})

// 点击图片和描述，跳转详情
$(".imgqq").click(function () {
    // 并且把点击的商品存进缓存，好让下一页知道是哪个
    let goodsId = $(this).closest("li").attr("class")
    // 通过id向服务器查询
    let http = new XMLHttpRequest()
    http.open("get", `http://192.168.31.192:8080/searchGoods?goodsId=${goodsId}`)
    http.send()
    http.onreadystatechange = function () {
        if(http.readyState === 4){
            let data = http.responseText
            // 先把isgoods清掉，确保只有一个
            localStorage.removeItem("isgoods")
            localStorage.setItem("isgoods",data)
            location.href = "http://192.168.31.192/bvbfanshop/xiangqingye.html"
        }
    }
})

// 购物车
$(".gouwuche").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop/gouwuche.html"
})