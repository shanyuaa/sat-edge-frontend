<script>
export default {
  mounted() {
    this.axios({
      method: 'get',
      url: '/',
    })
        .then(res => {                  /* res 是 response 的缩写 */
          console.log(res.data)
          this.tableData.push(res.data)
        })
        .catch(err => {                 /* 请求若出现路由找不到等其它异常，则在终端输出错误信息 */
          console.log(err);
        })
  },
  methods: {},
  data() {
    return {
      tableData: []
    }
  }
}
</script>

<template>
  <div class="about">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="age" label="Age" width="180"/>
      <el-table-column prop="city" label="City"/>
    </el-table>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
