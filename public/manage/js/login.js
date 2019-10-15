$(function(){
    //表单校验
    //校验要求：
    //1、用户名不能为空，长度为2-6位
    //2、密码不能为空，长度为6-12位
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
       // excluded: [':disabled', ':hidden', ':not(:visible)'],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//校验中
        },
        //3. 指定校验字段，配置字段和input框中指定的name关联,所以必须要给input加上name
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                //校验规则
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在 2到6 位'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                //校验规则
                validators: {
                 //不能为空
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度必须在 6到12位"
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    });
    //登录功能，表单校验插件会在提交表单时进行校验
//校验成功，默认就是提交表单，会发生页面跳转，注册表单校验成功事件，阻止默认的提交，通过ajax进行发送请求
//校验失败，不会提交表单，配置插件提示用户即可
    $("#form").on('success.form.bv',function(e){
        e.preventDefault();
        //使用ajax
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            dataType:"json",
            data:$("#form").serialize(),//表单序列化
            success:function(info){
                console.log(info);
                if(info.success){
                    //登录成功，跳转到index
                    location.href = "index.html";
                }
                if(info.error === 1000){
                   // alert("用户名错误");
                    $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback")
                }
                if(info.error = 1001){
                   // alert("密码错误");
                    $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback")
                }
            }

        })
    });

//重置功能
    $('[type="reset"]').click(function(){
        //调用插件方法，进行重置校验状态
        //传 true，重置内容以及校验状态
        //传false,只重置校验状态
        $("#form").data('bootstrapValidator').resetForm();
    });

})

