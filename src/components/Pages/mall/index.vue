<template>
  <el-carousel indicator-position="outside" height="980px" width="1066.66px">
    <el-carousel-item v-for="(item,index) in img" :key="index">
      <el-image :src="item" alt="" fit="fill" ></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "theMall",
  data() {
    return {
      img: {
        bcImg1: require("@/assets/images/carton1.jpg"),
        bcImg2: require("@/assets/images/carton2.jpg"),
        bcImg3: require("@/assets/images/carton3.jpg"),
        bcImg4: require("@/assets/images/carton4.jpg"),
      },
    };
  },
};
</script>

<style>
.el-carousel__item .el-image {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  width: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>