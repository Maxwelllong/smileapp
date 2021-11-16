const Koa = require('koa')
const Router = require('koa-router')
const path = require("path")
const mongoose = require('mongoose')
const fs = require("fs")
//实例化koa koa-router 
const app = new Koa()
const router = new Router()

router.get('/cateSub',async ctx =>{
    fs.readFile(path.join(__dirname,'../../category_sub.json'),function(err,data){
        if(err) return console.log('文件读取失败' + err.message);
        data = JSON.parse(data)
        let cateSub = mongoose.model('cateSub')
        data.RECORDS.map((value,index)=>{
            const newData = new cateSub(value)
            newData.save().then(()=>{
                console.log('写入文件成功');
            }).catch(()=>{
                console.log('写入文件失败');
            })
        })
    })
    ctx.body = '开始导入数据'
})


module.exports = router