<template>
	<div id="box">
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">

			<h3 class="title">系统登录</h3>

			<el-form-item prop="account">
				<el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入账号"></el-input>
			</el-form-item>

			<el-form-item prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
			</el-form-item>

			<el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
			<el-form-item style="width:100%;">

				<el-button  type="primary" style="width:100%;" @click="login">登录</el-button>

				<!--@click.native.prevent="handleSubmit2" :loading="logining"-->

				<!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
			
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	//import { requestLogin } from '../api/api';
	//import NProgress from 'nprogress'
	
	

	
	import axios from 'axios';
	
	import api from '../../api/api.js';
	
	

	export default {
		data() {
			return {
				logining: false,
				ruleForm2: {
					account: '',
					checkPass: ''
				},
				rules2: {
					account: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						//{ validator: validaePass }
					],
					checkPass: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						//{ validator: validaePass2 }
					]
				},
				checked: true,
			};
		},
		methods: {
			handleReset2() {
				this.$refs.ruleForm2.resetFields();
			},
			login() {

				axios.post(api.apidomain + 'login', {
						username: this.ruleForm2.account,
						password: this.ruleForm2.checkPass,
					})
					.then(response => {
						localStorage.username=this.ruleForm2.account,
						sessionStorage.setItem("state", 1)
						this.$router.push({
						path: "/"
						})
						this.$message({
          				message: '欢迎回来，登陆成功',
          				type: 'success'
        });

					})
					.catch(error => {
						console.log(error);
						this.$notify.error({
							title: '有情提醒：',
							message: '帐号或密码有误请重新输入...'
						});
					});

			},
			//    13912989621
			//    123456

			//    handleSubmit2(ev) {
			//      var _this = this;
			//      this.$refs.ruleForm2.validate((valid) => {
			//        if (valid) {
			//            _this.$router.replace('/Home');
			//          this.logining = true;
			//          } 
			//          NProgress.start();
			//          var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
			//          requestLogin(loginParams).then(data => {
			//            this.logining = false;
			//            NProgress.done();
			//            let { msg, code, user } = data;
			//            if (code !== 200) {
			//              this.$notify({
			//                title: '错误',
			//                message: msg,
			//                type: 'error'
			//              });
			//            } else {
			//              localStorage.setItem('user', JSON.stringify(user));
			//              if (this.$route.query.redirect) {
			//                this.$router.push({ path: this.$route.query.redirect });
			//              } else {
			//                this.$router.push({ path: '/table' });
			//              }
			//            }
			//          });
			//        else {
			//          console.log('error submit!!');
			//          return false;
			//        }
			//      });
			//    }
			

		}
	}
</script>

<style scoped>
	.card-box {
		padding: 20px;
		/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin-bottom: 20px;
		background-color: #F9FAFC;
		margin: 180px auto;
		width: 400px;
		border: 2px solid #8492A6;
	}
	
	.title {
		margin: 0px auto 40px auto;
		text-align: center;
		color: #505458;
	}
	
	.loginform {
		width: 350px;
		padding: 35px 35px 15px 35px;
	}
	
	
</style>