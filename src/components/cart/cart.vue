<template>
	<div id="cart">
		<mt-header title="购物车">
		  <router-link to="/" slot="left">
		    <mt-button icon="back">返回</mt-button>
		    <mt-button>关闭</mt-button>
		  </router-link>
		  <mt-button icon="more" slot="right"></mt-button>
		</mt-header>
		<!--购物车列表-->
		<ul class="cartList">
			<li v-for="(itme,indexs) in dataList">
				<div class="div_select" >
					<b  :class="itme.isOK ? 'activeSelect':'' "  v-tap='{methods:updateCheck,index:indexs}'  ><i class="icon iconfont">&#xe672;</i></b>
				</div>
				<div class="div_comenter">
					<div class="img_cart">
						<img v-bind:src="itme.thumbnailImageUrl" alt="" />						
					</div>
					<ol class="img_msg">
						<li>{{itme.sku | splitSku}}</li>
						<li>{{itme.sku | splitSkuLast}}</li>
						<li>{{itme.createdDt}}</li>
						<li class="pic" v-model="itme.num">¥&nbsp;{{itme.total * itme.num}}</li>
					</ol>
				</div>
				<div class="div_number">
					<ol>
						<li v-tap='{methods : reduce,num:itme.num,index:indexs}'>
							<i class="icon iconfont" v-if="itme.num>1" style="color:#666">&#xe638;</i>
							<i class="icon iconfont" v-else="" >&#xe638;</i>
						</li>
						<li v-model="itme.num">{{itme.num}}</li>
						<li v-tap='{methods : add,num:itme.num,index:indexs}'>
							<i class="icon iconfont">&#xe671;</i>
						</li>
					</ol>
				</div>
			</li>			
		</ul>
		<!--购物车底部-->
		<i style="height: 2.9375rem;display: block;width: 100%;"></i>
		<div class="cart_btn">
			<div class="all_select">
				<b v-tap='{methods:checkAll}'><i></i></b> 
				<span>全选</span>
			</div>
			<div class="price">
				合计<span><b>¥</b> {{allPic}}</span>
			</div>
			<div v-tap="{methods:gotoPayOrder}" class="crectOrder">
				结算
			</div>
		</div>
	</div>
</template>
	
<script>
	
import  Api   from '../../API.js'
import { Toast ,Actionsheet,Popup,Indicator,MessageBox} from 'mint-ui';	
export default {

	  data () {
	    return {
			dataList:[],
			price:'',
			orderNum:'',
			checkes:false,
			allPic:0,
			arr:[],
			picMap:[]
	    }
	  },
	 watch:{
　　　　
　　　　},
		methods:{
			/*添加数量*/
			add(params){
				++this.dataList[params.index].num;
				this.oPrice();

			},
			/*减少数量*/
			reduce(params){
				if( params.num > 1){
					--this.dataList[params.index].num;
					this.oPrice();
				}
			},
			oPrice(){//计算价格
				var arr = 0;
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].isOK) {
						arr+=this.dataList[i].total *this.dataList[i].num;
					}					
				}
				this.allPic = arr;
			},
			/*设置选中状态*/
			updateCheck(params){
				this.dataList[params.index].isOK = !this.dataList[params.index].isOK;
				this.oPrice();
			},
			/*全选*/
			checkAll(){
				this.dataList.forEach(function(el,n){
					el.isOK = !el.isOK;
				})
				this.oPrice();
			},
			/*跳转到结算页面*/
			gotoPayOrder(){
				var cars = [];
				var switchBool = false;
				this.dataList.forEach(function(el,n){
					if(el.isOK){
						var obj={
							dbId:el.dbId,
							num:el.num,
							price:el.total
						}
						cars.push(obj);
						switchBool = true;
					}
				})
				if(cars.length < 1){
					Toast('请选择结算产品');
				}
				if(switchBool == true){
					var jsons = {
						userDbId:localStorage.getItem("userDbId"),
						cars:JSON.stringify(cars)
					}
					Api.car.createOrder(jsons).then(res=>{
						if(res.data.code == 'success'){
							//alert(res.data.orderDbId)
							location.href="#payOrder?openId="+res.data.openId+"&orderDbId="+res.data.orderDbId+"&userDbId="+localStorage.getItem("userDbId");
						}
					},err=>{
						Toast('请求错误');
					})
				}else{
					return
				}				
			}
		},	
		mounted(){			
			var jsons = {
				
				sessionId:this.getFromSession("sessionId"),
	  			userDbId:localStorage.getItem("userDbId"),
	  			status:1,
	  			pageNum:0,
	  			pageSize:15,
	  			sort:"createdDt",
	  			order:'desc'
			}
			Api.car.carList(jsons).then(res=>{
				
				this.dataList = res.data.results;
				if(this.dataList.length < 1){
						MessageBox.alert('购物车为空，请去首页添加购买的产品').then(action => {
        				location.href=""		
					});
				}
				for (var i = 0; i < this.dataList.length; i++) {
					this.dataList[i].isOK = false;
				}
				this.oPrice();
				console.log(res)
			},err=>{
				Toast('数据请求错误');
			})
			
			console.log(this.$route.query)
			
		}
	}
	
</script>

<style>

</style>