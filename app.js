const express=require('express');
const cors = require('cors');
const fs=require('fs');
const app=express();
const bodyParser=require('body-parser')
const liuyanRoutes=require('./routes/liuyan.js');
const blogRoutes=require('./routes/blog/api.js');
const blogAdminRoutes=require('./routes/blog/admin/adminApi.js');
app.use(cors({
  //允许:脚手架访问服务器
  origin:["http://127.0.0.1:8080","http://127.0.0.1:8081","http://localhost:8080","http://127.0.0.1:5501","https://youyuanmeng.com","https://www.youyuanmeng.com","https://admin.youyuanmeng.com"],
  //每次请求加验证
  credentials:true
}));
app.listen(3000);
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use('/liuyan',liuyanRoutes);
app.use('/blog',blogRoutes);
app.use("/blogAdmin",blogAdminRoutes)
