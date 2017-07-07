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
      	 imgArrType:[htmlData.bbs5,htmlData.bbs6],
      	 imgArrLome:[htmlData.bbs9,htmlData.bbs10],
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