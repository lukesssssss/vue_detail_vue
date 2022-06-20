import Vue from "vue";
import VueRoute from "vue-router";
//使用插件
Vue.use(VueRoute)
import routes from "./router"
//配置路由
export default  new VueRoute({
      routes,
     
})
//可以避免浏览器多次无效点击报错
const VueRouterPush = VueRoute.prototype.push
VueRoute.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}