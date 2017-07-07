<template>
	<div id="bbsImg">
		<mt-header  :title="titleEdit.titleEdit" v-show="previewPage" >
			<router-link  to="" slot="left">
				<mt-button v-tap="{methods : ContinueEdit}"   icon="back">继续编辑</mt-button>
			</router-link>
			<router-link to="" slot="right">
				<mt-button v-tap="{methods : goCart}">添加购物车</mt-button>
			</router-link>
		</mt-header>
		<mt-header :title="titleEdit.title" v-show="!previewPage">
			<router-link to="" v-tap="{ methods:linkGo }" slot="left">
				<mt-button  icon="back">返回</mt-button>
			</router-link>
			<router-link to="" v-tap="{methods : nextPageEdit}" slot="right">
				<mt-button>下一步</mt-button>
			</router-link>
		</mt-header>
		<!-- 宝宝书list -->
		<div class="listBox">
			<ul>
				<!--空白-->
				<li>
					<div class="bs">
						<div class="bsLeft imgBox">
						</div>
					</div>
				</li>
				<!--封面-->
				<li>
					<div class="bs">
						<div class="bsLeft imgBox">
							<div class="bstp bstpfm">
								<div class="bbs03 fmPage"></div>
							</div>
						</div>
						<div class="fmFont">封面</div>
					</div>
				</li>
				<!--扉页-->
				<li>
					<div class="bs">
						<div class="bsLeft imgBox">
							<div class="bstp bstpfm">
								<div class="bbs03  fePage">
								</div>
							</div>
						</div>
					</div>
				</li>
				<li v-for="(item,index) in typeHtml">
					<div class="bs">
						<div class="bstp bstpfm"><div v-tap="{methods : ActionsheetIn,index : index}"  v-html="item" class="bsLeft imgBox"></div></div>
						<div class="bbsBtn">
							<ul>
								<li><p>第<span>{{index+1}}</span>页</p></li>
								<li class="switchBs"><a v-tap="{methods : switchBs,index : index}">更换板式</a></li>
							</ul>
						</div>
					</div>

				</li>	

				</li>

				<li>
					<div class="bs">
						<div class="bsLeft imgBox">
							<div class="bstp bstpfm">
								<div class="bbs03  fmPage fdPage">

								</div>
							</div>
						</div>
						<div id="fengdi" class="fmFont ">
							封底
						</div>
					</div>
				</li>

				<li v-for="(item,index) in lomok">
					<div class="bs">
						<div class="bstp bstpfm"><div   v-tap="{methods : ActionsheetIn,index : index}"  v-html="item" class="bsLeft imgBox"></div></div>
						<div class="bbsBtn">
							<ul>
								<li><p>第<span>{{index+1}}</span>页</p></li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="cart_btn">
			<div class="price">
				合计<span><b>¥</b>{{bbs.oPrice}}</span></div>
			<div v-if="!previewPage" v-tap="{methods : editWork}" class="crectOrder">
				保存作品
			</div>
			<div v-if="previewPage"  v-tap="{methods : goCart}" class="crectOrder">
				添加购物车
			</div>
		</div>
		<!-- 弹出框选上传方式 -->
		<mt-popup class="fileUpload" style="position;relative;"  v-model="sheetVisible"  closeOnClickModal="false" position="bottom">
			<ul>
				<li id="browseButton">从本地添加</li>
				<li v-tap="{methods : slectUpload}">从素材库里导入</li>
				<li @click="sheetVisible=false">取消</li>
			</ul>
		</mt-popup>
		<!-- 更换板式弹出框 -->
		<div v-if="selectBS" class="box_checkBS">
			<mt-header title="板式选择">
				<router-link to="/" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<router-link to="/" slot="right">
					<mt-button   v-tap="{methods : nextBS}">下一步</mt-button>
				</router-link>
			</mt-header>
			<ul class="checkBS">
				<li v-tap="{methods : selectMoban ,index : index}" v-for="(moban,index) in mobanArr"><img v-bind:src="moban"/></li>
			</ul>
		</div>
		<!--弹出框-->
		<mt-popup v-model="textareaTexts"  popup-transition="popup-fade">
			<div class="textareaText">
				<p>请输入内容</p>
				<textarea name="" v-model="bbs.textTextarea" maxlength="40" placeholder="请输入内容(限制输入40字)" rows="" cols=""></textarea>
				<ol>
					<li><span  v-tap="{methods : cancel}" >取消</span></li>
					<li><span  v-tap="{methods : confirmText}">确认</span></li>
				</ol>
			</div>
		</mt-popup>
		<!-- 弹出框图片素材库 -->
		<mt-popup style="position;relative;"
				  v-model="popupVisible"
				  position="bottom">
			<div class="img_div">
				<!--liActive-->
				<ul>
					<li  v-tap="{methods : MaterialCheckImg ,index : index}"  :class="imgs.activeLi ? 'liActive ':'' " v-for="(imgs,index) in bbs.Material" >
						<img :src="imgs.thumbnailUrl" >
					</li>
				</ul>
				<div class="btn_button">
					<a class="Determine" v-tap="{methods : okQuery}">确认</a>
				</div>
			</div>
		</mt-popup>
		<edit-img  @selectPreview="selectPreview" @editFinish="editFinish"></edit-img>
	</div>
