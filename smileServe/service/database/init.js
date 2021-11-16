const mongoose = require('mongoose')
const db = "mongodb://127.0.0.1:27017/SmileDB"


const glob = require('glob')
const { resolve } = require('path')

exports.initSchema = ()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

mongoose.Promise = global.Promise

exports.connect = () => {
    //连接数据库
    mongoose.connect(db)

    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        //增加数据库连接的事件监听
        mongoose.connection.on('disconnected', () => {
            if(maxConnectTimes <= 3){
                maxConnectTimes++
                //进行重连
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库存在错误，请手动修改')
            }
            
        })

        //数据库出现错误的时候
        mongoose.connection.on('error', err => {
            if(maxConnectTimes <= 3){
                maxConnectTimes++
                //进行重连
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库存在错误，请手动修改')
            }
        })

        //链接打开的时候
        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected successfully!')
            resolve()
        })
    })


}
//
