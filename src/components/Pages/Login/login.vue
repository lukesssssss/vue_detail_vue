<template>
  <!-- rules表示用户输入信息的规则 -->
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h1 class="title">系统登录</h1>
    <div class="total">
      <!-- 填写用户名字的区域 -->
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <!-- 密码的输入框 -->
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
    </div>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
//引入mock模拟用户信息
import Mock from 'mockjs'
import {getMenu} from '@/api/data'
export default {
  name: "theLogin",
  data() {
    return {
      //form是用来存储用户输入密码的
      form: {},
      rules: {
        username: [
          {
            require: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            message: "用户长度不能小于三位",
            trigger: "blur",
          },
        ],
        password: [
          {
            require: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登录事件
    login() {
      getMenu(this.form).then(({data:result}) => {
        if(result.code === 20000) {
          this.$store.commit('tab/clearMenu')
          this.$store.commit('tab/setMenu',result.data.menu)
          this.$store.commit('user/setToken',result.data.token)
          this.$store.commit('tab/addMenu',this.$router)
          this.$router.push({name:'home'})
        }else {
          //element的警告组件
          this.$message.warning(result.data.message)
        }
      })
      //mock方法，创造一批随机数据
      // const token = Mock.random.guid()
      // this.$commit('user/setToken',token)
      // this.$router.push({name:'home'})
    },
  },
};
</script>

<style lang='less' scoped>
.login-container {
  border-radius: 15px;
  background-clip: border-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  background-image: url(../../../assets/images/background.png);
  background-size: 100%;
}
.login_title {
  margin: 0px auto 48px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: 10px 300px 0px auto;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: rgb(62, 64, 64);
  margin-bottom: 40px;
}
.total {
  margin-right: 20px;
}
</style>