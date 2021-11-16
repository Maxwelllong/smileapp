const fs = require('fs')
const path  = require("path")
const mongoose = require('mongoose')
const Koa = require('koa')
const Router = require('koa-router')


const router = new Router()
const app = new Koa()

router.get('/insertCategorys',async ctx =>{
    fs.readFile(path.join(__dirname,'../../category.json'),'utf8',(err,data)=>{
        if(err) return console.log('读取文件失败'+err);
        data = JSON.parse(data)
        const Category =mongoose.model('category')
        data.RECORDS.map((value,index)=>{
            let newData = new Category(value)
            newData.save().then(()=>{
                console.log('读取成功');
            }).catch(()=>{
                console.log('读取失败' );
            })
        })
    })
    ctx.body = '开始导入'
})

module.exports = router


  