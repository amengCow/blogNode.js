const express=require('express');
const pool=require('../pool.js')
let router=express.Router();
//插入
router.post("/add",(req,res)=>{
  let obj = req.body;
  console.log() 
  var sql = "INSERT INTO liuyan (content,byname,bydate)VALUES(?,?,?);"
  pool.query(sql,[obj.content,obj.byname,obj.bydate],function(err,result){
    console.log(result);
    if(err){
      res.send("error");
    }else{
        res.send("ok");
    }  
     })
 
})
//查询
router.get("/read",(req,res)=>{
  let sql = 'SELECT * FROM liuyan'
  pool.query(sql,function(err,result){
    res.send(result)
  })
  
})



module.exports=router;