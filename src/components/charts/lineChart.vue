<template>
    <div class="c-charts" >
    	
        <IEcharts :option="line"  ></IEcharts>
        
    </div>



</template>

<script>

    import IEcharts from 'vue-echarts-v3';
    
    export default {
        components:{
           IEcharts
        },
        data: () => ({
            line: {
                    title: {
                        text: '所属客户净化器数量'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['数量']
                    },
                    
                    grid: {
                        left: '1%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true,
                        show:true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : true,
                            data : ['南师大教育','蒙特梭利','凤凰书城','外国语学校','小哈弗教育','明日科技','天才教育','蓝湾咖啡'],
                            splitLine:{show:true,lineStyle:{color:'#ddd'}}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{lineStyle:{color:'#999'}},
                            splitLine:{lineStyle:{color:'#ddd'}}

                        }
                    ],
                    series : [
                        {
                            itemStyle:{normal:{ color:'#2F9A5F'}},
                            name:'数量',
                            type:'bar',
                            stack: '总量',
                            
                            areaStyle: {normal: {}},
                            data:[12, 32, 10, 113, 90, 20, 10, 16]
                        },
//                      {
//                          itemStyle:{normal:{ color:'#e6d385'}},
//                          name:'联盟广告',
//                          type:'line',
//                          stack: '总量',
//                          areaStyle: {normal: {}},
//                          data:[220, 182, 191, 234, 290, 330, 310]
//                      },
//                      {
//                          itemStyle:{normal:{ color:'#f4abab'}},
//                          name:'视频广告',
//                          type:'line',
//                          stack: '总量',
//                          areaStyle: {normal: {}},
//                          data:[150, 232, 201, 154, 190, 330, 410]
//                      },
//                      {
//                          itemStyle:{normal:{ color:'#a6c733'}},
//                          name:'直接访问',
//                          type:'line',
//                          stack: '总量',
//                          areaStyle: {normal: {}},
//                          data:[320, 332, 301, 334, 390, 330, 320]
//                      },
//                      {
//                          itemStyle:{normal:{ color:'#4cb1a7'}},
//                          name:'搜索引擎',
//                          type:'line',
//                          stack: '总量',
//                          label: {
//                              normal: {
//                                  show: true,
//                                  position: 'top'
//                              }
//                          },
//                          areaStyle: {normal: {}},
//                          data:[820, 932, 901, 934, 1290, 1330, 1320]
//                      }
                    ]
                }  
            }),

            methods: {
            
               
            }
    }
</script>

<style scoped>
    .el-col{
        margin-bottom:16px;
         left: 100px;
    }
    .material-icons{
        font-size:8px;
        color:#ddd;
          
    }
   
    .cart-string{
        height:100px;
        padding-top:10px;
        font-size:1.1rem;
     
        
    }
    .c-charts{
        height:400px;
      
        
    }
 
    
</style>