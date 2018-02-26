

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
}

);

//用户注册 
router.post('/user/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    var RegExp_username = /^(\w){3,8}$/;
    //用户名验证
    if (!RegExp_username.test(username)) {
        responseData.code = 1;
        responseData.message = '用户名由3-8位的英文、数字以及下划线组成';
        res.json(responseData);
        return;
    }
    //密码
    if (!RegExp_username.test(password)) {
        responseData.code = 2;
        responseData.message = '密码由3-8位的英文、数字以及下划线组成';
        res.json(responseData);
        return;
    }
    //重复密码
    if (password !== repassword) {
        responseData.code = 3;
        responseData.message = '两次密码不一致';
        res.json(responseData);
        return;
    }
    //查找数据库用户名是否已经注册
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            //数据库中有该用户名
            responseData.code = 4;
            responseData.message = '该用户名已被注册！';
            res.json(responseData);
            return;
        } else {
            // 保存数据到数据库
            var user = new User({
                username: username,
                password: password
            });
            responseData.code=0;
            responseData.message = '注册成功！';
            res.json(responseData);
            return user.save();
        }
    });
});

router.post('/user/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    if(username==''||password==''){
        responseData.code=1;
        responseData.message='用户名或密码不能为空';
        res.json(responseData);
        return;
    }

    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        if(!userInfo){
            responseData.code=2;
            responseData.message='用户名或密码错误';
            res.json(responseData);
            return;
        }else{
            responseData.code=0;
            responseData.message='登录成功';
            res.json(responseData);
            return;
        }
    })
});

module.exports = router;    