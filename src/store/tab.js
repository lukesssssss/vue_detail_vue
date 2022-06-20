import router from "@/router"
import { Menu } from "element-ui"
import jsCookie from "js-cookie"
export default {
    //有多个vuex时要开启命名空间，不然mapstate没有效果
    namespaced:true,
    //存储数据
    state: {
        //控制面包屑是否展开的按钮
        isCollapse:false,
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'home'
            }
        ],
        currentMenu:null,
        menu:[]
    },
    actions: {
        selectMenu(context,val) {
            if(val.name !== 'home') {
                context.commit('SELECTMENU',val)
            }else {
                context.commit('SELECTMENU2')
            }
        }
    },
    mutations: {
        changeCollapse(state) {
            state.isCollapse = !state.isCollapse
            console.log(state.isCollapse);
        },
        SELECTMENU(state,val) {
            state.currentMenu = val
            const result = state.tabList.findIndex(item => item.name === val.name)
            if(result === -1) {
                state.tabList.push(val)
            }
        },
        SELECTMENU2(state) {
            state.currentMenu = null
        },
        cleanTag(state,val) {
            const result = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(result,1)
        },
        setMenu(state,val) {
            state.menu = val
            jsCookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            jsCookie.set('menu')
        },
        addMenu(state,router) {
            if(!jsCookie.get('menu')) {
                return
            }
            console.log(router);
            const menu = JSON.parse(jsCookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map(item => {
                        //给permission的数据里面分别添加上component引入方法
                        item.component = () => import(`@/components/Pages/${item.url}`)
    
                        return item
                    })
                    menuArray.push(...item.children)
                }else {
                    item.component = () => import(`@/components/Pages/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item => {
        
                router.addRoute('Main',item)
                console.log(333)
            })
        }
    }
}