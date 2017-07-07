<template>
	<div id="khSelect">
		<file-load @getImgData="getImg" :extraPostDatas="extraPostData" :sheetVisible="sheetV" ></file-load>
		
		<mt-header title="艺术框画">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right"></mt-button>
		</mt-header>
		<div class="bbsImg">
			<div class="contioner" :style="{width:CaseData.currentWidth,height:CaseData.currentHeight,backgroundImage:CaseData.urls}">
				<div class="hx" :style="{width:CaseData.smallWidth,height:CaseData.smallHeight}">
					<img @click="imgshow" src="http://image2.artup.com/resources/static/img/p_sucai_02.jpg" alt="" />
					<div class="imgBox" >
						<span>编辑</span>
						<img src="" alt="" />
					</div>
				</div>
			</div>
		</div>
		<dl class="slect_dl">
			<dt>
				选择尺寸
			</dt>
			<dd>
				<div v-tap='{methods:updataSize}'  class="dd_slect size dd_slectWidth dd_active">
					400mmx500mm
				</div>
				<div v-tap='{methods:updataSize}' class="dd_slect size dd_slectWidth ">
					
					530mmx740mm
				</div>
				<div v-tap='{methods:updataSize}' class="dd_slect size dd_slectWidth ">
					
					500mmx500mm
				</div>
				<div v-tap='{methods:updataSize}' class="dd_slect size dd_slectWidth ">
					
					500mmx400mm
				</div>
				<div v-tap='{methods:updataSize}' class="dd_slect size dd_slectWidth ">
					
					740mmx530mm
				</div>
			</dd>
		</dl>
		<dl class="slect_dl">
			<dt>
				选择框型
			</dt>
			<dd>
				<div v-tap='{methods:updataType}' class="dd_slect type dd_slectWidth dd_active">
					棕色木框
				</div>
				<div v-tap='{methods:updataType}'  class="dd_slect type dd_slectWidth ">
					银细边铝框
				</div>
				<div v-tap='{methods:updataType}'  class="dd_slect type dd_slectWidth ">
					银平面铝框
				</div>
				<div v-tap='{methods:updataType}' class="dd_slect type dd_slectWidth ">
					原木色木框
				</div>
				<div v-tap='{methods:updataType}' class="dd_slect type dd_slectWidth ">
					银立体铝框
				</div>
				<div v-tap='{methods:updataType}' class="dd_slect type dd_slectWidth ">
					银宽边铝框
				</div>
				<div v-tap='{methods:updataType}' class="dd_slect type dd_slectWidth ">
					黑细边铝框
				</div>
				<div v-tap='{methods:updataType}' class="dd_slect type dd_slectWidth ">
					黑平面铝框
				</div>
				<div v-tap='{methods:updataType}' class="dd_slect type dd_slectWidth ">
					黑宽边铝框
				</div>
			</dd>
		</dl>
		<i style="height: 2.9375rem; display: block; width: 100%;"></i>
		<div class="cart_btn"><div class="price">
			合计<span><b>¥</b>0.01</span></div> <div class="crectOrder">
			下一步
		</div></div>
	</div>
</template>
	
<script>
	import selectKh from '../../../store/selectKh.js'
	import fileLoad from '../../component/publicComponent/fileLoad.vue'
	export default{
		data(){
			return{
				CaseData:'',
				size:'',
				type:'',
				sheetV:false, //组件的开关
				extraPostData:{
					category :"kuanghua",
					client :'mobile',
					channel:'',
					userDbId :"", 
					picPage : 1,
					picNum : 1,
					styleType : 1,
					editCnfName :'kuanghua_400X500',
					templateCode : 'kuanghua_400X500',				
					defDbId:'6afedcf6-b0e4-447d-afd9-c70449f42f50'
				}
			}
		},
		components:{  
	       fileLoad
	    },
		methods:{
			imgshow(){ //显示上传
				this.sheetV =!this.sheetV;
			},
			getImg(val){ //获取组件图片
				console.log(val)
			},
			updataType(params){//选择框型
				this.type = $(params.event.target).text();
				$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active')
				this.initStyle();
				
			},
			updataSize(params){//选择尺寸
				this.size = $(params.event.target).text();
				$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active')
				this.initStyle();				
			},
			initStyle(){//初始化数据
				var size = this.trimStr(this.size);
				var type = this.trimStr(this.type)
				var datas = selectKh.init.selectK(size,type);
				this.CaseData = datas;
				console.log(this.CaseData)
			},
			trimStr(str){//字符串去空格
				return str.replace(/(^\s*)|(\s*$)/g,"");
			}

		},
		mounted(){
			 this.addToSession();
			 
			/*默认画框样式*/
			this.size = this.trimStr($('.size:nth-child(1)').text());
			this.type = this.trimStr($('.type:nth-child(1)').text());
			this.initStyle();
			
			
		
		
		}
	}
</script>
	
</script>

<style>
</style>