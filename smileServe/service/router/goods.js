//1.引入koa及路由
const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require("fs")
const path = require('path')

//2.实例化路由及koa
const app = new Koa()
const router = new Router()

router.get('/insertALLGoods', async ctx => {
    fs.readFile(path.join(__dirname,'../../newGoods.json'), 'utf8', function (err, data) {
        if (err) return console.log('读取文件失败：' + err.message)
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods') 
        data.map((value, index) => {
            // console.log(value);
            let newData = new Goods(value)  //将数据写入到MongoDB中
            newData.save().then(() => {     //执行写入
                saveCount++
                console.log('成功' + saveCount);
            }).catch(err => { 
                console.log('失败' + err);
            })
        })
    })
    ctx.body = '开始导入数据'
})

router.post('/goodsinfo',async ctx =>{
    const goodsId = ctx.request.body.goodsId
    let goods = mongoose.model('Goods')
    await goods.findOne({ID:goodsId}).exec()
    .then(result =>{
        ctx.body = {
            code:200,
            message:result
        }
    })
    .catch(error =>{
        ctx.body = {
            code:500,
            message:error
        }
    })
})

//获取大类商品信息
router.get('/goodslist',async ctx => {
    let goodslist = mongoose.model('category')
    await goodslist.find().exec()
    .then( result =>{
        ctx.body = {
            code:200,
            message:result
        }
    }) 
    .catch(error => {
        ctx.body = {
            code:500,
            message:error
        }
    })
})

//获取小类商品列表信息
router.post('/goodssublist',async ctx=>{
    console.log(ctx.request.body);
    let categoryId = ctx.request.body.categoryId
    const goodssublist = mongoose.model('cateSub')
    await goodssublist.find({MALL_CATEGORY_ID:categoryId}).exec()
    .then(result => {
        ctx.body = {
            code:200,
            message:result
        }
    })
    .catch(error =>{
        ctx.body = {
            code:500,
            message:error
        }
    })
})

//根据category获取小类数据
router.post('/getcategorySubId',async ctx =>{
    console.log(ctx.body);
    let goodsSubId = ctx.request.body.categoryId
    let page = ctx.request.body.page
    console.log(ctx.request.body);
    // console.log(goodsSubId);
    let num = 10 //每一页显示内容数量
    let start = (page - 1)*num //开始页面
    let goods = mongoose.model('Goods')
    await goods.find({SUB_ID:goodsSubId}).skip(start).limit(num).exec()
    .then(result =>{
        ctx.body = {
            code:200,
            message:result
        }
    })
    .catch(error =>{
        ctx.body = {
            code:500,
            message:error
        }
    })
})

module.exports = router  
