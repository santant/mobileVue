<template>
	<div id="tlEdit">
		<file-load @getImgData="getImg" :extraPostDatas="extraPostData" :sheetVisible="sheetV" ></file-load>
		<mt-header :title="tittle" id='titt'>
		  <router-link to=""  v-tap="{ methods:linkGo }"  slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		  <mt-button icon="" id='nt' v-bind:hidden="finishWork == false" v-tap="{methods:nextFn}"  slot="right">下一步</mt-button>
		  <mt-button icon="" id='gc'  v-tap="{methods:addCar}"  slot="right">加入购物车</mt-button>
		</mt-header>
		<div class="tlEditTop">
			<span>{{size}}</span>
			<span>{{statDt}}</span>
		</div>
		<div class="max">
			<div class="tlEditContent" v-for="(item,index) in taili">
				<div :class="cssName">
					<img @click="imgshow(index)"  class="updateBtn" src="http://image2.artup.com/resources/static/img/p_sucai_02.jpg" alt="" />
					<div class="myImgBox" >
						<img class="showImg" src="" attrImg='' alt="" />
						<span class="editSpan"  v-tap='{methods:editer,indexs:index}'>编辑</span>
					</div>
				</div>
				<img :class="imgName" v-if="item.imgUrl" :src="item.imgUrl" alt="" />
				<div class="tiData">{{item.code}}</div>
			</div>
		</div>
		
		<i style="height: 2.9375rem; display: block; width: 100%;"></i>
		<!--<div class="addCarBtn" v-bind:hidden="finishWork == true" >加入购物车</div>-->
		<div class="cart_btn">
			<div class="price">
				价格：<span><b>¥</b>{{price}}</span>
			</div> 
			<div  v-model="popupVisible" v-tap='{methods:selects}' class="bgrq">
				变更日期
			</div>
			<div v-bind:hidden="finishWork == true" v-tap="{methods:nextFn}" class="crectOrder">
				下一步
			</div>
			<div v-bind:hidden="finishWork == false"  v-tap="{methods:addCar}"  class="crectOrder">
				加入购物车
			</div>
		</div>
		<mt-popup style='width: 100%;' v-model="popupVisible" popup-transition="popup-up" position="bottom">
			<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		</mt-popup>
		<edit-img @editFinish="editFinish"></edit-img>
	</div>
	
</template>

<script>
	import fileLoad from '../../component/publicComponent/fileLoad.vue'
	import Api from '../../../API.js'	
	import { Toast,Indicator,MessageBox,Picker,Popup } from 'mint-ui';	
