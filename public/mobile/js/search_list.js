$(function(){
   var key = getSearch("key");
    $('.search_input').val(key);
    var currentPage = 1; //当前页
    var pageSize = 2;//每页多少条
   // render();
    //配置下拉刷新和上拉加载注意点：
    //1 下拉刷线是对原有数据的覆盖，执行的是html 方法
    //2 上拉加载时在原有结构的基础上进行追加，追加到后面，执行的是append方法
    mui.init({
        //配置pullRefresh
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            //配置下拉刷新
            down : {
                auto:true,//配置一进入页面就下拉刷新一次
                callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    //拿到数据后，需要执行的方法是不一样的，所以通过回调函数的方式，传进去
                    currentPage = 1;
                    render(function(info){
                        var htmlStr = template( "productTpl" , info );
                        $('.lt_product').html( htmlStr );
                        //渲染完，结束下拉刷新
                        //api做了更新，mui文档还没有更新上endPulldown(),要是用原型上的endPulldownToRefresh()方法来结束下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        setTimeout(function(){
                            //   重新启用上拉加载刷新
                            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
                        },1500);

                    });
                }
            },
            //配置上拉加载
            up : {
                auto:false,
                callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；

                    currentPage++;
                    render(function(info){
                        var htmlStr = template( "productTpl" , info );
                        $('.lt_product').append( htmlStr );
                        if(info.data.length === 0)
                        {
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }else{
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        }

                    });
                }
            }
        }
    });
    function render(callback){
        $('.lt_product').html('<div class="loading"></div>');

        var params = {};
        params.proName = $('.search_input').val();
        params.page = currentPage;
        params.pageSize = pageSize;

        var $current = $(".lt_sort a.current");
        if($current.length > 0){
            var sortName = $current.data('type');
            var sortValue =$current.find("i").hasClass("fa-angle-down") ? 2 : 1;
        }
        params[sortName] = sortValue;

        setTimeout(function() {
            // 发送 ajax 请求, 获取搜索到的商品, 通过模板引擎渲染
            $.ajax({
                type: "get",
                url: "/product/queryProduct",
                data: params,
                dataType: "json",
                success: function( info ) {
                    $('.loading').hide();
                    console.log(info);
                    callback && callback(info);

                }
            })
        }, 1000);

    }

    $('.btnSearch').click(function(){
        var key = $('.search_input').val();
        if(key.trim() === ""){
            mui.toast("请输入搜索关键字");
            return;
        }
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
        //获取数组
        var history = localStorage.getItem("search_list") || [];
        var arr = JSON.parse(history);
        //删除重复项
        var index = arr.indexOf(key);
        if(index != -1){
        //    删除重复项
            arr.splice(1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem("search_list",JSON.stringify(arr));
        render();
        $('.search_input').val("");
    });

    //点击切换类
    //mui认为在下拉刷新和上拉加载中，使用click会有300ms延迟，性能方面不足
    //禁用了默认的a标签click事件，需要绑定tap事件
    $('.lt_sort a[data-type]').on("tap",function(){
        if($(this).hasClass('current')){
            //有current 切换箭头方向
            $(this).find('i').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
        //    没有current，给自己加上，并排他
            $(this).addClass('current').siblings().removeClass("current");

        }
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    });

$('.productList').on("tap",'a',function(){
    var id = $(this).data("id");
    location.href="product.html?productId="+id;

});

})