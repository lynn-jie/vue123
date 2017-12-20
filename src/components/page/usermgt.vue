<template>
	<div>
		<!--<v-pageTitle vtitle="EditorPage"></v-pageTitle>-->
		<h2>用户管理</h2>
		<div class="nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户管理</el-breadcrumb-item>

			</el-breadcrumb>

		</div>

		<div class="br"></div>

		<div class="btn">

			<el-button size="medium" type="primary" @click="dialogFormVisible = true">新增</el-button>
			<el-button size="medium" type="success" @click="open3">刷新</el-button>
			<!--新增内嵌表格-->
			<el-dialog title="新增" :visible.sync="dialogFormVisible">
				<div class="tell">有情提醒：电话号码注册后不可修改哦</div>
				<el-form :model="form">
					

					<el-form-item label="姓名" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.phone" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" :label-width="formLabelWidth">
						<el-input v-model="form.mail" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item  label="密码" :label-width="formLabelWidth">
						<el-input type="password" v-model="form.passwd" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="add">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		<!--修改对话框-->
		<div id="modify">
			<el-dialog title="修改" :visible.sync="dialogFormVisibles">
				<el-form :model="form">

					<el-form-item label="姓名" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<!--<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.phone" auto-complete="off"></el-input>
					</el-form-item>-->
					<el-form-item label="邮箱" :label-width="formLabelWidth">
						<el-input v-model="form.mail" auto-complete="off"></el-input>
					</el-form-item>
					<!--<el-form-item  label="密码" :label-width="formLabelWidth">
						<el-input type="password" v-model="form.passwd" auto-complete="off"></el-input>
					</el-form-item>-->
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisibles = false">取 消</el-button>
					<el-button type="primary" @click="modify">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		
		
		
		<!--标题栏-->
		<el-table  v-loading="loading" element-loading-text="拼命加载中" :data="tableData" style="width: 100%" class="table">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column  label="用户名称">
				<template slot-scope="scope">
					<p>{{ scope.row.name }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="电话">
				<template slot-scope="scope">
					<p>{{ scope.row.phone }}</p>
				</template>
			</el-table-column>
			<el-table-column label="邮箱" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.mail }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="状态 ">
				<template slot-scope="scope">
					<p>{{ scope.row.status }}</p>
				</template>
			</el-table-column>
			<el-table-column prop="customer_id	" label="注册时间">
				<template slot-scope="scope">
					<p>{{ scope.row.customer_id }}</p>
				</template>
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">

					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<!--<el-button size="mini" type="primary" @click="dialogFormVisible = true">修改</el-button>-->
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					
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
	import {vm,cusid} from "../../common/vm.js";
	
	let str = '';
	
	vm.$on(cusid,(count)=>{
		str = count
	});
	
	export default {
		data() {
			return {
				tableData: [
//				{
	
//					device_name: 'V12332JSA12SH',
//					status: '离线',
//					time: '250小时',
//					surplus: '2800小时'
//				},
//				{
//					controlid: 'X12332JSA12SH',
//					status: '在线',
//					time: '250小时',
//					surplus: '2800小时'
//
//				}, 
				],
				value4: true,
				dialogFormVisible: false,
				dialogFormVisibles: false,
				form: {
					device_name: '',
					ctrl_phone_number: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					last_login_time:'',
					phone: '',
					status: '',
					mail: '',
					reg_time: '',
					customerId: '',
					id: '',
					passwd: '',

				},
				formLabelWidth: '120px',
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
			// 获取
			init() {
				if(window.localStorage){ 
				if(!str){
                     str=localStorage.getItem("str")
				}
				localStorage.setItem("str",str);
			}
				axios.get(api.apidomain +'user/incustomer/'+ str +'?n=100&p=1', {
					})
					.then(response => {
						this.tableData = response.data.data;
						this.total = response.data.total;
						this.size = response.data.size;
						
					})
					.catch(error => {
						console.log(error);
						
					});
			},		
			// 添加
			add() {
				axios.post(api.apidomain + 'user', {
//					    id: this.form.id,
					    customerId:str,
						name: this.form.name,
						phone: this.form.phone,
						mail: this.form.mail,
						passwd:this.form.passwd,

					})
					.then(response => {
						this.init();
					})
					.catch(error => {
						console.log(error);
						alert('亲，您的手机号已经存在，请修改后提交')

					});
				this.dialogFormVisible = false;
				
			},
			//  删除
			handleDelete(index, row) {
				axios.post(api.apidomain + 'user/updateStatus/'+ row.id +'?status=0',{
				})
				this.$confirm('此操作将删除该数据 , 是否继续呢?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.init();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//	修改
			handleEdit(index,row){
				this.dialogFormVisibles = true;
				this.form.name = row.name;
				this.form.phone = row.phone;
				this.form.mail = row.mail;
				this.form.passwd = row.passwd;
				this.form.id = row.id;
				
			},
			//	修改
			modify() {
				axios.put(api.apidomain + 'user', {
						id:this.form.id,
						customerId:str,
						name: this.form.name,
						phone: this.form.phone,
						mail: this.form.mail,
						passwd:this.form.passwd,		

					})
					.then(response => {
						this.init();
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
					});
				this.dialogFormVisibles = false;
				

			},
			//	刷新
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
	.tell {
		color: cornflowerblue;
		margin-bottom: 20px;
		text-align: center;
	}
</style>