//1.引入koa koa-router 
const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const {bcryptjs} = require("bcryptjs")
const user = require("./service/router/users.js")
const goods = require('./service/router/goods.js')
const category = require('./service/router/category.js')
const cateSub = require('./service/router/categorySub.js')
// 下载 npm i body-parser -S
const bodyParser = require('koa-bodyparser')
// 后端解决跨域
const cors = require('koa2-cors')



//2.实例化koa 及koa-router 
const app = new koa()
const router = new Router()
 

//6.实现路由
router.get('/',async ctx=>{
    ctx.body = {
        msg:'hello koa'
    }
})

router.use('/user',user.routes())
router.use('/goods',goods.routes())
router.use('/category',category.routes())
router.use('/cateSub',cateSub.routes())

app.use(bodyParser())
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))

// 7.连接MongoDB数据库
const {connect, initSchema} = require('./service/database/init.js');
(async ()=>{
    await connect()
    initSchema()
})()

//3.配置路由
app.use(router.routes())
app.use(router.allowedMethods())

//4.配置端口
const port = process.env.PORT || 3000 ;

//5.配置监听端口
app.listen(port)
console.log(`service is running http://127.0.0.1:${port}`);