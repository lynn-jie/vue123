<template>
	<div>

		<!--pageTitle-->
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

			<!--新增表单对话框-->
			<el-dialog title="新增" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="控制器ID" :label-width="formLabelWidth">
						<el-input v-model="form.iccd" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="设备名称" :label-width="formLabelWidth">
						<el-input v-model="form.device_name" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="add">确 定</el-button>
				</div>
			</el-dialog>

			<el-button size="medium" type="success" @click="open3">刷新</el-button>
			<!--<el-button size="medium" type="danger" @click="open6">删除</el-button>-->
		</div>

		<!--修改对话框对话框-->
		<el-dialog title="修改" :visible.sync="dialogFormVisibles">
			<el-form :model="form">
				<!--<el-form-item label="控制器ID" :label-width="formLabelWidth">
					<el-input v-model="form.iccd" auto-complete="off"></el-input>
				</el-form-item>-->
				<el-form-item label="设备名称" :label-width="formLabelWidth">
					<el-input v-model="form.device_name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibles = false">取 消</el-button>
				<el-button type="primary" @click="modify">确 定</el-button>
			</div>
		</el-dialog>

		<!--标题栏-->
		<el-table v-loading="loading" element-loading-text="拼命加载中" :data="tableData" style="width: 100%" class="table">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="控制器ID">
				<template slot-scope="scope">
					<p>{{ scope.row.iccd }}</p>
				</template>
			</el-table-column>
			<el-table-column label="设备状态">
				<template slot-scope="scope">
					<p>{{ scope.row.switch_status }}</p>
				</template>
			</el-table-column>
			<el-table-column label="设备名称" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.device_name }}</p>
				</template>
			</el-table-column>
			<el-table-column label="已使用时长" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.last_maintain_time }}</p>
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">

					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<!--<el-button size="mini" type="primary" @click="dialogFormVisible = true">修改</el-button>-->
					<el-button size="mini" type="danger" @click="open6(scope.$index, scope.row)">删除</el-button>

					<!--<el-switch v-model="val"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>-->

					<el-button size="mini" type="primary" @click="open9(scope.$index, scope.row)">打开设备 </el-button>
					<el-button size="mini" type="danger" @click="close9(scope.$index, scope.row)">关闭设备 </el-button>

				</template>
			</el-table-column>
		</el-table>

		<!--分页栏-->
		<div class="paging block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="total, prev, pager, next" :total="total">
			</el-pagination>
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
				tableData: [
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
				dialogFormVisibles: false,
				form: {
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					factory_time: '',
					device_type: '',
					ctrl_phone_number: '',
					device_model: '',
					status: '',
					device_name: '',
					last_maintain_time: '',
					id: '',
					iccd: '',
					switch_status: '',
				},
				formLabelWidth: '120px',
				val: true,
				dialogVisible: false,
				currentPage: 1,
				total: 0,
				size: 100,
				pages: 1,
				loading: false,

			}

		},
		created() {

			this.init();

		},

		methods: {
			// 每页多少条
			handleSizeChange(size) {
				this.pagesize = size;
			},
			// 单击分页
			handleCurrentChange(val) {
				this.pages = val,
					this.loading = true,
					this.init(),
					setTimeout(() => {
						//						loading.close();
						this.loading = false;
					}, 300)
			},
			//获取设备信息
			init() {
				axios.get(api.apidomain + 'deviceinfo/search', {
						params: {
							n: this.size,
							p: this.pages,
						}

					})
					.then(response => {
						this.tableData = response.data.data;
						this.total = response.data.data.length;
						this.size = response.data.size;

					})
					.catch(error => {
						console.log(error);
						console.log('网络错误189');
					});
			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			//			设备开
			open9(index, row) {
				axios.post(api.apicd + 'device/' + row.iccd + '/open', {})
					.then(response => {

					})
					.catch(error => {
						console.log(error);

					});
			},
			//			设备关
			close9(index, row) {
				axios.post(api.apicd + 'device/' + row.iccd + '/close', {})
					.then(response => {
						console.log('控制器关闭成功')

					})
					.catch(error => {
						console.log(error);

					});
			},

			// 添加信息
			add() {
				axios.post(api.apidomain + 'deviceinfo', {
						// id: this.form.id,
						iccd: this.form.iccd,
						device_name: this.form.device_name,
						status: 1,
						device_type: 1,

					})
					.then(response => {
						//			console.log(this.tableData);
						//			console.log(123)
						//			alert('恭喜添加成功！');
					})
					.catch(error => {
						console.log(error);
						
						this.$notify.error({
							title: '错误提醒：',
							message: '控制器已经存在，请修改后提交哈'
						});

					});
				this.dialogFormVisible = false;
				this.init();

			},
			// 修改数据对话框 获取

			handleEdit(index, row) {
				this.dialogFormVisibles = true;
				this.form.iccd = row.iccd;
				this.form.device_name = row.device_name;
				this.form.id = row.id;
			},

			// 修改数据 提交 ,注意修改不能修改控制器iccd
			modify() {
				axios.put(api.apidomain + 'deviceinfo', {
						id: this.form.id,
						iccd: this.form.iccd,
						device_name: this.form.device_name,
					})
					.then(response => {
						this.init();
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误254行');

					});
				this.dialogFormVisibles = false;

			},

			// 删除
			open6(index, row) {
				axios.post(api.apidomain + 'deviceinfo/updateStatus/' + row.id + '?status=0', {});
				this.$confirm('此操作将删除该数据 , 是否继续呢?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取删除'
					});
				});
				this.init();
			},
			//刷新
			open3() {
				this.$notify({
					title: '成功',
					message: '刷新成功了哟，点击可关闭',
					type: 'success'
				});
				this.init();
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