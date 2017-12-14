<template>
	<div>

		<p>这个是三级联动demo</p>

		<el-cascader :options="options2" @active-item-change="handleItemChange" :props="props"></el-cascader>


	<div class="cascader ">
		省
		<select id="p" v-model="provinceid">
			<option value="">请选择</option>
			<option  v-for="item in province" v-bind:value="item.id">{{ item.name }}</option>
		</select>
		市
		<select id="c" v-model="cityid">
			<option value="" >请选择</option>
			<option v-for = "item in citys" v-bind:value="item.id">{{ item.name }}</option>
			
		</select>
		区
		<select id="c" v-model="countyid">
			<option value="">请选择</option>
			<option v-for = "item in countys" v-bind:value="item.id">{{ item.name }}</option>
		</select>
	</div>


	</div>

</template>

<script>
	import VDistpicker from 'v-distpicker'

	import axios from 'axios';
	import api from '../../api/api.js';


	export default {

		data() {
			return {
				options2: [{
						label: '江苏',
						cities: []
					}, {
						label: '浙江',
						cities: []
					}
				],
				props: {
					value: 'label',
					children: 'cities'
				},
				province: [
//					{"id":1,"name":"北京市"},
//					{"id":2,"name":"天津市"},

				],
				citys:[],
				countys:[],
				provinceid:'',
				cityid:'',
				countyid:''
			};
		},
		created() {
			this.provinces();
		},
		watch:{
			provinceid(curVal){
//				console.log(curVal+'-'+oldVal);
                 
				axios.get('http://localhost/manager/address/city/list/'+curVal, {

					}).then(response => {
//						console.log(response);
						this.citys = response.data;
//						console.log(response.data);
					
					})
					.catch(error => {
						console.log(error);
						console.log('city错误');

					});
			},
		cityid(Val){
				//console.log(curVal+'-'+oldVal);
				axios.get('http://localhost/manager/address/county/list/'+Val, {

					}).then(response => {
						console.log(response);
						this.countys = response.data;
						console.log(response.data);
					
					})
					.catch(error => {
						console.log(error);
						console.log('city错误');
					});
				}
			
			
		},
		methods: {

			provinces() {
				axios.get('http://localhost/manager/address/province/list', {

					}).then(response => {
//						console.log(response);
						this.province = response.data;
//						console.log(response.data);
//						alert('成功')
					})
					.catch(error => {
						console.log(error);
						console.log('province错误');

					});
			},
			
			handleItemChange(val) {

				console.log('active item:', val);
				if(val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
					//              通过axios获取江苏省一下的城市，解析到this.options2[0].cities里面就可以啦
					//                    后台获取数据
					//                    比如
					let arr = ['南京', '苏州', '无锡', '南京', '南京', '南京', ]
					this.options2[0].cities = [];

					arr.map(function(city) {
						this.options2[0].cities.push({
							label: city
						})
					})

				} else if(val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
					this.options2[1].cities = [{
						label: '杭州'
					}];
				}
			}

		}
	};
</script>

<style scoped>
	p {
		margin-bottom: 30px;
	}
	
	#dv {
		margin: 20px;
		width: 100%;
		border: 1px solid black;
	}
</style>

<!--
	
	接口返回的数据
	
0
:
{id: 1, name: "北京市"}
1
:
{id: 2, name: "天津市"}
2
:
{id: 3, name: "河北省"}
3
:
{id: 4, name: "山西省"}
4
:
{id: 5, name: "内蒙古自治区"}
5
:
{id: 6, name: "辽宁省"}
6
:
{id: 7, name: "吉林省"}
7
:
{id: 8, name: "黑龙江省"}
8
:
{id: 9, name: "上海市"}
9
:
{id: 10, name: "江苏省"}
10
:
{id: 11, name: "浙江省"}
11
:
{id: 12, name: "安徽省"}
12
:
{id: 13, name: "福建省"}
13
:
{id: 14, name: "江西省"}
14
:
{id: 15, name: "山东省"}
15
:
{id: 16, name: "河南省"}
16
:
{id: 17, name: "湖北省"}
17
:
{id: 18, name: "湖南省"}
18
:
{id: 19, name: "广东省"}
19
:
{id: 20, name: "广西壮族自治区"}
20
:
{id: 21, name: "海南省"}
21
:
{id: 22, name: "重庆市"}
22
:
{id: 23, name: "四川省"}
23
:
{id: 24, name: "贵州省"}
24
:
{id: 25, name: "云南省"}
25
:
{id: 26, name: "西藏自治区"}
26
:
{id: 27, name: "陕西省"}
27
:
{id: 28, name: "甘肃省"}
28
:
{id: 29, name: "青海省"}
29
:
{id: 30, name: "宁夏回族自治区"}
30
:
{id: 31, name: "新疆维吾尔自治区"}
31
:
{id: 32, name: "台湾省"}
32
:
{id: 33, name: "香港特别行政区"}
33
:
{id: 34, name: "澳门特别行政区"}



-->