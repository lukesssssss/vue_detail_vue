import Vue from 'vue'
import App from './App.vue'
//引入element ui
import {
  Button,
  Header,
  Main,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Select,
  Pagination,
  Message,
  MessageBox,
  Carousel,
  CarouselItem,
  Image
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入router
import router from './router/index'
import '@/assets/less/index.less'
import store from '@/store'
import '@/api/mock'
//引入插件axios
import http from 'axios'

Vue.prototype.$message = Message                //vue实例上挂载Message                
Vue.prototype.$confirm = MessageBox.confirm            //vue实例上挂载MessageBox   
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Pagination);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Image);
Vue.config.productionTip = false
//绑定axios
Vue.prototype.$http = http


//路由守卫
router.beforeEach((to,from,next) => {
  store.commit('user/getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login') {
    next({name:'login'})
  }else if(token && to.name === 'login') {
    //当用户在登录页面跳转首页时，自动跳到登陆页面
    next({name:'home'})
  }else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    //因为是动态路由，所以在刷新时应该先加载本路由
    this.$store.commit('tab/addMenu',this.$router)
  }
}).$mount('#app')