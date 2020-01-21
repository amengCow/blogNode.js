const express=require('express');
const session = require('express-session');
const pool=require('../../../pool.js');
const http=require('http');
const querystring = require("querystring");
const router=express.Router();
var code ;
router.use(session(
{secret: '社会气息',resave: true,
saveUninitialized: true,//保存初始数据
}));
// cookie: {maxAge: 60000}
//登录接口
router.post("/send",(req,res)=>{
    let obj = req.body; 
    let sql = 'SELECT * FROM admin WHERE user = ?';
    let phone=""; 
    code= Math.random().toFixed(6).slice(-6);
    pool.query(sql,obj.user,function(err,result){
      if(err) throw result;
      if(result.length>0){
          if(obj.pwd==result[0].pwd){
            req.session.user = result[0].user;
            phone=result[0].phone;
            //发送code
            const postData = "mobile="+phone+"&param=code:"+code+"&tpl_id=TP2001111";
            const options = {
                hostname: 'dingxin.market.alicloudapi.com',
                port: 80,
                path: '/dx/sendSms',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization':'APPCODE 2deaf297fdf0475bab12b06cc9d153ae'
                }
            };
            const SendcodeReq = http.request(options, (SendCodeRes) => {
                SendCodeRes.setEncoding('utf8');
                SendCodeRes.on('data', (chunk) => {
                    chunk=JSON.parse(chunk);
                    if(chunk.return_code=="00000"){
                         let ycphone = getphone(phone);
                         res.send({code:3,phone:ycphone,data:"验证码发送成功"});
                    }else{
                         res.send({code:-1,data:"验证码发送失败"});
                       
                    }
                 });
                SendCodeRes.on('end', () => {
                // console.log('响应中已无数据');
                });
            });
            SendcodeReq.on('error', (e) => {
                // console.error(`请求遇到问题: ${e.message}`);
                res.send({code:-1,data:"验证码发送失败"});
                       
            });
            
            // 将数据写入请求主体。
            SendcodeReq.write(postData);
            SendcodeReq.end();
          }else {
            res.send({code:0,data:"用户名或者密码错误"});
            return
          }
      }else {
        res.send({code:0,data:"用户名或者密码错误"});
        return
      }
       })
    
  });
  //测试是否登录接口

  router.get("/login",(req,res)=>{
    if(req.session.login == true){
        res.send({code:2,data:"欢迎回来"});    
    }else{
        res.send({code:0,data:"请登录"});
    }
})
router.post("/login",(req,res)=>{
    let obj = req.body; 
    if(req.session.user==obj.user&&obj.code==code){
        req.session.login =true;
        res.send({code:1,data:"登录成功"});
    }else{
        res.send({code:-3,data:"验证码错误"});
    }
  
})
    
 

router.get("/get",(req,res)=>{
    let sql = 'SELECT * FROM myinfo';
    pool.query(sql,function(err,result){
        if(err) throw err;
        res.send({'code':1,'data':result[0]});
    })
});
function getphone(str){
    let phone = ''
    for( let temp in str){
        if(temp>=3 && temp<=6){
            phone = phone + '*';
        }else{
            phone = phone + str[temp].toString();
        }
        
    }
    return phone ;
}
module.exports=router;