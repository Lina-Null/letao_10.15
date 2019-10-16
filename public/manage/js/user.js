$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        //渲染表格
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                //渲染模板
                var htmlStr= template("userTpl",info);
                $('.lt_content tbody').html(htmlStr);
            }
        });
    }


})