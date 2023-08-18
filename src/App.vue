<template>
  <div id="app" style="display: flex;">
    <!-- 侧边栏   -->
      <Slidebar v-show="ifLogin"></Slidebar>
      <div style="width: 100%">
        <!-- 头部 -->
        <!-- <Header></Header> -->
        <!-- 主体 -->
          <router-view/>
      </div>
  </div>
</template>

<script>
import Header from '@/views/layout/components/header'
import {Slidebar} from './views/layout/components';

export default {
  name: 'App',
  components:{
    Header,
    Slidebar
  },
  data(){
    return {
        ifLogin:''  //登录后通过在子界面修改$parent父界面的ifLogin值实现显示和隐藏
      }
  },
  methods:{
        makesureifLogin(){
          this.ifLogin = sessionStorage.getItem('name')
          console.log(this.ifLogin)
        }
    },
    mounted() {
       this.makesureifLogin()
    }
}
</script>

<style>
html, body , #app{
    height: 100%;
    margin: 0;
    padding: 0;
}


</style>
