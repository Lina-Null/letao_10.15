$(function(){
   var key = getSearch("key");
    $('.search_input').val(key);


    $('.btnSearch').click(function(){
        var key = $('.search_input').val();
        if(key.trim() === ""){
            alert("请输入搜索关键字");
            return;
        }
        render();
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


    //    需要将搜索关键字，追加到本地存储中去
        $('.search_input').val("");


    });
    function render(){
        $.ajax({
            url:"/product/queryProduct",
            type:"get",
            data:{

                proName:$('.search_input').val(),
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){

                var htmlStr = template("productTpl",info);
                $('.productList').html(htmlStr);


            }


        });

    }

})