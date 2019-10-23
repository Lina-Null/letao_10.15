$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var currentId;//用户id
    var isDelete; //用户当前状态
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
                console.log(info);
                var htmlStr= template("userTpl",info);
                $('.lt_content tbody').html(htmlStr);

            //    分页插件
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数 = 总个数/每页大小
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event,originalEvent,type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                         currentPage = page;
                         render();
                    }

                });

            }
        });
    }
//  点击禁用/启用改变属性 事件委托给btn按钮
$(".lt_content tbody").on("click",".btn",function(){
    $("#userModal").modal("show");
    //获取用户id
     currentId = $(this).parent().data('id');
    //获取当前isDelete的状态
     isDelete = $(this).hasClass("btn-success")? 1 : 0;


});
    $("#userModal #submitBtn").on("click",function(){
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            dataType:"json",
            data:{
                id:currentId,
                isDelete:isDelete
            },
            success:function(info){
                if(info.success){
                    //1关闭模态框
                    $("#userModal").modal("hide");
                    //页面重新渲染
                    render();
                }
            }
        });

    });


})