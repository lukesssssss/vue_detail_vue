import  Mock  from "mockjs";
import homeApi from "./mockData/home"
import userApi from "./mockData/user"
import permissionApi from "./mockData/permission"
// 使用mock里面模拟的数据，定义路径和函数
Mock.mock('api/home/getData',homeApi.getStatisticalData)
//使用正则表达式
Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)
Mock.mock(/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/user\/del/,'delete',userApi.deleteUser)
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)