<template>
  <header>
      <!-- 左边面包屑 -->
      <div class="i-content">
      <el-button type="primary" icon="el-icon-menu" size="mini" @click="changeCollapse">搜索</el-button>
      <h3 style="color:#fff">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="colr:blue" >
                <el-breadcrumb-item v-for="(tab,index) in tabList" :key="index" :to="{ path:tab.path}" class="myColor">{{tab.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </h3>
      </div>
      <!-- 右边面包屑 -->
      <div class="r-content">
          <el-dropdown size="mini" trigger="click"  >
            <span type="primary">
                <img :src="userImg" alt="算了吧" class="user">
            </span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
      </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name:"CommonHeader",
    data() {
        return {
            //require可以动态的展示文件地址
           userImg:require('@/assets/images/user.png') 
        }
    },
    methods: {
        changeCollapse() {
            this.$store.commit('tab/changeCollapse')
        },
        quit() {
            this.$store.commit('user/clearToken')
            this.$store.commit('tab/clearMenu')
            this.$router.push({name:'login'})
        }
    },
    computed: {
        //在store的相应的组件里面要开启namespaced，不然没有效果，同时要写具体组件的名字
        ...mapState('tab',['tabList'])
    },
    mounted() {
        
    }
    
}
</script>

<style scoped lang='less'>
header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.i-content {
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 20px;
    }
}
.r-content {
    display: flex;
    align-items: center;
    height: 100%;
    .user {
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    }
}
//重写面包屑的字体颜色
.myColor /deep/ .el-breadcrumb__inner {
  color: #fefefe ;
}
</style>