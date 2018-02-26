
$(function(){
    var $register =$('#register');
    var $login = $('#login');
    
    $register.find('#re-submit').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$register.find('#re-username').val(),
                password:$register.find('#re-password').val(),   
                repassword:$register.find('#re-repassword').val(),
            },
            dataType:'json',
            success:function(result){
                if(!result.code){
                    alert('注册成功，1秒后返回登录界面！');           
                    setTimeout(function(){
                        $login.show();
                        $register.hide();
                    },1000);
                }
                
            }

        });

    });

    $login.find('#login-submit').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$login.find('#username').val(),
                password:$login.find('#password').val()
            },
            dataType:'json',
            success:function(result){
                console.log(result.code);
                if(!result.code){
                    alert('登录成功，1秒后跳转到用户界面！');           
                    setTimeout(function(){
                        window.location.href="/admin";
                    },1000);
                }
            }
        });
    });
})