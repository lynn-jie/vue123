<template>
	<div>
		<!--<v-pageTitle vtitle="EditorPage"></v-pageTitle>-->

		<h2>机构管理</h2>
		<div class="nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>客户管理</el-breadcrumb-item>
				<el-breadcrumb-item>机构管理</el-breadcrumb-item>
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

					<el-form-item label="机构名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.phone" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item label="地址" :label-width="formLabelWidth">
						<el-cascader :options="options2" @active-item-change="handleItemChange" :props="props"></el-cascader>
						<el-input v-model="form.address" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item label="数量" :label-width="formLabelWidth">
						<!--<el-input v-model="form.number" auto-complete="off"></el-input>-->
						<el-input-number v-model="num1" @change="handleChange" :min="0" :max="500" label="请输入"></el-input-number>
					</el-form-item>

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
			<el-table-column prop="name" label="机构名称">
			</el-table-column>
			<el-table-column prop="telephone" label="电话" width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
			<el-table-column prop="number" label="空间数量">
			</el-table-column>
			<el-table-column prop="date" label="创建日期" width="180">
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">

					<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>-->

					<router-link to="../space">

						<el-button size="mini" type="warning" @send="">空间管理</el-button>

					</router-link>

					<el-button size="mini" type="primary" @click="dialogFormVisible = true">修改</el-button>

				</template>
			</el-table-column>
		</el-table>

		<div class="paging block">

			
			<el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
			</el-pagination>
			
		</div>
	</div>
</template>

<script>
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
				num1: '',
				tableData: [
									{
										date: '2016-05-02',
										name: '蒙特梭利幼儿园江宁分校',
										telephone: '13605152933',
										number: '10',
										address: '南京市江宁区清水亭东路9号万科金域蓝湾70号'
					
									}, {
										date: '2016-05-04',
										name: ' 蒙特梭利幼儿园江宁分校 ',
										telephone: '13605152933',
										number: '10',
										address: '南京市江宁区清水亭东路9号万科金域蓝湾70号'
					
									}, 
					//				{
					//					date: '2016-05-01',
					//					name: ' 蒙特梭利幼儿园江宁分校 ',
					//					telephone: '025-5201314',
					//					number: '15',
					//					address: '江苏省南京市江宁区诚信大道8号'
					//				}, {
					//					date: '2016-05-03',
					//					name: ' 蒙特梭利幼儿园江宁分校 ',
					//					telephone: '025-5201314',
					//					number: '15',
					//					address: '江苏省南京市江宁区诚信大道8号'
					//				}
				],
				options2: [{
					id:"1",
					label: '江苏',
					cities: []
				}, {
					id:"2",
					label: '浙江',
					cities: []
				}],
				
				props: {
					value: 'label',
					children: 'cities'
				},
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

			init() {
				axios.get(api.apidomain +'org/list/'+ str +'?n=100&p=1', {

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
			},
//			add(){
//				axios.get(api.apidomain +'address/province/list')
//					.then(response => {
//						console.log(response);
//						this.tableData = response.data.data;
//						alert('成功')
//					})
//					.catch(error => {
//						console.log(error);
//						console.log('网络错误');
//						
//					});
//			},
			handleItemChange(val) {
				console.log('active item:', val);
				setTimeout(_ => {
					if(val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
						this.options2[0].cities = [{
							label: '南京'
						}];
					} else if(val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
						this.options2[1].cities = [{
							label: '杭州'
						}];
					}
				}, 300);
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