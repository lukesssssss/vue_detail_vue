<template>
  <div class="tabs">
      <el-tag size="small"
       v-for="(tab,index) in tabList" 
       :key="index" 
       :closable="tab.label == '首页'? false:true"
       :effect="$route.name === tab.name ? 'dark':'plain'"
       @click="changeMenu(tab)"
       @close="handleClose(tab,index)"
       >{{tab.label}}</el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'commonTag',
    computed: {
        ...mapState('tab',['tabList'])
    },
    methods: {
        //点击标签执行的事件
        changeMenu(tab) {
            this.$router.push({
                name:tab.name
            })
        },
        //清除标签时执行的事件
        handleClose(tab,index) {
            
            //如果点的不是当前页面
            if(this.$route.name !== tab.name) {
               this.tabList.splice(this.tabList.indexOf(tab), 1);
            }else if(index !== 1){
                //如果点的是当前页面,且不是第二个时
                this.tabList.splice(this.tabList.indexOf(tab), 1)
                const now = this.tabList[index - 1]
                this.$router.push({name:now.name})
            } else {
                this.tabList.splice(this.tabList.indexOf(tab), 1);
                //若标签后面还有标签的话
                if(this.tabList[index  ] ) {
                const tnow = this.tabList[index]
                this.$router.push({name:tnow.name})
                } else {
                this.$router.push({name:'home'})
                }

            }
        }
    }

}
</script>

<style lang ='less' scoped>
.tabs {
    padding: 20px;
    .el-tag {
        margin-left: 15px;
        cursor: pointer;
    }
}
</style>