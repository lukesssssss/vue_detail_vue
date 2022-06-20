<template>
  <!-- Aside边缘组件 -->
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#5c5464"
    @open="handleOpen"
    @close="handleClose"
    :collapse="searchTrigger"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ !theCollapse ? "通用后台管理系统" : "后台" }}</h3>
    <el-menu-item
      v-for="(nochild, index) in noChildren"
      :key="index + 20"
      @click="toNochild(nochild)"
    >
      <i :class="'el-icon-' + nochild.icon"></i>
      <span slot="title" :style="$route.name == nochild.name ? 'color:#ffd04b':'color:#fff'">{{ nochild.label }}</span>
    </el-menu-item>
    <!-- 有chilidren的 -->
    <el-submenu
      v-for="(item, index) in haveChildren"
      :key="index + 5"
      index="5"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title" >{{ item.label }}</span>
      </template>
      <!-- 子组件 -->
      <el-menu-item-group>
        <el-menu-item
          style="vertical-align：middle"
          collapse="false"
          v-for="(itemChild, index) in item.children"
          :key="index + 10"
          @click="toHavechild(itemChild)"
          :style="$route.name == itemChild.name ? 'color:#ffd04b':'color:#fff'"
          ><i :class="'el-icon-' + itemChild.icon"></i
          >{{ itemChild.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "commonAside",
  data() {
    return {
      // menu: [
      //   // {
      //   //   path: "/",
      //   //   name: "home",
      //   //   label: "首页",
      //   //   icon: "s-home",
      //   //   url: "Home/Home",
      //   //   id: 1,
      //   // },
      //   // {
      //   //   path: "/mall",
      //   //   name: "mall",
      //   //   label: "商品管理",
      //   //   icon: "video-play",
      //   //   url: "MallManage/MallManage",
      //   //   id: 2,
      //   // },
      //   // {
      //   //   path: "/user",
      //   //   name: "user",
      //   //   label: "用户管理",
      //   //   icon: "user",
      //   //   url: "UserManage/UserManage",
      //   //   id: 3,
      //   // },
      //   // {
      //   //   label: "其他",
      //   //   icon: "location",
      //   //   children: [
      //   //     {
      //   //       path: "/page1",
      //   //       name: "pageOne",
      //   //       label: "页面1",
      //   //       icon: "setting",
      //   //       url: "Other/PageOne",
      //   //     },
      //   //     {
      //   //       path: "/page2",
      //   //       name: "pageTwo",
      //   //       label: "页面2",
      //   //       icon: "setting",
      //   //       url: "Other/PageTwo",
      //   //     },
      //   //   ],
      //   // },
      // ],
      menu:[],
      searchTrigger:false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //控制aside边的文字
    toNochild(item) {
      //进行路由跳转
      this.$router.push({
        name: item.name,
      });
      //传入点击的信息,写了视口后要加是在哪个具体文件下
      this.$store.dispatch("tab/selectMenu", item);
    },
    toHavechild(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.dispatch("tab/selectMenu", item);
    },
  },
  computed: {
    //过滤没有子项目的
    noChildren() {
      return this.$store.state.tab.menu.filter((item) => !item.children);
    },
    haveChildren() {
      return this.$store.state.tab.menu.filter((item) => item.children);
    },
    theCollapse() {
      this.searchTrigger = this.$store.state.tab.isCollapse
      return this.$store.state.tab.isCollapse;
    },
    //获取menu
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  },
  mounted() {
    console.log(this.theCollapse);
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
  border: none;
}
h3 {
  color: rgb(250, 250, 250);
  text-align: center;
  line-height: 48px;
}
</style>