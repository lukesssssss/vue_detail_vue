<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <!-- 用户信息 -->
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上次登录事件:<span
                >2022-5-8</span
              >
            </p>
            <p>上次登录地点:<span>成都</span></p>
          </div>
        </el-card>
        <!-- 手机信息 -->
        <el-card style="margin-top: 20px; height: 460px">
          <el-table :data="tableData">
            <el-table-column 
            style="margin-top:20px; height:460px" 
            v-for="(val,key) in tableLabel" 
            :key="key"
            :prop="key"
            :label="val">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右边数据 -->
      <el-col :span="16">
        <div class="num">
          <el-card 
          v-for="(item,index) in countData" 
          :key="index"
          :body-style="{display:'flex',padding:0}"
          >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt" style="text-align:left">{{item.name}}</p>
          </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height:280px">
          <div style="height:280px" ref="echarts"></div>
        </el-card>
        <div class="graph">
          <!-- 柱状图 -->
          <el-card style="height:260px">
            <div style="height:240px" ref="userEcharts"></div>
          </el-card>
          <!-- 饼状图 -->
          <el-card style="height:260px">
            <div style="height:240px" ref="videoEcharts"></div>
          </el-card>
        </div>
        <div></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getData} from '@/api/data'
import * as echarts from 'echarts' 
import { Tooltip } from 'element-ui';
import { color } from 'echarts';
export default {
  name: "theHome",
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then(res => {
      const {code,data} = res.data
      if(code === 200) {
        this.tableData = data.tableData
        //获取data里面orderData的数据
        const order = data.orderData
        //Object.key可以获得对象下的第一个值
        const keyArray = Object.keys(order.data[0])
        //series是echarts的一个方法，在里面添加内容好使用
        const series = []
        //x轴的数据
        const xData = order.date
        //遍历
        keyArray.forEach(key => {
          series.push({
            name:key,
            //map用来遍历data的每一项并返回
            data:order.data.map(item => item[key]),
            type:'line'
          })         
        })
        //折线图
        const option = {
          //表示x坐标
          xAxis: {
            data:xData
          },
          yAxis: {},
          legend: {
            data:keyArray
          },
          series
        }
        //init 好像是初始化的意思
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)

        //柱状图
        const user = {
          //图例文字颜色
          textStyle: {
            color:'#333'
          },
          grid: {
            left:'20%'
          },
          //提示框
          tooltip: {
            trigger:'axis'
          },
          xAxis: {
            type:'category',
            data: data.userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color:'#17b3a3'
            }
            }
            ,
            axisLable: {
              interval:0,
              color:'#333'
            }
          },
          yAxis: {
            type:'value',
            axisLine: {
              lineStyle: {
                color:'#17b3a3'
              }
            }
          },
          color:["#2ec7c9","#b6a2de"],
          legend: {
            data:["新增用户","活跃用户"]
          },
          series: [
            {
              name:'新增用户',
              data: data.userData.map(item => item.new),
              //柱状图类型
              type:'bar',
            },{
              name:'活跃用户',
              data: data.userData.map(item => item.active),
              //柱状图类型
              type:'bar'
            }
          ]
        }
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(user)

        //饼状图
        const video = {
          series : {
            type:'pie',
            data:data.videoData
          },
          tooltip: {
            trigger:'item'
          },
          color: ["#0f78f4","#dd536b","#9462e5","#a6a6a6","#e1bb22","#39c362","#3ed1cf",]        
        }
        const V= echarts.init(this.$refs.videoEcharts)
        V.setOption(video)
      }
    })
  },
};
</script>

<style>
</style>