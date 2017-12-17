<template>
	<div>
		<!--<v-pageTitle vtitle="EditorPage"></v-pageTitle>-->
		<h2>设备管理</h2>
		<div class="nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>设备管理</el-breadcrumb-item>

			</el-breadcrumb>

		</div>

		<div class="br"></div>

		<div class="btn">

			<el-button size="medium" type="primary" @click="dialogFormVisible = true">新增</el-button>

			<!--内嵌表格-->

			<el-dialog title="新增" :visible.sync="dialogFormVisible">
				<el-form :model="form">

					<el-form-item label="设备ID" :label-width="formLabelWidth">
						<el-input v-model="form.device_name" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.telephone" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" :label-width="formLabelWidth">
						<el-input v-model="form.email" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="日期" :label-width="formLabelWidth">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
						</el-col>

					</el-form-item>

				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</div>
			</el-dialog>

			<el-button size="medium" type="success" @click="open3">刷新</el-button>
			<!--<el-button size="medium" type="danger" @click="open6">删除</el-button>-->

		</div>

		<el-table :data="tableData" style="width: 100%" class="table">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="iccd" label="控制器ID">
			</el-table-column>
			<el-table-column prop="device_name" label="设备状态">
			</el-table-column>
			<el-table-column prop="factory_time" label="已使用时长" width="180">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">

					<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>-->
					<!--<el-switch style="display: block" v-model="value4" active-color="#13ce66" inactive-color="#ff4949" active-text="按月付费" inactive-text="按年付费">
					</el-switch>-->
					
					<el-button size="mini"type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<!--<el-button size="mini" type="primary" @click="dialogFormVisible = true">修改</el-button>-->
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

				</template>
			</el-table-column>
		</el-table>

		<div class="paging block">

			<!-- <span class="demonstration">调整每页显示条数</span>-->
			<el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
			</el-pagination>

			<!--@size-change="handleSizeChange"-->
			<!--@current-change="handleCurrentChange"-->
			<!--:current-page.sync="currentPage2"-->
		</div>

	</div>
</template>

<script>
	//	import vPageTitle from '../common/pageTitle.vue';
	import axios from 'axios';
	import api from '../../api/api.js';
	
	export default {
		data() {
			return {
				tableData: [{
//					device_name: 'V12332JSA12SH',
//					status: '离线',
//					iccd: '250小时',
//					surplus: '2800小时'
				}
				,
//				{
//					controlid: 'X12332JSA12SH',
//					status: '在线',
//					time: '250小时',
//					surplus: '2800小时'
//
//				}, {
//					controlid: 'Q12332JSA12SH',
//					status: '在线',
//					time: '250小时',
//					surplus: '2808小时'
//				}, {
//					controlid: 'Z12332JSA12SH',
//					status: '离线',
//					time: '250小时',
//					surplus: '1280小时'
//				}
				],
				value4: true,
				dialogFormVisible: false,
				form: {
					device_name: '',
					ctrl_phone_number: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px'
			}

		},
		created() {

			this.init();
		

		},
		methods: {
			
			init() {
				axios.get(api.apidomain +'deviceinfo/search?n=100&p=1', {

					})
					.then(response => {
						console.log(response);
						this.tableData = response.data.data;
						console.log('获取数据成功');
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
						
					});
			},
//		
			open6() {
				this.$confirm('此操作将永久停用该数据 , 是否继续呢?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$message({
						type: 'success',
						message: '停用成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取停用'
					});
				});

			},
			open3() {
				this.$notify({
					title: '成功',
					message: '刷新成功了哟，点击可关闭',
					type: 'success'
				});
			}
		}
	}
</script>

<style scoped>
	h2 {
		margin: 5px 0 18px 0;
	}
	
	.br {
		border: 0.5px solid #6085B0;
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