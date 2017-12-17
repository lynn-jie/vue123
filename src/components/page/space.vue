<template>
	<div>
		<!--<v-pageTitle vtitle="EditorPage"></v-pageTitle>-->

		<h2>空间管理</h2>
		<div class="nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>客户管理</el-breadcrumb-item>
				<el-breadcrumb-item>机构管理</el-breadcrumb-item>
				<el-breadcrumb-item>空间管理</el-breadcrumb-item>

			</el-breadcrumb>

		</div>

		<div class="br"></div>

		<div class="btn">

			<el-button size="medium" type="primary" @click="dialogFormVisible = true">新增</el-button>

			<!--新增内嵌表格-->

			<el-dialog title="新增" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="空间名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					
					<el-form-item label="净化器数量" :label-width="formLabelWidth">
						<el-input v-model="form.cleanerAmount" auto-complete="off"></el-input>
						<!--<el-input-number v-model="form.cleanerAmount" @change="handleChange" :min="0" :max="500" label="请输入"></el-input-number>-->
					</el-form-item>
					<el-form-item label="设备ID" :label-width="formLabelWidth">
							<select id="p" v-model="form.deviceId">
								<option value="">请选择</option>
								<option v-for="item in deviceinfos">{{ item.id }}</option>
							</select>
				</el-form-item>
					
				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="add">确 定</el-button>
				</div>
			</el-dialog>

			<el-button size="medium" type="success" @click="open3">刷新</el-button>
			<el-button size="medium" type="danger" @click="open6">停用</el-button>

		</div>
		
		<el-dialog title="修改" :visible.sync="dialogFormVisibles">
				<el-form :model="form">
					<el-form-item label="空间名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					
					<el-form-item label="净化器数量" :label-width="formLabelWidth">
						<el-input v-model="form.cleanerAmount" auto-complete="off"></el-input>
						<!--<el-input-number v-model="form.cleanerAmount" @change="handleChange" :min="0" :max="500" label="请输入"></el-input-number>-->
					</el-form-item>
				
				<el-form-item label="设备ID" :label-width="formLabelWidth">
							<select >
								<option value="">请选择</option>
								<option v-for="item in deviceinfos">{{ item.id }}</option>
							</select>
				</el-form-item>
					
				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisibles = false">取 消</el-button>
					<el-button type="primary" @click="modify">确 定</el-button>
				</div>
			</el-dialog>
		
		
		<!--标题栏-->
		<el-table :data="tableData" style="width: 100%" class="table">
			<el-table-column type="selection" width="55">
			</el-table-column>
			
			<el-table-column label="空间名称">
				<template slot-scope="scope">
					<p>{{ scope.row.name }}</p>
				</template>
			</el-table-column>
			<el-table-column label="控制器ID" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.deviceIccd }}</p>
				</template>
			</el-table-column>
			<el-table-column label="净化器数量">
				<template slot-scope="scope">
					<p>{{ scope.row.cleanerAmount }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="管理员">
				<template slot-scope="scope">
					<p>{{ scope.row.admin }}</p>
				</template>
			</el-table-column>
			<el-table-column label="创建日期" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.createTime }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="在线数量" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.memberCount }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="余额" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.balance }}</p>
				</template>
			</el-table-column>
			
			
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>-->
					<router-link to="../member">
						<el-button size="mini" type="warning" @click="sendId(scope.$index, scope.row)" >成员管理</el-button>
					</router-link>

					<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>

					<el-button size="mini" type="primary" @click="dialogFormVisible = true">设置</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--<div class="paging block">
			
			<el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
			</el-pagination>
		</div>-->
	</div>
</template>

<script>
	
	import axios from 'axios';
	
	import api from '../../api/api.js';
	
	import {vm, cusid, orgid} from "../../common/vm.js";
	
	
	
	let str = '';
	let orgids = '';
	
	
	vm.$on(cusid,(count)=>{
		str = count
	});
	
	
	vm.$on(orgid,(qwer)=>{
		orgids = qwer
	});
	
//	localStorage.setItem("qwer",str);
	
	
	export default {

		data() {
			return {
				tableData: [
//					{
//					date: '2016-05-04',
//					name: '大（2）班 ',
//					telephone: '025-5201314',
//					admini: '尹余',
//					controlid: 'asad2wq31ds',
//					number: '12',
//					address: '江苏省南京市江宁区秣周东路12号'
//					}
				],
				prnumber:'',
				mmnumber:'',
				dialogFormVisible: false,
				dialogFormVisibles: false,
				formLabelWidth: '120px',
				form: {
					name: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					deviceName:'',
					dayUses:'',
					yearUses:'',
					createTime:'',
					monthUses:'',
					cleanerAmount:'',
					admin:'',
					totalUses:'',
					deviceId:'',
					deviceIccd:'',
					status:'',
					memberCount:'',
//					customerId:'str',
					id:'',
					balance:'',
//					orgId:'orgids',
				},
				deviceinfos:[],
				
				
			}

		},
		created() {

			this.init();
			this.deviceinfo();

		},

		methods: {
			handleEdit(index,row){
//				console.log(index,row);
				this.dialogFormVisibles = true;
				this.form.customerId = row.customerId;
				this.form.name = row.name;
				this.form.cleanerAmount = row.cleanerAmount;
				this.form.orgId = row.orgId;
				this.form.deviceId = row.deviceId;
				
				
			},
			// 获取
			init() {
				if(window.localStorage){ 
				if(!str){
                     str=localStorage.getItem("str")
				}
				localStorage.setItem("str",str);
			}
				
				axios.get(api.apidomain +'space/list/'+ str +'?n=100&p=1', {
					
					})
					.then(response => {
						console.log(response);
						this.tableData = response.data.data;
						console.log('----------------------')
						console.log(response.data)
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
						
					});
			},
			deviceinfo() {
				axios.get(api.apidomain +'deviceinfo/search?n=100&p=1', {
					})
					.then(response => {
						console.log(response);
						this.deviceinfos = response.data.data;
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
						
					});
			},
			
			// 添加
			add() {
				console.log(str);
				axios.post(api.apidomain + 'space', {
						deviceId:this.form.deviceId,
						name:this.form.name,
						cleanerAmount:this.form.cleanerAmount,
						customerId:str,
						orgId:orgids,
						
					})
					.then(response => {
						console.log(response);
//						alert('成功')
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
					});
					
					this.dialogFormVisible = false,
					this.init();
		
			},
			// 修改
			modify(){
				axios.post(api.apidomain + 'space', {
						customerId:str,
						name:this.form.name,
						tel:this.form.tel,
						provinceId:this.provinceId,
						cityId:this.cityId,
						countyId:this.countyId,
						address:this.form.address
					})
					.then(response => {
						console.log(response);
						this.tableData = response.data.data;
//						alert('成功')
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
					});
					
					this.dialogFormVisible = false,
					this.init();
		
			},
			
			open6() {
				this.$confirm('此操作将停用该数据 , 是否继续呢?', '提示', {
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

			},
			open3() {
				this.$notify({
					title: '成功',
					message: '刷新成功了哟，点击可关闭',
					type: 'success'
				});
				this.init();
			},
			handleChange(value) {
			console.log(value);
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
	select {
		width: 90px;
		height: 35px;
		border: 1px solid #C1CBDA;
		border-radius: 5px;
		margin-right: 10px;
	}
	
	
</style>