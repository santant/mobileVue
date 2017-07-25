<template>
	<div id="payOrder">
		<!--头-->
		<mt-header title="确认订单">
		  <router-link to="" v-tap="{methods:linkGo}" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right"></mt-button>
		</mt-header>
		<div v-bind:hidden="addresBool" class="address" v-tap="{methods:addAddress}">
			<span>+</span>&nbsp;请添加收货地址
		</div>
		<div class="addressContet" v-bind:hidden="!addresBool" v-tap="{methods:updataAddress}">
			<ul>
				<li><span>收件人姓名</span><span>{{addressData.name | subStr}}({{addressData.mobile}})</span></li>
				<li>{{addressData.province}}{{addressData.address | splitAddress}}</li>
				<i class="icon iconfont">&#xe65f;</i>
			</ul>
		</div>
		<div class="content">
			<div class="contentList clearfix">
				<ul class="clearfix">
					<li class="clearfix" v-for="(itmes,index) in dataList">
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
							<span>￥{{total}}</span>
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
		<i style="height: 2.93rem;display: block;width: 100%;"></i>
		<div class="bottomBar">
			<ul>
				<li>合计<span>￥{{total |toFixedTwo}}</span></li>
				<li><span v-tap="{methods:gotoOrderPay}">确认订单</span></li>
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
              addresBool :false,
              car:'',
              total:0
            }
        },
        methods: {
        	
        	gotoOrderPay(){
        		if(this.addresBool != true){
        			Toast('地址不能为空');
        			return;
        		}
			var jsons = {
				userDbId:localStorage.getItem("userDbId"),
				cars:this.car
			}
			Api.car.createOrder(jsons).then(res=>{ 
				if(res.data.code == 'success'){
                    var orderDbId = res.data.orderDbId;
                    var openId = res.data.openId;
                    var userDbId = localStorage.getItem("userDbId");
					//alert(res.data.orderDbId)
					 var payUrl = "#orderStatus?paymentType=WX&addressId="+this.addressData.dbId+"&dbId="+orderDbId+"&userDbId="+userDbId+"&openId="+openId; 
          			 location.href = payUrl;

				}
			},err=>{
				Toast('请求错误');
			})
        		
          
        	},
        	updataAddress(){
        		
        		location.href="#Address?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("userDbId");
        	},
        	addAddress(){
        		location.href="#Address?openId="+this.$route.query.openId+"&orderDbId="+this.$route.query.orderDbId+"&userDbId="+localStorage.getItem("userDbId");
        	},
        linkGo(){
			this.vurRouterGo();
		}
        },
        mounted() {
        	 this.car = sessionStorage.getItem('cars'); 
        	var jsons = {
        		dbId:this.car
        	}
        	 Api.car.queryCar(jsons).then(res=>{ 
           	if(res.data.length > 0){
           		this.dataList = res.data;
           		for(var i = 0; i<this.dataList.length; i++){
           			this.total += Number(this.dataList[i].total)
           		} 
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