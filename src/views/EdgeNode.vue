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
                        <el-table-column prop="name" label="节点名称" width="150px">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="gotoNode(scope.row.name)">{{ scope.row.name }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ip" label="IP" width="150px"></el-table-column>
                        <el-table-column prop="create_time" label="创建时间"  style="width: 100px;"></el-table-column>
                        <el-table-column prop="roles" label="节点类型" width="100px"></el-table-column>
                        <el-table-column prop="cpu_cores" label="CPU核心数" width="100px"></el-table-column>
                        <el-table-column prop="cpu_avaliable" label="CPU空闲数" width="100px"></el-table-column>
                        <el-table-column prop="memory" label="内存" width="140px"></el-table-column>
                        <el-table-column prop="memory_avaliable" label="可用内存" width="140px"></el-table-column>
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
                    // name:"",
                    // ip:"",
                    // create_time:"",
                    // roles:["Worker"],
                    // cpu_cores:12,
                    // cpu_avaliable:12,
                    // mem:"31322824",
                    // mem_avaliable:"31322824"
                },]
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
        },
        getNodes(){
            this.$http.get('/node/info').then(res => {
                console.log(res.data.data.nodes)
                this.tableData = res.data.data.nodes
                console.log(this.tableData[0].name)
            })
        }
    },
    mounted() {
        this.getNodes();
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