const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const objectId = Schema.Types.objectI

const categorySub = new Schema({
    "ID": String,
    "MALL_CATEGORY_ID": {unique:true,type:Number},
    "MALL_SUB_NAME": String,
    "COMMENTS": String,
    "SORT": Number
})

 
mongoose.model('cateSub',categorySub)