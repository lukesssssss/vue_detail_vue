//引入组件
import Main from '@/components/Pages/Main'
import User from '@/components/Pages/User/index'
import Home from '@/components/Pages/Home/index'
import Mall from '@/components/Pages/mall'
import pageOne from '@/components/Pages/other/pageOne'
import pageTwo from '@/components/Pages/other/pageTwo'
import Login from '@/components/Pages/Login/login'
export default [
    {
        name:'Main',
        path:'/Main',
        component:Main,
        //如果页面展示则为true，不然为false
        meta: {show:false},
        redirect:'/login',
        children:[
        //     {
        //     name:'home',
        //     path:'/home',
        //     component:Home,
        //     //如果页面展示则为true，不然为false
        //     meta: {show:false}
        // },
        // {
        //     name:'user',
        //     path:'/user',
        //     component:User,
        //     //如果页面展示则为true，不然为false
        //     meta: {show:false}
        // },
        // {
        //     name:'mall',
        //     path:'/mall',
        //     component: Mall
        // },
        // {
        //     name:'pageOne',
        //     path:'/pageOne',
        //     component:pageOne
        // },
        // {
        //     name:'pageTwo',
        //     path:'/pageTwo',
        //     component:pageTwo
        // },
    ]
    },
    {
        name:'login',
        path:'/login',
        component:Login
    },
    //重定向
    // {
    //     path: '*',
    //     redirect: '/Main'
    //   }
]