//	import {mapGetters, mapActions} from 'vuex'
	export default{
		data(){
			return{
				taili:[{
					code:"封面"
				}],
				dataArrImg:[],
				tittle:'台历编辑',
				finishWork:false,
				cssName:'',
				imgName:'',
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
			     popupVisible:false,
				years:'',
				month:'',
				size:'',
				sheetV:false, //组件的开关
				defDbId:'f80b4c98-15ca-4da0-b482-0c8270c2eac6',
				statDt:'',
				extraPostData:{
					category :"taili",
					client :'mobile',
					channel:'',
					userDbId :"", 
					picNum : 1,
					styleType : 1,
					editCnfName :'',
					templateCode : '',				
					defDbId:''
				},
				 
	          	imgData:'',//图片数据
	          	workEdit:{ //给后端保存或者编辑完成下一步传递的对象
                        format:"json",
                        ignore:"true",
                        operator:"add",
                        edtDbId:'',// 新生成的产品才有的字段
                        tplCode:sessionStorage.getItem('taili_templateCode'), //暂时写死,父组件带入
//                      sessionId:localStorage.getItem("sessionId"),
                        userDbId:localStorage.getItem('userDbId'),
//                      client:"mobile",//渠道前端传递，暂时写死
                        category:this.getFromSession("category"),//产品类型这里是宝宝书
                        defDbId:'', //tplCode 模版暂时写死,父组件带入
                        channelCode:"zc",//暂时写死
                        sku:'',//产品调sku
                        editPicture:[],//产品图片
                        editTxt:[],
                        thumbnailImageUrl:'',//第一板式的第一张缩略图
                        status:2
                  },
                  ImgHashMap:'',//存储图片的hasmap
                  textHashMap:'',
                  extraCode:'',
                  eitDataHashMap:'',
                  price:''
			}
		},
		components:{  
	       fileLoad
	    },
		methods:{
			selects(){
		   		this.popupVisible = !this.popupVisible;	
		  	 },
		   onValuesChange(picker, values) {
		      if (values[0] > values[1]) {
		       	 picker.setSlotValue(1, values[0]);
		   
		      }
		      //this.years = picker.getValues()[0];
		      if( this.month){
		      	 this.month = picker.getValues()[1];
		      	  this.fuoundData(this.years,this.month);
		      }
		    
		   },
			imgshow(index){ //显示上传
				this.sheetV =!this.sheetV;
				this.extraPostData.picPage = index+1;
				
			},
			editer(params){
				var editData={//编辑图片都数据
	                    oSrc:'',
	                    imgSize: {oW:'', oH: ''},
	                    actions:'',
	                    customParams:{
	                        thumbnailScale:''
	                    }
	          	}
			   if ($(params.event.target).hasClass("editSpan")) {

				editData.oSrc = this.ImgHashMap.getvalue(params.indexs+1).thumbnailImageUrl;
				editData.picNum = params.indexs+1;
			   		editData.imgSize = {
			   			oW: $('.myImgBox').width(), 
			   			oH: $('.myImgBox').height()
			   		}
			   		editData.customParams = {
			   			thumbnailScale:this.ImgHashMap.getvalue(params.indexs+1).actions.thumbnailScale,
			   			picPage:params.indexs+1
			   		}
				
			   
			   if(this.eitDataHashMap.getvalue(params.indexs+1)){
			   	this.editorImage(this.eitDataHashMap.getvalue(params.indexs+1));
			   }else{
			   	this.editorImage(editData);
			   	this.eitDataHashMap.putvalue(params.indexs+1,editData);
			   }
			  
			   }
			},
			 getImg(val){ //获取组件图片
			 //	console.log(val);
			 	//this.imgData = val;
			 	//this.dataArrImg.push(this.imgData)
				$('.showImg').eq(val.picPage-1).attr('src',val.previewThumbnailImageUrl);
				$('.showImg').eq(val.picPage-1).next('span').show();
				$('.showImg').eq(val.picPage-1).parent('.myImgBox').show();
				$('.showImg').eq(val.picPage-1).attr('attrImg',val.thumbnailUrl);//存原图
				$('.updateBtn').eq(val.picPage-1).hide();
//				setTimeout(function(){
//					dragThumb($('.showImg').eq(val.picPage-1),$('.showImg').eq(val.picPage-1).parent('.myImgBox'))
//				},200);
				var picObj = {
				 	"constName":val.picPage,
				 	"picDbId" : val.pictureDbId,
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
				 this.ImgHashMap.putvalue(val.picPage,picObj)
				
				 var tl_code = this.taili[val.picPage-1].code;
				 var textMapVal = {"content":tl_code,"page":val.picPage,"num":1,"editCnfIndex":val.styleType,"editCnfName" : val.editCnfName};						
				 this.textHashMap.putvalue(val.picPage,textMapVal)
				// this.workEdit.editPicture.push(picObj);
				 //this.workEdit.thumbnailImageUrl = val.thumbnailUrl;
				 //this.workEdit.tplCode = this.templateCode;
				console.log(val)
			},
			editFinish(data){
				console.log(data)
				var imgBox = $('.showImg').eq(data.postData.picPage-1);
				imgBox.attr('src',data.imgData);
				//console.log(data.imgData)
				imgBox.css(
					{width:"100%",height:"100%",top:0,left:0}
				);
				//alert(data.postData.picPage)
				this.eitDataHashMap.getvalue(data.postData.picPage).actions = data.postData;
			//	this.eitDataHashMap.putvalue(data.postData.picPage)
				//console.log(this.ImgHashMap.getvalue(data.postData.picPage))
				//console.log(data.postData)
				this.ImgHashMap.getvalue(data.postData.picPage).actions = data.postData; 
				
			},
			//调起编辑图片组件
			 editorImage(jsons){
			 	console.log(jsons)
			 	
	            //console.log('宽高',jsons)
	            this.$store.commit(
	                'showEditor',
	                {
	                    imgSrc: jsons.oSrc,
	                    imgSize: {width: jsons.imgSize.oW, height:  jsons.imgSize.oH},
	                    initialCrop:jsons.actions,
	                    customParams:{
	                        thumbnailScale:jsons.customParams.thumbnailScale,
	                        picPage:jsons.customParams.picPage
	                    }
	                }
	            )
	      },
		fuoundData(year,month){
			 	this.taili=[{
					code:"封面"
				}];
			 	for(var i=0; i<12; i++){
			 		
			 		if((parseInt(month)+i) > 12){
			 			var obj = {
			 				code:(parseInt(year)+1)+'年'+((parseInt(month)+i) - 12)+"月",
			 				year:(parseInt(year)+1),
			 				month:((parseInt(month)+i) - 12)
			 			}
			 			this.taili.push(obj);
			 		}else{
			 			var obj = {
			 				code:year+'年'+(parseInt(month)+i) +"月",
			 				year:year,
			 				month:(parseInt(month)+i)
			 			}
			 			this.taili.push(obj);
			 		}
			 	}
			 	this.statDt = this.taili[1].code;
			 	//return codeArr;
			 },
			nextFn(){
				//$('#titt').text('预览')
				
				 var arrMap = []; //台历图片
				 var textMap = [];
				 if(this.ImgHashMap.keys().length < 13){
				 	Toast('图片上传不完整!');
				 	return;
				 }
				 $('.bgrq').hide();
				 $('.updateBtn').hide();
				this.tittle = '台历预览'
				 for (var i = 0; i < this.ImgHashMap.keys().length; i++) {
					var picObject = this.ImgHashMap.getvalue(this.ImgHashMap.keys()[i]);
					//console.log(picObject)
					if(picObject.thumbnailImageUrl){
						arrMap.push(this.ImgHashMap.getvalue(this.ImgHashMap.keys()[i]));
					}else{
						Toast('第'+(picObject.page)+'页图片上传不完整!');
					}
                    //if (this.ImgHashMap.getvalue(this.ImgHashMap.keys()[i])) {
                    //    arrMap.push(this.ImgHashMap.getvalue(this.ImgHashMap.keys()[i]));
                    //}
                }
				for(var j = 0; j<this.textHashMap.keys().length; j++){
					if(this.textHashMap.getvalue(this.textHashMap.keys()[j])){
						textMap.push(this.textHashMap.getvalue(this.textHashMap.keys()[j]))
					}
					
				}
				this.workEdit.sku = this.skuName;
				this.workEdit.skuCode = this.skuCode;
				this.workEdit.editPicture = JSON.stringify(arrMap);
				this.workEdit.editTxt = JSON.stringify(textMap);
				//存入有图的首张图片
//              for (var i = 0; i < arrMap.length; i++) {
//              		if (arrMap[i].thumbnailImageUrl) {
//              			this.workEdit.thumbnailImageUrl=arrMap[i].thumbnailImageUrl;
//              			break;
//              		}
//              }
                $('.editSpan').hide();
               	for(var i=1; i<	this.taili.length; i++ ){
               		this.taili[i].imgUrl = 'http://image2.artup.com/resources/static/img/taili/taili_'+this.size+'/'+this.taili[i].year+this.taili[i].month+'.jpg'
               	}
               $('.max').append("<img class=\""+this.imgName+"\" src=\"http://image2.artup.com/resources/static/img/taili/taili_"+this.size+"/end.jpg\" />");
                Api.work.workEdit(this.workEdit).then((res)=>{
                		if(res.data.code == 'success'){
                			this.finishWork = !this.finishWork;
                			$('#gc').show();
                			$('#nt').hide();
                			this.extraCode = res.data.extraCode;
                			this.workEdit.thumbnailImageUrl=res.data.commandTitle;
                		} 
                })
              	//console.log(this.workEdit)
			},
			addCar(){
				var jsons = {
                    operator:"add",
//                  sessionId:localStorage.getItem("sessionId"),
                    userDbId:localStorage.getItem("userDbId"),
                    client:"mobile",//渠道前端传递，暂时写死
                    category:this.getFromSession("category"),//产品类型这里是宝宝书,暂时写死
                    edtDbId:	this.extraCode,
                    price:this.price,
                    num:1,
                    discount:'',
                    channelCode:"zc",
                    opSystem:'',
                    thumbnailImageUrl:this.workEdit.thumbnailImageUrl,
                    total:this.price,
                    sku : this.skuName,
                    skuCode : this.skuCode
                }
				Indicator.open({text: '添加购物车...',spinnerType: 'fading-circle'}); 
                Api.car.addCar(jsons).then(res=>{
                    //var category = "baobaoshu"
                    Indicator.close();		
                    location.href="#cart?edtDbId="+this.extraCode+"&category="+this.getFromSession("category");
                },err=>{
                	 	Indicator.close();		
                    Toast('添加购物车出错');
                })
			},
	        linkGo(){
				this.vurRouterGo();
			}
		},
		mounted(){
			this.years = this.$route.query.years;
			this.month = this.$route.query.month;
			this.size = this.$route.query.size;
			this.type = this.$route.query.type;
			this.price = this.$route.query.price;
			this.cssName = 'tl_'+this.size;
			this.imgName = 'tl_img_'+this.size;
			this.fuoundData(this.years,this.month);
			this.statDt = this.taili[1].code;
			this.extraPostData.defDbId = this.defDbId;
			this.extraPostData.templateCode = sessionStorage.getItem('taili_templateCode');
			this.extraPostData.editCnfName = sessionStorage.getItem('taili_editCnfName');
			this.extraPostData.defDbId = this.defDbId;
			this.extraPostData.userDbId = localStorage.getItem("userDbId");
			this.ImgHashMap = new HashMap(); //图片
			this.textHashMap = new HashMap();//文字
			this.eitDataHashMap = new HashMap();
			this.skuName = sessionStorage.getItem('taili_skuName');
			this.skuCode = sessionStorage.getItem('taili_skuCode');
			$('#gc').hide();
			
		}
	}
</script>

<style>
</style>