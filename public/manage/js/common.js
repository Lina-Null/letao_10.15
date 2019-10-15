/**
 * 开启进度条
 * 实现在第一个ajax 发送的时候，开启进度条
 * 在所有的ajax请求都完成的时候，结束进度条
 * ajaxComplete 当每个ajax请求完成的时候，调用（不管成功还是失败）
 * ajaxError 当ajax请求失败的时候，调用
 * ajaxSuccess 当ajax请求成功的时候，调用
 * ajaxSend 在每个ajax请求发送前，调用
 * ajaxStart 在第一个ajax请求开始时，调用
 * ajaxStop  在所有ajax请求完成时，调用
 * */


$(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();

})
$(document).ajaxStop(function () {
    NProgress.done();
})