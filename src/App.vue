<template>
  <div id="app" style="display: flex;">
    <!-- 侧边栏   -->
      <Sidebar class="sidebar_container" v-show="ifLogin"></Sidebar>
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
import {Sidebar} from './views/layout/components';
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

export default {
  name: 'App',
  components:{
    Header,
    Sidebar
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
       const container = document.querySelector('.scroll-container')
       this.ps = new PerfectScrollbar(container)
    },
    beforeDestroy(){
      this.ps.destroy()
    }
}
</script>

<style>
html, body , #app{
    height: 100%;
    margin: 0;
    padding: 0;
}

.sidebar_container{
    transition: width 0.28s ease-in-out;
    overflow-y: auto;
}

::-webkit-scrollbar {
  display: none;
}


</style>
