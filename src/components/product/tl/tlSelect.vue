<template>
	<div id="bbs-select">
		<mt-header title="选择产品">
		  <router-link to="" href="javascript:window.history.go(-1);" v-tap slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>		
		<div class="bbsImg bbsImgTl">
			<img v-model="imgUrl" :src="imgUrl"/>
		</div>
		

		<dl class="slect_dl">
			<dt>
				选择日期
			</dt>
			<dd>
				<div v-model="popupVisible" v-tap='{methods:selects}' class="dd_slect date dd_slectWidth">
					{{years}}年
				</div>
				<div v-model="popupVisible" v-tap='{methods:selects}' class="dd_slect date dd_slectWidth ">
					{{month}}
				</div>
				
			</dd>
		</dl>
		<dl class="slect_dl">
			<dt>
				选择尺寸
			</dt>
			<dd>
				<div data-code= '195X145'  v-tap='{methods:updateSize}' class="dd_slect size dd_slectWidth dd_active">
					195mmX145mm
				</div>
				<div data-code= '145X195' v-tap='{methods:updateSize}' class="dd_slect size dd_slectWidth ">
					145mmX195mm
				</div>
				
			</dd>
		</dl>
		<dl class="slect_dl">
			<dt>
				选择颜色
			</dt>
			<dd>
				<div data-code= 'white' v-tap='{methods:updateType}'  class="dd_slect type dd_slectWidth dd_active">
					白色
				</div>
				<div data-code= 'coffee' v-tap='{methods:updateType}' class="dd_slect type dd_slectWidth ">
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
				价格：<span><b>¥</b>{{price}}</span></div> 
			<div  v-tap="{methods : nextPage}" class="crectOrder">
				
				下一步
			</div>
		</div>
		
	</div>	
</template>

<script>
	import Api from '../../../API.js'	
	import selectTl from '../../../../static/js/selectTl.js'
	import { Toast,Indicator,MessageBox,Picker,Popup } from 'mint-ui';	
//	import {mapGetters, mapActions} from 'vuex'
	export default{
		data(){
			return{
				years:new Date().getFullYear(),
				month:1,
				skuCode:'',
				skuName:'',
				sizeCode:'',
				colorCode:'',
				slots: [
			        {
			          flex: 1,
			          values: ['2017年'],
			          className: 'slot1',
			          textAlign: 'right'
			        }, {
			          divider: true,
			          content: '-',
			          className: 'slot2'
			        }, {
			          flex: 1,
			          values: ['1月', '2月', '3月', '4月', '5月', '6月','7月','8月','9月','10月','11月','12月'],
			          className: 'slot3',
			          textAlign: 'left'
			        }
			      ],
				bbs:{				
				},
				bbsSlsectDate:{ //给后端传递的数据
					
				},
				price:"", //价格,
				popupVisible:false,
				size:'',//选择台历的尺寸
				type:'',//选择的颜色类型
				imgUrl:''//显示台历样式的图片数据
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
		   	location.href="#tlEdit?years="+this.years+'&month='+this.month+'&size='+this.sizeCode+'&type='+this.type+'&price='+this.price;
		   },
		   selects(){
		   	this.popupVisible = !this.popupVisible;

		   },
		   updateSize(params){
		   	this.size = $(params.event.target).text();
		   	this.sizeCode = $(params.event.target).attr('data-code');
		   	this.initStyle();
		   	$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active')
		   },
		   updateType(params){
		   	this.type = $(params.event.target).text();
		   	this.colorCode = $(params.event.target).attr('data-code');
		   	this.initStyle();
		   	$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active')
		   },
		   trimStr(str){//字符串去空格
				return str.replace(/(^\s*)|(\s*$)/g,"");
			},
			initStyle(){//初始化数据
				var size = this.trimStr(this.size);
				var type = this.trimStr(this.type);
				var imgUrl = selectTl.init.selectK(size,type);
				this.imgUrl = imgUrl;
				this.skuName = "台历."+ size+'.'+type;
				this.templateCode = 'taili_'+this.sizeCode;
				this.skuCode = 'taili.'+this.sizeCode+'.'+this.colorCode;
				sessionStorage.setItem('taili_skuName',this.skuName);
				sessionStorage.setItem('taili_templateCode',this.templateCode);
				sessionStorage.setItem('taili_editCnfName',this.templateCode + '_single');
				sessionStorage.setItem('taili_skuCode',this.skuCode);
				var paramsJson = {
						"category": this.getFromSession("category"),
						"parameter" : this.skuCode
					};
				 	//请求价格:			
				Api.sku.querySku(paramsJson).then((res)=>{ 
					console.log(res)
					 this.price = res.data.price;
					 //this.bbsSlsectDate.price = res.data.price;
					 sessionStorage.setItem("hbPrice",this.price)
				})
			},
			 editorImage(jsons){ 
                this.$store.commit(
                    'showEditor',
                    {
                        imgSrc: jsons.oSrc,
                        imgSize: {width: jsons.oW, height: jsons.oH},
                        initialCrop:jsons.actions,
                        customParams:{
                            thumbnailScale:jsons.thumbnailScale
                        }
                    }
                )
            }
		},
		mounted(){
			this.addToSession();
			
			this.size = this.trimStr($('.size:nth-child(1)').text());
			this.type = this.trimStr($('.type:nth-child(1)').text());
			this.sizeCode = $('.size:nth-child(1)').attr('data-code');
			this.colorCode = $('.type:nth-child(1)').attr('data-code'); 
			this.initStyle();
			
			
		}
	}
</script>

<style>
	
</style>