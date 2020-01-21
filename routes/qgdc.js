const express=require('express');
let router=express.Router();
var tb;
const https = require('https');
const chinaTime = require('china-time');

const options = {
  hostname: 'activity.dossen.com',
  port: 443,
  path: '/general/initIateOrder',
  method: 'POST',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1278.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2875.116 Safari/537.36 NetType/WIFI MicroMessenger/7.0.5 WindowsWechat',
    'Content-Type': 'application/json',
  }
};


router.get("",(reqq,ress)=>{
  var spid=reqq.query.id
 
  var sum="";
  var is = 0;
  for(var i=0;i<=1000;i++){
    const req = https.request(options, (res) => {
      //console.log(`状态码: ${res.statusCode}`);
     // console.log(`响应头: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        sum+=`小主您的抢购数据:${chinaTime('HH:mm:ss')+chunk}`+`<br>`;
        is++;
        console.log(sum);
        //fs.appendFile('./zssj.txt',uname+'----'+upwd+'----'+chunk+'\r\n',/(err)=>{
        //  if (err) throw err;
        //})
      });
      res.on('end', () => {
           
      });
    });
    
    req.on('error', (e) => {
      console.error(`请求遇到问题: ${e.message}`);
    });
    // 将数据写入请求主体。
    var postData=`{"order":{"orderChannel":"108","payChannel":"WX","payer":"a2937448-e80f-46da-99a3-97fbed0f3693","title":"100元优惠券包","totalFee":1},"productOrder":{"address":"","cardNo":"","guestName":"丁雪婷","oldCardNo":"a2937448-e80f-46da-99a3-97fbed0f3693","openId":"a2937448-e80f-46da-99a3-97fbed0f3693","price":1,"productId":${spid},"quantity":1}}`;
    req.write(postData);
    req.end();
   }
 var dsq = setInterval(function(){
  if (is>=800) {
    //console.log(sum);
    
    ress.send(sum);
    clearInterval(dsq);
  }
 // console.log(is);
 },100)
 

});
module.exports=router;