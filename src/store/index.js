import Vue from "vue";
import Vuex from "vuex"
import tab from "./tab"
import user from "./user"
//全局注入vuex
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tab,
        user
    }
})