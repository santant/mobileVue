import Vue from 'vue'

//引入路由
import vueRouter from "vue-router"

import noFound from '@/components/404'
//宝宝书
import bbsMsgtest from '@/components/bbs/bbsMsg'
import bbsEdittest from '@/components/bbs/bbsEdit'
//首页
import Index from '@/components/index/Index.vue'
import User from '@/components/user/userInfo.vue'
import NewAddress from '@/components/user/newAddress.vue'
import Address from '@/components/user/address.vue'
import OrderList from '@/components/user/orderList.vue'

import OrderStatus from '@/components/user/orderStatus.vue'
/*购物车列表*/
import Cart from '@/components/cart/cart.vue'
/*购物车列表*/
import payOrder from '@/components/cart/payOrder.vue'
//宝宝书选择
import bbsSelect from '@/components/product/bbs/bbsSelect.vue'

import bbsMsg from '@/components/product/bbs/bbsMsg.vue'

//画册
import huaceMsg from '@/components/product/huace/huaceMsg.vue'
//海报介绍
import hbMsg from '@/components/product/hb/hbMsg.vue'
//框画介绍
import khMsg from '@/components/product/kh/khMsg.vue'
//台历介绍
import tlMsg from '@/components/product/tl/tlMsg.vue'

import huaceSelect from '@/components/product/huace/huaceSelect.vue'


//图片编辑
import editImg from '@/components/editImg/editImg.vue'


//BbsImg 宝宝书 图片上传
import BbsImg from '@/components/editImg/bbsImg.vue'
//我的作品库
import workList from '@/components/workList/workList.vue'



//模块测试
import editImgs from '@/components/editImg/bbsImgs.vue'
import huaceImgs from '@/components/editImg/huaceImgs.vue'
/*选择框画尺寸以及框*/
import khSelect from '@/components/product/kh/khSelect.vue'
/*x选择台历尺寸*/
import tlSelect from '@/components/product/tl/tlSelect.vue'
//编辑上传台历
import tlEdit from '@/components/product/tl/tlEdit.vue'
//海报选择
import hbSelect from '@/components/product/hb/hbSelect.vue'

//我的素材库
import material from '@/components/user/material.vue'

//测试vuex
import testStore from '@/components/store'
//注入路由
Vue.use(vueRouter)
let router =  new vueRouter({	
//	mode:'history',
	routes: [
		{ //宝宝书介绍和尺寸选择
	      path: '/bbsMsgtest',
	      name: 'bbsMsgtest',
	      component: bbsMsgtest
	    },
		{ //宝宝书编辑页面
	      path: '/bbsEdittest',
	      name: 'bbsEdittest',
	      component: bbsEdittest
	    },
	    { //首页
	      path: '/',
	      name: 'Index',
	      component: Index
	    },
	    { 
	 		path: '/bbsImgs', component: editImgs,  //测试模块的路由宝宝书
	 		meta:{
	 			title:"宝宝书"
	 		}
	 	},
	 	{ 
	 		path: '/huaceImgs', component: huaceImgs,  //测试模块路由画册
	 		meta:{
	 			title:"画册"
	 		}
	 	},
//		{
//			path:'/', component:Home, //首页 home
//			children: [
//	            { path: '/orderList', component: orderList }
////	            { path: '/page5', component: Page5, name: '页面5' }
//     		 ]
//		},
		
		{
			path:'/User', component:User, //个人列表
			meta:{
	 			title:"个人中心"
	 		}
		},
		{
			path:'/NewAddress', component:NewAddress, //新建地址
			meta:{
	 			title:"新建地址"
	 		}
		},
		{
			path:'/Address', component:Address //收货地址
		},
		{
			path:'/OrderList', component:OrderList //订单列表
		},
		{
			path:'/OrderStatus', component:OrderStatus //订单列表
		},
		{
			path:'/cart', component:Cart //购物车
		},
		{
			path:'/payOrder', component:payOrder //购物车
		},
		{
			path:'/bbsSelect', component:bbsSelect //宝宝书选择
		},
		{
			path:'/bbsMsg', component:bbsMsg //宝宝书介绍
		},
		{
			path:'/editImg', component:editImg //图片编辑
		},
		{
			path:'/BbsImg', component:BbsImg //宝宝书图片上传
		},
		{
			path:'/workList', component:workList //我的作品库
		},
		{
			path:'/khSelect', component:khSelect //框画选择			
		},
		{
			path:'/huaceMsg', component:huaceMsg //画册介绍
		},
		{
			path:'/hbMsg', component:hbMsg //海报介绍
		},
		{
			path:'/khMsg', component:khMsg //框画介绍
		},
		{
			path:'/tlMsg', component:tlMsg //台历介绍
		},
		{
			path:'/huaceSelect', component:huaceSelect, //画册选择
			meta:{
	 			title:"画册尺寸选择"
	 		}
		},
		{
			path:'/tlSelect', component:tlSelect //台历
			,meta:{
	 			title:"台历尺寸选择"
	 		}
		},
		{
			path:'/tlEdit', component:tlEdit //台历
			
		},
		{
			path:'/hbSelect', component:hbSelect //海报选择
			
		},
		{
			path:'/material', component:material //我的素材
			
		},
	    {   
	     	path:'*',
	     	//可以直接到404自己定义的组件
//	    		component: noFound
	    		//路由重定向的姿势 redirect ,可以写一个已经存在的路由
	    		redirect:'/bbsEdit'	    		
	    }
	    
	  ]
})
//router.beforeEach((to,from,next)=>{
//	console.log('开始路由')
//	next();
//})
//router.afterEach((to,from,next)=>{
//	console.log('进入路由,可以用此方法来写每个导航的title')
//	if (to.meta.title) {
//		window.document.title = to.meta.title
//	}
//})
//暴露出路由对象
export default  router

