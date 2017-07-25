import Vue from 'vue'
//2017年04月10日15:02:01 作者:827879040@qq.com vue全局过滤器测试
//定义全局过滤器
Vue.filter("sum", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return value + 40;
});
Vue.filter("json", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
   console.log(value)
   return JSON.stringify(value);
});
Vue.filter("splitSku",function(value){
	if (value ) {
		var arr = value.split('.');
//		if(arr.length > 2){
//			var newArr = [];
//			for(var i=0; i<arr.length-2; i++){
//				newArr.push(arr[i])
//			}
//			return newArr.join('.');
//		}else{
//			return arr[0];
//		}
		return arr[0];
		
	}
});
Vue.filter("splitSkuLast",function(value){
	if (value) {
		var arr = value.split('.');
		return arr.slice(1,arr.length).join('.')
	}
})

Vue.filter("splitAddress",function(value){
	if (value) {
		
		return value.length > 10 ? value.substr(0,10).concat('...'):value;
	}
})

Vue.filter("toFixedTwo",function(value){
	if (value) {
		
		return parseFloat(value.toFixed(2));
	}
})
Vue.filter('subStr',function(value){

	if(value){
		return value.length > 9 ? value.substr(0,9).concat('...'):value; 
	}
	
})
