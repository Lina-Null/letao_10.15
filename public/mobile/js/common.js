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

})