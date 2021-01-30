
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

// 购物车
$(".gouwuche").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop/gouwuche.html"
})
// 二级导航
// let nav1Ul = $(".nav1-ul")
// let nav1liList = $(".nav1-li")
// let navImglist = $(".nav2-right img")
// // 移入一级导航li,让二级导航出现，并且对应图片
// nav1Ul.mouseenter(function () {
//     $(".nav2").removeClass("nav2-0")
//     for (let a = 0; a < nav1liList.length; a++) {
//         nav1liList[a].onmouseenter = function () {
//             for (let b = 0; b < navImglist.length; b++) {
//                 if (a === b) {
//                     b++
//                     navImglist.css({
//                         "display": "none"
//                     })
//                     navImglist[a].style.display = "inline-block"
//                 }
//             }
//         }
//     }
// })
// 移出nav2盒子消失
// $(".navzhezhao").mouseout(function () {
//     $(".nav2").addClass("nav2-0")
// })


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

// 第一个轮播图 一个图片的宽度是1898px ,有四张（n）

// 轮播
let n = 0; //记录现在在第几张
let liList = $(".bannerul li")
let banul = $(".bannerul")
let yuanul = $("#yuanul")[0]
let butList = $(".bannerul li button")
// 变化的逻辑
function changeImg() {
    // 图片的变化
    banul.animate({
        marginLeft: -(n * 1898)
    })
    //小圆点的变化
    yuanliList.removeClass("focus");
    yuanliList.eq(n).addClass("focus");
    // 按钮的变化
    butList.animate({
        marginLeft: -(n * 1898)
    })
}

//向右
$(".rimg").click(function () {
    if (n < liList.length - 1) {
        n++
    } else {
        n = 0
    }
    changeImg()
})
//向左
$(".limg").click(function () {
    if (n === 0) {
        n = liList.length - 1
    } else {
        n--
    }
    changeImg()
})
// 小圆点
for (let a = 0; a < liList.length; a++) {
    let lis = document.createElement("li")
    // 默认第一个
    if (a === 0) {
        lis.className = "focus"
    }
    yuanul.appendChild(lis)
}
// 小圆点的点击
let yuanliList = $("#yuanul li")
yuanliList.click(function () {
    // console.log(this) 点击的li
    // console.log($(this).index()) 相对于其他li 在ul 里的位置
    n = $(this).index();
    changeImg()
})

// 第二个轮播图
// 轮播
let n2 = 0; //记录现在在第几张
let liList2 = $(".bannerul2 li")
let banul2 = $(".bannerul2")
let yuanul2 = $("#yuanul2")[0]
let butList2 = $(".bannerul2 li button")
// 变化的逻辑
function changeImg2() {
    // 图片的变化
    banul2.animate({
        marginLeft: -(n2 * 1898)
    })
    //小圆点的变化
    yuanliList2.removeClass("focus");
    yuanliList2.eq(n2).addClass("focus");
    // 按钮的变化
    butList2.animate({
        marginLeft: -(n2 * 1898)
    })
}

//向右
$(".rimg2").click(function () {
    if (n2 < liList2.length - 1) {
        n2++
    } else {
        n2 = 0
    }
    changeImg2()
})
//向左
$(".limg2").click(function () {
    if (n2 === 0) {
        n2 = liList2.length - 1
    } else {
        n2--
    }
    changeImg2()
})
// 小圆点
for (let a = 0; a < liList2.length; a++) {
    let lis2 = document.createElement("li")
    // 默认第一个
    if (a === 0) {
        lis2.className = "focus"
    }
    yuanul2.appendChild(lis2)
}
// 小圆点的点击
let yuanliList2 = $("#yuanul2 li")
yuanliList2.click(function () {
    // console.log(this) 点击的li
    // console.log($(this).index()) 相对于其他li 在ul 里的位置
    n2 = $(this).index();
    changeImg2()
})


// 最后一个商品展示（商品小图），有很多 一栏四个，只能向右，点一下动一个
let n3 = 0 // 记录最左边是第几张
let shangpinxiao2ul = $(".shangpinxiao2ul")
let xiao2liList = $(".shangpinxiao2ul li")
// 变化的逻辑
function changexiao2Img() {
    // 图片的变化
    shangpinxiao2ul.animate({
        marginLeft: -(n3 * 319.5)
    })
}
$(".shangpinxiao2right").click(function () {
    // 因为一开始页面就有四个li ,每次只移动一格
    if (n3 < xiao2liList.length - 4) {
        n3++
    } else {
        n3 = 0
    }
    changexiao2Img()
})

// 点击ren按钮跳转登录
$(".ren").click(function(){
    // location.href = "http://192.168.31.192/bvbfanshop/denglu.html"
    // 让隐藏的盒子显示
    $(".rensanjiao")[0].style.display = "block"
    $(".denglu1")[0].style.display = "block"
    // 点击登录/注册，转到注册页面
    $(".denglubut").click(function(){
        location.href = "http://192.168.31.192/bvbfanshop/dengluhuozhuce.html"
    })
})

// 点击导航栏去搜索也
$(".nav1-ul").click(function(){
    location.href = "http://192.168.31.192/bvbfanshop/suoyouye.html"
})