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

			<!--新增 内嵌表格-->

			<el-dialog title="新增" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="机构名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off" placeholder='请输入机构名称'></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.tel" auto-complete="off" placeholder='请输入固定电话或11位手机号码'></el-input>
					</el-form-item>

					<!--联级选择择器  begin methode-->
					<el-form-item label="地址" :label-width="formLabelWidth">

						<div class="cascader ">
							省
							<select id="p" v-model="provinceId">
								<option value="">请选择</option>
								<option v-for="item in provinces" v-bind:value="item.id">{{ item.name }}</option>
							</select>
							市
							<select id="c" v-model="cityId">
								<option value="">请选择</option>
								<option v-for="item in citys" v-bind:value="item.id">{{ item.name }}</option>
							</select>
							区
							<select id="c" v-model="countyId">
								<option value="">请选择</option>
								<option v-for="item in countys" v-bind:value="item.id">{{ item.name }}</option>
							</select>
						</div>

						<el-input v-model="form.address" auto-complete="off" placeholder='请输入具体地址'></el-input>
					</el-form-item>
					<!--联级选择择器  end -->

				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click='add'>确 定</el-button>
				</div>
			</el-dialog>

			<el-button size="medium" type="success" @click="open3">刷新</el-button>
			<!--<el-button size="medium" type="danger" @click="open6">停用</el-button>-->

		</div>
		
		
		<div class="Modify">

			<!--修改表格-->

			<el-dialog title="修改" :visible.sync="dialogFormVisibles">
				<el-form :model="form">
					<el-form-item label="机构名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off" placeholder='请输入机构名称'></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.tel" auto-complete="off" placeholder='请输入固定电话或11位手机号码'></el-input>
					</el-form-item>

					<!--联级选择择器  begin methode-->
					<el-form-item label="地址" :label-width="formLabelWidth">

						<div class="cascader ">
							省
							<select id="p" v-model="provinceId">
								<option value="">请选择</option>
								<option v-for="item in provinces" v-bind:value="item.id">{{ item.name }}</option>
							</select>
							市
							<select id="c" v-model="cityId">
								<option value="">请选择</option>
								<option v-for="item in citys" v-bind:value="item.id">{{ item.name }}</option>
							</select>
							区
							<select id="c" v-model="countyId">
								<option value="">请选择</option>
								<option v-for="item in countys" v-bind:value="item.id">{{ item.name }}</option>
							</select>
						</div>
						<el-input v-model="form.address" auto-complete="off" placeholder='请输入具体地址'></el-input>
					</el-form-item>
					<!--联级选择择器  end -->
				</el-form>

				<div slot="footer" class="dialog-footer">
					
					<el-button @click="dialogFormVisibles = false">取 消</el-button>
					<el-button type="primary" @click="modify">确 定</el-button>
				</div>
			</el-dialog>

		

		</div>
		
		<!--标题栏-->
		<el-table :data="tableData" style="width: 100%" class="table">
			<el-table-column type="selection" width="55">
			</el-table-column>
			
			<el-table-column label="机构名称">
				<template slot-scope="scope">
					<p>{{ scope.row.name }}</p>
				</template>
			</el-table-column>
			<el-table-column label="电话" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.tel }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="省">
				<template slot-scope="scope">
					<p>{{ scope.row.provinceStr }}</p>
				</template>
			</el-table-column>
			<el-table-column label="市">
				<template slot-scope="scope">
					<p>{{ scope.row.cityStr }}</p>
				</template>
			</el-table-column>
			<el-table-column label="区/县">
				<template slot-scope="scope">
					<p>{{ scope.row.countyStr }}</p>
				</template>
			</el-table-column>
			<el-table-column  label="地址">
				<template slot-scope="scope">
					<p>{{ scope.row.address }}</p>
				</template>
			</el-table-column>
			<el-table-column label="创建日期" width="180">
				<template slot-scope="scope">
					<p>{{ scope.row.date }}</p>
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">

					<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>-->

					<router-link to="../space">
						<!--<el-button size="mini" type="warning" @send="">空间管理</el-button>-->
						<el-button size="mini" type="warning" @click="sendId(scope.$index, scope.row)">空间管理</el-button>

					</router-link>
					
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<!--<el-button size="mini" type="primary" @click="dialogFormVisible = true">修改</el-button>-->
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

				</template>
				
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
	import axios from 'axios';
	import api from '../../api/api.js';

	import { vm, cusid ,orgid} from "../../common/vm.js";
	
	
	let str = '';

	vm.$on(cusid, (count) => {
		str = count;
		
	});

	
	export default {

		data() {
			return {
				num1: '',
				tableData: [
//				{
//						date: '2016-05-02',
//						name: '蒙特梭利幼儿园江宁分校',
//						telephone: '13605152933',
//						number: '10',
//						address: '南京市江宁区清水亭东路9号万科金域蓝湾70号'
//					},
//					{
//						date: '2016-05-04',
//						name: ' 蒙特梭利幼儿园江宁分校 ',
//						telephone: '13605152933',
//						number: '10',
//						address: '南京市江宁区清水亭东路9号万科金域蓝湾70号'
//					}
				],
				dialogFormVisible: false,
				dialogFormVisibles: false,
				formLabelWidth: '120px',
				form: {
					id:'',
					name: '',
					region: '',
					tel:'',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				provinces: [],
				citys: [],
				countys: [],
				provinceId: '',
				cityId: '',
				countyId: '',
			}

		},

		created() {

			this.init();
			this.province();

		},
		watch: {
			provinceId(curVal, oldVal) {
				//	console.log(curVal+'-'+oldVal);
				axios.get(api.apidomain +'address/city/list/' + curVal, {

					}).then(response => {

						this.citys = response.data;

					})
					.catch(error => {
						console.log(error);

					});
			},

			cityId(curVal, oldVal) {
				//console.log(curVal+'-'+oldVal);
				axios.get(api.apidomain +'address/county/list/' + curVal, {

					}).then(response => {
						this.countys = response.data;
					})
					.catch(error => {
						console.log(error);

					});
			}

		},

		methods: {
			sendId(index, row) {
			
				vm.$emit(orgid,row.id)
			},
			handleDelete(index, row) {
			
				axios.post(api.apidomain + 'org/updateStatus/'+ row.id +'?status=0',{
					})
					.then(response => {
						alert('删除成功');
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
					});
				this.dialogFormVisible = false;
				this.init();
			},
			
//          对话框form添加数据
			handleEdit(index,row){
			
				this.dialogFormVisibles = true;
				this.form.id = row.id;
				this.form.name = row.name;
				this.form.tel = row.tel;
				this.form.address = row.address;
				this.form.provinceStr = row.provinceStr;
				this.cityId = row.cityId;
				this.countyId =	row.countyId;
				this.provinceId = row.provinceId;
				
				
				
			},
			// 获取
			init() {
				
				if(window.localStorage){ 
				if(!str){
                     str=localStorage.getItem("str")
				}
				localStorage.setItem("str",str);
			}
				
				axios.get(api.apidomain + 'org/list/' + str + '?n=100&p=1', {
					})
					.then(response => {
						
						this.tableData = response.data.data;
						//	alert('成功')
						
						
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');

					});
			},
			//省
			province() {
				axios.get(api.apidomain +'address/province/list', {

					}).then(response => {
						//						console.log(response);
						this.provinces = response.data;
						//						console.log(response.data);

					})
					.catch(error => {
						console.log(error);
						console.log('province错误');

					});
			},
			// 添加
			add() {
				axios.post(api.apidomain + 'org', {
						customerId:str,
						name:this.form.name,
						tel:this.form.tel,
						provinceId:this.provinceId,
						cityId:this.cityId,
						countyId:this.countyId,
						address:this.form.address
					})
					.then(response => {
						
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
			modify() {
				axios.put(api.apidomain + 'org', {
						customerId:str,
						id:this.form.id,
						name:this.form.name,
						tel:this.form.tel,
						provinceId:this.provinceId,
						cityId:this.cityId,
						countyId:this.countyId,
						address:this.form.address,			

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
//				this.init();
			},
			// 停用
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
			//刷新
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
	
	.cascader {
		margin-bottom: 15px;
	}
	
	.cascader select {
		width: 90px;
		height: 35px;
		border: 1px solid #C1CBDA;
		border-radius: 5px;
		margin-right: 10px;
	}
</style>