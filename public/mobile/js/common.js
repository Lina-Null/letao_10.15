$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    });
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });
});

//    解析地址栏参数
function getSearch(k){
    var searchAdd = location.search;

    // 解码成中文
    searchAdd = decodeURI( searchAdd );
    //去掉问号
    searchAdd = searchAdd.slice(1);
    // 根据 & 进行切割
    var arr = searchAdd.split("&");

    var obj = {};
    arr.forEach(function(v,i){
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        obj[key] = value;
    });
    return obj[k];
}