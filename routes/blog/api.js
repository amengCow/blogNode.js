//登录和获取个人信息的api 集合
const express=require('express');
const pool=require('../../pool.js');
var multer  = require('multer')
let router=express.Router();
var upload = multer({ dest: 'upload/' });
router.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    res.send({ret_code: '0'});
});

//获取留言
router.get("/getmsg",(req,res)=>{
    let sql = 'SELECT * FROM msg';
    pool.query(sql,function(err,result){
        if(err) throw err;
        console.log(result);
        res.send({'code':1,'data':result});
    })
});
//删除留言
router.get("/deletemsg",(req,res)=>{
    let sql = 'DELETE FROM msg WHERE id = ?';
    pool.query(sql,[req.query.id],function(err,result){
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({'code':1,'data':'删除成功'});
        }else{
            res.send({'code':0,'data':'删除失败'});
        }
    })
});
//增加留言
router.post("/addmsg",(req,res)=>{
    let obj = req.body;    
    let sql = 'INSERT INTO msg (name,time,content,praise,photo) VALUES (?,?,?,?,?)'
    pool.query(sql,[obj.name,obj.time,obj.content,0,obj.photo],function(err,result){
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({'code':1,'data':'修改成功'});
    }else{
        res.send({'code':0,'data':'修改失败'});
    }
       })
    
  })
//获取个人信息
router.get("/info",(req,res)=>{
    let sql = 'SELECT * FROM myinfo';
    pool.query(sql,function(err,result){
        if(err) throw err;
        res.send({'code':1,'data':result[0]});
    })
});
//修改个人信息
router.post("/updata",(req,res)=>{
    let obj = req.body;
    let sql;
    if(obj.name != undefined){
        sql = 'UPDATE myinfo SET name = ?,hobby = ?,site = ?,ana = ?,else_ = ?';
        pool.query(sql,[obj.name,obj.hobby,obj.site,obj.ana,obj.else_],function(err,result){
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({'code':1,'data':'修改成功'});
            }else{
                res.send({'code':0,'data':'修改失败'});
            }
        })
    }else{
        obj=obj.join("|");
        sql = 'UPDATE myinfo SET wishes = ?';
        pool.query(sql,[obj],function(err,result){
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({'code':1,'data':'修改成功'});
            }else{
                res.send({'code':0,'data':'修改失败'});
            } 
        })
    }
    
});
//增加赞
router.get("/addzan",(req,res)=>{
    let sql = 'UPDATE msg SET praise=praise+1 WHERE id=?';
    pool.query(sql,[req.query.id],function(err,result){
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:"ok"});
          }
    })
});
//增加文章
router.post("/addessay",(req,res)=>{
    let obj = req.body;   
    let sql = "INSERT INTO essay (title,content,browse,time,url) VALUES (?,?,?,?,md5(?))";
    pool.query(sql,[obj.title,obj.content,0,obj.time,obj.time+obj.title],function(err,result){
      if(err) throw err;
        res.send({'code':1,'data':result[0]});
    })
    
  })

//获取文章
router.get("/getessay",(req,res)=>{
    if(req.query.url){
        let sql = 'SELECT * FROM essay WHERE url = ?';
         pool.query(sql,[req.query.url],function(err,result){
        if(err) throw err;
        res.send({code:1,data:result});
    })
    }else{
        let sql = 'SELECT * FROM essay';
         pool.query(sql,function(err,result){
        if(err) throw err;
        res.send({code:1,data:result});
    })
    }
    
   
});

module.exports=router;