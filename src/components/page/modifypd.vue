<template>
	<div>
		<!--<v-pageTitle vtitle="EditorPage"></v-pageTitle>-->

		<h2>修改密码</h2>
		<div class="nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/customer'}">修改密码</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="br"></div>

		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

			<el-form-item label="手机号码" prop="pass">
				<span> {{this.username}} </span>
			</el-form-item>
			<el-form-item label="新密码" prop="pass">
				<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				<el-button @click="resetForm('ruleForm2')">重置</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	import axios from 'axios';
	import api from '../../api/api.js';

	export default {
		data() {

			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};

			return {
				
				ruleForm2: {
					pass: '',
					checkPass: '',
					
				},

				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],

				},
				username: localStorage.getItem("username"),
				uid:'',
				userids: [],
			};
		},
		created() {
			this.init();
		},
		methods: {
			//	获取所有用户信息
			init() {
				axios.get(api.apidomain + 'user/search/?n=10000&p=1', {
					})
					.then(response => {
						this.userids = response.data.data;
						
			//   循环遍历
						for(var i = 0; i < this.userids.length; i++) {
			//	  判断电话相等
							if(this.userids[i].phone === this.username) {
			//   id重新赋值uid
							this.uid = this.userids[i].id;
							}
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			//    提交修改请求
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {

					axios.post(api.apidomain + 'modifypwd', {
						
						id:this.uid,
						password:this.ruleForm2.checkPass,
						
					})
					.then(response => {
						this.$message({
						type: 'success',
						message: '修改成功，重新登陆生效'
					});
					this.init();
					})
					.catch(error => {
						console.log(error);	
					});
	
					} else {
						console.log('error submit!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

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
	
	.el-form {
		width: 25%;
		margin: 0 auto;
		margin-top: 50px;
	}
</style>