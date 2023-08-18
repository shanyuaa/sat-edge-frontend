<template>
    <div style="width: 200px; height: 100%;">
        
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      style="width: 175px; height: 100%; position:fixed;">

      <div style="height: 50px; padding: 14px;padding-left: 20px; font-weight: bold; font-size:medium;color:dodgerblue;">
        星载边缘节点资源虚拟化管理系统
        </div>
      <el-menu-item index="overview" @click="gotoHome" style="margin-top: 15px;">
        <span slot="title">概览</span>
      </el-menu-item>

      <!-- <el-submenu index="cluster">
          <span slot="title">边缘集群</span>
          <el-menu-item index="cluster-management">集群管理</el-menu-item>
        </el-submenu> -->
      
        <el-submenu index="edge">
          <!-- <template slot="title">选项1</template> -->
          <span slot="title">资源管理</span>
          <el-menu-item index="edge-node" @click="gotoEdgeNode">边缘节点</el-menu-item>
          <el-menu-item index="storage">存储</el-menu-item>
          <el-menu-item index="network">网络</el-menu-item>
        </el-submenu>

        <el-submenu index="device">
          <!-- <template slot="title">选项1</template> -->
          <span slot="title">应用管理</span>
          <el-menu-item index="Pod-management" @click="gotoPodManagement">在线任务</el-menu-item>
          <el-menu-item index="Job-management" @click="gotoJobManagement">离线任务</el-menu-item>
        </el-submenu>

        <el-menu-item index="image">
          <span slot="title">镜像管理</span>
        </el-menu-item>

        <el-menu-item index="user">
          <span slot="title">用户管理</span>
        </el-menu-item>

        <el-menu-item index="logs">
          <span slot="title">日志管理</span>
        </el-menu-item>
        
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item> -->
    </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return{
          
        }
    },
    methods:{
        gotoHome(){
            this.$router.push({
                name:'home'
            })
        },
        gotoEdgeNode(){
            this.$router.push({
                name:'node'
            })
        },
        gotoJobManagement(){
            this.$router.push({
                name:'job'
            })
        },
        gotoPodManagement(){
            this.$router.push({
                name:'pod'
            })
        },
        // verifyLogin(){
        //   var this_route = this.$router.options.base
        //   console.log(this_route)
        // }
      }
}
</script>

<style scoped>

</style>
