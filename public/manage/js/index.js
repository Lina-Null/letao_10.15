$(function(){

    // 基于准备好的dom，初始化echarts实例
    var echarts1 = echarts.init(document.querySelector('.echarts_1'));

    var option1 = {
        // 大标题
        title: {
            text: '2017年注册人数'
        },
        // 提示框组件
        tooltip: {},
        // 图例
        legend: {
            data:['人数']
        },
        // x轴的数据
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        // y 轴的刻度, 根据数据自动生成比较合适
        yAxis: {},
        // 数据
        series: [{
            name: '人数',
            // 表示柱状图
            type: 'bar',
            data: [1000, 1500, 1800, 1200, 1000, 500]
        }]
    };

// 使用刚指定的配置项和数据显示图表。
    echarts1.setOption(option1);
    //console.log(echarts1.setOption(option1));

    var echarts2 = echarts.init(document.querySelector(".echarts_2"));
    var option2 = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    echarts2.setOption(option2);
});