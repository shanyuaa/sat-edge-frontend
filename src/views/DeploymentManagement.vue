<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">在线任务管理</el-header>
        </el-container>
        <div class="interface">
            <el-card class="job-list" style="display: inline-block;">
                <div class="wrapper">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddEdgeDeployment">创建任务</el-button>
                    <!-- <el-input v-model="SearchNode" placeholder="按名称搜索" style="width: 400px;">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input> -->
                </div>
                <div class="table">
                    <el-table :data="displayedData" stripe style="width: 100%;">
                        <el-table-column prop="name" label="名称" width="200px" >
                            
                                <!-- <el-button size="medium" type="text" @click="gotoPod(scope.row.name)">{{ scope.row.name }}</el-button> -->
                            
                            </el-table-column>
                        <el-table-column prop="replicas" label="副本数" width="100px"></el-table-column>
                        
                        <el-table-column prop="image_name" label="镜像名称"  style="width: 200px;"></el-table-column>
                        <el-table-column prop="image_url" label="镜像url"  style="width: 300px;"></el-table-column>
                        <el-table-column label="状态"  style="width: 300px;">
                            <el-tag style="size:smaller"
                                type="primary"
                                disable-transitions>Running</el-tag>
                        </el-table-column>
                        <el-table-column label="端口号"  style="width: 300px;">
                            <template slot-scope="scope">
                                <!-- 使用 v-for 循环渲染嵌套数组中的数据 -->
                                <div v-for="(value, index) in scope.row.ports" :key="index">
                                {{ value }}
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="log" label="日志"  style="width: 200px;"></el-table-column> -->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                
                                <el-button v-if="role" size="mini" type="text" @click="deleteDeployment(scope.row.name)">删除</el-button>
                                <el-button v-if="!role" size="mini" type="text" @click="deleteDeployment(scope.row.name)" disabled>删除</el-button>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="datasize">
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
    inject: ['reload'],
    data() {
        return{
            role:false,
            EditCard:false,
            displayedData:[], //当页展示的数据
            pageSize:10,
            currentPage1:1, //当前页码
            datasize:0,
            tableData: [{
                
                },
            ]
        }
    },
    methods:{
        IsAdmin(){
            this.role = sessionStorage.getItem('role')=='admin' ? true:false
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.updateDisplayedData(); // 重新加载数据
        },
        handleCurrentChange(val) {
            this.currentPage1 = val;
            this.updateDisplayedData(); // 重新加载数据
        },
        updateDisplayedData(){
            const startIndex = (this.currentPage1 - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            this.displayedData = this.tableData.slice(startIndex, endIndex);
        },
        toAddEdgeDeployment(){
            this.$router.push({
                name: 'adddeployment'
            })
        },
        getAllDeployments(){
            this.$http.post('/deployment/info').then(res =>{
                console.log(res)
                this.tableData = res.data.data.deployments
                // console.log(this.tableData)
                this.datasize = res.data.data.deployments.length
                this.updateDisplayedData()
            })
        },
        showEditCard(){
            this.EditCard = true
        },
        deleteDeployment(name){
            console.log(name)
            let obj = {"name":name}
            this.$http.post('/deployment/delete', obj).then(res =>{
                console.log(res)
                if(res.data.status == 0){
                    this.$message.success('删除成功')
                    location.reload()
                }
            })
        },
        updateDeployment(deployment){
            this.$router.push({
                name:'updatedeployment',
                params:{name:deployment.name, replicas:deployment.replicas, image_name:deployment.image_name, image_url:deployment.image_url}
            })
        }
    },
    mounted(){
        this.getAllDeployments()
    },
    created(){
        this.IsAdmin()
    }
}
</script>

<style scoped>
.interface{
  height: 100%;
  background-color: #F2F6FC;
  
  width: 100%;
}

.job-list{
    position: relative;
  width: 96%;
  padding: 10px;
  top:30px;
  left:2%;
  right: 2%;
  margin-bottom:5%;
  min-height: 800px;
}
.table{
    top:20px;
    margin-bottom: 40px;
    min-height: 600px;
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