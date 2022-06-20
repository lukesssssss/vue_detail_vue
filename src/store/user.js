//这是保存用户密码账号的vuex
import jsCookie from "js-cookie"
export default {
    namespaced:true,
    state: {
        token:''
    },
    actions: {

    },
    mutations: {
        setToken(state,val) {
            state.token = val
            jsCookie.set('token',val)
        },
        clearToken(state) {
            state.token = ''
            jsCookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || jsCookie.get('token')
        }
    }
}