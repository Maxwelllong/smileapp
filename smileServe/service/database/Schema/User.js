const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型



//创建我们的用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }

})


//npm i bcryptjs -S
const bcrypt = require('bcryptjs')
const mi = 10
userSchema.pre('save',function(next){
    bcrypt.genSalt(mi,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})
userSchema.methods = {
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMactch)=>{
                if(!err) resolve(isMactch)
                else reject(err)
            })
        })
    }
}


//发布模型
mongoose.model('User', userSchema)