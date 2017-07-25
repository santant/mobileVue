<template>
	<div id="khSelect">
		<file-load @getImgData="getImg" :extraPostDatas="extraPostData" :sheetVisible="sheetV" ></file-load>
		
		<mt-header title="艺术海报">
		  <router-link to="" v-tap="{ methods:linkGo }" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right"></mt-button>
		</mt-header>
		<div class="bbsImg">
			<div class="contioner" style="background-color: #fff;" :style="{width:CaseData.currentWidth,height:CaseData.currentHeight,backgroundImage:CaseData.urls}">
				<div class="hx">
					<img @click="imgshow" id="updateBtn" src="http://image2.artup.com/resources/static/img/p_sucai_02.jpg" alt="" />
					<div class="imgBox" >
						<span class="editSpan"  v-bind:hidden="finishWork == true" v-tap='{methods:editer}'>编辑</span>
						<img id="showImg" src="" attrImg='' alt="" />
					</div>
				</div>
			</div>
		</div>
		<dl class="slect_dl" v-bind:hidden="finishWork == true">
			<dt>
				选择尺寸
			</dt>
			<dd>
				<div v-tap='{methods:updataSize}' data-code='400X500'  class="dd_slect size dd_slectWidth dd_active">
					400mmX500mm
				</div>
				<div v-tap='{methods:updataSize}' data-code='500X700' class="dd_slect size dd_slectWidth ">
					
					500mmX700mm
				</div>
				<div v-tap='{methods:updataSize}'data-code='700X500' class="dd_slect size dd_slectWidth ">
					
					700mmX500mm
				</div>
				<div v-tap='{methods:updataSize}' data-code='500X500' class="dd_slect size dd_slectWidth ">
					
					500mmX500mm
				</div>
				<div v-tap='{methods:updataSize}' data-code='500X400' class="dd_slect size dd_slectWidth ">
					
					500mmX400mm
				</div>
			</dd>
		</dl>

		<i style="height: 2.9375rem; display: block; width: 100%;"></i>
		<div class="addCarBtn" v-bind:hidden="finishWork == false" v-tap="{methods:addCar}">加入购物车</div>
		<div class="cart_btn"><div class="price">
			价格<span><b>¥</b>{{price}}</span></div> <div v-bind:hidden="finishWork == true" v-tap="{methods:nextGoCar}" class="crectOrder">
			下一步
		</div></div>
		<edit-img @editFinish="editFinish"></edit-img>
	</div>
	
</template>
	