</template>
<script>
    import { Toast ,Actionsheet,Popup,Indicator} from 'mint-ui';
    import Api from '../../../API.js'
    export default{
        data () {
            return {
            		titleEdit:{
            			title:'',
            			titleEdit:''
            		},
                mobanArr:['http://image2.artup.com/resources/static/img/bbs_bs1.jpg','http://image2.artup.com/resources/static/img/bbs_bs2.jpg','http://image2.artup.com/resources/static/img/bbs_bs3.jpg',
                    'http://image2.artup.com/resources/static/img/bbs_bs4.jpg','http://image2.artup.com/resources/static/img/bbs_bs5.jpg','http://image2.artup.com/resources/static/img/bbs_bs6.jpg',
                    'http://image2.artup.com/resources/static/img/bbs_bs7.jpg','http://image2.artup.com/resources/static/img/bbs_bs8.jpg'],//模版对应的图片
                typeHtml:[],//宝宝书html模版
                lomok:[], //lomok卡的html模版
                sheetVisible:false, //隐藏弹出框的值
                popupVisible:false,   //素材库
                checkBS:true,//更换板式
                selectBS:false, //板式选择的模版页面
                textareaTexts:false,//文本弹出框编辑
                previewPage:false, //预览页面切换               
                bbs:{
                		oPrice:JSON.parse(sessionStorage.getItem("bbsSlsectDate")).price,//产品的价格
                    attrImg:true,//图片编辑存储的临时变量
                    index2:0,
                    templateCode : this.dataImg.dataMsg.tplCode,
                    imgUploadNumber:0,
                    textTextarea:'', //弹出框文本字段
                    Material:[], //素材库图片
                    MaterialImgIndex:0,
                    nextPageTrue:false,//变量，判断函数到底是保存操作还是下一步的操作
                    extraCode:'',//下一步最终完成跳转到购物车的extraCode  (dbid)
                    imgEdit:{ //图片编辑的对象
                        imgEditIndex : '' //我到底编辑的那个变量的map值
                    },
                    workEdit:{ //给后端保存或者编辑完成下一步传递的对象
                        format:"json",
                        ignore:"true",
                        operator:"add",
                        edtDbId:'',// 新生成的产品才有的字段
                        tplCode:this.dataImg.dataMsg.tplCode, //暂时写死,父组件带入
//                      sessionId:localStorage.getItem("sessionId"),
                        userDbId:localStorage.getItem('userDbId'),
//                      client:"mobile",//渠道前端传递，暂时写死
                        category:this.getFromSession("category"),//产品类型这里是宝宝书
                        defDbId:this.dataImg.dataMsg.defDbId, //tplCode 模版暂时写死,父组件带入
                        channelCode:"zc",//暂时写死
                        sku:JSON.parse(sessionStorage.getItem("bbsSlsectDate")).name,
                        editPicture:[],//产品图片
                        editTxt:[],//产品文字描述
                        lomo:[],//lomo卡图片
                        thumbnailImageUrl:'',//第一板式的第一张缩略图
                        status:1
                    }
                },
                editData:{}//后端需要的大对象
            }
        },
        props: ['dataImg'],
        methods:{
        	    //返回上一页
	        	linkGo(){
	        		this.vurRouterGo();
	        	},
            goCart(){
                var bbsSlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
                console.log(bbsSlsectDate)
                var jsons = {
                    operator:"add",
//                  sessionId:localStorage.getItem("sessionId"),
                    userDbId:localStorage.getItem("userDbId"),
                    client:"mobile",//渠道前端传递，暂时写死
                    category:bbsSlsectDate.category,//产品类型这里是宝宝书,暂时写死
                    edtDbId:this.bbs.extraCode,
                    price:bbsSlsectDate.price,
                    num:1,
                    discount:'',
                    channelCode:"zc",
                    opSystem:'',
                    thumbnailImageUrl:this.bbs.workEdit.thumbnailImageUrl,
                    total:bbsSlsectDate.price
                }
                Api.car.addCar(jsons).then(res=>{
                    //var category = "baobaoshu"
                    location.href="#cart?edtDbId="+this.bbs.extraCode+"&category="+bbsSlsectDate.category
                },err=>{
                    Toast('添加购物车出错');
                })
            },
            ContinueEdit(){//继续编辑
                $(this.$el).find(".editImg").show();
                $(this.$el).find(".switchBs").show();
                this.previewPage = false;
            },
            nextPageEdit(){//下一步
                //修改下一步需要绑定的变量
                this.bbs.nextPageTrue = true;
                //再次调用需要保存的方法
                this.assembleData();
            },
            assembleData(){//组装数据的函数保存数据和
                Indicator.open({text: '作品保存中...',spinnerType: 'fading-circle'});
                var arrMap = []; //宝宝书图片的
                var textArrMap = [];//文字的
                var lomArrMap = []; //lomo卡的
                for (var i = 0; i < this.editData.ImgHashMap.keys().length; i++) {
                    console.log((this.editData.ImgHashMap.getvalue(this.editData.ImgHashMap.keys()[i])))
                    if (this.editData.ImgHashMap.getvalue(this.editData.ImgHashMap.keys()[i])) {
                        arrMap.push(this.editData.ImgHashMap.getvalue(this.editData.ImgHashMap.keys()[i]));
                    }
                }
                for (var i = 0; i < this.editData.lomHashMap.keys().length; i++) {
                    if (this.editData.lomHashMap.getvalue(this.editData.lomHashMap.keys()[i])) {
                        lomArrMap.push(this.editData.lomHashMap.getvalue(this.editData.lomHashMap.keys()[i]));
                    }
                }
                for(var i = 0; i < this.editData.textMap.keys().length; i++){
                    if(this.editData.textMap.getvalue(this.editData.textMap.keys()[i])){
                        textArrMap.push(this.editData.textMap.getvalue(this.editData.textMap.keys()[i]));
                    }
                }
                //字符串转换数组存储到对象里面
                this.bbs.workEdit.editPicture = JSON.stringify(arrMap);
                this.bbs.workEdit.editTxt = JSON.stringify(textArrMap);
                this.bbs.workEdit.lomo = JSON.stringify(lomArrMap);
                //存入有图的首张图片
                for (var i = 0; i < arrMap.length; i++) {
                		if (arrMap[i].thumbnailImageUrl) {
                			this.bbs.workEdit.thumbnailImageUrl=arrMap[i].thumbnailImageUrl;
                			break;
                		}
                }
               console.log(this.bbs.workEdit)
                //保存函数
                Api.work.workEdit("artup-build/builder/cors/edit/add/command.do",this.bbs.workEdit).then((res)=>{
//				console.log(window.location.search)
                 this.bbs.workEdit.edtDbId = res.data.extraCode
//				console.log(this.$route.query.edtDbid)
                    var oThis = this;
                    if (res.data.code=="success") { //保存成功
                        Indicator.close();
                        this.bbs.extraCode= res.data.extraCode;
                        var isOK = true;
                        if(this.bbs.nextPageTrue){//如果是点击了下一步的操作
                            var oDom = $(this.$el).find(".bbsA");
                            oDom.each(function(index,el){
                                if (!isOK) {
                                    return
                                }
                                var attrs = $(el).attr("imgNum");
                                if ($(el).find(".myImgBox >img").size()==attrs) {
                                    $(el).find(".myImgBox >img").each(function(i,e){
                                        if (!$(e).attr("src")) {
                                            if ($(e).attr("class")=="lomo") {
                                                Toast('lomo卡第'+(index-oThis.typeHtml.length+1)+'页图片上传不完整!');
                                                isOK = false;
                                                return;
                                            }
                                            Toast('第'+(index+1)+'页图片上传不完整!');
                                            isOK = false;
                                            return;
                                        }
                                    })
                                }
                            })
                            //最后保存成功进行预览
                            if (isOK) {
                                $(this.$el).find(".editImg").hide();
                                $(this.$el).find(".switchBs").hide();
                                Toast("作品制作成功，预览后请加入购物车 !")
                                this.previewPage = true;
                            }
                            return;
                        }else{
                            Indicator.close();
                            Toast("保存成功")
                        }
                    }
                })
                console.log(this.bbs.nextPageTrue)
                console.log(this.bbs.workEdit)

            },
            slectUpload(){ //素材库倒入的操作
                this.sheetVisible = false;
                this.popupVisible = true;
                //计算素材库图片的位置
                $("#bbsImg .img_div ul li").each(function(i,el){
                    setTimeout(function(){
                        dragThumb($(el).find("img"),$(el));
                    },100)
                })
            },
            okQuery(){//弹出框确认选中图片操作

                //后台需要的请求dpi对象的参数json
                var jsonDpi = {}

                var thumbnailUrl = this.bbs.Material[this.bbs.MaterialImgIndex].thumbnailUrl;
                //确认回显图片到页面
//			$(".OnlyOne").attr("src",thumbnailUrl);
                $(".OnlyOne").prev(".myImgBox").show().find("img").attr("src",thumbnailUrl).attr("attrImg",thumbnailUrl);
                //让图片剧中裁切隐藏
                setTimeout(function(){
                    dragThumb($(".OnlyOne").prev(".myImgBox").find("img"),$(".OnlyOne").prev(".myImgBox"));
                    $(".OnlyOne").remove(); //清空触发弹出上传框的节点,防止vue事件委派兼容
                },100)
                var oData = this.bbs.Material[this.bbs.MaterialImgIndex];
                console.log(this.bbs)

                console.log(oData)
                jsonDpi.client = oData.client;
                jsonDpi.channel = oData.channel;
                jsonDpi.category = this.getFromSession("category");
                console.log(jsonDpi.category)
                jsonDpi.pictureDbId = oData.dbId;
                jsonDpi.templateCode= this.bbs.templateCode;
                jsonDpi.editCnfName= this.bbs.editCnfName;
                jsonDpi.picNum = this.bbs.num;
                jsonDpi.picPage = this.bbs.page;
                jsonDpi.styleType = this.bbs.styleType;

                console.log(jsonDpi)
                //素材库dpi成功
                Api.work.checkDPI(jsonDpi).then(res=>{
                    //res.data.thumbnailScale  缩放比
                    var constName = this.bbs.page+'_'+this.bbs.num; //几页加第几张图
                    var picObj = {"constName":constName,"picDbId" : oData.dbId, "page" : this.bbs.page, "editCnfIndex" : this.bbs.styleType, "num" : this.bbs.num, actions : {thumbnailScale:res.data.thumbnailScale},
                        "thumbnailImageUrl":oData.thumbnailUrl, "previewThumbnailImageUrl" :oData.previewThumbnailImageUrl, "crop" : "false","editCnfName" : this.bbs.editCnfName};

                    if (this.bbs.editCnfName=="baobaoshu_lomo") { //判断是lomo卡的东西
                        this.editData.lomHashMap.putvalue(constName,picObj);//存入lomo卡的对象
                        Indicator.close();//关闭弹出框
                        this.sheetVisible = false;
                        this.popupVisible = false;
                        return;
                    }
                    //存入图片ImgHashMap
                    this.editData.ImgHashMap.putvalue(constName,picObj);
                    console.log(this.editData.ImgHashMap.getvalue('1_1'))
                    //隐藏两个弹窗
                    this.sheetVisible = false;
                    this.popupVisible = false;
                })
            },
            editWork(){//保存作品
                console.log(this.editData)
                this.assembleData();
            },
            goAnchor(selector) { //跳转锚点的函数
                var anchor = this.$el.querySelector(selector);
                document.body.scrollTop = anchor.offsetTop;
            },
            switchBs(params){ //切换板式
                //给当前添加1个锚点id
                $("#offsetId").attr("id","");
                $(params.event.target).parents(".bs").parent("li").attr("id","offsetId");
                var oindex = params.index;
                this.bbs.index1 = oindex;
                //默认选中第一条
                this.selectBS = true;//板式选择模版
                console.log(params.event.target)
            },
            selectMoban(params){ //选择板式
                var oindex = params.index;
                this.bbs.index2 = oindex;
                //变化ui
                $(".box_checkBS .checkBS > li").removeClass("liactive");
                $(".box_checkBS .checkBS > li").eq(oindex).addClass("liactive");
            },
            nextBS(){//板式选择完毕的下一步
                var oThis = this;
                this.selectBS = false;
                var oIndexs = 'bbs'+(this.bbs.index2+1)
//              var oIndexs = 'bbs0'+(this.bbs.index2+1)
               	//修改模版板式之后清空他map里面的数据
                $("#fengdi").append(this.typeHtml[this.bbs.index1]);
                //清空图片和文字
                $("#fengdi .bbsClass").each(function(index,el){
                		var oPageNumber = oThis.bbs.index1+1+'_'+$(el).find(".sucaiClass").attr("nm");
                		oThis.editData.ImgHashMap.remove(oPageNumber);
                		oThis.editData.textMap.remove("1_1");
                })
                $("#fengdi .allBbsClass").remove();
                $("#fengdi .bbsClass").remove();
                $("#fengdi .textarea").remove();
                 //动态修改模版的板式
                this.typeHtml[this.bbs.index1] = this.dataImg.imgArrTypeData[oIndexs];
                this.goAnchor("#offsetId");//跳转锚点
            },
            MaterialCheckImg(params){//图片素材库切换
                this.bbs.Material.forEach((arrJson,i)=>{
                    arrJson.activeLi = false;
                })
                this.bbs.MaterialImgIndex = params.index;
                this.bbs.Material[this.bbs.MaterialImgIndex].activeLi=true;
                $("#bbsImg .img_div ul li").removeClass("liActive")
                $("#bbsImg .img_div ul li").eq(params.index).addClass("liActive")
            },
            ActionsheetIn(params){//ActionsheetIn 弹出框显示，选择图片上传
                console.log(params.event.target)
                //图片上传功能
                if ($(params.event.target).hasClass("sucaiClass")) {
                    //给此节点动态给1个class,方便回显的时候调用,先清空下calss避免bug
                    $(".OnlyOne").removeClass("OnlyOne");
                    $(params.event.target).addClass("OnlyOne");
                    this.sheetVisible = true;
                    //组装必须字段
                    this.bbs.page = params.index+1; //第几页需要加1
                    this.bbs.num = $(params.event.target).attr("nm"); //图片顺序号
                    this.bbs.styleType = $(params.event.target).attr("type"); //板式
                    this.bbs.editCnfName = $(params.event.target).attr("editCnfName"); //是宝宝书还是lomok
                }
                //editImg 图片编辑功能
                if ($(params.event.target).hasClass("editImg")) {
                    //编辑时候添加1个图片回显唯一标识符
                    $(".OnlyOneEditImg").removeClass("OnlyOneEditImg");
                    $(params.event.target).addClass("OnlyOneEditImg");

                    var oImg = $(params.event.target).prev("img");
                    //拿到编辑的图片地址.原图缓存到页面 属性 attrImg
                    if (this.bbs.attrImg && !oImg.attr("attrImg")) {
                        oImg.attr("attrImg",oImg.attr("src"));
                        this.bbs.attrImg=false;
                    }
                    //costName  map 索引
                    var costName = params.index+1+'_'+$(params.event.target).attr("nm");
                    this.bbs.imgEdit.oSrc = oImg.attr("attrImg");
                    this.bbs.imgEdit.imgEditIndex = costName;
                    this.bbs.imgEdit.oW = oImg.parent(".myImgBox").width();
                    this.bbs.imgEdit.oH = oImg.parent(".myImgBox").height();
                    this.bbs.imgEdit.editCnfName = '';

                    if ($(params.event.target).attr("editCnfName")) {
                        this.bbs.imgEdit.editCnfName = $(params.event.target).attr("editCnfName");
                        this.bbs.imgEdit.thumbnailScale = this.editData.lomHashMap.getvalue(costName).actions.thumbnailScale
                        this.bbs.imgEdit.actions = this.editData.lomHashMap.getvalue(costName).actions
                    }else{
                        this.bbs.imgEdit.thumbnailScale = this.editData.ImgHashMap.getvalue(costName).actions.thumbnailScale
                        this.bbs.imgEdit.actions = this.editData.ImgHashMap.getvalue(costName).actions
                    }
                    console.log(this.bbs.imgEdit)
                    this.editorImage(this.bbs.imgEdit)
                    //给地址存入vuex和浏览器
	//				this.$store.state.mutations.editImg = editImgs;
	//				localStorage.setItem("editImg",editImgs)
	//				location.href="#/editImg"
                }
                //点击弹出文本输入框
                if ($(params.event.target).hasClass("classP")) {
                    //重新定义文本框内容
                    this.bbs.textTextarea = $(params.event.target).text();
                    //给文本框加个唯一标识符
                    $(".textErea").removeClass("textErea");
                    $(params.event.target).addClass("textErea");
                    //打开弹出框
                    this.textareaTexts=true;
                    this.bbs.page = params.index+1; //第几页需要加1
                    this.bbs.num = $(params.event.target).attr("nm"); //文本的顺序
                    this.bbs.styleType = $(params.event.target).attr("type"); //板式
                    this.bbs.editCnfName = $(params.event.target).attr("editCnfName"); //是宝宝书还是lomok
                }
            },
            confirmText(){//确认按钮弹出框
                console.log(this.bbs.textTextarea)
                this.textareaTexts=false;
                $(".textErea").text(this.bbs.textTextarea)
                //组装数据模版
                var textMapVal = {"content":this.bbs.textTextarea,"page":this.bbs.page,"num":this.bbs.num,"editCnfIndex":this.bbs.styleType,"editCnfName" : this.bbs.editCnfName};
                //放入文本textMap里面
                this.editData.textMap.putvalue(this.bbs.page+"_"+this.bbs.num,textMapVal);
            },
            cancel(){ //弹窗取消操作
                this.textareaTexts=false;
                //重新定义文本框内容
                this.bbs.textTextarea = $(".textErea").text();
            },
            editorImage(jsons){
                console.log('宽高',jsons)
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
            },
            editFinish(imgData){ //图片编辑完毕的操作
                if (!this.bbs.imgEdit.editCnfName) { //宝宝书的对象
                    console.log('宝宝书对象',this.bbs.imgEdit.imgEditIndex)
                    this.editData.ImgHashMap.getvalue(this.bbs.imgEdit.imgEditIndex).actions = imgData.postData
                    console.log(this.editData.ImgHashMap.getvalue(this.bbs.imgEdit.imgEditIndex))
                }else{ //lomo卡的对象
                    console.log('lomo卡的对象',this.bbs.imgEdit.imgEditIndex)
                    this.editData.lomHashMap.getvalue(this.bbs.imgEdit.imgEditIndex).actions = imgData.postData
                }
                $(".OnlyOneEditImg").siblings("img").css("width","100%").css("height","100%").css("position","inherit").css("left","0").css("top","0").attr("src",imgData.imgData)
                console.log('编辑完毕', imgData);
            },
            selectPreview(){
                console.log('点击')
            }
        },
        mounted(){
//		Api.ajax("url22",function(fns){
//			console.log(fns)
//		})

	//首先拿到从父级传递的必要数据回填到组件中	
	this.titleEdit.title = this.dataImg.dataMsg.title
	this.titleEdit.titleEdit = this.dataImg.dataMsg.titleEdit	
	this.bbs.workEdit.defDbId = this.dataImg.dataMsg.defDbId
	this.bbs.workEdit.tplCode = this.dataImg.dataMsg.tplCode;

	 //初始化的时候默认宝宝书和lomo卡的html渲染模版,此处的数据是从父组件带带本组件中的
     this.typeHtml = this.dataImg.imgArrType;
     this.lomok = this.dataImg.imgArrLome;
      console.log(this.typeHtml)
      var oThis = this;
	  //继续编辑初始化的数据
	  if (this.$route.query.edtDbid) {
	  	Indicator.open({
		  text: '继续编辑中...',
		  spinnerType: 'fading-circle'
		});
	  	this.bbs.workEdit.edtDbId = this.$route.query.edtDbid;
	  	Api.work.unfinishedWork("artup-build/builder/cors/edit/queryOne.do",this.$route.query.edtDbid).then((res)=>{
	  		//console.log(res)

			var oImgData = JSON.parse(res.data.data.editPicture);		
			var editTxt = JSON.parse(res.data.data.editTxt);
			if (res.data.data.lomo) {
				var oImgLomo = JSON.parse(res.data.data.lomo);
			}
			var strbbs = 'bbs'
			    //先加载板式让图片回显到页面
				 for (var i = 0; i < oImgData.length; i++) {
						var strbb = strbbs+oImgData[i].editCnfIndex;
						 //动态修改模版的板式
		                oThis.typeHtml.splice(oImgData[i].page-1,1,oThis.dataImg.imgArrTypeData[strbb]) 						
	              }	
	            //动态添加id节点
				setTimeout(function(){
					$(oThis.$el).find(".listBox .bbsClass >img").each(function(i,el){
						var page = $(this).parents(".bstp").next(".bbsBtn").find("ul li p >span").text();				 
						$(this).attr("id",page+'_'+$(el).attr("nm")+'_'+$(this).attr("editcnfname"))
					})
				},500)
				 //动态添加图片
				setTimeout(function(){	
					if (editTxt.length>0) {
						for (var i = 0; i < editTxt.length; i++) {
		               		console.log(editTxt[i])
		               		var constName = editTxt[i].page+'_'+editTxt[i].num;	               		
							//map生成变量
							 var textMapVal = {"content":editTxt[i].content,"page":editTxt[i].page,"num":editTxt[i].num,"editCnfIndex":editTxt[i].editCnfIndex,"editCnfName" : editTxt[i].editCnfName};						
							 console.log(textMapVal)
							 oThis.editData.textMap.putvalue(constName,textMapVal);							 
							var pageNum = editTxt[i].page+'_'+editTxt[i].num+'_'+editTxt[i].editCnfName;
							$("#"+pageNum).parents(".bsLeft").find(".textarea  >p").text(editTxt[i].content);

		               }
					}
					if (oImgData.length>0) {
						for (var i = 0; i < oImgData.length; i++) {
							console.log(oImgData[i])
							var constName = oImgData[i].page+'_'+oImgData[i].num;
							//map生成变量
							var picObj = {"constName":constName,"picDbId" : oImgData[i].picDbId, "page" : oImgData[i].page, "editCnfIndex" : oImgData[i].editCnfIndex, "num" : oImgData[i].num, "actions" : {},
							"thumbnailImageUrl":oImgData[i].thumbnailImageUrl, "previewThumbnailImageUrl" :oImgData[i].previewThumbnailImageUrl, "crop" : oImgData[i].crop,"editCnfName" : oImgData[i].editCnfName};
							oThis.editData.ImgHashMap.putvalue(constName,picObj);
							var pageNum = oImgData[i].page+'_'+oImgData[i].num+'_'+oImgData[i].editCnfName;
							console.log(pageNum)
							$("#"+pageNum).prev(".myImgBox").show().find("img").css("width","100%").css("height","100%").attr("src",oImgData[i].previewThumbnailImageUrl).attr("attrImg",oImgData[i].thumbnailImageUrl);
							$("#"+pageNum).remove();						
	             	 }
					}
					if (oImgLomo && oImgLomo.length>0) {
						for (var i = 0; i < oImgLomo.length; i++) {
							var constName = oImgLomo[i].page+'_'+oImgLomo[i].num;
							//map生成变量
							var picObj = {"constName":constName,"picDbId" : oImgLomo[i].picDbId, "page" : oImgLomo[i].page, "editCnfIndex" : oImgLomo[i].editCnfIndex, "num" : oImgLomo[i].num, "actions" : {"thumbnailScale":oImgData[i].actions.thumbnailScale},
							"thumbnailImageUrl":oImgLomo[i].thumbnailImageUrl, "previewThumbnailImageUrl" :oImgLomo[i].previewThumbnailImageUrl, "crop" : oImgLomo[i].crop,"editCnfName" : oImgLomo[i].editCnfName};
							oThis.editData.lomHashMap.putvalue(constName,picObj);
							var pageNum = oImgLomo[i].page+'_'+oImgLomo[i].num+'_'+oImgLomo[i].editCnfName;
							$("#"+pageNum).prev(".myImgBox").show().find("img").css("width","100%").css("height","100%").attr("src",oImgData[i].previewThumbnailImageUrl).attr("attrImg",oImgData[i].thumbnailImageUrl);				
		               		$("#"+pageNum).remove();
						}
					}
					//关闭加载弹窗
					Indicator.close();
				},1000)
                })
            }
            //素材库地址图片
            Api.Material.MaterialData("artup-build/service/picture/page.do","").then((res)=>{
            		console.log(res)
                this.bbs.Material = res.data.results;
                //添加属性切换属性
                this.bbs.Material.forEach((arrJson,i)=>{
                    arrJson.activeLi = false;
                })
                if(this.bbs.Material[this.bbs.MaterialImgIndex]){
                    this.bbs.Material[this.bbs.MaterialImgIndex].activeLi=true;    
                }
                
            })
            //拿到浏览器存储的书皮
            var shupi = JSON.parse(sessionStorage.getItem("bbsSlsectDate")).colorName;
            //动态切换书皮
            checkColor(shupi,$('.fmPage'),$('.fdPage'),$('.fePage'))
            console.log(this.bbs)
            var templateCode =this.bbs.workEdit.tplCode;//模版编码
            console.log(templateCode)
            var client = 'pc';   //手机，pc，app 设备等
            var channel = '本站' //渠道

            //图片操作的json值
//          var cropitData = {"x":200.21,"y":400.32,"width":100,"height":300,"rotate":0,"thumbnailScale":1};

            //定义3个hashMap
            this.editData.ImgHashMap = new HashMap(); //图片
            this.editData.lomHashMap =  new HashMap();//lom卡
            this.editData.textMap = new HashMap();// 文本框


            //图片上传时提交的参数
            var extraPostData = {};
            console.log(document.getElementById('browseButton'));
           
//          console.log(typeHtmlLome)

			/* 文件上传init */
//          var uploadUrl = 'http://image2.artup.com/artup-build/builder/cors/picture/upload.do?format=json&sessionId=2141731&category=baobaoshu';
//          var uploadUrl = Api.UPLOAD_URL;
            var uploadUrl = Api.UPLOAD_URL+'&category='+this.getFromSession("category");
            console.log(uploadUrl)
            
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
                    extraPostData  = {"templateCode" : templateCode, "client" : client, "channel" : channel,"picPage":oThis.bbs.page,"picNum":oThis.bbs.num,"styleType":oThis.bbs.styleType,"editCnfName":oThis.bbs.editCnfName}
                    r.opts.query = extraPostData;
                    //打开进度框
                    Indicator.open({text: '图片上传中...',spinnerType: 'fading-circle'});
                    //关闭上弹块儿
                    oThis.sheetVisible = false;
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
                    var responseText = $.parseJSON(message);
                    $(".OnlyOne").prev(".myImgBox").show().find("img").attr("src",responseText.thumbnailUrl).attr("attrImg",responseText.thumbnailUrl);
                    //让图片剧中裁切隐藏
                    setTimeout(function(){
                        dragThumb($(".OnlyOne").prev(".myImgBox").find("img"),$(".OnlyOne").prev(".myImgBox"));
                        $(".OnlyOne").remove(); //清空触发弹出上传框的节点,防止vue事件委派兼容
                    },200)


                    //组装后端需要的数据
                    var constName = responseText.picPage+'_'+responseText.picNum; //几页加第几张图
                    if (constName=="1_1"){//如果有第一页存入预览图
                        oThis.bbs.workEdit.thumbnailImageUrl=responseText.thumbnailUrl;
                    }
                    var picObj = {"constName":constName,"picDbId" : responseText.pictureDbId, "page" : responseText.picPage, "editCnfIndex" : responseText.styleType, "num" : responseText.picNum, "actions" : {thumbnailScale:responseText.thumbnailScale},
                        "thumbnailImageUrl":responseText.thumbnailUrl, "previewThumbnailImageUrl" :responseText.previewThumbnailImageUrl, "crop" : "false","editCnfName" : responseText.editCnfName};

                    console.log(responseText)
                    console.log(picObj)
                    //根据后端返回的类型组装数据,判断结尾标识符是不是lomo卡
                    if (responseText.editCnfName=="baobaoshu_lomo") { //上传的是宝宝书的东西
                        oThis.editData.lomHashMap.putvalue(constName,picObj);//存入lomo卡的对象
                        console.log(oThis.editData.lomHashMap.getvalue("1_1"))
                        Indicator.close();//关闭弹出框
                        return;
                    }
                    //存入图片ImgHashMap
                    oThis.editData.ImgHashMap.putvalue(constName,picObj)
                    //关闭弹出框
                    Indicator.close();
                });
            }
        }
    }
</script>

<style>

</style>















