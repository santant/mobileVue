<template>
	<div id="workList">
		<!--头-->
		<mt-header title="我的作品">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <mt-button icon=""  slot="right">删除</mt-button>
		</mt-header>
		<div class="headTap">
			<ul>
				<li><p v-tap='{methods : updatStyle}' class="tabBtn liActive">未完成</p></li>
				<li><p v-tap='{methods : updatStyle}' class='tabBtn'>已完成</p></li>
			</ul>
		</div>
		<div class="tapList">
			<div class="listContent">
				<ul
			  v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-distance="10">
			  <li v-for="(item,index) in worklist" style="margin-top: 0.53rem;">
			  	<div class="content">
					<ul>
						<li><p v-tap='{methods:updataCheck}' class= "circle circleNone"><i class="icon iconfont">&#xe639;</i></p></li>
						<li>
							<img :src="item.thumbnailImageUrl">
						</li> 
						<li>
							<ul>
								<li>
									<span>{{item.sku}}</span>
									<!--<span>智慧蓝</span>
									<span>24页</span>-->
								</li>
								<!--<li>170mm*235mm</li>-->
								<li>{{item.createdDt}}</li>
							</ul>
						</li>
						<li v-tap="{methods : continueEdit ,index : index}"  v-bind:hidden="tapStyle">
							<p>继续编辑</p>
						</li>
					</ul>
				</div>
			  </li>
			</ul>
			<!--<p class="page-infinite-loading" v-bind:hidden="loading == false">
		    	  加载中... 
		    	 6228484040538704117
		    </p>-->
			</div>
			
		</div>
	</div>
</template>

<script>
	import { InfiniteScroll,Indicator } from 'mint-ui';
	import Api from '../../API.js'
	export default{
		data(){
			return{
				tapStyle:false,
				worklist:[],
				loading:false,
				workPage:0 //第0页
			}
		},
		methods:{
			updatStyle(params){
				$('.tabBtn').removeClass('liActive')
				if($(params.event.target).hasClass("liActive")){
				}else{
					$(params.event.target).addClass('liActive');
				}
				if($(params.event.target).text() == '未完成'){
					Api.work.workList("artup-build/builder/cors/edit/queryByPage.do",1,this.workPage,'').then((res)=>{
			
						console.log(res)
					})
					this.tapStyle = false;
				}else{
					Api.work.workList("artup-build/builder/cors/edit/queryByPage.do",2,this.workPage,'').then((res)=>{
			
						console.log(res)
					})
					this.tapStyle = true;
				}

			},
			updataCheck(params){
				if($(params.event.target).hasClass("circleNone")){
					$(params.event.target).removeClass('circleNone');
					$(params.event.target).find('i').show();
				}else{
					if($(params.event.target).hasClass("icon")){
						$(params.event.target).hide();
						$(params.event.target).parent('p').addClass('circleNone');
					}	
				}
			},
			loadMore() {
				  this.loading = true;
	//			  setTimeout(() => {
	//			    let last = this.list[this.list.length - 1];
	//			    for (let i = 1; i <= 10; i++) {
	//			      this.list.push(last + i);
	//			    }
	//			    this.loading = false;
	//			  }, 2500);
			},
			continueEdit(params){ //继续编辑
				//存入继续编辑页面的id
//				console.log(this.worklist[params.index].dbId)
				if(this.worklist[params.index].category=="huace"){
					location.href = "#huaceImgs?edtDbid="+this.worklist[params.index].dbId;
				}else{					
					location.href = "#BbsImgs?edtDbid="+this.worklist[params.index].dbId;
				}
				
				
			}
		},
		mounted(){

			//var category = 'baobaoshu'
			
			Indicator.open({text: '作品加载中...',spinnerType: 'fading-circle'});
			//开始默认的时候，去拿我的作品列表
			Api.work.workList("artup-build/builder/cors/edit/queryByPage.do",1,this.workPage,"").then((res)=>{
				this.worklist = res.data.results;
				Indicator.close();
				console.log(this.worklist)
			})
		}
	}
</script>

<style>
</style>