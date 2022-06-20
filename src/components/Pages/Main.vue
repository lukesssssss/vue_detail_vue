<template>
  <el-container >
  <el-aside width="auto">
      <Common v-show="this.$route.name!=='login'"/>
  </el-aside>
  <el-container >
    <el-header v-show="this.$route.name!=='login'">
     <CommonHeader v-show="this.$route.name!=='login'"/>
    </el-header>
    <commonTag v-show="this.$route.name!=='login'"/>
    <el-main>
      <router-view></router-view>
      </el-main>
  </el-container>
</el-container>
</template>

<script>
import Common from "@/components/Common.vue"
import CommonHeader from "../CommonHeader.vue"
import commonTag from "@/components/commonTag.vue"
export default {
    name:'theHome',
    components:{Common,CommonHeader,commonTag}
}
</script>

<style scoped>
  .el-footer {
    background-color: #333;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header {
    background-color: #333;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100vh;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  

  

</style>