$(function(){
    var clickId;
    oneList();
    function oneList(){
       $.ajax({
            url:"/category/queryTopCategory",
           type:"get",
           dataType:"json",
           success:function(info){
                console.log(info);
                var htmlStr = template("categoryLeft",info);
                $(".leftList").html(htmlStr);
                clickId = info.rows[0].id;
               twoList(clickId);
           }
       });
   }


   $(".leftList ").on("click",'a',function () {
       var clickId = $(this).data("id");

       $(this).toggleClass("current").parent().siblings().find("a").removeClass("current");

       twoList(clickId);
   })
    function twoList(clickId){
            $.ajax({
                url:"/category/querySecondCategory",
                type:"get",
                dataType:"json",
                data:{
                    id:clickId
                },
                success:function(info){
                  var htmlStr = template("categoryRight",info);
                  $(".rightList").html(htmlStr);
                }
            });

    }
});