<template>
	<div id="fileLoad">
		<!-- 弹出框选上传方式 -->
		<mt-popup class="fileUpload" style="position;relative;"  v-model="sheetVisibles"  closeOnClickModal="false" position="bottom">
			<ul>
				<li id="browseButton">从本地添加</li>
				<li v-tap="{methods : slectUpload}">从素材库里导入</li>
				<li @click="sheetVisibles=false">取消</li>
			</ul>
		</mt-popup>
		<!-- 弹出框图片素材库 -->
		<mt-popup style="position;relative;"
				  v-model="popupVisible"
				  position="bottom">
			<div class="img_div">
				<ul>
					<li  v-tap="{methods : MaterialCheckImg ,index : index}"  :class="imgs.activeLi? 'liActive':'' " v-for="(imgs,index) in Material" >
						<img :src="imgs.thumbnailUrl" >
					</li>
				</ul>
				<div class="btn_button">
					<a class="Determine" v-tap="{methods : okQuery}">确认</a>
				</div>
			</div>
		</mt-popup>
	</div>	
</template>

<script>
	
	import { Toast ,Actionsheet,Popup,Indicator} from 'mint-ui';
    import Api from '../../../API.js'
    export default{  
    		 name:"file-load",
     	 data () {
            return {
            		sheetVisibles:false, //组件传递的
            		extraPostData:{}, //组件传递的
            		popupVisible:false, //素材库显示
            		Material:[], //素材库地址
            		MaterialImgIndex : 0
         	 }
        },
		props:[
			"sheetVisible",
			"extraPostDatas"
		],
		watch:{ //动态监听此方法用来触发组件内部的数据
           sheetVisible : 'countDown'
        },
        methods:{
        		countDown(){//监听更新数据
        			 this.sheetVisibles= true,
        			 this.extraPostData = this.extraPostDatas
        		},
        		slectUpload(){
        			this.sheetVisibles = false;
                this.popupVisible = true;
                //计算素材库图片的位置
                $(".img_div ul li").each(function(i,el){
                    setTimeout(function(){
                        dragThumb($(el).find("img"),$(el));
                    },100)
                })
        	   },
        	   MaterialCheckImg(params){ //选择图片
	    			this.Material.forEach((arrJson,i)=>{
	                arrJson.activeLi = false;
	            })
	            this.MaterialImgIndex = params.index;
	            this.Material[this.MaterialImgIndex].activeLi=true;
	            $(".img_div ul li").removeClass("liActive")
	            $(".img_div ul li").eq(params.index).addClass("liActive")
           },
           okQuery(){ //确认选择
           	   this.$emit('getImgData',this.Material[this.MaterialImgIndex])
           		//隐藏两个模块
           		this.sheetVisibles = false;
                this.popupVisible = false;
               
           }
        },
		mounted(){
			//父组件过来控制显示隐藏的数据
			this.sheetVisibles= this.sheetVisible;

			var oThis = this;
			
			
			 //素材库地址图片
            Api.Material.MaterialData("artup-build/service/picture/page.do","").then((res)=>{

                this.Material = res.data.results;
                //添加属性切换属性
                this.Material.forEach((arrJson,i)=>{

                    arrJson.activeLi = false;
                })
                this.Material[this.MaterialImgIndex].activeLi=true;
            })
			
			
			
			
			
			
			
			
			/* 文件上传init URL */
            var uploadUrl = Api.UPLOAD_URL+'&category='+this.getFromSession("category");
			//图片上传时提交的参数
//          var extraPostData = {};
            
            uploadInitializer($, uploadUrl, onUploadComplete);
            // //文件上传事件
            function onUploadComplete($, r){
                var browBtn = document.getElementById('browseButton');
                r.assignBrowse(browBtn, false);
                r.on('filesAdded', function(array) {
                    if(array.length > 1){alert('只能上传一张图片');return;}
                    var ok = validateUploadFiles($, array);
                    if (ok) {
                        //触发uploadStart
                        r.upload();} else {r.cancel();}
                });
                //开始上传
                r.on('uploadStart', function(){
                    //组装后端需要的数据
                    console.log(oThis.extraPostData)
//                  extraPostData  = {"templateCode" : 'templateCode', "client" : 'client', "channel" : 'channel',"picPage":"1","picNum":"1","styleType":"1","editCnfName":"框画"}
                    r.opts.query = oThis.extraPostData;
                    //打开进度框
                    Indicator.open({text: '图片上传中...',spinnerType: 'fading-circle'});
                    //关闭上弹块儿
                    oThis.sheetVisibles = false;
                });
                //上传中
                r.on('progress', function (e) {
                    var progress = Number(r.progress());
                    var progressWidth = progress.toFixed(2)*100;
                    //进度条显示
                    $(".mint-indicator-text").text("上传中..."+parseInt(progressWidth)+'%')
                });
                //上传成功
                r.on('fileSuccess', function(file, message){
                		console.log('上传成功')
                		this.sheetVisibles= false;
                		//给父级的回调
                    oThis.$emit('getImgData',$.parseJSON(message))
                    Indicator.close();
                });
            }
			
			
			
			
			
		},
		
  }
	
</script>

<style>
</style>