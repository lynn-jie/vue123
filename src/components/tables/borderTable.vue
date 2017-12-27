<template>
	<div class="c-charts">

		<IEcharts :option='map'> </IEcharts>

	</div>
</template>

<script>
	
	import IEcharts from 'vue-echarts-v3';

	
	
	export default {
		components: {
			IEcharts
		},
		data:()=>({
			map:{
			title: {
                text: '一周空气质量'
            },
            tooltip: {},
            legend: {
                data:['空间质量']
            },
            xAxis: {
                data: ["周一","周二","周三","周四","周五","周六",'周日']
            },
            yAxis: {},
            series: [{
                name: 'PM2.5',
                type: 'bar',
				itemStyle:{normal:{ color:'#80C4EF'}},
                data: [50, 20, 36, 30, 40, 60,70]
            }]	
			}
		})
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