<script>
	import selectKh from '../../../../static/js/selectHb.js'
	import fileLoad from '../../component/publicComponent/fileLoad.vue'
    import Api from '../../../API.js'
	import { Toast,Indicator,MessageBox,Picker,Popup } from 'mint-ui';	
    
	
	export default{
		data(){
			return{
				CaseData:'',
				size:'',
				type:'',
				sheetV:false, //组件的开关
				imgData:'',
				defDbId:'d6e44ca4-511f-41d5-87df-d8d75a491c09',
				templateCode:'',
				sizeCode:'',
				typeCode:'',
				skuCode:'',
				skuName:'',
				extraCode:'',
				price:'',
				extraPostData:{
					category :"haibao",
					client :'mobile',
					channel:'',
					userDbId :"", 
					picPage : 1,
					picNum : 1,
					styleType : 1,
					editCnfName :'',
					templateCode : '',				
					defDbId:''
				},
				 workEdit:{ //给后端保存或者编辑完成下一步传递的对象
                        format:"json",
                        ignore:"true",
                        operator:"add",
                        edtDbId:'',// 新生成的产品才有的字段
                        tplCode:this.templateCode, //暂时写死,父组件带入
//                      sessionId:localStorage.getItem("sessionId"),
                        userDbId:localStorage.getItem('userDbId'),
//                      client:"mobile",//渠道前端传递，暂时写死
                        category:'',//产品类型这里是宝宝书
                        defDbId:'', //tplCode 模版暂时写死,父组件带入
                        channelCode:"zc",//暂时写死
                        sku:'',//产品调sku
                        editPicture:[],//产品图片
                        thumbnailImageUrl:'',//第一板式的第一张缩略图
                        previewThumbnailImageUrl:'',//作品缩略图
                        status:2
                   },
			  editData:{//编辑图片都数据
	                    oSrc:'',
	                    imgSize: {oW:'', oH: ''},
	                    actions:'',
	                    customParams:{
	                        thumbnailScale:''
	                    }
	          	 },
	           finishWork:false
			}
		},
		components:{  
	       fileLoad
	    },
		methods:{
			imgshow(){ //显示上传
				this.sheetV =!this.sheetV;
			},
			nextGoCar(){
				if($("#showImg").attr('src')){
					this.finishWork = !this.finishWork;
					this.workEdit.defDbId = this.defDbId;
					if(this.editData.actions){
						this.workEdit.editPicture[0].actions = this.editData.actions ;
					}
					//this.workEdit.editPicture[0].actions = this.editData.actions ;
					this.workEdit.editPicture = '['+JSON.stringify(this.workEdit.editPicture[0])+']';
					this.workEdit.sku = this.skuName;
					this.workEdit.skuCode = this.skuCode;
					this.workEdit.category = this.getFromSession('category');
					 
				   	Api.work.workEdit(this.workEdit).then((res)=>{
				   		this.extraCode = res.data.extraCode;
				   		this.workEdit.thumbnailImageUrl = res.data.commandTitle;
				   	})
			   }else{
			   	 Toast('请先上传图片');
			   }
			
			},
			getImg(val){ //获取组件图片 
				console.log(val)
				if(val.pictureDbId){
					$('.imgBox').show();
					$('#updateBtn').show();
					$('#showImg').attr('src',val.previewThumbnailImageUrl);
					$('.hx').css({
						'width':'90%',
						'height':'90%'
					})
					setTimeout(function(){
						dragThumb($('#showImg'),$('.imgBox'))
					},750)
					
					$('#showImg').attr('attrImg',$('#showImg').attr('src'));//存原图
					this.imgData = val;
					var picObj = {
					 	"constName":'1_1',
					 	"picDbId" : val.bdId,
					 	"page" :val.picPage,
					 	"editCnfIndex" :val.styleType,
					 	"num" : val.picNum,
					 	actions : {
					 	 	"thumbnailScale":val.thumbnailScale,
					 	 	"minDpiHeight":val.minDpiHeight,
					 	 	"minDpiWidth":val.minDpiWidth
					 	 },
	                     "thumbnailImageUrl":val.thumbnailUrl, 
	                     "previewThumbnailImageUrl" :val.previewThumbnailImageUrl,
	                     "crop" : "false",
	                     "editCnfName" : val.editCnfName,
	                     "userDbId":val.userDbId
					 };
					 this.workEdit.editPicture.push(picObj);
					 this.workEdit.thumbnailImageUrl = val.thumbnailUrl;
					 this.workEdit.previewThumbnailImageUrl = val.previewThumbnailImageUrl;
					 this.workEdit.tplCode = this.templateCode;
				} else {
					//Toast('上传图片失败，请重试');
				} 
			},
			updataType(params){//选择框型
				
				$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active');
				this.typeCode = $(params.event.target).attr('data-code');
				this.initStyle();				
			},
			updataSize(params){//选择尺寸
				this.size = $(params.event.target).text();
				$(params.event.target).addClass('dd_active').siblings().removeClass('dd_active');
				this.sizeCode =  $(params.event.target).attr('data-code');
				this.initStyle();	
				setTimeout(function(){
					dragThumb($('#showImg'),$('.imgBox'))
				},350)
			},
			initStyle(){//初始化数据
				var size = this.trimStr(this.size);
				var datas = selectKh.init.selectK(size);
				this.skuName = "海报."+ size;
				this.templateCode = 'haibao_'+this.sizeCode;
				this.skuCode = 'haibao.'+this.sizeCode;
				this.extraPostData.editCnfName = 'haibao_'+this.sizeCode;
				this.CaseData = datas;
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
				console.log(datas)
			},
			trimStr(str){//字符串去空格
				return str.replace(/(^\s*)|(\s*$)/g,"");
			},
			editer(params){
			   if ($(params.event.target).hasClass("editSpan")) {
			
			   		this.editData.oSrc = this.imgData.thumbnailUrl;
			   		this.editData.imgSize = {
			   			oW: $('.imgBox').width(), 
			   			oH: $('.imgBox').height()
			   		}
			   		this.customParams = {
			   			thumbnailScale:this.imgData.thumbnailScale
			   		}
			   		this.editData.customParams = this.customParams;
			   		this.editorImage(this.editData);
			   		console.log(this.editData.customParams)
			   }
			},
			editFinish(data){
				$('#showImg').attr('src',data.imgData);
				$('#showImg').css(
					{width:"100%",height:"100%",top:0,left:0}
				);
				this.editData.actions = data.postData;
				
				console.log(data)
			},
			addCar(){
				var jsons = {
                    operator:"add",
//                  sessionId:localStorage.getItem("sessionId"),
                    userDbId:localStorage.getItem("userDbId"),
                    client:"mobile",//渠道前端传递，暂时写死
                    category:this.getFromSession("category"),//产品类型这里是宝宝书,暂时写死
                    edtDbId:	this.extraCode,
                    price:'0.01',
                    num:1,
                    discount:'',
                    channelCode:"zc",
                    opSystem:'',
                    thumbnailImageUrl:this.workEdit.thumbnailImageUrl,
                    total:'0.01',
                    sku : this.skuName,
                    skuCode : this.skuCode
                }
                Api.car.addCar(jsons).then(res=>{
                    //var category = "baobaoshu"
                    location.href="#cart?edtDbId="+this.extraCode+"&category="+this.getFromSession("category");
                },err=>{
                    Toast('添加购物车出错');
                })
				
			},
			//调起编辑图片组件
			 editorImage(jsons){

	            this.$store.commit(
	                'showEditor',
	                {
	                    imgSrc: jsons.oSrc,
	                    imgSize: {width: jsons.imgSize.oW, height:  jsons.imgSize.oH},
	                    initialCrop:jsons.actions,
	                    customParams:{
	                        thumbnailScale:jsons.customParams.thumbnailScale
	                    }
	                }
	            )
	       },
	        linkGo(){
				this.vurRouterGo();
			}

		},
		mounted(){
			this.addToSession();
			 this.extraPostData.defDbId = this.defDbId;
			 this.extraPostData.userDbId = localStorage.getItem("userDbId");
			 this.sizeCode = $('.size:nth-child(1)').attr('data-code');
			/*默认画框样式*/
			this.size = this.trimStr($('.size:nth-child(1)').text());
			this.initStyle();
			
			
		
		
		}
	}
</script>
	
</script>

<style>
</style>