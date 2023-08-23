<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">Pod任务管理</el-header>
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
                    <el-table :data="tableData" stripe style="width: 100%;">
                        <el-table-column prop="name" label="名称" width="200px" >
                            <template slot-scope="scope" >
                                <el-button size="medium" type="text" @click="gotoPod(scope.row.name)">{{ scope.row.name }}</el-button>
                            </template>
                            </el-table-column>
                        <el-table-column prop="namespace" label="Namespace" width="150px">
                            <!-- <template slot-scope="scope">
                                <el-button size="medium" type="text">{{ scope.row.namespace }}</el-button>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="labels" label="labels" width="100px"></el-table-column>
                        <el-table-column prop="status" label="Status" width="100px">
                            <template slot-scope="scope">
                                <el-tag
                                :type="scope.row.status === 'Running' ? 'primary' : 'danger'"
                                disable-transitions>{{scope.row.status}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="image_name" label="镜像名称"  style="width: 200px;"></el-table-column>
                        <el-table-column prop="image_url" label="镜像url"  style="width: 200px;"></el-table-column>
                        <!-- <el-table-column prop="log" label="日志"  style="width: 200px;"></el-table-column> -->
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">停用</el-button>
                                <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                <el-dropdown style="font-size: smaller; left: 5px;">
                                    <span class="el-dropdown-link">
                                        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
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

            <el-card v-show="EditCard" shadow="hover">
                11
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            EditCard:false,
            currentPage1:1,
            tableData: [{
                // namespace:'',
                // name:'',
                // labels:'',
                // status:'',
                // image_name:'',
                // image_url:'',
                // log:''
                },
            ]
        }
    },
    methods:{
        toAddEdgeNode(){
            this.$router.push({
                name: 'addpod'
            })
        },
        getAllPods(){
            this.$http.post('/pod/info').then(res =>{
                console.log(res)
                this.tableData = res.data.data.pods
                console.log(this.tableData)
            })
        },
        showEditCard(){
            this.EditCard = true
        }
    },
    mounted(){
        this.getAllPods()
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