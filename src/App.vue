<template>
  <div id="app" style="display: flex;">
    <!-- 侧边栏   -->
      <Slidebar></Slidebar>
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
