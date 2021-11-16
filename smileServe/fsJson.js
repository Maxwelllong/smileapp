const fs = require('fs')

fs.readFile('./goods.json','utf8',function(err,data){
    let i = 0
    let pushData = [] 
    let newData = JSON.parse(data)
    newData.RECORDS.map((value,err)=>{
        if(value){
            if(value.IMAGE1){
                pushData.push(value)
                i++
            }
            
        }else if(err){
            console.log('文件读取失败');
        }
    })
    fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
        // if(err) console.log('文件写入失败')
        // else{
        //     console.log('文件写入成功');
        // }
        err ? console.log('文件写入失败') : console.log('文件写入成功');
    })
})

