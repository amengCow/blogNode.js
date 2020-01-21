const express=require('express');
const pool=require('../pool.js')
let router=express.Router();
//登陆用户  --待完善
router.post("/login",(req,res)=>{
  let obj = req.body;
  console.log(obj.uname);
  pool.query('SELECT * FROM dc_user',function(err,result){
    if(err) throw result;
     })
  res.send('222');
})
//注册接口
router.post("/reg",(req,res)=>{
  let obj = req.body;
  console.log(obj);
  let sql = 'INSERT INTO dc_user (uname,upwd,unickname) VALUES (?,?,?)'
  pool.query(sql,[obj.uname,obj.upwd,obj.nickname],function(err,result){
    if(err) throw result;
      console.log(result);
     })
  res.send('222');
})



module.exports=router;