<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">Job任务管理</el-header>
        </el-container>
        <div class="interface">
            <el-empty description="当前无任务" style="top:30%"></el-empty>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
.interface{
  height: 100%;
  background-color: #F2F6FC;
  position: fixed;
  width: 90%;
}

.node-list{
  position: relative;
  width: 92%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
}
.table{
    top:20px;
    margin-bottom: 40px;
}
.wrapper{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>