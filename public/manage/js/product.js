$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var picArr = [];//存放图片的数组
   render();
    function render(){
       $.ajax({
           url:"/product/queryProductDetailList",
           type:"get",
           dataType:"json",
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           success:function(info){
               //     渲染模板
                var htmlStr = template("productTpl",info);
                $(".lt_content tbody").html(htmlStr);
           //    分页插件
               $('#paginator').bootstrapPaginator({
                   bootstrapMajorVersion:3,
                   currentPage:currentPage,
                   totalPages:Math.ceil(info.total/info.size),
                   onPageClicked:function(a,b,c,page){
                       currentPage = page;
                       render();
                   }
               });

           }
       });
    }
//    点击 操作 切换 需要使用事件监听  没有接口
//     $(".lt_content tbody").on("click",".btn",function(){
//         $
//
//
//     })
//点击添加商品，弹出模态框
    $("#addBtn").on("click",function(){
        $("#addModal").modal('show');
        //获取二级分类
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){
                var htmlStr = template("dropdownTpl",info);
                $('.dropdown-menu').html(htmlStr);
            }
        });
    })
//点击
    $(".dropdown-menu").on("click","a",function(){
        var id = $(this).data("id");
        var txt = $(this).text();
        $('#dropdownTxt').text(txt);
        $("[name='brandId']").val(id);
    });
//上传图片
    $("#fileupload").fileupload({
        dataType: 'json',
        // 上传完图片, 响应的回调函数配置
        // 每一张图片上传, 都会响应一次
        done: function (e, data) {

            // 获取图片地址对象
            var picObj = data.result;
            // 获取图片地址
            var picAddr = picObj.picAddr;
            // 新得到的图片对象, 应该推到数组的最前面    push pop shift unshift
            picArr.unshift(picObj);
            // 新的图片, 应该添加到 imgBox 最前面去
            $("#imgBox").prepend('<img src="'+ picAddr +'" width="100">');
            // 如果上传的图片个数大于 3个, 需要将最旧的那个(最后面的哪项), 要删除
            if(picArr.length > 3){
                // 删除数组的最后一项
                picArr.pop();
                // 除了删除数组的最后一项, 还需要将页面中渲染的最后一张图片删除掉
                // 通过 last-of-type 找到imgBox盒子中最后一个 img 类型的标签, 让他自杀
                $("#imgBox img:last-of-type").remove();
            }

            // 如果处理后, 图片数组的长度为 3, 说明已经选择了三张图片, 可以进行提交
            // 需要将表单 picStatus 的校验状态, 置成 VALID
            if(picArr.length === 3){
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
            }

        }
    });


//   表单校验
    $("#form").bootstrapValidator({
        excluded:[],
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    // 配置字段
        fields:{
        //    id
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            //商品名称
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
        // 商品描述
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            //库存
            num:{
                validators:{
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"商品库存格式: 必须是非零开头的数字"
                    }
                }
            },
            // 尺码校验, 规则必须是 32-40, 两个数字-两个数字
            size:{
                validators:{
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"尺码格式, 必须是 32-40"
                    }
                }
            },
            // 商品价格
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品价格"
                    }
                }
            },
            // 商品原价
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            // 标记图片是否上传满三张
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }


        }
    });

//表单发送
    $("#form").on("success.form.bv",function(e){
        e.preventDefault();
        var params = $("#form").serialize();
        params += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
        params += "&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
        params += "&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
        $.ajax({
            url:"/product/addProduct",
            type:"post",
            dataType:"json",
            data:params,
            success:function(info){

                if(info.success){
                    console.log(info);
                    $("#addModal").modal('hide');
                    currentPage = 1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm(true);
                    $('#dropdownTxt').text("请选择二级分类");
                    $("#imgBox img").remove();
                    picArr = [];
                }
            // 成功重置表单
            //    刷新页面

            }
        });
    });




});