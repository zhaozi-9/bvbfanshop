// 引入
let express = require("express")();
let mysql = require("mysql");
const port = 8080;

// Node解决跨域问题
express.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

// 规划mysql链接
let sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "xiangmu",
    timezone: "08:00"
})

// 尝试链接
sql.connect();

// 注册接口，向数据库添加用户输入用户信息
express.get("/addUser", (request, response) => {
    // request.query 是一个对象
    let sex = request.query.sex;
    let name = request.query.name;
    let xing = request.query.xingShi;
    let dianYou = request.query.dianYou;
    let miMa = request.query.miMa;
    let dianHua = request.query.dianHua;
    let jdAndMp = request.query.jdAndMp;
    let youBian = request.query.youBian;
    let shi = request.query.shi;

    if (sex && name && xing && dianYou && miMa && dianHua && jdAndMp && youBian && shi) {
        // 向数据库添加
        sql.query(`INSERT INTO itemUsers (sex,name,xing,dianYou,miMa,dianHua,jdAndMp,youBian,shi) VALUES ("${sex}","${name}","${xing}","${dianYou}","${miMa}","${dianHua}","${jdAndMp}","${youBian}","${shi}")`, (error) => {
            if (error) {
                console.log(error);
                response.send("error")
            }
            else {
                response.send(`success`)
            }
        })
    }
})

// 登录接口
express.get("/login", (request, response) => {
    // request.query 是一个对象
    let dianYou = request.query.dianYou;
    let miMa = request.query.miMa;

    // 在数据库查询
    sql.query(`SELECT * FROM itemUsers WHERE dianYou="${dianYou}" AND miMa="${miMa}"`, (error, data) => {
        if (error) {
            console.log(error);
            response.send("error")
        }
        else {
            if (!data.length) {
                response.send("error")
            }
            else {
                response.send("success")
            }
        }
    })
})

// 获取当前登录用户数据接口
express.get("/getUsers", (request, response) => {
    let dianYou = request.query.dianYou;
    let miMa = request.query.miMa
    // 通过邮箱和密码查询用户数据
    sql.query(`SELECT * FROM itemUsers WHERE dianYou ="${dianYou}" AND miMa="${miMa}"`, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})

// 修改姓名、性别
express.get("/updateUsers", (request, response) => {
    // 获取到前端传送的参数
    const sex = request.query.sex
    const name = request.query.name
    const xing = request.query.xing
    const dianYou = request.query.dianYou
    // 判断是否非空 
    if (sex && name && sex && dianYou) {
        // 操作数据库
        // 	UPDATE 表名 SET 字段名="新值",字段名="新值" WHERE 字段名="某值"
        sql.query(`UPDATE itemUsers SET sex="${sex}", name="${name}" , xing="${xing}" WHERE dianYou="${dianYou}"`, (error) => {
            if (error) {
                console.log(error)
                response.send("error")
            }
            else {
                response.send("success")
            }
        })
    }
    else {
        response.send("error")
    }
})

// 更改电子邮箱地址
express.get("/updateDianYou", (request, response) => {
    // 获取到前端传送的参数
    const xinDianYou = request.query.xinDianYou
    const miMa = request.query.nowMiMa
    const dianHua = request.query.dianHua

    // 判断是否非空 
    if (xinDianYou && miMa && dianHua) {
        // 操作数据库
        // 	UPDATE 表名 SET 字段名="新值",字段名="新值" WHERE 字段名="某值"
        sql.query(`UPDATE itemUsers SET dianYou="${xinDianYou}", miMa="${miMa}" WHERE dianHua="${dianHua}"`, (error) => {
            if (error) {
                console.log(error)
                response.send("error")
            }
            else {
                response.send("success")
            }
        })
    }
    else {
        console.log(error)
        response.send("error")
    }
})

// 更改密码
express.get("/updateMiMa", (request, response) => {
    // 获取到前端传送的参数
    const xinMima = request.query.xinMima
    const dangQianMima = request.query.dangQianMima

    // 没有做用户名跟密码是否一致的验证，本来的想法是：从前端发送来用户名和密码，根据用户名和密码两条数据找到一条记录，从而改变里面的密码字段，但是没有成功呢 =_=||;
    // 判断是否非空 
    if (xinMima && dangQianMima) {
        // 操作数据库
        // 	UPDATE 表名 SET 字段名="新值",字段名="新值" WHERE 字段名="某值"
        sql.query(`UPDATE itemUsers SET miMa="${xinMima}" WHERE miMa="${dangQianMima}"`, (error) => {
            if (error) {
                console.log(error)
                response.send("error")
            }
            else {
                response.send("success")
            }
        })
    }
    else {
        console.log(error)
        response.send("error")
    }
})

// 获取商品列表
express.get("/getGoods", (request, response) => {
    // 查询goodslist表
    sql.query(`SELECT * FROM goodslist`, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})

// 搜索
express.get("/searchGoods", (request, response) => {

    // 参数
    let goodsMiaoshu1 = request.query.goodsMiaoshu1
    let goodsMiaoshu2 = request.query.goodsMiaoshu2
    let goodsMiaoshu3 = request.query.goodsMiaoshu3
    let goodsMiaoshu4 = request.query.goodsMiaoshu4
    let goodsId = request.query.goodsId
    // 	SELECT * FROM 表名 WHERE 字段名="某值" OR 字段名="某值"
    let s = `SELECT * FROM goodslist WHERE goodsMiaoshu1="${goodsMiaoshu1}" OR goodsMiaoshu2="${goodsMiaoshu2}" OR goodsMiaoshu3="${goodsMiaoshu3}" OR goodsMiaoshu4="${goodsMiaoshu4}" OR goodsId="${goodsId}"`
    sql.query(s, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})

// 向shopping表内添加数据，代表客户已经购买
express.get("/addshopping", (request, response) => {
    // request.query 是一个对象
    let goodsId = request.query.goodsId;
    let goodsSize = request.query.goodsSize;
    let goodsXingMing = request.query.goodsXingMing;
    let goodsHaoMa = request.query.goodsHaoMa;
    let dianYou = request.query.dianYou;
    let goodscount = request.query.goodscount
    if (goodsId && goodsSize && goodsXingMing && dianYou && goodsHaoMa && goodscount) {
        // 向数据库添加
        sql.query(`INSERT INTO shopping (goodsId,goodsSize,goodsXingMing,goodsHaoMa,dianYou,goodscount) VALUES ("${goodsId}","${goodsSize}","${goodsXingMing}","${goodsHaoMa}","${dianYou}","${goodscount}")`, (error) => {
            if (error) {
                console.log(error);
                response.send("error")
            }
            else {
                response.send(`success`)
            }
        })
    }
})

// 查询shopping所有信息
express.get("/selectShopping", (request, response) => {
    let dianYou = request.query.dianYou
    // 查询goodslist表
    sql.query(`select b.* from shopping a, goodslist b
    where a.goodsId = b.goodsId
      and dianYou=${dianYou}`, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})

// 在shopping里删除
//删除
express.get("/deleteCart", (req, res) => {
    let goodsId = req.query.goodsId
    console.log(goodsId)
    sql.query(`DELETE FROM shopping WHERE goodsId="${goodsId}"`, (error) => {
        if (error) {
            console.log(error)
            res.send("error")
        }
        else {
            res.send("success")
        }
    })
})

// 运行在port端口
express.listen(port)
console.log("server is running at " + port)
