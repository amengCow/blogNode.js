const express = require('express');
const pool=require('../pool.js');
var router = express.Router();

 router.post('/reg',function(req,res) {
 	let obj=req.body;
 	console.log(obj);
 	if (!obj.uname) {
 		res.send({code:401,msg:"uname not null"});
 		return;
 	};
 	if (!obj.upwd) {
 		res.send({code:402,msg:"upwd not null"});
 		return;
 	};
 	if (!obj.email) {
 		res.send({code:403,msg:"email not null"});
 		return;
 	};
 	if (!obj.phone) {
 		res.send({code:405,msg:"phone not null"});
 		return;
 	};

 	pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
 		if (err) throw err;
 		console.log(result);

 	})
 	res.send('注册成功');
 })
 router.post('/login',function(req,res) {
 	let obj=req.body;
 	console.log(obj);
 	if (!obj.uname) {
 		res.send({code:401,msg:"uname not null"});
 		return;
 	};
 	if (!obj.upwd) {
 		res.send({code:402,msg:"upwd not null"});
 		return;
 	};
 	console.log([obj[0],obj[1]]);
	pool.query('SELECT * FROM xz_user WHERE uname=? and upwd=?',[obj.uname,obj.upwd],function(err,result){
 		if (err) throw err;
 		if (result.length>0) {
 			res.send('登陆成功');
 				return;
 		}else{
 			res.send({code:301,msg:"用户名或者密码错误"});
 		return;
 		}
 		console.log(result[0]);
 	 

 	})
 	
 })
router.get('/detail',function(req,res) {
	let obj =req.query;
	console.log(obj);
	if (!obj.uid) {
		res.send({code:301,msg:'eid not null' });
		return;
			}
	pool.query("SELECT * FROM xz_user WHERE uid=?",[obj.uid],function(err,result) {
		 if (err)throw err;
		 console.log({code:200,msg:result[0]});
		 if (result.length>0) {
		 	res.send(result);
		 }else{
		 	res.send({code:301,msg:'cannot eid ' });
		 }
	});
});
var i=400;
router.post('/update',function(req,res) {
	let obj = req.body;
	console.log(obj);
	for(var temp in obj ){
		i++;
		 
		console.log(obj[temp]);
		if(!obj[temp]){
			res.send({code:i,msg:temp+'不能为空'});
			return; 
		}
		pool.query("UPDATE xz_user SET ? where uid = ?",[obj,obj.uid],function(err,result) {
			if (err) throw err;
			console.log(result);
		});
	}
})
router.get('/update',function(req,res) {
	let obj = req.query;
	console.log(obj);
	for(var temp in obj ){
		i++;
		 
		console.log(obj[temp]);
		if(!obj[temp]){
			res.send({code:i,msg:temp+'不能为空'});
			return; 
		}

		pool.query("UPDATE xz_user SET ? where uid = ?",[obj,obj.uid],function(err,result) {
			if (err) throw err;
			console.log(result);
		});
	}
})
router.get('/delete',function(req,res) {
	let obj = req.query;
	console.log(obj);
	for(var temp in obj ){
		i++;
		console.log(obj[temp]);
		if(!obj[temp]){
			res.send({code:i,msg:temp+'不能为空'});
			return; 
		}
  
		pool.query("DELETE FROM xz_user WHERE uid = ?",[obj.uid],function(err,result) {
			if (err) throw err;
			console.log(result);
			if (result.affectedRows===1) {
				res.send('删除成功');
			}
			
		});
	}
})









 module.exports=router;