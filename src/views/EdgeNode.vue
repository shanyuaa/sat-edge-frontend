<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">节点</el-header>
        </el-container>
        <div class="interface">
            <el-card class="node-list" style="display: inline-block;">
                <div class="wrapper">
                    <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddEdgeNode">添加节点</el-button> -->
                    <span style="top: -10px; font-size: large;">节点列表</span>
                    <el-input v-model="SearchNode" placeholder="按名称搜索" style="width: 400px;">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input>
                </div>
                <div class="table">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="nodename" label="节点名称" width="150px">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="gotoNode(tableData.nodename)">test1</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="nodetype" label="节点类型" width="100px"></el-table-column>
                        <el-table-column prop="status" label="节点状态" width="100px"></el-table-column>
                        <el-table-column prop="clustertype" label="集群类型" width="100px"></el-table-column>
                        <el-table-column prop="whichcluster" label="所属集群" width="140px"></el-table-column>
                        <el-table-column prop="ip" label="IP" width="100px"></el-table-column>
                        <el-table-column prop="birthtime" label="创建时间"  style="width: 100px;"></el-table-column>
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">停用</el-button>
                                <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                <el-dropdown style="font-size: smaller; left: 5px;">
                                    <span class="el-dropdown-link">
                                        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>加入容器集群</el-dropdown-item>
                                        <el-dropdown-item>修改配置</el-dropdown-item>
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
                nodename:'test1',
                nodetype:'私有节点',
                status:'-',
                clustertype:'-',
                whichcluster:'-',
                ip:'-',
                birthtime:'2023-07-24 15:30:15',
                operation:''
                }]
        }
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        toAddEdgeNode(){
            this.$router.push({
                name:'addnode'
            })
        },
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