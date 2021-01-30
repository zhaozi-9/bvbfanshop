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


// 点击导航栏去搜索也
$(".nav1-ul").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop/suoyouye.html"
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

// // 拿到物品图片的地址
// let xinXi = JSON.parse(localStorage.getItem("isgoods"))[0]
// // 放在页面里
// $(".goumaiwupinxinxi-img")[0].srcset = xinXi.goodsSrc.split(",")[0]
// // 商品名
// $(".gouwucheshangpinming").html(xinXi.goodsSort)
// // 商品编号
// $(".gouwucheshangpinbianhao").html(xinXi.goodsId)
// // 商品单价显示在页面
// $(".shangpindanjia").html(xinXi.goodsPrice + " ￥*")
// // 默认选中一个,总计里就是一个的价格
// $(".heji").html(xinXi.goodsPrice + " ￥*")
// let yunfei = $(".zongyunfeispan").html().split(" ￥*")[0]
// // 合计
// $(".zongzongjispan").html(Number(xinXi.goodsPrice) + Number(yunfei) + " ￥*")
// // 拿到刚进来时数量跟总价，显示在下面
// $(".zonghejispan").html(xinXi.goodsPrice + " ￥*")
// // 拿到用户输入的数量，正则验证一下只能是数字
// let reg = /^\d+$|^\d+[.]?\d+$/;
// // $("#gouwucheshuliang").blur(function(){
// //     if(reg.test(this.value)){
// //         // 将选择商品和数量存进数据库
// //         // 将小计算出来
// //       $(".heji").html(this.value * xinXi.goodsPrice + " ￥*")
// //     }
// // })
// $("#gouwucheshuliang")[0].oninput = function () {
//     if (reg.test(this.value)) {
//         // 将选择商品和数量存进数据库
//         // 将小计算出来
//         $(".heji").html(this.value * xinXi.goodsPrice + " ￥*")
//         let zongji = 0
//         // 合计，拿到所有小计的内容
//         let xiaojiList = $(".heji")
//         xiaojiList.each(item => {
//             zongji += Number(xiaojiList[item].innerHTML.split(" ￥*")[0])
//             $(".zonghejispan").html(zongji + " ￥*")
//             // 总计
//             $(".zongzongjispan").html(Number(yunfei) + Number(zongji) + " ￥*")
//         })
//     }
// }

// // 删除
// $(".noimg").click(function(){
//     if(confirm("确定删除吗？！？！！")){
//         $(".moban").remove()
//         $(".zonghejispan").html(0 + " ￥*")
//         $(".zongzongjispan").html(0 + " ￥*")
//         $(".jiezhagbut1")[0].style.display = "none"
//         $(".jinggao")[0].style.display = "block"
//         // 从数据库删除

//     }
// })

// 一进页面去购物车数据库查询,返回所有信息
$(".juxutianjia").click(function () {
    location.href = "http://192.168.31.192/bvbfanshop/suoyouye.html"
})



// 登录状态
if (sessionStorage.getItem("isLogin")) {
    let dianYou = localStorage.getItem("dianYou")
    let http = new XMLHttpRequest()
    http.open("get", `http://192.168.31.192:8080/selectShopping?dianYou="${dianYou}"`)
    http.send()
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            let data = JSON.parse(http.responseText)
            data.forEach(item => {
                // 根据信息将页面完善
                let oneInformation = $(".moban").clone(true).removeClass("moban")
                // 显示在页面
                $(".jiezhagbut1").after(oneInformation)
                // 完善信息
                oneInformation.find(".gouwucheshangpinbianhao").html(item.goodsId)
                oneInformation.find(".gouwucheshangpinming").html(item.goodsSort)
                oneInformation.find(".shangpindanjia").html(item.goodsPrice + " ￥*")
                oneInformation.find(".goumaiwupinxinxi-img")[0].srcset = item.goodsSrc.split(",")[0]
                oneInformation.addClass("newItem")
                oneInformation.find(".heji").html(oneInformation.find("#gouwucheshuliang").val() * parseFloat(oneInformation.find(".shangpindanjia").html()))
            })
            //改变合计和总计
            $("body")[0].oninput = function (event) {
                let _this = event.target
                if (_this.id === "gouwucheshuliang") {
                    let count = $(_this).closest(".yitiaoshangpin").find("#gouwucheshuliang").val()
                    let oneprice = parseFloat($(_this).closest(".yitiaoshangpin").find(".shangpindanjia").html())
                    $(_this).closest(".yitiaoshangpin").find(".heji").html(count * oneprice + " ￥*")
                    changeALLprice()
                }
            }
            //删除事件
            $("body")[0].onclick = function (event) {
                let _this = event.target
                if (_this.className === "noimg") {
                    if (confirm("确定要删除吗？")) {
                        $(_this).closest(".yitiaoshangpin").remove()
                        changeALLprice()
                        // 在数据库里删除
                        let goodsId = $(_this).closest(".yitiaoshangpin").find(".gouwucheshangpinbianhao").html()
                        let http = new XMLHttpRequest()
                        http.open("get", `http://192.168.31.192:8080/deleteCart?goodsId=${goodsId}`)
                        http.send()
                        http.onreadystatechange = function () {
                            if (http.readyState === 4) {
                                console.log(http.responseText )
                                if (http.responseText === "error") {
                                    console.log("error")
                                }
                                else {
                                    console.log("success")
                                }
                            }
                        }
                    }
                }
            }

        }
    }

}

// 合计
// 就是数量*单价，让他改的时候就改，
// console.log($("#gouwucheshuliang"))
// $("#gouwucheshuliang").blur = function () {
//     let danJia = Number($(".shangpindanjia").html().split(" ￥*"))
//     console.log(danJia)
//     let count = Number($("#gouwucheshuliang").val())
//     console.log(count)
// }

//改变总计的函数
function changeALLprice() {
    let newItems = document.getElementsByClassName("newItem")
    let prices = 0
    for (let i = 0; i < newItems.length; i++) {
        prices = prices + parseFloat($(newItems[i]).find(".heji").html())
    }
    $(".zongzongjispan").html(prices)
}


// 结账
$(".jiezhagbut2").click(function(){
    alert("完结撒花，都送给您啦~~~")
})