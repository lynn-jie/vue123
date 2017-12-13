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

			<!--内嵌表格-->

			<el-dialog title="新增" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<!--<el-form-item label="角色选择" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择角色">
							<el-option label="管理员" value="shanghai"></el-option>
							<el-option label="用户" value="beijing"></el-option>
						</el-select>
					</el-form-item>-->
					<el-form-item label="空间名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="控制器ID" :label-width="formLabelWidth">
						<el-input v-model="form.deviceIccd" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="净化器数量" :label-width="formLabelWidth">

						<!--<el-input v-model="form.prnumber" auto-complete="off"></el-input>-->
						<el-input-number v-model="form.cleanerAmount" @change="handleChange" :min="0" :max="500" label="请输入"></el-input-number>

					</el-form-item>
					<el-form-item label="管理员" :label-width="formLabelWidth">
						<el-input v-model="form.admin" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="在线数量" :label-width="formLabelWidth">
						
						<!--<el-input v-model="form.mmnumber" auto-complete="off"></el-input>-->
						<el-input-number v-model="form.memberCount" @change="handleChange" :min="0" :max="500" label="请输入"></el-input-number>
					</el-form-item>
					
					<!--日期后台添加-->
					<!--<el-form-item label="日期" :label-width="formLabelWidth">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>-->
					
				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</div>
			</el-dialog>

			<el-button size="medium" type="success" @click="open3">刷新</el-button>
			<el-button size="medium" type="danger" @click="open6">停用</el-button>

		</div>

		<el-table :data="tableData" style="width: 100%" class="table">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="name" label="空间名称">
			</el-table-column>
			<el-table-column prop="deviceIccd" label="控制器ID" width="180">
			</el-table-column>
			<el-table-column prop="cleanerAmount" label="净化器数量">
			</el-table-column>
			<el-table-column prop="admin" label="管理员">
			</el-table-column>
			<el-table-column prop="createTime" label="创建日期" width="180">
			</el-table-column>
			<el-table-column prop="memberCount" label="在线数量" width="180">
			</el-table-column>
			<el-table-column prop="balance" label="余额" width="180">
			</el-table-column>
			
			
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>-->
					<router-link to="../member">
						
						<el-button size="mini" type="warning" @click="sendId(scope.$index, scope.row)" >成员管理</el-button>
						
					</router-link>

					<el-button size="mini" type="primary" @click="dialogFormVisible = true">修改</el-button>

					<el-button size="mini" type="primary" @click="dialogFormVisible = true">设置</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="paging block">
			<!-- <span class="demonstration">调整每页显示条数</span>-->
			<el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios';
	
	import api from '../../api/api.js';
	
	import {vm,cusid,spaceId} from "../../common/vm.js";
	
	let str = '';
	
	vm.$on(cusid,(count)=>{
		str = count
	});
	

	export default {

		data() {
			return {
				prnumber:'',
				mmnumber:'',
				tableData: [
					{
					date: '2016-05-04',
					name: '大（2）班 ',
					telephone: '025-5201314',
					admini: '尹余',
					controlid: 'asad2wq31ds',
					number: '12',
					address: '江苏省南京市江宁区秣周东路12号'
					}
				],
				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
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
			sendId(index, row){
				vm.$emit(spaceId,row.id)
			},
			
			init() {
				axios.get(api.apidomain +'space/list/'+ str +'?n=100&p=1', {
					
					})
					.then(response => {
						console.log(response);
						this.tableData = response.data.data;
//						alert('成功')
						console.log(response.data);
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
						
					});
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
			},
			handleChange(value) {
			console.log(value);
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