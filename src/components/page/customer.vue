<template>
	<div>
		

		<h2>客户管理</h2>

		<div class="nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>客户管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="br"></div>

		<!-- 新增按钮 -弹出表格-->
		
		<div class="btn">

			<el-button size="medium" type="primary" @click="dialogFormVisible = true">新增</el-button>
			<el-dialog title="新增" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.phone" auto-complete="off"></el-input>
					</el-form-item>
					<!--<el-form-item label="机构数量" :label-width="formLabelWidth">
						<el-input v-model="form.orgcount" auto-complete="off"></el-input>-->
						<!--<el-input-number v-model="form.orgcount" @change="handleChange" :min="0" :max="500" label="请输入"></el-input-number>-->
					<!--</el-form-item>-->
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="add">确 定</el-button>
				</div>
			</el-dialog>

			<el-button size="medium" type="success" @click="open3()">刷新</el-button>
			<!--<el-button size="medium" type="danger" @click="open6()">停用</el-button>-->

		</div>


		<!--修改按钮弹出框-->
		
		<div class="modification">
			<el-dialog title="修改" :visible.sync="dialogFormVisibles">
				<el-form :model="form">
					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.phone" auto-complete="off"></el-input>
					</el-form-item>
					<!--<el-form-item label="机构数量" :label-width="formLabelWidth">-->
						<!--<el-input v-model="form.number" auto-complete="off"></el-input>-->
						<!--<el-input-number v-model="orgcount" @change="handleChange" :min="0" :max="500" label="请输入"></el-input-number>-->
						<!--<el-input v-model="form.orgcount" auto-complete="off"></el-input>-->
					<!--</el-form-item>-->
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisibles = false">取 消</el-button>
					<el-button type="primary" @click="modify">确 定</el-button>
				</div>
			</el-dialog>
		</div>


		<!--viwe 界面-->
		
		<el-table :data="tableData" style="width: 100%" class="table">
			<el-table-column type="selection" width="55">
			</el-table-column>
			
			<el-table-column  label="客户名称" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.name }}</p>
				</template>
			</el-table-column>
			
			<el-table-column  label="电话" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.phone }}</p>
				</template>
			</el-table-column>
			
			<el-table-column  label="空间数量">
				<template slot-scope="scope">
					<p>{{ scope.row.orgcount }}</p>
				</template>
				
			</el-table-column>
			
			<el-table-column prop="createTime" label="创建日期" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.createTime }}</p>
				</template>
			</el-table-column>

			<el-table-column label="操作">

				<template slot-scope="scope">
					<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>-->
					<router-link to="../usermgt">
						<el-button size="mini" type="warning" @click="sendId(scope.$index, scope.row)">用户管理</el-button>
					</router-link>
					<router-link to="../organization">
						<el-button size="mini" type="warning" @click="sendId(scope.$index, scope.row)">机构管理</el-button>
					</router-link>

					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<el-button size="mini" type="danger" @click="open6(scope.$index, scope.row)">删除</el-button>
				
				</template>
			</el-table-column>
		</el-table>
		
		
		<!--分页栏-->
		
		<div class="paging block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="total, prev, pager, next" :total="500">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	//	import vPageTitle from '../common/pageTitle.vue';
	import axios from 'axios';

	import api from '../../api/api.js';

	import { vm, cusid ,orgid } from "../../common/vm.js";

	export default {
		data() {
			return {
				tableData: [
					//				{
					//					date: '2016-05-02',
					//					name: ' 南京蒙特梭利幼儿园 ',
					//					telephone: '025-5201314',
					//					number: '15'
					//				}
				],
				
				dialogFormVisible: false,
				dialogFormVisibles: false,
				form: {
					id: '',
					name: '',
					createTime: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					linkman: '',
					phone: '',
					status:'',
					tel:'',
					fax:'',
					orgcount:'',
				},
				formLabelWidth: '120px',
				currentPage: 1,
			}

		},

		created() {

			this.init();

		},
		methods: {
			sendId(index, row) {
				vm.$emit(cusid, row.id)
				
			},
			//修改
			handleEdit(index,row){
//				console.log(index,row);
				this.dialogFormVisibles = true;
				this.form.id = row.id;
				this.form.name = row.name;
				this.form.phone = row.phone;
				this.form.orgcount = row.orgcount;
			},
//			删除
			open6(index, row) {
//				console.log(index, row);
				axios.post(api.apidomain + 'customer/updateStatus/'+ row.id +'?status=0',{
				});		
				this.$confirm('此操作将该数据删除 , 是否继续呢?', '提示', {
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
						message: '已取消停用'
					});
				});
				this.dialogFormVisible = false;
				this.init();

			},
			//	    刷新控件
			open3() {
				this.$notify({
					title: '成功',
					message: '刷新成功了哟，点击可关闭',
					type: 'success'
				});
				this.init();
			},
			//     表单 input 添加数量 按钮
			handleChange(val) {
				console.log(val);
			},
			//    分页控件 
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},

			//	      获取列表数据
			//			init() {
			//
			//				axios.get(api.apidomain + 'customer/search?n=100&p=1', {
			//
			//					})
			//					.then(response => {
			//						this.tableData = response.data.data;
			//						
			//
			//					})
			//					.catch(error => {
			//						console.log(error);
			//						console.log('网络错误，请重启...');
			//
			//					});
			//			},

			//  获取 
			init() {
				axios.get(api.apidomain + 'customer/search', {
						params: {
							n: 200,
							p: this.currentPage,
						}
					})
					.then(response => {
						this.tableData = response.data.data;
						console.log(response)
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误，请重启...');

					});
			},
			//  添加
			add() {
				axios.post(api.apidomain + 'customer', {
			//		    id: this.form.id,
						name: this.form.name,
						phone: this.form.phone,
						linkman: this.form.linkman,
						createTime: this.form.createTime,
						orgcount: this.orgcount,
						
						

					})
					.then(response => {
						//			console.log(this.tableData);
						//			console.log(123)
						//			alert('恭喜添加成功！');
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');

					});
				this.dialogFormVisible = false;
				this.init();

			},
			
			//  修改
			modify() {
				axios.put(api.apidomain + 'customer', {
						id: this.form.id,
						name: this.form.name,
						phone: this.form.phone,
						linkman: this.form.linkman,
						createTime: this.form.createTime,
						orgcount: this.orgcount,					

					})
					.then(response => {
						//			console.log(this.tableData);
						//			console.log(123)
						//			alert('恭喜添加成功！');
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
					});
				this.dialogFormVisibles = false;
				this.init();

			},
			
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