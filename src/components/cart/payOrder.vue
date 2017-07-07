<template>
	<div id="payOrder">
		<!--头-->
		<mt-header title="确认订单">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right"></mt-button>
		</mt-header>
		<div v-bind:hidden="addresBool" class="address" v-tap="{methods:addAddress}">
			<span>+</span>&nbsp;请添加收货地址
		</div>
		<div class="addressContet" v-bind:hidden="!addresBool" v-tap="{methods:updataAddress}">
			<ul>
				<li><span>收件人姓名</span><span>{{addressData.name}}({{addressData.mobile}})</span></li>
				<li>{{addressData.province}}{{addressData.address | splitAddress}}</li>
				<i class="icon iconfont">&#xe65f;</i>
			</ul>
		</div>
		<div class="content">
			<div class="contentList clearfix">
				<ul class="clearfix">
					<li class="clearfix" v-for="(itmes,index) in dataList.cars">
						<div class="leftBox clearfix">
							<img :src="itmes.thumbnailImageUrl"/>
						</div>
						<div class="rightBox">
							<ul>
								<li>{{itmes.sku | splitSku}}</li>
								<li>{{itmes.sku | splitSkuLast}}</li>
								<li>{{itmes.createdDt}}</li>
								<li><span>¥{{itmes.price}}</span><span>×{{itmes.num}}</span></li>
							</ul>
						</div>
					</li>
				</ul>
				<div class="zffs">
					<ul>
						<li>
							<span>支付方式</span>
							<span><i class="icon iconfont">&#xe605;</i>微信支付</span>
						</li>
						<li>
							<span>商品金额</span>
							<span>￥{{dataList.total}}</span>
						</li>
						<li>
							<span>运费</span>
							<span>免运费</span>
						</li>
						<li>
							<span>优惠金额</span>
							<span>￥0</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="bottomBar">
			<ul>
				<li>合计<span>￥{{dataList.total}}</span></li>
				<li><span v-tap="{methods:gotoOrderPay}">订单提交</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
   import { Toast ,Actionsheet,Popup,Indicator} from 'mint-ui';	
   import Api from '../../API.js'
    export default {
        data() {
            return {
              dataList:[],
              addressData:[],
              addresBool :false
            }
        },
        methods: {
        	
        	gotoOrderPay(){
                var payUrl = "#orderStatus?paymentType=WX&addressId="+this.addressData.dbId+"&dbId="+this.dataList.dbId+"&userDbId="+this.$route.query.userDbId+"&openId="+this.$route.query.openId;
        		//console.log(payUrl);
                location.href=	payUrl;
        	},
        	updataAddress(){
        		location.href="#Address?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("sessionId");
        	},
        	addAddress(){
        		location.href="#newAddress?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("sessionId");
        	}
         
        },
        mounted() {
        	var jsons = {
        		orderDbId:this.$route.query.orderDbId,
        		openId:this.$route.query.openId,
        		userDbId:this.$route.query.userDbId,
        		sessionId:this.getFromSession("sessionId")
        	} 
           Api.car.queryOrder(jsons).then(res=>{ 
           	if(res.data.length > 0){
           		this.dataList = res.data[0];
           	} 
           },err=>{
           		Toast('数据请求错误');
           })
           var addJsons= {
           		userDbId:this.$route.query.userDbId,
           		sessionId:this.getFromSession("sessionId")
           }
           Api.address.defaultAddress(addJsons).then(res=>{
           		if(res.data.length > 0){
           			this.addressData = res.data[0];
           			this.addresBool = true;
           		} 
           },err=>{
            	Toast('数据请求错误');
           })
        }
    }
</script>

<style>
</style>