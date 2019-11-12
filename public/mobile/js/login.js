$(function () {

    $('#loginBtn').click(function(){
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();
        if(username === ""){
            mui.toast("请输入用户名");
            return;
        }
        if(password === ""){
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            url:" /user/login",
            type:"post",
            dataType:"json",
            data:{
                username:username,
                password:password
            },
            success:function (info) {
                console.log(info);
                if (info.error === 403 ){
                    mui.toast("用户名或密码错误");
                    return;
                }
                //登录成功
                //1、如果是从其他页面拦截过来的，调回去
                //2、如果是直接访问login.html,跳转到个人中心页
                if(location.search.indexOf("retUrl") > -1 ){
                        var retUrl = location.search.replace("?retUrl=","");
                        location.href = retUrl ;
                }else{
                    location.href = "user.html";
                }
            }
        });
    });

})