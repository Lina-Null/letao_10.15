$(function(){
   var key = getSearch("key");
    $('.search_input').val(key);
    render();
    function render(){
        $('.lt_product').html('<div class="loading"></div>');

        var params = {};
        params.proName = $('.search_input').val();
        params.page = 1;
        params.pageSize = 100;

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
                    console.log( info )
                    var htmlStr = template( "productTpl" , info );
                    $('.lt_product').html( htmlStr );
                }
            })
        }, 1000);
        // $.ajax({
        //     url:"/product/queryProduct",
        //     type:"get",
        //     data:params,
        //     dataType:"json",
        //     success:function(info){
        //         var htmlStr = template("productTpl",info);
        //         $('.productList').html(htmlStr);
        //     }
        // });
    }

    $('.btnSearch').click(function(){
        var key = $('.search_input').val();
        if(key.trim() === ""){
            mui.toast("请输入搜索关键字");
            return;
        }
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
    $('.lt_sort a[data-type]').click(function(){
        if($(this).hasClass('current')){
            //有current 切换箭头方向
            $(this).find('i').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
        //    没有current，给自己加上，并排他
            $(this).addClass('current').siblings().removeClass("current");

        }
        render();
    });



})