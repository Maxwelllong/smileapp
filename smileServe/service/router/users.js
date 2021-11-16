const Router = require("koa-router")
const router = new Router()
const mongoose = require('mongoose')

//登录页面
router.post('/login',async ctx =>{
    // 获取到前端传递过来的数据
    const loginUser = ctx.request.body
    console.log(loginUser);
    //获取前端传递过来的用户名和密码
    const userName = loginUser.userName
    const password = loginUser.password
    //引入user的model
    const User = mongoose.model('User')
    await User.findOne({userName:userName}).exec().then(async res => {
        console.log(res);
        if(res){
            let newUser = new User() 
            await newUser.comparePassword(password,res.password)
            .then( isMatch =>{
                ctx.body = {
                    state:200,
                    message:isMatch
                }
            })
            .catch( error =>{ 
                console.log('匹配不成功');
                console.log(error);
            })
        }else{
            ctx.body ={
                state:500,
                message:'用户名不存在'
            }
        }
    }).catch(err =>{
        console.log(err);
        ctx.body = {
            state:500,
            message:error
        }
    })
})
//注册页面
router.post('/register',async ctx => { 
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    await newUser.save().then(()=>{
        ctx.body = {
            state:200,
            message:'注册成功'
        }
    }).catch(err =>{
        ctx.body = {
            state:500,                  
            message:err
        }
    })

})




module.exports = router 