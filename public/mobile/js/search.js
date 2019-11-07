$(function(){
    /**
     * 注意：要进行本地存储localStorage的操作，进行历史记录管理，
     * 需要约定一个键名，search_list
     * 通过search_list进行读取或者设置操作
     */
    //准备假数据,将下面三行代码，在控制台存一下
   // var arrList = ["耐克","阿迪","新百伦","手机","小猫腻"];
  //  var jsonStr = JSON.stringify(arrList);
     // localStorage.setItem("search_list",jsonStr);



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

        localStorage.removeItem('search_list');
        render();
    });
    //删除某一条
    $('.lt_history').on("click",'.deleteBtn',function () {
        // $().modal('show');
        var index = $(this).data("index");
        var jsonStr = localStorage.getItem("search_list");
        var arrStr = JSON.parse(jsonStr);
        arrStr.splice(index,1);
        //转成json
         localStorage.setItem("search_list",JSON.stringify(arrStr));


        render();
    });



})