$(function(){
    /**
     * 注意：要进行本地存储localStorage的操作，进行历史记录管理，
     * 需要约定一个键名，search_list
     * 通过search_list进行读取或者设置操作

    //准备假数据,将下面三行代码，在控制台存一下
  var arrList = ["耐克","阿迪","新百伦","手机","小猫腻"];
  var jsonStr = JSON.stringify(arrList);
  localStorage.setItem("search_list",jsonStr);
     */


    /**
     * 1、列表渲染功能
     * 1)、本地存储中读取历史记录，读取的是jsonStr
     * 2)、转换成数组
     * 3)、通过模板引擎动态渲染
     */
    render();
    function getHistory(){
        //如果没有读取到数据，默认初始化成一个空数组
        var history = localStorage.getItem("search_list") || '[]';
        var arrList = JSON.parse(history);
        return arrList;
    }
    function render(){
        var arrList = getHistory();
        var htmlStr = template("historyListTpl",{arr:arrList});
        $('.lt_history').html(htmlStr);
    }

//清空历史事件
    $('.lt_history').on("click",'.emptyBtn',function () {
       // $().modal('show');
       // 添加mui确认框
       // 参数1：message
       // 参数2：对话框标题 title
       // 参数3：按钮文本数组 btnArr
       // 参数4：回调函数 callback
        mui.confirm("你确认要清空历史记录吗？","温馨提示",["取消","确认"],function(e){
            //通过e.index 可以获取点击的按钮的索引
            if(e.index === 1){
                localStorage.removeItem('search_list');
                render();
            }

        });


    });




    //删除某一条
    $('.lt_history').on("click",'.deleteBtn',function () {
        //将外层的this指向 存储在that中
        var that = this;
        //转成json
        mui.confirm("你确认要删除该条记录吗？","温馨提示",["取消","确认"],function(e){
            //通过e.index 可以获取点击的按钮的索引
            if(e.index === 1){
                var index = $(that).data("index");
                var jsonStr = localStorage.getItem("search_list");
                var arrStr = JSON.parse(jsonStr);
                arrStr.splice(index,1);
                localStorage.setItem("search_list",JSON.stringify(arrStr));
                render();
            }

        });


    });
//添加搜索功能
    $('.btnSearch').click(function () {
        var key =$('.search_input').val().trim();
        if (key === ''){
            alert("请输入搜索关键字");
            return ;
        }
        //获取原数组
        var arr = getHistory();
        //查找是否有相同的
        var index = arr.indexOf(key);

        if(index != -1 )
        {
            arr.splice(index,1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        //往数组最前面追加
        arr.unshift(key);
        //转json,存到本地存储中
        localStorage.setItem("search_list",JSON.stringify(arr));
        //重新渲染页面
        render();
    //清空input框
        $('.search_input').val("");


        location.href = "search_list.html?key="+key;

    });



})