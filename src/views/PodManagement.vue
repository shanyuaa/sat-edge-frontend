<template>
    <div>
        <el-container>
            <el-header style="height: 60px; padding: 15px; width: 100%;">Pod容器管理</el-header>
        </el-container>
        <div class="interface">
            <el-card class="job-list" style="display: inline-block;">
                <div class="wrapper">
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toAddEdgeNode">创建Pod</el-button>
                    <!-- <el-input v-model="SearchNode" placeholder="按名称搜索" style="width: 400px;">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input> -->
                </div>
                <div class="table">
                    <el-table :data="displayedData" stripe style="width: 100%;">
                        <el-table-column prop="name" label="名称"  >
                            <template slot-scope="scope" >
                                <el-button size="medium" type="text" @click="gotoPod(scope.row.name)">{{ scope.row.name }}</el-button>
                            </template>
                            </el-table-column>
                        <el-table-column prop="namespace" label="Namespace">
                            <!-- <template slot-scope="scope">
                                <el-button size="medium" type="text">{{ scope.row.namespace }}</el-button>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="labels" label="labels"></el-table-column>
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
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="deletePod(scope.row.name)">删除</el-button>
                                <el-button size="mini" type="text" @click="gotoUpdatePod(scope.row.name)">修改配置</el-button>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block" style=" margin-bottom: 0px; left: 0; right: 0;">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-sizes="[5,10,15,20]"
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
            EditCard:false,
           
            tableData: [{ //所有数据

                },
            ],
            displayedData:[], //当页展示的数据
            pageSize:10,
            currentPage1:1, //当前页码
            datasize:0

        }
    },
    methods:{
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
        toAddEdgeNode(){
            this.$router.push({
                name: 'addpod'
            })
        },
        getAllPods(){
            this.$http.post('/pod/info').then(res =>{
                console.log(res)
                
                this.tableData = res.data.data.pods
                this.datasize = res.data.data.pods.length
                for(var i=0; i<this.tableData.length; i++){
                    this.tableData[i].labels = JSON.stringify(this.tableData[i].labels)
                }
                
                this.updateDisplayedData()
            })
        },
       
        showEditCard(){
            this.EditCard = true
        },
        gotoUpdatePod(name){
            console.log()
            this.$router.push({
                name:'updatepod',
                params:{ name: name }
            })
        },
        deletePod(name){
            console.log(name)
            let obj = {"name":name}
            this.$http.post('/pod/delete', obj).then(res =>{
                console.log(res)
                if(res.data.status === 0){
                    this.$message.success('删除成功')
                    location.reload()
                }
            })
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
  width: 100%;
  
  top: 0px; /* 距离顶部的距离为0 */
  left: 0; /* 距离左侧的距离为0 */
  right: 0; /* 距离右侧的距离为0 */
  bottom: 0; /* 距离底部的距离为0 */
  
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
