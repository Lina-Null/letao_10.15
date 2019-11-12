$(function(){
    render();
    /*
    * 1进入界面 获取数据
    * 用户未登录，后台返回error拦截到登录页
    * 用户登录，进入购物车渲染模板
    * */
    function render() {
        setTimeout(function(){
            $.ajax({
                url:"/cart/queryCart",
                type:"get",
                dataType:"json",
                success:function(info){
                    if(info.error === 400){
                        // 用户没登陆, 跳转到登录页, 在跳转时, 将页面地址拼接
                        location.href = "login.html?retUrl="+location.href;
                        return;
                    }
                    //返回的是info数组，template方法参数2要求传入一个对象， 需要包装成对象{arr:info}
                    var htmlStr = template( "cartTpl" , { arr: info } );
                    $('.lt_main .mui-table-view').html( htmlStr );

                    // 关闭下拉刷新
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();

                }
            });
        },500);
    }

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识
            down : {
                auto: true, // 加载自动下拉刷新一次
                callback: function() {
                    render();
                }
            }
        }
    });
    $('.lt_main').on("tap",'.btn_delete',function () {
       var id = $(this).data('id');
       console.log(id);
       $.ajax({
           url:"/cart/deleteCart",
           type:"get",
           dataType:"json",
           data:{
               id:[id]
           },
           success:function(info){
               if(info.success){
                   mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
               }
           }
       });
    });
    $('.lt_main').on("tap",'.btn_edit',function () {

         var obj = this.dataset;
         var id = obj.id;
            var htmlStr = template("editTpl",obj);
            //mui将换行标记\n 解析成<br>标签
            //需要将模板中所有的\n去掉
        htmlStr = htmlStr.replace(/\n/g,"");
            mui.confirm(htmlStr,"编辑商品",['确认','取消'],function(e){
                if(e.index === 0 ){
                    var size = $('.lt_size span.current').text();
                    var num = $('.mui-numbox-input').val();
                    $.ajax({
                        type: "post",
                        url: "/cart/updateCart",
                        data: {
                            id: id,
                            size: size,
                            num: num
                        },
                        dataType: "json",
                        success: function( info ) {
                            console.log( info );
                            if ( info.success ) {
                                // 编辑成功, 页面重新, 下拉刷新一次即可
                                mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                            }
                        }
                    })
                }
            });
        // 手动初始化数字框
        mui(".mui-numbox").numbox();
    });
    // 给编辑模态框的尺码添加选中功能
    $('body').on("click", ".lt_size span", function() {
        $(this).addClass("current").siblings().removeClass("current");
    });
})