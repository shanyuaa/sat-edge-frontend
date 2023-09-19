<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">用户管理</el-header>
        </el-container>
        <div class="interface">
            <el-card class="user-list" style="display: inline-block;">
                <div class="wrapper">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddUser">添加用户</el-button>
                    <el-input v-model="SearchNode" placeholder="按名称搜索" style="width: 400px;">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input>
                </div>
                <div class="table">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="username" label="用户名称" width="200px"></el-table-column>
                        <!-- <el-table-column prop="type" label="用户类型"  style="width: 100px;">{{ tableData[0].type }}</el-table-column> -->
                        <el-table-column prop="password" label="密码" width="300px"></el-table-column>
                        <el-table-column  label="创建时间" width="300px">-</el-table-column>
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="DeleteUser( scope.row.username)">删除</el-button>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="100">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            currentPage1:1,
            tableData: []
        }
    },
    methods:{
        getUserInfo(){
            this.$http.post('/user/info').then(res=>{
                console.log(res)
                this.tableData = res.data.data.users
            })
        },
        toAddUser(){
            this.$router.push({
                name:'adduser'
            })
        },
        DeleteUser(username){
            let obj = {"username":username}
            console.log(obj)
            this.$http.post('/user/delete', obj).then(res =>{
                console.log(res)
                if(res.data.status === 0){
                    this.$message.success('删除成功')
                    location.reload()
                }
            })
        }
    },
    mounted() {
        this.getUserInfo();
    },
}
</script>

<style scoped>
.interface{
  height: 100%;
  background-color: #F2F6FC;
  position: fixed;
  width: 90%;
}

.user-list{
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