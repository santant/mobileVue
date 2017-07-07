export default{
  install(Vue,options)
  {
  	//addToSession 循环url，存入session
    Vue.prototype.addToSession = function () {
		var obj = JSON.parse(sessionStorage.getItem("urlQuery"));
		for (var i in this.$route.query)
		{
			obj[i] = this.$route.query[i]
		}
    	   	sessionStorage.setItem("urlQuery",JSON.stringify(obj))
//	   console.log("我的公共的方法组件")	
    }
    //获取我需要对session
    Vue.prototype.getFromSession = function (sessionName) {
		var obj = JSON.parse(sessionStorage.getItem("urlQuery"));
		if (sessionName) {
			if (obj[sessionName]) {
				return obj[sessionName];
			}
			return ''
		}
    }
     //同意增加session属性
     Vue.prototype.sourceSession = function (jsons) {
		var obj = JSON.parse(sessionStorage.getItem("urlQuery"));
		if (jsons) {
			for (var i in obj) {
				jsons[i] = obj[i]
			}
			return jsons;
		}else{
			return obj;
		}
    }
     //路由返回上一页
     Vue.prototype.vurRouterGo = function () {
     	
     	this.$router.go(-1)
    }
  }
}