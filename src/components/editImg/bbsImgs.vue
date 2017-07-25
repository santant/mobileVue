<template>
	<div id="baobaoshus">
		<MaxImg :data-img="dataImg"></MaxImg>
	</div>
</template>

<script>
import Api from '../../API.js'
import { Swipe, SwipeItem,Indicator } from 'mint-ui';
export default {
  data () {
    return {
      dataImg:{ //img
      	 imgArrType:[
            htmlData.bbs1,
            htmlData.bbs2,
            htmlData.bbs3,
            htmlData.bbs4,
            htmlData.bbs5,
            htmlData.bbs6,
            htmlData.bbs7,
            htmlData.bbs8
          ],
      	 imgArrLome:[
            htmlData.bbs9,
            htmlData.bbs10
          ],
      	 mobanArr:[
            'http://image2.artup.com/resources/static/img/bbs_bs1.jpg',
            'http://image2.artup.com/resources/static/img/bbs_bs2.jpg',
            'http://image2.artup.com/resources/static/img/bbs_bs3.jpg',
            'http://image2.artup.com/resources/static/img/bbs_bs4.jpg',
            'http://image2.artup.com/resources/static/img/bbs_bs5.jpg',
            'http://image2.artup.com/resources/static/img/bbs_bs6.jpg',
            'http://image2.artup.com/resources/static/img/bbs_bs7.jpg',
            'http://image2.artup.com/resources/static/img/bbs_bs8.jpg'
         ],//模版对应的图片
      	 imgArrTypeData:htmlData, //传递板式的对象
      	 dataMsg:{
      	 	title:"宝宝书",
      	 	titleEdit:"宝宝书预览",
      	 	tplCode:"baobaoshu_170-235_24", 
      	 	defDbId:"7ad740df-0b81-418f-b4b5-c078ef580b47"
      	 }
	   }
  	}
  },
// props: ['dataImg'],
    methods:{
    		
    },
    mounted(){
    		
    }
}
</script>

<style>

</style>