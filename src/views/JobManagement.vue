<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">Job任务管理</el-header>
        </el-container>
        <div class="interface">
            <el-card class="job-list" style="display: inline-block;">
                <div class="wrapper">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddEdgeNode">创建任务</el-button>
                    <el-input v-model="SearchNode" placeholder="按名称搜索" style="width: 400px;">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input>
                </div>
                <div class="table">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="jobname" label="Name" width="300px">
                            <template slot-scope="scope">
                                <el-button size="medium" type="text" @click="gotoNode(tableData[0].name)">{{ tableData[0].name }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="completions" label="Completions" width="200px">{{ tableData[0].completions }}</el-table-column>
                        <el-table-column prop="duration" label="Duration" width="100px">{{ tableData[0].duration }}</el-table-column>
                        <el-table-column prop="age" label="Age"  style="width: 100px;">{{ tableData[0].age }}</el-table-column>
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">停用</el-button>
                                <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                <el-dropdown style="font-size: smaller; left: 5px;">
                                    <span class="el-dropdown-link">
                                        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <!-- <el-dropdown-item>加入容器集群</el-dropdown-item> -->
                                        <el-dropdown-item>功能x</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
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
                name:'myjob',
                completions:'1/1',
                duration:'4s',
                age:'40s',
                operation:''
                }]
        }
    },
    methods:{
        gotoNode(nodename){
            this.$router.push({
                name:'nodeinfo'
            })
        }
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

.job-list{
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