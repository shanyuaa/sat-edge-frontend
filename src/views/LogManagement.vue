<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">日志管理</el-header>
        </el-container>
        <div class="interface">
            <el-card class="user-list" style="display: inline-block;">
                <div class="wrapper">
                    <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddEdgeNode">创建任务</el-button> -->
                    <!-- <el-input v-model="SearchNode" placeholder="按名称搜索" style="width: 400px;">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input> -->
                </div>
                <div class="table">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <!-- <el-table-column prop="name" label="Name" width="300px">
                            <template slot-scope="scope">
                                <el-button size="medium" type="text" @click="gotoNode(tableData[0].name)">{{ tableData[0].name }}</el-button>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="logname" label="日志名称" width="400px">{{ tableData[0].logname }}</el-table-column>
                        <!-- <el-table-column prop="type" label="用户类型"  style="width: 100px;">{{ tableData[0].type }}</el-table-column>
                        <el-table-column prop="password" label="密码" width="300px">{{ tableData[0].password }}</el-table-column> -->
                        <el-table-column prop="createtime" label="生成时间" width="500px">{{ tableData[0].createtime }}</el-table-column>
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                <el-button size="mini" type="text" @click="">查看详细信息</el-button>
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
            tableData: [{
                logname:'log111',
                
                createtime:'2023-8-22 19:30:23',
                }]
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