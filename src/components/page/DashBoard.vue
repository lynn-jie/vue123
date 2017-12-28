<template>
	<div>

		<h2>概况</h2>
		<div class="nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页概况</el-breadcrumb-item>

			</el-breadcrumb>

		</div>

		<div class="br"></div>

		<div class="clear"></div>

		<el-row :gutter="20">

			<el-col :xs="12" :sm="12" :md="12" :lg="6">
				<el-card class="box-card">
					<el-row :gutter="6">
						<el-col :xs="24" :sm="8" :md="8" :lg="8">
							<!--<el-progress type="circle" :percentage="67" :width="80"></el-progress>-->
							<i class="iconfont icon-kongzhiyunhang"></i>
							
						</el-col>
						<el-col :xs="24" :sm="11" :md="12" :lg="12">
							<div class="cart-string">
								<span>控制器数量</span>
								<span><h2>670</h2></span>
							</div>
						</el-col>
						<el-col :xs="24" :sm="5" :md="4" :lg="4">
							<div>
								<!--<i class="material-icons">person_outline</i>-->		
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>

			<el-col :xs="12" :sm="12" :md="12" :lg="6">
				<el-card class="box-card">
					<el-row :gutter="6">
						<el-col :xs="24" :sm="8" :md="8" :lg="8">
							<div>
								<!--<el-progress type="circle" :percentage="81" :width="80"></el-progress>-->
							<i class="iconfont icon-yonghuqun"></i>
								
							</div>
						</el-col>
						<el-col :xs="24" :sm="11" :md="12" :lg="12">
							<div class="cart-string">
								<span>用户数量</span>
								<span><h2>810</h2></span>
							</div>
						</el-col>
						<el-col :xs="24" :sm="5" :md="4" :lg="4">
							<div>
								<!--<i class="material-icons">attach_money</i>-->
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>

			<el-col :xs="12" :sm="12" :md="12" :lg="6">
				<el-card class="box-card">
					<el-row :gutter="6">
						<el-col :xs="24" :sm="8" :md="8" :lg="8">
							<div>
								<!--<el-progress type="circle" :percentage="30" :width="80"></el-progress>-->
								<i class="iconfont icon-kongqijinghuaqi2"></i>
								
							</div>
						</el-col>
						<el-col :xs="24" :sm="11" :md="12" :lg="12">
							<div class="cart-string">
								<span>净化器数量</span>
								<span><h2>310</h2></span>
							</div>
						</el-col>
						<el-col :xs="24" :sm="5" :md="4" :lg="4">
							<div>
								<!--<i class="material-icons">touch_app</i>-->
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>

			<el-col :xs="12" :sm="12" :md="12" :lg="6">
				<el-card class="box-card">
					<el-row :gutter="6">
						<el-col :xs="24" :sm="8" :md="8" :lg="8">
							<div>
								<i class="iconfont icon-xuexiao1"></i>
								<!--<el-progress type="circle" :percentage="88" :width="80"></el-progress>-->
							</div>
						</el-col>
						<el-col :xs="24" :sm="11" :md="12" :lg="12">
							<div class="cart-string">
								<span>空间数量</span>
								<span><h2>880</h2></span>
							</div>
						</el-col>
						<el-col :xs="24" :sm="5" :md="4" :lg="4">
							<div>
								<!--<i class="material-icons">replay</i>-->
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			
			<el-col :xs="24" :sm="24" :md="24" :lg="12">
				<el-card class="box-chart">
					<pieChart></pieChart>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="12">
				<el-card class="box-chart">
					<lineChart></lineChart>
				</el-card>
			</el-col>

		</el-row>

		<!--todoList  & mail & table-->
		
		
		<el-row :gutter="20">
			
			<!--<el-col :xs="24" :sm="24" :md="24" :lg="8">
                <el-card class="box-list">
                    To Do List<hr>
                    <TodoList></TodoList>
                </el-card>
            </el-col>-->
	
				<el-col :span="24" :xs="24" :sm="24" :md="24" lg="24">
					
					<el-card class="box-list">
						<div class="grid-content bg-purple-dark">
							<borderTable></borderTable>
						</div>
					</el-card>
					
				</el-col>

		</el-row>

	</div>

</template>

<script>
	import pieChart from '../charts/pieChart.vue';

	import lineChart from '../charts/lineChart.vue';

	import borderTable from '../tables/borderTable.vue';

	export default {
		data() {
			return {
				percentage:10
			}
		},
		components: {
			pieChart,
			lineChart,

			borderTable,
		}
	}
</script>

<style scoped>
	.el-col {
		margin-bottom: 16px;
		text-align: center;
	}
	
	.material-icons {
		font-size: 80px;
		color: #ddd;
	}
	
	.box-card {
		height: 110px;
	}
	
	.cart-string {
		height: 100px;
		padding-top: 10px;
		font-size: 1.1rem;
	}
	
	.box-chart {
		height: 450px;
	}
	
	.box-list {
		height: auto;
		text-align: left;
		height: 500px;
	}
	
	.box-list hr {
		height: 1px;
		border: none;
		border-top: 1px dashed #ccc;
		margin-bottom: 5px;
		margin-top: 6px;
	}
	.iconfont{
		font-size: 65px;
	}
	.iconfont:hover{
		color: #42A1FF;
	}
	
	
	
	
	h2 {
		margin: 5px 0 18px 0;
	}
	
	.br {
		border: 0.5px solid #6085B0;
		margin-bottom: 25px;
	}
	
	.btn {
		margin: 35px 0 15px 0;
	}
	
	.nav {
		margin-bottom: 20px;
		font-size: 30px;
	}
	
	.paging {
		margin-top: 30px;
		text-align: center;
	}
	
	.el-button+.el-button {
		margin-left: 0;
	}
</style>