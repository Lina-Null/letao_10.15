/**
 * 开启进度条
 * 实现在第一个ajax 发送的时候，开启进度条
 * 在所有的ajax请求都完成的时候，结束进度条
 * ajaxComplete 当每个ajax请求完成的时候，调用（不管成功还是失败）
 * ajaxError 当ajax请求失败的时候，调用
 * ajaxSuccess 当ajax请求成功的时候，调用
 * ajaxSend 在每个ajax请求发送前，调用
 * ajaxStart 在第一个ajax请求开始时，调用
 * ajaxStop  在所有ajax请求完成时，调用
 * */

$(function(){
    $(document).ajaxStart(function () {
        //开启进度条
        NProgress.start();

    });
    $(document).ajaxStop(function () {
        //结束进度条
        NProgress.done();
    });
    //访问后台网页前，进行判断是否登录，如果没登录则进入登录页
    //一进入页面判断是否在登陆页，若在不用，则使用ajax
    if(location.href.indexOf("login.html")=== -1){
        $.ajax({
            type:"get",
            url:"/employee/checkRootLogin",
            dataType:"json",
            success:function(info){
                if(info.success){
                    console.log("用户已登录");
                }
                if(info.error === 400){
                    // 进行拦截, 拦截到登录页
                    location.href = "login.html";
                }
            }
        });

    }





    //点击头部按钮产生动画
    $(".icon_menu").click(function(){
            //1、侧边栏消失
        $(".lt_aside").toggleClass("hidemenu");
            //2、主体撑满整个页面
        $(".lt_main").toggleClass("hidemenu");
        //3、头部导航
        $(".lt_topbar").toggleClass("hidemenu");
    });

    //点击退出按钮弹出模态框
    $(".icon_logout").click(function () {
        $("#exitModel").modal('show');

    });
    //点击退出按钮
    $("#exitBtn").click(function(){
        //
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href ="login.html" ;
                }
            }
        });
    });


//    点击分类管理 切换到一级分类
    $(".category").click(function(){
        $(".aside_nav a").removeClass("current");
      $(".aside_nav .categoryChild").stop().slideToggle();

      // $(".categoryChild").css("display","block");
    });
});
