<template>
	<div id="box">
	<div class="top">
		<h1>呼吸圈</h1>
		<h4>打造最适宜的人居环境，进化空气，让呼吸更自在</h4>
		
	</div>
		
	

	<div class="block">
		
		<el-carousel height="550px">
			<el-carousel-item v-for="item in imgs">
				
				<img v-bind:src="item.src" alt="sssss"/>
				
				
			</el-carousel-item>
		</el-carousel>
	</div>

</div>
</template>

<script>
	export default {
		data() {
			return {
				imgs: [
					{
						src:'../../../static/images/2.jpg'
					},
					{
						src:'../../../static/images/3.jpg',
						
					},
					{
						src:'../../../static/images/1.jpg',
						
					}
				],
			}
		}
	}
	
	
//	上线路径   src:'static/images/1.jpg',
</script>
<style scoped>
	
	#box {
		height: 550px;
	}
	h1 {
		margin-bottom: 20px;
	}
	.top {
		text-align: center;
		font-family: "microsoft yahei";
	}
	.top h4{
		font-size: normal;
		font-family: "microsoft yahei";
		
	}
	.block img {
		display: block;
		width: 1000;
		height: 550px;
		/*background: #0190FE;*/
		
	}
	.block {
		width: 990px;
		margin: 100px auto;
	}
	
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>