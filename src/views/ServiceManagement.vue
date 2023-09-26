<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">网络应用管理</el-header>
        </el-container>
        <div class="interface">
            <el-card class="job-list" style="display: inline-block;">
                <div class="wrapper">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddService">创建服务</el-button>
                    <!-- <el-input v-model="SearchNode" placeholder="按名称搜索" style="width: 400px;">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input> -->
                </div>
                <div class="table">
                    <el-table v-if="displayedData && displayedData.length > 0" :data="displayedData" stripe style="width: 100%">
                        <el-table-column prop="name" label="服务名称" width="300px"></el-table-column>
                        <el-table-column prop="selector.app" label="容器标签" width="200px"></el-table-column>
                        <!-- <template slot-scope="scope" >
                            <el-table-column label="端口信息" :data="scope.row.ports">
                               
                                    <el-table-column label="端口" prop="port"></el-table-column>
                                    <el-table-column label="目标端口" prop="target_port"></el-table-column>
                                    <el-table-column label="协议" prop="protocol"></el-table-column>
                                
                         </el-table-column>  
                        </template> -->
                        <!-- <template slot-scope="scope"> -->
                            <el-table-column text-align="center" label="端口">
                            <el-table-column text-align="center" v-for="(port, index) in displayedData[0].ports" :key="index" label="端口号" >
                                <template slot-scope="scope">
                                    <span>{{scope.row.ports[index].port}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column text-align="center" v-for="(port, index) in displayedData[0].ports" :key="index" label="目标端口号" >
                                <template slot-scope="scope">
                                    <span>{{scope.row.ports[index].target_port}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column text-align="center" v-for="(port, index) in displayedData[0].ports" :key="index" label="协议" >
                                <template slot-scope="scope">
                                    <span>{{scope.row.ports[index].protocol}}</span>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <!-- </template> -->
                        
                        
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="role" size="mini" type="text" @click="DeleteService(scope.row.name)">删除</el-button>
                                <el-button v-if="!role" size="mini" type="text" @click="DeleteService(scope.row.name)" disabled>删除</el-button>
                                <el-dropdown style="font-size: smaller; left: 5px;">
                                    <el-dropdown-menu slot="dropdown">
                                        <!-- <el-dropdown-item>加入容器集群</el-dropdown-item> -->
                                        <el-dropdown-item>功能x</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-table v-if="!(displayedData && displayedData.length > 0)" :data="displayedData" stripe style="width: 100%">
                        <el-table-column prop="name" label="服务名称" width="300px"></el-table-column>
                        <el-table-column prop="selector.app" label="容器标签" width="200px"></el-table-column>
                        <!-- <template slot-scope="scope" >
                            <el-table-column label="端口信息" :data="scope.row.ports">
                               
                                    <el-table-column label="端口" prop="port"></el-table-column>
                                    <el-table-column label="目标端口" prop="target_port"></el-table-column>
                                    <el-table-column label="协议" prop="protocol"></el-table-column>
                                
                         </el-table-column>  
                        </template> -->
                        <!-- <template slot-scope="scope"> -->
                            <el-table-column text-align="center" label="端口">
                            <!-- <el-table-column text-align="center" v-for="(port, index) in displayedData[0].ports" :key="index" label="端口号" >
                                <template slot-scope="scope">
                                    <span>{{scope.row.ports[index].port}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column text-align="center" v-for="(port, index) in displayedData[0].ports" :key="index" label="目标端口号" >
                                <template slot-scope="scope">
                                    <span>{{scope.row.ports[index].target_port}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column text-align="center" v-for="(port, index) in displayedData[0].ports" :key="index" label="协议" >
                                <template slot-scope="scope">
                                    <span>{{scope.row.ports[index].protocol}}</span>
                                </template>
                            </el-table-column> -->
                        </el-table-column>
                        <!-- </template> -->
                        
                        
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="role" size="mini" type="text" @click="DeleteService(scope.row.name)">删除</el-button>
                                <el-button v-if="!role" size="mini" type="text" @click="DeleteService(scope.row.name)" disabled>删除</el-button>
                                
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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            role:false,
            displayedData:[], //当页展示的数据
            pageSize:10,
            currentPage1:1, //当前页码
            datasize:0,
            tableData: [
                // {
                // name:'hh',
                // type:'hh',
                // selector:'fsdf',
                // ports:[{
                //     port: 5000,
                //     target_port: 5000,
                //     protocol: "TCP"
                // }]
                // }
        ],
            
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
        getAllServices(){
            this.$http.post('/service/info').then(res=>{
                console.log(res)
                // this.tableData.push(res.data.data.services[0])
                this.tableData = res.data.data.services
                console.log(this.tableData)
                this.datasize = res.data.data.services.length
                this.updateDisplayedData()
            })
        },
        toAddService(){
            this.$router.push({
                name: 'addservice'
            })
        },
        DeleteService(name){
            console.log(name)
            let obj = {"name":name}
            this.$http.post('/service/delete', obj).then(res =>{
                console.log(res)
                if(res.data.status === 0){
                    this.$message.success('删除成功')
                    location.reload()
                }
            })
        }
    },
    mounted(){
        this.getAllServices()
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