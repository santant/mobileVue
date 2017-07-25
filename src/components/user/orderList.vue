<template>
	<div id="orderList">
		<mt-header title="我的订单">
		  <router-link to="" v-tap='{methods:linkGo}' slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon="" slot="right"></mt-button>
		</mt-header>
		<div class="order" v-for="(itmes,indexs) in dataList">
			<ul>
				<li>
					<span>订单号</span>
					<span>{{itmes.code}}</span>
					<span v-if='itmes.status == -1' v-tap="{methods:delectFn,index:indexs,dbid:itmes.dbId}"><i class="icon iconfont">&#xe68a;</i></span>
				</li>
				<li>
					<span>状态</span>
					<span>{{itmes.orderState}}</span>
				</li>
				<li class="ordersContent" v-for="(order,index) in itmes.cars">
					<div class="orderContent">
						<ul>
							<li>
								<img :src="order.thumbnailImageUrl"/>
							</li>
							<li>
								<ul>
									<li>
										<span>{{order.sku | splitSku}}</span>
									</li>
									<li>{{order.sku | splitSkuLast}}</li>
									<li>¥{{order.price}}</li>
								</ul>
							</li>
							<li>
								<span>X{{order.num}}</span>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<p>2017-06-09  13:32</p>
					<p>共{{itmes.num}}件商品</p>
					<p>合计：<span>¥{{itmes.total}}</span></p>
				</li>
				<li>
					<div>
						<p v-bind:hidden="itmes.status != 1" v-tap="{methods:cancleOrder,dbId:itmes.dbId,index:indexs}"> 取消订单</p>
						<p v-bind:hidden="itmes.status != 1" class="active" v-tap="{methods:gotoOrderPay,dbId:itmes.dbId}">立即支付</p>
					</div>
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
   import { Toast ,Actionsheet,Popup,Indicator,MessageBox} from 'mint-ui';	
   import Api from '../../API.js'
    export default {
        data() {
            return {
             	dataList:[]
            }
        },
//      beforeRouteEnter(to,from,next){
//			console.log(to)
//			console.log(from)
//			next()
//		},
        methods: {
        	gotoOrderPay(params){ 
                var ordJson = {
                    orderDbId:params.dbId, 
                    userDbId:localStorage.getItem("userDbId")
                }; 

                Api.car.cloneOrder(ordJson).then(res=>{
                     if(res.data.code == 'success'){
                        var orderDbId = res.data.orderDbId;
                        var openId = res.data.openId;
                        var addressDbId = res.data.addressDbId;
                        var userDbId = localStorage.getItem("userDbId");
 
                         var payUrl = "#orderStatus?paymentType=WX&addressId="+addressDbId+"&dbId="+orderDbId+"&userDbId="+userDbId+"&openId="+openId; 
                         location.href = payUrl; 
                     } else {
                         Toast('此订单数据错误，请联系客服！');
                     }
                     //console.log(res)
                 },err=>{
                     Toast('数据请求错误');
                 })
				
        	},
        	cancleOrder(params){
        		
        		
        		MessageBox({
					  title: '我的订单',
					  message: '您确认取消该条订单吗？',
					  showCancelButton: true
					}).then((res)=>{
						if(res=="confirm"){
							Api.car.cancleOrder({dbId:params.dbId}).then(res=>{
				        			this.dataList[params.index].status = -1;
				        			this.dataList[params.index].orderState = '已取消';
				        			//console.log(res)
				        		},err=>{
				        			Toast('数据请求错误');
				        		})
						}
									
					})
        	},
        	delectFn(params){ 
        		var jsons = {
        			sessionId:this.getFromSession("sessionId"),
        			dbId:params.dbid
        		}
        		var that = this;
        		
        		MessageBox({
					  title: '我的订单',
					  message: '您确认删除此条订单吗?',
					  showCancelButton: true
					}).then((res)=>{
						if(res=="confirm"){
							that.dataList.splice(params.index,1);
							Api.car.deleteOrder(jsons).then(res=>{ 
		        				if(res.data.code == 'success'){
									Toast('订单删除成功');
									if(this.dataList.length < 1){
										MessageBox.alert('您当前没有任何订单请去创建').then(action => {
					        				location.href=""		
										});
									}
									
								}
			        		},err=>{
									Toast('数据请求错误');
			        			
			        		})
						}
									
					})
        		},
	        linkGo(){
				this.vurRouterGo();
			}
        },
        mounted() {
        	Api.car.orderListStatus({userDbId:localStorage.getItem("userDbId")}).then(res=>{
        		this.dataList = res.data.results;
        		console.log(this.dataList)
        		if(this.dataList.length < 1){
        			
        			MessageBox.alert('您当前没有任何订单请去创建').then(action => {
        				location.href=""		
					});
        				
        		}
        	},err=>{
				Toast('数据请求错误');
        	})
        }
    }
</script>

<style>
</style>