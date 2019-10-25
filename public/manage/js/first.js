$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var categoryName=[];
    render();
    //一进页面就渲染
    function render(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){

                    var htmlStr = template("firstTpl",info);
                    $(".lt_content tbody").html(htmlStr);
                //    分页插件
                    for(var i = 0; i < info.rows.length;i++)
                    {
                        categoryName.push(info.rows[i].categoryName);

                    }

                    $("#paginator").bootstrapPaginator({
                        bootstrapMajorVersion:3,
                        currentPage:info.page,//当前页
                        totalPages:Math.ceil(info.total/info.size),//总页数
                        size:"small",//设置控件的大小，mini, small, normal,large
                        onPageClicked:function(event, originalEvent, type,page){
                            //为按钮绑定点击事件 page:当前点击的按钮值
                            currentPage = page;
                            render();
                        }


                    });

            }
        });
    }


    //点击添加按钮 弹出模态框
    $("#addBtn").on("click",function(){
       $("#addModal").modal('show');
    });

    function equal1() {
        for (var i = 0; i < categoryName.length; i++) {
            if ($("#form").serialize() == categoryName[i]) {
                console.log($("#form").serialize() + categoryName[i]);
                return 1;
            }

        }
    }
//使用表单校验插件，实现表单校验
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//校验中
        },
        //3. 指定校验字段
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类不能为空"
                    },
                    equal:{
                        message: equal1() === 1 ? "输入的分类已经存在":" "

                    }
                }
            }
        }


    });
    equal1();
//
    $("#form").on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            data: $("#form").serialize(),
            dataType:"json",
            success:function(info){
                if(info.success){
                //    关闭模态框
                    $("#addModal").modal("hide");
                //    重新渲染，添加的项会在第一页
                    currentPage = 1;
                    render();

                //    重置表单校验状态和表单内容
                    // 传 true 不仅可以重置 状态, 还可以重置内容
                $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        });
    });
})