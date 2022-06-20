<template>
  <el-form ref="form" label-width="100px" :model="form2" :inline="inline2" style="text-align:left">
    <el-form-item v-for="(item,index) in formlabel2" :key="index" :label="item.label">
        <el-input
        v-if='item.type === "input"'
        :placeholder="'请输入' + item.label"
        v-model="form2[item.model]"
        style="width:217px"
        >
        </el-input>
        <el-switch 
        v-if='item.type === "switch"'
        v-model="form2[item.model]"
        ></el-switch>
        <el-date-picker
        v-if='item.type === "date"'
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="form2[item.model]"
        ></el-date-picker>
        <el-select
        v-if="item.type === 'select'"
        v-model="form[item.model]"
        placeholder="请选择"
        >
        <!-- el-select里面要包裹el-options -->
        <el-option
        v-for="(item,index) in item.opts"
        :key="index"
        :label="item.label"
        :value="item.label"
        ></el-option>
        </el-select>       
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
    name:'commomForm',
    // props:['formlabel','form','inline','OFL'],
    props: {
        formlabel:Array,
        form:Object,
        inline:Boolean,
    },
    data() {
      return {
        formlabel2:this.formlabel,
        form2:this.form,
        inline2:this.inline
      }
    },
    mounted() {
      console.log(this.formlabel,this.OFL);
    }
}
</script>

<style>

</style>