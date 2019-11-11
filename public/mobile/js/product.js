$(function(){
   var productId = getSearch("productId");
   console.log(productId);
   render();
   function render(){
    $.ajax({
        url:"/product/queryProductDetail",
        type:"get",
        dataType:"json",
        data:{
            id:productId
        },
        success:function(info){
            var htmlStr = template("productTpl",info);
            $('.lt_main .mui-scroll').html(htmlStr);

            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            mui('.mui-numbox').numbox();
        }
    });
   }

   //让尺码选中(通过事件委托)
   $('.lt_main').on("click",".lt_size span",function(){
        $(this).addClass('current').siblings().removeClass('current');
   });

   $('#btnCart').click(function(){
       /**
        * 1 添加点击事件
        * 2 收集尺码 数量 id 发送ajx
        * */
       var size = $('.lt_size span.current').text();
       if(!size){
           mui.toast("请选择尺码");
           return;
       }
       var num = $('.mui-numbox-input').val();

       $.ajax({
           url:"/cart/updateCart",
           type:"post",
           data:{
               id:productId,
               size:size,
               num:num
           },
           dataType:"json",
           success:function (info) {
              if(info.error === 400){
                  mui.toast("请先登录");
                  location.href = "login.html?retUrl="+location.href;
              }
            if(info.success){
                mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
                    if(e.index === 0){
                    //    去购物车
                        location.href = "cart.html"
                    }
                });
            }
           }
       });

   });
});