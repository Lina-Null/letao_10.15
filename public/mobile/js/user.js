$(function(){
//    一进入页面，请求当前用户数据，进行页面渲染
//    1、用户已登录，后台返回用户数据，通过模板渲染
//    2、用户没登录，后台返回error，当前用户未登录，拦截登陆页

    $.ajax({
       url:"/user/queryUserMessage",
       type:"get",
       dataType:"json",
       success:function(info){
            console.log(info);
            if(info.error === 400){

                location.href = "login.html";
                return;
            }
            var htmlStr = template("userTpl",info);
            $(".userInfo ").html(htmlStr);
       }
    });

    $(".logoutBtn").click(function(){
        $.ajax({
            url:"/user/logout",
            type:"get",
            dataType:"json",
            success:function(info){
                if(info.success){

                    location.href = "login.html";
                }
            }
        });
    });
})