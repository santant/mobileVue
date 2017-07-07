<template>
	<div>
		
	</div>
</template>

<script>
   import { Toast ,Actionsheet,Popup,Indicator} from 'mint-ui';	
   import Api from '../../API.js'
    export default {
        data() {
            return {
             
            }
        },
        methods: {
        	
         
        },
        mounted() {
        	var jsons = {
        		paymentType:this.$route.query.paymentType,
        		addressId:this.$route.query.addressId,
        		dbId:this.$route.query.dbId,
        		userDbId:this.$route.query.userDbId,
        		openId:this.$route.query.openId,
        		subject:'微信支付'
        	};
        	
        	Api.car.orderPay(jsons).then(res=>{ 
        		if(res.data.code === 'success'){
						if(this.$route.query.paymentType==='WX'){//手机微信支付 
							wxpay(res.data,function callback(res){ 
								if(res.errMsg=="chooseWXPay:fail"){
									Toast('调起支付失败');
									Api.car.updataOrderStatus({dbId:jsons.dbId, status:1}).then(res=>{
										if(res.data.code == 'success'){
											location.href="#orderList"
										}
										
									},err=>{
										Toast('请求数据失败');
									})
									
								}else if(res.errMsg == "chooseWXPay:cancel" ) {//用户取消订单
                                    
									Api.car.updataOrderStatus({dbId:jsons.dbId, status:1}).then(res=>{
										if(res.data.code == 'success'){
											location.href="#orderList"
										}
										
									},err=>{
										Toast('请求数据失败');
									})
									Toast('调起支付失败,用户取消支付');
									
									
								}else{
									Toast('支付成功');
                                    location.href="#orderList";
								}
							}); 
						}
					} else {
						Toast('支付失败');
        				Api.car.updataOrderStatus({dbId:jsons.dbId, status:1}).then(res=>{
							if(res.data.code == 'success'){
								location.href="#orderList"
							}
							
						},err=>{
							Toast('请求数据失败');
						})
					}
        	},err=>{
        		Toast('请求数据失败');
        	})
        }
    }
</script>

<style>
</style>