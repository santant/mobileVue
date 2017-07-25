<template>
	<div id="bbs-select">
		<mt-header title="选择产品">
		  <router-link to="" href="javascript:window.history.go(-1);" v-tap slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>		
		<div class="bbsImg">
			<img src="http://image2.artup.com/resources/static/img/bbs.png"/>
		</div>
		

		<dl class="slect_dl">
			<dt>
				选择日期
			</dt>
			<dd>
				<div   v-model="popupVisible" v-tap='{methods:selects}' class="dd_slect size dd_slectWidth dd_active">
					{{years}}
				</div>
				<div v-model="popupVisible" v-tap='{methods:selects}' class="dd_slect size dd_slectWidth ">
					{{month}}
				</div>
				
			</dd>
		</dl>
		<dl class="slect_dl">
			<dt>
				选择尺寸
			</dt>
			<dd>
				<div  class="dd_slect size dd_slectWidth dd_active">
					195mmx145mm
				</div>
				<div  class="dd_slect size dd_slectWidth ">
					145mmx195mm
				</div>
				
			</dd>
		</dl>
		<dl class="slect_dl">
			<dt>
				选择颜色
			</dt>
			<dd>
				<div  class="dd_slect size dd_slectWidth dd_active">
					白色
				</div>
				<div  class="dd_slect size dd_slectWidth ">
					咖啡色
				</div>
				
			</dd>
		</dl>
		<mt-popup style='width: 100%;' v-model="popupVisible" popup-transition="popup-up" position="bottom">
			
			<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		</mt-popup>
		
		<i style="height: 2.9375rem; display: block; width: 100%;"></i>
		<div class="cart_btn">			
			<div class="price">
				合计<span><b>¥</b></span></div> 
			<div  v-tap="{methods : nextPage}" class="crectOrder">
				下一步
			</div>
		</div>
		
	</div>	
</template>

<script>
	import Api from '../../../API.js'	
	import { Toast,Indicator,MessageBox,Picker,Popup } from 'mint-ui';	
//	import {mapGetters, mapActions} from 'vuex'
	export default{
		data(){
			return{
				years:new Date().getFullYear(),
				month:1,
				slots: [
			        {
			          flex: 1,
			          values: ['2017'],
			          className: 'slot1',
			          textAlign: 'right'
			        }, {
			          divider: true,
			          content: '-',
			          className: 'slot2'
			        }, {
			          flex: 1,
			          values: ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12'],
			          className: 'slot3',
			          textAlign: 'left'
			        }
			      ],
				bbs:{				
				},
				bbsSlsectDate:{ //给后端传递的数据
					
				},
				price:0, //价格,
				popupVisible:false
			}
		},
		methods:{
			onValuesChange(picker, values) {
		      if (values[0] > values[1]) {
		       	 picker.setSlotValue(1, values[0]);
		   
		      }
		      //this.years = picker.getValues()[0];
		      this.month = picker.getValues()[1];
		   },
		   nextPage(picker, values){
		   	 
		   },
		   selects(){
		   
		   	this.popupVisible = !this.popupVisible;
		   }
		},
		mounted(){
			
		}
	}
</script>

<style>
	
</style>