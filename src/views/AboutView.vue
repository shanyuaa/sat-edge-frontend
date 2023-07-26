<script>
export default {
  mounted() {
    this.axios({
      method: 'get',
      url: '/',
    })
    .then(res => {                  /* res 是 response 的缩写 */
      console.log(res.data)
    })
    .catch(err => {                 /* 请求若出现路由找不到等其它异常，则在终端输出错误信息 */
      console.log(err);
    })
  },
  methods:{
    login: function(){
      console.log('1')
      this.show='4'
    }
  },
  data(){
    return {
      msg: 'Welcome to Your Vue.js App',
      show:'',
    }
  }
}
</script>

<template>
  <div class="about">
    <h1 @click="login">This is an about page</h1>
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
