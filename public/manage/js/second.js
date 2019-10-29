$(function(){
    var currentPage = 1;
    var pageSize = 5 ;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page :currentPage,
                pageSize:pageSize,
            },
            dataType:"json",
            success:function(info){

                var htmlStr = template("secondTpl",info);
                $(".lt_content tbody").html(htmlStr);
                //分页插件
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


//2、点击添加分类按钮 显式模态框
    $("#addBtn").click(function(){
        $("#addModal").modal('show');
        //获取一级分类全部数据，通过模板引擎渲然
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            dataType:"json",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
                var htmlStr = template("dropdownTpl",info);
                $('.dropdown-menu').html(htmlStr);
            }
        });
    });
    // 3. 通过注册委托事件, 给 a 添加点击事件
    $('.dropdown-menu').on("click","a",function(){
        //选中文本
        var txt = $(this).text();
        //    拿到id
        var txtId = $(this).data("id");
        //    将.dropdown-menu 的内容修改
        $("#dropdownTxt").text(txt);

        $('[name ="categoryId"]').val(txtId);
    //    检验表单是否符合要求
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
    });

//  4、利用文件初始化
    $("#fileupload").fileupload({
        //指定响应的数据格式
        dataType:"json",
        //文件上传完成后调用done回调函数
        done:function(e,data){
            //data.result
           var imgUrl = data.result.picAddr;
           $("#imgBox img").attr("src",imgUrl)
            $('[name = "brandLogo"]').val(imgUrl);
           $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }

    });

//5、表单校验
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],
        // 需要对隐藏域进行校验，所以不指定类型
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//校验中
        },
        //配置字段
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择图片"
                    }
                }
            },
        }
    });
//点击添加按钮，注册表单校验成功事件
    $("#form").on("success.form.bv",function(e){
       e.preventDefault();
       $.ajax({
           url:"/category/addSecondCategory",
           type:"post",
           dataType:"json",
           data:$("#form").serialize(),
           success:function(info){
               if(info.success){
                   $("#addModal").modal('hide');
                   currentPage=1;
                   render();
                   $('#form').data("bootstrapValidator").resetForm( true );
                   $("#dropdownTxt").text("请选择一级分类");
                   $("#imgBox img").attr("src","images/none.png");
               }
           }
       });
    });
});