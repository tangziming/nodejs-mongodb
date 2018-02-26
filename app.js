//加载express模块
var express =require('express');
//加载模版处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser，用来处理post提交的数据
var bodyparser =require('body-parser');

//创建app ->       nodejs   http.creatServer();
var app= express();



//配置应用模版
//定义当前应用所使用的模版引擎
//第一个参数：模版引擎的名称，同时也是模版文件的后缀，第二个参数表示用于解析处理模版内容的方法
app.engine('html',swig.renderFile);
//设置模版文件的存放目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views')
//注册所使用的模版引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法的第一个参数是一样的
app.set('view engine','html');
//清除缓存
app.set('view cache',false);
swig.setDefaults({cache:false});

//bodyparser设置
app.use(bodyparser.urlencoded({extended:true}));


//静态文件托管
app.use('/public', express.static(__dirname+'/public'));


app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/user',require('./routers/user'))
app.use('/',require('./routers/main'));


mongoose.connect('mongodb://localhost:27018/data',function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(8080);
    }
});

//监听htpp请求
